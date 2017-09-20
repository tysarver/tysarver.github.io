/*
  Copyright (c) 2016 Aziom, Inc. All rights reserved.
*/


function buildRouteSelect(eId, fNam, dTxt) {
	var selectNo = document.getElementById(eId);
	var tAry = vStat.al.rlst.slice(0);
	tAry.sort(dynSort(fNam));
	selectNo.length = 0;
	if (vDynm.re.rlst.route_id == -1) {
		var defo = document.createElement("option");
		defo.selected = true;
		defo.disabled = true;
		defo.hidden = true;
		defo.text = dTxt;
		selectNo.appendChild(defo);
	}
	
	tAry.map(function (e) {
		var option = document.createElement("option");
		option.text = e[fNam];
		option.value = e.route_id;
		selectNo.appendChild(option);
	});
}


function dispRouteDat()	{
	var routeIdSelId = document.querySelector('#i_xferRouteIdSel [value="' + vDynm.re.rlst.route_id + '"]');
	var routeNameSelId = document.querySelector('#i_xferRouteNameSel [value="' + vDynm.re.rlst.route_id + '"]');

	document.getElementById('i_xferRoutePhone').innerHTML = "&nbsp;";

	if (routeIdSelId != null) {
		routeIdSelId.selected = true;
	}
	if (routeNameSelId != null) {
		routeNameSelId.selected = true;
	}
}


function invcXferEnteredRouteId() {
	var numEle = document.getElementById("i_xferRouteIdEnt");
	var newRouteId = numEle.value * 1;
	rIdx = relateRlstAry(newRouteId);

	if (rIdx != -1) {
		buildRouteSelect('i_xferRouteIdSel', 'route_id', 'Select Route Number');
		buildRouteSelect('i_xferRouteNameSel', 'slsmn_name', 'Select Route Name');
		dispRouteDat();
	} else {
		var noEle = document.getElementById('i_xferRouteIdSel');
		var namEle = document.getElementById('i_xferRouteNameSel');
		var noIht = noEle.innerHTML;
		var namIht = namEle.innerHTML;
		vWork.el.sndDefault.play();
		noEle.innerHTML = "<option></option>"; 
		namEle.innerHTML = "<option>Route Not Found</option>"; 
		setTimeout(function () {
			noEle.innerHTML=noIht;
			namEle.innerHTML=namIht;
			numEle.value = "";
			dispRouteDat();
		},2000);
		return false;
	}
	numEle.value = "";	
}


function invcRelateRlstBySelectNo() {
	var selectNo = document.getElementById('i_xferRouteIdSel');
	var newRouteId = selectNo.value*1;
	relateRlstAry(newRouteId);
	dispRouteDat();
	
//	var idxOfCurrCustNo = vDynm.ar.csel[vDynm.ob.csrv.custWeekType][vDynm.ob.csrv.custDowType].findIndex(function (e) { if (e.cust_no == newCustNo) {return true}; });
//	vDynm.ob.csrv.custSelIdx = idxOfCurrCustNo;
}


function invcRelateRlstBySelectName() {
	var selectNo = document.getElementById('i_xferRouteNameSel');
	var newRouteId = selectNo.value*1;
	relateRlstAry(newRouteId);
	dispRouteDat();

//	var idxOfCurrCustNo = vDynm.ar.csel[vDynm.ob.csrv.custWeekType][vDynm.ob.csrv.custDowType].findIndex(function (e) { if (e.cust_no == newCustNo) {return true}; });
//	vDynm.ob.csrv.custSelIdx = idxOfCurrCustNo;
}


function invcXferInCont() {
	if (vDynm.re.rlst.route_id == -1) {
		boxChange(2000);
	} else {
		vDynm.ob.invc.xferRouteId = document.getElementById("i_xferRouteIdSel").value;
		vDynm.ob.invc.misc2 = vDynm.ob.invc.xferRouteId*1;
		boxChange(5102);
	}
}


