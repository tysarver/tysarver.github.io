function tbagObj(route_id, tkt_no, bag_no, sequ_no, cust_no, vend_mach, vend_meter, net_amt, amt_in_bag, off_rte, curr_amt, coin_amt) {
this.route_id = route_id ;
this.tkt_no = tkt_no ;
this.bag_no = bag_no ;
this.sequ_no = sequ_no ;
this.cust_no = cust_no ;
this.vend_mach = vend_mach ;
this.vend_meter = vend_meter ;
this.net_amt = net_amt ;
this.amt_in_bag = amt_in_bag ;
this.off_rte = off_rte ;
this.curr_amt = curr_amt ;
this.coin_amt = coin_amt ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function tchkObj(route_id, cust_no, check_no, tkt_no, check_date, check_amt) {
this.route_id = route_id ;
this.cust_no = cust_no ;
this.check_no = check_no ;
this.tkt_no = tkt_no ;
this.check_date = check_date ;
this.check_amt = check_amt ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function tdsmObj(route_id, strt_date, strt_time, credit1, credit2, credit3, credit4, credit5, credit6, credit7, credit8, debit1, debit2, debit3, debit4, debit5, debit6, debit7, debit8, load_chg, changer, roa, expenses, nsf_chks, open_unauth, end_invt_val, rounding, conv_checks, conv_curr, conv_coin, fs_curr, fs_coin, fs_deposit, sls_amount, sls_deposit, sls_pr_disc, sls_taxes, rtn_amount, rtn_deposit, rtn_pr_disc) {
this.route_id = route_id ;
this.strt_date = strt_date ;
this.strt_time = strt_time ;
this.credit1 = credit1 ;
this.credit2 = credit2 ;
this.credit3 = credit3 ;
this.credit4 = credit4 ;
this.credit5 = credit5 ;
this.credit6 = credit6 ;
this.credit7 = credit7 ;
this.credit8 = credit8 ;
this.debit1 = debit1 ;
this.debit2 = debit2 ;
this.debit3 = debit3 ;
this.debit4 = debit4 ;
this.debit5 = debit5 ;
this.debit6 = debit6 ;
this.debit7 = debit7 ;
this.debit8 = debit8 ;
this.load_chg = load_chg ;
this.changer = changer ;
this.roa = roa ;
this.expenses = expenses ;
this.nsf_chks = nsf_chks ;
this.open_unauth = open_unauth ;
this.end_invt_val = end_invt_val ;
this.rounding = rounding ;
this.conv_checks = conv_checks ;
this.conv_curr = conv_curr ;
this.conv_coin = conv_coin ;
this.fs_curr = fs_curr ;
this.fs_coin = fs_coin ;
this.fs_deposit = fs_deposit ;
this.sls_amount = sls_amount ;
this.sls_deposit = sls_deposit ;
this.sls_pr_disc = sls_pr_disc ;
this.sls_taxes = sls_taxes ;
this.rtn_amount = rtn_amount ;
this.rtn_deposit = rtn_deposit ;
this.rtn_pr_disc = rtn_pr_disc ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function tmsgObj(route_id, cust_no, dept_no, msg_no, msg_type, cust_invc, prnt_grp, message, resp_type) {
this.route_id = route_id ;
this.cust_no = cust_no ;
this.dept_no = dept_no ;
this.msg_no = msg_no ;
this.msg_type = msg_type ;
this.cust_invc = cust_invc ;
this.prnt_grp = prnt_grp ;
this.message = message ;
this.resp_type = resp_type ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function tnamObj(route_id, cust_no, dept_no, bag_no, off_rte, price_date, order_date, bill_meth, prl_curr, prl_adj, more_ords, natl_tkt, prld_tkt, must_pay_cas, cmisc1, cmisc2, cmisc3, cmisc4, cmisc5, cmisc6, cmisc7, cmisc8) {
this.route_id = route_id ;
this.cust_no = cust_no ;
this.dept_no = dept_no ;
this.bag_no = bag_no ;
this.off_rte = off_rte ;
this.price_date = price_date ;
this.order_date = order_date ;
this.bill_meth = bill_meth ;
this.prl_curr = prl_curr ;
this.prl_adj = prl_adj ;
this.more_ords = more_ords ;
this.natl_tkt = natl_tkt ;
this.prld_tkt = prld_tkt ;
this.must_pay_cas = must_pay_cas ;
this.cmisc1 = cmisc1 ;
this.cmisc2 = cmisc2 ;
this.cmisc3 = cmisc3 ;
this.cmisc4 = cmisc4 ;
this.cmisc5 = cmisc5 ;
this.cmisc6 = cmisc6 ;
this.cmisc7 = cmisc7 ;
this.cmisc8 = cmisc8 ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function tnsrObj(route_id, cust_no, srvc_date, srvc_time, no_sale_skip, desc) {
this.route_id = route_id ;
this.cust_no = cust_no ;
this.srvc_date = srvc_date ;
this.srvc_time = srvc_time ;
this.no_sale_skip = no_sale_skip ;
this.desc = desc ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function tsanObj(route_id, cust_no, dept_no, hist_date, prmo_prc, rtl_units, rtl_price, net_qty, regis_sls, payout, profit, markup, edited) {
this.route_id = route_id ;
this.cust_no = cust_no ;
this.dept_no = dept_no ;
this.hist_date = hist_date ;
this.prmo_prc = prmo_prc ;
this.rtl_units = rtl_units ;
this.rtl_price = rtl_price ;
this.net_qty = net_qty ;
this.regis_sls = regis_sls ;
this.payout = payout ;
this.profit = profit ;
this.markup = markup ;
this.edited = edited ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function ttktObj(route_id, tkt_no, tkt_amt, tkt_type, cust_no, off_rte, pay_method, cash_amt, chks_amt, date, time, tot_in, tot_out, natl_tkt_no, misc_no) {
this.route_id = route_id ;
this.tkt_no = tkt_no ;
this.tkt_amt = tkt_amt ;
this.tkt_type = tkt_type ;
this.cust_no = cust_no ;
this.off_rte = off_rte ;
this.pay_method = pay_method ;
this.cash_amt = cash_amt ;
this.chks_amt = chks_amt ;
this.date = date ;
this.time = time ;
this.tot_in = tot_in ;
this.tot_out = tot_out ;
this.natl_tkt_no = natl_tkt_no ;
this.misc_no = misc_no ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function ttotObj(route_id, cust_no, dept_no, trans_id, tkt_no, cc_ot_no, exp_date, text, charge_amt, auth_no) {
this.route_id = route_id ;
this.cust_no = cust_no ;
this.dept_no = dept_no ;
this.trans_id = trans_id ;
this.tkt_no = tkt_no ;
this.cc_ot_no = cc_ot_no ;
this.exp_date = exp_date ;
this.text = text ;
this.charge_amt = charge_amt ;
this.auth_no = auth_no ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

