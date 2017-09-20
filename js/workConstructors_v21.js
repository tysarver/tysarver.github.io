/*
  Copyright (c) Aziom, Inc 2016. All rights reserved.
*/
function unpdObj(e, src) {
	this.tkt_no = e.tkt_no;
	this.dept_no = e.dept_no;
	this.rpt_sect = e.rpt_sect;
	this.tkt_amt = e.tkt_amt;
	this.part_amt = e.part_amt;
	this.srvc_date = e.srvc_date;
	this.source = src;
	this.selected = false;

	var cP = vStat.al.dept.findIndex(function (d) { if (d.dept_no == e.dept_no) {return true}; });
	if (cP < 0) {
		this.dept_desc = "Unknown";
	} else {
		this.dept_desc = vStat.al.dept[cP].dept_desc;
	}
}

function unpdBldObj(tktNo, deptNo, deptDesc, rptNo, tktAmt) {
	if (rptNo == 2) tktAmt = tktAmt * -1;

	this.tkt_no = tktNo * 1;
	this.dept_no = deptNo * 1;
	this.dept_desc = deptDesc;
	this.rpt_sect = rptNo * 1;
	this.tkt_amt = tktAmt * 1;
	this.part_amt = 0;
	this.source = "K";
	this.selected = true;
}


function pymtBldObj(chkNo, chkAmt) {
	this.chk_no = chkNo * 1;
	this.chk_amt = chkAmt * 1;
}


function tchdObj(tkt_no, dept_no, dept_desc, rpt_sect, rpt_desc) {
	this.tkt_no = tkt_no;
	this.dept_no = dept_no;
	this.dept_desc = dept_desc;
	this.rpt_sect = rpt_sect;
	this.rpt_desc = rpt_desc;

	this.changed = false;
	this.checked = false;
	this.docId = 'i_rpt_sel' + dept_no + '_' + rpt_sect;
	this.off_inv = 0;
	this.printed = 0;
	this.tkt_input = 0;
	this.tkt_type = 0;
	this.void_flag = 0;

	this.tot_deposit = 0;
	this.tot_disc = 0;
	this.tot_in = 0;
	this.tot_invc = 0;
	this.tot_out = 0;
	this.taxAmt = 0;

	this.odometer = 0;
	this.natl_tktno = 0;
	this.price_date = 0;
	this.order_date = 0;
	
	this.cdat = vDynm.re.cdat;
}

function tcdtObj(dept_no, prod_grp, prod_no) {
	this.dept_no = dept_no;
	this.trans_id = vDynm.re.cdat.trans_id;
	this.prod_no = prod_no;
	this.prod_desc = vDynm.re.prod.prod_desc;
	this.prod_grp = vDynm.re.prod.prod_grp;
	this.pgrp_desc = vDynm.re.pgrp.prod_desc;
	this.rpt_sect = vDynm.re.cdat.rpt_sect;
	this.upload_id = vDynm.re.cdat.upload_id;
	this.tkt_no = -1;
	this.sequ_no = 0;
	this.status = 0;
	this.srv_ctrl = 0;
	this.debit_credit = 0;
	this.sub_prod = 0;
	this.case_qty = vDynm.re.prod.case_qty;
	this.prmo_supress = 0;
	this.save_ctrl = 0;
	this.sell_qty = 0;
	this.phy_qty1 = 0;
	this.phy_qty2 = 0;
	this.prc_qty = 0;
	this.lvl_qty = 0;
	this.rtn_qty = 0;
	this.oh_qty = 0;
	this.oh_qty1 = 0;
	this.oh_qty2 = 0;
	this.base_price = 0;	// Prod Sell Price #1
	this.list_price = 0;	// Price List
	this.gross_price = 0;	// Base or Price List or Entered Value
	this.net_price = 0;		// Gross less promotions
	this.rtl_price = 0;
	this.disc_amt = 0;		// Disc per item
	this.disc_ext = 0;		// Disc * qty
	this.free_goods = 0;
	this.net_ext = 0;		// Net Price - Disc Amt * Qty
	this.roa_amt = 0;
	this.dposit_amt = 0;
	this.alt_date = 0;
	this.modified = 0;
	this.ut_mod = Math.floor(Date.now());
	this.ut_upld = 0;
}

