/*
  Copyright (c) 2016 Aziom, Inc. All rights reserved.
*/
//setJsSrcTs('cslp', <?php echo date("Y-m-d H:i:s") ?> );


function presetCselAry() {
	for (var week = 0; week < 5; week++) {
		vDynm.ar.csel[week] = [];
		for (var day = 0; day < 7; ++day) {
			vDynm.ar.csel[week][day] = [{cust_no: 0, cust_name: "None for week/day"}] ;
		}
	}
};


function csrpComplete() {
	setCurrDowAndTxt();
	vDynm.ob.csrv.custSelIdx = 0;
	vDynm.ob.csrv.custDowType = vDynm.ob.csrv.currDow;
	document.getElementById('i_cselCustDowBut').selectedIndex = vDynm.ob.csrv.custDowType;
	vDynm.ob.csrv.custWeekType = 0;
	vDynm.ob.csrv.custSelIdx = 0;
	vDynm.ob.csrv.copies = vDynm.re.cust.xtra_prnt + 2;
	boxChange(3020);
}


function addNamesToAry(week, dow, cust_ary) {
	for (var idx = 0; idx < vDynm.ar.csel[week][dow].length; ++idx) {
		for (var idx2 = 0; idx2 < cust_ary.length; ++idx2) {
			if (vDynm.ar.csel[week][dow][idx].cust_no == cust_ary[idx2].cust_no) {
				vDynm.ar.csel[week][dow][idx].cust_name = cust_ary[idx2].cust_name;
			}
		}
	}
}


function loadAllCusts() {
	promFetchRange(vWork.db.dnld.handle, 'cust', 00000000, 99999999).then(function (datAry) {
		if (datAry.length > 0) {
			for (var week = 0; week < 4; ++week) {
				for (var dow = 0; dow < 6; ++dow) {
					addNamesToAry(week, dow, datAry)
				}
			}
			addNamesToAry(5, 0, datAry)
		}
		csrpComplete();
    }).catch(function (error) {
      console.log(error);
    });
}


function custInAry(ary, custNo) {
	for (var idx = 0; idx < ary.length; ++idx) {
		if ( ary[idx].cust_no = custNo ) {
			return true
		} else {
			return false
		}
	}
}


function loadAllCstoForRoute()	{
	var lowerLimit = [vDynm.re.misc.userInfo.route_id, 0, 0, 0];
	var upperLimit = [vDynm.re.misc.userInfo.route_id, 0, 9, 99999999];

	vDynm.ar.csel[5] = [];
	vDynm.ar.csel[5][0] = [];
	vDynm.ar.allCust = [];
	promFetchRange(vWork.db.dnld.handle, 'csto', lowerLimit, upperLimit).then(function (datAry) {
		if (datAry.length > 0) {
			for (var idx = 0; idx < datAry.length; ++idx) {
				var week = datAry[idx].week;
				var dow = datAry[idx].dow;
				var cust_no = datAry[idx].cust_no;
				if (vDynm.ar.allCust.indexOf(cust_no) < 0) {
					vDynm.ar.csel[5][0].push({cust_no: cust_no, cust_name: "Fill"});
					vDynm.ar.allCust.push(cust_no);
				}
				if (vDynm.ar.csel[week][dow][0].cust_no != 0) {
					vDynm.ar.csel[week][dow].push({cust_no: cust_no, cust_name: "Fill"});
				} else {
					vDynm.ar.csel[week][dow][0] = {cust_no: cust_no, cust_name: "Fill"};
				}
			}
		}
		loadAllCusts();
    }).catch(function (error) {
      console.log(error);
    });
}


function bcInitCustSelect() {
	presetCselAry();
	loadAllCstoForRoute();
}


// Fetch single record into vDynm.re
function fetchRecIntoDynmRe(db, store, key) {
	promFetchRec(db, store, key).then(function (data) {
		vDynm.re[store] = data;
		nextSeq(); 
    }).catch(function (error) {
      console.log(error);
    });
}


