var g_contype;

function save_start()
{
  var form = document.forms[0];
  form.elements[0].value = "../html/basic_setup_finish.html";
  form.submit();
}

function url_cgi(url)
{
  return "../cgi-bin/webcm?getpage="+url;
}

function url_html(url)
{
  return "../cgi-bin/webcm?getpage=../html/"+url;
}

function url_cgi_p1(url, type)
{
  return "../cgi-bin/webcm?getpage=../html/"+url+"&var:conname=wan_conn";
}

function url_cgi_p2(url, type)
{
  return "../cgi-bin/webcm?getpage=../html/"+url+"&var:conname=wan_conn&var:contype="+type;
}

function url_cgi_p3(url, type)
{
  return "../cgi-bin/webcm?getpage=../html/"+url+"&var:conname=wan_conn&var:contype="+type+
	"&var:conprof=wan_port";
}

// For Status WAN page redirect
function url_cgi_p4(url, type)
{
  switch( type )
  {
  case "pppoa":
  case "pppoe":
        url = "status_wan_ppp.html";
	break;	
  case "dynamic":
  case "static":
	url = "status_wan_dhcp.html";
	break;	
  case "bridged":
	url = "status_wan_bridged.html";
	break;
  default:
 	url = "status_wan.html";
	break;
  }
  return "../cgi-bin/webcm?getpage=../html/"+url+"&var:conname=wan_conn&var:contype="+type+
        "&var:conprof=wan_port";
}

function which(url)
{
  var p = 0;
  switch( url )
  {
  case "status_real.html":
  case "status_wan_ppp.html":      
  case "status_wan_dhcp.html":
  case "status_wan_bridged.html":
  case "status_lan.html":
  case "status_route.html":
  case "status_user.html":
        p = 3;
        break;
  case "status_wan.html":
	p = 4;
	break;
  case "tools_restore.html":
  case "tools_upgrade.html":
  case "tools_secwin.html":
  case "dsl_setup.html":
  case "tools.html":
  case "help.html":
  case "actiontec.html":
  case "setup.html":
  case "status.html":
      p = 0;
      break;
  default:
      p = 2;
      break;
  };
      
  if( url.indexOf("&p=1")!=-1 )
        p = 1;
  else if( url.indexOf("&p=2")!=-1 )
        p = 2;
  else if( url.indexOf("&p=3")!=-1 )
        p = 3;
  else if( url.indexOf("&p=4")!=-1 )
        p = 4;
  return p;          
}

function replace_links()
{
    var i;    
    for(i=0;i<document.links.length;i++) {
        if( typeof(document.links[i].href)=="undefined") continue;
        if( document.links[i].href.indexOf("javascript")==-1 )
        {
            var links=document.links[i].href.split("/");    
            var link = links[links.length-1];
            switch( which(link) )
            {
            case 1:            
                document.links[i].href = url_cgi_p1(link);
                break;
            case 2:    
                document.links[i].href = url_cgi_p2(link, g_contype);
                break;
	    case 3:
		document.links[i].href = url_cgi_p3(link, g_contype);
                break;	
	    case 4:
                document.links[i].href = url_cgi_p4(link, g_contype);
                break;
            default:    
                document.links[i].href = url_html(link);
                break;
            }    
        }
    }
}

function CheckText(element) {
    var index;
    var len = element.length;
    for(index=0; index<len; index++) {
        if(((element.charAt(index) >= '0') && (element.charAt(index) <= '9')) 
          || ((element.charAt(index) >= 'A') && (element.charAt(index) <= 'z')))
            continue;
        else
            return false;
    }
    return true;
}

function Cal_Link(WSlink, NWlink, DFlink) {
    var nextlink = DFlink;
    switch (customerID) {
    case "60":
        nextlink = WSlink;
        break;
    case "130":
        nextlink = WSlink;
        break;
    default:
        nextlink = DFlink;
    }
    if( modelID == "GT704-WR")    // Override with
        nextlink = WSlink;
    else if((modelID == "GT704")||(modelID == "GT701")) {
        if(nextlink == WSlink)
            nextlink = NWlink;
    }
    return nextlink;
}

function replaceAll( str, from, to ) {
    var idx = str.indexOf( from );


    while ( idx > -1 ) {
        str = str.replace( from, to );
        idx = str.indexOf( from );
    }

    return str;
}

function do_alg()
{
    var tmphref;
    tmphref = "/cgi-bin/webcm?getpage=../html/adv_alg.html&var:pcname=" + pc_name;
    top.location.href= tmphref;
    return;
}


function imgOn (imgName) {
	if ( document.images ) {
		document[imgName].src = eval(imgName + "on.src");
		window.status = "";
	}
}

function imgOff (imgName) {
	if ( document.images ) {
		document[imgName].src = eval(imgName + "off.src");
	}
}	
	
function openMap(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}


var top_idx = 4;
function do_load()
{
    document.getElementById("reboot_id").className = "high";
}

function doReboot()
{
    if(confirm("Are you sure you want to reboot the DSL Gateway?") )
    {
        document.tools_reboot.getpage.value="../html/basic_reboot_congrats.html";
        document.tools_reboot.submit();
    }
}

// Begin E-Develop

function callFoo()
{
    testwindow = window.open("http://192.168.0.1", "mywindow");
    testwindow.doReboot();
}






































