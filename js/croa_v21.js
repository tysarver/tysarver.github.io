/*
  Copyright (c) 2016 Aziom, Inc. All rights reserved.
*/


function croaDispTkts() {
	var tblDtlId = document.getElementById('i_croaTktSelTblBody');
	var balnTktId = document.getElementById('i_croaBalnTkt');
	var balnDifId = document.getElementById('i_croaBalnDif');
	var tblDtlStr = "";
	vWork.ob.roa.tktSum = 0;
	
	relateSdatAry(204410);
	var htmlStr = vDynm.re.sdat.scrContent;

	vDynm.ar.unpd.map(function (e) {
		var tS = (JSON.parse(JSON.stringify(htmlStr)));


		var rptDesc = vCnst.ar.rptSectStrs[e.rpt_sect];

		if (e.selected) {
			vWork.ob.roa.tktSum += e.tkt_amt;
			tS = tS.replace('~checked~', 'checked=checked');
		} else {
			tS = tS.replace('~checked~', '');
		}
		tS = tS.replace('~tktNo1~',e.tkt_no);	// Id
		tS = tS.replace('~tktNo2~',e.tkt_no);	// Passed Param
		tS = tS.replace('~tktNo3~',e.tkt_no);	// Display
		tS = tS.replace('~deptDesc~',e.dept_desc);
		tS = tS.replace('~rptDesc~',rptDesc);
		tS = tS.replace('~tktAmt~', e.tkt_amt.toFixed(2));	
	
		tblDtlStr += tS;
	});

	tblDtlId.innerHTML = tblDtlStr;
	balnTktId.innerHTML = vWork.ob.roa.tktSum.toFixed(2);
	balnDifId.innerHTML = (vWork.ob.roa.tktSum - vWork.ob.roa.chkSum).toFixed(2);
	tranBldDeptNameSelect();
}


function croaDispChks() {
	var tblDtlId = document.getElementById('i_croaChkEntTblBody');
	var balnChkId = document.getElementById('i_croaBalnPay');
	var balnDifId = document.getElementById('i_croaBalnDif');
	var tblDtlStr = "";
	vWork.ob.roa.chkSum = 0;

	relateSdatAry(204412);
	var htmlStr = vDynm.re.sdat.scrContent;

	vDynm.ar.pymt.map(function (e) {
		var tS = (JSON.parse(JSON.stringify(htmlStr)));
		tS = tS.replace('~chkNo1~',e.chk_no);		// Pased Param
		if (e.chk_no == 0) {
			tS = tS.replace('~chkNo2~',"Cash");		// Display
		} else {
			tS = tS.replace('~chkNo2~',e.chk_no);	// Display
		}
		tS = tS.replace('~chkAmt~', e.chk_amt.toFixed(2));	
		tblDtlStr += tS;
		vWork.ob.roa.chkSum += e.chk_amt * 1;
	});
	tblDtlId.innerHTML = tblDtlStr;
	balnChkId.innerHTML = vWork.ob.roa.chkSum.toFixed(2);
	balnDifId.innerHTML = (vWork.ob.roa.tktSum - vWork.ob.roa.chkSum).toFixed(2);
}


//	***
//	*** 	Calls from DOM	***
//	***
function croaTktClick(tktNo) {
	var tktChkId =  document.getElementById('i_roa_tkt_' + tktNo);
	var balnTktId = document.getElementById('i_croaBalnTkt');
	var balnDifId = document.getElementById('i_croaBalnDif');
	vWork.ob.roa.tktSum = 0;
	vDynm.ar.unpd.map(function (e) {
		if (e.tkt_no == tktNo) {
			e.selected = tktChkId.checked
		}
		if (e.selected) {
			vWork.ob.roa.tktSum += e.tkt_amt;
		}
	});

	balnTktId.innerHTML = vWork.ob.roa.tktSum.toFixed(2);
	balnDifId.innerHTML = (vWork.ob.roa.tktSum - vWork.ob.roa.chkSum).toFixed(2);
}


function croaAddTkt() {
	var tktNoId = document.getElementById('i_croa_tkt_no');
	var tktAmtId = document.getElementById('i_croa_tkt_amt');

	if (tktNoId.value == 0) return;

	var cP = vDynm.ar.unpd.findIndex(function (e) { if (e.tkt_no == tktNoId.value * 1) {return true}; });
	if (tktAmtId.value == 0) {
		if (cP >= 0 && vDynm.ar.unpd[cP].source == 'K') {
			vDynm.ar.unpd.splice(cP,1);
		}
	} else {
		var tktDeptId = document.getElementById('i_csDeptNoSel');
		var tktRptId = document.getElementById('i_croa_rpt_sect_sel');
		tU = new unpdBldObj(tktNoId.value, tktDeptId.value, vStat.al.dept[tktDeptId.selectedIndex].dept_desc, tktRptId.value, tktAmtId.value);
		if (cP < 0) {
			vDynm.ar.unpd.push(tU);
		} else {
			vDynm.ar.unpd[cP] = tU;
		}
	}

	tktNoId.value = "";
	tktAmtId.value = "";
	croaDispTkts();
}


