/*
  Copyright (c) 2016 Aziom, Inc. All rights reserved.
*/


function cprnPrintSelDone() {
	prntSetTcdtCheckedFromSel();
	vDynm.ob.csrv.printedMeth = vDynm.ob.csrv.payMeth;
	boxChange(4910);
}


// Put details to IDB for Upload
function cprnTcdtToIdb() {
	var tRec = [];
	csdnClearWorkDtlArys();
//	vDynm.ob.csrv.accum = {total_invc: 0, total_disc: 0};

	vWork.al.tcdt.map( function (tD) {
		var tI = vWork.al.tchd.findIndex(function (e) { if (e.dept_no == tD.dept_no && e.rpt_sect == tD.rpt_sect) {return true}; });
		if (tI < 0) {
			console.log('CTDT rpt_sect not in TCHD');
		} else {
			var tH = vWork.al.tchd[tI];
			tD.tkt_no = tH.tkt_no;

			if (tH.checked) {
				switch (tD.trans_id) {
					case 88:
						tRec = new tcdt2ctrt(tD);
						vWork.ar.bldCtrt.push(tRec);
						break;
					case 89:
						tRec = new tcdt2ctrp(tD);
						vWork.ar.bldCtrp.push(tRec);
						break;
					default:
						tRec = new tcdt2ctdt(tD);
						vWork.ar.bldCtdt.push(tRec);
				}
			}
		}
	});
	if (vWork.ar.bldCtdt.length > 0) promAddAryToIdb(vWork.db.upld.handle, 'ctdt', vWork.ar.bldCtdt);
	if (vWork.ar.bldCtrp.length > 0) promAddAryToIdb(vWork.db.upld.handle, 'ctrp', vWork.ar.bldCtrp);
	if (vWork.ar.bldCtrt.length > 0) promAddAryToIdb(vWork.db.upld.handle, 'ctrt', vWork.ar.bldCtrt);
//	nextSeq();
}


function cprnPrintPreViewClosed() {
	var allReqPrinted = true;
	vWork.ar.bldCtrn = [];	

	cprnTcdtToIdb();
	
	vWork.al.tchd.map(function (tH) {
		if (tH.checked) {
			tH.printed = 2;
			tH.changed = false;
			tH.pay_method = vDynm.ob.csrv.payMeth;
			putObj2IdbWork('tchd',tH);

			var hRec = new tchd2ctrn(tH, 1);
			putObj2IdbUpld('ctrn', hRec);

		}
		if (tH.printed < 2 && tH.cdat.use_tkt > 0) {
			allReqPrinted = false;
		}
	});

	if (allReqPrinted) {
		boxChange(4920);	// No Transactions that Req print
	} else {
		boxChange(4930);	// More to Print
	}
}


function cprnBuildMethSel(eId) {
	vDynm.ob.csrv.billMethStr = vCnst.ar.billMethStrs[vDynm.ob.csrv.payMeth];
	var selectNo = document.getElementById(eId);

	var tMa = parseInt(vDynm.re.cust.meth_allow, 16);
	var tMaAry = [];
	for (var i=0; i<8; i++) {
		if (tMa & 1) {
			if (i == vDynm.ob.csrv.payMeth) {
				tMaAry.push({maNo: i, maTxt: vCnst.ar.allowMethStrs[i], maSel:true});
			} else {
				tMaAry.push({maNo: i, maTxt: vCnst.ar.allowMethStrs[i], maSel:false});
			}
		}
		tMa = tMa >> 1;
	}

	selectNo.length = 0;
	tMaAry.map(function (e) {
		var option = document.createElement("option");
		option.selected = e.maSel;
		option.text = e.maTxt;
		option.value = e.maNo;
		selectNo.appendChild(option);
	});
}


function cprnPrntReqScrInit() {
	var iD = '';
	if (iD = document.getElementById('i_csdnCopiesSel')) iD.selectedIndex = vDynm.ob.csrv.copies - 1;
}


//	HTML Embedded calls

