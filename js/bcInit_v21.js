/*
  Copyright (c) Aziom, Inc 2016. All rights reserved.
*/


//	 Entry for Boot (0505)
function bcInitBoot()  {
	function movevDynm(data) {
		vDynm = data;

		vDynm.ob.sequ.sequNo = 99;
		vCnst.ar.storeToStatAry.map(function (o){ptciStoreToStat(o)});
//		ptciStoresToStatArys();
		boxChange(vDynm.ob.disp.nextLevelPrompt);
	}

	function movevStat(data) {
		vStat = data;
		promFetchRec(vWork.db.base.handle, 'vStor', 'vDynm').then(movevDynm).catch(alert);
	}

	if (typeof(vPreLoadUser) == "undefined") {
		// Using Existing IDBs
		promFetchRec(vWork.db.base.handle, 'vStor', 'vStat').then(movevStat).catch(alert);
	} else {
		// IDBs Reloaded from AWS
		boxChange(1010);
	}
}


//	 Entry for
function bcInitMainMenu()  {
//	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitMainMenuStats()  {
	setTimeout(function () {boxChange(2000);},2000);
}



//	 Entry for 2040 Main Menu SetUp Button
function bcInitMainMenuSettings()  {
	document.getElementById('i_mmnsRouteIdDat').innerHTML = vDynm.re.misc.userInfo.route_id;
	document.getElementById('i_mmnsVTraxVerDat').innerHTML = vDynm.re.misc.userInfo.version;
	document.getElementById('i_mmnsVTraxSubVerDat').innerHTML = '2';

	document.getElementById('i_mmnsDispZoomDat').innerHTML = vDynm.ob.disp.scale;
	document.getElementById('i_mmnsDebugStatDat').innerHTML = vCnst.el.debugDispStatLine;
	document.getElementById('i_mmnsPick2Dat').innerHTML = vCnst.el.pick2col;
}

function bcInitToggleDebugStat() {
	if (vCnst.el.debugDispStatLine) {
		vCnst.el.debugDispStatLine = false;
	} else {
		vCnst.el.debugDispStatLine = true;
	}
	document.getElementById('i_mmnsDebugStatDat').innerHTML = vCnst.el.debugDispStatLine;
}


function bcInitTogglePick2() {
	if (vCnst.el.pick2col) {
		vCnst.el.pick2col = false;
	} else {
		vCnst.el.pick2col = true;
	}
	document.getElementById('i_mmnsPick2Dat').innerHTML = vCnst.el.pick2col;
}


//	 Entry for
function bcInitCsrvSetNewAccount()  {
	setTimeout(function () {boxChange(3100);},2000);
}


//	 Entry for
function bcInitCsrvRetagCustomer()  {
	setTimeout(function () {boxChange(3100);},2000);
}


//	 Entry for
function bcInitCsrvAddEquipment()  {
	setTimeout(function () {boxChange(3100);},2000);
}


//	 Entry for
function bcInitCsrvExchangeEquipment()  {
	setTimeout(function () {boxChange(3100);},2000);
}


//	 Entry for
function bcInitCsrvRemoveEquipment()  {
	setTimeout(function () {boxChange(3100);},2000);
}


//	 Entry for
function bcInitCsrvPromoChangeExisting()  {
	setTimeout(function () {boxChange(3100);},2000);
}


//	 Entry for
function bcInitCsrvPromoConnect()  {
	setTimeout(function () {boxChange(3100);},2000);
}


//	 Entry for
function bcInitCsrvPromoAdd()  {
	setTimeout(function () {boxChange(3100);},2000);
}


//	 Entry for
function bcInitCsrvPromoChange()  {
	setTimeout(function () {boxChange(3100);},2000);
}


//	 Entry for
function bcInitCsrvPromoDelete()  {
	setTimeout(function () {boxChange(3100);},2000);
}


//	 Entry for
function bcInitCsrvAnalysisHistorical()  {
	setTimeout(function () {boxChange(3100);},2000);
}


//	 Entry for
function bcInitCsrvAnalysisProjected()  {
	setTimeout(function () {boxChange(3100);},2000);
}


//	 Entry for
function bcInitCsrvNoSaleHistory()  {
	setTimeout(function () {boxChange(3100);},2000);
}


//	 Entry for
function bcInitCsrvNoSaleReason()  {
	setTimeout(function () {boxChange(3100);},2000);
}


//	 Entry for
function bcInitCsrvStatus()  {
	var iD = '';
	if (iD = document.getElementById('i_cselCustNo')) iD.innerHTML = vDynm.re.cust.cust_no;
	if (iD = document.getElementById('i_cselXtraPrnt')) {
		 iD.innerHTML = vDynm.re.cust.xtra_prnt;
	}
}


//	 Entry for
function bcInitCsrvHoldRequest()  {
	setTimeout(function () {boxChange(3100);},2000);
}


//	 Entry for
function bcInitCsrvHoldUpdate()  {
	setTimeout(function () {boxChange(3100);},2000);
}


