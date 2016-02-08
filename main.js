$('#index').on('pageshow',function(event){
	$('#cross').addClass('ui-screen-hidden');
	var connectionStatus = false;
	 connectionStatus = navigator.onLine ? 'online' : 'offline';
   if(connectionStatus === "online")
   {
		
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();
	}
	
	else
	{// code for IE6, IE5
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(sessionStorage.length == 0)
	{   
		
		var latlong="21.1700,72.83"
		var onSuccess = function(position) {
		alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' );
		sessionStorage.setItem("lat",position.coords.latitude);
		sessionStorage.setItem("lng",position.coords.longitude);
		var latlong=position.coords.latitude+","+position.coords.longitude;
		 alert(latlong);
		xmlhttp.open("GET","http://mycity91.com/APIS/files/getcitylatlog.php?latlong="+latlong,false);
		xmlhttp.overrideMimeType('text/xml');
		xmlhttp.send();
		//alert("hi");
		xmlDoc=xmlhttp.responseXML;
		var city_name=xmlDoc.getElementsByTagName("city")[0].firstChild.data;
		var city_id=xmlDoc.getElementsByTagName("id")[0].firstChild.data;
		
		//alert(city_id);
		sessionStorage.setItem("city_name",city_name);
		sessionStorage.setItem("city_id",city_id);
		sessionStorage.setItem("page_no",1);
		sessionStorage.setItem("sub_page_no",1);
		document.getElementById("cityname").innerHTML =city_name;
		//alert(city_name);
		$("#citybtn").empty();
		var myNavbar = $('<div data-role="navbar"><ul><li><a id="cityname" data-transition="none" href="#pagecity">'+sessionStorage.getItem("city_name")+'</a></li></ul></div>').appendTo('#citybtn');
		$('#citybtn').append(myNavbar).trigger('create');
		 }
		
		// onError Callback receives a PositionError object
		//
		
		function onError(error) {
		alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
		
		
		}

	navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}
	// to insert msg ids in database.
	var city=sessionStorage.getItem("city_id");
	if(city!=null)
	{
	
	var db = openDatabase ("INBOX", "1.0", "Inbox messages stored here", 65535);
	db.transaction(function (tx) {
	//tx.executeSql('DELETE FROM MSGlogs WHERE id=22');
	//tx.executeSql('DELETE FROM MSGlogs WHERE id=18');
	
	tx.executeSql('CREATE TABLE IF NOT EXISTS MSGlogs (id , cityid)');
	//tx.executeSql('DROP TABLE MSGlogs');
	
	});
	


		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		pageno=sessionStorage.getItem("page_no");
		xmlhttp.open("GET","http://mycity91.com/APIS/files/getnotice.php?pageno=1&cityid="+city,false);
		//alert("http://mycity91.com/APIS/files/getnotice.php?pageno=1&cityid="+city);
		xmlhttp.overrideMimeType('text/xml');
		xmlhttp.send();
		xmlDoc=xmlhttp.responseXML;
		//alert(xmlDoc.getElementsByTagName("offer").length);
		if(xmlDoc.getElementsByTagName("offer").length!=0)
		{
		 count=0;
		db.transaction(function (tx) {
		tx.executeSql('SELECT * FROM MSglogs WHERE cityid='+city, [], function (tx, results) {
		for (var i = 0; i <xmlDoc.getElementsByTagName("offer").length; i++){
			var len = results.rows.length, j;
			var bol=false;
			for (j = 0; j < len; j++){
			if(results.rows.item(j).id==xmlDoc.getElementsByTagName("id")[i].textContent)
			 {var bol = true;
			 }
			}
			if(!bol)
			{
			count=count+1;
			sessionStorage.setItem("new_msgs",count);
			tx.executeSql('INSERT INTO MSGlogs (id, cityid) VALUES ('+xmlDoc.getElementsByTagName("id")[i].textContent+','+city+' )');
			bol=false;
			}
			}
			}, null);
			});
		
	
	setTimeout(function() {
	var msg=sessionStorage.getItem("new_msgs");
	if(msg!=null && msg!='0')
	{
	//alert(sessionStorage.getItem("new_msgs"));
	alert("You hav "+msg+" new msgs");
	sessionStorage.setItem("new_msgs",0);
	//alert(sessionStorage.getItem("new_msgs"));
	}
    
	}, 3000);
 		
		
		}
	
		
		}
		
	

	}
	else{
	alert("check ur internet connection!");
	}
	var cityname=sessionStorage.getItem("city_name");
	if(cityname!=null)
	{
	$("#citybtn").empty();
		var myNavbar = $('<div data-role="navbar"><ul><li><a id="cityname" data-transition="none" href="#pagecity">'+cityname+'</a></li></ul></div>').appendTo('#citybtn');
		$('#citybtn').append(myNavbar).trigger('create');
	}
	
	

});
