/*
  Copyright (c) 2016 Aziom, Inc. All rights reserved.
*/


function iprnPrintSelDone() {
	prntSetTcdtCheckedFromSel();

	boxChange(5310);
}


function iprnPrintPreViewClosed() {
	var allReqPrinted = true;
	vWork.ar.bldItrn = [];	

	vWork.al.tchd.map(function (tH) {
		if (tH.checked) {
			tH.printed = 2;
			tH.changed = false;
			tH.pay_method = 99;
			putObj2IdbWork('tchd',tH);

			var hRec = new tchd2itrn(tH, 1);
			if (tH.cdat.upload_id > 0 && tH.cdat.use_tkt > 0) {
				var rptDtlAry = vWork.al.tcdt.filter(function (o) { return o.rpt_sect == tH.rpt_sect});
				var rptItdtAry = [];
				rptDtlAry.map(function (tD) {
					tRec = new tcdt2itdt(tD);
					tRec.tkt_no = tH.tkt_no;
					rptItdtAry.push(tRec);
				} );
				if (rptItdtAry.length > 0) {
					promAddAryToIdb(vWork.db.upld.handle, 'itdt', rptItdtAry);
					putObj2IdbUpld('itrn', hRec);
				}
			}
		}
		if (tH.printed < 2 && tH.cdat.use_tkt > 0) {
			allReqPrinted = false;
		}
	});

	if (allReqPrinted) {
		boxChange(5320);	// No Transactions that Req print
	} else {
		boxChange(5330);	// More to Print
	}
}


function prntIprnNoDocDone() {


}


function iprnReloadCallPrnt() {
	promFetchAllIdx(vWork.db.work.handle, 'tcdt', 'print_order').then(function (datAry) {
		vWork.al.tcdt = datAry.filter(function (o) { return o.sell_qty > 0});
		prntXactHdrsScan();
		prntXactHdrsDisp(204900);
		prntXactSetVals();
    }).catch(function (error) {
		console.log(error);
    });
}

function tranCombineDepts() {
	var combRecId	= vDynm.re.cdat.comb_rec_id;
//	var combChanged	= false;
	var combAry 	= [];
	var combIdx 	= [];
	var tdIdx 		= [];
	var orgRptSect	= vDynm.re.cdat.rpt_sect;
	var orgCdatRec 	= vDynm.re.cdat;

	relateCdatAry(combRecId);

	var thP = vWork.al.tchd.findIndex(function (e) { if (e.dept_no == 0 && e.rpt_sect == vDynm.re.cdat.rpt_sect) {return true}; });
	if (thP < 0) {
		vDynm.re.tchd = new tchdObj(0, 0,  'Stock', vDynm.re.cdat.rpt_sect, 'Physical');
		thP = vWork.al.tchd.push(vDynm.re.tchd) - 1;
	} else {
		vDynm.re.tchd = JSON.parse(JSON.stringify(vWork.al.tchd[thP]));
	}

//	Combine Dept > 0 values into temp arry	
	vWork.al.tcdt.map( function(tD) {
		if (tD.dept_no > 0) {
			tdIdx.push(0);
			var cP = combIdx.indexOf(tD.prod_no);
			var tI = vStat.al.dept.findIndex(function (e) { if (e.dept_no == tD.dept_no) {return true}; });
			if (tI < 0) tI=0;

			var cNam = 'xt'+tI+'_qty1';
			var uNam = 'xt'+tI+'_qty2';
			var tNam = 'xt'+tI+'_qty';

			if (cP < 0) {
				cP = combAry.push(tD) -1;
				combIdx.push(tD.prod_no);
				combAry[cP].dept_no 	= 0;
				combAry[cP].rpt_sect 	= vDynm.re.cdat.rpt_sect;
				combAry[cP].trans_id 	= vDynm.re.cdat.trans_id;
				combAry[cP].upload_id 	= vDynm.re.cdat.upload_id;
			} else {
				combAry[cP].phy_qty1 += tD.phy_qty1;
				combAry[cP].phy_qty2 += tD.phy_qty2;
				combAry[cP].sell_qty += tD.sell_qty;
			}
			combAry[cP][cNam] = tD.phy_qty1;
			combAry[cP][uNam] = tD.phy_qty2;
			combAry[cP][tNam] = tD.sell_qty;
		} else {
			tdIdx.push(tD.prod_no);
		}
	});

//	Merge temp array into Dept 0 records - flag for reprint if changes
	combAry.map( function(cD) {
			var cP = tdIdx.indexOf(cD.prod_no);
			if (cP < 0) {
				vWork.al.tcdt.push(cD);
			} else {
				if ( JSON.stringify(cD) !=  JSON.stringify(vWork.al.tcdt[cP]) ) {
					vWork.al.tcdt[cP] = cD;
					vWork.al.tchd[thP].changed = true;
				}
			}
	});

	vDynm.re.cdat	= orgCdatRec;
	promAddAryToIdb(vWork.db.work.handle, 'tcdt', vWork.al.tcdt, iprnReloadCallPrnt);
}


//	 Entry for 
function bcInitIprnPrintRequest()  {
	promFetchAll(vWork.db.work.handle, 'tchd').then(function (datAry) {
		vWork.al.tchd = datAry;
		promFetchRec(vWork.db.dnld.handle, 'rhdr', vDynm.re.rhdr.route_id).then(function (data) {
			vDynm.re.rhdr = data;
			promFetchAllIdx(vWork.db.work.handle, 'tcdt', 'print_order').then(function (datAry) {
				vWork.al.tcdt = datAry.filter(function (o) { return o.sell_qty > 0});
				if (vWork.al.tcdt.length > 0) {
					if (vDynm.re.cdat.comb_rec_id > 0) {
						tranCombineDepts();
					} else {
						prntXactHdrsScan();
						prntXactHdrsDisp(204900);
						prntXactSetVals();
					}
				} else {
					boxChange(5302);
				}
		    }).catch(function (error) {
				console.log(error);
		    });
	    }).catch(function (error) {
			console.log(error);
	    });

    }).catch(function (error) {
		console.log(error);
    });
}


//	 Entry for 
function bcInitInvcPrintProcedure()  {

//	No Transactions in TCDT
	if (vWork.al.tcdt.length == 0) {
		boxChange(5302);
		return;
	}
	
//	Transactions in TCDT, but nothing to print
	if (!prntBuildXactions()) {
		var tI = vWork.al.tchd.findIndex(function (e) { if (e.printed != 2) {return true}; });
		if (tI < 0) {
			boxChange(5302);
		} else {
			boxChange(5304);
		}
		return;
	}
	
	var newCprn = vWork.ar.prntStr.join('');
	var newTitle = "Rt" + vDynm.re.rhdr.route_id + "_Tkt" + vDynm.re.tchd.tkt_no;
	var orgTitle = document.title;

	document.getElementById('i_cprnDiv').innerHTML = newCprn;
	document.title = newTitle;

//	setTimeout(function () {prntCallPrint(orgTitle, iprnPrintPreViewClosed)},300);
	prntCallPrint(orgTitle, iprnPrintPreViewClosed);
}


//	 Entry for 
function bcInitIprnPrintComplete()  {
	putObj2IdbDnld('rhdr',vDynm.re.rhdr);
	vWork.al.tchd.map(function (e) {
//		if (e.pay_method != vDynm.ob.csrv.payMeth) {
			e.pay_method = vDynm.ob.csrv.payMeth;
			putObj2IdbWork('tchd',e);
//		}
	});
}


