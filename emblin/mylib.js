/*----------------------------------------
 (C) by Luc Hermans  smultita at gmail.com
------------------000--(O)(O)--000------*/
function nop()
{}
function getCookie(nr)
{  var i,l, coki=document.cookie+"";  
	i=coki.indexOf("000"+nr+ "=");	if (i>0) i=coki.indexOf("=",i);
	l=coki.indexOf(";",i);	if (l<i)	l=i+64;
	if (i>0) return coki.substring(i+1, l);
	return "NULL";
}
function setCookie(nr, coki)
{	a=getCookie(nr);
	if (a!=coki)
	document.cookie="@90000000000"+ nr+ "="+coki+";expires=Wednesday, 31-Dec-27 23:12:41 GMT ";
}
function getPara(p)
{ var i,l, s=escape(location);
   i=s.indexOf(p+"%3D"); i+=3;
   l=s.indexOf("%",i);
   if (l<i) l=i+64;
   if (i>3) 	return s.substring(i+1, l);
   return "NULL";
}
function chkEmail(a)
{ var i,j;
	a+="";
	i=a.indexOf("@");
	j=a.indexOf(".",i+1);
	if ( i>1 && j>(i+2) && a.length>(j+2) )		return true;
	return false;
}
function getObj(n, d) { //MM_findObj v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}
function json_rd(file_json) { //--Json read file
    var xh=new XMLHttpRequest();
    xh.open("GET",file_json,false);
    //if (xmlhttp.overrideMimeType) {
    //    xmlhttp.overrideMimeType("application/json");
    xh.send();
    jos = JSON.parse(xh.responseText);
    console.log(file_json, jos);
    return jos;
}
