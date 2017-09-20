
function promFirstRec(db, store) {
  return new Promise(function (resolve, reject) {

	var tStore = db.transaction(store).objectStore(store);
	var request = tStore.openCursor(null, "next");
	request.error = function (event) {
		reject(event.target.error);
	};
	request.onsuccess = function (event) {
		resolve(event.target.result.value);
	};
  });
}


function promLastRec(db, store) {
  return new Promise(function (resolve, reject) {

	var tStore = db.transaction(store).objectStore(store);
	var request = tStore.openCursor(null, "prev");
	request.error = function (event) {
		reject(event.target.error);
	};
	request.onsuccess = function (event) {
		resolve(event.target.result.value);
	};
  });
}


function promNextRecWrap(db, store, key) {
  return new Promise(function (resolve, reject) {

	var tStore = db.transaction(store).objectStore(store);
// Match anything past "key", but don't include "key"
	var keyRange = IDBKeyRange.lowerBound(key, true);
	
	var request = tStore.openCursor(keyRange, "next");
	request.error = function (event) {
		reject(event.target.error);
	};
	request.onsuccess = function (event) {
		if (event.target.result) {
			resolve(event.target.result.value);
		} else {
			promFirstRec(db, store).then(function (data) {
				resolve(data);
		    }).catch(function (error) {
		      console.log(error);
		    });
		}
	};
  });
}


function promPrevRecWrap(db, store, key) {
  return new Promise(function (resolve, reject) {

	var tStore = db.transaction(store).objectStore(store);
// Match anything past "key", but don't include "key"
	var keyRange = IDBKeyRange.upperBound(key, true);
	
	var request = tStore.openCursor(keyRange, "prev");
	request.error = function (event) {
		reject(event.target.error);
	};
	request.onsuccess = function (event) {
		if (event.target.result) {
			resolve(event.target.result.value);
		} else {
			promLastRec(db, store).then(function (data) {
				resolve(data);
		    }).catch(function (error) {
		      console.log(error);
		    });
		}
	};
  });
}


function promNextRec(db, store, key) {
  return new Promise(function (resolve, reject) {

	var tStore = db.transaction(store).objectStore(store);
// Match anything past "key", but don't include "key"
	var keyRange = IDBKeyRange.lowerBound(key, true);
	
	var request = tStore.openCursor(keyRange, "next");
	request.error = function (event) {
		reject(event.target.error);
	};
	request.onsuccess = function (event) {
		resolve(event.target.result.value);
	};
  });
}


function promPrevRec(db, store, key) {
  return new Promise(function (resolve, reject) {

	var tStore = db.transaction(store).objectStore(store);
// Match anything past "key", but don't include "key"
	var keyRange = IDBKeyRange.upperBound(key, true);
	
	var request = tStore.openCursor(keyRange, "prev");
	request.error = function (event) {
		reject(event.target.error);
	};
	request.onsuccess = function (event) {
		resolve(event.target.result.value);
	};
  });
}


function promFetchRec(db, store, key) {
  return new Promise(function (resolve, reject) {

	var tStore = db.transaction(store).objectStore(store);
	var request = tStore.get(key);
	request.error = function (event) {
		reject(event.target.error);
	};
	request.onsuccess = function (event) {
		resolve(event.target.result);
	};
  });
}


function promFetchAll(db, store) {
  return new Promise(function (resolve, reject) {

	var datAry = [];
	var tStore = db.transaction(store).objectStore(store);
	var request = tStore.openCursor();
	
	request.error = function (event) {
		reject(event.target.error);
	};
	request.onsuccess = function (event) {
		var cursor = event.target.result;
		if (cursor) {
			datAry.push(cursor.value);
			cursor.continue();
		} else {
			resolve(datAry);
		}
	};
  });
}


function promFetchAllIdx(db, store, idx) {
  return new Promise(function (resolve, reject) {

	var datAry = [];
	var tStore = db.transaction(store).objectStore(store);
	var tIndex = tStore.index(idx);
	var request = tIndex.openCursor();
	
	request.error = function (event) {
		reject(event.target.error);
	};
	request.onsuccess = function (event) {
		var cursor = event.target.result;
		if (cursor) {
			datAry.push(cursor.value);
			cursor.continue();
		} else {
			resolve(datAry);
		}
	};
  });
}


function promFetchRange(db, store, lowerLimit, upperLimit) {
  return new Promise(function (resolve, reject) {

	var datAry = [];
	var tStore = db.transaction(store).objectStore(store);
	var keyRange = IDBKeyRange.bound(lowerLimit, upperLimit);
	
	var request = tStore.openCursor(keyRange);
	request.error = function (event) {
		reject(event.target.error);
	};
	request.onsuccess = function (event) {
		var cursor = event.target.result;
		if (cursor) {
			datAry.push(cursor.value);
			cursor.continue();
		} else {
			resolve(datAry);
		}
	};
  });
}


