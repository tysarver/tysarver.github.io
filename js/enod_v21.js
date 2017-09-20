/*
  Copyright (c) 2016 Aziom, Inc. All rights reserved.
*/


function enodDispCol() {
	var idColChk = document.getElementById('i_enodColChk');
	var idColCsh = document.getElementById('i_enodColCsh');
	var idColTot = document.getElementById('i_enodColTot');

	idColChk.innerHTML = vDynm.ob.enod.roa.chkAmt.toFixed(2);
	idColCsh.innerHTML = vDynm.ob.enod.roa.cshAmt.toFixed(2);
	idColTot.innerHTML = (vDynm.ob.enod.roa.chkAmt + vDynm.ob.enod.roa.cshAmt).toFixed(2);
}


function enodReDispBal() {
	var idOdoEnt = document.getElementById('i_enodOdoEnt');

	var idChkEnt = document.getElementById('i_enodChkEnt');
	var idCshEnt = document.getElementById('i_enodCshEnt');
	var idDepTot = document.getElementById('i_enodDepTot');

	var idBalCol = document.getElementById('i_enodBalCol');
	var idBalDep = document.getElementById('i_enodBalDep');
	var idBalDif = document.getElementById('i_enodBalDif');

	vWork.ob.enod.depTot = vDynm.ob.enod.depChk + vDynm.ob.enod.depCsh;
	vWork.ob.enod.colTot = vDynm.ob.enod.roa.chkAmt + vDynm.ob.enod.roa.cshAmt;
	vWork.ob.enod.difTot = vWork.ob.enod.colTot - vWork.ob.enod.depTot;

	if (vWork.ob.enod.difTot != 0) {
		idBalDif.style.color = 'red';
	} else {
		idBalDif.style.color = 'green';
	}

	idOdoEnt.value = vDynm.ob.enod.roa.odoEnt.toFixed();

	idChkEnt.value = (vDynm.ob.enod.depChk||0).toFixed(2);
	idCshEnt.value = (vDynm.ob.enod.depCsh||0).toFixed(2);
	idDepTot.innerHTML = vWork.ob.enod.depTot.toFixed(2);

	idBalCol.innerHTML = vWork.ob.enod.colTot.toFixed(2);
	idBalDep.innerHTML = vWork.ob.enod.depTot.toFixed(2);
	idBalDif.innerHTML = vWork.ob.enod.difTot.toFixed(2);
}


function enodValidVal(iN) {
	var eI = document.getElementById(iN);
	if (eI.value == "") {
		eI.focus();
		eI.select();
		return false;
	} else {
		return true;
	}
}


function enodClearAlIdb() {
	vWork.ar.prntStr = [];
	vWork.ar.prntDat = [];
	vWork.ar.prntPage = [];
	vWork.al.tchd = [];
	vWork.al.tcdt = [];
	tranClearTcStores();
}


function enodPreLoadInit() {
	vDynm.ob.csrv.payMeth = 99;
	vDynm.ob.csrv.startDateTime = new Date();
	vDynm.ob.csrv.startDateTimeStr = vDynm.ob.csrv.startDateTime.toLocaleString('en-US');
	enodClearAlIdb();
	nextSeq();
}


function enodInitTransId(tI) {
	vStat.al.dept =
	[
		{"cust_no":0,"dept_no":1,"dept_desc":"End of Day","modified":"2016-10-12 07:12:52","ut_dnld":1476270772},
	];
	vDynm.re.dept = vStat.al.dept[0];

}


function enodFetchTodaysUpld(tbl) {
	promFetchRangeIdx(vWork.db.upld.handle, tbl, 'modIdx',  vDynm.ob.stod.startTs, 1999999999999).then(function (datAry) {
		vWork.al[tbl] = datAry;
		nextSeq();
	});
}


function enodBldNegativeInventory() {

	function bldNewNegInvtTcdt(e) {
		if (e.qty_7 < 0) {
			vDynm.ob.csrv.alProdIdx = relateProdAry(e.prod_no);
			vDynm.ob.csrv.alPgrpIdx = relatePgrpAry(vDynm.re.prod.prod_grp);
			vWork.al.tcdt.push(invcNewDtRec(1, e.qty_7));	// Truck
		}
		if (e.qty_8 < 0) {
			vDynm.ob.csrv.alProdIdx = relateProdAry(e.prod_no);
			vDynm.ob.csrv.alPgrpIdx = relatePgrpAry(vDynm.re.prod.prod_grp);
			vWork.al.tcdt.push(invcNewDtRec(1, e.qty_8));	// Warehouse
		}
	}

	prntInitTransId(200);
	enodInitTransId(200);

	vStat.al.invt.map(bldNewNegInvtTcdt);
	prntCreTchdPutIdb();

	nextSeq();
}


