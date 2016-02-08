$('#pagedetail').on('pageshow',function(event){
		$("#detaillist").empty();
		if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	var id=sessionStorage.getItem("listid_id");
	xmlhttp.open("GET","http://mycity91.com/APIS/files/getlistingdetails_new.php?listid="+id+"&lat=1&long=1",false);
	xmlhttp.overrideMimeType('text/xml');
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML;
	
	//alert(id);
	var name=xmlDoc.getElementsByTagName("name")[0].textContent;
	var namel=name.replace(/#/g,"&");
	document.getElementById("secheader2").innerHTML=namel;
	var str=xmlDoc.getElementsByTagName("address")[0].textContent;
	var n=str.replace(/_/g,",");
	var pin=xmlDoc.getElementsByTagName("pincode")[0].textContent;
	var city=xmlDoc.getElementsByTagName("cityname")[0].textContent;
	document.getElementById("detaillist").innerHTML='<li><div class="custom_address" style="padding-top:3px;" ><p><div style="white-space:normal;">'+n+", "+city+" - "+pin+'</div></p></div></li>';
	var person=xmlDoc.getElementsByTagName("contactperson")[0].textContent;
	if(person!="")
	document.getElementById("detaillist").innerHTML+='<li><div class="custom_contact" style="padding-top:3px;" ><p><div style="white-space:normal;">Contact Person - '+person+'</div></p></div></li>';
	var mobile=xmlDoc.getElementsByTagName("mobile")[0].textContent;
	var tel=xmlDoc.getElementsByTagName("telephone")[0].textContent;
	if(mobile!=""||tel!="")
	{
	var contactdata="";
	if(xmlDoc.getElementsByTagName("telephone")[0].textContent!="")
	contactdata+='<div class="custom_tel" style="padding-top:3px;" ><p><div style=" white-space:noraml; color:#000077">'+xmlDoc.getElementsByTagName("telephone")[0].textContent+'</div> </p></div>';
	if(xmlDoc.getElementsByTagName("telephone1")[0].textContent!="")
	contactdata+='<div class="custom_tel" style="padding-top:3px;" ><p><div style=" white-space:noraml; color:#000077">'+xmlDoc.getElementsByTagName("telephone1")[0].textContent+'</div> </p></div>';
	if(xmlDoc.getElementsByTagName("telephone2")[0].textContent!="")
	contactdata+='<div class="custom_tel" style="padding-top:3px;" ><p><div style=" white-space:noraml; color:#000077">'+xmlDoc.getElementsByTagName("telephone2")[0].textContent+'</div> </p></div>';
	if(xmlDoc.getElementsByTagName("telephone3")[0].textContent!="")
	contactdata+='<div class="custom_tel" style="padding-top:3px;" ><p><div style=" white-space:noraml; color:#000077">'+xmlDoc.getElementsByTagName("telephone3")[0].textContent+'</div> </p></div>';
	if(xmlDoc.getElementsByTagName("mobile")[0].textContent!="")
	contactdata+='<div class="custom_mobile" style="padding-top:3px;" ><p><div style=" white-space:noraml; color:#000077">+'+xmlDoc.getElementsByTagName("mobile")[0].textContent+'</div> </p></div>'
	if(xmlDoc.getElementsByTagName("mobile1")[0].textContent!="")
	contactdata+='<div class="custom_mobile" style="padding-top:3px;" ><p><div style=" white-space:noraml; color:#000077">+'+xmlDoc.getElementsByTagName("mobile1")[0].textContent+'</div> </p></div>'	
	if(xmlDoc.getElementsByTagName("mobile2")[0].textContent!="")
	contactdata+='<div class="custom_mobile" style="padding-top:3px;" ><p><div style=" white-space:noraml; color:#000077">+'+xmlDoc.getElementsByTagName("mobile2")[0].textContent+'</div> </p></div>'
	document.getElementById("detaillist").innerHTML+='<li>'+contactdata+'</li>';
	}
	var email=xmlDoc.getElementsByTagName("email")[0].textContent;
	var website=xmlDoc.getElementsByTagName("website")[0].textContent;
	if(email!=""||website!=""){
	var webdata="";
	if(email!="")
	webdata+='<div class="custom_mail" style="padding-top:3px;" ><p><div style=" white-space:noraml; color:#000077">'+email+'</div></p></div>';
	if(website!="")
	webdata+='<div class="custom_website" style="padding-top:3px;"><p ><div style=" white-space:noraml; color:#000077" onclick=web("'+ website +'")>'+website+'</div></p></div>';
	
	document.getElementById("detaillist").innerHTML+='<li>'+webdata+'</li>';
	}
	x=xmlDoc.getElementsByTagName("offer");
	if(x.length!=0)
	{
	offer=x[0].getElementsByTagName("name")[0].textContent;
	if(offer!="")
	offerdata='<li><div class="custom_hot" ><p id="deal" style="white-space:normal; font-size:100%;"><div style=" white-space:noraml; color:#000077">'+offer+'</div></p>';
	if(x[0].getElementsByTagName("from_date")[0].textContent!="") 
	offerdata+='<p><div style="font-size:95%;color:rgb(241,29,114);">From '+x[0].getElementsByTagName("from_date")[0].textContent +' to '+x[0].getElementsByTagName("to_date")[0].textContent+'</div></p>';
	if(x[0].getElementsByTagName("description")[0].textContent!="") 
	offerdata+='<p><div style="font-size:90%;white-space:pre-wrap;">'+x[0].getElementsByTagName("description")[0].textContent+'</div></p>';
	document.getElementById("detaillist").innerHTML+=offerdata+'</div></li>';
	}
	var listdata="";
	if(xmlDoc.getElementsByTagName("listname").length!=0)
	{
	listdata+='<div data-role="collapsible" data-theme="c" data-content-theme="c" data-collapsed-icon="plus" data-expanded-icon="minus" data-iconpos="right"><h4><div class="custom_hours">Also Listed in</div></h4><ul class="opps" data-role="listview" data-inset="false">'
	y=xmlDoc.getElementsByTagName("listname");
	for(i=0; i<xmlDoc.getElementsByTagName("listname").length;i++)
	listdata+='<li>'+y[i].getElementsByTagName("name")[0].textContent+'</li>'
	listdata+='</ul></div>';		
	}
	
	if(xmlDoc.getElementsByTagName("hours").length!=0)
	{
	listdata+='<div  data-role="collapsible" data-theme="c" data-content-theme="c" data-collapsed-icon="plus" data-expanded-icon="minus" data-iconpos="right"><h4><div class="custom_hours">Hours of Operation</div></h4><ul class="opps" data-role="listview" data-inset="false" >'
	y=xmlDoc.getElementsByTagName("hours");	
	for(i=0; i<xmlDoc.getElementsByTagName("hours").length;i++)
	{
	if(y[i].getElementsByTagName("from_time")[0].textContent!="Open 24 Hours"&&y[i].getElementsByTagName("from_time")[0].textContent!="closed")
	{datat=y[i].getElementsByTagName("from_time")[0].textContent +' to '+y[i].getElementsByTagName("to_time")[0].textContent;}
	else{
	datat=y[i].getElementsByTagName("from_time")[0].textContent;
	}
	listdata+='<li>'+y[i].getElementsByTagName("name")[0].textContent+' : '+datat+'</li>'}
	
	listdata+='</ul></div>';
	}
	else
	{  }
	var maplat=xmlDoc.getElementsByTagName("maplat")[0].textContent;
	var maplng=xmlDoc.getElementsByTagName("maplng")[0].textContent;
	if(maplat!="" && maplng!="")
	listdata+='<div><ul class="opps" data-role="listview" data-inset="true"><li><a href="#"><div class="custom_map">View Map</div></a></li>';
	if(xmlDoc.getElementsByTagName("gallery").length!=0)
	listdata+='<li><a href="#"><div class="custom_gal">Album/Gallery</div></a></li>';
	if(email!="")
	listdata+='<li><a href="#"><div class="custom_email">Send Email</div></a></li></ul></div>';
	document.getElementById("detaillist").innerHTML+='<li>'+listdata+'</li>';
	$(".opps").listview().listview('refresh');
	$('#detaillist').trigger('create');	
	$("#detaillist").listview().listview('refresh');
	//$(tabbernav).listview("refresh")	
	
});
	
	function goBack()
	{
	sessionStorage.setItem("sub_page_no",1);
	window.history.back();
	}
	function web(x)
	{
	alert(x);
	}
