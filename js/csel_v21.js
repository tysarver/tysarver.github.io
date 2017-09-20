/*
  Copyright (c) 2016 Aziom, Inc. All rights reserved.
*/

function buildCustNoSelect(eId) {
	var selectNo = document.getElementById(eId);
	var tAry = vDynm.ar.csel[vDynm.ob.csrv.custWeekType][vDynm.ob.csrv.custDowType].slice(0);
	tAry.sort(dynSort("cust_no"));
	selectNo.length = 0;
	tAry.map( function (cObj) {
		var option = document.createElement("option");
		option.text = cObj.cust_no;
		option.value = cObj.cust_no;
		selectNo.appendChild(option);
	});
}


function buildCustNameSelect(eId) {
	var selectNo = document.getElementById(eId);
	var tAry = vDynm.ar.csel[vDynm.ob.csrv.custWeekType][vDynm.ob.csrv.custDowType].slice(0);
	tAry.sort(dynSort("cust_name"));
	selectNo.length = 0;
	
	tAry.map( function (cObj) {
		var option = document.createElement("option");
		option.value = cObj.cust_no;
		option.text = cObj.cust_name;
		selectNo.appendChild(option);
	});
}


function buildNoCustSelect() {
	var selectNo = document.getElementById('i_cselCustNoSel');
	selectNo.length = 0;
	var option = document.createElement("option");
	var custDowObj = vDynm.re.csto.custDow[index];
	option.text = 0;
	option.value = 0;
	selectNo.appendChild(option);
}


function cselSaveNextOnUnits(nouVal) {
	vDynm.ob.csrv.nextOnUnits = nouVal;
}


function cselSaveDefDeptNo(ddNo) {
	vDynm.ob.csrv.defDeptNo = ddNo;
}


function dispClearIdAry(ids, fns, dat, init) {
	for (var index = init; index < ids.length; ++index) {
		var idName  = ids[index];
		var fldName = fns[index];
		if (typeof(dat)!="undefined")  {
			var tstFld  = dat[fldName] + 'x';
		} else {
			var tstFld  = '';
		}
		if (tstFld.length > 1 && tstFld != '0x' && tstFld != 'undefinedx') {
			var tmpStr = "" + dat[fldName];
			switch (fldName) {
				case 'cust_phone':
					var dispVal = formatStrToPhone(tmpStr);
					vDynm.ob.csrv.custPhoneDisp = dispVal;
					break;
				case 'cust_phon2':
					var dispVal = formatStrToPhone(tmpStr);
					vDynm.ob.csrv.custPhon2Disp = dispVal;
					break;
				case 'cust_zip':
					var dispVal = formatStrToZip(tmpStr);
					vDynm.ob.csrv.custZipDisp = dispVal;
					break;
				default:
					var dispVal = tmpStr;
			}
		} else {
			var dispVal = "&nbsp;";
		}
		document.getElementById(idName).innerHTML = dispVal;
	}
}


function dispCustDat()	{
	dispClearIdAry(vCnst.ar.cstSelDspIds, vCnst.ar.cstSelDspFns, vDynm.re.cust, 2)
	var custNoSelId = document.querySelector('#i_cselCustNoSel [value="' + vDynm.re.cust.cust_no + '"]');
	var custNameSelId = document.querySelector('#i_cselCustNameSel [value="' + vDynm.re.cust.cust_no + '"]');

	if (custNoSelId != null) {
		custNoSelId.selected = true;
	}
	if (custNameSelId != null) {
		custNameSelId.selected = true;
	}
}


function cselEnterNewCustNo() {
	var numEle = document.getElementById("i_cselEnterNoSel");
	var newCustNo = numEle.value * 1;
	promFetchRec(vWork.db.dnld.handle, 'cust', newCustNo).then(function (data) {
		if (typeof(data) != "undefined") {
			vDynm.re.cust = data;
			var cAry = vDynm.ar.csel[vDynm.ob.csrv.custWeekType][vDynm.ob.csrv.custDowType];
			var cIdx = cAry.findIndex(function (e) { if (e.cust_no == newCustNo) {return true}; });
			if (cIdx == -1) {
				vDynm.ob.csrv.custWeekType = 5;
				vDynm.ob.csrv.custDowType = 0;
				vDynm.ob.csrv.custDowTxt = vCnst.ar.weekDayTxt[0];
				document.getElementById('i_cselCustWeekBut').selectedIndex = "5";
				document.getElementById("i_cselCustWeekBut").className = vCnst.ar.cstSelWkCls[vDynm.ob.csrv.custWeekType];
				document.getElementById('i_cselCustDowBut').selectedIndex = "0";
				var cAry = vDynm.ar.csel[vDynm.ob.csrv.custWeekType][vDynm.ob.csrv.custDowType];
				var cIdx = cAry.findIndex(function (e) { if (e.cust_no == newCustNo) {return true}; });
			}
			buildCustNoSelect('i_cselCustNoSel');
			buildCustNameSelect('i_cselCustNameSel');
		} else {
			var noEle = document.getElementById('i_cselCustNoSel');
			var namEle = document.getElementById('i_cselCustNameSel');
			var noIht = noEle.innerHTML;
			var namIht = namEle.innerHTML;
			vWork.el.sndDefault.play();
			noEle.innerHTML = "<option></option>"; 
			namEle.innerHTML = "<option>Customer Not Found</option>"; 
			setTimeout(function () {
				noEle.innerHTML=noIht;
				namEle.innerHTML=namIht;
				numEle.value = "";
			},2000);
			return false;
			
		}
		dispCustDat();
		numEle.value = "";
//		putVGlobal2Idb(vDynm);
    }).catch(function (error) {
      console.log(error);
    });
}