function enodBldSalesSummary() {
	function bldNewSalesSumTcdt(e) {
		if (e.qty_2 != 0 || e.qty_3 != 0 || e.qty_4 != 0 || e.qty_5 != 0 || e.qty_6 != 0) {
			vDynm.ob.csrv.alProdIdx = relateProdAry(e.prod_no);
			vDynm.ob.csrv.alPgrpIdx = relatePgrpAry(vDynm.re.prod.prod_grp);
			vWork.al.tcdt.push(invcNewDtRec(1, 1));	// Truck
		}
	}

	prntInitTransId(210);
	enodInitTransId(210);

	vStat.al.invt.map(bldNewSalesSumTcdt);
	prntCreTchdPutIdb();

	nextSeq();
}


function enodBldProductMovement() {
	prntInitTransId(220);
	enodInitTransId(220);

	nextSeq();
}


function enodBldDocumentRegister() {
	function accumCtrnTots(e, v) {
		if ( e.pay_method == 0 || e.pay_method == 5 || e.pay_method == 6) {
			v.cshAmt += e.total_invc || 0;
			v.cshCnt++;
		} else if ( e.pay_method == 1 ||  e.pay_method == 3) {
			v.chrAmt += e.total_invc || 0;
			v.chrCnt++;
		} else if ( e.pay_method == 2 ) {
			v.sdyAmt += e.total_invc || 0;
			v.sdyCnt++;
		}
		v.totAmt += e.total_invc || 0;
		v.totCnt++;
	}

	function bldCtrn2Tcdt(e) {
		relateCustAry(e.cust_no);
		relateDeptAry(e.dept_no);

		var tO = new docRegTcdt(e);
		tO.prod_grp = e.cust_no;
		tO.pgrp_desc = vDynm.re.cust.cust_name;

		tO.prod_desc = vDynm.re.dept.dept_desc;
		tO.alt_desc1 = vCnst.ar.rptSectStrs[e.tkt_type];

		if (e.total_invc < 0) {
			tO.alt_desc2 = vCnst.ar.creditMethStrs[e.pay_method];
		} else {
			tO.alt_desc2 = vCnst.ar.billMethStrs[e.pay_method];
		}

		tO.gross_price = e.total_invc;
		if (e.void_flag == 0) {
			if (e.tkt_type < 7) {
				accumCtrnTots(e, vWork.ob.enod.sls);
			} else {
				accumCtrnTots(e, vWork.ob.enod.roa);
			}
		} else {
			accumCtrnTots(e, vWork.ob.enod.vod);
		}

		vWork.al.tcdt.push(tO);
	}

	function bldItrn2Tcdt(e) {
//		relateCdatAry(e.inv_trnsid);

		var cP = vStat.al.cdat.findIndex(function (eC) { if (eC.upload_id == e.inv_trnsid && eC.trans_id > 99) {return true}; });
		if (cP < 0) {
			console.log("Doc Reg ITRN trans_id not in CDAT");
			vDynm.re.cdat = new cdatObj(transId, "Not in Index");
		} else {
			vDynm.re.cdat = JSON.parse(JSON.stringify(vStat.al.cdat[cP]));
		}

		var tO = new docRegTcdt(e);
		tO.prod_grp = vDynm.re.rhdr.route_id;
		tO.pgrp_desc = 'Route Transaction';

		tO.prod_desc = 'Route';
		tO.alt_desc1 = vDynm.re.cdat.trans_name;
		if (e.hdr_misc2 == 0) {
			tO.alt_desc2 = '';
		} else {
			tO.alt_desc2 = e.hdr_misc2;
		}
		tO.gross_price = 0;

		vWork.al.tcdt.push(tO);
		++vWork.ob.enod.sls.rteCnt;
	}
	vWork.ob.enod.sls = {chrAmt: 0, chrCnt: 0, cshAmt: 0, cshCnt: 0, sdyAmt: 0, sdyCnt: 0, totAmt: 0, totCnt: 0, rteCnt: 0};
	vWork.ob.enod.roa = {chrAmt: 0, chrCnt: 0, cshAmt: 0, cshCnt: 0, sdyAmt: 0, sdyCnt: 0, totAmt: 0, totCnt: 0, rteCnt: 0};
	vWork.ob.enod.vod = {chrAmt: 0, chrCnt: 0, cshAmt: 0, cshCnt: 0, sdyAmt: 0, sdyCnt: 0, totAmt: 0, totCnt: 0, rteCnt: 0};
	
	var tS = vWork.ob.enod.sls;
	var tR = vWork.ob.enod.roa;
	var tV = vWork.ob.enod.vod;

	vWork.al.ctrn.map(bldCtrn2Tcdt);
	vWork.al.itrn.map(bldItrn2Tcdt);

	tS.totCnt += tS.rteCnt || 0;
	vWork.ob.enod.docCnt = tS.totCnt + tR.totCnt + tV.totCnt;
	
	prntInitTransId(230);
	enodInitTransId(230);
	prntCreTchdPutIdb();

	if (tV.cshCnt > 0 || tR.cshCnt > 0 || tS.cshCnt > 0) vWork.al.tcdt.push(new docSumTcdt(1, "Cash",     tV.cshAmt, tV.cshCnt, tS.cshAmt, tS.cshCnt, tR.cshAmt, tR.cshCnt));
	if (tV.chrCnt > 0 || tR.chrCnt > 0 || tS.chrCnt > 0) vWork.al.tcdt.push(new docSumTcdt(1, "Charge",   tV.chrAmt, tV.chrCnt, tS.chrAmt, tS.chrCnt, tR.chrAmt, tR.chrCnt));
	if (tV.sdyCnt > 0 || tR.sdyCnt > 0 || tS.sdyCnt > 0) vWork.al.tcdt.push(new docSumTcdt(1, "7-Day",    tV.sdyAmt, tV.sdyCnt, tS.sdyAmt, tS.sdyCnt, tR.sdyAmt, tR.sdyCnt));
	if (tV.rteCnt > 0 || tR.rteCnt > 0 || tS.rteCnt > 0) vWork.al.tcdt.push(new docSumTcdt(1, "Route", 0, tV.rteCnt, 0, tS.rteCnt, 0, tR.rteCnt));

	prntInitTransId(232);
	enodInitTransId(233);
	prntCreTchdPutIdb();

	nextSeq();
}


