/*
  Copyright (c) 2016 Aziom, Inc. All rights reserved.
*/


function tranVal2DomId(id, val) {
var el = document.getElementById(id)
	if (el != undefined) {
		if (val !== val) {		// NaN can not equal itself
			el.value = 0;
		} else {
			el.value = val;
		}
	}
}


function tranHtml2DomId(id, txt) {
var el = document.getElementById(id)
	if (el != undefined) {
		if (txt !== txt) {		// NaN
			el.innerHTML = "&nbsp;";
		} else {
			el.innerHTML = txt;
		}
	}
}


function tranStyle2DomId(id, sty, val) {
var el = document.getElementById(id)
	if (el != undefined) {
		el.style[sty] = val;
	}
}


function tranQty2CsUn2DomHtml(tQ, tC, tU) {
	var cu = tranCsUnFromQty(tQ);
	tranHtml2DomId(tC,cu.cases);
	tranHtml2DomId(tU,cu.units);	
}


function tranDspDomElements()	{
	tranVal2DomId("fin_csPnum", vDynm.re.prod.prod_no);

	if (vDynm.ar.tapr.length > 0) {
		tranHtml2DomId("i_csPrmoDat", vDynm.ar.tapr[0].promoNoTxt);
		tranHtml2DomId("i_csPtypDat", vDynm.ar.tapr[0].discTypeTxt);
		tranHtml2DomId("i_csPamtDat", vDynm.ar.tapr[0].discFldTxt);
		tranHtml2DomId("i_csPlvlDat", vDynm.ar.tapr[0].min_layerTxt);
		tranStyle2DomId('i_csPrmoCont','color',vDynm.ar.tapr[0].prmoLineColor)
	} else {
		tranHtml2DomId("i_csPrmoDat", "");
		tranHtml2DomId("i_csPtypDat", "");
		tranHtml2DomId("i_csPamtDat", "");
		tranHtml2DomId("i_csPlvlDat", "&nbsp;");
		tranStyle2DomId('i_csPrmoCont','color','grey')
	}
	
	if (vDynm.re.tcdt.rtl_price == 0) {
		tranVal2DomId("fin_csPrtlDat", "");
	} else {
		tranVal2DomId("fin_csPrtlDat", parseFloat(vDynm.re.tcdt.rtl_price).toFixed(2));
	}
	tranVal2DomId("fin_csPselDat", parseFloat(vDynm.re.tcdt.gross_price).toFixed(2));
	tranHtml2DomId("i_csCsQty",  vDynm.re.tcdt.case_qty.toFixed());

	tranQty2CsUn2DomHtml(vDynm.re.invt.qty_2, "i_csSlsCsDat", "i_csSlsUnDat");
	tranQty2CsUn2DomHtml(vDynm.re.invt.qty_3, "i_csGrtCsDat", "i_csGrtUnDat");
	tranQty2CsUn2DomHtml(vDynm.re.invt.qty_4, "i_csSamCsDat", "i_csSamUnDat");
	tranQty2CsUn2DomHtml(vDynm.re.invt.qty_5, "i_csDamCsDat", "i_csDamUnDat");
	tranQty2CsUn2DomHtml(vDynm.re.invt.qty_6, "i_csOodCsDat", "i_csOodUnDat");
	tranQty2CsUn2DomHtml(vDynm.re.invt.qty_7, "i_csTrkCsDat", "i_csTrkUnDat");
	tranQty2CsUn2DomHtml(vDynm.re.invt.qty_8, "i_csWhsCsDat", "i_csWhsUnDat");
	tranQty2CsUn2DomHtml( (vDynm.re.invt.qty_7 + vDynm.re.invt.qty_8), 'i_csStkCsDat', 'i_csStkUnDat')
	tranQty2CsUn2DomHtml(vDynm.re.bld2.load_qty, "i_csBld2CsDat", "i_csBld2UnDat");

	tranVal2DomId('fin_csOnhCsDat', Number(vDynm.re.tcdt.oh_qty1));
	tranVal2DomId('fin_csOnhUnDat', Number(vDynm.re.tcdt.oh_qty2));

	tranVal2DomId('fin_csSelCsDat', Number(vDynm.re.tcdt.phy_qty1));
	tranVal2DomId('fin_csSelUnDat', Number(vDynm.re.tcdt.phy_qty2));

	tranDspHist();

	if (vDynm.ob.csrv.opSelProd) {
		var tI = document.getElementById('fin_csSelCsDat');
		if (tI != null) {
			tI.focus();
			tI.select();
		}
	} else {
		switch (vDynm.ob.csrv.nextOnUnits) {
			case "Prod":
				document.getElementById('fin_csPnum').focus();
				document.getElementById('fin_csPnum').select();
				break;
			case "Cases":
				document.getElementById('fin_csSelCsDat').focus();
				document.getElementById('fin_csSelCsDat').select();
				break;
			case "NoKbd":
				document.getElementById('fin_csPnum').blur();
				break;
		}
	}
}