function tcsRoaObj(roa_id, check_no, pay_type) {
	this.roa_id = roa_id;
	this.check_no = check_no;
	this.pay_type = pay_type;
	this.modified = 0;
	this.ut_mod = Math.floor(Date.now());
	this.ut_upld = 0;
}

function tcdt2ctdt(tcdtObj) {
	this.tkt_no = tcdtObj.tkt_no;
	this.prod_no = tcdtObj.prod_no;
	this.gross_prce = tcdtObj.gross_price;
	this.sell_qty = tcdtObj.sell_qty;
	this.phy_qty1 = tcdtObj.phy_qty1;
	this.phy_qty2 = tcdtObj.phy_qty2;
	this.oh_qty = tcdtObj.oh_qty;
	this.oh_qty1 = tcdtObj.oh_qty1;
	this.oh_qty2 = tcdtObj.oh_qty2;
//	this.trans_id = tcdtObj.trans_id;
	this.trans_id = tcdtObj.upload_id;
	this.disc_amt = tcdtObj.disc_amt;
	this.disc_ext = tcdtObj.disc_ext;
	this.ent_time = tcdtObj.ut_mod / 1000;
	this.ent_order = 0 ;
	this.ut_mod = tcdtObj.ut_mod;
	this.ut_upld = 0;
}

function tcdt2ctrp(tcdtObj) {
	this.tkt_no = tcdtObj.tkt_no;
	this.chk_no = tcdtObj.prod_no;
	this.chk_amt = tcdtObj.gross_price.rnd(2);
//	this.ent_time = tcdtObj.ut_mod / 1000;
//	this.ent_order = 0 ;
	this.ut_mod = tcdtObj.ut_mod;
	this.ut_upld = 0;
}

function tcdt2ctrt(tcdtObj) {
	this.tkt_no = tcdtObj.tkt_no;
	this.rt_tkt_no = tcdtObj.prod_no;
	this.rt_tkt_amt = tcdtObj.gross_price.rnd(2);
//	this.ent_time = tcdtObj.ut_mod / 1000;
//	this.ent_order = 0 ;
	this.ut_mod = tcdtObj.ut_mod;
	this.ut_upld = 0;
}

function tchd2ctrn(tchdObj, vF) {
	var nowDate = new Date();
	this.tkt_no = tchdObj.tkt_no;
	this.cust_no = vDynm.re.cust.cust_no;
	this.dept_no = tchdObj.dept_no;
	this.comm_tcust = 0;
	this.route_id = vDynm.re.rhdr.route_id;
	this.void_flag = vF;
	this.pay_method = tchdObj.pay_method;
//	this.total_invc = vDynm.ob.csrv.accum.total_invc;
	this.total_invc = tchdObj.tot_invc.rnd(2);
	this.total_disc = (tchdObj.disc||0).rnd(2);
	this.srvc_date = vDynm.ob.csrv.startDateTime.toISOString().slice(0,10).replace(/-/g,"") * 1;
	this.start_time = (vDynm.ob.csrv.startDateTime.getHours() + "" + vDynm.ob.csrv.startDateTime.getMinutes()) * 1;
	this.odometer = tchdObj.odometer;
	this.stop_time = (nowDate.getHours() + "" + nowDate.getMinutes()) * 1;
	this.tkt_type = tchdObj.rpt_sect;
	this.total_tax = tchdObj.taxAmt.rnd(2);
	this.natl_tktno = tchdObj.natl_tktno;
	this.price_date = tchdObj.price_date;
	this.order_date = tchdObj.order_date;
	this.posted = 0;
	this.ut_mod = Math.floor(Date.now());
	this.ut_upld = 0;
}

function tcdt2itdt(tcdtObj) {
	this.tkt_no = tcdtObj.tkt_no;
	this.prod_no = tcdtObj.prod_no;
	this.dtl_qty1 = tcdtObj.sell_qty;
	this.dtl_qty2 = 0;
	this.dtl_misc = 0;
	this.ut_mod = tcdtObj.ut_mod;
	this.ut_upld = 0;
}