function enodBldDeposit() {
	function bldCtrp2Tcdt(e) {
		if (e.chk_no > 0) {
			var tI = vWork.al.ctrn.findIndex(function (j) { if (e.tkt_no == j.tkt_no) {return true}; });
			if (tI < 0) {
				relateCustAry(0);	// No CTRN for CTRP
			} else {
				relateCustAry(vWork.al.ctrn[tI].cust_no);
			}
			var tO = new depTcdt(e);
			vWork.al.tcdt.push(tO);
		}
	}

	relateCdatAry(240);

	vWork.al.ctrp.map(bldCtrp2Tcdt);

	prntInitTransId(240);
	enodInitTransId(240);
	prntCreTchdPutIdb();

	vDynm.ob.enod.depChkDif = (vDynm.ob.enod.roa.chkAmt||0) - (vDynm.ob.enod.depChk||0)

	nextSeq();
}


function enodBldNonStops() {
	prntInitTransId(250);
	enodInitTransId(250);

	nextSeq();
}


function enodSumOpenUchg() {
	var tS = 0;
	vStat.al.uchg.map(function (e) {
		if (e.tkt_status == 'O') {
			tS += e.tkt_amt;
		}
	});
	return tS;
}


function enodBldDailyRecap() {
	vWork.ob.enod.capOsd = enodSumOpenUchg();

	vWork.ob.enod.cshRoa = vDynm.ob.enod.roa.chkAmt + vDynm.ob.enod.roa.cshAmt;
	vWork.ob.enod.cshXpn = 0;

	vWork.ob.enod.cshDue = vWork.ob.enod.sls.cshAmt +	vWork.ob.enod.cshRoa +	vWork.ob.enod.cshXpn;
	vWork.ob.enod.cshDif = vWork.ob.enod.cshDue - vWork.ob.enod.depTot;

//	Recap Milage
	var tO = new capTcdt(260, '', 0);
	tO.prod_no = vDynm.re.rhdr.start_odom;
	tO.phy_qty1 = vDynm.ob.enod.roa.odoEnt;
	tO.phy_qty2 = vDynm.ob.enod.roa.odoEnt - tO.prod_no;
	vWork.al.tcdt.push(tO);

//	Sales Summary
	var tO = new capTcdt(261, 'Cash', vWork.ob.enod.sls.cshAmt);
	vWork.al.tcdt.push(tO);

	var tO = new capTcdt(261, 'Charge', vWork.ob.enod.sls.chrAmt);
	vWork.al.tcdt.push(tO);

	var tO = new capTcdt(261, '7-Day Charge', vWork.ob.enod.sls.sdyAmt);
	vWork.al.tcdt.push(tO);

//	Cash Recon
	var tO = new capTcdt(262, 'Cash Documents', vWork.ob.enod.sls.cshAmt);
	vWork.al.tcdt.push(tO);

	var tO = new capTcdt(262, 'ROA Collections', vWork.ob.enod.cshRoa);
	vWork.al.tcdt.push(tO);

	var tO = new capTcdt(262, 'Expenses', vWork.ob.enod.cshXpn);
	vWork.al.tcdt.push(tO);

	prntInitTransId(260);
	enodInitTransId(260);

	prntCreTchdPutIdb();

	nextSeq();
}


