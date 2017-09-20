/*
  Copyright (c) Aziom, Inc 2016. All rights reserved.
*/


function xhrPromSendJsonObj(reqUrl, usr, pwd, combAry) {
  return new Promise(function (resolve, reject) {

	var xmlhttp = new XMLHttpRequest();
    var authHeader = "Basic " + btoa(usr + ":" + pwd);

	xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4)	{
		switch(xmlhttp.status) {
			case 200:
				resolve(xmlhttp.responseText);
				break;
			case 404:
				resolve('[0,0,404]');
				break;
			case 401:
				resolve('[0,0,401]');
				break;
			default:
				reject(xmlhttp.responseText);
		}
    }
	};
	
	xmlhttp.open("POST",reqUrl);
	xmlhttp.setRequestHeader("Authorization", authHeader);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send(JSON.stringify(combAry));
  });
}

	