function tranDspHist()	{
	var hdAry = vDynm.re.hist.custDow;
	var newIh = "";
	if (hdAry != 'undefined') {
		for (var index = 0; index < hdAry.length; ++index) {
			var hO = vDynm.re.hist.custDow[index];
			var pC = vDynm.re.prod.case_qty;
			var dayStr = vCnst.ar.weekDayTxt[hO.hist_dow];
			var dateStr = "Z" +  hO.hist_date;
			var dateForm = dateStr.substring(5,7) + "/" + dateStr.substring(7);
			var oC = Math.trunc(hO.hist_carry/pC);
			var oU = hO.hist_carry%pC;
			var sC = Math.trunc(hO.hist_sls/pC);
			var sU = hO.hist_sls%pC;
			var rC = Math.trunc(hO.hist_rtn/pC);
			var rU = hO.hist_rtn%pC;

			newIh = newIh
			+ '<div class="csHistLine">'
			+ '<div class="csHdayDat">' + dayStr + '</div>'
			+ '<div class="csHdteDat">' + dateForm + '</div>'
			+ '<div class="csHcasDat">' + oC + '</div>'
			+ '<div class="csHuniDat">' + oU + '</div>'
			+ '<div class="csHcasDat">' + sC + '</div>'
			+ '<div class="csHuniDat">' + sU + '</div>'
			+ '<div class="csHcasDat">' + rC + '</div>'
			+ '<div class="csHuniDat">' + rU + '</div>'
			+ '<div class="csHendTxt"></div>'
			+ '</div>'
			;
		}
	}
	var hI = document.getElementById("i_csHistSect");
	if (hI != null) {
		hI.innerHTML = newIh
//	setHistBoxBot();
	};
}


function tranResetSelList() {
	document.getElementById("i_csProdListBut").className = vCnst.ar.prdSelLstCls[vDynm.ob.tran.prodListType];
	tranVal2DomId("i_csProdListBut", vCnst.ar.prdSelLstTxt[vDynm.ob.tran.prodListType]);
}


function tranResetSelInvt() {
	document.getElementById("i_csProdInvtBut").className = vCnst.ar.prdSelInvCls[vDynm.ob.tran.prodInvtType];
	tranVal2DomId("i_csProdInvtBut", vCnst.ar.prdSelInvTxt[vDynm.ob.tran.prodInvtType]);
}


function tranRetCurProdAry() {
	switch (vDynm.ob.tran.prodListType) {
		case 0:
			return {ary:vDynm.ar.prdo, idx:vStat.ix.prdo};
			break;
		case 1:
			return {ary:vStat.al.prde, idx:vStat.ix.prde};
			break;
		default:
			return {ary:vStat.al.prod, idx:vStat.ix.prod};
	}
}


// Fetch all tc?? recs from idb to vWork.al
function tranFetchAllTc(tcNam) {
	promFetchRange(vWork.db.work.handle, tcNam, [0], [99]).then(function (datAry) {
		vWork.al[tcNam] = datAry;
		nextSeq();
    }).catch(function (error) {
      console.log(error);
    });
}


function tranBldDispPrevNext() {
	function csrvDispPrdo(eId, cAry, tIdx) {
		var dEle = document.getElementById(eId);
		if (dEle == null) {
			return;
		}
		if (tIdx < 0 || tIdx >= cAry.length) {
			dEle.value = "";
			dEle.disabled = true;
		} else {
			dEle.value = cAry[tIdx].prod_no;
			dEle.disabled = false;
		}
	}

	var cObj = tranRetCurProdAry();
	var cAry = cObj.ary;
//	var cIdx = cObj.idx.indexOf(vDynm.re.prod.prod_no);
	var cIdx = cAry.findIndex(function (e) { if (e.prod_no == vDynm.re.prod.prod_no) {return true}; });

	csrvDispPrdo("i_csPrevProd2", cAry, cIdx -2);
	csrvDispPrdo("i_csPrevProd1", cAry, cIdx -1);
	csrvDispPrdo("i_csNextProd1", cAry, cIdx +1);
	csrvDispPrdo("i_csNextProd2", cAry, cIdx +2);
	csrvDispPrdo("i_csNextProd3", cAry, cIdx +3);
}

function tranBldOutTcdt(tD) {
	var cu = tranCsUnFromQty(tD.sell_qty);
	tD.phy_qty1 = cu.cases;
	tD.phy_qty2 = cu.units;

	if (vDynm.re.cdat.price_proc > 0)
	{
		aprmBldProdTaprAry();
		tD.disc_amt = vDynm.re.tapr.disc_amt;

		if (vDynm.re.cdat.debit_credit == 2) {
			tD.net_ext = (tD.gross_price - tD.disc_amt) * tD.sell_qty * -1;
		} else {
			tD.net_ext = (tD.gross_price - tD.disc_amt) * tD.sell_qty;
		}
		tD.net_price = (tD.net_ext / tD.sell_qty);
	}
	return tD;
}


function tranSaveLastProd() {
//	Save data from last prod
	if ( typeof(vDynm.re.tcdt) != "undefined" && document.getElementById("fin_csPnum").value != '' && vDynm.ob.csrv.prodChanged) {
		var tD = tranBldOutTcdt(vDynm.re.tcdt);

		var cP = vWork.al.tcdt.findIndex(function (e) { if (e.dept_no == tD.dept_no && e.trans_id == tD.trans_id && e.prod_no == tD.prod_no) {return true}; });
		if (cP < 0) {
			vWork.al.tcdt.push(tD);
		} else {
			vWork.al.tcdt[cP] = tD;
		}
		
		putObj2IdbWork('tcdt',vDynm.re.tcdt);
		if (vDynm.ar.tapr.length > 0) {
			promAddAryToIdb(vWork.db.work.handle, 'tapr', vDynm.ar.tapr);			
		}
		var i = relateTchdAry(vDynm.re.tcdt.dept_no, vDynm.re.tcdt.rpt_sect);
		if (i >= 0) {
			vWork.al.tchd[i].changed = true;
			vDynm.re.tchd.changed = true;
		}
		putObj2IdbWork('tchd',vDynm.re.tchd);
		vDynm.ob.csrv.prodChanged = false;
	}
}