function tchd2itrn(tchdObj, vF) {
	var nowDate = new Date();
	this.tkt_no = tchdObj.tkt_no;
//	this.inv_trnsid = vWork.al.tcdt[0].trans_id;
	this.inv_trnsid = tchdObj.cdat.upload_id;
	this.route_id = vDynm.re.rhdr.route_id;
	this.void_flag = vF;
	this.srvc_date = vDynm.ob.csrv.startDateTime.toISOString().slice(0,10).replace(/-/g,"") * 1;
	this.start_time = (vDynm.ob.csrv.startDateTime.getHours() + "" + vDynm.ob.csrv.startDateTime.getMinutes()) * 1;
	this.stop_time = (nowDate.getHours() + "" + nowDate.getMinutes()) * 1;
	this.hdr_misc1 = 0;
	this.hdr_misc2 = vDynm.ob.invc.misc2;
	this.hdr_misc3 = 0;
	this.hdr_misc4 = 0;
	this.posted = 0;
	this.ut_mod = Math.floor(Date.now());
	this.ut_upld = 0;
}

function tcdt2unpd(tcdtObj) {
	this.tkt_no 	= tcdtObj.prod_no;
	this.tkt_amt 	= tcdtObj.gross_price;

	this.dept_no 	= tcdtObj.sub_prod;
	this.dept_desc 	= tcdtObj.pgrp_desc;
	this.rpt_sect 	= tcdtObj.debit_credit;
	this.part_amt	= tcdtObj.disc_amt;
	this.source 	= tcdtObj.status;
	this.selected 	= tcdtObj.srv_ctrl;
	this.srvc_date 	= tcdtObj.alt_date;
}


function tcdt2pymt(tcdtObj) {
	this.chk_no 	= tcdtObj.prod_no;
	this.chk_amt 	= tcdtObj.gross_price;
}


function unpd2tcdt(unpdObj) {
	tcdtObj.apply(this);

	this.dept_no 		= 0;
	this.trans_id 		= 88;

	if (unpdObj.selected) {
		this.sell_qty 	= 1;
		this.net_price	= unpdObj.tkt_amt;
		this.net_ext	= unpdObj.tkt_amt;

	} else {
		this.sell_qty 	= 0;
		this.net_price	= 0;
		this.net_ext	= 0;
	}

	if (unpdObj.srvc_date > 0) {
		this.alt_date		= (unpdObj.srvc_date + "").replace(/(\d{2})(\d{2})(\d{2})/g, '$2/$3/$1');
	} else {
		this.alt_date		= "";
	}


	this.prod_no		= unpdObj.tkt_no;
	this.prod_grp 		= 0;		// Reqd for print_order key
	this.gross_price	= unpdObj.tkt_amt;

	this.sub_prod		= unpdObj.dept_no;
	this.debit_credit	= unpdObj.rpt_sect;
	this.disc_amt		= unpdObj.part_amt;
	this.status			= unpdObj.source;
	this.srv_ctrl		= unpdObj.selected;
	this.prod_desc		= vCnst.ar.rptSectStrs[unpdObj.rpt_sect];
	this.pgrp_desc		= unpdObj.dept_desc;
}


function pymt2tcdt(pymtObj) {
	tcdtObj.apply(this);

	this.dept_no 		= 0;
	this.trans_id 		= 89;
	this.sell_qty 		= 1;

	this.prod_no 		= pymtObj.chk_no;
	this.prod_grp 		= 0;		// Reqd for print_order key
	if (pymtObj.chk_no > 0) {
		this.prod_desc	= pymtObj.chk_no + "";
	} else {
		this.prod_desc	= "Cash";
	}
	this.gross_price	= pymtObj.chk_amt;
	this.net_price		= pymtObj.chk_amt;
	this.net_ext		= pymtObj.chk_amt;
}


function tapr2ctps(taprObj) {
	this.tkt_no = taprObj.tkt_no;
	this.trans_id = taprObj.trans_id;
	this.prod_no = taprObj.prod_no;
	this.promo_no = taprObj.promo_no;
	this.dtl_sequ = taprObj.sequ_no;
	this.disc_chg = 0;
	this.disc_fld = taprObj.disc_fld;
	this.disc_type = taprObj.disc_type;
}