// Fetch all records into array
function loadCsrvAry(handle, tbl, lowLimit, highLimit, minObj) {
	promFetchRange(handle, tbl, lowLimit, highLimit).then(function (datAry) {
		if (datAry.length > 0) {
			vStat.al[tbl] = datAry;
		} else {
			vStat.al[tbl] = [minObj];
		}
		nextSeq();
    }).catch(function (error) {
      console.log(error);
    });
}


function refPgrpDesc(chkPgrp) {
	for (var idx = 0; idx < vStat.al.pgrp.length; ++idx) {
		if (vStat.al.pgrp[idx].prod_grp == chkPgrp) {
			return vStat.al.pgrp[idx].prod_desc;
		}
	}
}


function refProdDesc(chkProd) {
	for (var idx = 0; idx < vStat.al.prod.length; ++idx) {
		if (vStat.al.prod[idx].prod_no == chkProd) {
			return vStat.al.prod[idx].prod_desc;
		}
	}
}


function chkCsrvInvtProd(destAry, chkAry, chkProd) {
	for (var idx = 0; idx < chkAry.length; ++idx) {
		if (chkAry[idx].prod_no == chkProd) {
			var chkPgrp = chkAry[idx].prod_grp;
			if (typeof(chkAry[idx].prod_desc) == 'undefined') {
				var prodDesc = refProdDesc(chkProd);
			} else {
				var prodDesc = chkAry[idx].prod_desc;
			}
			for (var idx2 = 0; idx2 < destAry.length; ++idx2) {
				if (destAry[idx2].prod_grp == chkPgrp) {
					destAry[idx2].prods.push({prod_no: chkProd, prod_desc: prodDesc });
					break;
				} 
			}
			if (idx2 == destAry.length) {
				var pgrpDesc = refPgrpDesc(chkPgrp)
				destAry.push( {prod_grp: chkPgrp, pgrp_desc: pgrpDesc, prods: [{prod_no: chkProd , prod_desc: prodDesc }]} );
			}
			break;
		}
	}
}


function addAllTblToGp(destAry, srcAry) {
	for (var idx = 0; idx < srcAry.length; ++idx) {
		var newPgrp = srcAry[idx].prod_grp;
		if (typeof(srcAry[idx].prod_desc) == 'undefined') {
			var prodDesc = refProdDesc(srcAry[idx].prod_no);
		} else {
			var prodDesc = srcAry[idx].prod_desc;
		}
		for (var idx2 = 0; idx2 < destAry.length; ++idx2) {
			if (destAry[idx2].prod_grp == srcAry[idx].prod_grp) {
				destAry[idx2].prods.push({prod_no: srcAry[idx].prod_no, prod_desc: prodDesc });
				break;
			} 
		}
		if (idx2 == destAry.length) {
			var pgrpDesc = refPgrpDesc(newPgrp)
			destAry.push( {prod_grp: newPgrp, pgrp_desc: pgrpDesc, prods: [{prod_no: srcAry[idx].prod_no , prod_desc: prodDesc }]} );
		}
	}
}


// Sort by Desc
function resortByPgrpProd() {
}


