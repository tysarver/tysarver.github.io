/*
  Copyright (c) 2016 Aziom, Inc. All rights reserved.
*/



function ptciPickLog(mesg, id)	{
	console.log(mesg);
	if (typeof(id)=="undefined" || document.getElementById(id) == null)  {
	   	i_StatLine.innerHTML = mesg;
	} else {
		document.getElementById(id).innerHTML = mesg;
	}
}


function ptciCheckFillDb() {
	--vDynm.ob.sequ.ActDbFills;
	if (vDynm.ob.sequ.ActDbFills == 0) {
		ptciNextJob();
	}
}


function ptciUpdtStluTStamp(tbl2get, tblUpdtTime) {
	if (vWork.db.base.handle != null) {
		var transaction = vWork.db.base.handle.transaction("stlu", "readwrite");
		var store = transaction.objectStore("stlu");

		store.get(tbl2get).onsuccess = function (event) {
			stluRec = event.target.result;
			stluRec.last_updt = tblUpdtTime;
			var request = store.put(stluRec);

			request.onsuccess = function (e) {
			};

			request.onerror = function (e) {
				ptciPickLog(e.value);
			};
		}
	}
}


// Build vDynm object from record in IDB
function ptciOneRec2vDynm(dbtxt, tbl, keyPath, inJob) {
	db = vWork.db[dbtxt].handle;
	promFetchRec(db, tbl, keyPath).then(function (data) {
		if (typeof(data) != "undefined") {
			vDynm.re[tbl] = data;
			if (inJob) {
				ptciNextJob();
			}
		} else {
	      console.log(tbl, "has no data");
		}
    }).catch(function (error) {
      console.log(error);
    });
}


// Update MISC store with data from MISC object
function ptciObj2Misc() {
	if (vWork.db.base.handle != null) {
		var transaction = vWork.db.base.handle.transaction("misc", "readwrite");
		var store = transaction.objectStore("misc");

		store.get(0).onsuccess = function (event) {
			miscRec = event.target.result;
			var request = store.put(vDynm.re.misc);

			request.onsuccess = function (e) {
			};

			request.onerror = function (e) {
				ptciPickLog(e.value);
			};
		}
	}
}


// Set curr update time and save to misc store
function ptciSaveCurrUpdtTime()	{
	vDynm.re.misc.lastUpdt = vDynm.re.misc.currUpdt;
	ptciObj2Misc();
	ptciNextJob();
}


// Insert a record into STLU with minimum timestamp if does not exist
function ptciPutStluRec(pStore, pTname) {
	var stluReq = pStore.get(pTname);
	stluReq.onsuccess = function (stluEvt) {
	    var cursor = stluEvt.target.result;
	    if (!cursor) {
			pStore.put({ tbl_name: pTname, last_updt: 1234567890 });
		}
	}
}


// Copy and insert any records from STBL array not in STLU store
function ptciStbl2stlu() {
	var stluXact 		= vWork.db.base.handle.transaction("stlu", "readwrite");
	stluXact.oncomplete = function (e) {
		ptciNextJob();
		};
	var stluStore 		= stluXact.objectStore("stlu");

	for (var i=0;i<vDynm.ar.stblAry.length;i++)	{
		ptciPutStluRec(stluStore, vDynm.ar.stblAry[i].tbl_name);
	}
}


// Read store contents and store to array
function ptciStore2Ary(srcStore, destAry) {
	destAry.length = 0;
	try {
		var transaction = vWork.db.base.handle.transaction(srcStore);
		transaction.oncomplete = function (e) { ptciNextJob(); };
		var store = transaction.objectStore(srcStore);
		var request = store.openCursor();
		request.onsuccess = function (evt) {
		    var cursor = evt.target.result;
		    if (cursor) {
			    destAry.push(cursor.value);
		        cursor.continue();
			}
		};
	}
	catch(e){
		ptciPickLog(e);
	}
}