function tranRefLi(v) {
	return v[vDynm.ob.tran.prodListType][vDynm.ob.tran.prodInvtType];
}


function tranResetTypeInvt(prodNo) {
	var tiAry = vCnst.ar.tiOrder;
	for (var idx = 0; idx < tiAry.length; ++idx) {
		var typIdx = tiAry[idx].t;
		var invIdx = tiAry[idx].i;
		var tPgIdx = vStat.ar.gp[typIdx][invIdx].findIndex(function (e) { if (e.prod_grp == vDynm.re.prod.prod_grp) {return true}; });
		if (tPgIdx >= 0) {
			var tPrIdx = vStat.ar.gp[typIdx][invIdx][tPgIdx].prods.findIndex(function (e) { if (e.prod_no == prodNo) {return true}; });
			if (tPrIdx >= 0) {
				vDynm.ob.tran.prodListType = typIdx;
				vDynm.ob.tran.prodInvtType = invIdx;
				var aGp = tranRefLi(vStat.ar.gp);
				var gPgi = aGp.findIndex(function (e) { if (e.prod_grp == vDynm.re.prod.prod_grp) {return true}; });
				tranResetSelList();
				tranResetSelInvt();
				break;
			}
		}
	}
	var gPr = aGp[gPgi].prods.findIndex(function (e) { if (e.prod_no == vDynm.re.prod.prod_no) {return true}; });
	if (gPr < 0) {
		console.log("prod_no not in aGp for current TI");
	}
}


function tranBldPgrpNameSelect() {
	var aSp = tranRefLi(vStat.ar.sp);

	var selectNo = document.getElementById("i_csPgrpNoSel");
	selectNo.length = 0;
	for (var index = 0; index < aSp.length; ++index) {
		var option = document.createElement("option");

		var tObj = aSp[index];
		option.text = tObj.pgrp_desc;
		option.value = tObj.prod_grp;
		selectNo.appendChild(option);
	}
	var pgrpNoSelId = document.querySelector('#i_csPgrpNoSel [value="' + vDynm.re.pgrp.prod_grp + '"]');
	if (pgrpNoSelId != null) {
		pgrpNoSelId.selected = true;
	}
}


function tranBldProdNameSelect() {
	var aSp = tranRefLi(vStat.ar.sp);
	var aSpGi = aSp.findIndex(function (e) { if (e.prod_grp == vDynm.re.prod.prod_grp) {return true}; });

	var pAry = aSp[aSpGi].prods;

	var selectNo = document.getElementById("i_csProdNoSel");
	selectNo.length = 0;
	for (var index = 0; index < pAry.length; ++index) {
		var option = document.createElement("option");

		var tObj = pAry[index];
		option.text = tObj.prod_desc;
		option.value = tObj.prod_no;
		selectNo.appendChild(option);
	}
	var prodNoSelId = document.querySelector('#i_csProdNoSel [value="' + vDynm.re.prod.prod_no + '"]');
	if (prodNoSelId != null) {
		prodNoSelId.selected = true;
	}
}


function tranFindTacp(){
	if (vDynm.re.cdat.price_proc > 0)
	{
		aprmBldProdTaprAry();
	}
}


function tranBldHistDispAry() {
	if (vStat.al.hist != undefined) {
		vDynm.re.hist.custDow = vStat.al.hist.filter(function (o) { return o.prod_no == vDynm.re.prod.prod_no })
		vDynm.re.hist.custDow.sort(dynSort("-hist_date"));
	} else {
		vDynm.re.hist.custDow = new histObj(vDynm.re.cust.cust_no, vDynm.re.dept.dept_no, 0, 0, 0, 0, 0, 0, 0);
	}
}


function tranBldDispData() {
	relateBld2Ary(vDynm.re.prod.prod_no);
}


function tranInitNewTcdt() {
	vDynm.re.tcdt = new tcdtObj(vDynm.re.dept.dept_no, vDynm.re.prod.prod_grp, vDynm.re.prod.prod_no);

	relateRetlAry(vDynm.re.prod.prod_no);
	vDynm.re.tcdt.rtl_price = vDynm.re.retl.price;

	relatePlstAry(vDynm.re.prod.prod_no);
	vDynm.re.tcdt.gross_price = vDynm.re.plst.price;
	vDynm.re.tcdt.list_price = vDynm.re.plst.price;
	vDynm.re.tcdt.base_price = vDynm.re.prod.sell_prc_1;
}


