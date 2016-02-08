//              loader show
$(document).on('pagebeforehide', '[data-role="page"]', function(){     
    setTimeout(function(){
	    $.mobile.loading( "show", {
  text: "Loading....",
  textVisible: true,
  theme: "a",
  
});},1);
});



// loader off
$(document).on('pageshow', '[data-role="page"]', function(){  
    setTimeout(function(){
$.mobile.loading("hide");
    },300);      
});


// back
function goBack()
	{
	window.history.back();
	}
	
//  citypage back
 function chng(id,name)
	 {
	 
      sessionStorage.setItem("city_name",name);
	  sessionStorage.setItem("city_id",id);
	  window.history.back();
	 }
	 
	 
// categories	 
	 function link1(x,y)
		{
		sessionStorage.setItem("category",y);
		sessionStorage.setItem("cat_id", x);
		sessionStorage.setItem("page_no",1);
		sessionStorage.setItem("sub_page_no",1);
		$.mobile.changePage( "#sub_cat", { transition: "none", changeHash: true });
		}

// citypage
	function city()
		{
		sessionStorage.setItem("page_no",1);
		sessionStorage.setItem("sub_page_no",1);
		
		$.mobile.changePage( "#pagecity", { transition: "none", changeHash: true });
		}
		
// autocomplete
	function listdisp()
		{	$('#catdisp').addClass('ui-screen-hidden');
			$('#cross').removeClass('ui-screen-hidden');
			document.getElementById("tabbernav").innerHTML="";
			if (window.XMLHttpRequest)
				{// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
				}
			else
			{// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			var str=document.getElementById("basic").value;
			var cid=sessionStorage.getItem("city_id");
			xmlhttp.open("GET","http://mycity91.com/APIS/files/getsearch.php?pageno=1&cityid="+cid+"&search="+str,false); 
			xmlhttp.overrideMimeType('text/xml');
			xmlhttp.send();
			xmlDoc=xmlhttp.responseXML;
			if(xmlDoc!=null){ 
				if(xmlDoc.getElementsByTagName("perpagecount").length == 0){
					$('#catdisp').removeClass('ui-screen-hidden');
					}
				else{ 
					var totallist=xmlDoc.getElementsByTagName("perpagecount")[0].firstChild.data;
					for(i=0;i<totallist;i++)
					{
					var name=xmlDoc.getElementsByTagName("name")[i].firstChild.data;
					var namel=name.replace(/#/g,"&");
		
					document.getElementById("tabbernav").innerHTML+= "<li onclick=link4('"+xmlDoc.getElementsByTagName("id")[i].firstChild.data+"')><a>"+namel+"</a></li>";
					}
					$("#tabbernav").listview("refresh");
					}
			}
			else{
				$('#catdisp').removeClass('ui-screen-hidden');
				$('#cross').addClass('ui-screen-hidden');}
		}	
		
		
// refresh first page on cancel button
 		function del()
		{
			var elem = document.getElementById("basic");
			elem.value = "";
			listdisp();
		}	
		
		
// to call
		function call(x)
		{
			alert(x);
		}
		
// hot deal check
		function deal(x)
		{
			alert('deal = '+x);
		}
		
// get mpas
		function map(x,y)
		{
			alert('lat = '+x+' long = '+y);
		}
		
// detail page
		function link4(x)
		{
		
		sessionStorage.setItem("listid_id", x);
		//	alert(x);
		$.mobile.changePage( "#pagedetail", { transition: "none", changeHash: true });
		
			
		}	
		
		
// go to sub_sub_cat
 		function link2(x)
		{
		sessionStorage.setItem("subcat_id", x);
		linklist(); 
		}
		function linklist()
		{
		s=sessionStorage.getItem("subcat_id");
		$.mobile.changePage( "#pagesub", { transition: "none", changeHash: true });
		
		}