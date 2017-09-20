

//	vCnst Global Object for Constants (defined here, not altered, idb'd once)
if (typeof(vCnst)=="undefined") {
	vCnst = new Object({
	vStorIdx: 'vCnst',
//	Constant Arrays
	ar: {
		balnSelDspFns: 	["cust_no", "message", "last_invc", "total_due", "current", "over_30", "over_60", "over_90", "over_120"],
		balnSelDspIds: 	["i_cselCustNo", "i_cselMessage", "i_cselLastInvc", "i_cselTotalDue", "i_cselCurrent", "i_cselOver30", "i_cselOver60", "i_cselOver90", "i_cselOver120"],
		cstSelDspFns: 	["cust_no", "cust_name", "cust_addr1", "cust_addr2", "cust_city", "cust_state", "cust_zip", "cust_phone", "cust_phon2", "cust_cont", "cust_cont2", "bill_to", "bill_meth", "prce_zone", "tax_id"],
		cstSelDspIds: 	["i_cselCustNo", "i_cselCustName", "i_cselCustAddr1", "i_cselCustAddr2", "i_cselCustCity", "i_cselCustState", "i_cselCustZip", "i_cselCustPhone", "i_cselCustPhone2", "i_cselCustCont", "i_cselCustCont2", "i_cselBillTo", "i_cselBillMeth", "i_cselPrceZone", "i_cselTaxId"],
		cstSelDwCls: 	["NavButDrop cselButInColor1", "NavButDrop cselButInColor1", "NavButDrop cselButInColor1", "NavButDrop cselButInColor1", "NavButDrop cselButInColor1", "NavButDrop cselButInColor2","NavButDrop cselButInColor2"],
		cstSelWkCls: 	["NavButDrop cselButInColor2", "NavButDrop cselButInColor1", "NavButDrop cselButInColor1", "NavButDrop cselButInColor1", "NavButDrop cselButInColor1", "NavButDrop cselButInColor4"],
		cstSelWkTxt: 	["Every", "Week 1", "Week 2", "Week 3", "Week 4", "All"],
		prdSelInvCls: 	["csButIn csButInColor1", "csButIn csButInColor2", "csButIn csButInColor4"],
		prdSelInvTxt: 	["Truck", "Stock", "All"],
		prdSelLstCls: 	["csButIn csButInColor1", "csButIn csButInColor2", "csButIn csButInColor4"],
		prdSelLstTxt: 	["Norm", "Ever", "All"],
		prmoTypeTxt: 	["", "SubPrc:", "&cent; Off:", "% Off:", "Xtra:", "&cent; On:", "% On:", "Best:"],
		weekDayTxt: 	["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"],
		billMethStrs: 	["Cash", "Charge", "7-Day Charge", "National", "Prepaid", "Check", "Cash / Check", "Partial"],
		allowMethStrs: 	["Cash", "Charge", "7-Day Charge", "National", "Prepaid", "Check", "Full Service", "Partial"],
		creditMethStrs: 	["Cash", "Credit", "7-Day Credit", "National Credit", "Credit", "Credit", "Cash / Check", "Credit"],
		xactTypeStrs: 	["Sales","Orders","Misc","Samples","Allowance","Damaged Replace","Damaged Return","Good Return","Out Of Date Replace","Out Of Date Return"],
		rptSectStrs: 	["0","Sales","Credit","3","4","Replace","Order","ROA","8","9","Inventory","Listing","Maintenance","13","14","15","16","17","18","19","Negative Invt","Sales Summary","Product Move", "Document Reg", "Deposits", "Non Stop","Daily Recap"],
		voidTypeStrs: 	["","Changed","Void"],
		physInvtDepts:	[ 	{"cust_no":0,"dept_no":7,"dept_desc":"Truck","modified":"2016-10-12 07:12:52","ut_dnld":1476270772},
							{"cust_no":0,"dept_no":8,"dept_desc":"Warehouse","modified":"2016-10-12 07:12:52","ut_dnld":1476270772} ],
		invtRevwDepts:	[ 	{"cust_no":0,"dept_no":2,"dept_desc":"Sales","modified":"2016-10-12 07:12:52","ut_dnld":1476270772},
							{"cust_no":0,"dept_no":3,"dept_desc":"Good Return","modified":"2016-10-12 07:12:52","ut_dnld":1476270772},
							{"cust_no":0,"dept_no":4,"dept_desc":"Samples","modified":"2016-10-12 07:12:52","ut_dnld":1476270772},
							{"cust_no":0,"dept_no":5,"dept_desc":"Damaged","modified":"2016-10-12 07:12:52","ut_dnld":1476270772},
							{"cust_no":0,"dept_no":6,"dept_desc":"Out of Date","modified":"2016-10-12 07:12:52","ut_dnld":1476270772},
							{"cust_no":0,"dept_no":7,"dept_desc":"Truck","modified":"2016-10-12 07:12:52","ut_dnld":1476270772},
							{"cust_no":0,"dept_no":8,"dept_desc":"Warehouse","modified":"2016-10-12 07:12:52","ut_dnld":1476270772} ],

		tiOrder: [ {t:0,i:0}, {t:1,i:0}, {t:0,i:1}, {t:1,i:1}, {t:0,i:2}, {t:1,i:2}, {t:2,i:0}, {t:2,i:1}, {t:2,i:2} ],

		storeToStatAry: [
			{	db:'ctrl',	store:'sdat',	idx:''},
			{	db:'dnld',	store:'mesg',	idx:''},
			{	db:'ctrl',	store:'cdat',	idx:'trans_id'},
			{	db:'dnld',	store:'cust',	idx:'cust_no'},
			{	db:'dnld',	store:'eprm',	idx:'promo_no'},
			{	db:'dnld',	store:'expn',	idx:'expns_no'},
			{	db:'dnld',	store:'ilod',	idx:''},
			{	db:'dnld',	store:'intp',	idx:'invc_type'},
			{	db:'dnld',	store:'invt',	idx:'prod_no'},
			{	db:'dnld',	store:'octl',	idx:''},
			{	db:'dnld',	store:'pgrp',	idx:'prod_grp'},
			{	db:'dnld',	store:'plnk',	idx:''},
			{	db:'dnld',	store:'prmd',	idx:''},
			{	db:'dnld',	store:'prod',	idx:'prod_no'},
			{	db:'dnld',	store:'ptax',	idx:''},
			{	db:'dnld',	store:'qpmt',	idx:'id'},
			{	db:'dnld',	store:'rchd',	idx:''},
			{	db:'dnld',	store:'rlst',	idx:'route_id'},
			{	db:'dnld',	store:'sequ',	idx:''}
			],
		},

// Constant Elements
	el: {
		debugDispStatLine: false,
		pick2col: false,
		navBarHtml1: '<div class=NavButOut id=i_navBut#> ',
		navBarHtml2: '<input type=button onclick="boxChange(llpp)" ',
		navBarHtml3: 'value="newVal" class=NavButIn></div>',
		},


// Constant Objects
	ob: {
		},

	});
}


