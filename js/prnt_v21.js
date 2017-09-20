/*
  Copyright (c) 2016 Aziom, Inc. All rights reserved.
*/

/*
Inv:
	tS = numeric - section of report
		1	Company Header
		2	Salesman Header
		3	Customer Header
		4	Transaction Header
		5	Product Group Header
		6	Product Detail
		7	Promo Detail
		8	Product Group Trailer
		9	Transaction Trailer
		10	Document Totals
		11	Document Trailer
		12	Document Select Detail

proc:
	Get string of SDAT series for section
	split into array by '~'
	locate '|' first character
	split into array by '|'
		[0] = ""
		[1] = field name
		[2] = formatting directive: ex:1234.56789	0
			00		1235		0
			01		1234.6		0
			02		1234.57		0
			03		1234.568	0
			1?		1,234.?		0
			2?		12345.?		b
			3?		1,234.?		b

Returns:
	converted html string
*/

function prntMapSdat(tS) {
	function retObj(obj,i) {return obj[i]}

	relateRdatAryTF(tS);		//	Production - enable when ready -
	var sA = vDynm.re.rdat.scrContent.split('~');
	var rS = '';
	sA.map(function (e) {
		if (e[0] == "|") {
			var a = e.split('|');
			var v = a[1].split('.').reduce(retObj, window);
			if (a.length == 3) {
				var vN = (v*1)||0;
				var f1 = a[2][1];
//				var fS = fixTF(vN, a[2][1])
				var fS = vN.toLocaleString('en-US',{minimumFractionDigits: f1, maximumFractionDigits: f1})

				switch (a[2][0]) {
					case '0':
						rS += fS.replace(/,/g, '');
						break;
					case '1':
						rS += fS;
						break;
					case '2':
						if (vN != 0) {
							rS += fS.replace(/,/g, '');
						} else {
							rS += '&nbsp;';
						}
						break;
					case '3':
						if (vN != 0) {
							rS += fS;
						} else {
							rS += '&nbsp;';
						}
						break;
					default:
						rS += 'Bad|2';
				}
			} else {
				rS += v;
			}
//			rS += tN.split('.').reduce((o,i)=>o[i], window);  // Ecma 6
		} else {
			rS += e;
		}
	});
	return rS;
}


function prntSetTcdtCheckedFromSel() {
	vWork.al.tchd.map(function (tH) {
		if (tH.printed != 9) {
			tH.checked = document.getElementById(tH.docId).checked;
		}
	});
}


function prntBldInitRdat() {
	var op = vWork.ob.prnt;
	op.height = {pmax:960, PgrpTrl:0, XactTrl:0, InvTot:0, InvTrl:0 };
	var oh = op.height;

	sliceSdatAry(vDynm.re.cdat.report_id);
	vStat.al.rdat = vWork.ar.sdat;
	vStat.ix.rdat = vStat.al.rdat.map(function (o) {return o.scrLine})

	vStat.al.rdat.map(function (e) {
//		vWork.ob.prnt.height[e.scrDesc] = e.height;
		switch (e.scrLine) {
			case 8:
				oh.PgrpTrl = e.height;
				break;
			case 9:
				oh.XactTrl = e.height;
				break;
			case 10:
				oh.InvTot = e.height;
				break;
			case 11:
				oh.InvTrl = e.height;
				break;
		}
	});

	oh.trlMax = oh.pmax - oh.XactTrl - oh.PgrpTrl;
	oh.trlMin = oh.trlMax - oh.InvTot - oh.InvTrl;
}


function prntInitTransId(transId) {
	relateCdatAry(transId);

	vDynm.ob.tran.prodListType = vDynm.re.cdat.prod_list_type;
	vDynm.ob.tran.prodInvtType = vDynm.re.cdat.prod_invt_type;

	vDynm.re.cust = new custObj(0,0,0,vDynm.re.rhdr.route_id);
	vDynm.re.dept = new deptObj(0,0,"");
	vDynm.re.plst = new plstObj(0,0,0);
	vDynm.re.retl = new retlObj(0,0,0);
}


