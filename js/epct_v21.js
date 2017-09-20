/*
  Copyright (c) 2016 Aziom, Inc. All rights reserved.
*/


function epctBuildTepr(callback) {

	function epctParseClassDigitMatch() {
		var d1Ary = vStat.al.plnk.filter(function (o) { return o.cust_no[0] == 'C'});
		for (var i = d1Ary.length - 1; i >= 0; i--) {
			var pE = d1Ary[i];
			var cE = zeroL(vDynm.re.cust.cclass1,4) + zeroL(vDynm.re.cust.cclass2,4)
			for (var j=0;j<pE.length;j++)	{
			    if ( pE[j] != 0 && pE[j] != cE[j]) {
	    		    d1Ary.splice(i, 1);
				}
		    }
		}
		return d1Ary;
	}

	function epctAddPrmdToTepr(o) {
		vDynm.re.tepr = new teprObj(vDynm.re.eprm, vDynm.re.plnk, o);
		vStat.al.tepr.push(vDynm.re.tepr);
	}

// ^^^^^^^^^^^^^^^^^^^^^^
	var c1Ary = vStat.al.plnk.filter(function (o) { return o.cust_no == vDynm.re.cust.cust_no});
	var c2Ary = vStat.al.plnk.filter(function (o) { return o.cust_no == 'AAAA'+zeroL(vDynm.re.cust.cclass1,4)});
	var c3Ary = vStat.al.plnk.filter(function (o) { return o.cust_no == 'AAAB'+zeroL(vDynm.re.cust.cclass2,4)});
	var c4Ary = vStat.al.plnk.filter(function (o) { return o.cust_no == 'AAAAAAAA'});

	if (zeroL(vDynm.re.cust.cclass1,4)[0] == 'C') {
		var c5Ary = epctParseClassDigitMatch();
	} else {
		var c5Ary = [];
	}
	var conAry = c1Ary.concat(c2Ary, c3Ary, c4Ary, c5Ary);
	vStat.al.tepr = [];
	
	var tDay = (new Date()).toISOString().split('T')[0]
	for (var i = conAry.length - 1; i >= 0; i--) {
	    if ( conAry[i].start_date > tDay || conAry[i].stop_date < tDay) {
//	   	    conAry.splice(i, 1);
		} else {
			vDynm.re.plnk = conAry[i];
			relateEprmAry(conAry[i].promo_no);
			var prmdA = vStat.al.prmd.filter(function (o) {return o.promo_no == conAry[i].promo_no});
			prmdA.map(epctAddPrmdToTepr);
		}
	}
	vStat.al.tacp = vStat.al.tepr.filter(function (e) {return e.active == 'Y'});

	if (callback != undefined) {
		callback();
	}
}