function invcXferOutCont() {
	if (vDynm.re.rlst.route_id == -1) {
		boxChange(2000);
	} else {
		vDynm.ob.invc.xferRouteId = document.getElementById("i_xferRouteIdSel").value;	
		vDynm.ob.invc.misc2 = vDynm.ob.invc.xferRouteId*1;
		boxChange(5122);
	}
}


// Completion of Semi to warehouse delivery entry form
function invcStwDelCont() {
	vDynm.ob.invc.stwLoadNo = document.querySelector('input[name="stwTempSelected"]:checked').value;	
	boxChange(5024);
}


// Completion of Salesman Order entry form
function invcSordDateTempCont() {
	vDynm.ob.invc.sordTempNo = document.querySelector('input[name="sordTempSelected"]:checked').value;	
	vDynm.ob.invc.sordDelDate = document.getElementById("i_sordDateSelected").value;
	
	var xAry = vDynm.ob.invc.sordDelDate.split('-');
	vDynm.ob.invc.misc2 = (xAry[1]+xAry[2]+xAry[0].substring(2))*1;


	var dd = new Date(vDynm.ob.invc.sordDelDate);
	var cd = new Date();
	cd.setHours(cd.getHours() - 24);

	if (dd > cd) {
		boxChange(5202);
	} else {
		document.getElementById("i_SectSubHdr").innerHTML = "Enter Valid Future Date";
	}

}


// Completion of Salesman Order entry form
function invcOrdTmpMntCont() {
	vDynm.ob.invc.sordTempNo = document.querySelector('input[name="sordTempSelected"]:checked').value;	
	boxChange(5652);
}


//	Load specified recs from ILOD in TCDT
function invcIlodToTcdt(id) {
	function BldNewTcdtFromIlod(e) {
		vDynm.ob.csrv.alProdIdx = relateProdAry(e.prod_no);
		vDynm.ob.csrv.alPgrpIdx = relatePgrpAry(vDynm.re.prod.prod_grp);
		vDynm.ob.csrv.alInvtIdx = relateInvtAry(vDynm.re.prod.prod_no);
		
		var cu = tranCsUnFromQty(e.load_qty);
		var nR = new tcdtObj(vDynm.re.dept.dept_no, 0, e.prod_no);
		nR.prod_grp = vDynm.re.prod.prod_grp;
		nR.prod_desc = vDynm.re.prod.prod_desc;
		nR.pgrp_desc = vDynm.re.pgrp.prod_desc;
		nR.sell_qty = e.load_qty;
		nR.phy_qty1 = cu.cases;
		nR.phy_qty2 = cu.units;
		return nR;
	}

	var ilodHighDate = "0";
	vStat.al.ilod.map(function (e){
		if (e.trans_id == id && e.prod_no > 0) {
			vWork.al.tcdt.push(BldNewTcdtFromIlod(e));
			if (e.modified > ilodHighDate) {
				ilodHighDate = e.modified;
			}
		}
	});
	return ilodHighDate;
}


// Procs complete. Archive arrays and call Customer Service Main Menu
function cleanupInvcInit() {

//	putVGlobal2Idb(vStat);
	boxChange(vDynm.re.cdat.menu_id);
}



//
// Common Initialization
//
function invcInitPreLoad() {

// Initialize
	vWork.ar.sequProc.length = 0;
	vDynm.ob.sequ.sequNo = -1;
	
// Load prde into ary
	vWork.ar.sequProc.push(function () { loadCsrvAry(vWork.db.dnld.handle, 'prde', [1,vDynm.re.misc.userInfo.route_id,0], [1,vDynm.re.misc.userInfo.route_id,99999999], new prdeObj(1,vDynm.re.misc.userInfo.route_id,0,0)) } );

// Load prdo into ary
	vWork.ar.sequProc.push(function () { loadCsrvAry(vWork.db.dnld.handle, 'prdo', [1,vDynm.re.misc.userInfo.route_id,0,0,0,0], [1,vDynm.re.misc.userInfo.route_id,0,0,99,99999999], new prdoObj(1,vDynm.re.misc.userInfo.route_id,0,0,vDynm.re.cdat.trans_id)) } );

// Load rhdr into ary
	vWork.ar.sequProc.push(function () { fetchRecIntoDynmRe(vWork.db.dnld.handle, 'rhdr', vDynm.re.misc.userInfo.route_id); } );
	
// Build Prod display / select arrays
	vWork.ar.sequProc.push(function () { buildProdDispSelArys() } );
	
// Initialize Misc items for Customer Service
	vWork.ar.sequProc.push(function () { miscInitCslp() } );
	
// Archive arrays and call Customer Service Main Menu
	vWork.ar.sequProc.push(function () { cleanupInvcInit() } );
	
// Run Sequence	
	nextSeq();
}