function prntCreTchdPutIdb() {
	function bldStoreTchd(d) {
		var cP = vWork.al.tcdt.findIndex(function (e) { if (e.dept_no == d.dept_no && e.rpt_sect == vDynm.re.cdat.rpt_sect) {return true}; });
		if (cP > -1) {
			relateTchdAry(d.dept_no, vDynm.re.cdat.rpt_sect);
		}
	}
	promAddAryToIdb(vWork.db.work.handle, 'tcdt', vWork.al.tcdt);

	if (vStat.al.dept.length < 1) {
		vStat.al.dept = [vDynm.re.dept];	// Need to be removed when vStat.al.dept becomes all dept recs
	} else {
		vStat.al.dept.map(bldStoreTchd);
		promAddAryToIdb(vWork.db.work.handle, 'tchd', vWork.al.tchd);
	}
}


function prntResetTots(tD) {
	tD.ohQty1 	= 0;
	tD.ohQty2 	= 0;
	tD.ohQty 	= 0;
	tD.phyQty1 	= 0;
	tD.phyQty2 	= 0;
	tD.sellQty 	= 0;
	tD.xt0Qty1 	= 0;
	tD.xt0Qty2 	= 0;
	tD.xt0Qty 	= 0;
	tD.xt1Qty1 	= 0;
	tD.xt1Qty2 	= 0;
	tD.xt1Qty 	= 0;

	tD.invt = {qty_0:0, qty_1:0, qty_2:0, qty_3:0, qty_4:0, qty_5:0, qty_6:0, qty_7:0, qty_8:0, qty_9:0,};
	
	tD.cnt 		= 0;
	tD.disc 	= 0;
	tD.taxAmt	= 0;
	tD.taxable	= 0;
	tD.ext 		= 0;
	tD.extWtax	= 0;
	tD.ext0 	= 0;
	tD.ext1 	= 0;
}


function prntAccumInvt(tS, tD) {
	for (var i=0;i<10;i++)	{
		tD['qty_'+i] += tS['qty_'+i];
	}
}


function prntAddToAccum(tS, tD) {
	if (tD == undefined) {
		tD = {invt:{}};
	}
	tD.ohQty1  += tS.ohQty1;
	tD.ohQty2  += tS.ohQty2;
	tD.ohQty   += tS.ohQty;
	tD.phyQty1 += tS.phyQty1;
	tD.phyQty2 += tS.phyQty2;
	tD.sellQty += tS.sellQty;
	tD.xt0Qty1 += tS.xt0Qty1;
	tD.xt0Qty2 += tS.xt0Qty2;
	tD.xt0Qty  += tS.xt0Qty;
	tD.xt1Qty1 += tS.xt1Qty1;
	tD.xt1Qty2 += tS.xt1Qty2;
	tD.xt1Qty  += tS.xt1Qty;

	prntAccumInvt(tS.invt, tD.invt);

	tD.cnt		+= tS.cnt;
	tD.disc		+= tS.disc;
	tD.taxAmt	+= tS.taxAmt;
	tD.taxable	+= tS.taxable;
	if (vDynm.re.cdat.trans_id != 88) {		// Don't include TKT portion of ROA in totals. Only Checks
		tD.ext		+= tS.ext;
		tD.extWtax	+= tS.extWtax;
		tD.ext0		+= tS.ext0;
	}
	tD.ext1 = ( (tD.ext||0) - (tD.ext0||0) );
}


function prntUpdateDocAccum() {
	cP = vWork.al.tchd.findIndex(function (e) { if (e.rpt_sect == vDynm.re.cdat.rpt_sect && e.dept_no == vDynm.re.dept.dept_no) return true;});
	if (cP > -1) {
		var tH = vDynm.re.tchd;
		var tE = vWork.ob.prnt.rpt;

		tH.ohQty1 	= tE.ohQty1;
		tH.ohQty2 	= tE.ohQty2;
		tH.ohQty 	= tE.ohQty;
		tH.phyQty1 	= tE.phyQty1;
		tH.phyQty2 	= tE.phyQty2;
		tH.sellQty 	= tE.sellQty;
		tH.xt0Qty1 	= tE.xt0Qty1;
		tH.xt0Qty2 	= tE.xt0Qty2;
		tH.xt0Qty 	= tE.xt0Qty;
		tH.xt1Qty1 	= tE.xt1Qty1;
		tH.xt1Qty2 	= tE.xt1Qty2;
		tH.xt1Qty 	= tE.xt1Qty;

		tH.disc 	= tE.disc;
		tH.taxAmt	= tE.taxAmt;
		tH.taxable	= tE.taxable;
		tH.tot_invc	= tE.extWtax;
		vWork.al.tchd[cP] = vDynm.re.tchd;
		putObj2IdbWork('tchd',tH);
	} else {
		console.log("No tchd for rpt:" + vDynm.re.cdat.rpt_sect + " dept:" + vDynm.re.dept.dept_no);
	}
}