// Store the XHR Json results to specified store
function ptciModifyFromJson(dbHandle, tbl2get, jsonAry)	{
	if ( jsonAry[2].length == 0 ) {
		ptciCheckFillDb();
		return true;
	}

	var jsonObj = jsonAry[2];
	var NumRecs = jsonObj.length;

	if (NumRecs != 0) {
		var transaction = dbHandle.transaction(tbl2get, "readwrite");
		transaction.oncomplete = function (e) {
			if (tbl2get != 'stlu') {
				console.log(tbl2get + ': new data in store');
				vDynm.ar.dnld.push({tbl:tbl2get, dt:vDynm.re.misc.currUpdt});
			}
			ptciCheckFillDb();
		};
		var store = transaction.objectStore(tbl2get);

		vDynm.ar.tblFillAry[tbl2get] = {fillcnt: 0, tbllen: jsonObj.length};

		if (dbHandle != null) {
			for (var i=0;i<NumRecs;i++)	{
				var request = store.put(jsonObj[i]);		// Replace if unique key exists
				request.onsuccess = function (e) {
					vDynm.ar.tblFillAry[tbl2get].fillcnt++;
				};

				request.onerror = function (e) {
					ptciPickLog(e.value);
				};
			}
		return true;
		}
	}
}

/* Convert AWS string key into IDB key variable or array key
'123'		123
'sidx'		'sidx'

'123:456'	[123,456]
'sidx:tbl'	['sidx','tbl']

'sidx:123'	['sidx',123]
*/
function awsStrToIdbKey(awsStr) {
	if (isNaN(awsStr)) {
	// Contains Alpha Chars
		if (awsStr.indexOf(':') > -1) {
		// Array
			var strAry = awsStr.split(":");
			var idbKey = strAry.map(function (e){ if (isNaN(e)) {return e} else {return Number(e) } });
		} else {
		// Single Alpha
			var idbKey = awsStr;
		}
	} else {
	// Single numeric, possibly quoted
		var idbKey = awsStr * 1;
	}
	return idbKey;
}


function ptciDeleteFromJson(dbHandle, tbl2get, jsonAry) {
	console.log(tbl2get + ': Found recs to delete');
	var delProcAry = [];
	jsonAry[1].map(function (tblPath){
		delProcAry.push(new Promise(function (resolve, reject) {
			var tstore = dbHandle.transaction(tbl2get, "readwrite").objectStore(tbl2get);
			var delKey = awsStrToIdbKey(tblPath.key_path);
			var request = tstore.delete(delKey);
			request.error = function (event) {
				reject(event.target.error);
			};
			request.onsuccess = function (event) {
//				console.log("deleted:" + tblPath.key_path);
				resolve(event.target.result);
			};
		}) 	);
	});

	Promise.all(delProcAry).then(function (value) {
		ptciModifyFromJson(dbHandle, tbl2get, jsonAry);
	}, function (reason) {
	  console.log("reason", reason)
	});
}


function ptciFillTbl(dbHandle, tbl2get, lastUpdt)	{
	if (navigator.onLine) {
		++vDynm.ob.sequ.ActDbFills;
		var xmlhttp = new XMLHttpRequest();
	    var authHeader = "Basic " + btoa(vDynm.re.misc.userInfo.userid + ":" + vDynm.re.misc.userInfo.userac);

		xmlhttp.onreadystatechange = function () {
		    if (xmlhttp.readyState == 4)	{
				if (xmlhttp.status == 200) {
					ptciPickLog("Table: " + tbl2get, "i_logon_proc");
					var jsonAry=JSON.parse(xmlhttp.responseText);
					if ( jsonAry[1].length == 0 ) {
						ptciModifyFromJson(dbHandle, tbl2get, jsonAry);
					} else {
						ptciDeleteFromJson(dbHandle, tbl2get, jsonAry);
					}

					var hostDT  = jsonAry[0][0];
					if (dbHandle.name != 'base') {
						ptciUpdtStluTStamp(tbl2get, hostDT);
						vDynm.re.misc.currUpdt = hostDT;
						ptciObj2Misc();
					}
				} else {
					ptciPickLog('Offline !200 : ' + xmlhttp.status);
					vDynm.ob.sequ.ActDbFills = 0;
					ptciNextJob();
					return;
				}
		    } else {
//				console.log("Ready State: ", xmlhttp.readyState);
			}

		};

		xmlhttp.onerror = function () {
			console.log("XHR Error");
		};

		xmlhttp.open("GET","https://aziom.com/V-Trax/GJH/ajax/aws2rte_v22.php?tb="+tbl2get+"&ui="+vDynm.re.misc.userInfo.userid+"&lu="+lastUpdt+"&ac="+vDynm.re.misc.aCode);
		xmlhttp.setRequestHeader("Authorization", authHeader);

		xmlhttp.send();
	} else {
		ptciPickLog('Navigator Offline');
		vDynm.ob.sequ.ActDbFills = 0;
		ptciNextJob();
	}
}


