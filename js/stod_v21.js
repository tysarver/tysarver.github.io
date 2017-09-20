/*
  Copyright (c) 2016 Aziom, Inc. All rights reserved.
*/


function stodPreInitVars(){
	vDynm.ws.c2.Addend	=0;
	vDynm.ws.c2.BeginTime	=0;
	vDynm.ws.c2.CurrTcsv	=0;
	vDynm.ws.c2.CurrTkt	=0;
	vDynm.ws.c2.Dividend	=0;
	vDynm.ws.c2.Divisor	=0;
	vDynm.ws.c2.HighTcsv	=0;
	vDynm.ws.c2.HistDow	=0;
	vDynm.ws.c2.LastOdom	=0;
	vDynm.ws.c2.LastSequ	=0;
	vDynm.ws.c2.PrcDiv	=0;
	vDynm.ws.c2.PrintTkt	=0;
	vDynm.ws.c2.Rounding	=0;
	vDynm.ws.c2.TotMiles	=0;

	vDynm.ws.c2.SysFlag	= [];

	vDynm.ws.c3.DowType	=0
	vDynm.ws.c3.ModDates	=0
	vDynm.ws.c3.PrlAdj	=0
	vDynm.ws.c3.PrlCurr	=0
	vDynm.ws.c3.PrlLast	=0
	vDynm.ws.c3.PrlOrdr	=0
	vDynm.ws.c3.PrldTkt	=0
	vDynm.ws.c3.SecurCtl	=0

	vDynm.ws.c3.Cmisc	=[];
	vDynm.ws.c3.Caccum	=[];
	vDynm.ws.c3.Plist	=[];

	vDynm.ob.enod.roa = {chkAmt: 0, chkCnt: 0, cshAmt: 0, cshCnt: 0, partAmt:0, tktAmt:0, tktCnt:0};
}


function stodRestoreSubHdr() {
	var i_ssh 	= document.getElementById('i_SectSubHdr');
	i_ssh.innerHTML = vWork.ob.stod.subHdr.iH;
	i_ssh.style.color = vWork.ob.stod.subHdr.cO;
}


function stodPreDispInit(){
	vWork.ob.stod = {subHdr: {} };
	var i_ssh = document.getElementById('i_SectSubHdr');
	vWork.ob.stod.subHdr.iH = i_ssh.innerHTML;
	vWork.ob.stod.subHdr.cO = '#D3E3FE';
}


function stodDisp(){

//	var sectSubHdr 	= idTktPwdEnt = document.getElementById('i_SectSubHdr');
//	sectSubHdr.style.color = '#D3E3FE';
	
	document.getElementById('i_stodRouteId').innerHTML = vDynm.re.rhdr.route_id;
	document.getElementById('i_stodRouteType').innerHTML = vDynm.re.rhdr.route_type;

	document.getElementById('i_stodUserId').innerHTML = vDynm.re.misc.userInfo.userid;
	document.getElementById('i_stodTruckNo').innerHTML = vDynm.re.rhdr.truck_no;

//	document.getElementById('i_stodStartOdo').innerHTML = vDynm.re.rhdr.start_odom;
	document.getElementById('i_stodEncOdo').innerHTML = vDynm.re.rhdr.end_odom;

//	document.getElementById('i_stodNextTkt1').innerHTML = vDynm.re.rhdr.next_tkt_1;
	document.getElementById('i_stodNextCust').innerHTML = vDynm.re.rhdr.next_cust;

	document.getElementById('i_stodSalesmanNo').innerHTML = vDynm.re.rhdr.slsmn_no;
	document.getElementById('i_stodSalesmanName').innerHTML = vDynm.re.rhdr.slsmn_name + "&nbsp";

	document.getElementById('i_stodHelperNo').innerHTML = vDynm.re.rhdr.sls_hlp_no;
	document.getElementById('i_stodHelperName').innerHTML = vDynm.re.rhdr.helpr_name + "&nbsp";

	document.getElementById('i_stodOnline').innerHTML = navigator.onLine;
	document.getElementById('i_stodLastComm').innerHTML = vDynm.re.misc.lastHostDt;

	var idTktEnt = document.getElementById('i_stodTktNo');
	idTktEnt.value = vDynm.re.rhdr.next_tkt_1;
}


