
function setJsSrcTs(srcNam, srcTs) {
	if (vStat.ar.jsTs == undefined) {
		vStat.ar.jsTs = {};
	}
	vStat.ar.js[srcNam] = srcTs;
}


function dispInitScrn(dispText) {
	document.getElementById("i_SectHdr").innerHTML = dispText;
	document.getElementById("i_SectSubHdr").innerHTML = "Please wait...";
	document.getElementById('vtLogonCntrOut').style.display = "none";
	document.getElementById('vtInitCount').style.display = "inline-block";
}



function vtInitChecks() {
	databaseExists("base", function (yesno) {
		if (yesno) {
			dispInitScrn('Opening');
			ptciDbfFuncs('Load', ptciLoadComplete);
		} else {
			// Logon Screen Displayed, accept info and submit to authVTUsrPwd()
			document.getElementById("i_SectSubHdr").innerHTML = "Login Required";
		}
	});
}


function databaseExists(dbname, callback) {
    var req = indexedDB.open(dbname);
    var existed = true;
    req.onsuccess = function () {
        req.result.close();
        if (!existed)
            indexedDB.deleteDatabase(dbname);
        callback(existed);
    }
    req.onupgradeneeded = function () {
        existed = false;
    }
}


function authVTUsrPwd(fData) {
	var usr = fData.userid.value;
	var pwd = fData.pswrd.value;
	var reqUrl = "https://aziom.com/V-Trax/" + fData.compid.value.toUpperCase() + "/ajax/rte2aws_v21.php";
	var combAry = [{ui: usr, ac: 140101, fn: 'su'}];
	xhrPromSendJsonObj(reqUrl, usr, pwd, combAry).then(function (data) {
		awsResp = JSON.parse(data);
		if (awsResp[1] == 0) {
			switch(awsResp[2]) {
				case 401:
					document.getElementById("i_result").innerHTML = "Invalid Username or Password";
					document.getElementById("vtLogin").reset();
					break;
				case 404:
					document.getElementById("i_result").innerHTML = "Invalid Company";
					document.getElementById("vtLogin").reset();
					break;
				default:
					break;
			}
		} else {
			vPreLoadUser = awsResp[2];
			vPreLoadUser.userac = pwd;
			dispInitScrn('Loading');
			ptciDbfFuncs('Load', ptciLoadComplete);
		}

    }).catch(function (error) {
		console.log(error);
    });
}


function dynSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


function padL(expr, len, pchar) {
  return pchar.repeat(len - expr.toString().length) + expr;
}


function padR(expr, len, pchar) {
  return  expr + pchar.repeat(len - expr.toString().length);
}


function zeroL(num,len) {
	return ('0000000000000000'+num).slice(-len);
}


function formatStrToPhone(phoneStr) {
	if (phoneStr.length == 10) {
		var retStr = phoneStr.substr(0,3) + '-' + phoneStr.substr(3,3) + '-' + phoneStr.substr(6);
	} else {
		var retStr = phoneStr;
	}
	return retStr;
}


function formatStrToZip(zipStr) {
	if (zipStr.length == 9) {
		var retStr = zipStr.substr(0,5) + '-' + zipStr.substr(5);
	} else {
		var retStr = zipStr;
	}
	return retStr;
}

function formatMiscLastUpdt() {
	var d = new Date(vDynm.re.misc.lastUpdt * 1000)
	var luDateTime =
		("00" + (d.getMonth() + 1)).slice(-2) + "/" +
		("00" + d.getDate()).slice(-2) + "/" +
		d.getFullYear() + " " +
		("00" + d.getHours()).slice(-2) + ":" +
		("00" + d.getMinutes()).slice(-2) + ":" +
		("00" + d.getSeconds()).slice(-2);
	return luDateTime;
}


// Sequencer to assure async tasks complete before required
function nextSeq() {
	++vDynm.ob.sequ.sequNo;
//	console.log("Sequ " + vDynm.ob.sequ.sequNo);
	vWork.ar.sequProc[vDynm.ob.sequ.sequNo]();
}


function ChangePage(NewPage) {
	NewUrl = NewPage + '.htm';
	window.location.replace (NewUrl);
	return
}


function ChangePageT(NewPage) {
	NewUrl = NewPage + '.htm';
	document.getElementById("i_StatLine").innerHTML = NewUrl;
	return
}