function enodBldComplete() {

	boxChange(8008);
}


// Call from "Print" button on Reports Selection Screen
function enodPrintSelDone() {
	prntSetTcdtCheckedFromSel();
	boxChange(8010);
}


//  From Menu call, Build Documents, call for print
function enodPrintProc(noXactBox, moreDocsBox)  {

//	No Transactions in TCDT
	if (vWork.al.tcdt.length == 0) {
		boxChange(noXactBox);
		return;
	}

//	Transactions in TCDT, but nothing to print
	if (!prntBuildXactions()) {
		var tI = vWork.al.tchd.findIndex(function (e) { if (e.printed != 2) {return true}; });
		if (tI < 0) {
			boxChange(noXactBox);	// No Trans
		} else {
			boxChange(moreDocsBox);	// Docs Remain
		}
		return;
	}

	var newCprn = vWork.ar.prntStr.join('');
	var newTitle = "Rt" + vDynm.re.rhdr.route_id + "_Tkt" + vDynm.re.tchd.tkt_no;
	var orgTitle = document.title;

	document.getElementById('i_cprnDiv').innerHTML = newCprn;
	document.title = newTitle;

//	setTimeout(function () {prntCallPrint(orgTitle, enodPrintPreViewClosed)},300);
	prntCallPrint(orgTitle, enodPrintPreViewClosed);
}


// Preview closed, Reports printing
function enodPrintPreViewClosed() {
	var allReqPrinted = true;
	vWork.al.tchd.map(function (tH) {
		if (tH.checked) {
			tH.printed = 2;
			tH.changed = false;
			tH.pay_method = 99;
			putObj2IdbWork('tchd',tH);
		}
		if (tH.printed < 2 && tH.cdat.use_tkt > 0) {
			allReqPrinted = false;
		}
	});

	if (allReqPrinted) {
		boxChange(8020);	// No Transactions that Req print
	} else {
		boxChange(8030);	// More to Print
	}
}


function enodCallStod() {
	boxChange(1010);
}


//
//	 Calls from SDAT screens
//

function enodMileChange() {
	var idOdoEnt = document.getElementById('i_enodOdoEnt');
	vDynm.ob.enod.roa.odoEnt = 	idOdoEnt.value * 1;
}


function enodChecksChange() {
	var idChkEnt = document.getElementById('i_enodChkEnt');
	vDynm.ob.enod.depChk = 	idChkEnt.value * 1;
	idChkEnt.value = vDynm.ob.enod.depChk.toFixed(2);
	enodReDispBal();
}


function enodCashChange() {
	var idCshEnt = document.getElementById('i_enodCshEnt');
	vDynm.ob.enod.depCsh = 	idCshEnt.value * 1;
	idCshEnt.value = vDynm.ob.enod.depCsh.toFixed(2);
	enodReDispBal();
}


