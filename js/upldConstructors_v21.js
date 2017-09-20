function ctdtObj(tkt_no, trans_id, prod_no, gross_prce, sell_qty, phy_qty1, phy_qty2, oh_qty, oh_qty1, oh_qty2, disc_amt, disc_ext, ent_time, ent_order, ut_upld) {
this.tkt_no = tkt_no ;
this.trans_id = trans_id ;
this.prod_no = prod_no ;
this.gross_prce = gross_prce ;
this.sell_qty = sell_qty ;
this.phy_qty1 = phy_qty1 ;
this.phy_qty2 = phy_qty2 ;
this.oh_qty = oh_qty ;
this.oh_qty1 = oh_qty1 ;
this.oh_qty2 = oh_qty2 ;
this.disc_amt = disc_amt ;
this.disc_ext = disc_ext ;
this.ent_time = ent_time ;
this.ent_order = ent_order ;
this.ut_upld = ut_upld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function cthsObj(tkt_no, trans_id, prod_no, onhand_qty, return_qty, prepst_qty, ut_upld) {
this.tkt_no = tkt_no ;
this.trans_id = trans_id ;
this.prod_no = prod_no ;
this.onhand_qty = onhand_qty ;
this.return_qty = return_qty ;
this.prepst_qty = prepst_qty ;
this.ut_upld = ut_upld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function ctmiObj(tkt_no, misc1, misc2, misc3, misc4, misc5, misc6, ut_upld) {
this.tkt_no = tkt_no ;
this.misc1 = misc1 ;
this.misc2 = misc2 ;
this.misc3 = misc3 ;
this.misc4 = misc4 ;
this.misc5 = misc5 ;
this.misc6 = misc6 ;
this.ut_upld = ut_upld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function ctotObj(tkt_no, trans_id, text, srvn_no, ut_upld) {
this.tkt_no = tkt_no ;
this.trans_id = trans_id ;
this.text = text ;
this.srvn_no = srvn_no ;
this.ut_upld = ut_upld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function ctpoObj(tkt_no, po_no, route_id, ut_upld) {
this.tkt_no = tkt_no ;
this.po_no = po_no ;
this.route_id = route_id ;
this.ut_upld = ut_upld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function ctpsObj(tkt_no, trans_id, prod_no, promo_no, dtl_sequ, disc_type, disc_fld, disc_chg, ut_upld) {
this.tkt_no = tkt_no ;
this.trans_id = trans_id ;
this.prod_no = prod_no ;
this.promo_no = promo_no ;
this.dtl_sequ = dtl_sequ ;
this.disc_type = disc_type ;
this.disc_fld = disc_fld ;
this.disc_chg = disc_chg ;
this.ut_upld = ut_upld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function ctrnObj(tkt_no, dept_no, cust_no, route_id, void_flag, pay_method, total_invc, total_disc, srvc_date, start_time, odometer, stop_time, tkt_type, total_tax, natl_tktno, price_date, order_date, comm_tcust, posted, ut_upld) {
this.tkt_no = tkt_no ;
this.dept_no = dept_no ;
this.cust_no = cust_no ;
this.route_id = route_id ;
this.void_flag = void_flag ;
this.pay_method = pay_method ;
this.total_invc = total_invc ;
this.total_disc = total_disc ;
this.srvc_date = srvc_date ;
this.start_time = start_time ;
this.odometer = odometer ;
this.stop_time = stop_time ;
this.tkt_type = tkt_type ;
this.total_tax = total_tax ;
this.natl_tktno = natl_tktno ;
this.price_date = price_date ;
this.order_date = order_date ;
this.comm_tcust = comm_tcust ;
this.posted = posted ;
this.ut_upld = ut_upld ;
this.modified = 0;
this.ut_mod = Math.floor(Date.now());
}

function ctrpObj(tkt_no, chk_no, chk_amt, ut_upld) {
this.tkt_no = tkt_no ;
this.chk_no = chk_no ;
this.chk_amt = chk_amt ;
this.ut_upld = ut_upld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function ctrtObj(tkt_no, rt_tkt_no, rt_tkt_amt, ut_upld) {
this.tkt_no = tkt_no ;
this.rt_tkt_no = rt_tkt_no ;
this.rt_tkt_amt = rt_tkt_amt ;
this.ut_upld = ut_upld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function dsm1Obj(tkt_no, route_id, sum_date, start_odom, end_odom, rte_bgntim, rte_endtim, load_chg, changer, roa, expenses, setl_roa2, nsf_chks, open_unath, end_invval, rounding, conv_check, conv_curr, conv_coin, f_s_curr, f_s_coin, conv_dpost, f_s_dposit, sls_amount, sls_dposit, sls_offinv, sls_pr_dsc, sls_taxes, rtn_amount, rtn_dposit, rtn_offinv, rtn_taxes, rtn_pr_dsc, bkt_01, bkt_02, bkt_03, bkt_04, bkt_05, bkt_06, bkt_07, bkt_08, bkt_09, bkt_10, bkt_11, bkt_12, bkt_13, bkt_14, bkt_15, bkt_16, bkt_17, bkt_18, bkt_19, bkt_20, bkt_21, credit_01, credit_02, credit_03, credit_04, credit_05, credit_06, credit_07, debit_01, debit_02, debit_03, debit_04, debit_05, debit_06, debit_07, posted, ut_upld) {
this.tkt_no = tkt_no ;
this.route_id = route_id ;
this.sum_date = sum_date ;
this.start_odom = start_odom ;
this.end_odom = end_odom ;
this.rte_bgntim = rte_bgntim ;
this.rte_endtim = rte_endtim ;
this.load_chg = load_chg ;
this.changer = changer ;
this.roa = roa ;
this.expenses = expenses ;
this.setl_roa2 = setl_roa2 ;
this.nsf_chks = nsf_chks ;
this.open_unath = open_unath ;
this.end_invval = end_invval ;
this.rounding = rounding ;
this.conv_check = conv_check ;
this.conv_curr = conv_curr ;
this.conv_coin = conv_coin ;
this.f_s_curr = f_s_curr ;
this.f_s_coin = f_s_coin ;
this.conv_dpost = conv_dpost ;
this.f_s_dposit = f_s_dposit ;
this.sls_amount = sls_amount ;
this.sls_dposit = sls_dposit ;
this.sls_offinv = sls_offinv ;
this.sls_pr_dsc = sls_pr_dsc ;
this.sls_taxes = sls_taxes ;
this.rtn_amount = rtn_amount ;
this.rtn_dposit = rtn_dposit ;
this.rtn_offinv = rtn_offinv ;
this.rtn_taxes = rtn_taxes ;
this.rtn_pr_dsc = rtn_pr_dsc ;
this.bkt_01 = bkt_01 ;
this.bkt_02 = bkt_02 ;
this.bkt_03 = bkt_03 ;
this.bkt_04 = bkt_04 ;
this.bkt_05 = bkt_05 ;
this.bkt_06 = bkt_06 ;
this.bkt_07 = bkt_07 ;
this.bkt_08 = bkt_08 ;
this.bkt_09 = bkt_09 ;
this.bkt_10 = bkt_10 ;
this.bkt_11 = bkt_11 ;
this.bkt_12 = bkt_12 ;
this.bkt_13 = bkt_13 ;
this.bkt_14 = bkt_14 ;
this.bkt_15 = bkt_15 ;
this.bkt_16 = bkt_16 ;
this.bkt_17 = bkt_17 ;
this.bkt_18 = bkt_18 ;
this.bkt_19 = bkt_19 ;
this.bkt_20 = bkt_20 ;
this.bkt_21 = bkt_21 ;
this.credit_01 = credit_01 ;
this.credit_02 = credit_02 ;
this.credit_03 = credit_03 ;
this.credit_04 = credit_04 ;
this.credit_05 = credit_05 ;
this.credit_06 = credit_06 ;
this.credit_07 = credit_07 ;
this.debit_01 = debit_01 ;
this.debit_02 = debit_02 ;
this.debit_03 = debit_03 ;
this.debit_04 = debit_04 ;
this.debit_05 = debit_05 ;
this.debit_06 = debit_06 ;
this.debit_07 = debit_07 ;
this.posted = posted ;
this.ut_upld = ut_upld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function eqdtObj(tkt_no, eqmt_idtyp, eqmt_id, filler, pull_code, ut_upld) {
this.tkt_no = tkt_no ;
this.eqmt_idtyp = eqmt_idtyp ;
this.eqmt_id = eqmt_id ;
this.filler = filler ;
this.pull_code = pull_code ;
this.ut_upld = ut_upld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function eqhdObj(tkt_no, trans_id, route_id, cust_no, void_flag, srvc_date, start_time, stop_time, hdr_misc1, posted, ut_upld) {
this.tkt_no = tkt_no ;
this.trans_id = trans_id ;
this.route_id = route_id ;
this.cust_no = cust_no ;
this.void_flag = void_flag ;
this.srvc_date = srvc_date ;
this.start_time = start_time ;
this.stop_time = stop_time ;
this.hdr_misc1 = hdr_misc1 ;
this.posted = posted ;
this.ut_upld = ut_upld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function itdtObj(tkt_no, prod_no, dtl_qty1, dtl_qty2, dtl_misc, ut_upld) {
this.tkt_no = tkt_no ;
this.prod_no = prod_no ;
this.dtl_qty1 = dtl_qty1 ;
this.dtl_qty2 = dtl_qty2 ;
this.dtl_misc = dtl_misc ;
this.ut_upld = ut_upld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function itrnObj(tkt_no, inv_trnsid, route_id, void_flag, srvc_date, start_time, stop_time, hdr_misc1, hdr_misc2, hdr_misc3, hdr_misc4, posted, ut_upld) {
this.tkt_no = tkt_no ;
this.inv_trnsid = inv_trnsid ;
this.route_id = route_id ;
this.void_flag = void_flag ;
this.srvc_date = srvc_date ;
this.start_time = start_time ;
this.stop_time = stop_time ;
this.hdr_misc1 = hdr_misc1 ;
this.hdr_misc2 = hdr_misc2 ;
this.hdr_misc3 = hdr_misc3 ;
this.hdr_misc4 = hdr_misc4 ;
this.posted = posted ;
this.ut_upld = ut_upld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function ncstObj(route_id, cust_no, date, modify, cclass1, cclass2, cust_phone, cust_zip, tax_key_1, tax_key_2, tax_key_3, tax_key_4, tax_key_5, tax_key_6, tax_key_7, mxdsc_zone, filler, invc_type, cust_p_tbl, auth_p_tbl, off_invc, prce_zone, msg_id_1, msg_id_2, sub_p_tbl, promo_disc, prce_chnge, prmo_chnge, meth_allow, bill_to, cust_name, cust_addr1, cust_addr2, cust_city, cust_state, tax_id, license, bill_meth, auth_prod, rtl_prnt, rtl_dsply, sep_tkt, xtra_prnt, tax_rules, calc_ctl, natl_acct, prnt_upc, dposit_tax, cust_type, vend_prmt, dspl_unath, multi_brnd, net_gross, track_baln, posted, ut_upld) {
this.route_id = route_id ;
this.cust_no = cust_no ;
this.date = date ;
this.modify = modify ;
this.cclass1 = cclass1 ;
this.cclass2 = cclass2 ;
this.cust_phone = cust_phone ;
this.cust_zip = cust_zip ;
this.tax_key_1 = tax_key_1 ;
this.tax_key_2 = tax_key_2 ;
this.tax_key_3 = tax_key_3 ;
this.tax_key_4 = tax_key_4 ;
this.tax_key_5 = tax_key_5 ;
this.tax_key_6 = tax_key_6 ;
this.tax_key_7 = tax_key_7 ;
this.mxdsc_zone = mxdsc_zone ;
this.filler = filler ;
this.invc_type = invc_type ;
this.cust_p_tbl = cust_p_tbl ;
this.auth_p_tbl = auth_p_tbl ;
this.off_invc = off_invc ;
this.prce_zone = prce_zone ;
this.msg_id_1 = msg_id_1 ;
this.msg_id_2 = msg_id_2 ;
this.sub_p_tbl = sub_p_tbl ;
this.promo_disc = promo_disc ;
this.prce_chnge = prce_chnge ;
this.prmo_chnge = prmo_chnge ;
this.meth_allow = meth_allow ;
this.bill_to = bill_to ;
this.cust_name = cust_name ;
this.cust_addr1 = cust_addr1 ;
this.cust_addr2 = cust_addr2 ;
this.cust_city = cust_city ;
this.cust_state = cust_state ;
this.tax_id = tax_id ;
this.license = license ;
this.bill_meth = bill_meth ;
this.auth_prod = auth_prod ;
this.rtl_prnt = rtl_prnt ;
this.rtl_dsply = rtl_dsply ;
this.sep_tkt = sep_tkt ;
this.xtra_prnt = xtra_prnt ;
this.tax_rules = tax_rules ;
this.calc_ctl = calc_ctl ;
this.natl_acct = natl_acct ;
this.prnt_upc = prnt_upc ;
this.dposit_tax = dposit_tax ;
this.cust_type = cust_type ;
this.vend_prmt = vend_prmt ;
this.dspl_unath = dspl_unath ;
this.multi_brnd = multi_brnd ;
this.net_gross = net_gross ;
this.track_baln = track_baln ;
this.posted = posted ;
this.ut_upld = ut_upld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function respObj(route_id, date, msg_no, cust_no, resp_type, response, posted, ut_upld) {
this.route_id = route_id ;
this.date = date ;
this.msg_no = msg_no ;
this.cust_no = cust_no ;
this.resp_type = resp_type ;
this.response = response ;
this.posted = posted ;
this.ut_upld = ut_upld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function rhduObj(rhdrObj) {
this.route_id = rhdrObj.route_id ;
this.date = rhdrObj.date ;
this.route_type = rhdrObj.route_type ;
this.slsmn_no = rhdrObj.slsmn_no ;
this.slsmn_name = rhdrObj.slsmn_name ;
this.truck_no = rhdrObj.truck_no ;
this.start_odom = rhdrObj.start_odom ;
this.end_odom = rhdrObj.end_odom ;
this.dow = rhdrObj.dow ;
this.dow_type = rhdrObj.dow_type ;
this.wk_no = rhdrObj.wk_no ;
this.serial_no = rhdrObj.serial_no ;
this.next_tkt_1 = rhdrObj.next_tkt_1 ;
this.next_tkt_2 = rhdrObj.next_tkt_2 ;
this.next_tkt_3 =rhdrObj. next_tkt_3 ;
this.next_cust = rhdrObj.next_cust ;
this.sw_date = rhdrObj.sw_date ;
this.sw_rev = rhdrObj.sw_rev ;
this.secur_1 = rhdrObj.secur_1 ;
this.secur_2 = rhdrObj.secur_2 ;
this.secur_3 = rhdrObj.secur_3 ;
this.secur_4 = rhdrObj.secur_4 ;
this.secur_5 = rhdrObj.secur_5 ;
this.hdr_ids = rhdrObj.hdr_ids ;
this.mem_low = rhdrObj.mem_low ;
this.mem_out = rhdrObj.mem_out ;
this.prmtrdypnt = rhdrObj.prmtrdypnt ;
this.prnt_fault = rhdrObj.prnt_fault ;
this.auto_load = rhdrObj.auto_load ;
this.brand_slct = rhdrObj.brand_slct ;
this.grp_inv = rhdrObj.grp_inv ;
this.track_odom = rhdrObj.track_odom ;
this.save_void = rhdrObj.save_void ;
this.incr_void = rhdrObj.incr_void ;
this.save_hist = rhdrObj.save_hist ;
this.upld_inv = rhdrObj.upld_inv ;
this.setl_err = rhdrObj.setl_err ;
this.se_dv_ctrl = rhdrObj.se_dv_ctrl ;
this.se_dv_date = rhdrObj.se_dv_date ;
this.nsf_chks = rhdrObj.nsf_chks ;
this.nc_sign = rhdrObj.nc_sign ;
this.alw_t_chng = rhdrObj.alw_t_chng ;
this.sls_asst = rhdrObj.sls_asst ;
this.mod_dates = rhdrObj.mod_dates ;
this.prmt_eodbl = rhdrObj.prmt_eodbl ;
this.prmo_scans = rhdrObj.prmo_scans ;
this.prce_decml = rhdrObj.prce_decml ;
this.wk_no_so = rhdrObj.wk_no_so ;
this.day_no_so = rhdrObj.day_no_so ;
this.prod_prnt = rhdrObj.prod_prnt ;
this.rtl_decml = rhdrObj.rtl_decml ;
this.hst_by_dow = rhdrObj.hst_by_dow ;
this.hst_perids  = rhdrObj.hst_period  ;
this.hst_seprtn = rhdrObj.hst_seprtn ;
this.hist_purge = rhdrObj.hist_purge ;
this.use_hstday = rhdrObj.use_hstday ;
this.prmo_selct = rhdrObj.prmo_selct ;
this.comprs_inv = rhdrObj.comprs_inv ;
this.track_prc = rhdrObj.track_prc ;
this.alpha_prod = rhdrObj.alpha_prod ;
this.tax_ctrl = rhdrObj.tax_ctrl ;
this.dpst_txpct = rhdrObj.dpst_txpct ;
this.updt_d_ver = 0 ;
this.setl_v_prc = rhdrObj.setl_v_prc ;
this.sls_hlp_no = rhdrObj.sls_hlp_no ;
this.helpr_name = rhdrObj.helpr_name ;
this.posted = 0 ;
this.ut_upld = 0 ;
//this.modified = 0;
this.ut_mod = Math.floor(Date.now());
}

function rpchObj(cust_no, prod_no, price, prcqty, modifd, posted, date, ut_upld) {
this.cust_no = cust_no ;
this.prod_no = prod_no ;
this.price = price ;
this.prcqty = prcqty ;
this.modifd = modifd ;
this.posted = posted ;
this.date = date ;
this.ut_upld = ut_upld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function utmeObj(route_id, changed_at, date_was, clock_was, date_is, clock_is, posted, ut_upld) {
this.route_id = route_id ;
this.changed_at = changed_at ;
this.date_was = date_was ;
this.clock_was = clock_was ;
this.date_is = date_is ;
this.clock_is = clock_is ;
this.posted = posted ;
this.ut_upld = ut_upld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function xpdtObj(tkt_no, expns_no, expns_amt, expns_po, ut_upld) {
this.tkt_no = tkt_no ;
this.expns_no = expns_no ;
this.expns_amt = expns_amt ;
this.expns_po = expns_po ;
this.ut_upld = ut_upld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function xpnsObj(tkt_no, route_id, filler, void_flag, expn_total, srvc_date, start_time, stop_time, xpns_type, posted, ut_upld) {
this.tkt_no = tkt_no ;
this.route_id = route_id ;
this.filler = filler ;
this.void_flag = void_flag ;
this.expn_total = expn_total ;
this.srvc_date = srvc_date ;
this.start_time = start_time ;
this.stop_time = stop_time ;
this.xpns_type = xpns_type ;
this.posted = posted ;
this.ut_upld = ut_upld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}