// Fill each store in specified database
function ptciFillTblsInDb(db2Fill, dbHandle) {
	++vDynm.ob.sequ.ActDbFills;			// Extra increment. handles no new table in db. Forces final call below to launch next job
	for (var i=0;i<vDynm.ar.stblAry.length;i++)	{
		if (vDynm.ar.stblAry[i].db_name == db2Fill && vDynm.ar.stblAry[i].ut_dnld >= vDynm.re.misc.lastUpdt) {
			var tTblName = vDynm.ar.stblAry[i].tbl_name;
			ptciFillTbl(dbHandle, tTblName, vDynm.ar.stluAry[i].last_updt);
		}
	}
	ptciCheckFillDb();
}


//	Return array of prinmary index field names from sidx or the single field named passed
function ptciBldPriKeyAryNames(tbl, idxName) {
	var iAry = vStat.al.sidx.filter(function (o) { return o.tbl_name == tbl && o.idx_name == 'PRIMARY'})
	if (iAry.length == 0) return idxName;
	return iAry.map(function (o){return o.fld_name});
}


//	Creat store indexes from non-primary recs in sidx
function ptciBldSecIndexes(tbl, newStore) {
	var iAry = vStat.al.sidx.filter(function (o) { return o.tbl_name == tbl && o.idx_name != 'PRIMARY'})
	if (iAry.length == 0) return;

	var iNam = "";
	var fldAry = [];
	iAry.map( function (tObj) {
		iNam = "not set";
		var tIdxLvl = tObj.idx_level;

		if ( tIdxLvl != (fldAry.length+1)) {
			newStore.createIndex(iNam, fldAry, { unique: false });
			fldAry = [];
		}
		iNam = tObj.idx_name;
		fldAry.push(tObj.fld_name);
	});
	newStore.createIndex(iNam, fldAry, { unique: false });
	return;
}


// Open base database and load VT-Trax structure control stores
function ptciOpenBaseDb()	{
	if (vWork.db.base == undefined) {
		vWork.db.base = {};
		vWork.db.base.orq = {};
//		vWork.db.base.dbName = "base_" + vDynm.re.misc.userInfo.version[1] + vDynm.re.misc.userInfo.version[3];
		vWork.db.base.dbName = "base_";
	}

	// No looking back. Version = 3 (Three tables:Misc, Stbl & Sstr)
	// BIG IF: Additional Tables OR Delete / Recreate Indexes would move Version to 4+
	vWork.db.base.orq.openReq = indexedDB.open("base", 3);

	vWork.db.base.orq.openReq.onerror = function (event) {
		alert("Database error: " + event.target.errorCode);
	};

	vWork.db.base.orq.openReq.onupgradeneeded = function () {
	    ptciPickLog("Upgrading base");
	  // The database did not previously exist, so create object stores and indexes.
		vWork.db.base.handle = vWork.db.base.orq.openReq.result;

		var miscStore = vWork.db.base.handle.createObjectStore('misc', {keyPath: 'miscIdx'});
		miscStore.add({ miscIdx: 0, lastUpdt: 1234567890, currUpdt: 1234567890, lastMdat: 0, lastScrn: 0, userInfo: vPreLoadUser, aCode: 140101 });

		var vStorStore = vWork.db.base.handle.createObjectStore('vStor', {keyPath: 'vStorIdx'});
		vStorStore.add(vCnst);

		var stblStore = vWork.db.base.handle.createObjectStore('stbl', {keyPath: 'tbl_name'});
//		stblStore.createIndex('dbNamIdx', 'db_name', { unique: false });

		var stluStore = vWork.db.base.handle.createObjectStore('stlu', {keyPath: 'tbl_name'});
		stluStore.createIndex('luIdx', 'last_updt', { unique: false });

		var sstrStore = vWork.db.base.handle.createObjectStore('sstr', {keyPath: ['tbl_name','fld_num']});
		sstrStore.createIndex('si_tf', ['tbl_name', 'fld_name'], { unique: true });

		var sidxStore = vWork.db.base.handle.createObjectStore('sidx', {keyPath: ['db_name' ,'tbl_name', 'idx_name', 'idx_level']});
		sidxStore.createIndex('si_tii', ['tbl_name', 'idx_name', 'idx_level'], { unique: true });
	};

	vWork.db.base.orq.openReq.onblocked = function (event) {
	  // If some other tab is loaded with the database, then it needs to be closed before we can proceed.
		alert("Please close other tabs using this app.\nThen refresh to try again.");
	};

	vWork.db.base.orq.openReq.onsuccess = function () {
		vWork.db.base.handle = vWork.db.base.orq.openReq.result;
		ptciNextJob();
	};
}