function csssObj(scrnIdx_c, csContent, ut_dnld) {
	this.scrnIdx_c = scrnIdx_c ;
	this.csContent = csContent ;
	this.ut_dnld = ut_dnld ;
	this.modified = 0;this.ut_mod = Math.floor(Date.now());
}


function rdatObj(scrLine, scrDesc, scrContent) {
	this.scrLine = scrLine ;
	this.scrDesc = scrDesc ;
	this.scrContent = scrContent ;
	this.modified = 0;this.ut_mod = Math.floor(Date.now());
}


function taprZeroObj(teprObj) {

// Key
	this.dept_no		= vDynm.re.tcdt.dept_no;
	this.trans_id		= vDynm.re.tcdt.trans_id;
	this.prod_no		= vDynm.re.tcdt.prod_no;
	this.sequ_no		= 0;
	this.promo_no		= 0;
	this.level			= 0;

// From TEPR
	this.branch_type	= 0;
	this.next_level		= 0;
	this.next_no		= 0;
	this.pre_sold		= 0;

// Display Requires
	this.promoNoTxt		= "";
	this.discTypeTxt	= "";
	this.discFldTxt		= "";
	this.min_layerTxt	= "";
	this.prmoLineColor	= 'grey';
	this.passMinLyr		= false;

// Print Requires
	this.promo_supress	= 0;
	this.disc_amt		= 0;
	this.ext_disc		= 0;
	this.descriptn 		= "";

// CTPS requires
	this.tkt_no			= -1
	this.disc_chg		= 0;
	this.disc_fld		= 0;
	this.disc_type		= 0;
}


function taprObj(teprObj) {

// Key
	this.dept_no		= vDynm.re.tcdt.dept_no;
	this.trans_id		= vDynm.re.tcdt.trans_id;
	this.prod_no		= vDynm.re.tcdt.prod_no;
	this.sequ_no		= teprObj.sequ_no;
	this.promo_no		= teprObj.promo_no;
	this.level			= teprObj.level;

// From TEPR
	this.branch_type	= teprObj.branch_type;
	this.next_level		= teprObj.next_level;
	this.next_no		= teprObj.next_no;
	this.pre_sold		= 0;

// Display Requires
	this.promoNoTxt		= zeroL(teprObj.promo_no,4);
	this.discTypeTxt	= vCnst.ar.prmoTypeTxt[teprObj.disc_type];
	this.discFldTxt		= (teprObj.disc_fld / 100).toFixed(2);
	this.min_layerTxt	= 'Min:' + teprObj.min_layer;
	this.prmoLineColor	= 'grey';
	this.passMinLyr		= false;

// Print Requires
	this.promo_supress	= teprObj.promo_supress;
	this.disc_amt		= 0;
	this.ext_disc		= 0;
	this.descriptn 		= teprObj.descriptn ;

// CTPS requires
	this.tkt_no			= -1
	this.disc_chg		= 0;
	this.disc_fld		= teprObj.disc_fld;
	this.disc_type		= teprObj.disc_type;
}