function InsertCsss(resp) {
	if (resp != undefined) {
	    var head = document.getElementsByTagName('head')[0];
	    var s = document.createElement('style');
	    s.setAttribute('type', 'text/css');
	    s.appendChild(document.createTextNode(resp.csContent));
	    head.appendChild(s);
	}
}


function DispNbContent(resp) {
	var newNbHtml = '';
	for (var idx1 = 1; idx1 <= 5; ++idx1) {
		var newVal = resp['nb' + idx1 + '_val'] || " ";
		newNbHtml += vCnst.el.navBarHtml1.replace("#", idx1);
		newNbHtml += vCnst.el.navBarHtml2.replace("llpp", resp['nb' + idx1 + '_new_box']);
		newNbHtml += vCnst.el.navBarHtml3.replace("newVal", newVal);
	}
	return newNbHtml;
}


function setNavBarDisabled(state) {
	var c = document.getElementsByClassName("NavButIn");
	for (var i=0;i<c.length;i++){
		c[i].disabled=state;
	}
}


function FindInsertHtml(resp) {
	var newC = '';
	var newN = '';
	if (resp != undefined) {
		vDynm.re.html = resp;
		if (resp.nbRef > 0) {
			sliceSdatAry(resp.nbRef);
			vWork.ar.sdat.map(function (o) {newN += o.scrContent});
		} else {
			newN = DispNbContent(resp);
		}
		document.getElementById("i_NavBar").innerHTML = newN;

		if (resp.htRef > 0) {
			sliceSdatAry(resp.htRef);
			vWork.ar.sdat.map(function (o) {newC += o.scrContent});
		} else {
			newC = "";
		}
		document.getElementById("i_MainDiv").innerHTML = newC;

		document.getElementById("i_SectHdr").innerHTML = resp.hdr_data;
		document.getElementById("i_SectSubHdr").innerHTML = resp.sub_hdr_data;
	} else {
		vDynm.re.html.ScrnIdx = -1;
	}
	// Don't save menu levels less than 1000
	if (vDynm.ob.disp.nextLevelPrompt < 1000) {
		CallJava();
	} else {
		putVGlobal2Idb(vDynm, storevDynmDone);
	}
	setNavBarDisabled(false);
}


function CallJava() {
	vDynm.ob.disp.currLevelPrompt = vDynm.ob.disp.nextLevelPrompt;
	var jN = vDynm.re.html.jsFuncName;
	var jA = vDynm.re.html.jsFuncArgs;

	if (vDynm.re.html.scrnIdx >= 0) {
		if (typeof window[jN] === "function") {
			if (jA == "") {
				window[jN]();
			} else {
				var argAry = jA.split(',');
				if (argAry.length > 0) {
					window[jN].apply(this, argAry);
				} else {
					window[jN]();
				}
			}
		}
	}
	if (vCnst.el.debugDispStatLine) {
		document.getElementById("i_StatLine").innerHTML = "Cur:" + vDynm.ob.disp.currLevelPrompt + " Pre:" + vDynm.ob.disp.prevLevelPrompt;
	}
}



function putVGlobal2Idb(vGlob, callback) {
	promPutRecNoKey(vWork.db.base.handle, 'vStor', vGlob).then(function (data) {
		callback(data);
    }).catch(function (error) {
      console.log(error);
    });
}


function putObj2IdbWork(store, obj) {
	promPutRecNoKey(vWork.db.work.handle, store, obj).then(function (data) {
//		console.log(store, ' Written');
    }).catch(function (error) {
      console.log(error);
    });
}


function putObj2IdbDnld(store, obj) {
	promPutRecNoKey(vWork.db.dnld.handle, store, obj).then(function (data) {
//		console.log(store, ' Written');
    }).catch(function (error) {
      console.log(error);
    });
}


function putObj2IdbUpld(store, obj) {
	promPutRecNoKey(vWork.db.upld.handle, store, obj).then(function (data) {
//		console.log(store, ' Written');
    }).catch(function (error) {
      console.log(error);
    });
}


function storevDynmDone() {
	putVGlobal2Idb(vStat, CallJava);
}