function stodInvtInitShuffle(){
	var iAry = vStat.al.invt;
	for (var i = 0; i < iAry.length; i++) {
		iAry[i].qty_2 = 0;
		iAry[i].qty_3 = 0;
		iAry[i].qty_4 = 0;
		iAry[i].qty_1 = iAry[i].qty_7;
		promPutRecNoKey(vWork.db.dnld.handle, 'invt', iAry[i]).catch(function (error) {console.log("STOD Put Invt: ", error);});
	}
//	nextSeq();
}


function stodInvtClearPreset() {
	if (vStat.al.invt.length > 0) {
		promClearStore(vWork.db.dnld.handle, 'invt').then(function (data) {
			stodInvtInitShuffle();
	    }).catch(function (error) {
	      console.log("Clear invt: ", error);
	    });
	} else {
		console.log("STOD: No Invt Array to Clear");
//		nextSeq();
	}
}


function stodClearTables(){
	promClearStore(vWork.db.work.handle, 'tcdt').catch(function (error) {console.log("Clear tcdt: ", error);});
	promClearStore(vWork.db.work.handle, 'tchd').catch(function (error) {console.log("Clear tchd: ", error);});

	promClearStore(vWork.db.sync.handle, 'tbag').catch(function (error) {console.log("Clear tbag: ", error);});
	promClearStore(vWork.db.sync.handle, 'tchk').catch(function (error) {console.log("Clear tchk: ", error);});
	promClearStore(vWork.db.sync.handle, 'tdsm').catch(function (error) {console.log("Clear tdsm: ", error);});
	promClearStore(vWork.db.sync.handle, 'tmsg').catch(function (error) {console.log("Clear tmsg: ", error);});
	promClearStore(vWork.db.sync.handle, 'tnam').catch(function (error) {console.log("Clear tnam: ", error);});
	promClearStore(vWork.db.sync.handle, 'tnsr').catch(function (error) {console.log("Clear tnsr: ", error);});
	promClearStore(vWork.db.sync.handle, 'tsan').catch(function (error) {console.log("Clear tsan: ", error);});
	promClearStore(vWork.db.sync.handle, 'ttkt').catch(function (error) {console.log("Clear ttkt: ", error);});
	promClearStore(vWork.db.sync.handle, 'ttot').catch(function (error) {console.log("Clear ttot: ", error);});
}


function stodPostInitVars() {
	vDynm.ob.stod.startTs = Math.floor(Date.now());
	vDynm.ar.dnld = [];
	vDynm.ar.upld = [];
}


function stodOdoChange() {
	var idOdoEnt 	= document.getElementById('i_stodOdoNo');
	vDynm.re.rhdr.start_odom = idOdoEnt.value;
	if (vDynm.re.rhdr.start_odom < vDynm.re.rhdr.end_odom) {
		var sectSubHdr 	= idTktPwdEnt = document.getElementById('i_SectSubHdr');
		sectSubHdr.innerHTML = 'Start Odo less than Ending';
		sectSubHdr.style.color = 'red';
	} else {
		stodRestoreSubHdr();
	}
}


function stodTktChange() {
	var idTktPwdDiv = document.getElementById('i_stodTktPwordDiv');
	idTktPwdDiv.style.display = 'block';
}

function stodPasswordEntry() {
	var sectSubHdr 	= idTktPwdEnt = document.getElementById('i_SectSubHdr');
	var idTktEnt 	= document.getElementById('i_stodTktNo');
	var idTktPwdInp = document.getElementById('i_stodTktPwordInp');
	
	if (idTktPwdInp.value == vDynm.re.rhdr.secur_4 || idTktPwdInp.value == vDynm.re.rhdr.secur_5) {
		vDynm.re.rhdr.next_tkt_1 = idTktEnt.value * 1;
	} else {
		idTktEnt.value = vDynm.re.rhdr.next_tkt_1;
		sectSubHdr.innerHTML = 'Invalid Password';
		sectSubHdr.style.color = 'red';
	}

	var idTktPwdDiv = document.getElementById('i_stodTktPwordDiv');
	idTktPwdDiv.style.display = 'none';
}


//
//	Menu Cals
//

function bcInitStodInit() {
	stodPreInitVars();
	boxChange(1020);
}


function bcInitStodVerify() {
	stodPreDispInit();
	stodDisp();
}


function bcInitStodSync() {
	bcInitSyncSend(1010, enodCallStod); // OffLine: goto Box, Online: callback
}


function bcInitStodOffline() {
}


function bcInitStodDone() {
	putObj2IdbDnld('rhdr',vDynm.re.rhdr);
	stodInvtClearPreset();
	stodClearTables();
	stodPostInitVars();
	boxChange(2000);
}