function promFetchRangeIdx(db, store, idxNam, lowerLimit, upperLimit) {
  return new Promise(function (resolve, reject) {

	var datAry = [];
	var tStore = db.transaction(store).objectStore(store);
	var keyRange = IDBKeyRange.bound(lowerLimit, upperLimit);
	var tStorIdx = tStore.index(idxNam);

	var request = tStorIdx.openCursor(keyRange);
	request.error = function (event) {
		reject(event.target.error);
	};
	request.onsuccess = function (event) {
		var cursor = event.target.result;
		if (cursor) {
			datAry.push(cursor.value);
			cursor.continue();
		} else {
			resolve(datAry);
		}
	};
  });
}


function promFetchExactIdx(db, store, idxNam, exact) {
  return new Promise(function (resolve, reject) {

	var datAry = [];
	var tStore = db.transaction(store).objectStore(store);
	var keyRange = IDBKeyRange.only(exact);
	var tStorIdx = tStore.index(idxNam);

	var request = tStorIdx.openCursor(keyRange);
	request.error = function (event) {
		reject(event.target.error);
	};
	request.onsuccess = function (event) {
		var cursor = event.target.result;
		if (cursor) {
			datAry.push(cursor.value);
			cursor.continue();
		} else {
			resolve(datAry);
		}
	};
  });
}


function promPutRec(db, store, key, value) {
  return new Promise(function (resolve, reject) {

	var tStore = db.transaction(store, "readwrite").objectStore(store);
	var request = tStore.put(value, key);
	request.error = function (event) {
		reject(event.target.error);
	};
	request.onsuccess = function (event) {
		resolve(event.target.result);
	};
  });
}


function promPutRecNoKey(db, store, value) {
  return new Promise(function (resolve, reject) {

	var tStore = db.transaction(store, "readwrite").objectStore(store);
	var request = tStore.put(value);
	request.error = function (event) {
		reject(event.target.error);
	};
	request.onsuccess = function (event) {
		resolve(event.target.result);
	};
  });
}


function promAddAryToIdb(dbHandle, tbl, ary, callback) {
	var addProcAry = [];
	ary.map(function (aryDat){
		addProcAry.push(new Promise(function (resolve, reject) {
			var tstore = dbHandle.transaction(tbl, "readwrite").objectStore(tbl);
			var request = tstore.put(aryDat);
			request.error = function (event) {
				reject(event.target.error);
			};
			request.onsuccess = function (event) {
				resolve(event.target.result);
			};
		}) 	);
	});

	Promise.all(addProcAry).then(function (value) {
		if (callback != undefined) {
			callback();
		}
	}, function (reason) {
	  console.log("add all failed:", reason)
	});
}


function promDeleteRec(db, store, key) {
  return new Promise(function (resolve, reject) {

	var tStore = db.transaction(store, "readwrite").objectStore(store);
	var request = tStore.delete(key);
	request.error = function (event) {
		reject(event.target.error);
	};
	request.onsuccess = function (event) {
		resolve(event.target.result);
	};
  });
}


function promDeleteRange(db, store, lowerLimit, upperLimit) {
  return new Promise(function (resolve, reject) {

	var delCnt = 0;
	var tStore = db.transaction(store, "readwrite").objectStore(store);
	var keyRange = IDBKeyRange.bound(lowerLimit, upperLimit);
	
	var request = tStore.openCursor(keyRange);
	request.error = function (event) {
		reject(event.target.error);
	};
	request.onsuccess = function (event) {
		var cursor = event.target.result;
		if (cursor) {
	        var request = cursor.delete();
        	request.onsuccess = function () {
				++delCnt;
				console.log('Deleted from ' + store);
	        };
			cursor.continue();
		} else {
			resolve(delCnt);
		}
	};
  });
}


function promDeleteRangeIdx(db, store, idxNam, lowerLimit, upperLimit) {
  return new Promise(function (resolve, reject) {

	var delCnt = 0;
	var tStore = db.transaction(store, "readwrite").objectStore(store);
	var keyRange = IDBKeyRange.bound(lowerLimit, upperLimit);
	var tStorIdx = tStore.index(idxNam);

	var request = tStorIdx.openCursor(keyRange);
	request.error = function (event) {
		reject(event.target.error);
	};
	request.onsuccess = function (event) {
		var cursor = event.target.result;
		if (cursor) {
	        var request = cursor.delete();
        	request.onsuccess = function () {
				++delCnt;
				console.log('Deleted from ' + store);
	        };
			cursor.continue();
		} else {
			resolve(delCnt);
		}
	};
  });
}


function promClearStore(db, store) {
  return new Promise(function (resolve, reject) {

	var tStore = db.transaction(store, "readwrite").objectStore(store);
	var request = tStore.clear();
	request.error = function (event) {
		reject(event.target.error);
	};
	request.onsuccess = function (event) {
		resolve(event.target.result);
	};
  });
}


function promReplaceAryToStore(db, ary, store, callback) {
	promClearStore(db, store).then(promAddAryToIdb(db, store, ary, callback)).catch(alert);
}