function cprnPayMethChange() {
	var selectNo = document.getElementById('i_csdnPayMethSel');
	var newPayMeth = selectNo.value*1;
	var numReprints = 0;
	vDynm.ob.csrv.payMeth = newPayMeth;

	promFetchRec(vWork.db.dnld.handle, 'rhdr', vDynm.re.rhdr.route_id).then(function (data) {
		vDynm.re.rhdr = data;

		promFetchAll(vWork.db.work.handle, 'tchd').then(function (datAry) {
			vWork.al.tchd = datAry;

			vWork.al.tchd.map(function (e) {
				if (e.rpt_sect <= 5 && e.pay_method != vDynm.ob.csrv.payMeth) {
					numReprints++;
				}
			});

			prntXactHdrsScan();
			prntXactHdrsDisp(204900);
			prntXactSetVals();
			if (numReprints > 0) {
				tranHtml2DomId("i_cprn_meth_alert", "Method Changed. Reprint Required");
			} else {
				tranHtml2DomId("i_cprn_meth_alert", "&nbsp;");
			}
	    }).catch(function (error) {
			console.log(error);
	    });
    }).catch(function (error) {
		console.log(error);
    });
}


function cprnCopiesChange() {
	var selectNo = document.getElementById('i_csdnCopiesSel');
	var newNumCopies = selectNo.value*1;
	var numReprints = 0;
	vDynm.ob.csrv.copies = newNumCopies;
}


//	 Entry for 
function bcInitCprnPrintProcedure()  {

//	No Transactions in TCDT
	if (vWork.al.tcdt.length == 0) {
		boxChange(4902);
		return;
	}

//	Transactions in TCDT, but nothing to print
	if (!prntBuildXactions()) {
		var tI = vWork.al.tchd.findIndex(function (e) { if (e.printed != 2) {return true}; });
		if (tI < 0) {
			boxChange(4902);	// No Transactions that Req print
		} else {
			boxChange(4904);
		}
		return;
	}
	
	var newCprn = vWork.ar.prntStr.join('');
	var prntJob = newCprn;
	for(i=1;i<vDynm.ob.csrv.copies;i++) {
		prntJob += '<div class="cprn_form_feed">&#12;</div>' + newCprn;	
	}
	var newTitle = "Rt" + vDynm.re.rhdr.route_id + "_Tkt" + vDynm.re.tchd.tkt_no;
	var orgTitle = document.title;

	document.getElementById('i_cprnDiv').innerHTML = prntJob;
	document.title = newTitle;

//	setTimeout(function () {prntCallPrint(orgTitle, cprnPrintPreViewClosed)},300);
	prntCallPrint(orgTitle, cprnPrintPreViewClosed);
}


function cprnPrePrintInit() {
//	CalcTax per product in TCDT
	vDynm.ar.ptax.map( function (eT) {
		eT.taxable = 0;
	});

	vWork.al.tcdt.map( function (eD) {
		if (eD.rpt_sect < 7) {			// No taxes on ROA
			var iP = relateProdAry(eD.prod_no);
			var eP = vStat.al.prod[iP];
			eD.tax_amt = 0;
			eD.taxable = 0;
			vDynm.ar.ptax.map( function (eT) {
				for(i=1; i<8; i++) {
					fld = "tax_key_" + i
					if (eP[fld] == eT.key_prod) {
						eD.taxable += eD.net_ext;
						eT.taxable += eD.net_ext;
						eD.tax_amt += eD.net_ext * eT.tax_fld / 1000000;
						eT.tax_amt = (eT.tax_amt||0) + eD.tax_amt;
					}
				}
			});
		}
	});
}