function invcNewDtRec(d, q) {
		var cu = tranCsUnFromQty(q);
		var nR = new tcdtObj(d, vDynm.re.prod.prod_grp, vDynm.re.prod.prod_no);
		nR.prod_desc = vDynm.re.prod.prod_desc;
		nR.pgrp_desc = vDynm.re.pgrp.prod_desc;
		nR.sell_qty = q;
		nR.phy_qty1 = cu.cases;
		nR.phy_qty2 = cu.units;
		return nR;
}


function invcAddInvtFldToTcdt(e,qNo) {
	cV = 'qty_' + qNo;
	if (e[cV] > 0) {
		vDynm.ob.csrv.alProdIdx = relateProdAry(e.prod_no);
		vDynm.ob.csrv.alPgrpIdx = relatePgrpAry(vDynm.re.prod.prod_grp);
		vWork.al.tcdt.push(invcNewDtRec(vDynm.re.dept.dept_no, e[cV]));
	}
}


function invcInitEntry(transId) {
	prntInitTransId(transId);
	vDynm.ob.csrv.nextOnUnits = "Prod";
	vDynm.ob.csrv.payMeth = 99;
	vDynm.ob.csrv.copies = 1;

//	vStat.al.cust = [vDynm.re.cust];
	vStat.al.dept = [vDynm.re.dept];

	invcInitPreLoad();
	
}


// Update vDynm objects
function invcUpdateDynm() {
	vWork.ar.bldItrn = [];
	vWork.ar.bldItdt = [];

	nextSeq();
}


// Final Exit of All Invc Functions
function invcComplete() {
	vStat.al.bld2 = [];
	vStat.al.prdo = [];
	vStat.al.prde = [];

	vStat.ix.bld2 = [];
	vStat.ix.prdo = [];
	vStat.ix.prde = [];

	vDynm.ob.invc.misc2 = 0;
}



// CSDN Update Complete
function invcUpdateComplete() {
	invcComplete();
	boxChange(2000);
}


// CSDN Full Void Complete
function invcVoidComplete() {
	invcComplete();
	boxChange(2000);
}


/*

	Calls From Menu boxChange

*/


//	 Entry for Semi To Warehouse
//	Determine if ILOD rec available and boxChange accordingly
// Select Cdat rec, 101 or 111 (if no ilod)

function bcInitInvcStw()  {
	relateCdatAry(101);

	var cP = vStat.al.ilod.findIndex(function (e) { if (e.trans_id == vDynm.re.cdat.load_id) {return true}; });

	if (cP > -1) {
		vDynm.ob.invc.stwDate = vStat.al.ilod[cP].modified;
		boxChange(5022);	// ILOD rec exist
	} else {
		boxChange(5023);	// No ILOD recs
	}

}


function bcInitInvcStwIlodSelect() {
	document.getElementById("i_stwCurIlodDate").innerHTML = vDynm.ob.invc.stwDate;
}


function bcInitInvcStwIlodPrep() {
	if (vDynm.ob.invc.stwLoadNo == 1) {
		invcInitEntry(101);
		invcIlodToTcdt(71);
		prntCreTchdPutIdb();
	} else {
		invcInitEntry(111);
	}
}


function bcInitInvcStwNoIlodPrep() {
	invcInitEntry(111);
}


