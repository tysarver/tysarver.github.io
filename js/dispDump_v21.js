/*
  Copyright (c) 2016 Aziom, Inc. All rights reserved.
*/

function dispDump(tblNam) {
//	dispHdr(tblNam);
	var OutStr = "";
	var ThStr = "";
	var TdStr = "";
	if (vWork.db.dnld != undefined) {
		try {
			if (vWork.db.dnld.handle != null) {
				var OutStr = ""; 
				var store = vWork.db.dnld.handle.transaction(tblNam).objectStore(tblNam);
				var request = store.openCursor();
				request.onsuccess = function (evt) {  
				    var cursor = evt.target.result;  
				    if (cursor) {
						tObj = cursor.value;
						for (var key in tObj) {
							if (tObj.hasOwnProperty(key)) {
								if (OutStr == "") {
									ThStr = ThStr + "<th>" + key + "<th>";
								}
								TdStr = TdStr + "<td>" + tObj[key] + "<td>"
							}
						}
						if (OutStr == "") {
		  					OutStr = "<table class='dispDump'><tr>" + ThStr + "</tr>";
						}
		  				OutStr = OutStr + "<tr>" + TdStr + "</tr>";
						
						ThStr = "";
						TdStr = "";
						cursor.continue();  
				    } else {		// Complete
					   	iDispTbl.innerHTML = OutStr + "</tr><table>"
					}
				};
				request.onerror = function (err) {  
					console.log('error');
				};
   			}
		}
		catch(e){
			console.log(e);
		}
	} else {
	   	i_StatLine.innerHTML = "Please open databases first";
	}
}



function dispDump2(tblNam) {
//	dispHdr(tblNam);
	var OutStr = "";
	var ThStr = "";
	var TdStr = "";
	if (vWork.db.upld != undefined) {
		try {
			if (vWork.db.upld.handle != null) {
				var OutStr = ""; 
				var store = vWork.db.upld.handle.transaction(tblNam).objectStore(tblNam);
				var request = store.openCursor();
				request.onsuccess = function (evt) {  
				    var cursor = evt.target.result;  
				    if (cursor) {
						tObj = cursor.value;
						for (var key in tObj) {
							if (tObj.hasOwnProperty(key)) {
								if (OutStr == "") {
									ThStr = ThStr + "<th>" + key + "<th>";
								}
								TdStr = TdStr + "<td>" + tObj[key] + "<td>"
							}
						}
						if (OutStr == "") {
		  					OutStr = "<table class='dispDump'><tr>" + ThStr + "</tr>";
						}
		  				OutStr = OutStr + "<tr>" + TdStr + "</tr>";
						
						ThStr = "";
						TdStr = "";
						cursor.continue();  
				    } else {		// Complete
					   	iDispTbl.innerHTML = OutStr + "</tr><table>"
					}
				};
				request.onerror = function (err) {  
					console.log('error');
				};
   			}
		}
		catch(e){
			console.log(e);
		}
	} else {
	   	i_StatLine.innerHTML = "Please open databases first";
	}
}