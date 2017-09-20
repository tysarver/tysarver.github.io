/*
  Copyright (c) 2016 Aziom, Inc. All rights reserved.
*/

function csdnClearWorkDtlArys() {
	vWork.ar.bldCtdt = [];
	vWork.ar.bldCtrp = [];
	vWork.ar.bldCtrt = [];
}


// Build Array of CTRN records
function buildCtrnArray(voidFlag) {
	var tRec = [];
	vWork.ar.bldCtrn = [];

	vWork.al.tchd.map( function (tH) {
		if (tH.printed > 0 && tH.printed < 9) {
			tRec = new tchd2ctrn(tH, voidFlag);
			vWork.ar.bldCtrn.push(tRec);
		}
	});
	nextSeq();
}


//
function csdnPartDelTcdt() {
	function remTransFromTcdt(transId) {
		var lowerLimit = [vDynm.re.dept.dept_no, transId, 0];
		var upperLimit = [vDynm.re.dept.dept_no, transId, 99999999];
		promDeleteRange(vWork.db.work.handle, 'tcdt', lowerLimit, upperLimit);
	}

	remTransFromTcdt(vDynm.re.cdat.trans_id);
	switch (vDynm.re.cdat.trans_id) {
		case 88:
			remTransFromTcdt(89);
			croaResetUnpdPymt();
			break;
	}

	var iH = vWork.al.tchd.findIndex(function (tH) { if (tH.dept_no == vDynm.re.dept.dept_no && tH.rpt_sect == vDynm.re.cdat.rpt_sect ) {return true}; });
	if (iH > -1) {
		var iD = vWork.al.tcdt.findIndex(function (tD) { if (tD.dept_no == vDynm.re.dept.dept_no && tD.rpt_sect == vDynm.re.cdat.rpt_sect) {return true}; });
		if (iD > -1) {
			var dH = vWork.al.tchd[iH];
			var hKey = [dH.dept_no, dH.rpt_sect];
			promDeleteRec(vWork.db.work.handle, 'tchd', hKey);
			vWork.al.tchd.splice(iH,1);
		}
	}

	nextSeq();
}


// Update vDynm objects
function csdnClearDynm() {
	csdnClearWorkDtlArys();
	croaResetUnpdPymt();
	nextSeq();
}


// Update vDynm objects
function csdnUpdateROA() {
	vDynm.ar.unpd.map(function (uO) {
		if (uO.selected) {
			vDynm.ob.enod.roa.partAmt += uO.part_amt;
			vDynm.ob.enod.roa.tktAmt += uO.tkt_amt;
			vDynm.ob.enod.roa.tktCnt ++;
		}
	});

	vDynm.ar.pymt.map(function (pO) {
		if (pO.chk_no > 0) {
			vDynm.ob.enod.roa.chkAmt += pO.chk_amt;
			vDynm.ob.enod.roa.chkCnt ++;
		} else {
			vDynm.ob.enod.roa.cshAmt += pO.chk_amt;
			vDynm.ob.enod.roa.cshCnt ++;
		}
	});
	nextSeq();
}


// Update this route record in RDHR store
function csdnUpdateRhdr() {
	promPutRecNoKey(vWork.db.dnld.handle, 'rhdr', vDynm.re.rhdr).then(function (data) {
		nextSeq();
    }).catch(function (error) {
      console.log(error);
    });
}


// CSDN Update Complete
function csdnComplete() {
	boxChange(2000);
}


// CSDN Full Void Complete
function csdnFullVoidComplete() {
	boxChange(2000);
}


// CSDN Partial Void Complete
function csdnPartVoidComplete() {
	boxChange(3100);
}