//	vDynm Global Object for Dynamics (Always changing, idb'd every activity)
if (typeof(vDynm)=="undefined")  {
	vDynm = new Object({

	vStorIdx: 'vDynm',
//	Arrays
	ar: {
		csel: [],
		ptax: [],
		stblAry: [],
		stluAry: [],
		tapr: [],
		tblFillAry: [],
		upld: [],
		dnld: [],
		},

// Record data
	re: {
		cust: {
			cust_no: 0,
			},
		dept: {
			dept_no: 0,
			dept_desc: 'CANDY',
			},
		hist: {
			cust_no: 0,
			},
		misc: {
			aCode: 140101,
			},
		prod: {
			prod_no: 0,
			},
		pgrp: {
			prod_grp: 0,
			},
		rlst: {
			route_id: 0,
			},
		},

// Elements
	el: {
		},

// Objects
	ob: {
		cdat: {
			maxProdType: 0,
			minProdType: 0,
			prodInvtType: 0,
			prodListType: 0,
			id: 0,
			},
		csrv: {
			custDowTxt:  "",
			custWeekTxt: "",
			custDowType:  0,
			custWeekType: 0,
			custSelIdx: 0,
//			currGpPgrpIdx: 0,		// Current Index into va.gp[?][?][here]
//			currGpProdIdx: 0,		// Current Index into va.gp[?][?][?].prods[here]
			alPgrpIdx: 0,		// Current Index into al.pgrp
			alProdIdx: 0,		// Current Index into al.prod
//			currTiIdx: 0,			// Current Index into ca.tiOrder - Type / Invt
			currDow: 0,
			},
		disp: {
			scale: 1,
			scrnLandW: 0,
			scrnLandH: 0,
			scrnPortW: 0,
			scrnPortH: 0,
			screenOrient: 'U',
			currLevelPrompt: 0,
			prevLevelPrompt: 0,
			},
		invc: {
			misc2: 0,
			},
		enod: {
			roa: {},
			},
		rout: {
			nextTkt: 0,
			},
		sequ: {
			ActDbFills: 0,
			jobNo: 0,
			sequNo: 0,
			},
		stod: {
			},
		tran: {
			bci:  "",				// bar code input string built from chars
			prodListType: 0,	// Index into va.gp[here]
			prodInvtType: 0,	// Index into va.gp[?][here]
			},
		},


// Subset Indexes
	si: {
		},

// Subsets
	ss: {
		},

// Working
	ws: {
		c1: {},
		c2: {},
		c3: {},
		},

	});
}