function prntParseMoveInvtQtys(tS, tD) {
	for (var i=0;i<10;i++)	{
		var cu = tranCsUnFromQty(tS['qty_'+i]);
		tD['qty_'+i] = tS['qty_'+i];
		tD['qty_'+i+'c'] = cu.cases;
		tD['qty_'+i+'u'] = cu.units;
	}
}


function prntPushArrays(str) {
	vWork.ar.prntStr.push(str);
	vWork.ar.prntDat.push({height: vDynm.re.rdat.height, scrLine: vDynm.re.rdat.scrLine, rptSect: vDynm.re.cdat.rpt_sect, deptNo: vDynm.re.dept.dept_no, transId: vDynm.re.cdat.trans_id} );
//	vWork.ob.prnt.heightPage	+= vDynm.re.rdat.height;
}


function prntFullHdr(tdo) {
	prntPushArrays(prntBuildCompHdr());
	prntPushArrays(prntBuildSmanHdr());
	prntPushArrays(prntBuildCstHdr());
	prntPushArrays(prntBuildXactHdr(tdo));
	prntPushArrays(prntBuildPgrpDtl(tdo));
}


function prntFullTrl(tdo) {
	prntPushArrays(prntBuildPgrpTot());
	prntPushArrays(prntBuildXactTot(tdo));
	prntPushArrays(prntBuildInvTot());
	prntPushArrays(prntBuildInvTax());
	prntPushArrays(prntBuildInvTrl());

	prntUpdateDocAccum();
}


function prntCopyToVoid(tH) {
	console.log('voiding ' + tH.dept_no + ":" + tH.rpt_sect)
}


function prntBuildCompHdr() {
	return prntMapSdat(1);
}


function prntBuildSmanHdr() {
	return prntMapSdat(2);
}


function prntBuildCstHdr() {
	prntResetTots(vWork.ob.prnt.rpt);
	vWork.ob.prnt.tdo.soldReturn = 'Sold To';
	return prntMapSdat(3);
}


function prntBuildXactHdr(tdo) {
	prntResetTots(vWork.ob.prnt.xact);
	return prntMapSdat(4);
}


function prntBuildPgrpDtl(tdo) {
	prntResetTots(vWork.ob.prnt.grp);
	return prntMapSdat(5);
}