function bcInitInvcStwIlodEntry() {
	tranInitXact(101);
}


function bcInitInvcStwNoIlodEntry() {
	tranInitXact(111);
}



function bcInitInvcPhysPrep() {

	function BldNewTcdtFromInvt(e) {
		if (e.qty_7 > 0 || e.qty_8 > 0) {
			vDynm.ob.csrv.alProdIdx = relateProdAry(e.prod_no);
			vDynm.ob.csrv.alPgrpIdx = relatePgrpAry(vDynm.re.prod.prod_grp);
			if (e.qty_7 > 0) {
				vWork.al.tcdt.push(invcNewDtRec(1, e.qty_7));
			}
			if (e.qty_8 > 0) {
				vWork.al.tcdt.push(invcNewDtRec(2, e.qty_8));
			}
		}
	}

	invcInitEntry(104);
	vStat.al.dept = vCnst.ar.physInvtDepts;
	vDynm.re.dept = vStat.al.dept[0];
	if (vDynm.re.cdat.load_ctrl > 0) {
		vStat.al.invt.map(function (e){BldNewTcdtFromInvt(e)});
	}
	prntCreTchdPutIdb();
}


function bcInitInvcPhysEntry() {
	tranInitXact(104);
	relateSdatAry(205410);
	vDynm.re.dept = vStat.al.dept[0];
	i_SectSubHdr.innerHTML=vDynm.re.sdat.scrContent;
	i_SectHdr.innerHTML = vDynm.re.cdat.trans_name;
	tranBldDeptNameSelect();
}


//	 Entry for 
function bcInitInvcTruckLoadPrep()  {
	invcInitEntry(102);
}


function bcInitInvcTruckLoadEntry() {
	tranInitXact(102);
}


//	 Entry for 
function bcInitInvcDamagedDumpNoPreload()  {
	invcInitEntry(106);
}


//	 Entry for 
function bcInitInvcDamagedDumpPreload()  {
	invcInitEntry(106);
	vStat.al.invt.map(function (e) {invcAddInvtFldToTcdt(e,5)});
	prntCreTchdPutIdb();
}


//	 Entry for 
function bcInitInvcDamagedDumpEntry()  {
	tranInitXact(106);
}


//	 Entry for 
function bcInitInvcOutOfDateDumpNoPreload()  {
	invcInitEntry(107);
}


//	 Entry for 
function bcInitInvcOutOfDateDumpPreload()  {
	invcInitEntry(107);
	vStat.al.invt.map(function (e) {invcAddInvtFldToTcdt(e,6)});
	prntCreTchdPutIdb();
}


//	 Entry for 
function bcInitInvcOutOfDateDumpEntry()  {
	tranInitXact(107);
}


//	 Entry for 
function bcInitInvcTransferIn()  {
	vDynm.re.rlst.route_id = -1;
	buildRouteSelect('i_xferRouteIdSel', 'route_id', 'Select Route Number');
	buildRouteSelect('i_xferRouteNameSel', 'slsmn_name', 'Select Route Name');
}

function bcInitInvcTransferInPrep() {
	invcInitEntry(142);
}


function bcInitInvcTransferInEntry() {
	vStat.al.dept = 
	[
		{"cust_no":0,"dept_no":1,"dept_desc":"From Route: " + vDynm.ob.invc.xferRouteId,"modified":"2016-10-12 07:12:52","ut_dnld":1476270772},
	];	
	vDynm.re.dept = vStat.al.dept[0];
	tranInitXact(142);
}


//	 Entry for 
function bcInitInvcTransferOut()  {
	vDynm.re.rlst.route_id = -1;
	buildRouteSelect('i_xferRouteIdSel', 'route_id', 'Select Route Number');
	buildRouteSelect('i_xferRouteNameSel', 'slsmn_name', 'Select Route Name');
}


function bcInitInvcTransferOutPrep() {
	invcInitEntry(143);
}


