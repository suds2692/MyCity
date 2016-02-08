$('#pagecity').bind('pagecreate',function(event){
				if (window.XMLHttpRequest)
					{// code for IE7+, Firefox, Chrome, Opera, Safari
					xmlhttp=new XMLHttpRequest();
					}
				else
					{// code for IE6, IE5
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
					}
				xmlhttp.open("GET","http://mycity91.com/APIS/files/getcity.php",false);
				xmlhttp.overrideMimeType('text/xml');
				xmlhttp.send();
				xmlDoc=xmlhttp.responseXML;
				for (var i = 0; i <9;i++) {
					document.getElementById("citylist").innerHTML+= "<li ><a href=javascript:chng('"+xmlDoc.getElementsByTagName("id")[i].firstChild.data+"','"+xmlDoc.getElementsByTagName("cityname")[i].firstChild.data+"')>"+xmlDoc.getElementsByTagName("cityname")[i].firstChild.data+"</a></li>";
				}
			});
	