function prntBuildProdDtl(tdo) {
//	if (tdo.disc_amt > 0) {
//		vWork.ob.prnt.tdo.prodDisc = tdo.disc_amt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//		vWork.ob.prnt.tdo.prodDisc = tdo.disc_amt;
//	} else {
//		vWork.ob.prnt.tdo.prodDisc = '&nbsp;';
//	}
	
	vDynm.ob.csrv.alInvtIdx = relateInvtAry(tdo.prod_no);
	vDynm.ob.csrv.alProdIdx = relateProdAry(tdo.prod_no);

	if (tdo.phy_qty1 == 0) {
		vWork.ob.prnt.tdo.phy_qty1 = "";
	}

	vDynm.re.invt.qty_0 = vDynm.re.invt.qty_7 + vDynm.re.invt.qty_8;	//	Stock is Truck + Warehouse;
	vWork.ob.prnt.tdo.invt = {};
	prntParseMoveInvtQtys(vDynm.re.invt, vWork.ob.prnt.tdo.invt);

	prodDtlStr = prntMapSdat(6);

	prntAccumInvt(vDynm.re.invt, vWork.ob.prnt.grp.invt);

	vWork.ob.prnt.grp.ohQty1  += (tdo.oh_qty1||0) * 1;
	vWork.ob.prnt.grp.ohQty2  += (tdo.oh_qty2||0) * 1;
	vWork.ob.prnt.grp.ohQty   += (tdo.oh_qty||0) * 1;
	vWork.ob.prnt.grp.phyQty1 += (tdo.phy_qty1||0) * 1;
	vWork.ob.prnt.grp.phyQty2 += (tdo.phy_qty2||0) * 1;
	vWork.ob.prnt.grp.sellQty += (tdo.sell_qty||0);
	vWork.ob.prnt.grp.xt0Qty1  += (tdo.xt0_qty1||0) * 1;
	vWork.ob.prnt.grp.xt0Qty2  += (tdo.xt0_qty2||0) * 1;
	vWork.ob.prnt.grp.xt0Qty   += (tdo.xt0_qty||0) * 1;
	vWork.ob.prnt.grp.xt1Qty1  += (tdo.xt1_qty1||0) * 1;
	vWork.ob.prnt.grp.xt1Qty2  += (tdo.xt1_qty2||0) * 1;
	vWork.ob.prnt.grp.xt1Qty   += (tdo.xt1_qty||0) * 1;

	vWork.ob.prnt.grp.disc    += (tdo.disc_amt||0) * tdo.sell_qty;
	vWork.ob.prnt.grp.taxAmt  += (tdo.tax_amt||0);
	vWork.ob.prnt.grp.taxable += (tdo.taxable||0);
	vWork.ob.prnt.grp.ext     += (tdo.net_ext||0);
	vWork.ob.prnt.grp.extWtax += (tdo.net_ext||0) + (tdo.tax_amt||0);

	if (tdo.prod_no > 0) {
		vWork.ob.prnt.grp.cnt++;
	} else {
		vWork.ob.prnt.grp.ext0 = tdo.net_ext;
	}

	return prodDtlStr;
}


function prntBuildPrmoDtl(tdo) {
	if (!relateRdatAryTF(7)) return "";

	vDynm.ar.tapr = vWork.al.tapr.filter(function (e) { if (e.dept_no == tdo.dept_no && e.trans_id == tdo.trans_id && e.prod_no == tdo.prod_no) {return true}; });
	if (vDynm.ar.tapr.length < 1) {
		return "";
	}
	var allPrmoStrs = "";

	vDynm.ar.tapr.map(function (e) {
		if (e.passMinLyr) {
			vWork.ob.prnt.tdo.prmoNoName  = 'Promo ' + e.promoNoTxt + ': ' + e.descriptn;
			vWork.ob.prnt.tdo.prmoFldType = e.discTypeTxt + " " + e.discFldTxt;
			vWork.ob.prnt.tdo.prmoTypeTxt = e.discTypeTxt;
			vWork.ob.prnt.tdo.prmoFldTxt  = e.discFldTxt;
			allPrmoStrs += prntMapSdat(7);
		}
	})
	return allPrmoStrs;
}


function prntBuildPgrpTot() {
	prntAddToAccum(vWork.ob.prnt.grp, vWork.ob.prnt.xact);
	prntParseMoveInvtQtys(vWork.ob.prnt.grp.invt, vWork.ob.prnt.grp.invt);

	return prntMapSdat(8);
}


function prntBuildXactTot() {
	prntAddToAccum(vWork.ob.prnt.xact, vWork.ob.prnt.rpt);
	prntParseMoveInvtQtys(vWork.ob.prnt.xact.invt, vWork.ob.prnt.xact.invt);
	return prntMapSdat(9);
}


function prntBuildInvTot() {
	if (vWork.ob.prnt.rpt.disc != 0) {
		vWork.ob.prnt.tdo.disc_txt = "Total Discount Given";
	} else {
		vWork.ob.prnt.tdo.disc_txt = "";
		vWork.ob.prnt.tdo.disc_amt = "";
	}
	if (vWork.ob.prnt.xact.ext < 0) {
		vWork.ob.prnt.tdo.unitsDir = 'Out';
	} else {
		vWork.ob.prnt.tdo.unitsDir = 'In';
	}
	return prntMapSdat(10);
}


