$('#pagesub').on('pageshow',function(event){
var s=sessionStorage.getItem("subcat_id");
	var id=sessionStorage.getItem("city_id");
	var pageno=sessionStorage.getItem("sub_page_no");
		//alert(s);
		//alert(id);
		$("#sublist").empty();
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
		
	xmlhttp.open("GET","http://mycity91.com/APIS/files/getlisting.php?subcatid="+s+"&lat=1&long=1&pageno="+pageno+"&cityid="+id,false);
	//alert("http://mycity91.com/APIS/files/getlisting.php?subcatid="+s+"&lat=1&long=1&pageno="+pageno+"&cityid="+id);
	xmlhttp.overrideMimeType('text/xml');
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML;
	$('#arleft').prop('disabled', true).addClass('ui-disabled');
	$('#arright').prop('disabled',true).addClass('ui-disabled');
	$.mobile.activePage.find('.ui-btn-active').removeClass('ui-btn-active ui-focus');
	
	if(xmlDoc===null)
	{
	document.getElementById("sublist").innerHTML="<li>No listings Available</li>";
	}
	else{
	//document.getElementById("belowhead").innerHTML+=sessionStorage.getItem("category") ;
	//alert("hi");
	//alert(xmlDoc.getElementsByTagName("perpagecount")[0].firstChild.data);
	var catcount=xmlDoc.getElementsByTagName("lsitcount")[0].firstChild.data;
	var itemcount=xmlDoc.getElementsByTagName("itemcount")[0].firstChild.data;
	var perpagecount=xmlDoc.getElementsByTagName("perpagecount")[0].firstChild.data;
	var i=0;
		do{
		i=i+1;
		var nopg=i;
		catcount=catcount-itemcount;
		}while(catcount>0);
		//alert(nopg);
		document.getElementById("pgnos").innerHTML=pageno +" of "+nopg;
		sessionStorage.setItem("sub_no_pages",nopg);
		if(pageno!="1")
		{
		$('#arleft').prop('enabled', true).removeClass('ui-disabled');
		}
		//alert(pageno);
		//alert(nopg);
	if(nopg!=pageno)
		{
		$('#arright').prop('enabled', true).removeClass('ui-disabled');
		}
		
		
	for (var i = 0; i < perpagecount; i++) {
	var phone=xmlDoc.getElementsByTagName("mobile")[i].textContent;
	//alert("in");
	var enable=xmlDoc.getElementsByTagName("map_enable")[i].textContent;
	
	//if(xmlDoc.getElementsByTagName("hot_deal")[i].firstChild.data!=null)
	//var hotdeal=xmlDoc.getElementsByTagName("hot_deal")[i].firstChild.data;
	var ht="<li onclick='link4("+xmlDoc.getElementsByTagName("id")[i].textContent+")'><div class='custom_bullet'><p><h3><div style='white-space:normal;'>"+xmlDoc.getElementsByTagName("name")[i].textContent+"<div></h3></p><p><div style='white-space:normal;font-size:80%;'>"+xmlDoc.getElementsByTagName("address")[i].textContent+"-"+xmlDoc.getElementsByTagName("pincode")[i].textContent+"</div></p></div><div>";
	var htr="</div></li>";
	var htm="";
	var htd="";
	var htp="";
	var hotdeal=xmlDoc.getElementsByTagName("hot_deal")[i].textContent;
	if(enable==="Enable")
		{	var lat=xmlDoc.getElementsByTagName("map_lat")[i].textContent;
			var lon=xmlDoc.getElementsByTagName("map_long")[i].textContent;
			var htm="<img src='css/images/map_b.png' onclick=map('"+lat+"','"+lon+"') style='right:10px;'/>";
			if(phone!=""){
				var htp="<img src='css/images/phone_b.png' onclick=call("+phone+") style=' right:45px;'/>";
				if(hotdeal!="")
				{
					var htd="<img src='css/images/deal_tag.png' onclick='deal("+hotdeal+")' style=' right:80px;'/>";
				}
			}
			else if(hotdeal!="")
			{
			var htd="<img src='css/images/deal_tag.png' onclick='deal("+hotdeal+")' style=' right:45px;'/>";
			}
		}
	else if(phone!=""){
			var htp="<img src='css/images/phone_b.png' onclick=call("+phone+") style=' right:10px;'/>";
			if(hotdeal!="")
				{
					var htd="<img src='css/images/deal_tag.png' onclick='deal("+hotdeal+")' style=' right:45px;'/>";
				}
			}
	else if(hotdeal!="")
				{
					var htd="<img src='css/images/deal_tag.png' onclick='deal("+hotdeal+")' style=' right:10px;'/>";
				}
				
	
	document.getElementById("sublist").innerHTML+= ht+htd+htm+htp+htr;
	}
	$("#sublist").listview("refresh");	
	}
	});

	