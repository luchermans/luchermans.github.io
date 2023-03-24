/*----------------------------------------
(C) Luc Hermans        \\ //     2000-2001
------------------000--(O)(O)--000------*/
//-- what a mess ! --
//external function ani_hit()
var NS,mX,mY,aX,aY,angle,speed,aW,aH,ani,aniMG,ash=0, spl=new Array(), aniPL=new Array();
for (var i=0; i<8; ++i)
{	aniPL[i]=new Image; aniPL[i].src="img/ani"+i+".gif";
}
NS=(document.layers?1:0); 
if (NS) {	ani=document.layers["Animal"];	aniMG=ani.document.images["AniIMG"];
			aW=window.innerWidth; aH=window.innerHeight;
			document.captureEvents(Event.MOUSEMOVE); }
else    {	ani=document.all["Animal"].style; aniMG=document.images["AniIMG"];
		 	aW=document.body.offsetWidth; aH=document.body.offsetHeight; }
document.onmousemove=gMousePos;
aH+=50; aW+=50; aX=aY=angle=speed=10;
for (var i=0; i<8; ++i)
	if (NS)	spl[i]=document.layers["ani"+i];
	else	spl[i]=document.all["ani"+i].style; 
ani_go();
	
function ani_go()
{ var d;
	if (aX<-100) angle=0; else if (aY<-100) angle=32;			//always go back onscreen
	else if (aX>aW) angle=64; else if (aY>aH) angle=96;
	d=Math.abs(aX+10-mX)+Math.abs(aY+10-mY);	//get mouse distance .. check catch 
	if (d<12) { ash=++ash%8; speed=-2000; spl[ash].left=aX; spl[ash].top=aY;	//if hit
				spl[ash].visibility=(NS?"show":"visible"); aX=angle=0; ani_hit();} 	//inc speed
	else if (d<64) speed=128; else if (d<128) speed=112; else if (d<256) speed=96; //else rnd speed
	else { speed=Math.abs(speed-8+Math.ceil(16*Math.random()))%128; while (speed>80) speed-=32; }
	angle=Math.abs(angle-8+Math.ceil(16*Math.random()))%128;	//random angle
	d=Math.ceil(angle/16)%8; 	aniMG.src=aniPL[d].src;	//set img src on angle
	if ((d%4)!=0)	aY+=Math.ceil(2+speed/8)*( d<4?1:-1 );		//move img angle and speed
	if ((d%4)!=2)	aX+=Math.ceil(2+speed/8)*( (++d%8)<4?1:-1 );
	ani.left=aX;	ani.top=aY;	setTimeout('ani_go()',144-speed);
}
function gMousePos(e)
{	if (NS) { mX=e.pageX;	mY=e.pageY; }
	else	{ mX=event.clientX + document.body.scrollLeft;
			  mY=event.clientY + document.body.scrollTop; }
}