//	Open VT database (CTRL, DNLD, UPLD) - Create store structures if version change or first run
function ptciOpenVtDb(dbNam)	{
	if (vWork.db[dbNam] == undefined) {
		vWork.db[dbNam] = {};
		vWork.db[dbNam].orq = {};
		vWork.db[dbNam].dbName = dbNam;
	}
	vWork.db[dbNam].orq.openReq = indexedDB.open(vWork.db[dbNam].dbName, 3);

	vWork.db[dbNam].orq.openReq.onupgradeneeded = function () {
		ptciPickLog("Upgrading " + vWork.db[dbNam].dbName);
		vWork.db[dbNam].handle = vWork.db[dbNam].orq.openReq.result;
		var newKey = new Object();
		for (var i=0;i<vDynm.ar.stblAry.length;i++)	{
			if (vDynm.ar.stblAry[i].db_name == vWork.db[dbNam].dbName) {
				var tTblName = vDynm.ar.stblAry[i].tbl_name;
				var idxName	 = vDynm.ar.stblAry[i].idx_name;

				newKey.keyPath=ptciBldPriKeyAryNames(tTblName, idxName);
				newKey.autoIncrement = false;
				var newStore = vWork.db[dbNam].handle.createObjectStore(tTblName, newKey);
				if (dbNam == 'upld') {
					newStore.createIndex("luIdx", "ut_upld", { unique: false });
					newStore.createIndex("modIdx", "ut_mod", { unique: false });
				}
				ptciBldSecIndexes(tTblName, newStore);
			}
		}
	};

	vWork.db[dbNam].orq.openReq.onblocked = function (event) {
	  // If some other tab is loaded with the database, then it needs to be closed before we can proceed.
		alert("Please close other tabs using this app.\nThen refresh to try again.");
	};

	vWork.db[dbNam].orq.openReq.onsuccess = function () {
		vWork.db[dbNam].handle = vWork.db[dbNam].orq.openReq.result;
		ptciNextJob();
	};
}


// Fetch sidx store and replace into array, then release next Job
function ptciSidxToStat() {
	promFetchAll(vWork.db.base.handle, 'sidx').then(function (datAry) {
		vStat.al.sidx = datAry;
		ptciNextJob();
    }).catch(function (error) {
	   	console.log(error);
    });
}


// Fetch specified store and replace into array
function ptciStoreToStat(o) {
	var dbHandle = vWork.db[o.db].handle;
	var tbl = o.store;
	var tIdx = o.idx;
	promFetchAll(dbHandle, tbl).then(function (datAry) {
		vStat.al[tbl] = datAry;
		if (o.idx != '') {
			vStat.ix[tbl] = vStat.al[tbl].map(function (o) {return o[tIdx]})
		}
		--vDynm.ob.sequ.sequNo;
		if (vDynm.ob.sequ.sequNo <= 0) {
			ptciNextJob();
		};
    }).catch(function (error) {
	   	console.log(error);
    });
}


// Load Static, route wide storess into arrays under vStat
function ptciStoresToStatArys() {
	vDynm.ob.sequ.sequNo = vCnst.ar.storeToStatAry.length;
	vCnst.ar.storeToStatAry.map(function (o){ptciStoreToStat(o)});
}