function cprnDispPickList() {
	function cprnAddPickProd(eV) {
		var tS = '';
		tS += '<div class="csPkDt">';
		if (vCnst.el.pick2col) {
			tS += '<div class="csPkDtPr">'	+ eV.prodNo + '</div>';
		} else {
			tS += '<div class="csPkDtPn">'	+ eV.prodNo + '</div>';
			tS += '<div class="csPkDtPd">'	+ eV.prodDesc + '</div>';
		}
		tS += '<div class="csPkDtCs">'	+ eV.cases + '</div>';
		tS += '<div class="csPkDtEa">'	+ eV.units + '</div>';
		tS += '<div class="csPkDtCk"><input type="checkbox"></div>';
		tS += '</div>';
		tS += '';
		return tS;
	}
	var pickId = document.getElementById("i_csrvPick");
	if (!pickId) return;

	var pickTotCs = 0;
	var pickTotEa = 0;
	var pickTotQt = 0;
	vWork.ar.pickVal = [];
	vWork.ob.prnt.pick = '';
	if (vWork.al.tcdt.length < 1) return;
	
	vWork.al.tcdt.map( function (eD) {
		if (eD.rpt_sect == 1) {			// Only outbound prods on Pick List
			var units = eD.sell_qty % eD.case_qty;
			var cases = parseInt(eD.sell_qty / eD.case_qty);
			vWork.ar.pickVal.push({prodNo: eD.prod_no, prodDesc: eD.prod_desc, cases: cases , units: units, qty: eD.sell_qty});
		}
	});

	var cnt2 = parseInt(vWork.ar.pickVal.length/2);
	var cnt1 = vWork.ar.pickVal.length - cnt2;

	if (vCnst.el.pick2col) {
		var pt1Str = '<div id="i_csPkLtCt">';
		var pt2Str = '</div><div id="i_csPkRtCt">';
		var pt3Str = '</div>';
	} else {
		var pt1Str = '';
		var pt2Str = '';
		var pt3Str = '';
	}

	for(i=0;i<cnt1;i++) {
		var p1E = vWork.ar.pickVal[i];
		pt1Str += cprnAddPickProd(p1E);
		pickTotCs += p1E.cases;
		pickTotEa += p1E.units;
		pickTotQt += p1E.qty;
	}


	for(i=cnt1;i<vWork.ar.pickVal.length;i++) {
		var p2E = vWork.ar.pickVal[i];
		pt2Str += cprnAddPickProd(p2E);
		pickTotCs += p2E.cases;
		pickTotEa += p2E.units;
		pickTotQt += p2E.qty;
	}
	pt2Str += '</div>';

	var hdrStr = '<div id="i_csPkHdrCt">';
	hdrStr += '<div id="i_csPkHdrTxt">Pick List</div>';
	hdrStr += '<div id="i_csPkHdrQtTx">cs:</div>';
	hdrStr += '<div id="i_csPkHdrCeQt">' + pickTotCs + '</div>';
	hdrStr += '<div id="i_csPkHdrQtTx">ea:</div>';
	hdrStr += '<div id="i_csPkHdrCeQt">' + pickTotEa + '</div>';
	hdrStr += '<div id="i_csPkHdrQtTx">qty:</div>';
	hdrStr += '<div id="i_csPkHdrQtQt">' + pickTotQt + '</div>';
	hdrStr += '</div>';
	hdrStr += '<div id="csPkCt">';

	vWork.ob.prnt.pick = hdrStr + pt1Str + pt2Str + pt3Str;
	pickId.innerHTML = vWork.ob.prnt.pick;
}


//	 Display documents entered, allow selection of items to print
function bcInitCprnPrintRequest()  {
	promFetchAll(vWork.db.work.handle, 'tapr').then(function (taprAry) {
		vWork.al.tapr = taprAry;

		promFetchAllIdx(vWork.db.work.handle, 'tcdt', 'print_order').then(function (tcdtAry) {
			vWork.al.tcdt = tcdtAry.filter(function (o) { return o.sell_qty > 0});

			promFetchRec(vWork.db.dnld.handle, 'rhdr', vDynm.re.rhdr.route_id).then(function (rhdrAry) {
				vDynm.re.rhdr = rhdrAry;

				promFetchAll(vWork.db.work.handle, 'tchd').then(function (tchdAry) {
					vWork.al.tchd = tchdAry;

					if (vWork.al.tcdt.length > 0) {
						cprnPrePrintInit();
						prntXactHdrsScan();
						prntXactHdrsDisp(204900);
						prntXactSetVals();
						cprnDispPickList();
					} else {
						boxChange(4902);
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
    }).catch(function (error) {
		console.log(error);
    });

	cprnBuildMethSel('i_csdnPayMethSel');
	cprnPrntReqScrInit();
}


//	 Entry for 
function bcInitCsrvPrintComplete()  {
	putObj2IdbDnld('rhdr',vDynm.re.rhdr);
	vWork.al.tchd.map(function (e) {
		e.pay_method = vDynm.ob.csrv.payMeth;
		putObj2IdbWork('tchd',e);
	});
	var pickId = document.getElementById("i_csrvPick");
	if (pickId) pickId.innerHTML = vWork.ob.prnt.pick;
}


function bcInitCsrvNoTrans()  {
	var pickId = document.getElementById("i_csrvPick");
	if (pickId) pickId.innerHTML = vWork.ob.prnt.pick;
}
