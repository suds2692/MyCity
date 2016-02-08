$('#pageinbox').on('pageshow',function(event){
		$("#inboxlist").empty();
	var db = openDatabase ("INBOX", "1.0", "Inbox messages stored here", 65535);
	
	


		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		pageno=sessionStorage.getItem("page_no");
		city=sessionStorage.getItem("city_id");
		xmlhttp.open("GET","http://mycity91.com/APIS/files/getnotice.php?pageno=1&cityid="+city,false);
		//alert("http://mycity91.com/APIS/files/getnotice.php?pageno=1&cityid="+city);
		xmlhttp.overrideMimeType('text/xml');
		xmlhttp.send();
		xmlDoc=xmlhttp.responseXML;
		if(xmlDoc.getElementsByTagName("offer").length!=0)
		{
		 count=0;
		//alert(xmlDoc.getElementsByTagName("offer").length);
		/*for (var i = 0; i <xmlDoc.getElementsByTagName("offer").length; i++) {
		document.getElementById("inboxlist").innerHTML+= "<li ><div class='custom_bullet1' style='white-space:normal; color:#d91671;'>"+xmlDoc.getElementsByTagName("description")[i].textContent+"</div></li>";}*/
		db.transaction(function (tx) {
		 tx.executeSql('SELECT * FROM MSglogs WHERE cityid='+city, [], function (tx, results) {
		 for (var i = 0; i <xmlDoc.getElementsByTagName("offer").length; i++){
			var len = results.rows.length, j;
			var bol=false;
			for (j = 0; j < len; j++){
			if(results.rows.item(j).id==xmlDoc.getElementsByTagName("id")[i].textContent)
			 {
			 document.getElementById("inboxlist").innerHTML+= "<li onclick=link4('"+xmlDoc.getElementsByTagName("listingid")[i].textContent+"')><div class='custom_bullet1' style='white-space:normal; color:#d91671;'>"+xmlDoc.getElementsByTagName("description")[i].textContent+"</div></li>";
			 $("#inboxlist").listview().listview('refresh');
			 }
			}
			
			}
			}, null);
     
			});
		//$("#inboxlist").listview().listview('refresh');
 		
		}
	else{
		document.getElementById("inboxlist").innerHTML="<li>No listings Available</li>";
		$("#inboxlist").listview().listview('refresh');

		}
		});