//	Request re-stamping and download of stbl then load into store.
function ptciRequestLastUpld() {
	vWork.updt = {};
	var reqUrl = "https://aziom.com/V-Trax/GJH/ajax/rte2aws_v22.php";
	var combAry = [{ui: vDynm.re.misc.userInfo.userid, ac: vDynm.re.misc.aCode, fn: 'ru'}];
	xhrPromSendJsonObj(reqUrl, vDynm.re.misc.userInfo.userid, vDynm.re.misc.userInfo.userac, combAry).then(function (data) {
		var jsonAry=JSON.parse(data);
		vDynm.re.misc.lastHostDt = jsonAry[0];
		if (jsonAry[1] = 0) {
	      console.log(jsonAry[2]);
		} else {
			vWork.updt.stluUpdt = jsonAry[2];
			ptciModifyFromJson(vWork.db.base.handle, 'stlu', jsonAry);
			ptciNextJob();
		}
    }).catch(function (error) {
      console.log(error);
    });

}


function ptciCheckFetchCnt() {
	--vWork.updt.tblGets;
	if (vWork.updt.tblGets == 0) {
		ptciNextJob();
	}
}


// Fetch IDB records with ut_upld = 0 and send to host
function ptciCheckSendNewUploads(tbl, lu) {
	++vWork.updt.tblGets;
	vWork.updt.send = {};
	promFetchRangeIdx(vWork.db.upld.handle, tbl, 'luIdx',  0, 1).then(function (datAry) {
//	promFetchExactIdx(vWork.db.upld.handle, tbl, 'luIdx',  0).then(function (datAry) {
		if (datAry.length > 0) {
			vWork.updt.send[tbl] = datAry;
		}
		ptciCheckFetchCnt();
    }).catch(function (error) {
      console.log(error);
    });
}


function ptciFetchRecsToSend() {
	var sAry = vWork.updt.stluUpdt;
	vWork.updt.tblGets = 0;
	for (var i = 0; i < sAry.length; i++) {
//		console.log(sAry[i].tbl_name, sAry[i].last_updt);
		ptciCheckSendNewUploads(sAry[i].tbl_name, sAry[i].last_updt);
	}
}


function ptciCheckSendCnt() {
	--vWork.updt.tblSends;
	if (vWork.updt.tblSends == 0) {
		ptciNextJob();
	}
}


// store returned date into idb for tbl recs with ut_updt = 0
function ptciPutHostUpdtTime(tbl, rec, updtTs) {

	var tRec = rec;
	tRec.ut_upld = updtTs;
	promPutRecNoKey(vWork.db.upld.handle, tbl, tRec).then(function (data) {
    }).catch(function (error) {
      console.log(error);
    });

	console.log(tbl, updtTs);
//	console.log(tbl, rec, updtTs);

}


// Send XHR for name, records in arry
function ptciXhrFromAry(sendNam, sendAry) {
//	console.log('Send name:', sendNam, ' Ary:', sendAry);
	var reqUrl = "https://aziom.com/V-Trax/GJH/ajax/rte2aws_v22.php";
	var combAry = [{ui: vDynm.re.misc.userInfo.userid, ac: vDynm.re.misc.aCode, fn: 'pu', tb: sendNam}];
	var datAry = [];
	for (var i = 0; i < sendAry.length; i++) {
		datAry.push(sendAry[i]);
	}
	combAry.push(datAry);
	++vWork.updt.tblSends;
	xhrPromSendJsonObj(reqUrl, vDynm.re.misc.userInfo.userid, vDynm.re.misc.userInfo.userac, combAry).then(function (data) {
		var jsonAry=JSON.parse(data);
		vDynm.re.misc.lastHostDt = jsonAry[0];
		if (jsonAry[1] = 0) {
			console.log(jsonAry[2]);
		} else {
			datAry.map(function (o) {ptciPutHostUpdtTime(sendNam, o, jsonAry[2])});
		}
		ptciCheckSendCnt()
    }).catch(function (error) {
      console.log(error);
    });

}


// Send new records from array of stores with new data
function ptciSendNewRecs() {
	var sendAry = Object.getOwnPropertyNames(vWork.updt.send);
	vWork.updt.tblSends = 0;
	if (sendAry.length == 0) {
		ptciNextJob();
	} else {
		for (var i = 0; i < sendAry.length; i++) {
			ptciXhrFromAry(sendAry[i], vWork.updt.send[sendAry[i]]);
		}
	}
}