//
// Receives current EPRM, PLNK, & PRMD to merge into a TEPR record
//
function teprObj(tEp, tPl, tPd) {

// EPRM
	this.sequ_no = tEp.sequ_no ;
	this.next_no = tEp.next_no ;
	this.optionx = tEp.optionx ;
	this.descriptn = tEp.descriptn ;
	this.changeable = tEp.changeable ;
	this.option = tEp.option ;

// PLNK
	this.promo_no = tPl.promo_no ;
	this.cust_no = tPl.cust_no ;
	this.start_date = tPl.start_date ;
	this.stop_date = tPl.stop_date ;
	this.conct_type = tPl.conct_type ;

// PRMD
	this.level = tPd.level ;
	this.min_layer = tPd.min_layer ;
//	this.apply_to = tPd.apply_to ;
	this.apply_to_type = tPd.apply_to_type ;
	this.apply_to_fld = tPd.apply_to_fld ;
	this.apply_to_excp = tPd.apply_to_excp ;
//	this.based_on = tPd.based_on ;
	this.based_on_type = tPd.based_on_type ;
	this.based_on_fld = tPd.based_on_fld ;
	this.based_on_excp = tPd.based_on_excp ;
	this.layer_type = tPd.layer_type ;
	this.disc_type = tPd.disc_type ;
	this.disc_fld = tPd.disc_fld ;
	this.branch_typ = tPd.branch_typ ;
	this.new_level = tPd.new_level ;
	this.rtl_qty = tPd.rtl_qty ;
	this.rtl_price = tPd.rtl_price ;

// Dynamic
	if (tPd.based_on > 0 && tPd.based_on < 9999999999 ) {
		this.based_prmo = 'Y';
	} else {
		this.based_prmo = 'N';
	}

	if (tPl.conct_type == 2) {
		this.active = 'Y';
	} else {
		this.active = 'N';
	}

	this.linkage = 0;
	this.active_ctl = 0;
	this.layer_ctl = 0;
	this.duplicate_prmo = 0;
	this.exception = 0;
	this.new_layer = 0;
	this.based_on_qty = 0;
	this.based_on_amt = 0;
	this.free_given = 0;
}

function invtCalcObj(tcdtObj, tHow, tInv) {
//	this.trans_id = tcdtObj.trans_id;
	this.prod_no  = tcdtObj.prod_no
	this.sell_qty = tcdtObj.sell_qty

//	this.load_id  = tLoad;

	this.mod_how = tHow;
	this.mod_inv = tInv;
}


function prntAccObj(tE) {
	this.dept_no = vDynm.re.dept.dept_no;
	this.rpt_sect = vDynm.re.cdat.rpt_sect;
	this.phyQty1 = tE.phyQty1;
	this.phyQty2 = tE.phyQty2;
	this.sellQty = tE.sellQty;
	this.disc 	= tE.disc;
	this.ext 	= tE.ext;
}


function docRegTcdt(hdrObj) {
	var tD = new Date(hdrObj.ut_mod);
	this.alt_date = tD.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });

	this.status = vCnst.ar.voidTypeStrs[hdrObj.void_flag];
	this.prod_no = hdrObj.tkt_no;

	this.dept_no = 1;
	this.trans_id = 230;
	this.rpt_sect = 23;
	this.tkt_no = -1;
	this.sell_qty = 1;

	this.net_ext = 0;
	this.net_price = 0;
}


function docSumTcdt(tn, td, va, vc, sa, sc, ra, rc) {
	this.dept_no = 1;
	this.trans_id = 232;
	this.rpt_sect = 23;
	this.prod_no = tn;
	this.prod_desc = td;

	this.tkt_no = -1;
	this.sell_qty = 1;
	this.net_price = 0;
	this.gross_price = 0;	// Base or Price List or Entered Value

	this.phy_qty1 = vc;
	this.phy_qty2 = sc;
	this.oh_qty1 = rc;
	this.net_ext = va;
	this.disc_amt = sa;
	this.tax_amt = ra;
}


function depTcdt(ctrpObj) {
	var tD = new Date(ctrpObj.ut_mod);
	this.alt_date = tD.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });

	this.prod_no = vDynm.re.cust.cust_no;
	this.prod_desc = vDynm.re.cust.cust_name;
	this.phy_qty1 = ctrpObj.chk_no;
	this.gross_price = ctrpObj.chk_amt;

	this.dept_no = 1;
	this.trans_id = 240;
	this.rpt_sect = 24;
	this.tkt_no = -1;
	this.sell_qty = 1;

	this.net_ext = 0;
	this.net_price = 0;
}


function capTcdt(tid, pdd, pgp) {
	var tD = new Date(ctrpObj.ut_mod);
	this.alt_date = tD.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });

	this.prod_no = 0;
	this.prod_desc = pdd;
	this.phy_qty1 = 0;
	this.gross_price = pgp;
	this.trans_id = tid;

	this.dept_no = 1;
	this.rpt_sect = 26;
	this.tkt_no = -1;
	this.sell_qty = 1;

	this.net_ext = pgp;
	this.net_price = 0;
}