//	 Entry for
function bcInitCsrvAskAllOk()  {
	var tblDtlId = document.getElementById('i_csdnCustTotTbl');
	var tblDtlStr = "";
	relateSdatAry(204960);
	var htmlStr = vDynm.re.sdat.scrContent;

	vWork.al.tchd.map(function (tH) {
		if (tH.printed != 9) {
			var tS = (JSON.parse(JSON.stringify(htmlStr)));

			tS = tS.replace('~tktno~', tH.tkt_no);
			tS = tS.replace('~dept~', tH.dept_no);
			tS = tS.replace('~type~', vCnst.ar.rptSectStrs[tH.rpt_sect]);
			tS = tS.replace('~qty~', tH.sellQty);
			tS = tS.replace('~ext~', tH.tot_invc.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
			tblDtlStr += tS;
		}
	});
	tblDtlId.innerHTML = tblDtlStr;

	cprnBuildMethSel('i_csdnPayMethSel');

//	boxChange(4980);
}


//	 Entry for



function bcInitListInventoryPrep()  {

	function bldNewInvtListTcdt(e) {
		vDynm.ob.csrv.alProdIdx = relateProdAry(e.prod_no);
		vDynm.ob.csrv.alPgrpIdx = relatePgrpAry(vDynm.re.prod.prod_grp);
		if (e.qty_2 > 0) {
			vWork.al.tcdt.push(invcNewDtRec(2, e.qty_2));	// Sales
		}
		if (e.qty_3 > 0) {
			vWork.al.tcdt.push(invcNewDtRec(3, e.qty_3));	// Good Return
		}
		if (e.qty_4 > 0) {
			vWork.al.tcdt.push(invcNewDtRec(4, e.qty_4));	// Samples
		}
		if (e.qty_5 > 0) {
			vWork.al.tcdt.push(invcNewDtRec(5, e.qty_5));	// Damaged
		}
		if (e.qty_6 > 0) {
			vWork.al.tcdt.push(invcNewDtRec(6, e.qty_6));	// Our Of Date
		}
		if (e.qty_7 > 0) {
			vWork.al.tcdt.push(invcNewDtRec(7, e.qty_7));	// Truck
		}
		if (e.qty_8 > 0) {
			vWork.al.tcdt.push(invcNewDtRec(8, e.qty_8));	// Warehouse
		}
	}

	invcInitEntry(163);
	vStat.al.dept = vCnst.ar.invtRevwDepts;
	vDynm.re.dept = vStat.al.dept[0];
//	if (vDynm.re.cdat.load_ctrl > 0) {
		vStat.al.invt.map(function (e){bldNewInvtListTcdt(e)});
//	}
	prntCreTchdPutIdb();
}


function bcInitListInventoryEntry()  {
	tranInitXact(163);
	relateSdatAry(205410);
	i_SectSubHdr.innerHTML=vDynm.re.sdat.scrContent;
	i_SectHdr.innerHTML = vDynm.re.cdat.trans_name;
	tranBldDeptNameSelect();
}


//	 Entry for
function bcInitListCustomer()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitListProduct()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitListPromotions()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitListOrderTemplates()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitMaintAddCustomer()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitMaintChangeCustomer()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitMaintDeleteCustomer()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitMaintOrderTemplates()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitMaintPromotions()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitExpensePaidOut()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitExpenseCharged()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitExpenseCategories()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitEquipExchange()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitEquipInventory()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitEquipLocate()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitEquipPullEquipment()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitEquipRetagCustomer()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitEquipRetagInventory()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitEquipSetNewAccount()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitEquipTransferIn()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitEquipTransferOut()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitEquipAdd()  {
	setTimeout(function () {boxChange(2000);},2000);
}


//	 Entry for
function bcInitTestPrint()  {
	document.getElementById('i_MainDiv').innerHTML = '<br><br><input type="button"  value="Print" onclick="printWin()"/><br><br>'
}

	function printWin() {
	var someting = "do calcs and populate printDiv";
		window.print();
	}


function bcInitMainMenuInfo() {
	function refreshIP() {
		for(var i=0; i<vDynm.ar.ips.length; i++) {
			var iD = document.getElementById('i_mmniCurrIp'+(i+1));
			if (iD) iD.innerHTML = vDynm.ar.ips[i];
		}
	}

	scanForIp(refreshIP);
	setCurrDowAndTxt();
	document.getElementById('i_mmniRouteId').innerHTML = vDynm.re.misc.userInfo.route_id;
	document.getElementById('i_mmniUserId').innerHTML = vDynm.re.misc.userInfo.userid;
	document.getElementById('i_mmniDataBase').innerHTML = vDynm.re.misc.userInfo.db;
	document.getElementById('i_mmniNextTkt').innerHTML = vDynm.re.rhdr.next_tkt_1;
	document.getElementById('i_mmniDow').innerHTML = vDynm.ob.csrv.currDowTxt;
	document.getElementById('i_mmniVTraxVer').innerHTML = vDynm.re.misc.userInfo.version;
	//	document.getElementById('i_mmniVTraxDate').innerHTML = document.lastModified;

	document.getElementById('i_mmniLastComm').innerHTML = formatMiscLastUpdt();
	document.getElementById('i_mmniOnline').innerHTML = navigator.onLine;

	navigator.webkitTemporaryStorage.queryUsageAndQuota(
		function (usedBytes, grantedBytes) {
			document.getElementById('i_mmniMemUsed').innerHTML = usedBytes.toLocaleString('en');
			document.getElementById('i_mmniMemAvail').innerHTML = grantedBytes.toLocaleString('en');
		},
		function (e) {
			console.log('webkit Temp Storage Error', e);
		}
	);
}

 // OffLine, Online


function bcInitSyncSend(offBoxNo, callback) {
	function pickSendSync(ip) {
		if (ip == "offline") {
			boxChange(offBoxNo);
		} else {
			ptciDbfFuncs('Send', callback);
		}
	}
	scanForIp(pickSendSync);
}


function bcInitSyncLoad(offBoxNo, callback) {
	function pickLoadSync(ip) {
		if (ip == "offline") {
			boxChange(offBoxNo);
		} else {
			ptciDbfFuncs('Load', callback);
		}
	}
	scanForIp(pickLoadSync);
}


function bcInitSyncOffile() {

}