function tranProcNewProd(prodNo, opSelected) {
	tranSaveLastProd();
	vDynm.ob.csrv.opSelProd = opSelected;
	var aGp = tranRefLi(vStat.ar.gp);

	vDynm.ob.csrv.alProdIdx = relateProdAry(prodNo);
	vDynm.ob.csrv.alPgrpIdx = relatePgrpAry(vStat.al.prod[vDynm.ob.csrv.alProdIdx].prod_grp);
	vDynm.ob.csrv.alInvtIdx = relateInvtAry(prodNo);

	var gPgi = aGp.findIndex(function (e) { if (e.prod_grp == vDynm.re.prod.prod_grp) {return true}; });
	if (gPgi < 0) {
		tranResetTypeInvt(prodNo);
	} else {
		var gPr = aGp[gPgi].prods.findIndex(function (e) { if (e.prod_no == vDynm.re.prod.prod_no) {return true}; });
		if (gPr < 0) {
			tranResetTypeInvt(prodNo);
		}
	}

	tranBldPgrpNameSelect();
	tranBldProdNameSelect();
	tranBldDispPrevNext();
	tranBldHistDispAry();
	tranBldDispData();

	var srchKey = [vDynm.re.dept.dept_no, vDynm.re.cdat.trans_id, vDynm.re.prod.prod_no];
	promFetchRec(vWork.db.work.handle, 'tcdt', srchKey).then(function (data) {
		if (typeof(data) == "undefined") {
			tranInitNewTcdt();
		} else {
			vDynm.re.tcdt = data;
		}
		tranFindTacp();
		tranDspDomElements();
   }).catch(function (error) {
     console.log(error);
   });
}


function tranSetAlProdIdx(chkNo, chkFld) {
	if (chkFld == 'upc') {
		var pIdx = vStat.al.prod.findIndex(function (e) { if (e.upc == chkNo) {return true}; });
	} else {
		var pIdx = vStat.ix.prod.indexOf(chkNo);
	}

	if (pIdx == -1) {
		var pEle = document.getElementById('i_csProdNoSel');
		var pIht = pEle.innerHTML;
		vWork.el.sndDefault.play();
		pEle.innerHTML = "<option>Product Not Found</option>";
		setTimeout(function () {
			document.getElementById('i_csProdNoSel').innerHTML=pIht;
			document.getElementById('fin_csPnum').value = vStat.al.prod[vDynm.ob.csrv.alProdIdx].prod_no;
		},2000);
		return false;
	}
	vDynm.ob.csrv.alProdIdx = pIdx;
	return true;
}


function tranSetProdChg(ob) {
	vDynm.ob.csrv.prodChanged = true;
	if (ob.ut_mod == 0) {
		ob.ut_mod = Math.floor(Date.now());
	}
}


function tranQtyFromCsUn(cs, un) {
	var qty = (cs * vDynm.re.prod.case_qty) + Number(un);
	return qty;
}


function tranCsUnFromQty(qty) {
	var units = qty % vDynm.re.prod.case_qty;
	var cases = parseInt(qty / vDynm.re.prod.case_qty);
	return {cases:cases, units:units};
}


function tranSetNewPhy1(newQty) {
	vDynm.re.tcdt.phy_qty1 = newQty;
	vDynm.re.tcdt.sell_qty = tranQtyFromCsUn(vDynm.re.tcdt.phy_qty1, vDynm.re.tcdt.phy_qty2);
	tranSetProdChg(vDynm.re.tcdt);
}


function tranBarCodeReceived()  {
//var event = document.createEvent('Event'); event.initEvent('keydown', true, true); event.keyCode = 56
//document.dispatchEvent(event)

	var barCodeIn = vDynm.ob.tran.bci;
	var barCodeNum = barCodeIn.replace(/\D/g,'');
	var barCodeUPC = barCodeNum.substring(0, barCodeNum.length - 1);

	vDynm.ob.tran.bci = "";

	if (tranSetAlProdIdx(barCodeUPC, "upc")) {
		var scanProdNo = vStat.al.prod[vDynm.ob.csrv.alProdIdx].prod_no;
		if ( scanProdNo == vDynm.re.prod.prod_no) {
			tranSetNewPhy1(vDynm.re.tcdt.phy_qty1 + 1);
			tranVal2DomId('fin_csSelCsDat', Number(vDynm.re.tcdt.phy_qty1));
		} else {
			tranProcNewProd(vStat.al.prod[vDynm.ob.csrv.alProdIdx].prod_no, true);
		}
	}
}


function tranMakeEntryVisable() {
	var iD = '';
	if (iD = document.getElementById('i_csrvEntry'))  iD.style.display = "inline-block";
	if (iD = document.getElementById('i_csrvReview')) iD.style.display = "none";
	if (iD = document.getElementById('i_csrvGrid'))   iD.style.display = "none";

	document.getElementById("i_csRevEntBut").className = "csButIn csButInColor7";
	document.getElementById('i_csRevEntBut').value = "Review"
}


function tranMakeReviewVisable() {
	var iD = '';
	if (iD = document.getElementById('i_csrvEntry'))  iD.style.display = "none";
	if (iD = document.getElementById('i_csrvReview')) iD.style.display = "inline-block";
	if (iD = document.getElementById('i_csrvGrid'))   iD.style.display = "none";

	document.getElementById("i_csRevEntBut").className = "csButIn csButInColor8";
}


function tranMakeGridVisable() {
	var iD = '';
	if (iD = document.getElementById('i_csrvEntry'))  iD.style.display = "none";
	if (iD = document.getElementById('i_csrvReview')) iD.style.display = "none";
	if (iD = document.getElementById('i_csrvGrid'))   iD.style.display = "inline-block";

	document.getElementById("i_csRevEntBut").className = "csButIn csButInColor8";
}


