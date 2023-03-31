/*----------------------------------------
(C) smultita at gmail.com  \\ //    2000-2001
------------------000--(O)(O)--000------*/
//--- my memory game ---

//--- globals ---11/25/2002
var d=document;
var DCP="document.p";
var p,q,r, scI=new Array(), pr=new Array();
var credit, add, min, trys, title;
var imgPL=new Array();

function ani_hit()
{    alert("You got me and 10 extra credits !");
    d.fm.credit.value=credit=1*credit+10; setCookie(0,credit);
}

function clon( k)    //--click on
{    if (p && q)    //--hide again
    {   eval(DCP+p+".src='img/qm"+pr[p]+".gif'"); eval(DCP+q+".src='img/qm"+pr[q]+".gif'");
        p=q=0;        return;    
    }   //--allready found
    if (k==0 || p==k || scI[k]=="")    return;    //--Already clicked/Found
    if (credit<pr[k]) { if (alert( "You can't pay this!\nCatch the Thing !")) location="./memory.htm"; else return; }
    credit-=pr[k];     d.fm.credit.value=credit;
    min+=pr[k];
    eval(DCP+k+".src='"+scI[k]+"'");    //--show image
    if (p==0)    p=k;        //--first  click p
    else                     //--second click q
    {    q=k; ++trys;
        if (scI[p]==scI[q])        //--it's the same
        {    credit+=pr[p]*pr[q]; add+=pr[p]*pr[q]; alert("You win   "+pr[p]+" * "+pr[q]+" = "+pr[p]*pr[q]);
            d.fm.credit.value=credit; scI[p]=scI[q]=""; p=q=0;    //--set found
            if (--r==0)    {setCookie(0,credit); alert( "You're the best !"); location="./memory.htm"; }
        } else setTimeout('clon(0)',2500);
    }
    setCookie(0,credit);
    d.fm.add.value=add; d.fm.min.value=min; d.fm.trys.value=trys;
}

function init()    //--arg = pics 1-10, header, footer, Landscape, prise, title, list
{ var i,j, VIMG, VEXT, ROW=4, COL=5, W=85, H=105;
    r=Math.floor(ROW*COL/2);    //--r=nr of pictures
    title=init.arguments[r+4];
    p=init.arguments[r+3];
    if (init.arguments[r+5])    return 1;
 
    credit=getCookie(0); if (credit=="NULL" || isNaN(credit)) credit=200;
    credit=parseInt(credit); i=(c==69?0:p);
    if (i>=500) if (!confirm("Warning adults only ! \nAre you older than 18 ?") || confirm("Abort this game ?")) return 0;
    if (credit<i) { alert( "You need "+i+" for this game. Get some credit first !"); return 0; }
    if (i>0) { if (confirm( "Pay "+i+" for this game ?")) credit-=i; else return 0; }
    
    if (init.arguments[r+2]=='L') { H=W; W=115; } //--Landscape
    VIMG=init.arguments[r];
    console.log('arg', init.arguments);
    console.log('r', r);
    console.log('VIMG', VIMG);
    VEXT=init.arguments[r+1];
    for (i=1; i<=r; ++i)    //--preload images
    {    scI[i]=scI[i+r]=VIMG+init.arguments[i-1]+VEXT;
        imgPL[i]=new Image; imgPL[i].src=scI[i];
    }
    for (i=1; i<2*r; ++i)    //--scramble images
    {    j=Math.floor(2*r*Math.random());
        if (j==0 || j==i) ++j;
        p=scI[j]; scI[j]=scI[i]; scI[i]=p;
    }
    d.write("<form name='fm'><table>");    //--write table of pictures

    for(p=1,i=0; i<ROW; ++i)
    {    d.write("<tr>");
        for(j=0; j<COL; ++j, ++p)
        {    q=Math.floor(5*Math.random()); //random prise
            pr[p]=((q<2)?q:5*(q>3?q:--q)); //0 1 5 10 20
            d.write("<td><a href='javascript:clon("+p+ ")'><img src='");
            if (c==69)    d.write(scI[p]+"' name='p"+p+"' alt='p"+scI[p]);
            else        d.write("img/qm"+pr[p]+".gif' name='p"+p+ "' alt='?");
            d.write("' width="+W+" height="+H+" border=0 alt='p"+scI[p]+"'></a></td>");
        }
        d.write("<td><h4>"+
        (i==0?"Credit</h4></td><td><input type=text name='credit' size='6' value='0'> ":"")+
        (i==1?"Win +<br>Loose -</h4></td><td><input type=text name='add' size='6' value='0'><br><input type=text name='min' size='6' value='0'>":"")+
        (i==2?"Trys</h4></td><td><input type=text name='trys' size='6' value='0'>":"")+
        (i==ROW-1?"</td><td><br><br><a href=./memory.htm>Go Back</a></h4>":"")+
        "</td></tr>");
    }
    i=VIMG.indexOf('/',8); if (i<8) i=28;
    d.write("</table></form> &nbsp Images &copy by <a href=http://"+ VIMG.substring(7,i)+" target=_blank>"+VIMG.substring(7,i)+"</a>");
    add=min=trys=p=q=0; //nothing clicked
    d.fm.credit.value=credit;
    return 1;
}