function scanForIp(callback) {
	vDynm.ar.ips = [];
	var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection; //compatibility for firefox and chrome
	var pc = new myPeerConnection({
			iceServers: []
		}),
		noop = function () {},
		localIPs = {},
		ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
		key;

	function ipIterate(ip) {
		if (!localIPs[ip]) {
			vDynm.ar.ips.push(ip);
		}
		localIPs[ip] = true;
	}
	pc.createDataChannel(""); //create a bogus data channel
	pc.createOffer(function (sdp) {
		sdp.sdp.split('\n').forEach(function (line) {
			if (line.indexOf('candidate') < 0) return;
			line.match(ipRegex).forEach(ipIterate);
		});
		pc.setLocalDescription(sdp, noop, noop);
	}, noop); // create offer and set local description
	pc.onicecandidate = function (ice) { //listen for candidate events
		if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
		ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
		callback();
	};
}


//function storevStatDone() {
//	CallJava();
//}


function boxChange(newLevel) {
	setNavBarDisabled(true);

	vDynm.ob.disp.prevLevelPrompt = vDynm.ob.disp.currLevelPrompt;
	vDynm.ob.disp.nextLevelPrompt = newLevel;

	promFetchRec(vWork.db.ctrl.handle, 'csss', newLevel).then(InsertCsss).catch(console.log);
	promFetchRec(vWork.db.ctrl.handle, 'html', newLevel).then(FindInsertHtml).catch(console.log);
}


function setScreenScale(newScale) {
	var viewport = document.querySelector("meta[name=viewport]");
	viewport.setAttribute('content', 'width=320, initial-scale=' +  newScale + ', minimum-scale=' + newScale + ', user-scalable=0');
	vDynm.ob.disp.scale = newScale;
}


function chkZoomIncr() {
	var dw1 = window.innerWidth;
	var dh1 = window.innerHeight;
	var newIncr = 0;

	inDecrW = Math.round(dw1 / ((vDynm.ob.disp.scale * 10) + 1 ));
	inDecrH = Math.round(dh1 / ((vDynm.ob.disp.scale * 10) + 1 ));

	outIncrW = Math.round(dw1 / ((vDynm.ob.disp.scale * 10) - 1 ));
	outIncrH = Math.round(dh1 / ((vDynm.ob.disp.scale * 10) - 1 ));

	if ((dw1 - inDecrW) >= 320 && (dh1 - inDecrH) >= 490 && vDynm.ob.disp.scale < 3) {
		newIncr = 0.1;
	}

	if (dw1 < 320 || dh1 < 490 && vDynm.ob.disp.scale > .6) {
		newIncr = -0.1;
	}
	return newIncr;
}


function setCurrDowAndTxt() {
	var d = new Date( Date.now() - 24*60*60*1000 );	// Scale day of week (Sun:0 - 6) back 1 to index (Mon:0-8);
	vDynm.ob.csrv.currDow = d.getDay();
	vDynm.ob.csrv.currDowTxt = vCnst.ar.weekDayTxt[vDynm.ob.csrv.currDow];
}


function memAvail() {
	navigator.webkitTemporaryStorage.queryUsageAndQuota (
	    function (usedBytes, grantedBytes) {
	        console.log('we are using ', usedBytes, ' of ', grantedBytes, 'bytes');
	    },
	    function (e) { console.log('Error', e);  }
	);
}

function displayWindowSize() {
	vDynm.ob.disp.screenOrient = (window.innerWidth > window.innerHeight)? 'L' : 'P';
	var changeScale = 0;

	if (vDynm.ob.disp.screenOrient == 'L' && vDynm.ob.disp.scrnLandW != 0) {
		changeScale = vDynm.ob.disp.scrnLandS;
		if (window.innerHeight < (vDynm.ob.disp.scrnLandH * 0.6)) {
			document.getElementById('i_StatLine').hidden=true;
		} else {
			document.getElementById('i_StatLine').hidden=false;
		}
	}

	if (vDynm.ob.disp.screenOrient == 'P' && vDynm.ob.disp.scrnPortW != 0) {
		changeScale = vDynm.ob.disp.scrnPortS;
		if (window.innerHeight < (vDynm.ob.disp.scrnPortH * 0.7)) {
			document.getElementById('i_StatLine').hidden=true;
		} else {
			document.getElementById('i_StatLine').hidden=false;
		}
	}

	if (changeScale == 0) {
		var incrScale = chkZoomIncr();
		if (incrScale == 0) {
			if (vDynm.ob.disp.screenOrient == 'L') {
				if (vDynm.ob.disp.scrnLandW == 0) {
					vDynm.ob.disp.scrnLandW = window.innerWidth;
					vDynm.ob.disp.scrnLandH = window.innerHeight;
					vDynm.ob.disp.scrnLandS = vDynm.ob.disp.scale;
				}
			} else {
				if (vDynm.ob.disp.scrnPortW == 0) {
					vDynm.ob.disp.scrnPortW = window.innerWidth;
					vDynm.ob.disp.scrnPortH = window.innerHeight;
					vDynm.ob.disp.scrnPortS = vDynm.ob.disp.scale;
				}
			}
//			setHistBoxBot();
		} else {
			setScreenScale(vDynm.ob.disp.scale + incrScale);
		}
	} else {
		setScreenScale(changeScale);
	}
}