//	Prod_no, phy_qty(1 or 2), Entered Value
function tranChgGrid(pN, qN, eV) {
	vDynm.ob.csrv.alProdIdx = relateProdAry(pN);
	vDynm.ob.csrv.alPgrpIdx = relatePgrpAry(vStat.al.prod[vDynm.ob.csrv.alProdIdx].prod_grp);

	var cP = vWork.al.tcdt.findIndex(function (e) { if (e.dept_no == vDynm.re.dept.dept_no && e.trans_id == vDynm.re.cdat.trans_id && e.prod_no == pN) {return true}; });
	if (cP < 0) {
		tranInitNewTcdt();
	} else {
		vDynm.re.tcdt = vWork.al.tcdt[cP];
	}

	vDynm.re.tcdt['phy_qty' + qN] = eV * 1;

	vDynm.re.tcdt.sell_qty = tranQtyFromCsUn(vDynm.re.tcdt.phy_qty1, vDynm.re.tcdt.phy_qty2);
	tranSetProdChg(vDynm.re.tcdt);
	tranSaveLastProd();
	document.getElementById("i_gCs" + pN).value = vDynm.re.tcdt.phy_qty1.toFixed();
	document.getElementById("i_gUn" + pN).value = vDynm.re.tcdt.phy_qty2.toFixed();
	document.getElementById("i_gSq" + pN).innerHTML = vDynm.re.tcdt.sell_qty.toFixed();
	
//	console.log("Cases:", pN, eV, cP);
}


function tranGridTcdtDtlHtml(dtlDat) {
		var pN = dtlDat.prod_no;
		var htmlSegment =
		  '<div class="csGrDtl">'
		+ '<div class="csGrProdDat"  onclick="tranRevRet(' + pN + ')">' + pN + '</div>'
		+ '<div class="csGrDescDat"  onclick="tranRevRet(' + pN + ')">' + dtlDat.prod_desc + '</div>'
		+ '<input id="i_gCs' + pN + '" type="number" value="' + dtlDat.phy_qty1 + '" class="csGrCsIn" onfocus="this.select()" onchange="tranChgGrid(' + pN + ', 1, this.value)">'
		+ '<input id="i_gUn' + pN + '" type="number" value="' + dtlDat.phy_qty2 + '" class="csGrUnIn" onfocus="this.select()" onchange="tranChgGrid(' + pN + ', 2, this.value)">'
		+ '<div   id="i_gSq' + pN + '" class="csGrTotDat">' + dtlDat.sell_qty + '</div>'
		+ '<div class="csHendTxt"></div></div>';
		return htmlSegment
}


function tranDspGridData() {
	var newIh = "";
	var dtlObj = {};
	var aGp 	= tranRefLi(vStat.ar.gp);
	aGp.map( function (gE) {
		gE.prods.map( function ( pE) {
			dtlObj = { prod_no: pE.prod_no, prod_desc: pE.prod_desc, phy_qty1:0, phy_qty2:0, sell_qty:0, cP:-1 };
			var cP = relateTcdtAry(vDynm.re.dept.dept_no, vDynm.re.cdat.trans_id, pE.prod_no);
			if (cP > -1) {
				dtlObj.phy_qty1 = vDynm.re.tcdt.phy_qty1;
				dtlObj.phy_qty2 = vDynm.re.tcdt.phy_qty2;
				dtlObj.sell_qty = vDynm.re.tcdt.sell_qty;
				dtlObj.cP = cP;
			}
			newIh += tranGridTcdtDtlHtml(dtlObj);
		});
	});
	document.getElementById("i_csGrDtlCont").innerHTML = newIh;
}


function tranBldGridPage() {
	document.getElementById('i_csRevEntBut').value = "Grid"

	var lowerLimit = [vDynm.re.dept.dept_no, vDynm.re.cdat.trans_id, 0];
	var upperLimit = [vDynm.re.dept.dept_no, vDynm.re.cdat.trans_id, 999999999];
	promFetchRange(vWork.db.work.handle, 'tcdt', lowerLimit, upperLimit).then(function (datAry) {
		vWork.al.tcdt = datAry;
		tranDspGridData();
    }).catch(function (error) {
      console.log(error);
    });
}


function tranRevTcdtDtlHtml(pDesc, dtlDat) {
		var pN = dtlDat.prod_no;
		if (pDesc == 'Total') {
			var oC = "";
		} else {
			var oC = ' onclick="tranRevRet(' + pN + ')"';
		}
		var htmlSegment =
		  '<div class="csRevProdDat"' + oC + '>' + pN + '</div>'
		+ '<div class="csRevDescDat"' + oC + '>' + pDesc + '</div>'
		+ '<div class="csRevCsDat">' + dtlDat.phy_qty1 + '</div>'
		+ '<div class="csRevUnDat">' + dtlDat.phy_qty2 + '</div>'
		+ '<div class="csRevTotDat">' + dtlDat.sell_qty + '</div>'
		+ '<div class="csHendTxt"></div>';
		return htmlSegment
}


function tranDspReviewData() {
	var newIh = "";
	var trlObj = { prod_no: "&nbsp;", phy_qty1:0, phy_qty2:0, sell_qty:0 }

	for (var i = 0; i < vWork.al.tcdt.length; i++) {
		trlObj.phy_qty1 += 1 * vWork.al.tcdt[i].phy_qty1;
		trlObj.phy_qty2 += 1 * vWork.al.tcdt[i].phy_qty2;
		trlObj.sell_qty += 1 * vWork.al.tcdt[i].sell_qty;
		newIh += tranRevTcdtDtlHtml(vWork.al.tcdt[i].prod_desc, vWork.al.tcdt[i]);
	}
	newIh += '<div class="csRevUnderLineSpc">&nbsp;</div><div class="csRevUnderLineDat">&nbsp;</div><div class="csHendTxt"></div>';

	newIh += tranRevTcdtDtlHtml("Total", trlObj);
	document.getElementById("i_csRevDtl").innerHTML = newIh;
}