function ptciLoadEvntHand() {
	window.addEventListener('online',  idxOnlineChange);
	window.addEventListener('offline', idxOnlineChange);
	idxOnlineChange();
	ptciNextJob();
}


function ptciLoadComplete() {
	ptciPickLog('V-Trax Load 1017 Complete');
	i_SectHdr.innerHTML = "V-Trax Ready";

	boxChange(505);
}


function ptciUpdateComplete() {
	ptciPickLog('V-Trax Update 1017 Complete');
	boxChange(2000);
}


function ptciOpenComplete() {
	ptciPickLog('V-Trax Open Complete');
}


function ptciSendComplete() {
	vWork.updt = {};
	ptciPickLog('V-Trax Send 1017 Complete');
}


function ptciSequOpenProcs() {
// Initialize
	vWork.ar.jobProc.length = 0;
	vDynm.ob.sequ.jobNo = -1;
	vDynm.ob.sequ.ActDbFills = 0;

// Open baseDb
	vWork.ar.jobProc.push(function () {ptciOpenBaseDb()} );

// Misc table to object
	vWork.ar.jobProc.push(function () {ptciOneRec2vDynm("base", "misc", 0, true)} );

// Fill Stbl Array from Store
	vWork.ar.jobProc.push(function () {ptciStore2Ary("stbl", vDynm.ar.stblAry)} );

// Load / Update Stlu from Stbl array
	vWork.ar.jobProc.push(function () {ptciStbl2stlu()} );

// Fill Stlu Array from Store
	vWork.ar.jobProc.push(function () {ptciStore2Ary("stlu", vDynm.ar.stluAry)} );

// copy sidx to Stat array
	vWork.ar.jobProc.push(function () {ptciSidxToStat()} );

// Open dnld
	vWork.ar.jobProc.push(function () {ptciOpenVtDb("dnld")} );

// open upld
	vWork.ar.jobProc.push(function () {ptciOpenVtDb("upld")} );

// open ctrl
	vWork.ar.jobProc.push(function () {ptciOpenVtDb("ctrl")} );

// Stores to Arrays
	vWork.ar.jobProc.push(function () {ptciStoresToStatArys()} );

// open sync
	vWork.ar.jobProc.push(function () {ptciOpenVtDb("sync")} );

// open work
	vWork.ar.jobProc.push(function () {ptciOpenVtDb("work")} );

// load RHDR
	vWork.ar.jobProc.push(function () {ptciOneRec2vDynm("dnld", "rhdr", vDynm.re.misc.userInfo.route_id, true)} );

// launch persistant event handlers
	vWork.ar.jobProc.push(function () {ptciLoadEvntHand()} );
}


function ptciSequLoadProcs() {
// Initialize
	vWork.ar.jobProc.length = 0;
	vDynm.ob.sequ.jobNo = -1;
	vDynm.ob.sequ.ActDbFills = 0;
	vDynm.el.badXhrRetries = 0;


// Open baseDb
	vWork.ar.jobProc.push(function () {ptciOpenBaseDb()} );

// Misc table to object
	vWork.ar.jobProc.push(function () {ptciOneRec2vDynm("base", "misc", 0, true)} );

// Populate Stbl store from host Json
	vWork.ar.jobProc.push(function () {ptciFillTbl(vWork.db.base.handle, 'stbl', vDynm.re.misc.lastUpdt)} );

// Fill Stbl Array from Store
	vWork.ar.jobProc.push(function () {ptciStore2Ary("stbl", vDynm.ar.stblAry)} );

// Load / Update Stlu from Stbl array
	vWork.ar.jobProc.push(function () {ptciStbl2stlu()} );

// Fill Stlu Array from Store
	vWork.ar.jobProc.push(function () {ptciStore2Ary("stlu", vDynm.ar.stluAry)} );

// base need fill
	vWork.ar.jobProc.push(function () {ptciFillTblsInDb('base', vWork.db.base.handle)} );

// copy sidx to Stat array
	vWork.ar.jobProc.push(function () {ptciSidxToStat()} );

// Open dnld
	vWork.ar.jobProc.push(function () {ptciOpenVtDb("dnld")} );

// dnld need fill
	vWork.ar.jobProc.push(function () {ptciFillTblsInDb('dnld', vWork.db.dnld.handle)} );

// open upld
	vWork.ar.jobProc.push(function () {ptciOpenVtDb("upld")} );

// open ctrl
	vWork.ar.jobProc.push(function () {ptciOpenVtDb("ctrl")} );

// ctrl need fill
	vWork.ar.jobProc.push(function () {ptciFillTblsInDb('ctrl', vWork.db.ctrl.handle)} );

// Stores to Arrays
	vWork.ar.jobProc.push(function () {ptciStoresToStatArys()} );

// open sync
	vWork.ar.jobProc.push(function () {ptciOpenVtDb("sync")} );

// sync need fill
	vWork.ar.jobProc.push(function () {ptciFillTblsInDb('sync', vWork.db.sync.handle)} );

// open work
	vWork.ar.jobProc.push(function () {ptciOpenVtDb("work")} );

// Misc object back to Store
	vWork.ar.jobProc.push(function () {ptciSaveCurrUpdtTime()} );

// load RHDR
	vWork.ar.jobProc.push(function () {ptciOneRec2vDynm("dnld", "rhdr", vDynm.re.misc.userInfo.route_id, true)} );

// launch persistant event handlers
	vWork.ar.jobProc.push(function () {ptciLoadEvntHand()} );
}