function relateBld2Ary(prodNo) {
	if (vStat.al.bld2.length < 1) {
		vDynm.re.bld2 = new ilodObj();
		return -2;
	}

	var cP = vStat.ix.bld2.indexOf(prodNo);
	if (cP < 0) {
		console.log("prodNo not in BLD2");
		vDynm.re.bld2 = {prod_no:0, load_qty:0};
	} else {
		vDynm.re.bld2 = JSON.parse(JSON.stringify(vStat.al.bld2[cP]));
	}
	return cP;
}


function relateCdatAry(transId) {
	var cP = vStat.ix.cdat.indexOf(transId);
	if (cP < 0) {
		console.log("trans_id not in CDAT");
		vDynm.re.cdat = new cdatObj(transId, "Not in Index");
	} else {
		vDynm.re.cdat = JSON.parse(JSON.stringify(vStat.al.cdat[cP]));
	}
	return cP;
}


function relateIlodAry(transId, prodNo) {
	var cP = vStat.al.ilod.findIndex(function (e) { if (e.trans_id == transId && e.prod_no == prodNo) {return true}; });
	if (cP < 0) {
		vDynm.re.ilod = new ilodObj(vDynm.re.rhdr.route_id, transId, prodNo, 0);
		cP = vStat.al.ilod.push(vDynm.re.ilod) - 1;
	} else {
		vDynm.re.ilod = JSON.parse(JSON.stringify(vStat.al.ilod[cP]));
	}
	return cP;
}


function relatePgrpAry(pgrpNo) {
	var cP = vStat.ix.pgrp.indexOf(pgrpNo);
	if (cP < 0) {
		console.log(pgrpNo + " not in PGRP");
		vDynm.re.pgrp = new pgrpObj(pgrpNo, "Not in Index");
	} else {
		vDynm.re.pgrp = JSON.parse(JSON.stringify(vStat.al.pgrp[cP]));
	}
	return cP;
}


function relateCustAry(custNo) {
	var cP = vStat.al.cust.findIndex(function (e) { if (e.cust_no == custNo) {return true}; });
	if (cP < 0) {
		console.log(custNo + " not in cust");
		vDynm.re.cust = new custObj(vDynm.re.cust.cust_no);
	} else {
		vDynm.re.cust = JSON.parse(JSON.stringify(vStat.al.cust[cP]));
	}
	return cP;
}


function relateDeptAry(deptNo) {
	var cP = vStat.al.dept.findIndex(function (e) { if (e.cust_no == vDynm.re.cust.cust_no && e.dept_no == deptNo) {return true}; });
	if (cP < 0) {
		console.log(deptNo + " not in dept");
		vDynm.re.dept = new deptObj(vDynm.re.cust.cust_no, deptNo, "Company");
	} else {
		vDynm.re.dept = JSON.parse(JSON.stringify(vStat.al.dept[cP]));
	}
	return cP;
}


function relateEprmAry(promoNo) {
	var cP = vStat.al.eprm.findIndex(function (e) { if (e.promo_no == promoNo) {return true}; });
	if (cP < 0) {
		console.log(promoNo + " not in eprm");
		vDynm.re.eprm = new eprmObj(promoNo, 0, 0, 0, "Not in Index");
	} else {
		vDynm.re.eprm = JSON.parse(JSON.stringify(vStat.al.eprm[cP]));
	}
	return cP;
}


function relateProdAry(prodNo) {
	var cP = vStat.ix.prod.indexOf(prodNo);
	if (cP < 0) {
		console.log(prodNo + " not in PROD");
		vDynm.re.prod = new prodObj(prodNo, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "Not in Index");
	} else {
		vDynm.re.prod = JSON.parse(JSON.stringify(vStat.al.prod[cP]));
	}
	return cP;
}