function prntBuildInvTax() {
	var tStr = "";
	vDynm.ar.ptax.map( function (eT) {
		vWork.ob.prnt.rpt.taxFld = eT.tax_fld;
		if (vWork.ob.prnt.rpt.taxAmt) {
			tStr += prntMapSdat(11);
		}
	});
	return tStr;
}


function prntBuildInvTrl() {
	if (vWork.ob.prnt.rpt.ext < 0) {
		vWork.ob.prnt.tdo.payText = vCnst.ar.creditMethStrs[vDynm.ob.csrv.payMeth];
	} else {
		vWork.ob.prnt.tdo.payText = vCnst.ar.billMethStrs[vDynm.ob.csrv.payMeth];
	}
	return prntMapSdat(12);
}


//
//	Main Loop
//
function prntBuildXactions() {
	var tpDocAry = vWork.al.tchd.filter(function (e) {return e.checked})
	if (!tpDocAry.length) return false;

	var tpDtlAry = [];
	vWork.al.tcdt.map(function (d) {
		var tpdaI = tpDocAry.findIndex(function (e) { if (e.dept_no == d.dept_no && e.rpt_sect == d.rpt_sect) {return true}; });
		if (tpdaI >= 0) {
			tpDtlAry.push(d);
		}
	});

	if (!tpDtlAry.length) return false;
	
	var tdo = tpDtlAry[0];
	var lastDept = tdo.dept_no;
	var lastSect = tdo.rpt_sect;
	var lastXact = tdo.trans_id;
	var lastPgrp = tdo.prod_grp;
	var curRptSect =  -1;

	vWork.ar.prntStr = [];
	vWork.ar.prntDat = [];
	vWork.ar.prntPage = [];

	vWork.ob.prnt.tdo = tdo;
	vWork.ob.prnt.pageNo = 1;

	relateCdatAry(tdo.trans_id);
	relateDeptAry(tdo.dept_no);
	relateTchdAry(tdo.dept_no, tdo.rpt_sect);

 	prntBldInitRdat();
	prntFullHdr(tdo);

	for (var i=0;i<tpDtlAry.length;i++)	{
		var tdo = tpDtlAry[i];
		vWork.ob.prnt.tdo = tdo;
		if (tdo.dept_no != lastDept || tdo.rpt_sect != lastSect) {
			lastPgrp = tdo.prod_grp;
			lastXact = tdo.trans_id;
			lastSect = tdo.rpt_sect;
			lastDept = tdo.dept_no;

			prntFullTrl(tdo);
			relateCdatAry(tdo.trans_id);
			relateDeptAry(tdo.dept_no);
			relateTchdAry(tdo.dept_no, tdo.rpt_sect);
 			prntBldInitRdat();
			prntFullHdr(tdo);
		}

		if (tdo.trans_id != lastXact) {
			lastPgrp = tdo.prod_grp;
			lastXact = tdo.trans_id;

			prntPushArrays(prntBuildPgrpTot());
			prntPushArrays(prntBuildXactTot());

			relateCdatAry(tdo.trans_id);
 			prntBldInitRdat();

			prntPushArrays(prntBuildXactHdr(tdo));
			prntPushArrays(prntBuildPgrpDtl(tdo));
		}

		if (tdo.prod_grp != lastPgrp) {
			lastPgrp = tdo.prod_grp;
			prntPushArrays(prntBuildPgrpTot());
			prntPushArrays(prntBuildPgrpDtl(tdo));
		}
		prntPushArrays(prntBuildProdDtl(tdo));
		prntPushArrays(prntBuildPrmoDtl(tdo));
	}
	prntFullTrl(tdo);
	prntInsertPageBreaks();
	prntChangeTktPageNo();

	return true;
}


