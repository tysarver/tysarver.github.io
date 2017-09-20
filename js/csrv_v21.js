/*
  Copyright (c) 2016 Aziom, Inc. All rights reserved.
*/


//	***
//	*** 	External Calls from Menu	***
//	***

function bcInitCsrvSales() {
	tranInitXact(1);
}


function bcInitCsrvOrders() {
	tranInitXact(2);
}


function bcInitCsrvMisc() {
	tranInitXact(3);
}


function bcInitCsrvSamples() {
	tranInitXact(4);
}

function bcInitCsrvAllowance () {
	tranInitXact(12);

}

function bcInitCsrvDamagedReplace () {
	tranInitXact(26);

}

function bcInitCsrvDamagedReturn () {
	tranInitXact(13);

}

function bcInitCsrvGoodReturn () {
	tranInitXact(10);

}

function bcInitCsrvOutOfDateReplace () {
	tranInitXact(28);

}

function bcInitCsrvOutOfDateReturn () {
	tranInitXact(11);

}


//	Change to pay method during All Ok
function csrvPayMethChange() {
	var selectNo = document.getElementById('i_csdnPayMethSel');
	var newPayMeth = selectNo.value*1;
	var numReprints = 0;
	vDynm.ob.csrv.payMeth = newPayMeth;
	vWork.al.tchd.map(function (e) {
		if (e.rpt_sect <= 5 && e.pay_method != vDynm.ob.csrv.payMeth) {
			numReprints++;
		}
	});
	if (numReprints > 0) {
		tranHtml2DomId("i_csdn_meth_alert", "Method Changed. Reprint Required");
		tranVal2DomId("i_csdn_big_button", "Reprint");
	} else {
		tranHtml2DomId("i_csdn_meth_alert", "&nbsp;");
		tranVal2DomId("i_csdn_big_button", "All OK");
	}
}

function allOkReply() {
	if (vDynm.ob.csrv.printedMeth == vDynm.ob.csrv.payMeth) {
		boxChange(4980);
	} else {
		boxChange(4900);
	}
}


function bcInitCsrvMenu() {
	if (vStat.al.dept.length == 1) {
		if (typeof(vDynm.re.dept.dept_desc) == 'undefined') {
			i_SectSubHdr.innerHTML=vDynm.re.cust.cust_name;
		} else {
			i_SectSubHdr.innerHTML='<div class="csCustName">' + vDynm.re.cust.cust_name + '</div><div class="csDeptSel" id="i_csDeptNo">' + vDynm.re.dept.dept_desc + '</div>';
		}
	} else {
		i_SectSubHdr.innerHTML='<div class="csCustName">' + vDynm.re.cust.cust_name + '</div><div class="csDeptSel" id="i_csDeptNo"><select class="csDeptNoSel" id="i_csDeptNoSel" onchange="tranChgDeptNo()"></select></div>';
		tranBldDeptNameSelect();
	}
}


//
//	*** 	Not used - Reference	***
//


function csrvGeoLocGood(position) {
	vDynm.ob.csrv.CurrGeoLon = position.coords.longitude;
	vDynm.ob.csrv.CurrGeoLat = position.coords.latitude
}


function csrvGeoLocFail() {
	vDynm.ob.csrv.CurrGeoLon = 0;
	vDynm.ob.csrv.CurrGeoLat = 0;
}


function csrvMyNavFunc(){
    // If it's an iPhone..
    if( (navigator.platform.indexOf("iPhone") != -1)
        || (navigator.platform.indexOf("iPod") != -1)
        || (navigator.platform.indexOf("iPad") != -1))
         window.open("maps://maps.google.com/maps?daddr=lat,long&amp;ll=");
    else
         window.open("http://maps.google.com/maps?daddr=lat,long&amp;ll=");
}


function csrvInitGeolocation() {
   if( navigator.geolocation )
   {
      navigator.geolocation.getCurrentPosition( csrvGeoLocGood, csrvGeoLocFail );
   }
   else
   {
     csrvGeoLocFail();
   }
}