function bcInitInvcTransferOutEntry() {
	vStat.al.dept = 
	[
		{"cust_no":0,"dept_no":1,"dept_desc":"To Route: " + vDynm.ob.invc.xferRouteId,"modified":"2016-10-12 07:12:52","ut_dnld":1476270772},
	];	
	vDynm.re.dept = vStat.al.dept[0];
	tranInitXact(143);
}


//	 Entry for 
function bcInitInvcDamagedToPlantNoPreload()  {
	invcInitEntry(144);
}


//	 Entry for 
function bcInitInvcDamagedToPlantPreload()  {
	invcInitEntry(144);
	vStat.al.invt.map(function (e) {invcAddInvtFldToTcdt(e,5)});
	prntCreTchdPutIdb();
}


//	 Entry for 
function bcInitInvcDamagedToPlantEntry()  {
	tranInitXact(144);
}


//	 Entry for 
function bcInitInvcOutOfDateToPlantNoPreload()  {
	invcInitEntry(145);
}


//	 Entry for 
function bcInitInvcOutOfDateToPlantPreload()  {
	invcInitEntry(145);
	vStat.al.invt.map(function (e) {invcAddInvtFldToTcdt(e,6)});
	prntCreTchdPutIdb();
}


//	 Entry for 
function bcInitInvcOutOfDateToPlantEntry()  {
	tranInitXact(145);
}


//	 Entry for 
function bcInitInvcSalesmanOrder()  {
}


//	 Entry for 
function bcInitInvcSalesmanOrderPrep()  {
	function BldNewTcdtFromTempDiff(e) {
		relateInvtAry(e.prod_no);
		relateProdAry(e.prod_no);
		var ohQ = vDynm.re.invt.qty_7 + vDynm.re.invt.qty_8
		if (ohQ < 0) {
			ohQ = 0;
		}
		
		var orQ = e.load_qty - ohQ;
		var orU = orQ % vDynm.re.prod.case_qty;
		if (orU > 1) {
			orQ += vDynm.re.prod.case_qty - orU;
		}
		
		if (orQ > 0) {
			vDynm.ob.csrv.alProdIdx = relateProdAry(e.prod_no);
			vDynm.ob.csrv.alPgrpIdx = relatePgrpAry(vDynm.re.prod.prod_grp);
			vWork.al.tcdt.push(invcNewDtRec(1, orQ));
		}
	}

	var cIdx = (vDynm.ob.invc.sordTempNo*1) + 150;
	invcInitEntry(cIdx);
	
	var ilodIdx = (vDynm.ob.invc.sordTempNo*1) + 80;
	vStat.al.bld2 = vStat.al.ilod.filter(function (o) { return o.trans_id == ilodIdx});
	vStat.ix.bld2 = vStat.al.bld2.map(function (o) {return o.prod_no})
	vStat.al.bld2.map(function (e){BldNewTcdtFromTempDiff(e)});
	vStat.al.dept = 
	[
		{"cust_no":0,"dept_no":1,"dept_desc":"Dlvr: " + vDynm.ob.invc.sordDelDate,"modified":"2016-10-12 07:12:52","ut_dnld":1476270772},
	];	
	prntCreTchdPutIdb();
}


function bcInitInvcSalesmanOrderEntry() {
	var cIdx = (vDynm.ob.invc.sordTempNo*1) + 150;
	vDynm.re.dept = vStat.al.dept[0];
	tranInitXact(cIdx);
}


//	 Entry for 
function bcInitInvcOrdTmpMnt()  {
}


//	 Entry for 
function bcInitInvcOrdTmpMntPrep()  {
	var cIdx = (vDynm.ob.invc.sordTempNo*1) + 170;
	invcInitEntry(cIdx);

	var ilodIdx = (vDynm.ob.invc.sordTempNo*1) + 80;

	invcIlodToTcdt(ilodIdx);
	prntCreTchdPutIdb();
}


function bcInitInvcOrdTmpMntEntry() {
	var cIdx = (vDynm.ob.invc.sordTempNo*1) + 170;
	tranInitXact(cIdx);
}


