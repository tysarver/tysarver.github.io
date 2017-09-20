function adjrObj(reasn_code, reasn_desc) {
this.reasn_code = reasn_code ;
this.reasn_desc = reasn_desc ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function aprdObj(prod_a_n, prod_no, option) {
this.prod_a_n = prod_a_n ;
this.prod_no = prod_no ;
this.option = option ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function authObj(prod_tbl, prod_no, except_flg) {
this.prod_tbl = prod_tbl ;
this.prod_no = prod_no ;
this.except_flg = except_flg ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function balnObj(cust_no, message, last_invc, total_due, current, over_30, over_60, over_90, over_120) {
this.cust_no = cust_no ;
this.message = message ;
this.last_invc = last_invc ;
this.total_due = total_due ;
this.current = current ;
this.over_30 = over_30 ;
this.over_60 = over_60 ;
this.over_90 = over_90 ;
this.over_120 = over_120 ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function bil2Obj(bil2_no, bil2_name, bil2_addr1, bil2_addr2, bil2_city, bil2_state, bil2_taxid, bil2_licen, bil2_phone, bil2_zip, bil2_conta) {
this.bil2_no = bil2_no ;
this.bil2_name = bil2_name ;
this.bil2_addr1 = bil2_addr1 ;
this.bil2_addr2 = bil2_addr2 ;
this.bil2_city = bil2_city ;
this.bil2_state = bil2_state ;
this.bil2_taxid = bil2_taxid ;
this.bil2_licen = bil2_licen ;
this.bil2_phone = bil2_phone ;
this.bil2_zip = bil2_zip ;
this.bil2_conta = bil2_conta ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function cprdObj(prod_tbl, prod_no, prod_a_n) {
this.prod_tbl = prod_tbl ;
this.prod_no = prod_no ;
this.prod_a_n = prod_a_n ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function cstoObj(route_id, week, dow, cust_no, sequ_no, last_srvc) {
this.route_id = route_id ;
this.week = week ;
this.dow = dow ;
this.cust_no = cust_no ;
this.sequ_no = sequ_no ;
this.last_srvc = last_srvc ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function custObj(cust_no, cclass1, cclass2, route_id, cust_phone, cust_zip, tax_key_1, tax_key_2, tax_key_3, tax_key_4, tax_key_5, tax_key_6, tax_key_7, mxdsc_zone, serv_rate, invc_type, cust_p_tbl, auth_p_tbl, off_invc, prce_zone, msg_id_1, msg_id_2, sub_p_tbl, promo_disc, prce_chnge, prmo_chnge, meth_allow, bill_to, cust_name, cust_addr1, cust_addr2, cust_city, cust_state, tax_id, license, bill_meth, auth_prod, rtl_prnt, rtl_dsply, sep_tkt, xtra_prnt, tax_rules, calc_ctl, natl_acct, prnt_upc, dposit_tax, cust_type, vend_prmt, dspl_unath, multi_brnd, net_gross, track_baln, comm_no, cust_cont, cust_phon2, cust_cont2, geo_lat, geo_lon, exp_ctrl) {
this.cust_no = cust_no ;
this.cclass1 = cclass1 ;
this.cclass2 = cclass2 ;
this.route_id = route_id ;
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
this.serv_rate = serv_rate ;
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
this.comm_no = comm_no ;
this.cust_cont = cust_cont ;
this.cust_phon2 = cust_phon2 ;
this.cust_cont2 = cust_cont2 ;
this.geo_lat = geo_lat ;
this.geo_lon = geo_lon ;
this.exp_ctrl = exp_ctrl ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function cxrfObj(cust_no, route_id, comm_no) {
this.cust_no = cust_no ;
this.route_id = route_id ;
this.comm_no = comm_no ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function deptObj(cust_no, dept_no, dept_desc) {
this.cust_no = cust_no ;
this.dept_no = dept_no ;
this.dept_desc = dept_desc ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function eprmObj(promo_no, sequ_no, next_no, optionx, descriptn, changeable, option, del_date) {
this.promo_no = promo_no ;
this.sequ_no = sequ_no ;
this.next_no = next_no ;
this.optionx = optionx ;
this.descriptn = descriptn ;
this.changeable = changeable ;
this.option = option ;
this.del_date = del_date ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function expnObj(expns_no, expns_desc, prmt_type, expns_min, expns_max, end_keyok, po_level, must_donxt, comm_no) {
this.expns_no = expns_no ;
this.expns_desc = expns_desc ;
this.prmt_type = prmt_type ;
this.expns_min = expns_min ;
this.expns_max = expns_max ;
this.end_keyok = end_keyok ;
this.po_level = po_level ;
this.must_donxt = must_donxt ;
this.comm_no = comm_no ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function gprcObj(prod_type, prod_grp, grp_desc, grp_xref, pcnt1, pcnt2, pcnt3, pcnt4) {
this.prod_type = prod_type ;
this.prod_grp = prod_grp ;
this.grp_desc = grp_desc ;
this.grp_xref = grp_xref ;
this.pcnt1 = pcnt1 ;
this.pcnt2 = pcnt2 ;
this.pcnt3 = pcnt3 ;
this.pcnt4 = pcnt4 ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function histObj(cust_no, loc_no, prod_no, hist_dow, hist_date, hist_carry, hist_rtn, hist_sls, stndng_pp) {
this.cust_no = cust_no ;
this.loc_no = loc_no ;
this.prod_no = prod_no ;
this.hist_dow = hist_dow ;
this.hist_date = hist_date ;
this.hist_carry = hist_carry ;
this.hist_rtn = hist_rtn ;
this.hist_sls = hist_sls ;
this.stndng_pp = stndng_pp ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function ilodObj(route_id, trans_id, prod_no, load_qty) {
this.route_id = route_id ;
this.trans_id = trans_id ;
this.prod_no = prod_no ;
this.load_qty = load_qty ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function intpObj(invc_type, invc_name, brnd_spcfc, name_adr_l) {
this.invc_type = invc_type ;
this.invc_name = invc_name ;
this.brnd_spcfc = brnd_spcfc ;
this.name_adr_l = name_adr_l ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function invtObj(route_id, prod_no, load_by_gr, prod_grp, qty_1, qty_2, qty_3, qty_4, qty_5, qty_6, qty_7, qty_8, qty_9, srvc_date, srvc_time) {
this.route_id = route_id ;
this.prod_no = prod_no ;
this.load_by_gr = load_by_gr ;
this.prod_grp = prod_grp ;
this.qty_1 = qty_1 ;
this.qty_2 = qty_2 ;
this.qty_3 = qty_3 ;
this.qty_4 = qty_4 ;
this.qty_5 = qty_5 ;
this.qty_6 = qty_6 ;
this.qty_7 = qty_7 ;
this.qty_8 = qty_8 ;
this.qty_9 = qty_9 ;
this.srvc_date = srvc_date ;
this.srvc_time = srvc_time ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function mesgObj(msg_type, route_id, cust_no, msg_no, msg_id_1, msg_id_2, erase_ctrl, dsply_line, resp_fmt, prnt_grp, max_resp, dsply_date, dsply_time, expir_date, yes_hi_go, no_er_low, end_mdgoto, message, resp_type, bkt_accum, incr_accum, zero_bkt, zero_incr, init_cont, min_resp) {
this.msg_type = msg_type ;
this.route_id = route_id ;
this.cust_no = cust_no ;
this.msg_no = msg_no ;
this.msg_id_1 = msg_id_1 ;
this.msg_id_2 = msg_id_2 ;
this.erase_ctrl = erase_ctrl ;
this.dsply_line = dsply_line ;
this.resp_fmt = resp_fmt ;
this.prnt_grp = prnt_grp ;
this.max_resp = max_resp ;
this.dsply_date = dsply_date ;
this.dsply_time = dsply_time ;
this.expir_date = expir_date ;
this.yes_hi_go = yes_hi_go ;
this.no_er_low = no_er_low ;
this.end_mdgoto = end_mdgoto ;
this.message = message ;
this.resp_type = resp_type ;
this.bkt_accum = bkt_accum ;
this.incr_accum = incr_accum ;
this.zero_bkt = zero_bkt ;
this.zero_incr = zero_incr ;
this.init_cont = init_cont ;
this.min_resp = min_resp ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function mnmxObj(cust_no, dept_no, prod_no, min_lvl, max_lvl, min_ea, max_ea) {
this.cust_no = cust_no ;
this.dept_no = dept_no ;
this.prod_no = prod_no ;
this.min_lvl = min_lvl ;
this.max_lvl = max_lvl ;
this.min_ea = min_ea ;
this.max_ea = max_ea ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function ncnoObj(route_id, cust_no) {
this.route_id = route_id ;
this.cust_no = cust_no ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function nprcObj(date, list_no, prod_no, price) {
this.date = date ;
this.list_no = list_no ;
this.prod_no = prod_no ;
this.price = price ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function octlObj(prod_tbl, prod_no, unt_ordqty, lyr_1_qty, lyr_1_mult, lyr_2_qty, lyr_2_mult) {
this.prod_tbl = prod_tbl ;
this.prod_no = prod_no ;
this.unt_ordqty = unt_ordqty ;
this.lyr_1_qty = lyr_1_qty ;
this.lyr_1_mult = lyr_1_mult ;
this.lyr_2_qty = lyr_2_qty ;
this.lyr_2_mult = lyr_2_mult ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function oprcObj(route_id, date, list_no, prod_no, price, posted) {
this.route_id = route_id ;
this.date = date ;
this.list_no = list_no ;
this.prod_no = prod_no ;
this.price = price ;
this.posted = posted ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function pgrpObj(prod_grp, prod_desc, prod_type, comm_no) {
this.prod_grp = prod_grp ;
this.prod_desc = prod_desc ;
this.prod_type = prod_type ;
this.comm_no = comm_no ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function plnkObj(cust_no, promo_no, start_date, stop_date, conct_type, del_date) {
this.cust_no = cust_no ;
this.promo_no = promo_no ;
this.start_date = start_date ;
this.stop_date = stop_date ;
this.conct_type = conct_type ;
this.del_date = del_date ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function plstObj(list_no, prod_no, price) {
this.list_no = list_no ;
this.prod_no = prod_no ;
this.price = price ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function prdeObj(rec_type, ref_no, prod_no, prod_grp) {
this.rec_type = rec_type ;
this.ref_no = ref_no ;
this.prod_no = prod_no ;
this.prod_grp = prod_grp ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function prdoObj(rec_type, ref_no, dept_no, dow, trans_id, prod_no, prod_grp, avg_ent_ord, min_date) {
this.rec_type = rec_type ;
this.ref_no = ref_no ;
this.dept_no = dept_no ;
this.dow = dow ;
this.trans_id = trans_id ;
this.prod_no = prod_no ;
this.prod_grp = prod_grp ;
this.avg_ent_ord = avg_ent_ord ;
this.min_date = min_date ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function prepObj(cust_no, message, must_pay, prepay_amt, min_paymnt) {
this.cust_no = cust_no ;
this.message = message ;
this.must_pay = must_pay ;
this.prepay_amt = prepay_amt ;
this.min_paymnt = min_paymnt ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function prl1Obj(ordr_no, cust_no, dlvr_date, order_seq, option, erase, adjust_ctl) {
this.ordr_no = ordr_no ;
this.cust_no = cust_no ;
this.dlvr_date = dlvr_date ;
this.order_seq = order_seq ;
this.option = option ;
this.erase = erase ;
this.adjust_ctl = adjust_ctl ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function prl2Obj(ordr_no, promo_no, layer, promo_opt) {
this.ordr_no = ordr_no ;
this.promo_no = promo_no ;
this.layer = layer ;
this.promo_opt = promo_opt ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function prl3Obj(ordr_no, cdat_id, prod_no, order_qty) {
this.ordr_no = ordr_no ;
this.cdat_id = cdat_id ;
this.prod_no = prod_no ;
this.order_qty = order_qty ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function prl4Obj(ordr_no, cdat_id, prod_no, promo_no, disc_type, disc_fld) {
this.ordr_no = ordr_no ;
this.cdat_id = cdat_id ;
this.prod_no = prod_no ;
this.promo_no = promo_no ;
this.disc_type = disc_type ;
this.disc_fld = disc_fld ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function prl5Obj(ordr_no, text) {
this.ordr_no = ordr_no ;
this.text = text ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function prmdObj(promo_no, level, min_layer, apply_to, based_on, apply_to_typ, apply_to_fld, apply_to_exc, based_on_typ, based_on_fld, based_on_exc, layer_type, disc_type, disc_fld, branch_typ, new_level, promo_supres, rtl_qty, rtl_price, del_date) {
this.promo_no = promo_no ;
this.level = level ;
this.min_layer = min_layer ;
this.apply_to = apply_to ;
this.based_on = based_on ;
this.apply_to_typ = apply_to_typ ;
this.apply_to_fld = apply_to_fld ;
this.apply_to_exc = apply_to_exc ;
this.based_on_typ = based_on_typ ;
this.based_on_fld = based_on_fld ;
this.based_on_exc = based_on_exc ;
this.layer_type = layer_type ;
this.disc_type = disc_type ;
this.disc_fld = disc_fld ;
this.branch_typ = branch_typ ;
this.new_level = new_level ;
this.promo_supres = promo_supres ;
this.rtl_qty = rtl_qty ;
this.rtl_price = rtl_price ;
this.del_date = del_date ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function prodObj(prod_no, prod_grp, classific, upc, rtl_price, rtl_qty, pkg_type, qprmt_id1, qprmt_id2, qprmt_id3, rqty_prmt, prod_desc, filler, dposit_typ, tax_key_1, tax_key_2, tax_key_3, tax_key_4, tax_key_5, tax_key_6, tax_key_7, sell_prc_1, sell_prc_2, sell_prc_3, sell_prc_4, sell_prc_5, price_qty, case_qty, dposit_amt, option, comm_no) {
this.prod_no = prod_no ;
this.prod_grp = prod_grp ;
this.classific = classific ;
this.upc = upc ;
this.rtl_price = rtl_price ;
this.rtl_qty = rtl_qty ;
this.pkg_type = pkg_type ;
this.qprmt_id1 = qprmt_id1 ;
this.qprmt_id2 = qprmt_id2 ;
this.qprmt_id3 = qprmt_id3 ;
this.rqty_prmt = rqty_prmt ;
this.prod_desc = prod_desc ;
this.filler = filler ;
this.dposit_typ = dposit_typ ;
this.tax_key_1 = tax_key_1 ;
this.tax_key_2 = tax_key_2 ;
this.tax_key_3 = tax_key_3 ;
this.tax_key_4 = tax_key_4 ;
this.tax_key_5 = tax_key_5 ;
this.tax_key_6 = tax_key_6 ;
this.tax_key_7 = tax_key_7 ;
this.sell_prc_1 = sell_prc_1 ;
this.sell_prc_2 = sell_prc_2 ;
this.sell_prc_3 = sell_prc_3 ;
this.sell_prc_4 = sell_prc_4 ;
this.sell_prc_5 = sell_prc_5 ;
this.price_qty = price_qty ;
this.case_qty = case_qty ;
this.dposit_amt = dposit_amt ;
this.option = option ;
this.comm_no = comm_no ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function pseqObj(cust_no, sequ_no, prod_no) {
this.cust_no = cust_no ;
this.sequ_no = sequ_no ;
this.prod_no = prod_no ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function ptaxObj(key_cust, key_prod, key_sect, tax_type, tax_fld, tax_on_tax, trl_desc, dtl_desc) {
this.key_cust = key_cust ;
this.key_prod = key_prod ;
this.key_sect = key_sect ;
this.tax_type = tax_type ;
this.tax_fld = tax_fld ;
this.tax_on_tax = tax_on_tax ;
this.trl_desc = trl_desc ;
this.dtl_desc = dtl_desc ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function qpmtObj(id, type, prompt1, prompt2, unit1, unit2) {
this.id = id ;
this.type = type ;
this.prompt1 = prompt1 ;
this.prompt2 = prompt2 ;
this.unit1 = unit1 ;
this.unit2 = unit2 ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function raliObj(m_route, s_route) {
this.m_route = m_route ;
this.s_route = s_route ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function rchdObj(name_adr_l, sequ_no, comp_data) {
this.name_adr_l = name_adr_l ;
this.sequ_no = sequ_no ;
this.comp_data = comp_data ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function retlObj(cust_no, prod_no, price, prcqty, modifd) {
this.cust_no = cust_no ;
this.prod_no = prod_no ;
this.price = price ;
this.prcqty = prcqty ;
this.modifd = modifd ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function rhdrObj(route_id, route_type, slsmn_no, slsmn_name, truck_no, start_odom, end_odom, date, dow, dow_type, wk_no, serial_no, next_tkt_1, next_tkt_2, next_tkt_3, next_cust, sw_date, sw_rev, secur_1, secur_2, secur_3, secur_4, secur_5, hdr_ids, mem_low, mem_out, prmtrdypnt, prnt_fault, auto_load, brand_slct, grp_inv, track_odom, save_void, incr_void, save_hist, upld_inv, setl_err, se_dv_ctrl, se_dv_date, nsf_chks, nc_sign, alw_t_chng, sls_asst, mod_dates, prmt_eodbl, prmo_scans, prce_decml, wk_no_so, day_no_so, prod_prnt, rtl_decml, hst_by_dow, hst_perids, hst_seprtn, hist_purge, use_hstday, prmo_selct, comprs_inv, track_prc, alpha_prod, tax_ctrl, dpst_txpct, misc_ctrl, setl_v_prc, sls_hlp_no, helpr_name, ordr_pat13, ordr_pat45, ordr_pat6, ordr_pat7, exp_ctrl) {
this.route_id = route_id ;
this.route_type = route_type ;
this.slsmn_no = slsmn_no ;
this.slsmn_name = slsmn_name ;
this.truck_no = truck_no ;
this.start_odom = start_odom ;
this.end_odom = end_odom ;
this.date = date ;
this.dow = dow ;
this.dow_type = dow_type ;
this.wk_no = wk_no ;
this.serial_no = serial_no ;
this.next_tkt_1 = next_tkt_1 ;
this.next_tkt_2 = next_tkt_2 ;
this.next_tkt_3 = next_tkt_3 ;
this.next_cust = next_cust ;
this.sw_date = sw_date ;
this.sw_rev = sw_rev ;
this.secur_1 = secur_1 ;
this.secur_2 = secur_2 ;
this.secur_3 = secur_3 ;
this.secur_4 = secur_4 ;
this.secur_5 = secur_5 ;
this.hdr_ids = hdr_ids ;
this.mem_low = mem_low ;
this.mem_out = mem_out ;
this.prmtrdypnt = prmtrdypnt ;
this.prnt_fault = prnt_fault ;
this.auto_load = auto_load ;
this.brand_slct = brand_slct ;
this.grp_inv = grp_inv ;
this.track_odom = track_odom ;
this.save_void = save_void ;
this.incr_void = incr_void ;
this.save_hist = save_hist ;
this.upld_inv = upld_inv ;
this.setl_err = setl_err ;
this.se_dv_ctrl = se_dv_ctrl ;
this.se_dv_date = se_dv_date ;
this.nsf_chks = nsf_chks ;
this.nc_sign = nc_sign ;
this.alw_t_chng = alw_t_chng ;
this.sls_asst = sls_asst ;
this.mod_dates = mod_dates ;
this.prmt_eodbl = prmt_eodbl ;
this.prmo_scans = prmo_scans ;
this.prce_decml = prce_decml ;
this.wk_no_so = wk_no_so ;
this.day_no_so = day_no_so ;
this.prod_prnt = prod_prnt ;
this.rtl_decml = rtl_decml ;
this.hst_by_dow = hst_by_dow ;
this.hst_perids = hst_perids ;
this.hst_seprtn = hst_seprtn ;
this.hist_purge = hist_purge ;
this.use_hstday = use_hstday ;
this.prmo_selct = prmo_selct ;
this.comprs_inv = comprs_inv ;
this.track_prc = track_prc ;
this.alpha_prod = alpha_prod ;
this.tax_ctrl = tax_ctrl ;
this.dpst_txpct = dpst_txpct ;
this.misc_ctrl = misc_ctrl ;
this.setl_v_prc = setl_v_prc ;
this.sls_hlp_no = sls_hlp_no ;
this.helpr_name = helpr_name ;
this.ordr_pat13 = ordr_pat13 ;
this.ordr_pat45 = ordr_pat45 ;
this.ordr_pat6 = ordr_pat6 ;
this.ordr_pat7 = ordr_pat7 ;
this.exp_ctrl = exp_ctrl ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function rlstObj(route_id, route_type, slsmn_no, slsmn_name, truck_no, sls_hlp_no, helpr_name) {
this.route_id = route_id ;
this.route_type = route_type ;
this.slsmn_no = slsmn_no ;
this.slsmn_name = slsmn_name ;
this.truck_no = truck_no ;
this.sls_hlp_no = sls_hlp_no ;
this.helpr_name = helpr_name ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function sequObj(route_id, week, day, sequ_no, cust_no, serviced) {
this.route_id = route_id ;
this.week = week ;
this.day = day ;
this.sequ_no = sequ_no ;
this.cust_no = cust_no ;
this.serviced = serviced ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function suggObj(so_wk_no, so_day_no, cust_no, so_trnstyp, prod_no, order_qty) {
this.so_wk_no = so_wk_no ;
this.so_day_no = so_day_no ;
this.cust_no = cust_no ;
this.so_trnstyp = so_trnstyp ;
this.prod_no = prod_no ;
this.order_qty = order_qty ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function uchgObj(cust_no, tkt_no, dept_no, rpt_sect, tkt_amt, srvc_date, tkt_status, part_amt, part_date, status_chang) {
this.cust_no = cust_no ;
this.tkt_no = tkt_no ;
this.dept_no = dept_no ;
this.rpt_sect = rpt_sect ;
this.tkt_amt = tkt_amt ;
this.srvc_date = srvc_date ;
this.tkt_status = tkt_status ;
this.part_amt = part_amt ;
this.part_date = part_date ;
this.status_chang = status_chang ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