function tranBldReviewPage() {
	var lowerLimit = [vDynm.re.dept.dept_no, vDynm.re.cdat.trans_id, 0];
	var upperLimit = [vDynm.re.dept.dept_no, vDynm.re.cdat.trans_id, 999999999];
	promFetchRange(vWork.db.work.handle, 'tcdt', lowerLimit, upperLimit).then(function (datAry) {
		vWork.al.tcdt = datAry;
		tranDspReviewData();
    }).catch(function (error) {
      console.log(error);
    });
}


function tranRevRet(prodNo) {
	tranMakeEntryVisable();
	tranProcNewProd(prodNo, true);
}


function tranSetXactDispSectHdr() {
	if (vDynm.re.dept.dept_desc != "") {
			i_SectHdr.innerHTML = vDynm.re.dept.dept_desc;
			i_SectSubHdr.innerHTML = vDynm.re.cdat.trans_name;
	}
}


function tranInitXact(transId) {
	document.onkeydown = function (e) {
		var dae = document.activeElement;
		if ("i_Body" == dae.id) {
			if (e.keyCode != 13) {
				vDynm.ob.tran.bci += String.fromCharCode(e.keyCode);
			} else {
				tranBarCodeReceived();
			}
		}
	}

//	document.getElementById("i_csHistSect").onscroll = function () {
//		if (document.getElementById("i_csHistSect").scrollTop == 0) {
//			document.getElementById("i_csHistSect").scrollTop = 1;
//		}
//	 };

	relateCdatAry(transId);
	tranSetXactDispSectHdr();
	relateTchdAry(vDynm.re.dept.dept_no, vDynm.re.cdat.rpt_sect);

	vDynm.ob.tran.prodListType = vDynm.re.cdat.prod_list_type;
	vDynm.ob.tran.prodInvtType = vDynm.re.cdat.prod_invt_type;

	tranResetSelList();
	tranResetSelInvt();

	vDynm.ob.csrv.prodChanged = false;
	var cObj = tranRetCurProdAry();
	if (cObj.ary.length == 0 || (cObj.ary.length == 1 && cObj.ary[0].prod_no == 0) ) {
		tranChgProdList();
	} else {
		var aGp = tranRefLi(vStat.ar.gp);
		var firstProdNo =  aGp[0].prods[0].prod_no || vStat.al.prod[0];
		tranProcNewProd(firstProdNo, false);
	}
}


//	***
//	*** 	External Calls from User Input set in SDAT	***
//	***

function tranChgProdNo() {
	var selectStr = document.getElementById('fin_csPnum').value;
	if (selectStr.length > 9) {
		vDynm.ob.tran.bci = selectStr.slice(-11);
		tranBarCodeReceived();
		return;
	}

	var newProdNo = selectStr*1;

	if (tranSetAlProdIdx(newProdNo, "prod")) {
		tranProcNewProd(newProdNo, true);
	}
}


function tranProdPrevNextSel(prodTxt) {
	var newProdNo = prodTxt * 1;
	if (tranSetAlProdIdx(newProdNo, "prod")) {
		tranProcNewProd(newProdNo, true);
	}
}


function tranChgProdGroup() {
	var aGp = tranRefLi(vStat.ar.gp);

	var selectNo = document.getElementById('i_csPgrpNoSel');
	var newPgrpNo = selectNo.value*1;
	var cGpi = aGp.findIndex(function (e) { if (e.prod_grp == newPgrpNo) {return true}; });
	var newProdNo = aGp[cGpi].prods[0].prod_no;

	tranProcNewProd(newProdNo, false);
}


function tranChgProdName() {
	var selectNo = document.getElementById('i_csProdNoSel');
	var newProdNo = selectNo.value*1;

	tranProcNewProd(newProdNo, true);
}


//
function tranChgRtlPrice() {
	vDynm.re.tcdt.rtl_price = document.getElementById('fin_csPrtlDat').value;
}


//
function tranChgSellPrice() {
	vDynm.re.tcdt.gross_price = document.getElementById('fin_csPselDat').value;
	tranSetProdChg(vDynm.re.tcdt);
}


//
function tranChgOnhCases() {
	vDynm.re.tcdt.oh_qty1 = document.getElementById('fin_csOnhCsDat').value;
	vDynm.re.tcdt.oh_qty = tranQtyFromCsUn(vDynm.re.tcdt.oh_qty1, vDynm.re.tcdt.oh_qty2);
}


//
function tranChgOnhUnits() {
	vDynm.re.tcdt.oh_qty2 = document.getElementById('fin_csOnhUnDat').value;
	vDynm.re.tcdt.oh_qty = tranQtyFromCsUn(vDynm.re.tcdt.oh_qty1, vDynm.re.tcdt.oh_qty2);
}


//
function tranChgSellCases() {
	var newQty = document.getElementById('fin_csSelCsDat').value;
	if (newQty.length > 9) {
		vDynm.ob.tran.bci = newQty.slice(-11);
		tranBarCodeReceived();
		return;
	}
	if (newQty != vDynm.re.tcdt.phy_qty1) {
		tranSetNewPhy1(newQty);
	}
}


