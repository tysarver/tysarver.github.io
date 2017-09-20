/*
  Copyright (c) 2016 Aziom, Inc. All rights reserved.
*/



function aprmChkPromoApplies(e) {
	return ( e.apply_to_fld == vWork.ar.aprmCheckProcs[e.apply_to_type]() );
}


function aprmBldChkProcArrays() {
	if (typeof(vWork.ar.aprmCheckProcs)=="undefined"){
		vWork.ar.aprmCheckProcs = [
			function () {return vDynm.re.prod.prod_no;},
			function () {return zeroL(vDynm.re.prod.classific,10).substring(0,2);},
			function () {return zeroL(vDynm.re.prod.classific,10).substring(2,4);},
			function () {return zeroL(vDynm.re.prod.classific,10).substring(4,6);},
			function () {return zeroL(vDynm.re.prod.classific,10).substring(6,8);},
			function () {return zeroL(vDynm.re.prod.classific,10).substring(8,10);},
			function () {return zeroL(vDynm.re.prod.classific,10).substring(0,4);},
			function () {return zeroL(vDynm.re.prod.classific,10).substring(4,8);},
			function () {return vDynm.re.prod.prod_grp;}
		]
	}
}



	function aprmCalcDiscSubPrice() {
		var new_net = vDynm.re.tapr.disc_fld * vDynm.re.tcdt.sell_qty / 100;
		var ext_disc = vDynm.re.tcdt.net_ext - new_net;
		return ext_disc;
	}
	function aprmCalcDiscCentsOff() {
		var ext_disc = vDynm.re.tcdt.sell_qty * vDynm.re.tapr.disc_fld / 100;
		return ext_disc;
	}
	function aprmCalcDiscPcntOff() {
		var ext_disc = Math.round(vDynm.re.tcdt.net_ext * vDynm.re.tapr.disc_fld / 100) / 100;
		return ext_disc;
	}
	function aprmCalcDiscXtraGoods() {
		var ext_disc = 0;
		return ext_disc;
	}
	function aprmCalcDiscBestPrice() {
		if (vDynm.re.tepr.disc_fld < vDynm.re.tcdt.gross_price) {
			var new_net = vDynm.re.tapr.disc_fld * vDynm.re.tcdt.sell_qty / 100;
			var ext_disc = vDynm.re.tcdt.net_ext - new_net;
		} else {
			var ext_disc = 0;
		}
		return ext_disc;
	}
	function aprmCalcDiscCentsOn() {
		var ext_disc = vDynm.re.tcdt.sell_qty * vDynm.re.tapr.disc_fld / 100;
		return ext_disc;
	}
	function aprmCalcDiscPcntOn() {
		var ext_disc = Math.round(vDynm.re.tcdt.net_ext * vDynm.re.tapr.disc_fld / 100) / 100;
		return ext_disc;
	}
	function aprmCalcDiscFreeGoods() {
		var ext_disc = 0;
		return ext_disc;
	}

	function aprmChkLayerOkay(e) {
		return ( e.min_layer <= vDynm.re.tcdt.sell_qty );
	}

	function aprmBldCalcProcArrays() {
		if (typeof(vWork.ar.aprmApplyProcs)=="undefined"){
			vWork.ar.aprmApplyProcs = [
				function () {console.log('disc_type: 0')},
				function () {return aprmCalcDiscSubPrice()},
				function () {return aprmCalcDiscCentsOff()},
				function () {return aprmCalcDiscPcntOff()},
				function () {return aprmCalcDiscXtraGoods()},
				function () {return aprmCalcDiscBestPrice()},
				function () {return aprmCalcDiscCentsOn()},
				function () {return aprmCalcDiscPcntOn()},
				function () {return aprmCalcDiscFreeGoods()}
			]
		}
	}


function aprmBldProdTaprAry() {
	aprmBldChkProcArrays();
	aprmBldCalcProcArrays();
	vDynm.ar.tapr = [];
	vDynm.re.tapr = new taprZeroObj();
	vStat.al.tacp.map(function (e) {
		if (aprmChkPromoApplies(e)) {
			vDynm.re.tapr = new taprObj(e);
			if (aprmChkLayerOkay(e)) {
				vDynm.re.tapr.ext_disc 		= vWork.ar.aprmApplyProcs[e.disc_type]();
				vDynm.re.tapr.disc_amt		= (vDynm.re.tapr.ext_disc / vDynm.re.tcdt.sell_qty).toFixed(2)
				vDynm.re.tapr.passMinLyr 	= true;
				vDynm.re.tapr.prmoLineColor = 'greenyellow';
			}
			vDynm.ar.tapr.push(vDynm.re.tapr);
		}
	});
}
