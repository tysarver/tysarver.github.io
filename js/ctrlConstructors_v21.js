function cdatObj(trans_id, trans_name, menu_id, screen_id, report_id, rpt_sect, dup_rec_id, debit_credit, upload_id, load_id, load_ctrl, load_updt, prod_list_ty, prod_invt_ty, min_type, max_type, qpmt_level, check_proc, override, price_proc, disc_ctrl, price_ctrl, promo_disc, pword_level, mod_tdsm, mod_fld1, mod_fld2, diff_idx, main_invt, use_tkt, misc_id, misc_ctrl) {
this.trans_id = trans_id ;
this.trans_name = trans_name ;
this.menu_id = menu_id ;
this.screen_id = screen_id ;
this.report_id = report_id ;
this.rpt_sect = rpt_sect ;
this.dup_rec_id = dup_rec_id ;
this.debit_credit = debit_credit ;
this.upload_id = upload_id ;
this.load_id = load_id ;
this.load_ctrl = load_ctrl ;
this.load_updt = load_updt ;
this.prod_list_ty = prod_list_ty ;
this.prod_invt_ty = prod_invt_ty ;
this.min_type = min_type ;
this.max_type = max_type ;
this.qpmt_level = qpmt_level ;
this.check_proc = check_proc ;
this.override = override ;
this.price_proc = price_proc ;
this.disc_ctrl = disc_ctrl ;
this.price_ctrl = price_ctrl ;
this.promo_disc = promo_disc ;
this.pword_level = pword_level ;
this.mod_tdsm = mod_tdsm ;
this.mod_fld1 = mod_fld1 ;
this.mod_fld2 = mod_fld2 ;
this.diff_idx = diff_idx ;
this.main_invt = main_invt ;
this.use_tkt = use_tkt ;
this.misc_id = misc_id ;
this.misc_ctrl = misc_ctrl ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function csssObj(scrnIdx, csContent) {
this.scrnIdx = scrnIdx ;
this.csContent = csContent ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function htmlObj(scrnIdx, jsFuncName, jsFuncArgs, nbRef, htRef, slRef, hdr_data, sub_hdr_data, nb1_val, nb1_new_box, nb2_val, nb2_new_box, nb3_val, nb3_new_box, nb4_val, nb4_new_box, nb5_val, nb5_new_box) {
this.scrnIdx = scrnIdx ;
this.jsFuncName = jsFuncName ;
this.jsFuncArgs = jsFuncArgs ;
this.nbRef = nbRef ;
this.htRef = htRef ;
this.slRef = slRef ;
this.hdr_data = hdr_data ;
this.sub_hdr_data = sub_hdr_data ;
this.nb1_val = nb1_val ;
this.nb1_new_box = nb1_new_box ;
this.nb2_val = nb2_val ;
this.nb2_new_box = nb2_new_box ;
this.nb3_val = nb3_val ;
this.nb3_new_box = nb3_new_box ;
this.nb4_val = nb4_val ;
this.nb4_new_box = nb4_new_box ;
this.nb5_val = nb5_val ;
this.nb5_new_box = nb5_new_box ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

function sdatObj(scrIdx, scrLine, scrRef, height, scrContent) {
this.scrIdx = scrIdx ;
this.scrLine = scrLine ;
this.scrRef = scrRef ;
this.height = height ;
this.scrContent = scrContent ;
this.modified = 0;this.ut_mod = Math.floor(Date.now());
}