//
function tranChgSellUnits() {
	var elQ1 = document.getElementById('fin_csSelCsDat');
	var elQ2 = document.getElementById('fin_csSelUnDat');

	document.getElementById('fin_csPnum').focus();

	var newQty = elQ2.value;
	if (newQty != vDynm.re.tcdt.phy_qty2) {
		vDynm.re.tcdt.phy_qty2 = elQ2.value;
		vDynm.re.tcdt.sell_qty = tranQtyFromCsUn(vDynm.re.tcdt.phy_qty1, vDynm.re.tcdt.phy_qty2);
	}

	elQ1.value = "";
	elQ2.value = "";

	tranSetProdChg(vDynm.re.tcdt);

	var cObj = tranRetCurProdAry();
	var cIdx = cObj.idx.indexOf(vDynm.re.prod.prod_no);
	var tIdx = cIdx + 1;
	if (tIdx >= (cObj.ary.length)) {
		tIdx = 0;
	}
	tranProcNewProd(cObj.ary[tIdx].prod_no, false);
}


function tranLeftProdArrow() {
	var cObj = tranRetCurProdAry();
	var cIdx = cObj.idx.indexOf(vDynm.re.prod.prod_no);
	var tIdx = cIdx - 1;
	if (tIdx < 0 ) {
		tIdx = cObj.ary.length -1;
	}
	tranProcNewProd(cObj.ary[tIdx].prod_no, false);
}


function tranRightProdArrow() {
	var cObj = tranRetCurProdAry();
	var cIdx = cObj.idx.indexOf(vDynm.re.prod.prod_no);
	var tIdx = cIdx + 1;
	if (tIdx >= (cObj.ary.length)) {
		tIdx = 0;
	}
	tranProcNewProd(cObj.ary[tIdx].prod_no, false);
}



function tranEntryReview(transId) {
	if (document.getElementById('i_csrvEntry').offsetHeight > 0) {
		tranMakeReviewVisable();
		tranBldReviewPage();
	} else {
		tranMakeEntryVisable();
	}
}


function tranEntryGrid() {
	if (document.getElementById('i_csrvEntry').offsetHeight > 0) {
		tranMakeGridVisable();
		tranBldGridPage();
	} else {
		tranMakeEntryVisable();
	}
}


function tranDispNewListType() {
	var aGp = tranRefLi(vStat.ar.gp);
	var firstPgrpNo =  aGp[0].prod_grp;
	var firstProdNo =  aGp[0].prods[0].prod_no;

	tranProcNewProd(firstProdNo, false);
}


function tranNextValidTypeInvt(fNam) {
	for(i=1; i<4; i++) {
		if (vDynm.ob.tran[fNam] < 2) {
			vDynm.ob.tran[fNam]++;
		} else {
			vDynm.ob.tran[fNam]=0;
		}
		var aGp = tranRefLi(vStat.ar.gp);
		if (aGp.length > 0) {
			break;
		}
	}
	var rId = document.getElementById('i_csRevEntBut');
	var gId = document.getElementById('i_csGridBut') || {disabled:false};
	var gOn = (rId && rId.value == "Grid");
	var aA  = (vDynm.ob.tran.prodListType == 2 && vDynm.ob.tran.prodInvtType == 2);
	if (gOn) {
		if (aA) {
			return false;
		} else {
			tranDspGridData();
		}
	} else {
		if (aA) {
			gId.disabled = true;
		} else {
			gId.disabled = false;
		}
	}
	return true;
}


function tranChgProdList() {
	if (!tranNextValidTypeInvt("prodListType")) {
		tranNextValidTypeInvt("prodListType");
	}

	tranResetSelList();
	tranDispNewListType();
}


function tranChgProdInvt() {
	if (!tranNextValidTypeInvt("prodInvtType")) {
		tranNextValidTypeInvt("prodInvtType");
	}

	tranResetSelInvt();
	tranDispNewListType();
}


function tranChgDeptNo() {
	var selectNo = document.getElementById('i_csDeptNoSel');
	var newDeptNo = selectNo.value*1;
	var eidRev = document.getElementById('i_csrvReview');
	var eidGr  = document.getElementById('i_csrvGrid');
	
	relateDeptAry(newDeptNo);
	updatePrdoDispSelArys();
	
	if (eidRev != null && eidRev.style.display != "none") {
		tranBldReviewPage();
	} else if (eidGr != null && eidGr.style.display != "none") {
		tranBldGridPage();
	}
	tranProcNewProd(vDynm.re.prod.prod_no, true);
}


function tranBldDeptNameSelect() {
	var selectNo = document.getElementById("i_csDeptNoSel");
	selectNo.length = 0;
	for (var index = 0; index < vStat.al.dept.length; ++index) {
		var option = document.createElement("option");

		var tObj = vStat.al.dept[index];
		option.text = tObj.dept_desc;
		option.value = tObj.dept_no;
		if (tObj.dept_no == vDynm.re.dept.dept_no || tObj.dept_no == 0) {
			option.selected = true;
		}
		selectNo.appendChild(option);
	}
}