/* 
Build arrays used during prod selection
Type:	0:Normal, 1:Ever , 2:All
Invt:	0:Truck, 1:Truck & Whse, 2:All
Prod:
*/
function buildProdDispSelArys() {
//	vStat.ar.gp[0]=[[],[],[]];
	vStat.ar.gp[1]=[[],[],[]];
	vStat.ar.gp[2]=[[],[],[]];

	for (var idx = 0; idx < vStat.al.invt.length; ++idx) {
		if (vStat.al.invt[idx].qty_7 > 0) {
			var chkProd = vStat.al.invt[idx].prod_no;
//			chkCsrvInvtProd(vStat.ar.gp[0][0], vDynm.ar.prdo, chkProd);			//
			chkCsrvInvtProd(vStat.ar.gp[1][0], vStat.al.prde, chkProd);
			chkCsrvInvtProd(vStat.ar.gp[2][0], vStat.al.prod, chkProd);
			if (vStat.al.invt[idx].qty_7 + vStat.al.invt[idx].qty_8> 0) {
//				chkCsrvInvtProd(vStat.ar.gp[0][1], vDynm.ar.prdo, chkProd);		//
				chkCsrvInvtProd(vStat.ar.gp[1][1], vStat.al.prde, chkProd);
				chkCsrvInvtProd(vStat.ar.gp[2][1], vStat.al.prod, chkProd);
			}
		}
	}

// Fill Arrays that do not need compares
//	addAllTblToGp(vStat.ar.gp[0][2], vDynm.ar.prdo);		// 
	addAllTblToGp(vStat.ar.gp[1][2], vStat.al.prde);
	addAllTblToGp(vStat.ar.gp[2][2], vStat.al.prod);
	
//Duplicate array prior to destructive sort
	vStat.ar.sp = JSON.parse( JSON.stringify(vStat.ar.gp));

// Sort by Prod Group Desc
	for (var idx1 = 1; idx1 < 3; ++idx1) {
		for (var idx2 = 0; idx2 < 3; ++idx2) {
			var sAry = vStat.ar.sp[idx1][idx2];
			sAry.sort(dynSort("pgrp_desc"))
			for (var idx3 = 0; idx3 < sAry.length; ++idx3) {
				var pAry = sAry[idx3].prods;
				pAry.sort(dynSort("prod_desc"))				
			}
		}
	}
	updatePrdoDispSelArys();
	nextSeq();
}


function updatePrdoDispSelArys() {
	vDynm.ar.prdo = vStat.al.prdo.filter(function (o) { return o.dept_no == vDynm.re.dept.dept_no && o.trans_id == 1 });
	vStat.ix.prdo = vStat.al.prdo.map(function (o) {return o.prod_no})
	
	vStat.ar.gp[0]=[[],[],[]];

	for (var idx = 0; idx < vStat.al.invt.length; ++idx) {
		if (vStat.al.invt[idx].qty_7 > 0) {
			var chkProd = vStat.al.invt[idx].prod_no;
			chkCsrvInvtProd(vStat.ar.gp[0][0], vDynm.ar.prdo, chkProd);			//
			if (vStat.al.invt[idx].qty_7 + vStat.al.invt[idx].qty_8> 0) {
				chkCsrvInvtProd(vStat.ar.gp[0][1], vDynm.ar.prdo, chkProd);		//
			}
		}
	}

// Fill Arrays that do not need compares
	addAllTblToGp(vStat.ar.gp[0][2], vDynm.ar.prdo);		// 
	
//Duplicate array prior to destructive sort
	vStat.ar.sp[0] = JSON.parse( JSON.stringify(vStat.ar.gp[0]));

// Sort by Prod Group Desc
	var idx1 = 0;
	for (var idx2 = 0; idx2 < 3; ++idx2) {
		var sAry = vStat.ar.sp[idx1][idx2];
		sAry.sort(dynSort("pgrp_desc"))
		for (var idx3 = 0; idx3 < sAry.length; ++idx3) {
			var pAry = sAry[idx3].prods;
			pAry.sort(dynSort("prod_desc"))				
		}
	}
}


function initDeptData() {
	// Needs to use default DeptNo for cust once route altered data for custs has been archived and restored to/from AWS
	relateDeptAry(vStat.al.dept[0].dept_no);
	nextSeq();
}


function cslpBldUnpd() {
	vDynm.ar.unpd = [];
	vDynm.ar.pymt = [];
	vWork.ob.roa = {tktSum:0, chkSum:0};
	vStat.al.uchg.map(function (e) {
		if (e.tkt_status == 'O') {
			vDynm.ar.unpd.push(new unpdObj(e, 'U'));
		}
	});
	nextSeq();
}


function cslpBldPtax() {
	var fld = '';
	vDynm.ar.ptax = [];
	vStat.al.ptax.map( function (e) {
		for(i=1; i<8; i++) {
			fld = "tax_key_" + i
			if (vDynm.re.cust[fld] == e.key_cust) {
				vDynm.ar.ptax.push(e);
			}
		}
	});
	nextSeq();
}