function bcInitCsrvUpdate() {
// Initialize
	vWork.ar.sequProc.length = 0;
	vDynm.ob.sequ.sequNo = -1;

// Fetch Temp Details for current xact from store to array
	vWork.ar.sequProc.push(function () { tranFetchAllTc('tchd') } );

// Fetch  Temp Headers for current xact from store to array
	vWork.ar.sequProc.push(function () { tranFetchAllTc('tcdt') } );

// Build Array of CTRN records
	vWork.ar.sequProc.push(function () { buildCtrnArray(0) } );

// Put CTRN array to CTRN store
	vWork.ar.sequProc.push(function () { promAddAryToIdb(vWork.db.upld.handle, 'ctrn', vWork.ar.bldCtrn, nextSeq ) } );

// Update INVT / Preloads
	vWork.ar.sequProc.push(function () { transUpdateInvt() } );

// Update ROA Daily Accums
	vWork.ar.sequProc.push(function () { csdnUpdateROA() } );

// Update vDynm objects
	vWork.ar.sequProc.push(function () { csdnClearDynm() } );

// Clear Temp Cust Serv Stores
	vWork.ar.sequProc.push(function () { tranClearTcStores(nextSeq) } );

// Update this route record in RDHR store
	vWork.ar.sequProc.push(function () { csdnUpdateRhdr() } );

// CSDN Update Complete
	vWork.ar.sequProc.push(function () { csdnComplete() } );

// Run Sequence
	nextSeq();
}


//	 Entry for Void current Transaction Type approved
function bcInitCsrvVoidTransUpdate()  {
// Initialize
	vWork.ar.sequProc.length = 0;
	vDynm.ob.sequ.sequNo = -1;

// Fetch Temp Details for current xact from store to array
	vWork.ar.sequProc.push(function () { tranFetchAllTc('tchd') } );

// Fetch  Temp Headers for current xact from store to array
	vWork.ar.sequProc.push(function () { tranFetchAllTc('tcdt') } );

// Build Array of CTRN records
	vWork.ar.sequProc.push(function () { buildCtrnArray(1) } );

// Put CTRN array to CTRN store
	vWork.ar.sequProc.push(function () { promAddAryToIdb(vWork.db.upld.handle, 'ctrn', vWork.ar.bldCtrn, nextSeq ) } );

// Update vDynm objects
//	vWork.ar.sequProc.push(function () { csdnUpdateDynm() } );

// Clear Temp Cust Serv Stores
	vWork.ar.sequProc.push(function () { csdnPartDelTcdt() } );

// Update this route record in RDHR store
	vWork.ar.sequProc.push(function () { csdnUpdateRhdr() } );

// CSDN Update Complete
	vWork.ar.sequProc.push(function () { csdnPartVoidComplete() } );

// Run Sequence
	nextSeq();
}


//	 Entry for
function bcInitCsrvVoidTransaction()  {
	document.getElementById("i_SectSubHdr").innerHTML = vDynm.re.cdat.trans_name;
}


//	 Entry for
function bcInitCsrvVoidUpdate()  {
// Initialize
	vWork.ar.sequProc.length = 0;
	vDynm.ob.sequ.sequNo = -1;

// Fetch Temp Details for current xact from store to array
	vWork.ar.sequProc.push(function () { tranFetchAllTc('tchd') } );

// Fetch  Temp Headers for current xact from store to array
	vWork.ar.sequProc.push(function () { tranFetchAllTc('tcdt') } );

// Build Array of CTRN records
	vWork.ar.sequProc.push(function () { buildCtrnArray(2) } );

// Put CTRN array to CTRN store
	vWork.ar.sequProc.push(function () { promAddAryToIdb(vWork.db.upld.handle, 'ctrn', vWork.ar.bldCtrn, nextSeq ) } );

// Update vDynm objects
	vWork.ar.sequProc.push(function () { csdnClearDynm() } );

// Clear Temp Cust Serv Stores
	vWork.ar.sequProc.push(function () { tranClearTcStores(nextSeq) } );

// CSDN Update Complete
	vWork.ar.sequProc.push(function () { csdnFullVoidComplete() } );

// Run Sequence
	nextSeq();
}


//	 Entry for
function bcInitCsrvVoidRequest()  {
	document.getElementById("i_SectSubHdr").innerHTML = vDynm.re.cust.cust_name;
}