/*
Insert Page Break based on Break Types:
	6: Product Detail,
	8: Prod Group,
	9: Xact Group,
	10: Report Section
Return new offset from top
*/
function prntBuildPageBreak(pIdx, bType) {

	function prntSplicePrntStr(idx,str) {
		vWork.ar.prntStr.splice(idx,0,str);
		vWork.ar.prntDat.splice(idx,0,{height: vDynm.re.rdat.height, scrLine: vDynm.re.rdat.scrLine, rptSect: vDynm.re.cdat.rpt_sect, deptNo: vDynm.re.dept.dept_no, transId: vDynm.re.cdat.trans_id});
	}

	switch (bType) {
		case 6:
			prntSplicePrntStr(pIdx, vWork.ob.prnt.lastPgrpHdr);
			prntSplicePrntStr(pIdx, vWork.ob.prnt.lastXactHdr);
			prntSplicePrntStr(pIdx, prntBuildCstHdr());
			break;
		case 7:
			prntSplicePrntStr(pIdx, vWork.ob.prnt.lastPgrpHdr);
			prntSplicePrntStr(pIdx, vWork.ob.prnt.lastXactHdr);
			prntSplicePrntStr(pIdx, prntBuildCstHdr());
			break;
		case 8:
			prntSplicePrntStr(pIdx, vWork.ob.prnt.lastXactHdr);
			prntSplicePrntStr(pIdx, prntBuildCstHdr());
			break;
		case 9:
			prntSplicePrntStr(pIdx, prntBuildCstHdr());
			break;
		case 10:
			prntSplicePrntStr(pIdx, prntBuildCstHdr());
			break;
		default:
			console.log('Bad prntBuildPageBreak call:', bType);
			prntSplicePrntStr(pIdx, vWork.ob.prnt.lastPgrpHdr);
			prntSplicePrntStr(pIdx, vWork.ob.prnt.lastXactHdr);
			prntSplicePrntStr(pIdx, prntBuildCstHdr());
			break;
//			return 0;
	}

	prntSplicePrntStr(pIdx, prntBuildSmanHdr());
	prntSplicePrntStr(pIdx, prntBuildCompHdr());
	vWork.ar.prntStr.splice(pIdx,0,'</table><div class="cprn_form_feed">&#12;</div>');
	vWork.ar.prntDat.splice(pIdx,0,{height: 0, scrLine: 9999, rptSect: vDynm.re.cdat.rpt_sect, deptNo: vDynm.re.dept.dept_no, transId: vDynm.re.cdat.trans_id});
	return 0;
}


function prntInsertPageBreaks() {
	var pAcc = 0;
	var cri = 0;
	var breakReq = false;
	var inDocTrl = false;
	var curDeptNo  =  vWork.ar.prntDat[0].deptNo;
	var curRptSect =  vWork.ar.prntDat[0].rptSect;

	for (var i = vWork.ar.prntStr.length-1;i>=0;i--)	{
		if (vWork.ar.prntStr[i] == "") {
			vWork.ar.prntDat.splice(i,1);
			vWork.ar.prntStr.splice(i,1);
		}
	}

	relateCdatAry(vWork.ar.prntDat[0].transId);
	relateDeptAry(vWork.ar.prntDat[0].deptNo);

	for (var i=0;i<vWork.ar.prntStr.length;i++)	{
		if (vWork.ar.prntDat[i].deptNo != curDeptNo || vWork.ar.prntDat[i].rptSect != curRptSect) {
			relateCdatAry(vWork.ar.prntDat[i].transId);
			relateDeptAry(vWork.ar.prntDat[i].deptNo);
			curRptSect = vWork.ar.prntDat[i].rptSect;
			curDeptNo  = vWork.ar.prntDat[i].deptNo;
			pAcc = 0;
			breakReq = false;
		}

		cri = vWork.ar.prntDat[i].scrLine;
		pAcc += vWork.ar.prntDat[i].height;
		if (cri == 4) vWork.ob.prnt.lastXactHdr = vWork.ar.prntStr[i];
		if (cri == 5) vWork.ob.prnt.lastPgrpHdr = vWork.ar.prntStr[i];
		if (pAcc > vWork.ob.prnt.height.trlMin) breakReq = true;

		if (breakReq) {
			inDocTrl = false;
			for (var j=i;j<vWork.ar.prntStr.length && j<i+5;j++) {
				if (vWork.ar.prntDat[j].scrLine > 9) {
					inDocTrl = true;
					break;
				}
			}
			if (!inDocTrl) {
				if (pAcc > vWork.ob.prnt.height.trlMax) {
					pAcc = prntBuildPageBreak(i+1, cri)
					i++;
					breakReq = false;
				} else {
					if (cri == 8) {	// Group Trl
						if ( vWork.ar.prntDat[i+1].scrLine == 9) {	// Next Line is Xact Trl
							pAcc = prntBuildPageBreak(i+2, 9)
							i++;
						} else {
							pAcc = prntBuildPageBreak(i+1, cri)
						}
						breakReq = false;
						i++;
					}
				}
			}
		}
	}
}


