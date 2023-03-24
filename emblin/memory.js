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
{	alert("You got me and 10 extra credits !");
	d.fm.credit.value=credit=1*credit+10; setCookie(0,credit);
}

function clon( k)	//--click on
{	if (p && q)	//--hide again
	{	eval(DCP+p+".src='img/qm"+pr[p]+".gif'"); eval(DCP+q+".src='img/qm"+pr[q]+".gif'");
		p=q=0;		return;	
	}	//--allready found
	if (k==0 || p==k || scI[k]=="")	return;	//--Already clicked/Found
	if (credit<pr[k]) { if (alert( "You can't pay this!\nCatch the Thing !")) location="./memory.htm"; else return; }
	credit-=pr[k]; 	d.fm.credit.value=credit;
	min+=pr[k];
	eval(DCP+k+".src='"+scI[k]+"'");	//--show image
	if (p==0)	p=k;		//--first  click p
	else					//--second click q
	{	q=k; ++trys;
		if (scI[p]==scI[q])		//--it's the same
		{	credit+=pr[p]*pr[q]; add+=pr[p]*pr[q]; alert("You win   "+pr[p]+" * "+pr[q]+" = "+pr[p]*pr[q]);
			d.fm.credit.value=credit; scI[p]=scI[q]=""; p=q=0;	//--set found
			if (--r==0)	{setCookie(0,credit); alert( "You're the best !"); location="./memory.htm"; }
		} else setTimeout('clon(0)',2500);
	}
	setCookie(0,credit);
	d.fm.add.value=add; d.fm.min.value=min; d.fm.trys.value=trys;
}

