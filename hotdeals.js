$('#pagehotdeals').on('pageshow',function(event){
		$("#hotlist").empty();
		$.mobile.activePage.find('.ui-btn-active').removeClass('ui-btn-active ui-focus');
		$('#left').prop('disabled', true).addClass('ui-disabled');
		$('#right').prop('disabled', true).addClass('ui-disabled');
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		pageno=sessionStorage.getItem("page_no");
		if(pageno!="1")
		{
		$('#left').prop('enabled', true).removeClass('ui-disabled');
		}
		city=sessionStorage.getItem("city_id");
		xmlhttp.open("GET","http://mycity91.com/APIS/files/getoffercategory.php?pageno="+pageno+"&cityid="+city,false);
		xmlhttp.overrideMimeType('text/xml');
		xmlhttp.send();
		xmlDoc=xmlhttp.responseXML;
		if(xmlDoc.getElementsByTagName("perpagecount").length == 0)
		{
		document.getElementById("list").innerHTML="<li style='text-align:center; font-size:120%; margin-top:10px; padding:5px;'>No listings Available</li>";
		}
		else{
		var itemcount=xmlDoc.getElementsByTagName("itemcount")[0].firstChild.data;
		var catcount=xmlDoc.getElementsByTagName("catcount")[0].firstChild.data;
		var pagecount=xmlDoc.getElementsByTagName("perpagecount")[0].firstChild.data;
		
		document.getElementById("secheader").innerHTML="Options for "+sessionStorage.getItem("category") ;
		var i=0;
		do{
		i=i+1;
		var nopg=i;
		catcount=catcount-itemcount;
		}while(catcount>0);
		document.getElementById("pgno").innerHTML=pageno +" of "+nopg;
		sessionStorage.setItem("no_pages",nopg);
		if(nopg!=pageno)
		{
		$('#right').prop('enabled', true).removeClass('ui-disabled');}
		for (var i = 0; i < pagecount; i++) {
		var name=xmlDoc.getElementsByTagName("categoryname")[i].textContent;
		var namel=name.replace(/#/g,"&");
		document.getElementById("hotlist").innerHTML+= "<li ><a href='javascript:linkhot("+xmlDoc.getElementsByTagName("id")[i].firstChild.data+")'>"+namel+"</a></li>";
		}
		$("#hotlist").listview().listview('refresh');
		}
		});
		