function prntChangeTktPageNo() {
	var pn=[];
	var lastDept = -1;
	var lastSect = -1;
	var rptSect = -1;
	var pageNo = 0;
	var maxPage = 1;
//	var pd = {};

	for (var i=0;i<vWork.ar.prntDat.length;i++)	{
		var pd = vWork.ar.prntDat[i];
		if (pd.scrLine == 3) {
			if (lastSect == -1) lastSect = pd.rptSect;
			if (pd.rptSect == lastSect && pd.deptNo == lastDept) {
				pageNo++;
			} else {
				lastDept = pd.deptNo;
				lastSect = pd.rptSect;
				pageNo = 1;
			}
			pn.push({deptNo: pd.deptNo, rptSect: pd.rptSect, pageNo: pageNo, idx: i});
		}
	}

	maxPages = pn[pn.length-1].pageNo;
	lastDept = pn[pn.length-1].deptNo;
	lastSect = pn[pn.length-1].rptSect;
	for (var i=pn.length-1;i>=0;i--)	{
		var po = pn[i];
		if (po.rptSect != lastSect || po.deptNo != lastDept) {
			maxPages = po.pageNo;
			lastDept = po.deptNo;
			lastSect = po.rptSect;
		}
		relateTchdAry(po.deptNo, po.rptSect);
		vWork.ar.prntStr[po.idx] = vWork.ar.prntStr[po.idx].replace('|page_of|','&nbsp;' + po.pageNo + '&nbsp;of&nbsp;' + maxPages);
		vWork.ar.prntStr[po.idx] = vWork.ar.prntStr[po.idx].replace('|tkt_no|',vDynm.re.tchd.tkt_no);
	}
}


function prntXactHdrsScan(){
	vWork.al.tchd.map(function (tH) {
		var cP = vWork.al.tcdt.findIndex(function (tD) { if (tD.dept_no == tH.dept_no && tD.rpt_sect == tH.rpt_sect && tD.sell_qty > 0) {return true}; });
		if (cP < 0) {
			tH.printed = 9;
		} else {

			if (tH.printed == 0 || tH.changed || tH.pay_method != vDynm.ob.csrv.payMeth) {
//				if (vDynm.re.cdat.use_tkt > 0) {
				if (tH.cdat.use_tkt > 0) {
					tH.tkt_no = vDynm.re.rhdr.next_tkt_1;
					vDynm.re.rhdr.next_tkt_1++;
				} else {
					tH.tkt_no = " ";
				}
				tH.printed = 1;
			}

			if (tH.changed) {
				prntCopyToVoid(tH);	// must be copy to IDB with unique key. This may be called multiple times for same key.
			}
		}
	});
}


function prntChkPrinter() {
	var iB = document.getElementById('i_prntWiFi');
	if (!iB) {
		clearInterval(vWork.ob.prnt.ctrl.timer1);
		return;
	}

	vWork.ob.prnt.ctrl.timCnt++;
	if (vWork.ob.ip.type == 'w') {
		vWork.ob.prnt.ctrl.okCnt++;
		if (vWork.ob.prnt.ctrl.okCnt > 4) {
			vWork.ob.prnt.ctrl.timCnt = 999;
			iB.disabled = false;
		}
	} else {
		vWork.ob.prnt.ctrl.okCnt = 0;
	}

	if (vWork.ob.prnt.ctrl.timCnt > 240) {
		clearInterval(vWork.ob.prnt.ctrl.timer1);
	} else {
		idxOnlineChange();
	}
}