function relateCustByNo(custNo)	{
	if (custNo != 0) {
		promFetchRec(vWork.db.dnld.handle, 'cust', custNo).then(function (data) {
			vDynm.re.cust = data;
			dispCustDat();
	    }).catch(function (error) {
	      console.log(error);
	    });
	} else {
		vDynm.re.cust = {
			cust_no: 	vDynm.ar.csel[vDynm.ob.csrv.custWeekType][vDynm.ob.csrv.custDowType][vDynm.ob.csrv.custSelIdx].cust_no, 
			cust_name: 	vDynm.ar.csel[vDynm.ob.csrv.custWeekType][vDynm.ob.csrv.custDowType][vDynm.ob.csrv.custSelIdx].cust_name
		}
		dispCustDat();
	}
}


function cselRelateCustBySelectNo() {
	var selectNo = document.getElementById('i_cselCustNoSel');
	var newCustNo = selectNo.value*1;
	relateCustByNo(newCustNo);
	
	var idxOfCurrCustNo = vDynm.ar.csel[vDynm.ob.csrv.custWeekType][vDynm.ob.csrv.custDowType].findIndex(function (e) { if (e.cust_no == newCustNo) {return true}; });
	vDynm.ob.csrv.custSelIdx = idxOfCurrCustNo;
}


function cselRelateCustBySelectName() {
	var selectNo = document.getElementById('i_cselCustNameSel');
	var newCustNo = selectNo.value*1;
	relateCustByNo(newCustNo);

	var idxOfCurrCustNo = vDynm.ar.csel[vDynm.ob.csrv.custWeekType][vDynm.ob.csrv.custDowType].findIndex(function (e) { if (e.cust_no == newCustNo) {return true}; });
	vDynm.ob.csrv.custSelIdx = idxOfCurrCustNo;
}


function cselCustWeekChange() {
	vDynm.ob.csrv.custWeekTxt = document.getElementById("i_cselCustWeekBut").value;
	vDynm.ob.csrv.custWeekType = vCnst.ar.cstSelWkTxt.indexOf(vDynm.ob.csrv.custWeekTxt);
	document.getElementById("i_cselCustWeekBut").className = vCnst.ar.cstSelWkCls[vDynm.ob.csrv.custWeekType];
	vDynm.ob.csrv.custSelIdx = 0;
	if (vDynm.ob.csrv.custWeekType == 5) {
		vDynm.ob.csrv.custDowType = 0;
		vDynm.ob.csrv.custDowTxt = vCnst.ar.weekDayTxt[0];
		document.getElementById('i_cselCustDowBut').selectedIndex = "0"
	}
	dispCurrCust();
}


function cselCustDowChange() {
	if (vDynm.ob.csrv.custWeekType != 5) {
		vDynm.ob.csrv.custDowTxt = document.getElementById("i_cselCustDowBut").value;
		vDynm.ob.csrv.custDowType = vCnst.ar.weekDayTxt.indexOf(vDynm.ob.csrv.custDowTxt);
		document.getElementById("i_cselCustDowBut").className = vCnst.ar.cstSelDwCls[vDynm.ob.csrv.custDowType];
		vDynm.ob.csrv.custSelIdx = 0;
		dispCurrCust();
	}
}


function cselCustPrev() {
	if (vDynm.ob.csrv.custSelIdx > 0) {
		vDynm.ob.csrv.custSelIdx--;
	} else {
		vDynm.ob.csrv.custSelIdx = vDynm.ar.csel[vDynm.ob.csrv.custWeekType][vDynm.ob.csrv.custDowType].length - 1;
	}
	dispCurrCust();
}


function cselCustNext() {
	if (vDynm.ob.csrv.custSelIdx < vDynm.ar.csel[vDynm.ob.csrv.custWeekType][vDynm.ob.csrv.custDowType].length - 1) {
		vDynm.ob.csrv.custSelIdx++;
	} else {
		vDynm.ob.csrv.custSelIdx = 0;
	}
	dispCurrCust();
}


function dispCurrCust() {
	relateCustByNo(vDynm.ar.csel[vDynm.ob.csrv.custWeekType][vDynm.ob.csrv.custDowType][vDynm.ob.csrv.custSelIdx].cust_no);
	buildCustNoSelect('i_cselCustNoSel');
	buildCustNameSelect('i_cselCustNameSel');
//	putVGlobal2Idb(vDynm);
}


function bcInitCsrvFirstCust() {
	document.getElementById('i_cselCustDowBut').selectedIndex = vDynm.ob.csrv.custDowType;
	dispCurrCust();
}


function relateDispBaln(custNo)	{
	document.getElementById('i_SectHdr').innerHTML = vDynm.re.cust.cust_name;
	document.getElementById('i_cselCustNo').innerHTML = vDynm.re.cust.cust_no;

	promFetchRec(vWork.db.dnld.handle, 'baln', custNo).then(function (data) {
		vDynm.re.baln = data;
		dispClearIdAry(vCnst.ar.balnSelDspIds, vCnst.ar.balnSelDspFns, data, 1);
    }).catch(function (error) {
		console.log(error);
    });
}


function bcInitCsrvCustBaln() {
	vDynm.ob.csrv.defDeptNo = 0;
	vDynm.ob.csrv.nextOnUnits = "Prod";
	
	relateDispBaln(vDynm.re.cust.cust_no);
//	putVGlobal2Idb(vDynm);

}