// Initialize Misc items for Customer Service
function miscInitCslp() {
	vDynm.ob.csrv.payMeth = vDynm.re.cust.bill_meth;
	vDynm.ob.csrv.startDateTime = new Date();
	vDynm.ob.csrv.startDateTimeStr = vDynm.ob.csrv.startDateTime.toLocaleString('en-US');
	vStat.ix.prde = vStat.al.prde.map(function (o) {return o.prod_no});
	vWork.ar.accum = [];
	vWork.ar.pickVal = [];
	vWork.ob.prnt.pick = '';
	nextSeq();
}

// Procs complete. Archive arrays and call Customer Service Main Menu
function cleanupCsrvInit() {

//	putVGlobal2Idb(vStat);
	boxChange(3100);
}


//
function bcInitCsrvPreLoad() {

// Initialize
	vWork.ar.sequProc.length = 0;
	vDynm.ob.sequ.sequNo = -1;
	
// Load prde into ary
	vWork.ar.sequProc.push(function () { loadCsrvAry(vWork.db.dnld.handle, 'prde', [0,vDynm.re.cust.cust_no,0], [0,vDynm.re.cust.cust_no,99999999], new prdeObj(0,vDynm.re.cust.cust_no,0,0)) } );

// Load prdo into ary
	vWork.ar.sequProc.push(function () { loadCsrvAry(vWork.db.dnld.handle, 'prdo', [0,vDynm.re.cust.cust_no,0], [0,vDynm.re.cust.cust_no,99], new prdoObj(0,vDynm.re.cust.cust_no,0,0,0,0)) } );

// Load hist into ary
	vWork.ar.sequProc.push(function () { loadCsrvAry(vWork.db.dnld.handle, 'hist', [vDynm.re.cust.cust_no,0], [vDynm.re.cust.cust_no,99], new histObj(vDynm.re.cust.cust_no,0,0,0,0,0,0,0,0)) } );
	
// Load plst into ary
	vWork.ar.sequProc.push(function () { loadCsrvAry(vWork.db.dnld.handle, 'plst', [vDynm.re.cust.prce_zone,0], [vDynm.re.cust.prce_zone,99999999], new plstObj(vDynm.re.cust.prce_zone,0,0)) } );
	
// Load retl into ary
	vWork.ar.sequProc.push(function () { loadCsrvAry(vWork.db.dnld.handle, 'retl', [vDynm.re.cust.cust_no,0], [vDynm.re.cust.cust_no,99999999], new retlObj(vDynm.re.cust.cust_no,0,0,0)) } );
	
// Load dept into ary
	vWork.ar.sequProc.push(function () { loadCsrvAry(vWork.db.dnld.handle, 'dept', [vDynm.re.cust.cust_no,0], [vDynm.re.cust.cust_no,99], new deptObj(vDynm.re.cust.cust_no,0,"")) } );
	
// Load uchg into ary
	vWork.ar.sequProc.push(function () { loadCsrvAry(vWork.db.dnld.handle, 'uchg', [vDynm.re.cust.cust_no,0], [vDynm.re.cust.cust_no,99999999], new uchgObj(0,0,"")) } );
	
// Load rhdr into ary
	vWork.ar.sequProc.push(function () { fetchRecIntoDynmRe(vWork.db.dnld.handle, 'rhdr', vDynm.re.misc.userInfo.route_id); } );
	
// Init Dept data
	vWork.ar.sequProc.push(function () { initDeptData() } );
	
// Build Prod display / select arrays
	vWork.ar.sequProc.push(function () { buildProdDispSelArys() } );
	
// Create TEPR - Merge of Plnk, Eprm & Prmd
	vWork.ar.sequProc.push(function () { epctBuildTepr(nextSeq) } );
	
// Build vDynm.ar.unpd of unpaid tickets either UCHG or CTRN
	vWork.ar.sequProc.push(function () { cslpBldUnpd() } );
	
// Build vDynm.ar.ptax of any PTAX records that apply to this cust
	vWork.ar.sequProc.push(function () { cslpBldPtax() } );
	
// Initialize Misc items for Customer Service
	vWork.ar.sequProc.push(function () { miscInitCslp() } );
	
// Archive arrays and call Customer Service Main Menu
	vWork.ar.sequProc.push(function () { cleanupCsrvInit() } );
	
// Run Sequence	
	nextSeq();
}