//	 Entry for 
function bcInitInvcVoidRequest()  {
}



//	 Entry for 
function bcInitInvcPrintComplete()  {
}



//	 Entry for 
function bcInitInvcReDirBack()  {
	boxChange(vDynm.re.cdat.menu_id);
}


// Build Array of ITRN records
function invcBuildItrnArray(vF) {
	var tRec = {};
	vWork.ar.bldItrn = [];
	vWork.al.tchd.map(function (tH) {
		if (tH.cdat.upload_id > 0 && tH.cdat.use_tkt > 0) {
			tRec = new tchd2itrn(tH, vF);
			vWork.ar.bldItrn.push(tRec);
		}
	} );
	nextSeq();
}


function invcUpdateItrn() {
	promAddAryToIdb(vWork.db.upld.handle, 'itrn', vWork.ar.bldItrn, nextSeq)
}


function invcPrepInvtUpdate() {
	for (var i=vWork.al.tcdt.length-1; i>=0; i--)	{
		var tD = vWork.al.tcdt[i];
//		if (tD.upload_id > 0) {
			relateCdatAry(tD.trans_id);
			if (vDynm.re.cdat.mod_fld1 + vDynm.re.cdat.mod_fld2 == 0) {
				vWork.al.tcdt.splice(i,1);
			}
//		}
	}

	if (vWork.al.tcdt.length > 0) {
		transUpdateInvt();
	}
}


//	 Entry for 
function bcInitInvcVoidUpdate()  {
// Initialize
	vWork.ar.sequProc.length = 0;
	vDynm.ob.sequ.sequNo = -1;
	
// Fetch Temp Details for current xact from store to array
	vWork.ar.sequProc.push(function () { tranFetchAllTc('tchd') } );

// Fetch  Temp Headers for current xact from store to array
	vWork.ar.sequProc.push(function () { tranFetchAllTc('tcdt') } );

// Build Array of ITRN records
	vWork.ar.sequProc.push(function () { invcBuildItrnArray(2) } );

// Put array to ITRN store
	vWork.ar.sequProc.push(function () { invcUpdateItrn() } );

// Update vDynm objects
	vWork.ar.sequProc.push(function () { invcUpdateDynm() } );

// Clear Temp Cust Serv Stores
	vWork.ar.sequProc.push(function () { tranClearTcStores(nextSeq) } );

// Update this route record in RDHR store
	vWork.ar.sequProc.push(function () { csdnUpdateRhdr() } );

// CSDN Update Complete
	vWork.ar.sequProc.push(function () { invcVoidComplete() } );

// Run Sequence	
	nextSeq();
}


//	 Entry for 
function bcInitInvcUpdate()  {
// Initialize
	vWork.ar.sequProc.length = 0;
	vDynm.ob.sequ.sequNo = -1;

// Fetch Temp Details for current xact from store to array
	vWork.ar.sequProc.push(function () { tranFetchAllTc('tchd') } );

// Fetch  Temp Headers for current xact from store to array
	vWork.ar.sequProc.push(function () { tranFetchAllTc('tcdt') } );

// Build Array of ITRN records
	vWork.ar.sequProc.push(function () { invcBuildItrnArray(0) } );

// Put array to ITRN store
	vWork.ar.sequProc.push(function () { invcUpdateItrn() } );
	
// Update INVT / Preloads
//	vWork.ar.sequProc.push(function () { invcPrepInvtUpdate() } );
	vWork.ar.sequProc.push(function () { transUpdateInvt() } );

// Update vDynm objects
	vWork.ar.sequProc.push(function () { invcUpdateDynm() } );

// Clear Temp Cust Serv Stores
	vWork.ar.sequProc.push(function () { tranClearTcStores(nextSeq) } );

// Update this route record in RDHR store
	vWork.ar.sequProc.push(function () { csdnUpdateRhdr() } );

// Update Complete
	vWork.ar.sequProc.push(function () { invcUpdateComplete() } );

// Run Sequence	
	nextSeq();


}