function endoOdoDepCont() {
	if (enodValidVal('i_enodOdoEnt') && enodValidVal('i_enodChkEnt') && enodValidVal('i_enodCshEnt')) {
		boxChange(8004);
	}
}


//
//	Calls from Menu
//
function bcInitEndOfDay() {
	vWork.ob.enod = {};
	vDynm.ob.enod.depChk = 0;
	vDynm.ob.enod.depCsh = 0;
	vDynm.ob.enod.roa.odoEnt = 0;
	boxChange(8002);
}


//	Initialize Entry Screen
function bcInitEndOfDayValEntry() {
	enodDispCol();
	enodReDispBal();
}


function bcInitEnodPreLoad()  {


// Initialize
	vWork.ar.sequProc.length = 0;
	vDynm.ob.sequ.sequNo = -1;

// Load
	vWork.ar.sequProc.push(function () { enodPreLoadInit() } );

// Load rhdr into ary
	vWork.ar.sequProc.push(function () { fetchRecIntoDynmRe(vWork.db.dnld.handle, 'rhdr', vDynm.re.misc.userInfo.route_id); } );

// Load
	vWork.ar.sequProc.push(function () { enodFetchTodaysUpld('ctrn') } );

// Load
	vWork.ar.sequProc.push(function () { enodFetchTodaysUpld('ctdt') } );

// Load
	vWork.ar.sequProc.push(function () { enodFetchTodaysUpld('ctrp') } );

// Load
//	vWork.ar.sequProc.push(function () { enodFetchTodaysUpld('ctrt') } );

// Load
	vWork.ar.sequProc.push(function () { enodFetchTodaysUpld('itrn') } );

// Load
	vWork.ar.sequProc.push(function () { enodFetchTodaysUpld('itdt') } );

// Load
	vWork.ar.sequProc.push(function () { enodFetchTodaysUpld('xpns') } );

// Load
	vWork.ar.sequProc.push(function () { enodFetchTodaysUpld('xpdt') } );

// Load
	vWork.ar.sequProc.push(function () { enodBldNegativeInventory() } );

// Load
	vWork.ar.sequProc.push(function () { enodBldSalesSummary() } );

// Load
	vWork.ar.sequProc.push(function () { enodBldProductMovement() } );

// Load all cust into ary
	vWork.ar.sequProc.push(function () { loadCsrvAry(vWork.db.dnld.handle, 'cust', 0, 99999999, new custObj(0,0,"")) } );

// Load all dept into ary
	vWork.ar.sequProc.push(function () { loadCsrvAry(vWork.db.dnld.handle, 'dept', [0,0], [99999999,9999], new deptObj(0,0,"")) } );

// Load all uchg into ary
	vWork.ar.sequProc.push(function () { loadCsrvAry(vWork.db.dnld.handle, 'uchg', [0,0], [99999999,99999999], new uchgObj(0,0,"")) } );

// Load

	vWork.ar.sequProc.push(function () { enodBldDocumentRegister() } );

// Load
	vWork.ar.sequProc.push(function () { enodBldNonStops() } );

// Load
	vWork.ar.sequProc.push(function () { enodBldDeposit() } );

// Load
	vWork.ar.sequProc.push(function () { enodBldDailyRecap() } );

// Load
	vWork.ar.sequProc.push(function () { enodBldComplete() } );

// Run Sequence
	nextSeq();
}


function bcInitEnod1PrintRequest() {
	if (vWork.al.tcdt.length > 0) {
		prntXactHdrsScan();
		prntXactHdrsDisp(204800);
		prntXactSetVals();
	} else {
		boxChange(8020);
	}
}


function bcInitEnod1PrintProcedure() {
	enodPrintProc(8020, 8008);
}


function bcInitEnod1PrintComplete() {

}
function bcInitEnodClear() {
	enodClearAlIdb();
	boxChange(2000);
}

function bcInitEnodSync() {
	var tRhdu = new rhduObj(vDynm.re.rhdr);
	putObj2IdbUpld('rhdu',tRhdu);

	vDynm.re.rhdr.end_odom = vDynm.ob.enod.roa.odoEnt;
	putObj2IdbDnld('rhdr',vDynm.re.rhdr);
	enodClearAlIdb();
	bcInitSyncSend(8210, enodCallStod); // OffLine: goto Box, Online: callback
}