function tranClearTcStores(callback) {
	vWork.al.tchd = [];
	vWork.al.tcdt = [];
	vWork.al.tapr = [];
	promClearStore(vWork.db.work.handle, 'tchd').then(function (data) {
		promClearStore(vWork.db.work.handle, 'tvhd').then(function (data) {
			promClearStore(vWork.db.work.handle, 'tcdt').then(function (data) {
				promClearStore(vWork.db.work.handle, 'tvdt').then(function (data) {
					promClearStore(vWork.db.work.handle, 'tapr').then(function (data) {
						if (callback != undefined) {
							callback();
						}
		    		}).catch(function (error) { console.log(error); });
			    }).catch(function (error) { console.log(error); });
		    }).catch(function (error) { console.log(error); });
	    }).catch(function (error) { console.log(error); });
    }).catch(function (error) { console.log(error); });
}


function transUpdateInvt() {

	function bldinvtModArys() {

		function checkConvHow(tM, tD) {
			var tH = tM[0] * 1;
			var tI = tM[1] * 1;
			if (tH > 3) {
				if (tH == 6) {		// Replace by Dept No
					vWork.ti.invClrTf[tD] = true;
					return {how:3, inv:tD};
				}

				if (tI == 0) {
					vWork.ti.ilodClrId.push(vDynm.re.cdat.load_id);
				} else {
					vWork.ti.invClrTf[tI] = true;
				}

				if (tH == 4) {
					tH = 3;				
				} else if (tH == 5) {
					tH = 0;				
				}
			}
			return {how:tH, inv:tI};
		}
		
		function checkPushMods(t, oM) {
			if (oM.inv > 0) {
				if (oM.how > 0) {
					vWork.ti.invtMod.push(new invtCalcObj(t, oM.how, oM.inv));
				}
			} else {
				if (oM.how > 0) {
					vWork.ti.ilodMod.push(new invtCalcObj(t, oM.how, vDynm.re.cdat.load_id));
				}
			}
		}

		var oM1 = {};
		var oM2 = {};
		var lastDept = -1;
		vWork.ti.invtCnt = 0;
		vWork.ti.ilodCnt = 0;
		vWork.ti.invtMod = [];
		vWork.ti.ilodMod = [];
		vWork.ti.ilodClrId = [];
		vWork.ti.invClrFld = [];
		vWork.ti.invClrTf = [false,false,false,false,false,false,false,false,false,false];
		
		vDynm.re.cdat.trans_id = -1;

		vWork.al.tcdt.map(function (t){
			if (t.sell_qty != 0) {
				if (vDynm.re.cdat.trans_id != t.trans_id || lastDept != t.dept_no) {
					relateCdatAry(t.trans_id);
					oM1 = checkConvHow(vDynm.re.cdat.mod_fld1.toFixed(2), t.dept_no);
					oM2 = checkConvHow(vDynm.re.cdat.mod_fld2.toFixed(2), t.dept_no);
					lastDept = t.dept_no;
				}
				checkPushMods(t, oM1);
				checkPushMods(t, oM2);
			}
		});
	}


	function clearInvtEl(tI) {
		vWork.ti.invClrFld.map(function (tF) {
			tI[tF] = 0;
			++vWork.ti.invtCnt;
		});
	}


	function clearInvtAry() {
		vWork.ti.invClrTf.map(function (tF,tI) {
			if (tF) {
				vWork.ti.invClrFld.push("qty_" + tI);
			}
		});
		vStat.al.invt.map(clearInvtEl);
	}


	function clearIlodAry() {
		vWork.ti.ilodClrId.map(function (tI) {
			for (var i = vStat.al.ilod.length-1;i>=0;i--)	{
				if (vStat.al.ilod[i].trans_id == tI) {
					vStat.al.ilod.splice(i,1);
					++vWork.ti.ilodCnt;
				}
			}
		});
	}


	function modCurrProd(tP, tH, tQ) {
		if (tH == 1) {
			tP = tP + tQ;
		} else if (tH == 2) {
			tP = tP - tQ;
		} else if (tH == 3) {
			tP = tQ;
		}
		return tP;
	}


	function modInvt() {
		vWork.ti.invtMod.map(function (tI) {
			var tF = "qty_"+tI.mod_inv;
			cP = relateInvtAry(tI.prod_no);
			vStat.al.invt[cP][tF] = modCurrProd(vStat.al.invt[cP][tF], tI.mod_how, tI.sell_qty);
			if (tI.mod_inv = 7 && vStat.al.invt[cP][tF] < 0) {
				vStat.al.invt[cP].qty_8 += vStat.al.invt[cP][tF];
				vStat.al.invt[cP][tF] = 0;
			}
			++vWork.ti.invtCnt;
		});
		if (vWork.ti.invtCnt > 0) {
			promReplaceAryToStore(vWork.db.dnld.handle, vStat.al.invt, "invt")
		}
	}


	function modIlod() {
		vWork.ti.ilodMod.map(function (tI) {
			cP = relateIlodAry(tI.mod_inv, tI.prod_no);
			vStat.al.ilod[cP].load_qty = modCurrProd(vStat.al.ilod[cP].load_qty, tI.mod_how, tI.sell_qty);
			++vWork.ti.ilodCnt;
		});
		if (vWork.ti.ilodCnt > 0) {
			promReplaceAryToStore(vWork.db.dnld.handle, vStat.al.ilod, "ilod")
		}
	}


	vWork.ti = {};
	bldinvtModArys();
	
	clearInvtAry();
	clearIlodAry();
	modInvt();
	modIlod();

	vWork.ti = {};

	nextSeq();
}


function tranClearAllExit(scrIdx)  {
	tranClearTcStores();
	boxChange(scrIdx);
}