//	vStat Global Object for Statics (load and read-only, , idb'd when set)
if (typeof(vStat)=="undefined") {
	vStat = new Object({

	vStorIdx: 'vStat',
//	Arrays
	ar: {
		gp: [],
		sp: [],
		},

//	All data arrays
	al: {
		bld2: [],
		cdat: [],
		cust: [],
		dept: [],
		eprm: [],
		hist: [],
		ilod: [],
		invt: [],
		pgrp: [],
		plnk: [],
		plst: [],
		prde: [],
		prdo: [],
		prmd: [],
		prod: [],
		rdat: [],
		retl: [],
		rlst: [],
		sdat: [],
		sidx: [],
		tacp: [],
		tapr: [],
		tepr: [],
		},

//	Indexes into arrays
	ix: {
		bld2: [],
		prod: [],
		},

	ob: {
		},
	});
}


//	vWork Global Object for Working Use (Not idb'd)
if (typeof(vWork)=="undefined") {
	vWork = new Object({

	vStorIdx: 'vWork',
//	Arrays
	al: {
		tchd: [],
		tcdt: [],
		},

	ar: {
		jobProc: [],
		sequProc: [],
		},

//	Idb Dbf handles
	db: {
		},

//	Objects
	ob: {
		enod: {
			},
		prnt: {
			ctrl: {
				  },
			grp: {
				  },
			xact: {
				  },
			rpt: {
				  },
			},
		ip: {
			},
		roa: {
			tktSum: 0,
			chkSum: 0,
			},
		},

// Elements
	el: {
		sndDefault: new Audio("/V-Trax/audio/Default.wav"),
		},

	});
}
//
// Prototypes
//
Number.prototype.rnd = function(p) {
	var eX = Math.pow(10, p);
	var tV = this.valueOf();
	if (tV < 0) { 
		var nA = Math.abs(tV);
		return Math.round(nA*eX) / (eX) *-1;
	} else {
		return Math.round(tV*eX) / (eX);
	}
}
//
// Polyfills
//
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function (predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}