function init()	//--arg = pics 1-10, header, footer, Landscape, prise, title, list
{ var i,j, VIMG, VEXT, ROW=4, COL=5, W=85, H=105;
    r=Math.floor(ROW*COL/2);	//--r=nr of pictures
	title=init.arguments[r+4];
	p=init.arguments[r+3];
	if (init.arguments[r+5])	return 1;
 
	credit=getCookie(0); if (credit=="NULL" || isNaN(credit)) credit=200;
	credit=parseInt(credit); i=(c==69?0:p);
	if (i>=500) if (!confirm("Warning adults only ! \nAre you older than 18 ?") || confirm("Abort this game ?")) return 0;
	if (credit<i) { alert( "You need "+i+" for this game. Get some credit first !"); return 0; }	
	if (i>0) { if (confirm( "Pay "+i+" for this game ?")) credit-=i; else return 0; }
	if (init.arguments[r+2]=='L') { H=W; W=115; } //--Landscape
	VIMG=init.arguments[r];
	VEXT=init.arguments[r+1];
	for (i=1; i<=r; ++i)	//--preload images
	{	scI[i]=scI[i+r]=VIMG+init.arguments[i-1]+VEXT;
		imgPL[i]=new Image; imgPL[i].src=scI[i];
	}
	for (i=1; i<2*r; ++i)	//--scramble images
	{	j=Math.floor(2*r*Math.random());
		if (j==0 || j==i) ++j;
		p=scI[j]; scI[j]=scI[i]; scI[i]=p;
	}
	d.write("<form name='fm'><table>");	//--write table of pictures

	for(p=1,i=0; i<ROW; ++i)
	{	d.write("<tr>");
		for(j=0; j<COL; ++j, ++p)
		{	q=Math.floor(5*Math.random()); //random prise
			pr[p]=((q<2)?q:5*(q>3?q:--q)); //0 1 5 10 20
			d.write("<td><a href='javascript:clon("+p+ ")'><img src='");
			if (c==69)	d.write(scI[p]+"' name='p"+p+"' alt='p"+scI[p]);
			else		d.write("img/qm"+pr[p]+".gif' name='p"+p+ "' alt='?");
			d.write("' width="+W+" height="+H+" border=0 alt='p"+scI[p]+"'></a></td>");
		}
		d.write("<td><h4>"+
		(i==0?"Credit</h4></td><td><input type=text name='credit' size='6' value='0'> ":"")+
		(i==1?"Win +<br>Loose -</h4></td><td><input type=text name='add' size='6' value='0'><br><input type=text name='min' size='6' value='0'>":"")+
		(i==2?"Trys</h4></td><td><input type=text name='trys' size='6' value='0'>":"")+
		(i==ROW-1?"</td><td><br><br><a href=./memory.htm>Go Back</a></h4>":"")+
		"</td></tr>");
	} i=VIMG.indexOf('/',8); if (i<8) i=28;
	d.write("</table></form> &nbsp Images &copy by <a href=http://"+ VIMG.substring(7,i)+" target=_blank>"+VIMG.substring(7,i)+"</a>");
	add=min=trys=p=q=0; //nothing clicked
	d.fm.credit.value=credit;
	return 1;
}
//--The List
function getList(s, t)
{ var a, b, m, c=0;
  var p='http://anonymouse.ws/cgi-bin/anon-www.cgi/';
  a='http://images.google.com/images?q=tbn:';b='_wallpaper280.jpg'; m=':images.webshots.com/ProThumbs/';  
  var c=0;
  switch(s)
  { 
  case 1: a='http://www.dobit.com/dobit/images/Products/klein/'; b='.jpg'; c=init('popscan','sarissa','gladius','inttouch','securetouch','1525l','1266l','crossbow','1945c','acctouch',a,b,'L',0,"Touch screens",t); break;
  case 3: a='http://images.animfactory.com/animations/'; b='_md_wht.gif'; c=init('birds/eagles/bald_eagle_searching','birds/songbirds/cardinal_bird_bath','birds/ducks/cartoon_duck_head_blink','birds/crows/crows_eating','birds/ducks/duffy_duck_trying_to_fly','animals/dinosaurs/baby_trex_begging','animals/monkeys/bananas','animals/bears/bear_eating_picnic','animals/beavers/beaver_scaring_tree','animals/fish/big_fish_swimming',a ,b,'L',0,"Animation",t); break;
  case 4: a='http://images.animfactory.com/animations/'; b='_md_wht.gif'; c=init('insects/spiders/black_widow_dangle','insects/bees/buzzy_mad','insects/butterfly/monarch_flap','animals/dogs/big_headed_tiny_dog_awake','creatures/alien/alien_tai_chi','creatures/miscellaneous/beholder_hovering','creatures/vegieguys/cool_carrot','children/toys/fin_unwinding','nature/cactus/cactus_chewing_straw','nature/trees/apple_tree_eating_its_own_kind',a ,b,'L',0,"Animals",t); break;
  case 10: c=init('VdbiLiFRW_8C'+m+'26/8226','TqlaQO0gDSgC'+m+'11/23211','X3-pM4s0oZ0C'+m+'83/7083','kgGig9BdFpUC'+m+'14/7014','CUD82YpTkRMC'+m+'55/23955','sadQoZIijP8C'+m+'86/7086','l3hfjKGvr-AC'+m+'2/3102','y_b0BhLvYfMC'+m+'49/6549','K6ts5gn45dkC'+m+'80/7080','FcaMybZqIaMC'+m+'44/7044',a,b,'L',0,"Space",t); break;
  case 11: c=init('CUOmodyuoHsC'+m+'88/23988','nE4WP_V63SgC'+m+'6/4606','sdSNhYo_ZPIC'+m+'85/23985','EynH6QvekAMC'+m+'24/4624','jt-KQDYbApMC'+m+'3/4603','aX1Md656yO8C'+m+'21/4621','Er3vG3QOAH4C'+m+'42/4642','pdjipqu0rjEC'+m+'15/4615','JNrVtqjo3qYC'+m+'94/18794','K-xnSfgpQ-0C'+m+'33/19033',a,b,'L',0,"Cars",t); break;
  case 12: a='http://mmstn0'; m='.sac2.fastsearch.net/'; b=''; c=init('2'+m+'%0A%203b04a0f000000bbb000003f90000a8b2/wms/grandam/gallery.asp','1'+m+'%0A%2012c715d700000b0b0000000000001edcndex.shtml','1'+m+'0f7ae1ad0000097b0000000a0000e8dc','4'+m+'%0A%200e79943100000b3a00000bbe000094b5er/cars/Porsche/porsche.html','4'+m+'%0A%201d12820e000008e600000bb900008151%20%20/cars/Pagani/pagani.html','4'+m+'%0A%200e799f6b000007e300000bbe00009336%20%20/cars/Porsche/porsche.html','4'+m+'03440f85000009a000000bbb00000d9e','4'+m+'185efbc40000095200000bda0000f94c','4'+m+'%0A%2003ce450e00000ac200000bbb00004477er/cars/Porsche/porsche.html','3'+m+'00dba26300000bf8000007ee0000ae75',a,b,'L',0,"Cars 2",t); break;
  case 13: c=init('AN7U_FAZ2VgC'+m+'46/346','vmtlseJfwTgC'+m+'68/16368','1hM_gtjtLNYC'+m+'3/17803','cDlqPRKQ29QC'+m+'95/19195','d2RCxefV8oAC'+m+'80/24780','xrLeerTrQ7EC'+m+'12/18912','bam0Y5qIM9YC'+m+'53/16353','kgKbHMvrni0C'+m+'28/25928','WDBS2jnzIk4C'+m+'72/2372','ybswM39kc3wC'+m+'39/17939',a,b,'L',0,"Ocean Live",t); break;
  case 14: c=init('bX3GOiYalu4C'+m+'83/24783','qSw3fX7g26gC'+m+'92/15792','AbVr7gPIWf8C'+m+'8/17408','OKLYvO-1BjgC'+m+'68/20668','K8ApkhSY4AEC'+m+'81/18281','Ljzs6914DnQC'+m+'35/18335','2wwDsNeJaM0C'+m+'95/24795','ZqzUfI1hpOIC'+m+'91/17891','orDDTsmTjZMC'+m+'57/2457','uyi2BCgBHVAC'+m+'71/25171',a,b,'L',0,"Animals",t); break;
  case 15: c=init('0aTh2FE9TjQC'+m+'74/12274','2gXBi-37Ex0C'+m+'41/24641','EN-wmjNQ-ysC'+m+'63/29963','2kbuIqevvBEC'+m+'41/15741','ULArvcaCymEC'+m+'97/24397','AV1bT4UnxV0C'+m+'22/24522','B30YcFv1fgAC'+m+'43/27143','rJygvfTVXrgC'+m+'69/3269','FNUww-eRvGAC'+m+'33/27333','9wt34jfNxeYC'+m+'35/12435',a,b,'L',0,"Mountains",t); break;
  case 16: c=init('tHrjBOuO8eEC'+m+'42/142','uI0eWTXX-PUC'+m+'57/26857','D9TgR3eZ4mEC'+m+'52/2652','IuxWMe-xXrUC'+m+'37/14037','DC818ITa8J0C'+m+'80/12480','jGvntiDN-YAC'+m+'92/10992','PLaU70ZelBEC'+m+'22/25522','p2JfywdtFT8C'+m+'5/2505','ywjWsXBSZUUC'+m+'95/24995','tTIROdwdpywC'+m+'17/12417',a,b,'L',0,"WaterFalls",t); break;
  case 17: c=init('MtSXhuLZjn8C'+m+'21/27121','zHmkOIg6MUEC'+m+'1/24501','Joc7dLb2-uEC'+m+'20/15720','kiP-nUqb5ssC'+m+'41/26841','HrOmou6Ie3EC'+m+'86/24186','ipv7xHmFJHEC'+m+'83/18983','fU0ar08-JXUC'+m+'36/12336','2kbuIqevvBEC'+m+'41/15741','yfMhbbNYGHQC'+m+'35/3635','z2rVNeqVatcC'+m+'23/24623',a,b,'L',0,"Nature",t); break;
  case 18: b='.jpg'; c=init('c8PW3LzRHOwC:www.mcli.dist.maricopa.edu/alan/pix/grand-canyon','ywYDAqmGzQwC:www.flipbrowser.com/pictures/!Grand%2520Canyon%25202_jpg','WCmui30YfjIC:www.aaroads.com/gallery/az/jw/ariz-sign-indicating-closure-of-north-rim-of-grand-canyon','ewJ7o7YpoacC:www.c-landscapes.com/images/yellow_grand/images%255CGrand%2520Canyon%2520of%2520the%2520Yellowstone','eBp86wdvV3EC:www.imaginetours.com/images/AZ%2520Grand%2520Canyon%2520colors','HJ1uTEde2lkC:www.shops.azcentral.com/images/GRAND-CANYON-2','z_6VTVJeMaIC:www.morearty.com/yellowstone/c-07-grand-canyon-red','rRfsgGGQKTcC:www.eviaggiatori.it/sfondi/800x600%2520grand%2520canyon','y8hmLMKi2awC:www.iscas2002.com/gallery%255CGrand-Canyon-Mesas','eirP5-a0SSgC:www.airvegas.com/images/grand-canyon.canyon',a,b,'L',0,"Grand Canyon",t); break;
  case 21: a='http://mmstn0'; m='.sac2.fastsearch.net/'; b='';   c=init('1'+m+'%0A%20179e6b6b000007f60000000b00006c96t/','1'+m+'%0A%2017d96569000008630000000b00006d01t/','1'+m+'%0A%2015503465000008550000000300003c33index.shtml','5'+m+'02eab72700000c0b00000fae0000b482','4'+m+'200779cf00000e8400000bd200007c99','4'+m+'1f90478500000cf100000bd2000040a6','4'+m+'233df9fa00000da600000bd00000ff8c','4'+m+'1cb225900000089700000bd2000026d5','1'+m+'136c1d9b00000bc5000000040000165a','3'+m+'177ee77300000b84000007db0000eb2c',a,b,'L',0,"Sport",t); break;
  case 22: a='http://mmstn0'; m='.sac2.fastsearch.net/'; b=''; c=init('3'+m+'%0A%2029f2f8bf00000bcb000007df0000f4abr/movie1.html','4'+m+'250fe40900000c4200000bc80000e383','2'+m+'17f32d59000008e200000410000021ab','2'+m+'039b28ef00000bf80000041300002704','2'+m+'0710ace70000074a000004130000afbe','2'+m+'1d9602be00000c0c0000041000000aa2','2'+m+'0230c77a00000a6d000003f90000ceee','2'+m+'194d5aa2000008350000041000005687','2'+m+'2ebe5b4c00000d840000040d000052c5','1'+m+'%0A%201d428f6300000d0b0000000100008269',a,b,'L',0,"Movies",t); break;
  case 23: a='http://mmstn0'; m='.sac2.fastsearch.net/'; b=''; c=init('1'+m+'%0A%200ac17f3d00000aa70000000d00007597/wallpaper.htm','2'+m+'%0A%200b430f9800000c35000003fe00000053','2'+m+'067a3c1f0000086f0000041300003063','4'+m+'1a6e12910000075200000bc200001e01','4'+m+'1a70f8f200000ac800000bc20000f9f8','4'+m+'20121b1100000a8c00000bbe00001a23','3'+m+'263fbba10000097d000007d90000b505','4'+m+'33405d8000000b3400000bbf00005d0b','4'+m+'329f7f6e00000b1900000bbf00007fc8','3'+m+'241839c60000095c000007d900003743',a,b,'L',0,"Star Trek",t); break;
  case 50: a=p+a; b='.jpg'; c=init('Uf6EVkaxt2QC:home.att.net/~sigworth/Bikini','kfLwdFduXP8C:www.dailywebbabes.com/pictures/04-12-02','Jd-SF4lXopAC:www.ap1.250x.com/images/rain24','C0EBSJwADBYC:www.bikinibash.com/asians/asianbikini007','qjkC2bKFdtgC:www.ezdiscountstore.com/images/bikini','Lqr-VT1vKhIC:www.hallbar.com/free/bikini/weeklypic/230','Z2YCfR7eDlkC:www.livetosurf.co.uk/images/new-gallery/bikini/kimberly-fisher-bikini-pics099','FIPX8nv2F3gC:members.tripod.com/Humes2/images/bikini726189','4eCkNErkHqoC:www.centrum.is/aflagr34/Hannes/potb/gallery1/bikini','8yBbkSmkWiYC:www.bikinicenterfolds.com/msamples/bobbi/bobbi',a,b,'P',225,"Bikini Babes",t); break;
  case 51: a=p+'http://mmstn0'; m='.sac2.fastsearch.net/'; b=''; c=init('1'+m+'1aa88aef000008a7000000070000824f','1'+m+'1d49f018000009f1000000210000f9c8','3'+m+'24248c8000000b60000007f300008013','4'+m+'13182858000008f400000bbd00002b11','1'+m+'359d890900000b050000001e00008212','1'+m+'1ccbb65b0000095c000000230000bf24','1'+m+'1fbfefe5000009ad000000230000e66b','1'+m+'0bc51dff000008b2000000210000156c','2'+m+'270e8c2b00000a5d0000040000008276','1'+m+'31ebf65700000ae20000001e0000fcab',a,b,'P',250,"Super Models",t); break;
  case 301: a=p+a; b='.jpg'; c=init('uzA_88jaMJcC:www.sex.analsexfotos.com/bondage/woman','epahbw7qFCQC:www.ourpics.com/woman/ap12','GrE1iySSubsC:www.lipsticksex.net/Pictures/snuffelhoekje/update1501/amateurs41','FvHos6Xny1cC:www.sex-mirror.com/done/2313','_HfrQljZ-WUC:www.beautiful-teens.com/girlie26','DPRM452bYkYC:tgp.adulttoychest.com/s/gifs/badkitty_pic','fv2hswv5wlgC:www.terra.es/personal7/poltedm/pic/images/pic05','saLGg3N0otQC:users.skynet.be/phon/cthumbs/bigth1','1K6PuaXjn9kC:www.realsexinc.com/images/tgp/tgp10','TLIADYCfcsUC:www.pornomoviepost.com/babes/images/All%2520Beauty%2520Babes/babe_11',a,b,'P',500,"More Babes",t); break;
  case 302: a=p+a; b='.jpg'; c=init('AJ5pNjGIYqwC:qualitycounts.com/pix/breasts','WXkwR6wCzHkC:proven.virtualave.net/lierac/breasts','lS4o51nc340C:www.oxygen.ie/unilife/pics/breasts','juhxbv3i_WoC:www.physiol.ox.ac.uk/~jsm/Portfolio%25201/breasts','QN45sDxmp3QC:hometown.aol.com/redhotpinoy/images/trish%2520stratus%2520with%2520big%2520breasts%2520in%2520a%2520small%2520orange%2520bikini','5M6M7Stak4YC:www.breastaugmentation.com/images/breast4','Jxt2QRqWck0C:www.effect.net.au/lukastan/humour/Visual-Rude/Breasts-01/QueenMom','ujhZb-HOgLYC:art-slab.ucsd.edu/ARTSLAB/Homework/images/add_breasts','HLW1vjp_JpcC:images-eu.amazon.com/images/P/3854923783.03.LZZZZZZZ','kBhbTqrapUcC:24.246.38.145/Art/fractals/full/breasts',a,b,'P',550,"Tits",t); break;
  case 303: a=p+'http://mmstn0'; m='.sac2.fastsearch.net/'; b=''; c=init('2'+m+'144acde700000993000003f30000c787','1'+m+'3d250e010000085d0000001d00000641','4'+m+'2940078600000aaa00000bd3000006ff','2'+m+'1babd42c000009140000040a0000d932','2'+m+'25416c6300000b7c000003ed000064f2','5'+m+'1397c10400000a0100000fb10000c4b4','3'+m+'3349ae29000009fb000007f80000a02a','5'+m+'24765498000009f200000fa5000052cf','1'+m+'1ac3bcd700000ac00000000c0000b61b','1'+m+'2def1a7900000cd30000000e000016a4',a,b,'P',750,"More Tits",t); break;
  //'3'+m+'19aeb97a000007d5000007d70000b978'
  case 304: a=p+'http://mmstn0'; m='.sac2.fastsearch.net/'; b=''; c=init('2'+m+'316f76ee00000ca2000003f5000079b9','5'+m+'0a1ff402000009eb00000fb40000f25d','5'+m+'0a3ce7ce00000a1000000fb40000e26a','5'+m+'0e97c6da000006f400000fa70000cf89','5'+m+'1695759a0000074b00000faa00007d7b','5'+m+'1695251900000a8c00000faa0000203f','2'+m+'0dc347c1000009f6000003f700004dc0','5'+m+'0e98604200000a9d00000fa700006578','3'+m+'18c810db000006d0000007e0000011eb','2'+m+'29eccc96000007e0000004020000cf74',a,b,'L',1250,"Pussy's",t); break;
  //'1'+m+'%0A%2017a34fc5000009ed0000000900004621AND%20LIVE%20SHOWS',
  }
  return c;
} 