function relateInvtAry(prodNo) {
	var cP = vStat.ix.invt.indexOf(prodNo);
	if (cP < 0) {
//		console.log(prodNo + " not in INVT");
		vDynm.re.invt = new invtObj(vDynm.re.rhdr.route_id,prodNo,0,vDynm.re.prod.prod_grp,0,0,0,0,0,0,0,0);
		cP = vStat.al.invt.push(vDynm.re.invt) -1;
		vStat.ix.invt.push(prodNo);
	} else {
		vDynm.re.invt = JSON.parse(JSON.stringify(vStat.al.invt[cP]));
	}
	return cP;
}


function relateRdatAryTF(scrLine) {
	var cP = vStat.ix.rdat.indexOf(scrLine);
	if (cP < 0) {
		vDynm.re.rdat = new rdatObj(scrLine, "", "");
		return false;
	}
	vDynm.re.rdat = JSON.parse(JSON.stringify(vStat.al.rdat[cP]));
	return true;
}


function relatePlstAry(prod_no) {
	var cP = vStat.al.plst.findIndex(function (e) { if (e.prod_no == prod_no) {return true}; });
	if (cP < 0) {
		vDynm.re.plst = new plstObj(vDynm.re.cust.prce_zone, prod_no, vDynm.re.prod.sell_prc_1);
	} else {
		vDynm.re.plst = JSON.parse(JSON.stringify(vStat.al.plst[cP]));
	}
	return cP;
}


function relateRetlAry(prod_no) {
	var cP = vStat.al.retl.findIndex(function (e) { if (e.prod_no == prod_no) {return true}; });
	if (cP < 0) {
		vDynm.re.retl = new retlObj(vDynm.re.cust.cust_no, prod_no, 0, 0);
	} else {
		vDynm.re.retl = JSON.parse(JSON.stringify(vStat.al.retl[cP]));
	}
	return cP;
}


function relateRlstAry(route_id) {
	var cP = vStat.ix.rlst.indexOf(route_id);
	if (cP < 0) {
		console.log(route_id + " not in rlst");
		vDynm.re.rlst = new rlstObj(route_id, "", 0, "Not in Index");
	} else {
		vDynm.re.rlst = JSON.parse(JSON.stringify(vStat.al.rlst[cP]));
	}
	return cP;
}


function relateSdatAry(sI, sL) {
	if (typeof(sL)=="undefined") {
		sL = 0;
	}
	var badText = "Bad Sdat Nesting";
	for (var i=1; i<9; i++){
		var cP = vStat.al.sdat.findIndex(function (e) { if (e.scrIdx == sI && e.scrLine	== sL) {return true}; });

		if (cP < 0) {
			badText = "No Sdat Index";
			break;
		}
		tS = vStat.al.sdat[cP];
		if (tS.scrRef == "") {
			vDynm.re.sdat = JSON.parse(JSON.stringify(tS));
			return cP;
		} else {
			var reDir = ('' + tS.scrRef).split(':');
			if (reDir.length > 2) {
				badText = "Bad Sdat Linkage";
				break;
			}
			if (reDir.length == 2) {
				sI = reDir[0];
				sL = reDir[1];
			} else {
				sI = reDir[0];
				sL = 0;
			}
		}
	}

	console.log(sI + ':' + sL + ' ' + badText);
	vDynm.re.sdat = new sdatObj(sI, sL, badText, badText);
	return -1;
}


function relateTcdtAry(deptNo, transId, prodNo) {
	var cP = vWork.al.tcdt.findIndex(function (e) { if (e.dept_no == deptNo && e.trans_id == transId && e.prod_no == prodNo) {return true}; });
	if (cP < 0) {
		vDynm.re.tcdt = {dept_no: deptNo, transId: transId, prod_no: prodNo}
		return cP;
	}
	vDynm.re.tcdt = JSON.parse(JSON.stringify(vWork.al.tcdt[cP]));
	return cP;
}


function relateTchdAry(deptNo, rptSect) {
	var cP = vWork.al.tchd.findIndex(function (e) { if (e.dept_no == deptNo && e.rpt_sect == rptSect) {return true}; });
	if (cP < 0) {
		if (vDynm.re.dept.dept_no != deptNo) {
			relateDeptAry(deptNo);
		}
		vDynm.re.tchd = new tchdObj(0, deptNo,  vDynm.re.dept.dept_desc, rptSect, vCnst.ar.rptSectStrs[rptSect]);
		cP = vWork.al.tchd.push(vDynm.re.tchd) - 1;
	} else {
		vDynm.re.tchd = JSON.parse(JSON.stringify(vWork.al.tchd[cP]));
	}
	return cP;
}