//--Json load---
function json_readd(file_json) {
    var xh=new XMLHttpRequest();
    xh.open("GET",file_json,false);
    //if (xmlhttp.overrideMimeType) {
    //    xmlhttp.overrideMimeType("application/json");
    xh.send();
    jos = JSON.parse(xh.responseText);
    console.log(jos);
    return jos.img;
}

//--The List
function getList(s, t)
{ var c=0;
  memo=memo_list[''+s];
  if (!memo) return 0;
  console.log(memo);
  var pics=[];
  if (t==0) pics=json_rd('img/'+memo.title+'.json').img;  
  c = init(pics[0],pics[1],pics[2],pics[3],pics[4],pics[5],pics[6],pics[7],pics[8],pics[9],'','','L',memo.price,memo.title,t);  
  return c;
}
  /*
  switch(s)
  { 
  //case 1:  title='Touch screens'; break;
  //case 3:  title='animation'; break;
  case 4:  title='Animals'; break;
  case 10: title='Space'; break;
  case 11: title='cars'; break;
  case 12: title='Cars2'; break;
  case 13: title='Ocean Live'; break;
  case 14: title='Animals2'; break;
  case 15: title='Mountains'; break;
  case 16: title='WaterFalls'; break;
  case 17: title='Nature'; break;
  case 18: title='Grand Canyon'; break;
  case 21: title='Sport'; break;
  case 22: title='Movies'; break;
  case 23: title='Star Trek'; break;
  case 50: title='Bikini Babes'; p=225; break;
  case 51: title='Super Models'; p=250;  break;
  case 301: title='More Babes'; p=500;  break;
  case 302: title='Tits'; p=550;  break;
  case 303: title='More Tits'; p=750;  break;
  case 304: title="Pussy's"; p=1250;  break;
  }
  if (title == '')  return 0;
  var pics=[];
  if (t==0) pics=json_rd('img/'+title+'.json').img; 
  c = init(pics[0],pics[1],pics[2],pics[3],pics[4],pics[5],pics[6],pics[7],pics[8],pics[9],a,b,'L',p,title,t);
  return c;
} 
*/
var memo_list=json_rd('img/memory.json');

//--Main---
var s=parseInt("0"+getPara("a"),10);
var c=parseInt("0"+getPara("c"),10);
var n=getPara("p");
if (n!="NULL") { if (n=="Camille") c=6; else alert("Wrong password\n\nTip: Real first name of BB (FR)\n(7 chars, Case sensitive)"); }
d.write("<table align='center'"+ (s<1?"":"bgcolor='#ffffff' background='img/bgnd.gif' border='4'")+"><tr><td>");
  if (s>0) 
  { c=getList(s,0);
    if (c==0) d.write("<h4><a href=./memory.htm>Go Back</a></h4>");
  }
  if (s==0)
  {    n=getCookie(2); if (n=="NULL") n="";
    credit=getCookie(0); if (credit=="NULL") credit=200; credit=parseInt(credit);
    d.write( "<H2>Hey "+n+" ! </H2>This is a variant of the Memory game. The goal is to find two of the same images. However for every click on an image you loose 0, 5, 10 or 20 credits. But if you find a set you win the product! So you can win up to 20*20 = 400 credits with just two clicks. The more credits you get the more games you can play.<br>I give you 200 credits for free, to start playing. If you run out of credits, get extra credits by catching the thing. I also give you 1000 credits for every Euro/Dollar attached to an email send to <a href='mailto:smultita at gmail.com'>smultita at gmail.com</a> <b>;)</b><br>"+
    "<form name='fm' onsubmit='setCookie(2,frname.value); return 0;'>Please enter your <b>name </b><input type='text' name='frname'> <input type='submit' value='Enter'> &nbsp &nbsp Your <b>Credit </b> is &nbsp <input type=text name='credit' size='8' value='0'></form>"+
    (credit>999 ? "You can now download the <a href='pub/dlrsrc.zip'><b>DLR source</b></a>":
    "Collect 1000 Credits to download the <b>DLR source</b>") +
    "<br>Start playing by selecting one of the links below.<br><b>Have Fun !</b><br><br>");    
    d.write( "<table><tr><td width='50%'><dt>");
    for (var i=2; i<(c==6?300:100); ++i)
    {   n=getList(i,1);
        if (n==1)    d.writeln("<dd><a href=memory.htm?a="+i+">"+title+"</a> &nbsp &nbsp "+(p==0?" &nbsp &nbsp ":" Cost "+p+" credits"));
        else if (n==2)    d.writeln("<dt>"+title);
    }
    d.write("<br><br></td><td valign='top'></td></tr></table>");

    if (c>100 && (c%17)==13 && getCookie(c)=="NULL") { credit+=1000; setCookie(0,credit); setCookie(c,1);}
    d.fm.credit.value=credit;
    n=getCookie(2); if (n!="NULL") d.fm.frname.value=n;
  } //--end if (s==0)
  d.write("</td></tr></table>");
  n=getPara("p");
  if (s==0) { if (n!="NULL") d.write("<form action='memory.htm'>Password: <input type='password' name='p'><input type='submit' value='Adult'>"); }
  else  d.write("<table align='center'><tr><td>Please wait until all images are downloaded</td></tr></table>");