function prntXactHdrsDisp(sdRef){
	var tblDtlId = document.getElementById('i_cprnDocSelTbl');
	var tblDtlStr = "";

	relateSdatAry(sdRef);
	var htmlStr = vDynm.re.sdat.scrContent;

	vWork.al.tchd.map(function (tH) {
		if (tH.printed != 9) {
			var tS = (JSON.parse(JSON.stringify(htmlStr)));

			if ( tH.printed != 2 || tH.changed || tH.pay_method != vDynm.ob.csrv.payMeth) {
				if (tH.cdat.use_tkt == 0) {
					tS = tS.replace('~mustPrint~', '&nbsp;');
				} else {
					tS = tS.replace('~mustPrint~', '*');
				}
				tS = tS.replace('~checked~', 'checked=checked');
			} else {
				tS = tS.replace('~mustPrint~', '&nbsp;');
				tS = tS.replace('~checked~', '');
			}
			tS = tS.replace('~i_rpt_sel~', tH.docId);
			tS = tS.replace('~tktNo~',tH.tkt_no);
			tS = tS.replace('~deptDesc~',tH.dept_desc);
			tS = tS.replace('~scrDesc~',tH.rpt_desc);

			tblDtlStr += tS;
		}
	});
	tblDtlId.innerHTML = tblDtlStr;
	idxOnlineChange();
	vWork.ob.prnt.ctrl.timCnt = 0;
	vWork.ob.prnt.ctrl.okCnt = 0;
	vWork.ob.prnt.ctrl.timer1 = setInterval(prntChkPrinter,1000);
}


function prntXactSetVals() {
	vWork.al.tchd.map(function (e) {
		e.changed = false;
//		putObj2IdbWork('tchd',e);
	});
}


function prntSavePrintedToTvoids(tH) {
	var hKey = [tH.dept_no, tH.rpt_sect];
	var lowerLimit = [tH.dept_no, tH.rpt_sect, 00];
	var upperLimit = [tH.dept_no, tH.rpt_sect, 99];
	promDeleteRec(vWork.db.work.handle, 'tvhd', hKey).then(function (data) {
		promDeleteRangeIdx(vWork.db.work.handle, 'tvdt', 'print_order', lowerLimit, upperLimit).then(function (data) {
			putObj2IdbWork('tvhd',tH);
			vWork.al.tcdt.map(function (tD) {
				if (tD.dept_no == tH.dept_no && tD.rpt_sect == tH.rpt_sect) {
					putObj2IdbWork('tvdt',tD);
				}
			});

	    }).catch(function (error) {
			console.log(error);
	    });
    }).catch(function (error) {
		console.log(error);
    });
}


function prntCallPrint(orgTitle, callback) {
	window.print();
	document.title = orgTitle;
	document.getElementById('i_cprnDiv').innerHTML = "Please Print From Within V-Trax";

	if (callback != undefined) {
		callback();
	}
}


function prntAllReqPrinted() {
	var allReqPrinted = true;
	vWork.al.tchd.map(function (e) {
		if (e.checked) {
			e.printed = 2;
			e.changed = false;

			e.pay_method = 99;
			e.rpt_sect = e.rpt_sect;

			putObj2IdbWork('tchd',e);
		}
		if (e.printed < 2) {
			allReqPrinted = false;
		}
	});
	return allReqPrinted;
}

function debugPrint() {
	document.getElementById('i_HdrDiv').style.display = 'none';
	document.getElementById('i_MidDiv').style.display = 'none';
	document.getElementById('i_TrlDiv').style.display = 'none';
	document.getElementById('i_cprnDiv').style.display = 'inline-block';
	document.getElementById('i_cprnDiv').style.backgroundColor = 'white';
}
function debugRePrint() {
	document.getElementById('i_HdrDiv').style.display = 'block';
	document.getElementById('i_MidDiv').style.display = 'block';
	document.getElementById('i_TrlDiv').style.display = 'block';
	document.getElementById('i_cprnDiv').style.display = 'none';
	document.getElementById('i_cprnDiv').style.backgroundColor = 'black';
}