function ptciSequSendProcs() {
// Initialize
	vWork.ar.jobProc.length = 0;
	vDynm.ob.sequ.jobNo = -1;
	vDynm.ob.sequ.ActDbFills = 0;

// Open baseDb
	vWork.ar.jobProc.push(function () {ptciOpenBaseDb()} );

// Misc table to object
	vWork.ar.jobProc.push(function () {ptciOneRec2vDynm("base", "misc", 0, true)} );

// Fill Stbl Array from Store
	vWork.ar.jobProc.push(function () {ptciStore2Ary("stbl", vDynm.ar.stblAry)} );

// Load / Update Stlu from Stbl array
	vWork.ar.jobProc.push(function () {ptciStbl2stlu()} );

// Fill Stlu Array from Store
	vWork.ar.jobProc.push(function () {ptciStore2Ary("stlu", vDynm.ar.stluAry)} );

// Open dnld
	vWork.ar.jobProc.push(function () {ptciOpenVtDb("dnld")} );

// open upld
	vWork.ar.jobProc.push(function () {ptciOpenVtDb("upld")} );

// open ctrl
	vWork.ar.jobProc.push(function () {ptciOpenVtDb("ctrl")} );

// open sync
	vWork.ar.jobProc.push(function () {ptciOpenVtDb("sync")} );

// open work
	vWork.ar.jobProc.push(function () {ptciOpenVtDb("work")} );

	if (!navigator.onLine) {
		return;
	}
	
// Get last good upload unix timestamp
	vWork.ar.jobProc.push(function () {ptciRequestLastUpld()} );

// Send any records from upld that are newer
	vWork.ar.jobProc.push(function () {ptciFetchRecsToSend()} );

// Send any records from upld that are newer
	vWork.ar.jobProc.push(function () {ptciSendNewRecs()} );
}


// Sequencer to assure async task complete before required
function ptciNextJob() {
	++vDynm.ob.sequ.jobNo;
	var revCnt = vWork.ar.jobProc.length - vDynm.ob.sequ.jobNo;
	ptciPickLog("Job: " + revCnt, "i_logon_job");
	vWork.ar.jobProc[vDynm.ob.sequ.jobNo]();
}


//	Execution begines here for ptciDbfFuncs
function ptciDbfFuncs(dbfOp, lastProc) {	// Contains all dbf related funcs

	switch (dbfOp) {
// Open / Load dbfs
		case 'Load':
			ptciSequLoadProcs();
			break;

// Update dbfs
		case 'Update':
			ptciSequLoadProcs();
			break;

// Open dbfs
		case 'Open':
			ptciSequOpenProcs();
			break;

// Open dbfs
		case 'TestOpen':
			ptciSequOpenProcs();
			break;

// Open dbfs
		case 'Send':
			ptciSequSendProcs();
			break;
//
		case 'Tst1':
			break;

		default:
			break;
	}
	if (typeof lastProc === "function") {
		vWork.ar.jobProc.push(function () {lastProc()} );
	}

	ptciNextJob();
}