function sliceSdatAryORIGINAL(scrIdx) {
	var sA = vStat.al.sdat;
	var nA = [];
	var cP = sA.findIndex(function (e) { if (e.scrIdx == scrIdx) {return true}; });
	if (cP < 0) {
		console.log(scrIdx + " not in sdat");
		vDynm.re.sdat = new sdatObj(scrIdx, 0, "Not in Index", "Not in Index");
		return cP;
	}

	for (var idx = cP; idx < sA.length && sA[idx].scrIdx == scrIdx; ++idx) {



		nA.push(sA[idx]);
	}
	vWork.ar.sdat = JSON.parse(JSON.stringify(nA));
	return nA.length;
}


function sliceSdatAry(scrIdx) {
	var sA = vStat.al.sdat;
	var nA = [];
	var fA = sA.filter(function (e) { if (e.scrIdx == scrIdx) {return true}; });
	if (fA.length == 0) {
		console.log(scrIdx + " not in sdat");
		vDynm.re.sdat = new sdatObj(scrIdx, 0, "Not in Index", "Not in Index");
		return 0;
	}

	fA.map(function (e){relateSdatAry(e.scrIdx, e.scrLine);nA.push(vDynm.re.sdat);});

	vWork.ar.sdat = JSON.parse(JSON.stringify(nA));
	return nA.length;
}


function idxSetIpDom() {
	var iD = document.getElementById('i_OnOffLine');
	if (iD) {
		iD.innerText = vWork.ob.ip.type;
		iD.style.backgroundColor = vWork.ob.ip.clr;
	}
}


function idxOnlineChange() {
	function checkNewIP(ip) {
		if (vDynm.ar.ips.length > 0) {
			for(i=0;i<vDynm.ar.ips.length;i++) {
				var e = vDynm.ar.ips[i];
				if (e.substr(0,7) == '192.168') {
					vWork.ob.ip.type = 'w';
					vWork.ob.ip.addr = e;
					break;
				} else {
					vWork.ob.ip.type = 'c';
					vWork.ob.ip.addr = e;
				}
			}
		}
		idxSetIpDom()
	}

	var iD = document.getElementById('i_OnOffLine');
	if (navigator.onLine) {
		vWork.ob.ip.type = 'o';
		vWork.ob.ip.clr = 'green';
		scanForIp(checkNewIP);
	} else {
		vWork.ob.ip.clr = 'red';
		vWork.ob.ip.addr = '0.0.0.0';
		vWork.ob.ip.type = 'x';
		vDynm.ar.ips = ['0.0.0.0'];
		idxSetIpDom()
	}
}


//
//	On Load of JS includes
//	Needs to be moved
//
vDynm.ob.disp.scale = 1;

if (typeof window.orientation !== 'undefined')	{
	vDynm.ob.sequ.mobileDevice = true;
	window.onresize = displayWindowSize;
	displayWindowSize();
} else {
	vDynm.ob.sequ.mobileDevice = false;
}


function pushHistHashStay() {
	var history_api = typeof history.pushState !== 'undefined';
	if ( history_api ) history.pushState(null, '', '#stay')
	  else location.hash = '#stay'
}

pushHistHashStay();

window.onhashchange = function() {
	pushHistHashStay();
}

// Negative or postive round to next highest presion based on absolute
/*
function fixTF(num, pres) {
	var eX = Math.pow(10, pres);
	if (num < 0) {
		var nA = Math.abs(num);
		str = Math.round(nA*eX) / (eX) *-1;
	} else {
		str = Math.round(num*eX) / (eX);
	}
	return str+"";
}
*/



// Change the Hist Sect Box to height one pixel above the StatLine
// Scroll content down one pixel to prevent accidental "pull-down refresh"
/*
function setHistBoxBot() {
	if (document.getElementById('i_csHistSect') != null) {
		var iEle = document.getElementById('i_StatLine');
		var iTop = iEle.getBoundingClientRect().top;
		var hEle = document.getElementById('i_csHistSect');
		var hTop = hEle.getBoundingClientRect().top;
		var newH = Math.trunc(iTop - 1 - hTop);
		document.querySelector(".csHistSect").style.height=newH+"px";
		if (hEle.scrollTop == 0) {
			hEle.scrollTop = 1;
		}
	}
}
*/