//--Main---
var s=parseInt("0"+getPara("a"),10);
var c=parseInt("0"+getPara("c"),10);
var n=getPara("p");
if (n!="NULL") { if (n=="Camille") c=6; else alert("Wrong password\n\nTip: Real first name of BB (FR)\n(7 chars, Case sensitive)"); }
d.write("<table align='center'"+ (s<1?"":"bgcolor='#ffffff' background='img/bgnd.gif' border='4'")+"><tr><td>");
  if (s>0) 
  {		c=getList(s,0);
		if (c==0) d.write("<h4><a href=./memory.htm>Go Back</a></h4>");
  }
  if (s==0)
  {	n=getCookie(2); if (n=="NULL") n="";
    credit=getCookie(0); if (credit=="NULL") credit=200; credit=parseInt(credit);
	d.write( "<H2>Hey "+n+" ! </H2>This is a variant of the Memory game. The goal is to find two of the same images. However for every click on an image you loose 0, 5, 10 or 20 credits. But if you find a set you win the product! So you can win up to 20*20 = 400 credits with just two clicks. The more credits you get the more games you can play.<br>I give you 200 credits for free, to start playing. If you run out of credits, get extra credits by catching the thing. I also give you 1000 credits for every Euro/Dollar attached to an email send to <a href='mailto:smultita at gmail.com'>smultita at gmail.com</a> <b>;)</b><br>"+
	"<form name='fm' onsubmit='setCookie(2,frname.value); return 0;'>Please enter your <b>name </b><input type='text' name='frname'> <input type='submit' value='Enter'> &nbsp &nbsp Your <b>Credit </b> is &nbsp <input type=text name='credit' size='8' value='0'></form>"+
	(credit>999 ? "You can now download the <a href='pub/dlrsrc.zip'><b>DLR source</b></a>":
	"Collect 1000 Credits to download the <b>DLR source</b>") +
	"<br>Start playing by selecting one of the links below.<br><b>Have Fun !</b><br><br>");    
	d.write( "<table><tr><td width='50%'><dt>");
	for (var i=2; i<(c==6?300:100); ++i)
	{	n=getList(i,1);
		if (n==1)	d.writeln("<dd><a href=memory.htm?a="+i+">"+title+"</a> &nbsp &nbsp "+(p==0?" &nbsp &nbsp ":" Cost "+p+" credits"));
		else if (n==2)	d.writeln("<dt>"+title);
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