function croaAddCheck() {
	var chkNoId = document.getElementById('i_croa_chk_no');
	var chkAmtId = document.getElementById('i_croa_chk_amt');

	if (chkNoId.value == "")  {
		var tCno = 0;
	} else {
		var tCno = chkNoId.value;
	}

	var cP = vDynm.ar.pymt.findIndex(function (e) { if (e.chk_no == tCno * 1) {return true}; });
	if (chkAmtId.value == 0) {
		if (cP >= 0) {
			vDynm.ar.pymt.splice(cP,1);
		}
	} else {
		tU = new pymtBldObj(tCno, chkAmtId.value);
		if (cP < 0) {
			vDynm.ar.pymt.push(tU);
		} else {
			vDynm.ar.pymt[cP] = tU;
		}
	}
	chkNoId.value = "";
	chkAmtId.value = "";
	croaDispChks();
}


function croaRemCheck(chkNo) {
	var cP = vDynm.ar.pymt.findIndex(function (e) { if (e.chk_no == chkNo) {return true}; });
	if (cP >= 0) {
		vDynm.ar.pymt.splice(cP,1);
		}
	croaDispChks();
}


function croaResetUnpdPymt() {
	vDynm.ar.pymt = [];
	for (var i = vDynm.ar.unpd.length-1;i>=0;i--)	{
		vDynm.ar.unpd[i].selected = false;
		if (vDynm.ar.unpd[i].source == "K") {
			vDynm.ar.unpd.splice(i,1);
		}
	}
}


function croaTcdtToUnpdPymt() {

	function unpdProc(tU) {
		if (tU.source == "K") {
			vDynm.ar.unpd.push(tU)
		} else if (tU.selected) {
			var cP = vDynm.ar.unpd.findIndex(function (eU) { if (eU.tkt_no == tU.tkt_no) {return true}; });
			if (cP >= 0) {
				vDynm.ar.unpd[cP].selected = tU.selected;
			}
		}
	}

	function pymtProc(tP) {
		vDynm.ar.pymt.push(tP);
	}

	croaResetUnpdPymt();
	vWork.al.tcdt.map( function (eT) {
		if (eT.trans_id == 88) {
			unpdProc(new tcdt2unpd(eT));
		} else if (eT.trans_id == 89) {
			pymtProc(new tcdt2pymt(eT));
		}
	});
}


//	***
//	*** 	External Calls from Menu	***
//	***


function bcInitCroaSaveEntry() {
	promFetchRange(vWork.db.work.handle, 'tcdt', [0, 89, 0], [0, 89, 99999999]).then(function (datAry) {
		datAry.map(function (tC) {
			var cP = vDynm.ar.pymt.findIndex(function (tP) { if (tP.chk_no == tC.prod_no) {return true}; });
			if (cP < 0) {
				promDeleteRec(vWork.db.work.handle, 'tcdt', [0, 89, tC.prod_no])
			}
		});
	});

	vDynm.ar.unpd.map( function (e) {
		var tU = new unpd2tcdt(e);
		var cP = relateTcdtAry(0, 88, e.tkt_no);
		if (cP < 0) {
			vWork.al.tcdt.push(tU);
		} else {
			vWork.al.tcdt[cP] = tU;
		}
		putObj2IdbWork('tcdt',tU);
	});

	vDynm.ar.pymt.map( function (e) {
		var tP = new pymt2tcdt(e);
		var cP = relateTcdtAry(0, 89, e.chk_no);
		if (cP < 0) {
			vWork.al.tcdt.push(tP);
		} else {
			vWork.al.tcdt[cP] = tP;
		}
		putObj2IdbWork('tcdt',tP);
	});

	var i = relateTchdAry(0, 7);
	if (i >= 0) {
		vWork.al.tchd[i].changed = true;
		vDynm.re.tchd.changed = true;
	}
	putObj2IdbWork('tchd',vDynm.re.tchd);
	vDynm.ob.csrv.prodChanged = false;
	boxChange(3100);
}


function bcInitCsrvCollectROA()  {
	promFetchRange(vWork.db.work.handle, 'tcdt', [0], [99]).then(function (datAry) {
		vWork.al.tcdt = datAry;
		promFetchRange(vWork.db.work.handle, 'tchd', [0], [99]).then(function (datAry) {
			vWork.al.tchd = datAry;
			relateCdatAry(88);
			relateTchdAry(0, vDynm.re.cdat.rpt_sect);
			croaTcdtToUnpdPymt();
			croaDispTkts();
			croaDispChks();
	    }).catch(function (error) {
	      console.log(error);
	    });
    }).catch(function (error) {
      console.log(error);
    });
}


//	 Entry for 
function bcInitCsrvCollectStatement()  {
	setTimeout(function () {boxChange(3100);},2000);
}
