<script>
//*********************************************************//
//Create context, start of file
var c;

//*********************************************************//
//*********//
//Math functions
//Converts from degrees to radians, return number
Math.radians = function(degrees) {
	  return degrees * Math.PI / 180;
	};

// Converts from radians to degrees, return number
Math.degrees = function(radians) {
	  return radians * 180 / Math.PI;
	};

// Calculates Deps, return x axis distance between points
function deps(azimuth, distance){
		return distance*Math.sin(Math.radians(azimuth));	
	}
	
// Calculates Lats, return y axis distance between points
function lats(azimuth, distance){
		return distance*Math.cos(Math.radians(azimuth));
	}
	
// Coordinate Inversion, return distance between two points
function inverse(x1, y1, x2, y2){
	return Math.sqrt((Math.pow(x2-x1,2))+(Math.pow(y2-y1, 2)));
	}
	
//Azimuth between two points:
 function azCalc(x1, y1, x2, y2){
	var ang = Math.degrees(Math.atan2((y2-y1),(x2-x1)));
	if (x2>=x1){
		if(y2<=y1){return 90+ang;}
		else{return 90+ang;}
		}
	if (x2<=x1){
		if(y2>=y1){return 90+ang;}
		else{return 450+ang;}
		}
	}
	
function mathAng(x1, y1, x2, y2){
	return Math.atan2((y2-y1),(x2-x1));
}
	
//Decimal Degrees --> ##° ##' ##" DMS conversion with spaces, text
function dms(dd){
	if (dd>360){dd=dd%360;}
	if (dd<0){dd=360+(dd%360);}
	var deg = Math.floor(dd);
	var min = Math.floor((dd-Math.floor(dd))*60);
	var sec = Math.floor((((dd-Math.floor(dd))*60)-Math.floor((dd-Math.floor(dd))*60))*60);
	return deg + '° ' + min + "' ";	
	}

function sphereVol(radius){
	return (4/3)*(Math.PI*(Math.pow(radius, 3)));
}

//*********//
//Time Functions:
//Decimal Seconds to ##:##:##: format
function formatTime(t){
	var hrs = Math.floor(t/3600);
	var mins = Math.floor((t%3600)/60);
	var secs = Math.floor((((t%3600)/60)- Math.floor((t%3600)/60))*60);
		if (mins<10){
			mins = "0"+ mins;
			}
		if(secs<10){
			secs = "0" + secs;
			}
	return hrs + ":" + mins +":"+secs;
	}


//*********************************************************//
//*********//
//User inputs:
//Mouse input:
var mouseX, mouseY;
$(document).mousemove(function(e) {
	mouseX = e.pageX;
	mouseY = e.pageY;
}).mouseover();

//Mousedown/Mouseup:
var mouseDown;
$(document).mousedown(function(e) {
	mouseDown = true;
}).click(); 


$(document).mouseup(function(e) {
	mouseDown = false;
}).click(); 

var mapScale = 1;
var n;

//Mousewheelup/Mousewheeldown:
$(document).on('mousewheel DOMMouseScroll', function(e){
if(typeof e.originalEvent.detail == 'number' && e.originalEvent.detail !== 0) {
	if(e.originalEvent.detail > 0) {
		//console.log('Down');
    } else if(e.originalEvent.detail < 0){
       //console.log('Up');
    }
  } else if (typeof e.originalEvent.wheelDelta == 'number') {
    if(e.originalEvent.wheelDelta < 0) {
		if (mapScale>=0.975){
			mapScale =0.975;
		}
		//console.log('Down');
		mapScale +=0.025;
		n = mapScale.toFixed(3);
		//console.log(n);
    } else if(e.originalEvent.wheelDelta > 0) {		
		if (mapScale<=0.500){
			mapScale =0.500;
		}
        //console.log('Up');
		mapScale -=0.025;
		n = mapScale.toFixed(3);
		//console.log(n);
    }
  }
});


//*********//
//Keyboard Inputs:
// Simultaneous Keyboard input array:
var keys = [];
keysDown = function(){keys[keyCode] = true; };
keysUp = function(){keys[keyCode] = false; };
	
//Individual Keyboard input:
rightDown = false;
leftDown = false;
downDown = false;
upDown = false;
	
wDown	= false;
aDown	= false;
sDown	= false;
dDown	= false;

rDown = false;
fDown = false;

spaceDown = false;
shiftDown = false;

key1Down = false;

//Set Keys Down
function onKeyDown(evt) {
		if (evt.keyCode == 39		)rightDown= true;
		else if (evt.keyCode == 38	)upDown   = true;
		else if (evt.keyCode == 37	)leftDown = true;
		else if (evt.keyCode == 40	)downDown = true;
		
		else if (evt.keyCode ==	81  )qDown	  = true;
		else if (evt.keyCode ==	65  )aDown	  = true;
		else if (evt.keyCode ==	83  )sDown	  = true;
		else if (evt.keyCode ==	87 	)wDown	  = true;
		else if (evt.keyCode ==	68  )dDown	  = true;
		else if (evt.keyCode ==	69  )eDown	  = true;
		
		else if (evt.keyCode ==	70 ) fDown	  = true;
		else if (evt.keyCode ==	82 ) rDown	  = true;
		
		else if (evt.keyCode ==	32 ) spaceDown	  = true;
		else if (evt.keyCode ==	16 ) shiftDown	  = true;
		
		else if (evt.keyCode ==	49  )key1Down	  = true;
	}

//Set Keys Up
function onKeyUp(evt) {
		if (evt.keyCode == 39		)rightDown= false;
		else if (evt.keyCode == 38	)upDown   = false;
		else if (evt.keyCode == 37	)leftDown = false;
		else if (evt.keyCode == 40	)downDown = false;
		
		else if (evt.keyCode ==	81  )qDown 	  = false;
		else if (evt.keyCode ==	65  )aDown 	  = false;
		else if (evt.keyCode ==	83  )sDown 	  = false;
		else if (evt.keyCode ==	87  )wDown	  = false;
		else if (evt.keyCode ==	68  )dDown	  = false;
		else if (evt.keyCode ==	69 ) eDown	  = false;
		
		else if (evt.keyCode ==	82  )rDown	  = false;
		else if (evt.keyCode ==	70  )fDown	  = false;
		
		else if (evt.keyCode ==	32  )spaceDown	  = false;
		else if (evt.keyCode ==	16 )shiftDown	  = false;
		
		else if (evt.keyCode ==	49  )key1Down	  = false;
	}

//Call KeyUp/Keydown functions
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);	

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}	



//*********************************************************//	
//On body load init function:

function init(){

//*********//
//Declare timeCounter and retrieve date:
var t = 0;
var startDate = new Date();
//Increment time function:
function timeInc(){
	t = t + (0.025);
	return t;
}
//*********//
//Declare map scale:

var starCoords={
posX:[],
posY:[]
}

function initializeMiniStars(){
starCoords.posX[1]=49.5674064602339;starCoords.posY[1]=45.3119092672947;
starCoords.posX[2]=45.6249809093122;starCoords.posY[2]=41.2011809440484;
starCoords.posX[3]=41.6726918178846;starCoords.posY[3]=30.2632786122476;
starCoords.posX[4]=45.6249809093122;starCoords.posY[4]=41.2011809440484;
starCoords.posX[5]=48.3597899279777;starCoords.posY[5]=34.0025981940632;
starCoords.posX[6]=41.6726918178846;starCoords.posY[6]=30.2632786122476;
starCoords.posX[7]=54.3643658073572;starCoords.posY[7]=40.2850358882018;
starCoords.posX[8]=48.3597899279777;starCoords.posY[8]=34.0025981940632;
starCoords.posX[9]=49.5674064602339;starCoords.posY[9]=45.3119092672947;
starCoords.posX[10]=54.3643658073572;starCoords.posY[10]=40.2850358882018;
starCoords.posX[11]=49.5674064602339;starCoords.posY[11]=45.3119092672947;
starCoords.posX[12]=56.064373467345;starCoords.posY[12]=47.7413810507458;
starCoords.posX[13]=56.064373467345;starCoords.posY[13]=47.7413810507458;
starCoords.posX[14]=65.8307387029158;starCoords.posY[14]=50.2410261863728;
starCoords.posX[15]=63.6881800840701;starCoords.posY[15]=45.1523777070039;
starCoords.posX[16]=65.8307387029158;starCoords.posY[16]=50.2410261863728;
starCoords.posX[17]=54.3643658073572;starCoords.posY[17]=40.2850358882018;
starCoords.posX[18]=63.6881800840701;starCoords.posY[18]=45.1523777070039;
starCoords.posX[19]=67.5185199488981;starCoords.posY[19]=51.7483858208157;
starCoords.posX[20]=65.8307387029158;starCoords.posY[20]=50.2410261863728;
starCoords.posX[21]=54.3643658073572;starCoords.posY[21]=40.2850358882018;
starCoords.posX[22]=60.8412335669295;starCoords.posY[22]=35.107129530891;
starCoords.posX[23]=67.2314183952795;starCoords.posY[23]=27.9785004048204;
starCoords.posX[24]=60.8412335669295;starCoords.posY[24]=35.107129530891;
starCoords.posX[25]=153.028223725115;starCoords.posY[25]=49.2698305325388;
starCoords.posX[26]=158.931555888654;starCoords.posY[26]=54.8798882800571;
starCoords.posX[27]=166.397706574534;starCoords.posY[27]=55.9124612936992;
starCoords.posX[28]=158.931555888654;starCoords.posY[28]=54.8798882800571;
starCoords.posX[29]=166.397706574534;starCoords.posY[29]=55.9124612936992;
starCoords.posX[30]=176.036722207398;starCoords.posY[30]=56.9840134940243;
starCoords.posX[31]=180;starCoords.posY[31]=54.6098641027518;
starCoords.posX[32]=176.036722207398;starCoords.posY[32]=56.9840134940243;
starCoords.posX[33]=-178.571339635615;starCoords.posY[33]=53.6460596699241;
starCoords.posX[34]=-180;starCoords.posY[34]=54.6098641027518;
starCoords.posX[35]=-165.590563914453;starCoords.posY[35]=56.3352563468371;
starCoords.posX[36]=-178.571339635615;starCoords.posY[36]=53.6460596699241;
starCoords.posX[37]=-166.06634130491;starCoords.posY[37]=61.7037636468757;
starCoords.posX[38]=-165.590563914453;starCoords.posY[38]=56.3352563468371;
starCoords.posX[39]=180;starCoords.posY[39]=58.3710656202174;
starCoords.posX[40]=176.036722207398;starCoords.posY[40]=56.9840134940243;
starCoords.posX[41]=-166.06634130491;starCoords.posY[41]=61.7037636468757;
starCoords.posX[42]=-180;starCoords.posY[42]=58.3710656202174;
starCoords.posX[43]=-166.06634130491;starCoords.posY[43]=61.7037636468757;
starCoords.posX[44]=-143.051597223311;starCoords.posY[44]=63.0229708179408;
starCoords.posX[45]=-165.590563914453;starCoords.posY[45]=56.3352563468371;
starCoords.posX[46]=-147.903309556071;starCoords.posY[46]=58.997500095898;
starCoords.posX[47]=-143.051597223311;starCoords.posY[47]=63.0229708179408;
starCoords.posX[48]=-147.903309556071;starCoords.posY[48]=58.997500095898;
starCoords.posX[49]=-127.747307845029;starCoords.posY[49]=60.6884066291365;
starCoords.posX[50]=-147.903309556071;starCoords.posY[50]=58.997500095898;
starCoords.posX[51]=-127.747307845029;starCoords.posY[51]=60.6884066291365;
starCoords.posX[52]=-143.051597223311;starCoords.posY[52]=63.0229708179408;
starCoords.posX[53]=-143.364642743894;starCoords.posY[53]=51.6382453265365;
starCoords.posX[54]=-147.903309556071;starCoords.posY[54]=58.997500095898;
starCoords.posX[55]=-143.364642743894;starCoords.posY[55]=51.6382453265365;
starCoords.posX[56]=-136.054989272363;starCoords.posY[56]=47.1214921869982;
starCoords.posX[57]=-134.952900611945;starCoords.posY[57]=48.0074521374953;
starCoords.posX[58]=-136.054989272363;starCoords.posY[58]=47.1214921869982;
starCoords.posX[59]=-178.571339635615;starCoords.posY[59]=53.6460596699241;
starCoords.posX[60]=-176.628036421237;starCoords.posY[60]=47.7307764254422;
starCoords.posX[61]=-167.538405499034;starCoords.posY[61]=44.450929019822;
starCoords.posX[62]=-176.628036421237;starCoords.posY[62]=47.7307764254422;
starCoords.posX[63]=-167.538405499034;starCoords.posY[63]=44.450929019822;
starCoords.posX[64]=-155.712181486426;starCoords.posY[64]=41.4551342156708;
starCoords.posX[65]=-155.712181486426;starCoords.posY[65]=41.4551342156708;
starCoords.posX[66]=-154.405985190038;starCoords.posY[66]=42.8704525431094;
starCoords.posX[67]=-169.737537659295;starCoords.posY[67]=33.0463772044257;
starCoords.posX[68]=-176.628036421237;starCoords.posY[68]=47.7307764254422;
starCoords.posX[69]=165.890136085658;starCoords.posY[69]=38.2711221633776;
starCoords.posX[70]=171.45804862155;starCoords.posY[70]=41.309296720923;
starCoords.posX[71]=161.927297669964;starCoords.posY[71]=27.8318561447167;
starCoords.posX[72]=173.156493223589;starCoords.posY[72]=28.2200477010887;
starCoords.posX[73]=161.927297669964;starCoords.posY[73]=27.8318561447167;
starCoords.posX[74]=162.39549008994;starCoords.posY[74]=17.4829824005436;
starCoords.posX[75]=-146.586745275833;starCoords.posY[75]=23.7336187936337;
starCoords.posX[76]=-148.315563911098;starCoords.posY[76]=25.9655236025372;
starCoords.posX[77]=-154.293833488839;starCoords.posY[77]=23.3734377378396;
starCoords.posX[78]=-148.315563911098;starCoords.posY[78]=25.9655236025372;
starCoords.posX[79]=-155.112606294813;starCoords.posY[79]=19.7973173580359;
starCoords.posX[80]=-154.293833488839;starCoords.posY[80]=23.3734377378396;
starCoords.posX[81]=-155.112606294813;starCoords.posY[81]=19.7973173580359;
starCoords.posX[82]=-151.952143452708;starCoords.posY[82]=16.7196929909231;
starCoords.posX[83]=-152.209894111278;starCoords.posY[83]=11.9241323929535;
starCoords.posX[84]=-151.952143452708;starCoords.posY[84]=16.7196929909231;
starCoords.posX[85]=-148.315563911098;starCoords.posY[85]=25.9655236025372;
starCoords.posX[86]=-141.290680772689;starCoords.posY[86]=26.1443428006111;
starCoords.posX[87]=-143.054641993722;starCoords.posY[87]=22.9290675011709;
starCoords.posX[88]=-141.290680772689;starCoords.posY[88]=26.1443428006111;
starCoords.posX[89]=-146.586745275833;starCoords.posY[89]=23.7336187936337;
starCoords.posX[90]=-143.054641993722;starCoords.posY[90]=22.9290675011709;
starCoords.posX[91]=-146.586745275833;starCoords.posY[91]=23.7336187936337;
starCoords.posX[92]=-151.952143452708;starCoords.posY[92]=16.7196929909231;
starCoords.posX[93]=-155.112606294813;starCoords.posY[93]=19.7973173580359;
starCoords.posX[94]=-168.642775124938;starCoords.posY[94]=20.4759636941439;
starCoords.posX[95]=-177.377642576926;starCoords.posY[95]=14.523396764066;
starCoords.posX[96]=-168.642775124938;starCoords.posY[96]=20.4759636941439;
starCoords.posX[97]=-177.377642576926;starCoords.posY[97]=14.523396764066;
starCoords.posX[98]=-168.674781158105;starCoords.posY[98]=15.381811599586;
starCoords.posX[99]=-168.642775124938;starCoords.posY[99]=20.4759636941439;
starCoords.posX[100]=-168.674781158105;starCoords.posY[100]=15.381811599586;
starCoords.posX[101]=-168.674781158105;starCoords.posY[101]=15.381811599586;
starCoords.posX[102]=-151.952143452708;starCoords.posY[102]=16.7196929909231;
starCoords.posX[103]=-168.674781158105;starCoords.posY[103]=15.381811599586;
starCoords.posX[104]=-171.094557630349;starCoords.posY[104]=10.4813866002595;
starCoords.posX[105]=-171.094557630349;starCoords.posY[105]=10.4813866002595;
starCoords.posX[106]=-170.397109073196;starCoords.posY[106]=5.98129558942369;
starCoords.posX[107]=-163.449457538219;starCoords.posY[107]=34.1681874780243;
starCoords.posX[108]=-157.097174230488;starCoords.posY[108]=36.6623563992738;
starCoords.posX[109]=-157.097174230488;starCoords.posY[109]=36.6623563992738;
starCoords.posX[110]=-151.985606177053;starCoords.posY[110]=35.2017103349682;
starCoords.posX[111]=-163.449457538219;starCoords.posY[111]=34.1681874780243;
starCoords.posX[112]=-156.603505083475;starCoords.posY[112]=33.7514301358028;
starCoords.posX[113]=-151.985606177053;starCoords.posY[113]=35.2017103349682;
starCoords.posX[114]=-156.603505083475;starCoords.posY[114]=33.7514301358028;
starCoords.posX[115]=-151.985606177053;starCoords.posY[115]=35.2017103349682;
starCoords.posX[116]=-143.689144242805;starCoords.posY[116]=36.3583345777586;
starCoords.posX[117]=-131.80630176333;starCoords.posY[117]=28.7274648150868;
starCoords.posX[118]=-130.948039202633;starCoords.posY[118]=21.4366136212708;
starCoords.posX[119]=-131.295357149085;starCoords.posY[119]=18.1221981678986;
starCoords.posX[120]=-130.948039202633;starCoords.posY[120]=21.4366136212708;
starCoords.posX[121]=-131.295357149085;starCoords.posY[121]=18.1221981678986;
starCoords.posX[122]=-134.741121748815;starCoords.posY[122]=11.8234450468253;
starCoords.posX[123]=-124.247448722793;starCoords.posY[123]=9.15817014419669;
starCoords.posX[124]=-131.295357149085;starCoords.posY[124]=18.1221981678986;
starCoords.posX[125]=-114.941638587786;starCoords.posY[125]=5.20449422495906;
starCoords.posX[126]=-111.906364536972;starCoords.posY[126]=8.27118651034542;
starCoords.posX[127]=-133.964194162073;starCoords.posY[127]=5.9117791247862;
starCoords.posX[128]=-131.809980951938;starCoords.posY[128]=6.38636845855492;
starCoords.posX[129]=-131.809980951938;starCoords.posY[129]=6.38636845855492;
starCoords.posX[130]=-129.529877300034;starCoords.posY[130]=5.67281240676994;
starCoords.posX[131]=-129.529877300034;starCoords.posY[131]=5.67281240676994;
starCoords.posX[132]=-129.803605282594;starCoords.posY[132]=3.31028607172354;
starCoords.posX[133]=-130.92042923181;starCoords.posY[133]=3.36678898420744;
starCoords.posX[134]=-129.803605282594;starCoords.posY[134]=3.31028607172354;
starCoords.posX[135]=-130.92042923181;starCoords.posY[135]=3.36678898420744;
starCoords.posX[136]=-132.22399729346;starCoords.posY[136]=5.80510973877016;
starCoords.posX[137]=-133.964194162073;starCoords.posY[137]=5.9117791247862;
starCoords.posX[138]=-138.704474249209;starCoords.posY[138]=2.277710444572;
starCoords.posX[139]=-138.704474249209;starCoords.posY[139]=2.277710444572;
starCoords.posX[140]=-145.075545752631;starCoords.posY[140]=-1.18272625128749;
starCoords.posX[141]=-142.004369512122;starCoords.posY[141]=-8.69696601888907;
starCoords.posX[142]=-145.075545752631;starCoords.posY[142]=-1.18272625128749;
starCoords.posX[143]=-142.004369512122;starCoords.posY[143]=-8.69696601888907;
starCoords.posX[144]=-147.974792407003;starCoords.posY[144]=-14.8878822271408;
starCoords.posX[145]=-147.974792407003;starCoords.posY[145]=-14.8878822271408;
starCoords.posX[146]=-151.38780015052;starCoords.posY[146]=-13.1073717917657;
starCoords.posX[147]=-152.754203186729;starCoords.posY[147]=-12.3973737598426;
starCoords.posX[148]=-151.38780015052;starCoords.posY[148]=-13.1073717917657;
starCoords.posX[149]=-152.754203186729;starCoords.posY[149]=-12.3973737598426;
starCoords.posX[150]=-156.628861404243;starCoords.posY[150]=-16.8809922943635;
starCoords.posX[151]=-162.514027196822;starCoords.posY[151]=-16.2401001684507;
starCoords.posX[152]=-156.628861404243;starCoords.posY[152]=-16.8809922943635;
starCoords.posX[153]=-152.096449412301;starCoords.posY[153]=-0.414667249884511;
starCoords.posX[154]=-157.684723245609;starCoords.posY[154]=-0.682076198645744;
starCoords.posX[155]=-157.684723245609;starCoords.posY[155]=-0.682076198645744;
starCoords.posX[156]=-157.480795488574;starCoords.posY[156]=-2.78406208977356;
starCoords.posX[157]=-152.096449412301;starCoords.posY[157]=-0.414667249884511;
starCoords.posX[158]=-148.235249361677;starCoords.posY[158]=-8.14642587871741;
starCoords.posX[159]=-162.514027196822;starCoords.posY[159]=-16.2401001684507;
starCoords.posX[160]=-165.051591570079;starCoords.posY[160]=-18.3458397039589;
starCoords.posX[161]=-165.051591570079;starCoords.posY[161]=-18.3458397039589;
starCoords.posX[162]=-168.022363383432;starCoords.posY[162]=-22.8734938170608;
starCoords.posX[163]=-171.330272945816;starCoords.posY[163]=-17.7321627339345;
starCoords.posX[164]=-168.022363383432;starCoords.posY[164]=-22.8734938170608;
starCoords.posX[165]=-169.945053535894;starCoords.posY[165]=-14.8265017648242;
starCoords.posX[166]=-165.051591570079;starCoords.posY[166]=-18.3458397039589;
starCoords.posX[167]=-169.945053535894;starCoords.posY[167]=-14.8265017648242;
starCoords.posX[168]=-171.330272945816;starCoords.posY[168]=-17.7321627339345;
starCoords.posX[169]=-171.330272945816;starCoords.posY[169]=-17.7321627339345;
starCoords.posX[170]=-176.301773680999;starCoords.posY[170]=-18.3992866389554;
starCoords.posX[171]=-176.301773680999;starCoords.posY[171]=-18.3992866389554;
starCoords.posX[172]=-179.115836569641;starCoords.posY[172]=-17.1995388655338;
starCoords.posX[173]=-174.281730537711;starCoords.posY[173]=-9.85071645771095;
starCoords.posX[174]=-171.263136919778;starCoords.posY[174]=-10.907467636843;
starCoords.posX[175]=-169.945053535894;starCoords.posY[175]=-14.8265017648242;
starCoords.posX[176]=-171.263136919778;starCoords.posY[176]=-10.907467636843;
starCoords.posX[177]=175.935255644341;starCoords.posY[177]=-17.5905271081829;
starCoords.posX[178]=172.419914857059;starCoords.posY[178]=-16.5637299911504;
starCoords.posX[179]=175.935255644341;starCoords.posY[179]=-17.5905271081829;
starCoords.posX[180]=177.35579369741;starCoords.posY[180]=-22.6684335801483;
starCoords.posX[181]=171.28790898455;starCoords.posY[181]=-23.4449212628862;
starCoords.posX[182]=177.35579369741;starCoords.posY[182]=-22.6684335801483;
starCoords.posX[183]=171.28790898455;starCoords.posY[183]=-23.4449212628862;
starCoords.posX[184]=172.419914857059;starCoords.posY[184]=-16.5637299911504;
starCoords.posX[185]=-173.359143200191;starCoords.posY[185]=-31.9060097282442;
starCoords.posX[186]=-168.022363383432;starCoords.posY[186]=-22.8734938170608;
starCoords.posX[187]=-173.359143200191;starCoords.posY[187]=-31.9060097282442;
starCoords.posX[188]=-178.338320298044;starCoords.posY[188]=-33.9568192168686;
starCoords.posX[189]=160.150438937069;starCoords.posY[189]=-23.2173519092748;
starCoords.posX[190]=180;starCoords.posY[190]=33.3251790521346;
starCoords.posX[191]=-180;starCoords.posY[191]=-33.3251790521346;
starCoords.posX[192]=-178.338320298044;starCoords.posY[192]=-33.9568192168686;
starCoords.posX[193]=160.150438937069;starCoords.posY[193]=-23.2173519092748;
starCoords.posX[194]=148.282142580288;starCoords.posY[194]=-26.7238298135493;
starCoords.posX[195]=148.282142580288;starCoords.posY[195]=-26.7238298135493;
starCoords.posX[196]=137.298164660822;starCoords.posY[196]=-27.9962098201044;
starCoords.posX[197]=137.158721535056;starCoords.posY[197]=-16.0775344276304;
starCoords.posX[198]=133.853724652293;starCoords.posY[198]=-25.3157560239086;
starCoords.posX[199]=130.630048948441;starCoords.posY[199]=-9.41467855161866;
starCoords.posX[200]=137.158721535056;starCoords.posY[200]=-16.0775344276304;
starCoords.posX[201]=130.630048948441;starCoords.posY[201]=-9.41467855161866;
starCoords.posX[202]=125.995912961918;starCoords.posY[202]=-14.818211130205;
starCoords.posX[203]=137.158721535056;starCoords.posY[203]=-16.0775344276304;
starCoords.posX[204]=125.995912961918;starCoords.posY[204]=-14.818211130205;
starCoords.posX[205]=125.610675917275;starCoords.posY[205]=-28.1634920391595;
starCoords.posX[206]=125.995912961918;starCoords.posY[206]=-14.818211130205;
starCoords.posX[207]=125.610675917275;starCoords.posY[207]=-28.1634920391595;
starCoords.posX[208]=125.201075468866;starCoords.posY[208]=-29.8058833738351;
starCoords.posX[209]=138.326770270124;starCoords.posY[209]=1.85646510930442;
starCoords.posX[210]=149.476913334905;starCoords.posY[210]=1.5025419671549;
starCoords.posX[211]=139.119633304093;starCoords.posY[211]=-5.69507237284743;
starCoords.posX[212]=145.881393010248;starCoords.posY[212]=-6.04090563326803;
starCoords.posX[213]=145.881393010248;starCoords.posY[213]=-6.04090563326803;
starCoords.posX[214]=149.476913334905;starCoords.posY[214]=1.5025419671549;
starCoords.posX[215]=156.214383490419;starCoords.posY[215]=-0.640418251099301;
starCoords.posX[216]=149.476913334905;starCoords.posY[216]=1.5025419671549;
starCoords.posX[217]=158.586138503855;starCoords.posY[217]=-11.2066937026007;
starCoords.posX[218]=145.881393010248;starCoords.posY[218]=-6.04090563326803;
starCoords.posX[219]=158.586138503855;starCoords.posY[219]=-11.2066937026007;
starCoords.posX[220]=156.214383490419;starCoords.posY[220]=-0.640418251099301;
starCoords.posX[221]=156.214383490419;starCoords.posY[221]=-0.640418251099301;
starCoords.posX[222]=165.987720023103;starCoords.posY[222]=3.3501916502449;
starCoords.posX[223]=169.472490670471;starCoords.posY[223]=-1.49728032947909;
starCoords.posX[224]=165.987720023103;starCoords.posY[224]=3.3501916502449;
starCoords.posX[225]=158.586138503855;starCoords.posY[225]=-11.2066937026007;
starCoords.posX[226]=169.472490670471;starCoords.posY[226]=-1.49728032947909;
starCoords.posX[227]=164.346259229544;starCoords.posY[227]=10.9122279462568;
starCoords.posX[228]=165.987720023103;starCoords.posY[228]=3.3501916502449;
starCoords.posX[229]=169.472490670471;starCoords.posY[229]=-1.49728032947909;
starCoords.posX[230]=174.911356374724;starCoords.posY[230]=-0.715332295136555;
starCoords.posX[231]=180;starCoords.posY[231]=0.980283975093906;
starCoords.posX[232]=174.911356374724;starCoords.posY[232]=-0.715332295136555;
starCoords.posX[233]=-177.785989968286;starCoords.posY[233]=1.71603937501385;
starCoords.posX[234]=-180;starCoords.posY[234]=0.980283975093906;
starCoords.posX[235]=-177.785989968286;starCoords.posY[235]=1.71603937501385;
starCoords.posX[236]=-176.577271524447;starCoords.posY[236]=6.48074937913359;
starCoords.posX[237]=180;starCoords.posY[237]=8.04802837468011;
starCoords.posX[238]=178.585817517324;starCoords.posY[238]=8.68428233346253;
starCoords.posX[239]=-176.577271524447;starCoords.posY[239]=6.48074937913359;
starCoords.posX[240]=-180;starCoords.posY[240]=8.04802837468011;
starCoords.posX[241]=169.472490670471;starCoords.posY[241]=-1.49728032947909;
starCoords.posX[242]=178.585817517324;starCoords.posY[242]=8.68428233346253;
starCoords.posX[243]=145.981897215346;starCoords.posY[243]=19.1420064786655;
starCoords.posX[244]=139.715628459978;starCoords.posY[244]=16.3811326904192;
starCoords.posX[245]=145.981897215346;starCoords.posY[245]=19.1420064786655;
starCoords.posX[246]=151.224503303712;starCoords.posY[246]=18.3549948228425;
starCoords.posX[247]=145.981897215346;starCoords.posY[247]=19.1420064786655;
starCoords.posX[248]=138.657560198022;starCoords.posY[248]=27.0376202311412;
starCoords.posX[249]=145.981897215346;starCoords.posY[249]=19.1420064786655;
starCoords.posX[250]=141.947963385144;starCoords.posY[250]=30.3330503110098;
starCoords.posX[251]=138.657560198022;starCoords.posY[251]=27.0376202311412;
starCoords.posX[252]=131.036377396024;starCoords.posY[252]=33.2828208394662;
starCoords.posX[253]=131.036377396024;starCoords.posY[253]=33.2828208394662;
starCoords.posX[254]=134.430913446289;starCoords.posY[254]=40.3564365089773;
starCoords.posX[255]=141.892063280099;starCoords.posY[255]=38.2698966425335;
starCoords.posX[256]=134.430913446289;starCoords.posY[256]=40.3564365089773;
starCoords.posX[257]=141.892063280099;starCoords.posY[257]=38.2698966425335;
starCoords.posX[258]=141.947963385144;starCoords.posY[258]=30.3330503110098;
starCoords.posX[259]=141.892063280099;starCoords.posY[259]=38.2698966425335;
starCoords.posX[260]=145.820160567733;starCoords.posY[260]=46.0479830910071;
starCoords.posX[261]=143.625112020308;starCoords.posY[261]=51.8115000687787;
starCoords.posX[262]=145.820160567733;starCoords.posY[262]=46.0479830910071;
starCoords.posX[263]=145.820160567733;starCoords.posY[263]=46.0479830910071;
starCoords.posX[264]=146.551172196587;starCoords.posY[264]=51.7492984463816;
starCoords.posX[265]=127.951979565494;starCoords.posY[265]=29.0757114309306;
starCoords.posX[266]=126.679242940291;starCoords.posY[266]=31.3300031075153;
starCoords.posX[267]=126.235731287261;starCoords.posY[267]=26.68586443671;
starCoords.posX[268]=127.951979565494;starCoords.posY[268]=29.0757114309306;
starCoords.posX[269]=126.235731287261;starCoords.posY[269]=26.68586443671;
starCoords.posX[270]=124.222057914712;starCoords.posY[270]=26.2682065993663;
starCoords.posX[271]=124.222057914712;starCoords.posY[271]=26.2682065993663;
starCoords.posX[272]=122.509423735239;starCoords.posY[272]=26.042179082278;
starCoords.posX[273]=120.51224113913;starCoords.posY[273]=26.8531120256174;
starCoords.posX[274]=122.509423735239;starCoords.posY[274]=26.042179082278;
starCoords.posX[275]=120.51224113913;starCoords.posY[275]=26.8531120256174;
starCoords.posX[276]=119.551492351388;starCoords.posY[276]=29.8270015792024;
starCoords.posX[277]=101.161825290309;starCoords.posY[277]=36.7996993572217;
starCoords.posX[278]=104.843685623142;starCoords.posY[278]=30.9138897331748;
starCoords.posX[279]=109.594419920303;starCoords.posY[279]=31.5863543653312;
starCoords.posX[280]=104.843685623142;starCoords.posY[280]=30.9138897331748;
starCoords.posX[281]=109.594419920303;starCoords.posY[281]=31.5863543653312;
starCoords.posX[282]=109.201031103486;starCoords.posY[282]=38.9062022273184;
starCoords.posX[283]=101.161825290309;starCoords.posY[283]=36.7996993572217;
starCoords.posX[284]=109.201031103486;starCoords.posY[284]=38.9062022273184;
starCoords.posX[285]=109.201031103486;starCoords.posY[285]=38.9062022273184;
starCoords.posX[286]=111.403575876233;starCoords.posY[286]=42.4192345743385;
starCoords.posX[287]=114.998923322659;starCoords.posY[287]=46.2927532148516;
starCoords.posX[288]=111.403575876233;starCoords.posY[288]=42.4192345743385;
starCoords.posX[289]=114.998923322659;starCoords.posY[289]=46.2927532148516;
starCoords.posX[290]=117.73845091443;starCoords.posY[290]=44.9122054303328;
starCoords.posX[291]=117.73845091443;starCoords.posY[291]=44.9122054303328;
starCoords.posX[292]=121.757212063601;starCoords.posY[292]=42.4258505401156;
starCoords.posX[293]=101.161825290309;starCoords.posY[293]=36.7996993572217;
starCoords.posX[294]=99.0037106261571;starCoords.posY[294]=37.1382904253537;
starCoords.posX[295]=90.861685347997;starCoords.posY[295]=37.2497746316869;
starCoords.posX[296]=99.0037106261571;starCoords.posY[296]=37.1382904253537;
starCoords.posX[297]=95.0719491795467;starCoords.posY[297]=46.0019987291167;
starCoords.posX[298]=90.861685347997;starCoords.posY[298]=37.2497746316869;
starCoords.posX[299]=101.15204591287;starCoords.posY[299]=24.8297441334648;
starCoords.posX[300]=104.843685623142;starCoords.posY[300]=30.9138897331748;
starCoords.posX[301]=101.15204591287;starCoords.posY[301]=24.8297441334648;
starCoords.posX[302]=97.22695748599;starCoords.posY[302]=26.104479420002;
starCoords.posX[303]=93.2986621680297;starCoords.posY[303]=27.7178363195644;
starCoords.posX[304]=97.22695748599;starCoords.posY[304]=26.104479420002;
starCoords.posX[305]=93.2986621680297;starCoords.posY[305]=27.7178363195644;
starCoords.posX[306]=90.4740129647853;starCoords.posY[306]=29.247440650273;
starCoords.posX[307]=90.4740129647853;starCoords.posY[307]=29.247440650273;
starCoords.posX[308]=88.0289938395179;starCoords.posY[308]=28.7641277803549;
starCoords.posX[309]=101.238238122799;starCoords.posY[309]=14.3807968143083;
starCoords.posX[310]=101.15204591287;starCoords.posY[310]=24.8297441334648;
starCoords.posX[311]=112.350601921147;starCoords.posY[311]=21.4710504897678;
starCoords.posX[312]=101.238238122799;starCoords.posY[312]=14.3807968143083;
starCoords.posX[313]=112.350601921147;starCoords.posY[313]=21.4710504897678;
starCoords.posX[314]=109.594419920303;starCoords.posY[314]=31.5863543653312;
starCoords.posX[315]=112.350601921147;starCoords.posY[315]=21.4710504897678;
starCoords.posX[316]=114.423219970205;starCoords.posY[316]=19.1329497457976;
starCoords.posX[317]=114.423219970205;starCoords.posY[317]=19.1329497457976;
starCoords.posX[318]=113.545076567529;starCoords.posY[318]=14.0137693170783;
starCoords.posX[319]=113.545076567529;starCoords.posY[319]=14.0137693170783;
starCoords.posX[320]=111.745854914805;starCoords.posY[320]=11.4699517769786;
starCoords.posX[321]=75.1822024865164;starCoords.posY[321]=32.7019828989433;
starCoords.posX[322]=76.2972565035638;starCoords.posY[322]=36.9101217413863;
starCoords.posX[323]=76.2972565035638;starCoords.posY[323]=36.9101217413863;
starCoords.posX[324]=78.7315695470197;starCoords.posY[324]=37.6146029788808;
starCoords.posX[325]=75.1822024865164;starCoords.posY[325]=32.7019828989433;
starCoords.posX[326]=77.3992337371757;starCoords.posY[326]=33.3732613927147;
starCoords.posX[327]=77.3992337371757;starCoords.posY[327]=33.3732613927147;
starCoords.posX[328]=78.7315695470197;starCoords.posY[328]=37.6146029788808;
starCoords.posX[329]=78.7315695470197;starCoords.posY[329]=37.6146029788808;
starCoords.posX[330]=78.8325499642223;starCoords.posY[330]=39.6221266137265;
starCoords.posX[331]=80.6919387395125;starCoords.posY[331]=38.7915405585116;
starCoords.posX[332]=78.8325499642223;starCoords.posY[332]=39.6221266137265;
starCoords.posX[333]=80.6919387395125;starCoords.posY[333]=38.7915405585116;
starCoords.posX[334]=78.7315695470197;starCoords.posY[334]=37.6146029788808;
starCoords.posX[335]=90.7975554197013;starCoords.posY[335]=51.488195237285;
starCoords.posX[336]=91.5805003678763;starCoords.posY[336]=56.8712832037137;
starCoords.posX[337]=90.7975554197013;starCoords.posY[337]=51.488195237285;
starCoords.posX[338]=97.3422038838531;starCoords.posY[338]=52.295140445766;
starCoords.posX[339]=97.3422038838531;starCoords.posY[339]=52.295140445766;
starCoords.posX[340]=96.8908905577045;starCoords.posY[340]=55.1670955802185;
starCoords.posX[341]=91.5805003678763;starCoords.posY[341]=56.8712832037137;
starCoords.posX[342]=96.8908905577045;starCoords.posY[342]=55.1670955802185;
starCoords.posX[343]=71.86222798123;starCoords.posY[343]=67.6767072235969;
starCoords.posX[344]=82.7888256191023;starCoords.posY[344]=63.0179648822226;
starCoords.posX[345]=91.5805003678763;starCoords.posY[345]=56.8712832037137;
starCoords.posX[346]=71.86222798123;starCoords.posY[346]=67.6767072235969;
starCoords.posX[347]=84.8422427447239;starCoords.posY[347]=71.3422072554479;
starCoords.posX[348]=84.7829532603234;starCoords.posY[348]=72.7372914612072;
starCoords.posX[349]=84.8422427447239;starCoords.posY[349]=71.3422072554479;
starCoords.posX[350]=102.796434504121;starCoords.posY[350]=65.7038902863697;
starCoords.posX[351]=84.8422427447239;starCoords.posY[351]=71.3422072554479;
starCoords.posX[352]=113.971982171079;starCoords.posY[352]=61.4944082817341;
starCoords.posX[353]=102.796434504121;starCoords.posY[353]=65.7038902863697;
starCoords.posX[354]=71.86222798123;starCoords.posY[354]=67.6767072235969;
starCoords.posX[355]=62.9661936028186;starCoords.posY[355]=70.290076137648;
starCoords.posX[356]=113.971982171079;starCoords.posY[356]=61.4944082817341;
starCoords.posX[357]=119.484240257417;starCoords.posY[357]=58.5412580642968;
starCoords.posX[358]=128.718596640221;starCoords.posY[358]=58.9355771815727;
starCoords.posX[359]=119.484240257417;starCoords.posY[359]=58.5412580642968;
starCoords.posX[360]=128.718596640221;starCoords.posY[360]=58.9355771815727;
starCoords.posX[361]=148.84288084469;starCoords.posY[361]=64.3341479150175;
starCoords.posX[362]=148.84288084469;starCoords.posY[362]=64.3341479150175;
starCoords.posX[363]=171.536370719911;starCoords.posY[363]=69.7400456487718;
starCoords.posX[364]=180;starCoords.posY[364]=69.6626899797835;
starCoords.posX[365]=171.536370719911;starCoords.posY[365]=69.7400456487718;
starCoords.posX[366]=-172.979114271808;starCoords.posY[366]=69.2827311271895;
starCoords.posX[367]=-180;starCoords.posY[367]=69.6626899797835;
starCoords.posX[368]=137.327539553265;starCoords.posY[368]=74.1196875166626;
starCoords.posX[369]=129.819581937115;starCoords.posY[369]=71.8028197520387;
starCoords.posX[370]=137.327539553265;starCoords.posY[370]=74.1196875166626;
starCoords.posX[371]=124.059864032573;starCoords.posY[371]=77.7672348199328;
starCoords.posX[372]=129.819581937115;starCoords.posY[372]=71.8028197520387;
starCoords.posX[373]=115.683874777796;starCoords.posY[373]=75.7342395742867;
starCoords.posX[374]=124.059864032573;starCoords.posY[374]=77.7672348199328;
starCoords.posX[375]=115.683874777796;starCoords.posY[375]=75.7342395742867;
starCoords.posX[376]=108.725240477967;starCoords.posY[376]=82.0217100843239;
starCoords.posX[377]=124.059864032573;starCoords.posY[377]=77.7672348199328;
starCoords.posX[378]=108.725240477967;starCoords.posY[378]=82.0217100843239;
starCoords.posX[379]=97.6435287917099;starCoords.posY[379]=86.5802743979421;
starCoords.posX[380]=-40.5205927106851;starCoords.posY[380]=89.3018530687644;
starCoords.posX[381]=70.3917696521345;starCoords.posY[381]=89.2818167954277;
starCoords.posX[382]=88.6865750219225;starCoords.posY[382]=88.5158515949521;
starCoords.posX[383]=97.6435287917099;starCoords.posY[383]=86.5802743979421;
starCoords.posX[384]=120.786380545358;starCoords.posY[384]=15.6366450915851;
starCoords.posX[385]=122.716397178943;starCoords.posY[385]=18.115197862365;
starCoords.posX[386]=122.716397178943;starCoords.posY[386]=18.115197862365;
starCoords.posX[387]=124.514486121737;starCoords.posY[387]=19.6427627010016;
starCoords.posX[388]=123.352208553489;starCoords.posY[388]=15.3950060718066;
starCoords.posX[389]=124.514486121737;starCoords.posY[389]=19.6427627010016;
starCoords.posX[390]=123.352208553489;starCoords.posY[390]=15.3950060718066;
starCoords.posX[391]=120.786380545358;starCoords.posY[391]=15.6366450915851;
starCoords.posX[392]=123.352208553489;starCoords.posY[392]=15.3950060718066;
starCoords.posX[393]=126.194578193091;starCoords.posY[393]=10.5100622255253;
starCoords.posX[394]=123.825463988555;starCoords.posY[394]=6.39847009203902;
starCoords.posX[395]=126.194578193091;starCoords.posY[395]=10.5100622255253;
starCoords.posX[396]=123.825463988555;starCoords.posY[396]=6.39847009203902;
starCoords.posX[397]=122.187088022402;starCoords.posY[397]=4.4517402804383;
starCoords.posX[398]=122.480388584518;starCoords.posY[398]=-3.4564102677582;
starCoords.posX[399]=122.187088022402;starCoords.posY[399]=4.4517402804383;
starCoords.posX[400]=116.298653692579;starCoords.posY[400]=-3.71595074531899;
starCoords.posX[401]=122.480388584518;starCoords.posY[401]=-3.4564102677582;
starCoords.posX[402]=116.298653692579;starCoords.posY[402]=-3.71595074531899;
starCoords.posX[403]=115.303903439394;starCoords.posY[403]=-4.71337764678438;
starCoords.posX[404]=116.298653692579;starCoords.posY[404]=-3.71595074531899;
starCoords.posX[405]=112.161021300988;starCoords.posY[405]=1.96550310947174;
starCoords.posX[406]=105.478557217683;starCoords.posY[406]=9.3619885036078;
starCoords.posX[407]=112.161021300988;starCoords.posY[407]=1.96550310947174;
starCoords.posX[408]=96.1650620469287;starCoords.posY[408]=12.554760102715;
starCoords.posX[409]=105.478557217683;starCoords.posY[409]=9.3619885036078;
starCoords.posX[410]=96.1650620469287;starCoords.posY[410]=12.554760102715;
starCoords.posX[411]=94.0236371993279;starCoords.posY[411]=4.5638385561303;
starCoords.posX[412]=94.0236371993279;starCoords.posY[412]=4.5638385561303;
starCoords.posX[413]=92.9170257094259;starCoords.posY[413]=2.70475036201075;
starCoords.posX[414]=90.1228717884697;starCoords.posY[414]=-9.77378766781474;
starCoords.posX[415]=92.9170257094259;starCoords.posY[415]=2.70475036201075;
starCoords.posX[416]=84.5579362000934;starCoords.posY[416]=-2.89425336457584;
starCoords.posX[417]=90.1228717884697;starCoords.posY[417]=-9.77378766781474;
starCoords.posX[418]=110.589643579178;starCoords.posY[418]=-10.5842703139269;
starCoords.posX[419]=105.478557217683;starCoords.posY[419]=9.3619885036078;
starCoords.posX[420]=115.303903439394;starCoords.posY[420]=-4.71337764678438;
starCoords.posX[421]=112.930505498375;starCoords.posY[421]=-8.39075840748334;
starCoords.posX[422]=110.589643579178;starCoords.posY[422]=-10.5842703139269;
starCoords.posX[423]=112.930505498375;starCoords.posY[423]=-8.39075840748334;
starCoords.posX[424]=102.279964347464;starCoords.posY[424]=-15.7353238699534;
starCoords.posX[425]=110.589643579178;starCoords.posY[425]=-10.5842703139269;
starCoords.posX[426]=102.279964347464;starCoords.posY[426]=-15.7353238699534;
starCoords.posX[427]=95.4778618739857;starCoords.posY[427]=-15.4032609232106;
starCoords.posX[428]=90.1228717884697;starCoords.posY[428]=-9.77378766781474;
starCoords.posX[429]=95.4778618739857;starCoords.posY[429]=-15.4032609232106;
starCoords.posX[430]=102.279964347464;starCoords.posY[430]=-15.7353238699534;
starCoords.posX[431]=94.0236371993279;starCoords.posY[431]=4.5638385561303;
starCoords.posX[432]=110.589643579178;starCoords.posY[432]=-10.5842703139269;
starCoords.posX[433]=112.08955473579;starCoords.posY[433]=-16.6311022756623;
starCoords.posX[434]=113.116960976708;starCoords.posY[434]=-18.4754273260539;
starCoords.posX[435]=112.08955473579;starCoords.posY[435]=-16.6311022756623;
starCoords.posX[436]=113.116960976708;starCoords.posY[436]=-18.4754273260539;
starCoords.posX[437]=113.845873947495;starCoords.posY[437]=-20.0570719073379;
starCoords.posX[438]=113.845873947495;starCoords.posY[438]=-20.0570719073379;
starCoords.posX[439]=113.472190415774;starCoords.posY[439]=-23.4666338513604;
starCoords.posX[440]=102.279964347464;starCoords.posY[440]=-15.7353238699534;
starCoords.posX[441]=99.3630692976301;starCoords.posY[441]=-25.0075275861974;
starCoords.posX[442]=99.3630692976301;starCoords.posY[442]=-25.0075275861974;
starCoords.posX[443]=98.0215586498546;starCoords.posY[443]=-29.8738904722005;
starCoords.posX[444]=84.5579362000934;starCoords.posY[444]=-2.89425336457584;
starCoords.posX[445]=75.8364462979434;starCoords.posY[445]=4.21547089727487;
starCoords.posX[446]=81.0791458651523;starCoords.posY[446]=-8.23656841992004;
starCoords.posX[447]=78.0903025178642;starCoords.posY[447]=-4.73786194200991;
starCoords.posX[448]=81.0791458651523;starCoords.posY[448]=-8.23656841992004;
starCoords.posX[449]=82.5759530839871;starCoords.posY[449]=-14.5595712203512;
starCoords.posX[450]=82.5759530839871;starCoords.posY[450]=-14.5595712203512;
starCoords.posX[451]=79.3118256988476;starCoords.posY[451]=-9.04356348240684;
starCoords.posX[452]=78.0903025178642;starCoords.posY[452]=-4.73786194200991;
starCoords.posX[453]=79.3118256988476;starCoords.posY[453]=-9.04356348240684;
starCoords.posX[454]=82.8722381229804;starCoords.posY[454]=-25.4157122060057;
starCoords.posX[455]=86.4282998505374;starCoords.posY[455]=-21.0558542644865;
starCoords.posX[456]=82.8722381229804;starCoords.posY[456]=-25.4157122060057;
starCoords.posX[457]=78.4494890971074;starCoords.posY[457]=-26.9810804860378;
starCoords.posX[458]=76.0481773609416;starCoords.posY[458]=-26.2850322433254;
starCoords.posX[459]=78.4494890971074;starCoords.posY[459]=-26.9810804860378;
starCoords.posX[460]=76.0481773609416;starCoords.posY[460]=-26.2850322433254;
starCoords.posX[461]=73.128395481955;starCoords.posY[461]=-27.6563396273944;
starCoords.posX[462]=74.2079786890639;starCoords.posY[462]=-29.8669041919688;
starCoords.posX[463]=73.128395481955;starCoords.posY[463]=-27.6563396273944;
starCoords.posX[464]=74.2079786890639;starCoords.posY[464]=-29.8669041919688;
starCoords.posX[465]=78.4494890971074;starCoords.posY[465]=-26.9810804860378;
starCoords.posX[466]=84.6115896278429;starCoords.posY[466]=-29.8235876369733;
starCoords.posX[467]=78.4494890971074;starCoords.posY[467]=-26.9810804860378;
starCoords.posX[468]=83.8117368185199;starCoords.posY[468]=-34.3794260449442;
starCoords.posX[469]=84.6115896278429;starCoords.posY[469]=-29.8235876369733;
starCoords.posX[470]=83.8117368185199;starCoords.posY[470]=-34.3794260449442;
starCoords.posX[471]=74.2079786890639;starCoords.posY[471]=-29.8669041919688;
starCoords.posX[472]=84.6115896278429;starCoords.posY[472]=-29.8235876369733;
starCoords.posX[473]=82.8722381229804;starCoords.posY[473]=-25.4157122060057;
starCoords.posX[474]=84.6115896278429;starCoords.posY[474]=-29.8235876369733;
starCoords.posX[475]=88.4072461065511;starCoords.posY[475]=-30.4227969912741;
starCoords.posX[476]=83.8117368185199;starCoords.posY[476]=-34.3794260449442;
starCoords.posX[477]=88.4072461065511;starCoords.posY[477]=-30.4227969912741;
starCoords.posX[478]=83.8117368185199;starCoords.posY[478]=-34.3794260449442;
starCoords.posX[479]=85.4447241660726;starCoords.posY[479]=-36.7578797448292;
starCoords.posX[480]=72.429074268533;starCoords.posY[480]=-21.0089606123009;
starCoords.posX[481]=69.4550437978206;starCoords.posY[481]=-17.8301512012874;
starCoords.posX[482]=72.429074268533;starCoords.posY[482]=-21.0089606123009;
starCoords.posX[483]=73.6985057511483;starCoords.posY[483]=-21.7278746370062;
starCoords.posX[484]=75.4371945318766;starCoords.posY[484]=-21.0944585207205;
starCoords.posX[485]=73.6985057511483;starCoords.posY[485]=-21.7278746370062;
starCoords.posX[486]=72.429074268533;starCoords.posY[486]=-21.0089606123009;
starCoords.posX[487]=75.4371945318766;starCoords.posY[487]=-21.0944585207205;
starCoords.posX[488]=54.6246051493613;starCoords.posY[488]=-14.7532060075722;
starCoords.posX[489]=55.3654190295985;starCoords.posY[489]=-12.5172064684843;
starCoords.posX[490]=54.6246051493613;starCoords.posY[490]=-14.7532060075722;
starCoords.posX[491]=48.3468061688187;starCoords.posY[491]=-25.2385605190219;
starCoords.posX[492]=46.9144420002526;starCoords.posY[492]=-26.8858950951722;
starCoords.posX[493]=48.3468061688187;starCoords.posY[493]=-25.2385605190219;
starCoords.posX[494]=46.9144420002526;starCoords.posY[494]=-26.8858950951722;
starCoords.posX[495]=43.0904093705655;starCoords.posY[495]=-24.9703137300375;
starCoords.posX[496]=55.3654190295985;starCoords.posY[496]=-12.5172064684843;
starCoords.posX[497]=43.3907395545187;starCoords.posY[497]=-17.1974947667149;
starCoords.posX[498]=43.3907395545187;starCoords.posY[498]=-17.1974947667149;
starCoords.posX[499]=39.3169068703358;starCoords.posY[499]=-16.7968852556346;
starCoords.posX[500]=34.8568450047277;starCoords.posY[500]=-16.6223608410704;
starCoords.posX[501]=39.3169068703358;starCoords.posY[501]=-16.7968852556346;
starCoords.posX[502]=33.1200344291908;starCoords.posY[502]=-16.0865121434237;
starCoords.posX[503]=34.8568450047277;starCoords.posY[503]=-16.6223608410704;
starCoords.posX[504]=33.1200344291908;starCoords.posY[504]=-16.0865121434237;
starCoords.posX[505]=35.6077381562067;starCoords.posY[505]=-19.4264339765308;
starCoords.posX[506]=38.2086872289202;starCoords.posY[506]=-22.3730854043888;
starCoords.posX[507]=35.6077381562067;starCoords.posY[507]=-19.4264339765308;
starCoords.posX[508]=38.2086872289202;starCoords.posY[508]=-22.3730854043888;
starCoords.posX[509]=43.0904093705655;starCoords.posY[509]=-24.9703137300375;
starCoords.posX[510]=62.1988176181064;starCoords.posY[510]=8.89100410112584;
starCoords.posX[511]=63.3311511724905;starCoords.posY[511]=10.6350874230488;
starCoords.posX[512]=62.1988176181064;starCoords.posY[512]=8.89100410112584;
starCoords.posX[513]=61.064388897223;starCoords.posY[513]=6.43029400038828;
starCoords.posX[514]=63.3311511724905;starCoords.posY[514]=10.6350874230488;
starCoords.posX[515]=68.5157854563;starCoords.posY[515]=3.13257420039143;
starCoords.posX[516]=57.0611284790138;starCoords.posY[516]=-0.79501174200198;
starCoords.posX[517]=68.5157854563;starCoords.posY[517]=3.13257420039143;
starCoords.posX[518]=57.0611284790138;starCoords.posY[518]=-0.79501174200198;
starCoords.posX[519]=65.7065816835152;starCoords.posY[519]=-1.266602178534;
starCoords.posX[520]=73.3216696042884;starCoords.posY[520]=-4.86861985955856;
starCoords.posX[521]=65.7065816835152;starCoords.posY[521]=-1.266602178534;
starCoords.posX[522]=68.5157854563;starCoords.posY[522]=3.13257420039143;
starCoords.posX[523]=73.3216696042884;starCoords.posY[523]=-4.86861985955856;
starCoords.posX[524]=73.5469002952388;starCoords.posY[524]=13.8772352411186;
starCoords.posX[525]=68.5157854563;starCoords.posY[525]=3.13257420039143;
starCoords.posX[526]=73.5469002952388;starCoords.posY[526]=13.8772352411186;
starCoords.posX[527]=73.3216696042884;starCoords.posY[527]=-4.86861985955856;
starCoords.posX[528]=73.3216696042884;starCoords.posY[528]=-4.86861985955856;
starCoords.posX[529]=74.4630682648494;starCoords.posY[529]=-5.7261134884291;
starCoords.posX[530]=67.7322081151667;starCoords.posY[530]=24.6833293610121;
starCoords.posX[531]=61.541662327458;starCoords.posY[531]=24.102793643827;
starCoords.posX[532]=60.2136066068848;starCoords.posY[532]=19.5163128449762;
starCoords.posX[533]=63.0555432824592;starCoords.posY[533]=18.5563239995903;
starCoords.posX[534]=63.0555432824592;starCoords.posY[534]=18.5563239995903;
starCoords.posX[535]=64.6395236116578;starCoords.posY[535]=17.4968694007857;
starCoords.posX[536]=63.0555432824592;starCoords.posY[536]=18.5563239995903;
starCoords.posX[537]=64.8781225927746;starCoords.posY[537]=18.0345353053994;
starCoords.posX[538]=49.9890259783584;starCoords.posY[538]=15.943360576498;
starCoords.posX[539]=48.2338238181901;starCoords.posY[539]=16.1567138691188;
starCoords.posX[540]=50.5104581336219;starCoords.posY[540]=14.6260343261833;
starCoords.posX[541]=49.9890259783584;starCoords.posY[541]=15.943360576498;
starCoords.posX[542]=50.5104581336219;starCoords.posY[542]=14.6260343261833;
starCoords.posX[543]=49.0330956341126;starCoords.posY[543]=15.1064878226043;
starCoords.posX[544]=48.2338238181901;starCoords.posY[544]=16.1567138691188;
starCoords.posX[545]=49.0330956341126;starCoords.posY[545]=15.1064878226043;
starCoords.posX[546]=50.5104581336219;starCoords.posY[546]=14.6260343261833;
starCoords.posX[547]=51.5923288078222;starCoords.posY[547]=11.333493427844;
starCoords.posX[548]=36.9953169833861;starCoords.posY[548]=-5.53229228872135;
starCoords.posX[549]=47.9628847183064;starCoords.posY[549]=-9.46319171049389;
starCoords.posX[550]=36.9953169833861;starCoords.posY[550]=-5.53229228872135;
starCoords.posX[551]=28.4417918665849;starCoords.posY[551]=-0.277036696862082;
starCoords.posX[552]=28.4417918665849;starCoords.posY[552]=-0.277036696862082;
starCoords.posX[553]=23.5691089342537;starCoords.posY[553]=1.42203435466171;
starCoords.posX[554]=22.6799286345413;starCoords.posY[554]=0.0249593120031787;
starCoords.posX[555]=23.5691089342537;starCoords.posY[555]=1.42203435466171;
starCoords.posX[556]=22.6799286345413;starCoords.posY[556]=0.0249593120031787;
starCoords.posX[557]=24.4733491860702;starCoords.posY[557]=-1.34301158412474;
starCoords.posX[558]=28.4417918665849;starCoords.posY[558]=-0.277036696862082;
starCoords.posX[559]=24.4733491860702;starCoords.posY[559]=-1.34301158412474;
starCoords.posX[560]=22.6799286345413;starCoords.posY[560]=0.0249593120031787;
starCoords.posX[561]=21.0487803331189;starCoords.posY[561]=-0.0720485669666517;
starCoords.posX[562]=28.4417918665849;starCoords.posY[562]=-0.277036696862082;
starCoords.posX[563]=25.6765297323792;starCoords.posY[563]=-7.73940528685316;
starCoords.posX[564]=36.9953169833861;starCoords.posY[564]=-5.53229228872135;
starCoords.posX[565]=28.2729084548718;starCoords.posY[565]=-13.826797859888;
starCoords.posX[566]=16.7323791150912;starCoords.posY[566]=-7.53295913120724;
starCoords.posX[567]=25.6765297323792;starCoords.posY[567]=-7.73940528685316;
starCoords.posX[568]=16.7323791150912;starCoords.posY[568]=-7.53295913120724;
starCoords.posX[569]=17.4864236565762;starCoords.posY[569]=-13.5461811648364;
starCoords.posX[570]=16.2214750603424;starCoords.posY[570]=-15.7740567107915;
starCoords.posX[571]=17.4864236565762;starCoords.posY[571]=-13.5461811648364;
starCoords.posX[572]=16.2214750603424;starCoords.posY[572]=-15.7740567107915;
starCoords.posX[573]=10.4105720674734;starCoords.posY[573]=-9.13460725504188;
starCoords.posX[574]=11.3062175416116;starCoords.posY[574]=-6.00124091408048;
starCoords.posX[575]=10.4105720674734;starCoords.posY[575]=-9.13460725504188;
starCoords.posX[576]=16.7323791150912;starCoords.posY[576]=-7.53295913120724;
starCoords.posX[577]=11.3062175416116;starCoords.posY[577]=-6.00124091408048;
starCoords.posX[578]=12.5221455239215;starCoords.posY[578]=-21.1248624032989;
starCoords.posX[579]=10.4105720674734;starCoords.posY[579]=-9.13460725504188;
starCoords.posX[580]=9.14241797859609;starCoords.posY[580]=-20.0524899606533;
starCoords.posX[581]=10.4105720674734;starCoords.posY[581]=-9.13460725504188;
starCoords.posX[582]=40.9348757638161;starCoords.posY[582]=5.28461753531312;
starCoords.posX[583]=41.2735205609471;starCoords.posY[583]=10.0435652197572;
starCoords.posX[584]=41.2735205609471;starCoords.posY[584]=10.0435652197572;
starCoords.posX[585]=42.3083561503784;starCoords.posY[585]=10.1675767864582;
starCoords.posX[586]=33.8461439361076;starCoords.posY[586]=9.91544688065463;
starCoords.posX[587]=27.3404036572577;starCoords.posY[587]=6.24111828622667;
starCoords.posX[588]=19.5255256681206;starCoords.posY[588]=10.8772641352365;
starCoords.posX[589]=27.3404036572577;starCoords.posY[589]=6.24111828622667;
starCoords.posX[590]=19.5255256681206;starCoords.posY[590]=10.8772641352365;
starCoords.posX[591]=18.2179570526441;starCoords.posY[591]=12.2191482148707;
starCoords.posX[592]=13.7008299275965;starCoords.posY[592]=15.2525840102794;
starCoords.posX[593]=18.2179570526441;starCoords.posY[593]=12.2191482148707;
starCoords.posX[594]=13.9506792611231;starCoords.posY[594]=28.1300580442531;
starCoords.posX[595]=13.7008299275965;starCoords.posY[595]=15.2525840102794;
starCoords.posX[596]=13.9506792611231;starCoords.posY[596]=28.1300580442531;
starCoords.posX[597]=17.393821599319;starCoords.posY[597]=24.6480549566039;
starCoords.posX[598]=17.393821599319;starCoords.posY[598]=24.6480549566039;
starCoords.posX[599]=18.2617644927961;starCoords.posY[599]=23.6119030617816;
starCoords.posX[600]=28.1461102581353;starCoords.posY[600]=25.3880471535623;
starCoords.posX[601]=18.2617644927961;starCoords.posY[601]=23.6119030617816;
starCoords.posX[602]=28.1461102581353;starCoords.posY[602]=25.3880471535623;
starCoords.posX[603]=33.7395330504462;starCoords.posY[603]=25.6855236419836;
starCoords.posX[604]=13.9506792611231;starCoords.posY[604]=28.1300580442531;
starCoords.posX[605]=19.1466678394077;starCoords.posY[605]=30.2672527284735;
starCoords.posX[606]=19.1466678394077;starCoords.posY[606]=30.2672527284735;
starCoords.posX[607]=27.4057367800102;starCoords.posY[607]=33.2214540599857;
starCoords.posX[608]=-2.20998746249961;starCoords.posY[608]=29.1391143762891;
starCoords.posX[609]=13.9506792611231;starCoords.posY[609]=28.1300580442531;
starCoords.posX[610]=-2.20998746249961;starCoords.posY[610]=29.1391143762891;
starCoords.posX[611]=-3.42185199462804;starCoords.posY[611]=15.2322286772031;
starCoords.posX[612]=-3.42185199462804;starCoords.posY[612]=15.2322286772031;
starCoords.posX[613]=13.7008299275965;starCoords.posY[613]=15.2525840102794;
starCoords.posX[614]=-2.20998746249961;starCoords.posY[614]=29.1391143762891;
starCoords.posX[615]=-9.94904606376656;starCoords.posY[615]=30.9090166857177;
starCoords.posX[616]=-9.94904606376656;starCoords.posY[616]=30.9090166857177;
starCoords.posX[617]=-9.75573927419546;starCoords.posY[617]=29.3597721282733;
starCoords.posX[618]=-11.9513491472827;starCoords.posY[618]=24.3148490298795;
starCoords.posX[619]=-9.75573927419546;starCoords.posY[619]=29.3597721282733;
starCoords.posX[620]=-11.9513491472827;starCoords.posY[620]=24.3148490298795;
starCoords.posX[621]=-14.4190199545442;starCoords.posY[621]=23.4648426542377;
starCoords.posX[622]=-17.5555230907247;starCoords.posY[622]=35.6670212049883;
starCoords.posX[623]=-9.94904606376656;starCoords.posY[623]=30.9090166857177;
starCoords.posX[624]=-17.5555230907247;starCoords.posY[624]=35.6670212049883;
starCoords.posX[625]=-9.33755156180487;starCoords.posY[625]=33.7674229590647;
starCoords.posX[626]=-9.94904606376656;starCoords.posY[626]=30.9090166857177;
starCoords.posX[627]=-9.33755156180487;starCoords.posY[627]=33.7674229590647;
starCoords.posX[628]=-17.5555230907247;starCoords.posY[628]=35.6670212049883;
starCoords.posX[629]=-31.1097720649074;starCoords.posY[629]=42.371464644913;
starCoords.posX[630]=-17.5555230907247;starCoords.posY[630]=35.6670212049883;
starCoords.posX[631]=-14.3099291565661;starCoords.posY[631]=38.546562629368;
starCoords.posX[632]=-14.3099291565661;starCoords.posY[632]=38.546562629368;
starCoords.posX[633]=-12.5748266791272;starCoords.posY[633]=41.1264702669061;
starCoords.posX[634]=-17.5034260649687;starCoords.posY[634]=47.2882699328809;
starCoords.posX[635]=-12.5748266791272;starCoords.posY[635]=41.1264702669061;
starCoords.posX[636]=-24.6331929936906;starCoords.posY[636]=48.6725203887186;
starCoords.posX[637]=-17.5034260649687;starCoords.posY[637]=47.2882699328809;
starCoords.posX[638]=14.418742044534;starCoords.posY[638]=42.3731508286255;
starCoords.posX[639]=5.35807681713868;starCoords.posY[639]=43.3165727832474;
starCoords.posX[640]=4.78987915810029;starCoords.posY[640]=44.3824744704058;
starCoords.posX[641]=5.35807681713868;starCoords.posY[641]=43.3165727832474;
starCoords.posX[642]=5.50202638398753;starCoords.posY[642]=46.5066397815929;
starCoords.posX[643]=4.78987915810029;starCoords.posY[643]=44.3824744704058;
starCoords.posX[644]=-9.33755156180487;starCoords.posY[644]=33.7674229590647;
starCoords.posX[645]=-4.69699763386478;starCoords.posY[645]=36.8337812138529;
starCoords.posX[646]=-4.69699763386478;starCoords.posY[646]=36.8337812138529;
starCoords.posX[647]=5.35807681713868;starCoords.posY[647]=43.3165727832474;
starCoords.posX[648]=22.5258733897226;starCoords.posY[648]=47.7518717889234;
starCoords.posX[649]=19.7755281878861;starCoords.posY[649]=44.3221348984943;
starCoords.posX[650]=22.2833260189062;starCoords.posY[650]=43.1684391850027;
starCoords.posX[651]=24.6529690366161;starCoords.posY[651]=46.5808297224397;
starCoords.posX[652]=26.436273850115;starCoords.posY[652]=39.7585317400815;
starCoords.posX[653]=22.2833260189062;starCoords.posY[653]=43.1684391850027;
starCoords.posX[654]=25.9120223122807;starCoords.posY[654]=37.7925380066147;
starCoords.posX[655]=26.436273850115;starCoords.posY[655]=39.7585317400815;
starCoords.posX[656]=19.7755281878861;starCoords.posY[656]=44.3221348984943;
starCoords.posX[657]=22.2833260189062;starCoords.posY[657]=43.1684391850027;
starCoords.posX[658]=22.5258733897226;starCoords.posY[658]=47.7518717889234;
starCoords.posX[659]=24.6529690366161;starCoords.posY[659]=46.5808297224397;
starCoords.posX[660]=22.0872739384545;starCoords.posY[660]=50.3276186149856;
starCoords.posX[661]=22.5258733897226;starCoords.posY[661]=47.7518717889234;
starCoords.posX[662]=22.0872739384545;starCoords.posY[662]=50.3276186149856;
starCoords.posX[663]=24.0234357277188;starCoords.posY[663]=52.2735284474337;
starCoords.posX[664]=24.0234357277188;starCoords.posY[664]=52.2735284474337;
starCoords.posX[665]=23.7817999258349;starCoords.posY[665]=49.5209574079166;
starCoords.posX[666]=22.5258733897226;starCoords.posY[666]=47.7518717889234;
starCoords.posX[667]=23.7817999258349;starCoords.posY[667]=49.5209574079166;
starCoords.posX[668]=5.07044283024271;starCoords.posY[668]=77.6807985973581;
starCoords.posX[669]=12.2142468070938;starCoords.posY[669]=73.0097572377199;
starCoords.posX[670]=17.5009144543089;starCoords.posY[670]=66.2468594160354;
starCoords.posX[671]=5.07044283024271;starCoords.posY[671]=77.6807985973581;
starCoords.posX[672]=23.9094262689404;starCoords.posY[672]=74.9896665610798;
starCoords.posX[673]=37.8077035968037;starCoords.posY[673]=70.5991987061337;
starCoords.posX[674]=37.8077035968037;starCoords.posY[674]=70.5991987061337;
starCoords.posX[675]=17.5009144543089;starCoords.posY[675]=66.2468594160354;
starCoords.posX[676]=17.5009144543089;starCoords.posY[676]=66.2468594160354;
starCoords.posX[677]=22.6257167701429;starCoords.posY[677]=58.4601526123546;
starCoords.posX[678]=27.2102776253454;starCoords.posY[678]=58.2445715478433;
starCoords.posX[679]=22.6257167701429;starCoords.posY[679]=58.4601526123546;
starCoords.posX[680]=27.2102776253454;starCoords.posY[680]=58.2445715478433;
starCoords.posX[681]=26.1629476394168;starCoords.posY[681]=57.0872973971212;
starCoords.posX[682]=26.1629476394168;starCoords.posY[682]=57.0872973971212;
starCoords.posX[683]=34.0560734250525;starCoords.posY[683]=58.8203914897846;
starCoords.posX[684]=40.3042771663483;starCoords.posY[684]=62.6227109163793;
starCoords.posX[685]=34.0560734250525;starCoords.posY[685]=58.8203914897846;
starCoords.posX[686]=40.3042771663483;starCoords.posY[686]=62.6227109163793;
starCoords.posX[687]=37.8077035968037;starCoords.posY[687]=70.5991987061337;
starCoords.posX[688]=40.3042771663483;starCoords.posY[688]=62.6227109163793;
starCoords.posX[689]=48.6341015113263;starCoords.posY[689]=61.8709632516305;
starCoords.posX[690]=48.6341015113263;starCoords.posY[690]=61.8709632516305;
starCoords.posX[691]=52.5686432939403;starCoords.posY[691]=63.0237032534201;
starCoords.posX[692]=-10.2518915363367;starCoords.posY[692]=56.585279548029;
starCoords.posX[693]=-2.40876634490945;starCoords.posY[693]=59.198455401335;
starCoords.posX[694]=-14.3106507521727;starCoords.posY[694]=60.763959470989;
starCoords.posX[695]=-10.2518915363367;starCoords.posY[695]=56.585279548029;
starCoords.posX[696]=-14.3106507521727;starCoords.posY[696]=60.763959470989;
starCoords.posX[697]=-21.5966239156878;starCoords.posY[697]=60.2806023680103;
starCoords.posX[698]=-21.5966239156878;starCoords.posY[698]=60.2806023680103;
starCoords.posX[699]=-28.758149503947;starCoords.posY[699]=63.7128420499974;
starCoords.posX[700]=-26.053314201334;starCoords.posY[700]=50.7325247118118;
starCoords.posX[701]=-41.1987974935272;starCoords.posY[701]=49.2651454253658;
starCoords.posX[702]=-47.4193275118425;starCoords.posY[702]=49.6462890054341;
starCoords.posX[703]=-41.1987974935272;starCoords.posY[703]=49.2651454253658;
starCoords.posX[704]=-43.7207908172207;starCoords.posY[704]=52.7977332393026;
starCoords.posX[705]=-47.4193275118425;starCoords.posY[705]=49.6462890054341;
starCoords.posX[706]=-42.8351534425601;starCoords.posY[706]=55.9312672527097;
starCoords.posX[707]=-43.7207908172207;starCoords.posY[707]=52.7977332393026;
starCoords.posX[708]=-46.3588537852554;starCoords.posY[708]=53.5401106160802;
starCoords.posX[709]=-42.8351534425601;starCoords.posY[709]=55.9312672527097;
starCoords.posX[710]=-46.3588537852554;starCoords.posY[710]=53.5401106160802;
starCoords.posX[711]=-43.7207908172207;starCoords.posY[711]=52.7977332393026;
starCoords.posX[712]=-51.2378060692255;starCoords.posY[712]=49.8917327218355;
starCoords.posX[713]=-46.3588537852554;starCoords.posY[713]=53.5401106160802;
starCoords.posX[714]=-51.2378060692255;starCoords.posY[714]=49.8917327218355;
starCoords.posX[715]=-47.4193275118425;starCoords.posY[715]=49.6462890054341;
starCoords.posX[716]=-51.2378060692255;starCoords.posY[716]=49.8917327218355;
starCoords.posX[717]=-55.8877817953979;starCoords.posY[717]=47.81492760172;
starCoords.posX[718]=-55.8877817953979;starCoords.posY[718]=47.81492760172;
starCoords.posX[719]=-62.3248781310444;starCoords.posY[719]=47.7351996727894;
starCoords.posX[720]=-62.3248781310444;starCoords.posY[720]=47.7351996727894;
starCoords.posX[721]=-63.8857947693316;starCoords.posY[721]=48.4308358048763;
starCoords.posX[722]=-63.8857947693316;starCoords.posY[722]=48.4308358048763;
starCoords.posX[723]=-64.7259868625062;starCoords.posY[723]=50.3163652777225;
starCoords.posX[724]=-61.8099320311625;starCoords.posY[724]=50.374336928961;
starCoords.posX[725]=-64.7259868625062;starCoords.posY[725]=50.3163652777225;
starCoords.posX[726]=-59.6108204061326;starCoords.posY[726]=40.0349131015467;
starCoords.posX[727]=-55.8877817953979;starCoords.posY[727]=47.81492760172;
starCoords.posX[728]=-47.1853167455483;starCoords.posY[728]=40.9888016635948;
starCoords.posX[729]=-59.6108204061326;starCoords.posY[729]=40.0349131015467;
starCoords.posX[730]=-47.1853167455483;starCoords.posY[730]=40.9888016635948;
starCoords.posX[731]=-47.5217103078334;starCoords.posY[731]=44.8904890029524;
starCoords.posX[732]=-47.5217103078334;starCoords.posY[732]=44.8904890029524;
starCoords.posX[733]=-47.4193275118425;starCoords.posY[733]=49.6462890054341;
starCoords.posX[734]=-47.1853167455483;starCoords.posY[734]=40.9888016635948;
starCoords.posX[735]=-46.4345615473785;starCoords.posY[735]=38.8738918830009;
starCoords.posX[736]=-59.6108204061326;starCoords.posY[736]=40.0349131015467;
starCoords.posX[737]=-59.8837328310346;starCoords.posY[737]=35.8155289383128;
starCoords.posX[738]=-58.6709887361052;starCoords.posY[738]=31.9090159903604;
starCoords.posX[739]=-59.8837328310346;starCoords.posY[739]=35.8155289383128;
starCoords.posX[740]=-58.6709887361052;starCoords.posY[740]=31.9090159903604;
starCoords.posX[741]=-56.2173966708058;starCoords.posY[741]=32.3153854435682;
starCoords.posX[742]=-32.5162793652764;starCoords.posY[742]=35.0284065950622;
starCoords.posX[743]=-34.459165441452;starCoords.posY[743]=33.8873934030372;
starCoords.posX[744]=-32.5162793652764;starCoords.posY[744]=35.0284065950622;
starCoords.posX[745]=-28.3956846162055;starCoords.posY[745]=29.6217099689096;
starCoords.posX[746]=-28.3956846162055;starCoords.posY[746]=29.6217099689096;
starCoords.posX[747]=-34.459165441452;starCoords.posY[747]=33.8873934030372;
starCoords.posX[748]=4.90064559771241;starCoords.posY[748]=5.67482620497117;
starCoords.posX[749]=7.89658659333372;starCoords.posY[749]=6.42724043763792;
starCoords.posX[750]=10.5970105404821;starCoords.posY[750]=3.33016606813587;
starCoords.posX[751]=7.89658659333372;starCoords.posY[751]=6.42724043763792;
starCoords.posX[752]=10.5970105404821;starCoords.posY[752]=3.33016606813587;
starCoords.posX[753]=8.15490369868888;starCoords.posY[753]=1.30382546278079;
starCoords.posX[754]=4.37632120875327;starCoords.posY[754]=1.82861187324521;
starCoords.posX[755]=8.15490369868888;starCoords.posY[755]=1.30382546278079;
starCoords.posX[756]=4.90064559771241;starCoords.posY[756]=5.67482620497117;
starCoords.posX[757]=4.37632120875327;starCoords.posY[757]=1.82861187324521;
starCoords.posX[758]=0.0600362085045845;starCoords.posY[758]=6.91203780841954;
starCoords.posX[759]=4.90064559771241;starCoords.posY[759]=5.67482620497117;
starCoords.posX[760]=-12.2840826125972;starCoords.posY[760]=7.63269081209996;
starCoords.posX[761]=0.0600362085045845;starCoords.posY[761]=6.91203780841954;
starCoords.posX[762]=-15.8498181886821;starCoords.posY[762]=7.93701329091942;
starCoords.posX[763]=-12.2840826125972;starCoords.posY[763]=7.63269081209996;
starCoords.posX[764]=-15.8498181886821;starCoords.posY[764]=7.93701329091942;
starCoords.posX[765]=-25.4720144903132;starCoords.posY[765]=5.5316153651753;
starCoords.posX[766]=-30.6250601823365;starCoords.posY[766]=2.80570571689168;
starCoords.posX[767]=-25.4720144903132;starCoords.posY[767]=5.5316153651753;
starCoords.posX[768]=-30.6250601823365;starCoords.posY[768]=2.80570571689168;
starCoords.posX[769]=-26.4640644696584;starCoords.posY[769]=9.20136962205448;
starCoords.posX[770]=-22.9881918101823;starCoords.posY[770]=15.3906904331193;
starCoords.posX[771]=-26.4640644696584;starCoords.posY[771]=9.20136962205448;
starCoords.posX[772]=-22.9881918101823;starCoords.posY[772]=15.3906904331193;
starCoords.posX[773]=-18.5564584817852;starCoords.posY[773]=24.6299132761154;
starCoords.posX[774]=-18.0359498416511;starCoords.posY[774]=30.1359770507699;
starCoords.posX[775]=-18.5564584817852;starCoords.posY[775]=24.6299132761154;
starCoords.posX[776]=-18.0359498416511;starCoords.posY[776]=30.1359770507699;
starCoords.posX[777]=-19.9873081712038;starCoords.posY[777]=27.3098585849065;
starCoords.posX[778]=-18.5564584817852;starCoords.posY[778]=24.6299132761154;
starCoords.posX[779]=-19.9873081712038;starCoords.posY[779]=27.3098585849065;
starCoords.posX[780]=-31.9165965922611;starCoords.posY[780]=23.5038025290453;
starCoords.posX[781]=-42.6250444244504;starCoords.posY[781]=27.2963900771263;
starCoords.posX[782]=-31.9165965922611;starCoords.posY[782]=23.5038025290453;
starCoords.posX[783]=-28.7810331510999;starCoords.posY[783]=20.8507584071551;
starCoords.posX[784]=-28.7810331510999;starCoords.posY[784]=20.8507584071551;
starCoords.posX[785]=-28.5027854246894;starCoords.posY[785]=19.3366881606792;
starCoords.posX[786]=-11.0064545727167;starCoords.posY[786]=-17.9387750849496;
starCoords.posX[787]=-26.1231792894056;starCoords.posY[787]=-15.8937199351685;
starCoords.posX[788]=-26.1231792894056;starCoords.posY[788]=-15.8937199351685;
starCoords.posX[789]=-27.9730923671704;starCoords.posY[789]=-10.2919911009759;
starCoords.posX[790]=-21.1154506246913;starCoords.posY[790]=-8.13779401869309;
starCoords.posX[791]=-27.9730923671704;starCoords.posY[791]=-10.2919911009759;
starCoords.posX[792]=-17.2569796496366;starCoords.posY[792]=-10.1357266811116;
starCoords.posX[793]=-21.1154506246913;starCoords.posY[793]=-8.13779401869309;
starCoords.posX[794]=-17.2569796496366;starCoords.posY[794]=-10.1357266811116;
starCoords.posX[795]=-4.96843674970148;starCoords.posY[795]=-8.77538363214312;
starCoords.posX[796]=-11.0064545727167;starCoords.posY[796]=-17.9387750849496;
starCoords.posX[797]=-4.96843674970148;starCoords.posY[797]=-8.77538363214312;
starCoords.posX[798]=-27.9730923671704;starCoords.posY[798]=-10.2919911009759;
starCoords.posX[799]=-34.9473011719264;starCoords.posY[799]=-2.93768354525736;
starCoords.posX[800]=-39.9829473155614;starCoords.posY[800]=0.365869854301256;
starCoords.posX[801]=-34.9473011719264;starCoords.posY[801]=-2.93768354525736;
starCoords.posX[802]=-40.9390808722375;starCoords.posY[802]=3.27265123998693;
starCoords.posX[803]=-39.9829473155614;starCoords.posY[803]=0.365869854301256;
starCoords.posX[804]=-45.684489223686;starCoords.posY[804]=4.12380279315374;
starCoords.posX[805]=-40.9390808722375;starCoords.posY[805]=3.27265123998693;
starCoords.posX[806]=-45.684489223686;starCoords.posY[806]=4.12380279315374;
starCoords.posX[807]=-45.046270339893;starCoords.posY[807]=8.94182032623425;
starCoords.posX[808]=-41.3534325045123;starCoords.posY[808]=10.1507481614618;
starCoords.posX[809]=-45.046270339893;starCoords.posY[809]=8.94182032623425;
starCoords.posX[810]=-41.3534325045123;starCoords.posY[810]=10.1507481614618;
starCoords.posX[811]=-37.1562449844516;starCoords.posY[811]=8.49891030852707;
starCoords.posX[812]=-40.9390808722375;starCoords.posY[812]=3.27265123998693;
starCoords.posX[813]=-37.1562449844516;starCoords.posY[813]=8.49891030852707;
starCoords.posX[814]=-51.3214631146764;starCoords.posY[814]=9.05935461159365;
starCoords.posX[815]=-54.3306553318047;starCoords.posY[815]=0.430107521004755;
starCoords.posX[816]=-51.9109872187358;starCoords.posY[816]=9.76277210038584;
starCoords.posX[817]=-60.9056609095419;starCoords.posY[817]=6.01303691765283;
starCoords.posX[818]=-60.2915478228381;starCoords.posY[818]=12.5145348356929;
starCoords.posX[819]=-51.9109872187358;starCoords.posY[819]=9.76277210038584;
starCoords.posX[820]=-60.2915478228381;starCoords.posY[820]=12.5145348356929;
starCoords.posX[821]=-65.0728031622364;starCoords.posY[821]=15.6482227774873;
starCoords.posX[822]=-67.2904601078816;starCoords.posY[822]=15.8897392108497;
starCoords.posX[823]=-65.0728031622364;starCoords.posY[823]=15.6482227774873;
starCoords.posX[824]=-69.1057509329579;starCoords.posY[824]=16.5267258271499;
starCoords.posX[825]=-67.2904601078816;starCoords.posY[825]=15.8897392108497;
starCoords.posX[826]=-69.1057509329579;starCoords.posY[826]=16.5267258271499;
starCoords.posX[827]=-84.5420497704751;starCoords.posY[827]=21.1472382285298;
starCoords.posX[828]=-81.7113606453054;starCoords.posY[828]=28.6145312391826;
starCoords.posX[829]=-70.6928375501001;starCoords.posY[829]=22.9730861687708;
starCoords.posX[830]=-67.2818868286933;starCoords.posY[830]=19.1992959414361;
starCoords.posX[831]=-70.6928375501001;starCoords.posY[831]=22.9730861687708;
starCoords.posX[832]=-67.2818868286933;starCoords.posY[832]=19.1992959414361;
starCoords.posX[833]=-66.4989793096152;starCoords.posY[833]=17.9473861522553;
starCoords.posX[834]=-65.859868876913;starCoords.posY[834]=17.5624868289949;
starCoords.posX[835]=-66.4989793096152;starCoords.posY[835]=17.9473861522553;
starCoords.posX[836]=-65.0728031622364;starCoords.posY[836]=15.6482227774873;
starCoords.posX[837]=-65.859868876913;starCoords.posY[837]=17.5624868289949;
starCoords.posX[838]=-88.9113753622908;starCoords.posY[838]=7.40803864618872;
starCoords.posX[839]=-83.9050782476909;starCoords.posY[839]=9.9393819455561;
starCoords.posX[840]=-81.4002302536363;starCoords.posY[840]=6.35703629573222;
starCoords.posX[841]=-83.9050782476909;starCoords.posY[841]=9.9393819455561;
starCoords.posX[842]=-81.4002302536363;starCoords.posY[842]=6.35703629573222;
starCoords.posX[843]=-83.1135245789014;starCoords.posY[843]=-0.293203565648061;
starCoords.posX[844]=-83.1135245789014;starCoords.posY[844]=-0.293203565648061;
starCoords.posX[845]=-81.2293291736303;starCoords.posY[845]=-2.38967165378308;
starCoords.posX[846]=-78.7396918088459;starCoords.posY[846]=-8.19208391045554;
starCoords.posX[847]=-81.2293291736303;starCoords.posY[847]=-2.38967165378308;
starCoords.posX[848]=-85.3001563379588;starCoords.posY[848]=-1.93853378630843;
starCoords.posX[849]=-87.0429368825259;starCoords.posY[849]=-9.66704751835415;
starCoords.posX[850]=-88.9113753622908;starCoords.posY[850]=7.40803864618872;
starCoords.posX[851]=-85.3001563379588;starCoords.posY[851]=-1.93853378630843;
starCoords.posX[852]=-84.1644796114935;starCoords.posY[852]=-1.19691965952153;
starCoords.posX[853]=-85.3001563379588;starCoords.posY[853]=-1.93853378630843;
starCoords.posX[854]=-84.1644796114935;starCoords.posY[854]=-1.19691965952153;
starCoords.posX[855]=-83.1135245789014;starCoords.posY[855]=-0.293203565648061;
starCoords.posX[856]=-88.9113753622908;starCoords.posY[856]=7.40803864618872;
starCoords.posX[857]=-81.4002302536363;starCoords.posY[857]=6.35703629573222;
starCoords.posX[858]=-81.4002302536363;starCoords.posY[858]=6.35703629573222;
starCoords.posX[859]=-72.5778201880562;starCoords.posY[859]=6.97590975591379;
starCoords.posX[860]=-72.5778201880562;starCoords.posY[860]=6.97590975591379;
starCoords.posX[861]=-72.9181957817733;starCoords.posY[861]=5.61946128630134;
starCoords.posX[862]=-72.9181957817733;starCoords.posY[862]=5.61946128630134;
starCoords.posX[863]=-73.677004653315;starCoords.posY[863]=2.45441054356427;
starCoords.posX[864]=-73.677004653315;starCoords.posY[864]=2.45441054356427;
starCoords.posX[865]=-74.7506076231335;starCoords.posY[865]=1.72687587909058;
starCoords.posX[866]=-72.5778201880562;starCoords.posY[866]=6.97590975591379;
starCoords.posX[867]=-72.7724025695757;starCoords.posY[867]=8.91465268375287;
starCoords.posX[868]=-72.7724025695757;starCoords.posY[868]=8.91465268375287;
starCoords.posX[869]=-73.8443505831657;starCoords.posY[869]=10.1644376277925;
starCoords.posX[870]=-74.2161900379315;starCoords.posY[870]=13.527767657435;
starCoords.posX[871]=-73.8443505831657;starCoords.posY[871]=10.1644376277925;
starCoords.posX[872]=-74.2161900379315;starCoords.posY[872]=13.527767657435;
starCoords.posX[873]=-76.2674333580725;starCoords.posY[873]=15.4157218391678;
starCoords.posX[874]=-88.9113753622908;starCoords.posY[874]=7.40803864618872;
starCoords.posX[875]=-90.7162129760257;starCoords.posY[875]=9.6467187795119;
starCoords.posX[876]=-90.7162129760257;starCoords.posY[876]=9.6467187795119;
starCoords.posX[877]=-93.1094041195166;starCoords.posY[877]=14.206175369442;
starCoords.posX[878]=-93.1094041195166;starCoords.posY[878]=14.206175369442;
starCoords.posX[879]=-91.1099031810005;starCoords.posY[879]=20.1375634076054;
starCoords.posX[880]=-88.7258848137543;starCoords.posY[880]=20.2773130956872;
starCoords.posX[881]=-92.0179592547702;starCoords.posY[881]=14.7668093333183;
starCoords.posX[882]=-88.7258848137543;starCoords.posY[882]=20.2773130956872;
starCoords.posX[883]=-91.1099031810005;starCoords.posY[883]=20.1375634076054;
starCoords.posX[884]=-78.3311614042555;starCoords.posY[884]=-16.1955741132251;
starCoords.posX[885]=-79.9947303417656;starCoords.posY[885]=-13.1682822740861;
starCoords.posX[886]=-78.3311614042555;starCoords.posY[886]=-16.1955741132251;
starCoords.posX[887]=-78.4089693815416;starCoords.posY[887]=-12.9314610175848;
starCoords.posX[888]=-83.2791204846448;starCoords.posY[888]=-17.8165463059945;
starCoords.posX[889]=-78.3311614042555;starCoords.posY[889]=-16.1955741132251;
starCoords.posX[890]=-83.2791204846448;starCoords.posY[890]=-17.8165463059945;
starCoords.posX[891]=-82.1551641347084;starCoords.posY[891]=-20.7527520682261;
starCoords.posX[892]=-82.1551641347084;starCoords.posY[892]=-20.7527520682261;
starCoords.posX[893]=-76.4578847265332;starCoords.posY[893]=-22.3595867759113;
starCoords.posX[894]=-76.4578847265332;starCoords.posY[894]=-22.3595867759113;
starCoords.posX[895]=-78.3311614042555;starCoords.posY[895]=-16.1955741132251;
starCoords.posX[896]=-82.1551641347084;starCoords.posY[896]=-20.7527520682261;
starCoords.posX[897]=-86.2078755349524;starCoords.posY[897]=-22.4451211614107;
starCoords.posX[898]=-86.2078755349524;starCoords.posY[898]=-22.4451211614107;
starCoords.posX[899]=-87.9238956588406;starCoords.posY[899]=-20.8772840637757;
starCoords.posX[900]=-87.9238956588406;starCoords.posY[900]=-20.8772840637757;
starCoords.posX[901]=-91.6379653167753;starCoords.posY[901]=-14.9366047033772;
starCoords.posX[902]=-89.2010321389105;starCoords.posY[902]=-14.1669784106892;
starCoords.posX[903]=-91.6379653167753;starCoords.posY[903]=-14.9366047033772;
starCoords.posX[904]=-86.8381560561472;starCoords.posY[904]=-14.8192208626614;
starCoords.posX[905]=-89.2010321389105;starCoords.posY[905]=-14.1669784106892;
starCoords.posX[906]=-83.2791204846448;starCoords.posY[906]=-17.8165463059945;
starCoords.posX[907]=-86.8381560561472;starCoords.posY[907]=-14.8192208626614;
starCoords.posX[908]=-77.0703228241018;starCoords.posY[908]=-5.07550085816108;
starCoords.posX[909]=-71.4851146660999;starCoords.posY[909]=-3.23914328954615;
starCoords.posX[910]=-69.1892018166978;starCoords.posY[910]=-3.33510729394885;
starCoords.posX[911]=-71.4851146660999;starCoords.posY[911]=-3.23914328954615;
starCoords.posX[912]=-69.1892018166978;starCoords.posY[912]=-3.33510729394885;
starCoords.posX[913]=-63.073324900314;starCoords.posY[913]=-6.8154792386806;
starCoords.posX[914]=-59.6093799783085;starCoords.posY[914]=-13.4838324606705;
starCoords.posX[915]=-63.073324900314;starCoords.posY[915]=-6.8154792386806;
starCoords.posX[916]=-59.6093799783085;starCoords.posY[916]=-13.4838324606705;
starCoords.posX[917]=-56.6389576210353;starCoords.posY[917]=-12.0747626946476;
starCoords.posX[918]=-55.9172703516784;starCoords.posY[918]=-9.73605725398461;
starCoords.posX[919]=-56.6389576210353;starCoords.posY[919]=-12.0747626946476;
starCoords.posX[920]=-55.9172703516784;starCoords.posY[920]=-9.73605725398461;
starCoords.posX[921]=-53.3383259409003;starCoords.posY[921]=-9.42913791316494;
starCoords.posX[922]=-53.3383259409003;starCoords.posY[922]=-9.42913791316494;
starCoords.posX[923]=-44.213673196864;starCoords.posY[923]=-8.86319533188742;
starCoords.posX[924]=-44.213673196864;starCoords.posY[924]=-8.86319533188742;
starCoords.posX[925]=-41.1348426666794;starCoords.posY[925]=-13.8219755168432;
starCoords.posX[926]=-41.1348426666794;starCoords.posY[926]=-13.8219755168432;
starCoords.posX[927]=-41.3770341359535;starCoords.posY[927]=-18.5359782193002;
starCoords.posX[928]=-45.6948306113962;starCoords.posY[928]=-23.5904144971767;
starCoords.posX[929]=-41.3770341359535;starCoords.posY[929]=-18.5359782193002;
starCoords.posX[930]=-49.976402791638;starCoords.posY[930]=-21.7265022729574;
starCoords.posX[931]=-45.6948306113962;starCoords.posY[931]=-23.5904144971767;
starCoords.posX[932]=-49.976402791638;starCoords.posY[932]=-21.7265022729574;
starCoords.posX[933]=-53.5435617358051;starCoords.posY[933]=-21.6039016451281;
starCoords.posX[934]=-56.8066764443948;starCoords.posY[934]=-23.2230182217898;
starCoords.posX[935]=-53.5435617358051;starCoords.posY[935]=-21.6039016451281;
starCoords.posX[936]=-56.8066764443948;starCoords.posY[936]=-23.2230182217898;
starCoords.posX[937]=-58.5210138848107;starCoords.posY[937]=-24.5867570187955;
starCoords.posX[938]=-60.0744900169525;starCoords.posY[938]=-23.9918773579283;
starCoords.posX[939]=-58.5210138848107;starCoords.posY[939]=-24.5867570187955;
starCoords.posX[940]=-68.4635496267154;starCoords.posY[940]=-29.7485742192065;
starCoords.posX[941]=-60.0744900169525;starCoords.posY[941]=-23.9918773579283;
starCoords.posX[942]=-68.972949544897;starCoords.posY[942]=-30.5448276386996;
starCoords.posX[943]=-68.4635496267154;starCoords.posY[943]=-29.7485742192065;
starCoords.posX[944]=-68.972949544897;starCoords.posY[944]=-30.5448276386996;
starCoords.posX[945]=-66.0912679139105;starCoords.posY[945]=-33.9970705150708;
starCoords.posX[946]=-64.5562407632275;starCoords.posY[946]=-33.777386172065;
starCoords.posX[947]=-66.0912679139105;starCoords.posY[947]=-33.9970705150708;
starCoords.posX[948]=-64.5562407632275;starCoords.posY[948]=-33.777386172065;
starCoords.posX[949]=-57.4456298168631;starCoords.posY[949]=-36.17400624477;
starCoords.posX[950]=-42.3638425484384;starCoords.posY[950]=-32.3698756267806;
starCoords.posX[951]=-31.2206240767063;starCoords.posY[951]=-29.2551358146623;
starCoords.posX[952]=-48.1107763895104;starCoords.posY[952]=-28.9550611395787;
starCoords.posX[953]=-42.3638425484384;starCoords.posY[953]=-32.3698756267806;
starCoords.posX[954]=-76.0500174776787;starCoords.posY[954]=60.454070538388;
starCoords.posX[955]=-74.4978149618114;starCoords.posY[955]=53.7651941176653;
starCoords.posX[956]=-76.0500174776787;starCoords.posY[956]=60.454070538388;
starCoords.posX[957]=-73.7313776036501;starCoords.posY[957]=66.3564149196337;
starCoords.posX[958]=-52.4460236164085;starCoords.posY[958]=59.9700836456769;
starCoords.posX[959]=-57.582757262663;starCoords.posY[959]=65.5521612193696;
starCoords.posX[960]=-73.7313776036501;starCoords.posY[960]=66.3564149196337;
starCoords.posX[961]=-57.8236144891918;starCoords.posY[961]=71.3582929115239;
starCoords.posX[962]=-57.582757262663;starCoords.posY[962]=65.5521612193696;
starCoords.posX[963]=-57.8236144891918;starCoords.posY[963]=71.3582929115239;
starCoords.posX[964]=-73.7313776036501;starCoords.posY[964]=66.3564149196337;
starCoords.posX[965]=-94.9522709047519;starCoords.posY[965]=69.3156836672614;
starCoords.posX[966]=-94.9522709047519;starCoords.posY[966]=69.3156836672614;
starCoords.posX[967]=-101.931011510868;starCoords.posY[967]=79.554893895697;
starCoords.posX[968]=-104.508026983154;starCoords.posY[968]=58.4106329064185;
starCoords.posX[969]=-95.0986891078032;starCoords.posY[969]=59.0067167144332;
starCoords.posX[970]=-140.397247892327;starCoords.posY[970]=34.3550625743122;
starCoords.posX[971]=-139.846659703432;starCoords.posY[971]=36.7653986956728;
starCoords.posX[972]=-139.846659703432;starCoords.posY[972]=36.7653986956728;
starCoords.posX[973]=-136.77099918619;starCoords.posY[973]=38.4167596465144;
starCoords.posX[974]=-135.303025440114;starCoords.posY[974]=41.7483240440257;
starCoords.posX[975]=-136.77099918619;starCoords.posY[975]=38.4167596465144;
starCoords.posX[976]=-135.303025440114;starCoords.posY[976]=41.7483240440257;
starCoords.posX[977]=-125.857996540085;starCoords.posY[977]=43.1596448191584;
starCoords.posX[978]=-104.508026983154;starCoords.posY[978]=58.4106329064185;
starCoords.posX[979]=-111.84308759626;starCoords.posY[979]=49.1934659190222;
starCoords.posX[980]=-125.857996540085;starCoords.posY[980]=43.1596448191584;
starCoords.posX[981]=-111.84308759626;starCoords.posY[981]=49.1934659190222;
starCoords.posX[982]=-90.0429678633551;starCoords.posY[982]=44.9474645804369;
starCoords.posX[983]=-90.0615326798605;starCoords.posY[983]=54.2846803014439;
starCoords.posX[984]=-79.3339208581408;starCoords.posY[984]=46.0070753842069;
starCoords.posX[985]=-90.0615326798605;starCoords.posY[985]=54.2846803014439;
starCoords.posX[986]=-79.3339208581408;starCoords.posY[986]=46.0070753842069;
starCoords.posX[987]=-90.0429678633551;starCoords.posY[987]=44.9474645804369;
starCoords.posX[988]=-90.0429678633551;starCoords.posY[988]=44.9474645804369;
starCoords.posX[989]=-90.0793610577737;starCoords.posY[989]=37.2125810867405;
starCoords.posX[990]=-81.7113606453054;starCoords.posY[990]=28.6145312391826;
starCoords.posX[991]=-90.0793610577737;starCoords.posY[991]=37.2125810867405;
starCoords.posX[992]=-81.7113606453054;starCoords.posY[992]=28.6145312391826;
starCoords.posX[993]=-74.3911757149038;starCoords.posY[993]=33.1792568922899;
starCoords.posX[994]=-74.3911757149038;starCoords.posY[994]=33.1792568922899;
starCoords.posX[995]=-76.7823642679395;starCoords.posY[995]=41.2456771766091;
starCoords.posX[996]=-79.3339208581408;starCoords.posY[996]=46.0070753842069;
starCoords.posX[997]=-76.7823642679395;starCoords.posY[997]=41.2456771766091;
starCoords.posX[998]=-79.3339208581408;starCoords.posY[998]=46.0070753842069;
starCoords.posX[999]=-75.6496209294983;starCoords.posY[999]=43.8354476754192;
starCoords.posX[1000]=-75.6496209294983;starCoords.posY[1000]=43.8354476754192;
starCoords.posX[1001]=-75.7727812571831;starCoords.posY[1001]=41.0878736150649;
starCoords.posX[1002]=-113.789361093282;starCoords.posY[1002]=31.8686795506332;
starCoords.posX[1003]=-107.924023704732;starCoords.posY[1003]=30.2302264371979;
starCoords.posX[1004]=-111.567681074733;starCoords.posY[1004]=27.7802258836174;
starCoords.posX[1005]=-107.924023704732;starCoords.posY[1005]=30.2302264371979;
starCoords.posX[1006]=-111.567681074733;starCoords.posY[1006]=27.7802258836174;
starCoords.posX[1007]=-114.115282898453;starCoords.posY[1007]=26.8758885909988;
starCoords.posX[1008]=-116.46448415375;starCoords.posY[1008]=28.0045398463044;
starCoords.posX[1009]=-114.115282898453;starCoords.posY[1009]=26.8758885909988;
starCoords.posX[1010]=-116.243823139518;starCoords.posY[1010]=24.3765007392153;
starCoords.posX[1011]=-114.115282898453;starCoords.posY[1011]=26.8758885909988;
starCoords.posX[1012]=-110.161308601712;starCoords.posY[1012]=21.9655817246562;
starCoords.posX[1013]=-114.115282898453;starCoords.posY[1013]=26.8758885909988;
starCoords.posX[1014]=-110.161308601712;starCoords.posY[1014]=21.9655817246562;
starCoords.posX[1015]=-109.648978134726;starCoords.posY[1015]=16.524052141411;
starCoords.posX[1016]=-101.445394801111;starCoords.posY[1016]=12.8859753202002;
starCoords.posX[1017]=-109.648978134726;starCoords.posY[1017]=16.524052141411;
starCoords.posX[1018]=-110.161308601712;starCoords.posY[1018]=21.9655817246562;
starCoords.posX[1019]=-106.156881719991;starCoords.posY[1019]=20.5567936720647;
starCoords.posX[1020]=-99.5541638339169;starCoords.posY[1020]=16.3912190897269;
starCoords.posX[1021]=-106.156881719991;starCoords.posY[1021]=20.5567936720647;
starCoords.posX[1022]=-103.341277942005;starCoords.posY[1022]=33.9500721375129;
starCoords.posX[1023]=-107.924023704732;starCoords.posY[1023]=30.2302264371979;
starCoords.posX[1024]=-101.11755575893;starCoords.posY[1024]=25.1217866011825;
starCoords.posX[1025]=-107.924023704732;starCoords.posY[1025]=30.2302264371979;
starCoords.posX[1026]=-101.11755575893;starCoords.posY[1026]=25.1217866011825;
starCoords.posX[1027]=-97.3706713642196;starCoords.posY[1027]=20.2059379697698;
starCoords.posX[1028]=-95.8722926893476;starCoords.posY[1028]=22.5086574697934;
starCoords.posX[1029]=-101.11755575893;starCoords.posY[1029]=25.1217866011825;
starCoords.posX[1030]=-95.8722926893476;starCoords.posY[1030]=22.5086574697934;
starCoords.posX[1031]=-93.8516626866346;starCoords.posY[1031]=22.5035824877851;
starCoords.posX[1032]=-93.8516626866346;starCoords.posY[1032]=22.5035824877851;
starCoords.posX[1033]=-91.1631069609266;starCoords.posY[1033]=23.2624087501011;
starCoords.posX[1034]=-57.4456298168631;starCoords.posY[1034]=-36.17400624477;
starCoords.posX[1035]=-54.3522609004317;starCoords.posY[1035]=-40.2461260311954;
starCoords.posX[1036]=-50.0563834309267;starCoords.posY[1036]=-43.0384809036443;
starCoords.posX[1037]=-54.3522609004317;starCoords.posY[1037]=-40.2461260311954;
starCoords.posX[1038]=-44.6484566676716;starCoords.posY[1038]=-40.2699889169337;
starCoords.posX[1039]=-50.0563834309267;starCoords.posY[1039]=-43.0384809036443;
starCoords.posX[1040]=-44.6484566676716;starCoords.posY[1040]=-40.2699889169337;
starCoords.posX[1041]=-40.2525774188037;starCoords.posY[1041]=-39.8181711019515;
starCoords.posX[1042]=-40.2525774188037;starCoords.posY[1042]=-39.8181711019515;
starCoords.posX[1043]=-40.0329260092753;starCoords.posY[1043]=-42.8543459839037;
starCoords.posX[1044]=-36.826380873086;starCoords.posY[1044]=-47.6648241265635;
starCoords.posX[1045]=-40.0329260092753;starCoords.posY[1045]=-42.8543459839037;
starCoords.posX[1046]=-29.0707492442841;starCoords.posY[1046]=-51.5662994354326;
starCoords.posX[1047]=-36.826380873086;starCoords.posY[1047]=-47.6648241265635;
starCoords.posX[1048]=-24.5091226852922;starCoords.posY[1048]=-57.1924160748606;
starCoords.posX[1049]=-29.0707492442841;starCoords.posY[1049]=-51.5662994354326;
starCoords.posX[1050]=-6.67784086954529;starCoords.posY[1050]=-42.2575899629755;
starCoords.posX[1051]=-2.46255246631881;starCoords.posY[1051]=-45.6987523885363;
starCoords.posX[1052]=-16.6184708992727;starCoords.posY[1052]=-46.6717198822965;
starCoords.posX[1053]=-2.46255246631881;starCoords.posY[1053]=-45.6987523885363;
starCoords.posX[1054]=-16.6184708992727;starCoords.posY[1054]=-46.6717198822965;
starCoords.posX[1055]=-22.1861861844716;starCoords.posY[1055]=-43.2731088258507;
starCoords.posX[1056]=-22.1861861844716;starCoords.posY[1056]=-43.2731088258507;
starCoords.posX[1057]=-22.903055816334;starCoords.posY[1057]=-49.0278111066915;
starCoords.posX[1058]=-22.903055816334;starCoords.posY[1058]=-49.0278111066915;
starCoords.posX[1059]=-17.1875632348984;starCoords.posY[1059]=-55.1992074694331;
starCoords.posX[1060]=-16.6184708992727;starCoords.posY[1060]=-46.6717198822965;
starCoords.posX[1061]=-17.1875632348984;starCoords.posY[1061]=-55.1992074694331;
starCoords.posX[1062]=-6.67784086954529;starCoords.posY[1062]=-42.2575899629755;
starCoords.posX[1063]=-16.6184708992727;starCoords.posY[1063]=-46.6717198822965;
starCoords.posX[1064]=6.64080298875569;starCoords.posY[1064]=-37.7698834309048;
starCoords.posX[1065]=10.17638588842;starCoords.posY[1065]=-32.4840851670293;
starCoords.posX[1066]=10.17638588842;starCoords.posY[1066]=-32.4840851670293;
starCoords.posX[1067]=2.65525463711197;starCoords.posY[1067]=-28.0816054458255;
starCoords.posX[1068]=-14.7566516985761;starCoords.posY[1068]=-29.3103277466015;
starCoords.posX[1069]=2.65525463711197;starCoords.posY[1069]=-28.0816054458255;
starCoords.posX[1070]=27.8053938063777;starCoords.posY[1070]=-46.9179107219689;
starCoords.posX[1071]=19.2040134683855;starCoords.posY[1071]=-46.8385891440098;
starCoords.posX[1072]=19.2040134683855;starCoords.posY[1072]=-46.8385891440098;
starCoords.posX[1073]=17.7307294393597;starCoords.posY[1073]=-51.2704780778441;
starCoords.posX[1074]=17.7307294393597;starCoords.posY[1074]=-51.2704780778441;
starCoords.posX[1075]=14.6514808415126;starCoords.posY[1075]=-52.7070182000754;
starCoords.posX[1076]=19.2040134683855;starCoords.posY[1076]=-46.8385891440098;
starCoords.posX[1077]=22.5527615808013;starCoords.posY[1077]=-43.4505945569228;
starCoords.posX[1078]=27.8053938063777;starCoords.posY[1078]=-46.9179107219689;
starCoords.posX[1079]=22.5527615808013;starCoords.posY[1079]=-43.4505945569228;
starCoords.posX[1080]=22.5527615808013;starCoords.posY[1080]=-43.4505945569228;
starCoords.posX[1081]=28.3400696723497;starCoords.posY[1081]=-39.5005019053246;
starCoords.posX[1082]=31.3863745077604;starCoords.posY[1082]=-37.3232931626388;
starCoords.posX[1083]=28.3400696723497;starCoords.posY[1083]=-39.5005019053246;
starCoords.posX[1084]=-5.11507246163586;starCoords.posY[1084]=-64.8262640630836;
starCoords.posX[1085]=-7.98481293220047;starCoords.posY[1085]=-62.909967337171;
starCoords.posX[1086]=-5.11507246163586;starCoords.posY[1086]=-64.8262640630836;
starCoords.posX[1087]=-0.0909496808635026;starCoords.posY[1087]=-65.5284152338404;
starCoords.posX[1088]=-0.0909496808635026;starCoords.posY[1088]=-65.5284152338404;
starCoords.posX[1089]=23.0140551413338;starCoords.posY[1089]=-64.9215405462102;
starCoords.posX[1090]=25.225917833911;starCoords.posY[1090]=-60.2155436474226;
starCoords.posX[1091]=23.0140551413338;starCoords.posY[1091]=-64.9215405462102;
starCoords.posX[1092]=25.225917833911;starCoords.posY[1092]=-60.2155436474226;
starCoords.posX[1093]=10.5159977240745;starCoords.posY[1093]=-58.18784547743;
starCoords.posX[1094]=-7.98481293220047;starCoords.posY[1094]=-62.909967337171;
starCoords.posX[1095]=10.5159977240745;starCoords.posY[1095]=-58.18784547743;
starCoords.posX[1096]=-6.50664892018784;starCoords.posY[1096]=-77.2058394979221;
starCoords.posX[1097]=-20.5311903956352;starCoords.posY[1097]=-71.0992388304671;
starCoords.posX[1098]=-29.7592954964585;starCoords.posY[1098]=-61.5275529244508;
starCoords.posX[1099]=-6.50664892018784;starCoords.posY[1099]=-77.2058394979221;
starCoords.posX[1100]=-33.665500732052;starCoords.posY[1100]=-77.0440398036635;
starCoords.posX[1101]=-56.7772330652695;starCoords.posY[1101]=-74.2122820476119;
starCoords.posX[1102]=-56.7772330652695;starCoords.posY[1102]=-74.2122820476119;
starCoords.posX[1103]=-35.4773198623922;starCoords.posY[1103]=-68.6197359874122;
starCoords.posX[1104]=-29.7592954964585;starCoords.posY[1104]=-61.5275529244508;
starCoords.posX[1105]=-35.4773198623922;starCoords.posY[1105]=-68.6197359874122;
starCoords.posX[1106]=-40.2329669916994;starCoords.posY[1106]=-54.5127012303915;
starCoords.posX[1107]=-39.4231561629438;starCoords.posY[1107]=-52.5054339234008;
starCoords.posX[1108]=-39.4231561629438;starCoords.posY[1108]=-52.5054339234008;
starCoords.posX[1109]=-40.7121691929661;starCoords.posY[1109]=-50.7633464315884;
starCoords.posX[1110]=-63.5728843327141;starCoords.posY[1110]=-42.2726584968898;
starCoords.posX[1111]=-40.7121691929661;starCoords.posY[1111]=-50.7633464315884;
starCoords.posX[1112]=-45.9557440223224;starCoords.posY[1112]=-59.7038907035351;
starCoords.posX[1113]=-40.2329669916994;starCoords.posY[1113]=-54.5127012303915;
starCoords.posX[1114]=-44.7407346428815;starCoords.posY[1114]=-64.0366681012711;
starCoords.posX[1115]=-45.9557440223224;starCoords.posY[1115]=-59.7038907035351;
starCoords.posX[1116]=-63.6344619426618;starCoords.posY[1116]=-62.4522122605192;
starCoords.posX[1117]=-64.1593619567059;starCoords.posY[1117]=-59.2809074576764;
starCoords.posX[1118]=-63.6344619426618;starCoords.posY[1118]=-62.4522122605192;
starCoords.posX[1119]=-56.0751342855065;starCoords.posY[1119]=-64.7797042846644;
starCoords.posX[1120]=-56.0751342855065;starCoords.posY[1120]=-64.7797042846644;
starCoords.posX[1121]=-59.7214236389938;starCoords.posY[1121]=-61.3756094751676;
starCoords.posX[1122]=-64.1593619567059;starCoords.posY[1122]=-59.2809074576764;
starCoords.posX[1123]=-59.7214236389938;starCoords.posY[1123]=-61.3756094751676;
starCoords.posX[1124]=-70.2116347665386;starCoords.posY[1124]=-41.8472311734444;
starCoords.posX[1125]=-67.7758515123794;starCoords.posY[1125]=-44.9352969294814;
starCoords.posX[1126]=-70.2116347665386;starCoords.posY[1126]=-41.8472311734444;
starCoords.posX[1127]=-70.5917904721803;starCoords.posY[1127]=-37.1280773138962;
starCoords.posX[1128]=-76.180001250481;starCoords.posY[1128]=-35.4713089294817;
starCoords.posX[1129]=-70.5917904721803;starCoords.posY[1129]=-37.1280773138962;
starCoords.posX[1130]=-68.5462423598331;starCoords.posY[1130]=-55.0271377658905;
starCoords.posX[1131]=-64.0635475168968;starCoords.posY[1131]=-51.4653187136448;
starCoords.posX[1132]=-68.5462423598331;starCoords.posY[1132]=-55.0271377658905;
starCoords.posX[1133]=-76.4156734892767;starCoords.posY[1133]=-57.4612458143678;
starCoords.posX[1134]=-83.4255100395836;starCoords.posY[1134]=-62.4842393932457;
starCoords.posX[1135]=-76.4156734892767;starCoords.posY[1135]=-57.4612458143678;
starCoords.posX[1136]=-68.5462423598331;starCoords.posY[1136]=-55.0271377658905;
starCoords.posX[1137]=-83.4255100395836;starCoords.posY[1137]=-62.4842393932457;
starCoords.posX[1138]=-83.4255100395836;starCoords.posY[1138]=-62.4842393932457;
starCoords.posX[1139]=-86.1976205905534;starCoords.posY[1139]=-65.7322934381169;
starCoords.posX[1140]=-86.1976205905534;starCoords.posY[1140]=-65.7322934381169;
starCoords.posX[1141]=-88.5410316206063;starCoords.posY[1141]=-63.0883799584786;
starCoords.posX[1142]=-83.4255100395836;starCoords.posY[1142]=-62.4842393932457;
starCoords.posX[1143]=-88.5410316206063;starCoords.posY[1143]=-63.0883799584786;
starCoords.posX[1144]=-102.07061049196;starCoords.posY[1144]=-61.9515696842779;
starCoords.posX[1145]=-87.4962658634336;starCoords.posY[1145]=-56.1645180956038;
starCoords.posX[1146]=-86.8730876254139;starCoords.posY[1146]=-51.0638346557553;
starCoords.posX[1147]=-87.4962658634336;starCoords.posY[1147]=-56.1645180956038;
starCoords.posX[1148]=-84.9915331764049;starCoords.posY[1148]=-34.0698211676279;
starCoords.posX[1149]=-82.8808011415356;starCoords.posY[1149]=-35.4644483958618;
starCoords.posX[1150]=-84.9915331764049;starCoords.posY[1150]=-34.0698211676279;
starCoords.posX[1151]=-87.8169766223018;starCoords.posY[1151]=-35.7664202179843;
starCoords.posX[1152]=-87.8169766223018;starCoords.posY[1152]=-35.7664202179843;
starCoords.posX[1153]=-89.8536412764827;starCoords.posY[1153]=-42.8149825243478;
starCoords.posX[1154]=-87.8169766223018;starCoords.posY[1154]=-35.7664202179843;
starCoords.posX[1155]=-95.6085492329626;starCoords.posY[1155]=-33.4411273395911;
starCoords.posX[1156]=-101.384969205308;starCoords.posY[1156]=-16.7256917816216;
starCoords.posX[1157]=-95.771332782916;starCoords.posY[1157]=-17.9607758354315;
starCoords.posX[1158]=-101.384969205308;starCoords.posY[1158]=-16.7256917816216;
starCoords.posX[1159]=-107.186847426638;starCoords.posY[1159]=-26.4075587800918;
starCoords.posX[1160]=-107.186847426638;starCoords.posY[1160]=-26.4075587800918;
starCoords.posX[1161]=-111.110343098933;starCoords.posY[1161]=-29.3206153530511;
starCoords.posX[1162]=-104.742458809305;starCoords.posY[1162]=-28.9844455683792;
starCoords.posX[1163]=-107.186847426638;starCoords.posY[1163]=-26.4075587800918;
starCoords.posX[1164]=-104.742458809305;starCoords.posY[1164]=-28.9844455683792;
starCoords.posX[1165]=-103.623969405714;starCoords.posY[1165]=-24.195648402469;
starCoords.posX[1166]=-103.623969405714;starCoords.posY[1166]=-24.195648402469;
starCoords.posX[1167]=-99.2662830182681;starCoords.posY[1167]=-19.2636837358553;
starCoords.posX[1168]=-95.771332782916;starCoords.posY[1168]=-17.9607758354315;
starCoords.posX[1169]=-99.2662830182681;starCoords.posY[1169]=-19.2636837358553;
starCoords.posX[1170]=-101.384969205308;starCoords.posY[1170]=-16.7256917816216;
starCoords.posX[1171]=-104.131874407016;starCoords.posY[1171]=-17.0660962890694;
starCoords.posX[1172]=-106.038546803655;starCoords.posY[1172]=-15.6467051993053;
starCoords.posX[1173]=-104.131874407016;starCoords.posY[1173]=-17.0660962890694;
starCoords.posX[1174]=-103.649500135909;starCoords.posY[1174]=-12.050082028713;
starCoords.posX[1175]=-106.038546803655;starCoords.posY[1175]=-15.6467051993053;
starCoords.posX[1176]=-103.649500135909;starCoords.posY[1176]=-12.050082028713;
starCoords.posX[1177]=-104.131874407016;starCoords.posY[1177]=-17.0660962890694;
starCoords.posX[1178]=-98.3442528099329;starCoords.posY[1178]=7.32594507896895;
starCoords.posX[1179]=-100.364882152277;starCoords.posY[1179]=9.88703954894375;
starCoords.posX[1180]=-96.0580177392159;starCoords.posY[1180]=4.58777263053992;
starCoords.posX[1181]=-98.3442528099329;starCoords.posY[1181]=7.32594507896895;
starCoords.posX[1182]=-96.0580177392159;starCoords.posY[1182]=4.58777263053992;
starCoords.posX[1183]=-102.079313083931;starCoords.posY[1183]=2.402011796445;
starCoords.posX[1184]=-98.3442528099329;starCoords.posY[1184]=7.32594507896895;
starCoords.posX[1185]=-102.079313083931;starCoords.posY[1185]=2.402011796445;
starCoords.posX[1186]=-108.077784656835;starCoords.posY[1186]=-0.507836376195452;
starCoords.posX[1187]=-102.079313083931;starCoords.posY[1187]=2.402011796445;
starCoords.posX[1188]=-108.077784656835;starCoords.posY[1188]=-0.507836376195452;
starCoords.posX[1189]=-122.2584796388;starCoords.posY[1189]=-3.00974848940915;
starCoords.posX[1190]=-115.416494008255;starCoords.posY[1190]=-9.57199968883544;
starCoords.posX[1191]=-122.2584796388;starCoords.posY[1191]=-3.00974848940915;
starCoords.posX[1192]=-97.3105986359564;starCoords.posY[1192]=-7.03921685819718;
starCoords.posX[1193]=-108.077784656835;starCoords.posY[1193]=-0.507836376195452;
starCoords.posX[1194]=-97.3105986359564;starCoords.posY[1194]=-7.03921685819718;
starCoords.posX[1195]=-93.820645304237;starCoords.posY[1195]=-6.27797700615632;
starCoords.posX[1196]=-130.986101712137;starCoords.posY[1196]=-33.2183094799896;
starCoords.posX[1197]=-132.726336920904;starCoords.posY[1197]=-27.7428694858888;
starCoords.posX[1198]=-130.986101712137;starCoords.posY[1198]=-33.2183094799896;
starCoords.posX[1199]=-130.111276859434;starCoords.posY[1199]=-35.3397114913605;
starCoords.posX[1200]=-120.973072565754;starCoords.posY[1200]=-40.0281909934491;
starCoords.posX[1201]=-130.111276859434;starCoords.posY[1201]=-35.3397114913605;
starCoords.posX[1202]=-120.973072565754;starCoords.posY[1202]=-40.0281909934491;
starCoords.posX[1203]=-121.979478725292;starCoords.posY[1203]=-24.3300915100428;
starCoords.posX[1204]=-121.979478725292;starCoords.posY[1204]=-24.3300915100428;
starCoords.posX[1205]=-117.415613854219;starCoords.posY[1205]=-24.8821822328254;
starCoords.posX[1206]=-117.415613854219;starCoords.posY[1206]=-24.8821822328254;
starCoords.posX[1207]=-114.797540984393;starCoords.posY[1207]=-26.8242341228779;
starCoords.posX[1208]=-114.797540984393;starCoords.posY[1208]=-26.8242341228779;
starCoords.posX[1209]=-113.93345056537;starCoords.posY[1209]=-28.389052436739;
starCoords.posX[1210]=-109.362987745384;starCoords.posY[1210]=-37.1135909945316;
starCoords.posX[1211]=-113.93345056537;starCoords.posY[1211]=-28.389052436739;
starCoords.posX[1212]=-109.362987745384;starCoords.posY[1212]=-37.1135909945316;
starCoords.posX[1213]=-99.5072784397525;starCoords.posY[1213]=-43.2039522453926;
starCoords.posX[1214]=-117.415613854219;starCoords.posY[1214]=-24.8821822328254;
starCoords.posX[1215]=-116.039823340493;starCoords.posY[1215]=-28.9761786639906;
starCoords.posX[1216]=-116.039823340493;starCoords.posY[1216]=-28.9761786639906;
starCoords.posX[1217]=-113.93345056537;starCoords.posY[1217]=-28.389052436739;
starCoords.posX[1218]=-96.0364370079636;starCoords.posY[1218]=-52.700763051055;
starCoords.posX[1219]=-99.5072784397525;starCoords.posY[1219]=-43.2039522453926;
starCoords.posX[1220]=-96.0364370079636;starCoords.posY[1220]=-52.700763051055;
starCoords.posX[1221]=-113.585894319479;starCoords.posY[1221]=-63.7901000595787;
starCoords.posX[1222]=-138.324970410291;starCoords.posY[1222]=-69.7535888009249;
starCoords.posX[1223]=-138.324970410291;starCoords.posY[1223]=-69.7535888009249;
starCoords.posX[1224]=-153.486513631819;starCoords.posY[1224]=-70.0814866634691;
starCoords.posX[1225]=-160.817835768667;starCoords.posY[1225]=-64.440451038717;
starCoords.posX[1226]=-153.486513631819;starCoords.posY[1226]=-70.0814866634691;
starCoords.posX[1227]=-160.817835768667;starCoords.posY[1227]=-64.440451038717;
starCoords.posX[1228]=-158.084408881331;starCoords.posY[1228]=-61.7305163827081;
starCoords.posX[1229]=-158.084408881331;starCoords.posY[1229]=-61.7305163827081;
starCoords.posX[1230]=-154.344236609348;starCoords.posY[1230]=-61.3762046164872;
starCoords.posX[1231]=-139.331188741422;starCoords.posY[1231]=-59.3121642033937;
starCoords.posX[1232]=-154.344236609348;starCoords.posY[1232]=-61.3762046164872;
starCoords.posX[1233]=-125.673378288109;starCoords.posY[1233]=-59.5378774554913;
starCoords.posX[1234]=-139.331188741422;starCoords.posY[1234]=-59.3121642033937;
starCoords.posX[1235]=-125.673378288109;starCoords.posY[1235]=-59.5378774554913;
starCoords.posX[1236]=-119.250383494819;starCoords.posY[1236]=-53.0061435682796;
starCoords.posX[1237]=-122.450593139493;starCoords.posY[1237]=-47.3627035760928;
starCoords.posX[1238]=-119.250383494819;starCoords.posY[1238]=-53.0061435682796;
starCoords.posX[1239]=-122.450593139493;starCoords.posY[1239]=-47.3627035760928;
starCoords.posX[1240]=-120.973072565754;starCoords.posY[1240]=-40.0281909934491;
starCoords.posX[1241]=-131.236184004478;starCoords.posY[1241]=-54.7409141903683;
starCoords.posX[1242]=-139.331188741422;starCoords.posY[1242]=-59.3121642033937;
starCoords.posX[1243]=-122.450593139493;starCoords.posY[1243]=-47.3627035760928;
starCoords.posX[1244]=-131.236184004478;starCoords.posY[1244]=-54.7409141903683;
starCoords.posX[1245]=-122.450593139493;starCoords.posY[1245]=-47.3627035760928;
starCoords.posX[1246]=-137.079668359811;starCoords.posY[1246]=-43.468241362936;
starCoords.posX[1247]=-137.079668359811;starCoords.posY[1247]=-43.468241362936;
starCoords.posX[1248]=-142.76202691183;starCoords.posY[1248]=-40.5055318651506;
starCoords.posX[1249]=-142.76202691183;starCoords.posY[1249]=-40.5055318651506;
starCoords.posX[1250]=-153.776700056573;starCoords.posY[1250]=-42.1656270605735;
starCoords.posX[1251]=-161.786595191821;starCoords.posY[1251]=-49.4665188609559;
starCoords.posX[1252]=-153.776700056573;starCoords.posY[1252]=-42.1656270605735;
starCoords.posX[1253]=-161.786595191821;starCoords.posY[1253]=-49.4665188609559;
starCoords.posX[1254]=-149.29268726745;starCoords.posY[1254]=-54.6096597492029;
starCoords.posX[1255]=-140.596288925627;starCoords.posY[1255]=-55.0482927700257;
starCoords.posX[1256]=-149.29268726745;starCoords.posY[1256]=-54.6096597492029;
starCoords.posX[1257]=-131.236184004478;starCoords.posY[1257]=-54.7409141903683;
starCoords.posX[1258]=-140.596288925627;starCoords.posY[1258]=-55.0482927700257;
starCoords.posX[1259]=-158.084408881331;starCoords.posY[1259]=-61.7305163827081;
starCoords.posX[1260]=-163.462465019388;starCoords.posY[1260]=-58.899861551231;
starCoords.posX[1261]=-163.462465019388;starCoords.posY[1261]=-58.899861551231;
starCoords.posX[1262]=-167.241604977631;starCoords.posY[1262]=-59.0225420172875;
starCoords.posX[1263]=-167.241604977631;starCoords.posY[1263]=-59.0225420172875;
starCoords.posX[1264]=-168.244675064537;starCoords.posY[1264]=-60.365311856921;
starCoords.posX[1265]=-168.244675064537;starCoords.posY[1265]=-60.365311856921;
starCoords.posX[1266]=-166.725812837992;starCoords.posY[1266]=-62.4715196169137;
starCoords.posX[1267]=-160.817835768667;starCoords.posY[1267]=-64.440451038717;
starCoords.posX[1268]=-166.725812837992;starCoords.posY[1268]=-62.4715196169137;
starCoords.posX[1269]=-156.888504327173;starCoords.posY[1269]=-31.1125689921179;
starCoords.posX[1270]=-164.281402921918;starCoords.posY[1270]=-37.1846486998172;
starCoords.posX[1271]=-156.888504327173;starCoords.posY[1271]=-31.1125689921179;
starCoords.posX[1272]=-142.401856963906;starCoords.posY[1272]=-35.9899107603314;
starCoords.posX[1273]=-126.457728520151;starCoords.posY[1273]=-66.1658311734691;
starCoords.posX[1274]=-135.645733330561;starCoords.posY[1274]=-66.4309004273819;
starCoords.posX[1275]=-126.457728520151;starCoords.posY[1275]=-66.1658311734691;
starCoords.posX[1276]=-121.989102019837;starCoords.posY[1276]=-68.642867916201;
starCoords.posX[1277]=-109.206055752659;starCoords.posY[1277]=-67.9731786454516;
starCoords.posX[1278]=-121.989102019837;starCoords.posY[1278]=-68.642867916201;
starCoords.posX[1279]=-107.167450864893;starCoords.posY[1279]=-70.5133190904683;
starCoords.posX[1280]=-109.206055752659;starCoords.posY[1280]=-67.9731786454516;
starCoords.posX[1281]=-107.167450864893;starCoords.posY[1281]=-70.5133190904683;
starCoords.posX[1282]=-115.426646259254;starCoords.posY[1282]=-72.627025850352;
starCoords.posX[1283]=-115.426646259254;starCoords.posY[1283]=-72.627025850352;
starCoords.posX[1284]=-124.946670816654;starCoords.posY[1284]=-71.5428145456272;
starCoords.posX[1285]=-135.645733330561;starCoords.posY[1285]=-66.4309004273819;
starCoords.posX[1286]=-124.946670816654;starCoords.posY[1286]=-71.5428145456272;
starCoords.posX[1287]=-124.569870486049;starCoords.posY[1287]=-76.9473863367533;
starCoords.posX[1288]=-158.892291934486;starCoords.posY[1288]=-78.6532301210429;
starCoords.posX[1289]=-158.892291934486;starCoords.posY[1289]=-78.6532301210429;
starCoords.posX[1290]=-161.465193801438;starCoords.posY[1290]=-80.5863751322147;
starCoords.posX[1291]=175.279729665074;starCoords.posY[1291]=-79.3607960063575;
starCoords.posX[1292]=180;starCoords.posY[1292]=-79.7731019191361;
starCoords.posX[1293]=-180;starCoords.posY[1293]=-79.7731019191361;
starCoords.posX[1294]=-161.465193801438;starCoords.posY[1294]=-80.5863751322147;
starCoords.posX[1295]=175.279729665074;starCoords.posY[1295]=-79.3607960063575;
starCoords.posX[1296]=179.981099810182;starCoords.posY[1296]=-78.2705557204285;
starCoords.posX[1297]=180;starCoords.posY[1297]=-78.2716096466468;
starCoords.posX[1298]=179.981099810182;starCoords.posY[1298]=-78.2705557204285;
starCoords.posX[1299]=-158.892291934486;starCoords.posY[1299]=-78.6532301210429;
starCoords.posX[1300]=-180;starCoords.posY[1300]=-78.2716096466468;
starCoords.posX[1301]=173.226991644111;starCoords.posY[1301]=-63.1474746221239;
starCoords.posX[1302]=172.086151926378;starCoords.posY[1302]=-57.1614716478975;
starCoords.posX[1303]=167.94018190549;starCoords.posY[1303]=-59.7364166977086;
starCoords.posX[1304]=176.096108267731;starCoords.posY[1304]=-58.7975349707476;
starCoords.posX[1305]=170.570990708617;starCoords.posY[1305]=-69.1836316362697;
starCoords.posX[1306]=168.293215990572;starCoords.posY[1306]=-68.1558343048733;
starCoords.posX[1307]=168.293215990572;starCoords.posY[1307]=-68.1558343048733;
starCoords.posX[1308]=164.282091899121;starCoords.posY[1308]=-71.5957677754101;
starCoords.posX[1309]=164.282091899121;starCoords.posY[1309]=-71.5957677754101;
starCoords.posX[1310]=171.749345156262;starCoords.posY[1310]=-72.1812091220018;
starCoords.posX[1311]=170.570990708617;starCoords.posY[1311]=-69.1836316362697;
starCoords.posX[1312]=171.749345156262;starCoords.posY[1312]=-72.1812091220018;
starCoords.posX[1313]=170.570990708617;starCoords.posY[1313]=-69.1836316362697;
starCoords.posX[1314]=175.484781280445;starCoords.posY[1314]=-68.0093053367859;
starCoords.posX[1315]=180;starCoords.posY[1315]=-67.3794202323946;
starCoords.posX[1316]=175.484781280445;starCoords.posY[1316]=-68.0093053367859;
starCoords.posX[1317]=-176.507211676295;starCoords.posY[1317]=-66.7773862757772;
starCoords.posX[1318]=-180;starCoords.posY[1318]=-67.3794202323946;
starCoords.posX[1319]=169.498179479185;starCoords.posY[1319]=-49.007798633348;
starCoords.posX[1320]=172.870715384534;starCoords.posY[1320]=-50.2789813748164;
starCoords.posX[1321]=177.796012250227;starCoords.posY[1321]=-50.7711081902447;
starCoords.posX[1322]=172.870715384534;starCoords.posY[1322]=-50.2789813748164;
starCoords.posX[1323]=177.796012250227;starCoords.posY[1323]=-50.7711081902447;
starCoords.posX[1324]=180;starCoords.posY[1324]=-51.6152924815325;
starCoords.posX[1325]=-180;starCoords.posY[1325]=-51.6152924815325;
starCoords.posX[1326]=-170.352350140408;starCoords.posY[1326]=-54.5390399000091;
starCoords.posX[1327]=172.870715384534;starCoords.posY[1327]=-50.2789813748164;
starCoords.posX[1328]=176.971589099729;starCoords.posY[1328]=-52.4171116094438;
starCoords.posX[1329]=176.971589099729;starCoords.posY[1329]=-52.4171116094438;
starCoords.posX[1330]=180;starCoords.posY[1330]=-57.2173445928628;
starCoords.posX[1331]=-180;starCoords.posY[1331]=-57.2173445928628;
starCoords.posX[1332]=-176.735459804108;starCoords.posY[1332]=-61.2270336413004;
starCoords.posX[1333]=169.498179479185;starCoords.posY[1333]=-49.007798633348;
starCoords.posX[1334]=154.88810519146;starCoords.posY[1334]=-53.5105311112741;
starCoords.posX[1335]=154.88810519146;starCoords.posY[1335]=-53.5105311112741;
starCoords.posX[1336]=150.977322182799;starCoords.posY[1336]=-47.331002786828;
starCoords.posX[1337]=169.498179479185;starCoords.posY[1337]=-49.007798633348;
starCoords.posX[1338]=150.977322182799;starCoords.posY[1338]=-47.331002786828;
starCoords.posX[1339]=148.887757758203;starCoords.posY[1339]=-60.4147828170214;
starCoords.posX[1340]=154.88810519146;starCoords.posY[1340]=-53.5105311112741;
starCoords.posX[1341]=139.9202781255;starCoords.posY[1341]=-60.8712975696917;
starCoords.posX[1342]=148.887757758203;starCoords.posY[1342]=-60.4147828170214;
starCoords.posX[1343]=139.192377700722;starCoords.posY[1343]=-65.0120626618817;
starCoords.posX[1344]=130.447956079755;starCoords.posY[1344]=-58.832869456083;
starCoords.posX[1345]=139.192377700722;starCoords.posY[1345]=-65.0120626618817;
starCoords.posX[1346]=128.979718612812;starCoords.posY[1346]=-59.3514904434203;
starCoords.posX[1347]=150.977322182799;starCoords.posY[1347]=-47.331002786828;
starCoords.posX[1348]=152.463164737264;starCoords.posY[1348]=-42.5169556777766;
starCoords.posX[1349]=152.491709193789;starCoords.posY[1349]=-41.7309442241198;
starCoords.posX[1350]=152.463164737264;starCoords.posY[1350]=-42.5169556777766;
starCoords.posX[1351]=152.491709193789;starCoords.posY[1351]=-41.7309442241198;
starCoords.posX[1352]=157.111275102695;starCoords.posY[1352]=-39.4522091784685;
starCoords.posX[1353]=159.725888490155;starCoords.posY[1353]=-36.7580118391703;
starCoords.posX[1354]=157.111275102695;starCoords.posY[1354]=-39.4522091784685;
starCoords.posX[1355]=159.725888490155;starCoords.posY[1355]=-36.7580118391703;
starCoords.posX[1356]=169.911869910324;starCoords.posY[1356]=-40.035274953972;
starCoords.posX[1357]=148.198084814968;starCoords.posY[1357]=-36.4113869688395;
starCoords.posX[1358]=152.491709193789;starCoords.posY[1358]=-41.7309442241198;
starCoords.posX[1359]=148.198084814968;starCoords.posY[1359]=-36.4113869688395;
starCoords.posX[1360]=144.726686117055;starCoords.posY[1360]=-37.9251003706855;
starCoords.posX[1361]=144.726686117055;starCoords.posY[1361]=-37.9251003706855;
starCoords.posX[1362]=148.35401213056;starCoords.posY[1362]=-41.2211357829546;
starCoords.posX[1363]=150.298317135753;starCoords.posY[1363]=-42.1430978392236;
starCoords.posX[1364]=148.35401213056;starCoords.posY[1364]=-41.2211357829546;
starCoords.posX[1365]=140.983354480191;starCoords.posY[1365]=-42.1957130188467;
starCoords.posX[1366]=150.298317135753;starCoords.posY[1366]=-42.1430978392236;
starCoords.posX[1367]=140.983354480191;starCoords.posY[1367]=-42.1957130188467;
starCoords.posX[1368]=135.066451326907;starCoords.posY[1368]=-42.1387247031783;
starCoords.posX[1369]=135.222708879365;starCoords.posY[1369]=-43.168584856278;
starCoords.posX[1370]=129.51262143028;starCoords.posY[1370]=-40.6785612086812;
starCoords.posX[1371]=126.068264281583;starCoords.posY[1371]=-41.1954892767786;
starCoords.posX[1372]=129.51262143028;starCoords.posY[1372]=-40.6785612086812;
starCoords.posX[1373]=126.068264281583;starCoords.posY[1373]=-41.1954892767786;
starCoords.posX[1374]=119.823865254572;starCoords.posY[1374]=-38.4209888239929;
starCoords.posX[1375]=119.823865254572;starCoords.posY[1375]=-38.4209888239929;
starCoords.posX[1376]=122.120718671605;starCoords.posY[1376]=-33.6531186047444;
starCoords.posX[1377]=129.4087012884;starCoords.posY[1377]=-36.2923500087341;
starCoords.posX[1378]=122.120718671605;starCoords.posY[1378]=-33.6531186047444;
starCoords.posX[1379]=119.823865254572;starCoords.posY[1379]=-38.4209888239929;
starCoords.posX[1380]=129.4087012884;starCoords.posY[1380]=-36.2923500087341;
starCoords.posX[1381]=126.068264281583;starCoords.posY[1381]=-41.1954892767786;
starCoords.posX[1382]=129.180242872796;starCoords.posY[1382]=-44.7204487109111;
starCoords.posX[1383]=129.180242872796;starCoords.posY[1383]=-44.7204487109111;
starCoords.posX[1384]=130.213323266458;starCoords.posY[1384]=-47.9067747769315;
starCoords.posX[1385]=131.769850587999;starCoords.posY[1385]=-52.131749734599;
starCoords.posX[1386]=130.213323266458;starCoords.posY[1386]=-47.9067747769315;
starCoords.posX[1387]=139.371101168669;starCoords.posY[1387]=-47.4252139478446;
starCoords.posX[1388]=131.769850587999;starCoords.posY[1388]=-52.131749734599;
starCoords.posX[1389]=131.769850587999;starCoords.posY[1389]=-52.131749734599;
starCoords.posX[1390]=119.823865254572;starCoords.posY[1390]=-38.4209888239929;
starCoords.posX[1391]=137.753347688651;starCoords.posY[1391]=-79.0808939556453;
starCoords.posX[1392]=114.579571581688;starCoords.posY[1392]=-78.7161380356527;
starCoords.posX[1393]=108.907874131901;starCoords.posY[1393]=-77.5333500520934;
starCoords.posX[1394]=114.579571581688;starCoords.posY[1394]=-78.7161380356527;
starCoords.posX[1395]=111.29254665122;starCoords.posY[1395]=-78.914974239918;
starCoords.posX[1396]=108.907874131901;starCoords.posY[1396]=-77.5333500520934;
starCoords.posX[1397]=111.29254665122;starCoords.posY[1397]=-78.914974239918;
starCoords.posX[1398]=114.579571581688;starCoords.posY[1398]=-78.7161380356527;
starCoords.posX[1399]=107.600630259072;starCoords.posY[1399]=-69.0425405321155;
starCoords.posX[1400]=121.018207454302;starCoords.posY[1400]=-63.4559021080715;
starCoords.posX[1401]=121.018207454302;starCoords.posY[1401]=-63.4559021080715;
starCoords.posX[1402]=125.617652692315;starCoords.posY[1402]=-66.3454788051872;
starCoords.posX[1403]=130.064727752944;starCoords.posY[1403]=-68.710969191062;
starCoords.posX[1404]=125.617652692315;starCoords.posY[1404]=-66.3454788051872;
starCoords.posX[1405]=107.600630259072;starCoords.posY[1405]=-69.0425405321155;
starCoords.posX[1406]=130.064727752944;starCoords.posY[1406]=-68.710969191062;
starCoords.posX[1407]=34.3959140837471;starCoords.posY[1407]=-77.3499041325352;
starCoords.posX[1408]=48.4962279183853;starCoords.posY[1408]=-81.8855710091744;
starCoords.posX[1409]=71.3588406636674;starCoords.posY[1409]=-84.4037031189584;
starCoords.posX[1410]=109.746032672534;starCoords.posY[1410]=-85.1639810655725;
starCoords.posX[1411]=142.891336331375;starCoords.posY[1411]=-83.7068322453076;
starCoords.posX[1412]=18.2714497001344;starCoords.posY[1412]=-81.3353830684714;
starCoords.posX[1413]=36.9896416382767;starCoords.posY[1413]=-84.9000804862733;
starCoords.posX[1414]=69.2884663475904;starCoords.posY[1414]=-86.4709581035412;
starCoords.posX[1415]=114.095456488672;starCoords.posY[1415]=-86.1353014523557;
starCoords.posX[1416]=142.891336331375;starCoords.posY[1416]=-83.7068322453076;
starCoords.posX[1417]=34.3959140837471;starCoords.posY[1417]=-77.3499041325352;
starCoords.posX[1418]=18.2714497001344;starCoords.posY[1418]=-81.3353830684714;
starCoords.posX[1419]=53.4163370484825;starCoords.posY[1419]=-56.706113760411;
starCoords.posX[1420]=38.2115254839458;starCoords.posY[1420]=-65.3279667396586;
starCoords.posX[1421]=48.5652992483678;starCoords.posY[1421]=-66.1710356378748;
starCoords.posX[1422]=38.2115254839458;starCoords.posY[1422]=-65.3279667396586;
starCoords.posX[1423]=48.5652992483678;starCoords.posY[1423]=-66.1710356378748;
starCoords.posX[1424]=57.6172881387115;starCoords.posY[1424]=-66.1560507742781;
starCoords.posX[1425]=53.4163370484825;starCoords.posY[1425]=-56.706113760411;
starCoords.posX[1426]=57.6172881387115;starCoords.posY[1426]=-66.1560507742781;
starCoords.posX[1427]=57.6172881387115;starCoords.posY[1427]=-66.1560507742781;
starCoords.posX[1428]=76.7436729820287;starCoords.posY[1428]=-62.1765059693059;
starCoords.posX[1429]=76.7436729820287;starCoords.posY[1429]=-62.1765059693059;
starCoords.posX[1430]=83.991924726223;starCoords.posY[1430]=-61.4888869337138;
starCoords.posX[1431]=87.6445360018485;starCoords.posY[1431]=-63.6666403093466;
starCoords.posX[1432]=83.991924726223;starCoords.posY[1432]=-61.4888869337138;
starCoords.posX[1433]=93.3515873100507;starCoords.posY[1433]=-64.7268109195116;
starCoords.posX[1434]=87.6445360018485;starCoords.posY[1434]=-63.6666403093466;
starCoords.posX[1435]=87.6445360018485;starCoords.posY[1435]=-63.6666403093466;
starCoords.posX[1436]=75.5378171041197;starCoords.posY[1436]=-67.2214205136169;
starCoords.posX[1437]=57.6172881387115;starCoords.posY[1437]=-66.1560507742781;
starCoords.posX[1438]=75.5378171041197;starCoords.posY[1438]=-67.2214205136169;
starCoords.posX[1439]=57.6172881387115;starCoords.posY[1439]=-66.1560507742781;
starCoords.posX[1440]=59.6034790525447;starCoords.posY[1440]=-72.8859451639955;
starCoords.posX[1441]=57.6172881387115;starCoords.posY[1441]=-66.1560507742781;
starCoords.posX[1442]=78.9866538917894;starCoords.posY[1442]=-71.4189128618514;
starCoords.posX[1443]=119.786916514927;starCoords.posY[1443]=-22.6459590987712;
starCoords.posX[1444]=118.513182626246;starCoords.posY[1444]=-19.8287564748749;
starCoords.posX[1445]=119.786916514927;starCoords.posY[1445]=-22.6459590987712;
starCoords.posX[1446]=120.154274900574;starCoords.posY[1446]=-26.1386259824029;
starCoords.posX[1447]=120.154274900574;starCoords.posY[1447]=-26.1386259824029;
starCoords.posX[1448]=120.643303840616;starCoords.posY[1448]=-29.238953326272;
starCoords.posX[1449]=119.786916514927;starCoords.posY[1449]=-22.6459590987712;
starCoords.posX[1450]=114.569523034329;starCoords.posY[1450]=-25.61310424914;
starCoords.posX[1451]=112.513602002632;starCoords.posY[1451]=-26.4507090877977;
starCoords.posX[1452]=114.569523034329;starCoords.posY[1452]=-25.61310424914;
starCoords.posX[1453]=112.513602002632;starCoords.posY[1453]=-26.4507090877977;
starCoords.posX[1454]=110.892833427912;starCoords.posY[1454]=-28.2334438989042;
starCoords.posX[1455]=107.314980323839;starCoords.posY[1455]=-34.3077893983205;
starCoords.posX[1456]=110.892833427912;starCoords.posY[1456]=-28.2334438989042;
starCoords.posX[1457]=107.314980323839;starCoords.posY[1457]=-34.3077893983205;
starCoords.posX[1458]=106.883776513681;starCoords.posY[1458]=-38.0615889836304;
starCoords.posX[1459]=106.883776513681;starCoords.posY[1459]=-38.0615889836304;
starCoords.posX[1460]=106.199277242289;starCoords.posY[1460]=-42.3749668995439;
starCoords.posX[1461]=101.804771679473;starCoords.posY[1461]=-43.2492206214043;
starCoords.posX[1462]=106.199277242289;starCoords.posY[1462]=-42.3749668995439;
starCoords.posX[1463]=95.512976401096;starCoords.posY[1463]=-43.0025707077843;
starCoords.posX[1464]=101.804771679473;starCoords.posY[1464]=-43.2492206214043;
starCoords.posX[1465]=95.512976401096;starCoords.posY[1465]=-43.0025707077843;
starCoords.posX[1466]=92.9507155362115;starCoords.posY[1466]=-40.1295703224221;
starCoords.posX[1467]=94.2265282383989;starCoords.posY[1467]=-39.0336376714616;
starCoords.posX[1468]=92.9507155362115;starCoords.posY[1468]=-40.1295703224221;
starCoords.posX[1469]=96.4491086210435;starCoords.posY[1469]=-37.1093558691888;
starCoords.posX[1470]=94.2265282383989;starCoords.posY[1470]=-39.0336376714616;
starCoords.posX[1471]=96.4491086210435;starCoords.posY[1471]=-37.1093558691888;
starCoords.posX[1472]=92.386676659926;starCoords.posY[1472]=-37.0453955040068;
starCoords.posX[1473]=96.8700796755401;starCoords.posY[1473]=-49.8820437599588;
starCoords.posX[1474]=98.4927495755702;starCoords.posY[1474]=-55.5371553698283;
starCoords.posX[1475]=96.8700796755401;starCoords.posY[1475]=-49.8820437599588;
starCoords.posX[1476]=104.929043449546;starCoords.posY[1476]=-53.1730601125818;
starCoords.posX[1477]=105.163139497316;starCoords.posY[1477]=-56.002958198577;
starCoords.posX[1478]=104.929043449546;starCoords.posY[1478]=-53.1730601125818;
starCoords.posX[1479]=105.163139497316;starCoords.posY[1479]=-56.002958198577;
starCoords.posX[1480]=107.364008876878;starCoords.posY[1480]=-59.055993943003;
starCoords.posX[1481]=97.027026097147;starCoords.posY[1481]=-60.6898917075837;
starCoords.posX[1482]=107.364008876878;starCoords.posY[1482]=-59.055993943003;
starCoords.posX[1483]=98.4668574055568;starCoords.posY[1483]=-56.3849772940971;
starCoords.posX[1484]=97.027026097147;starCoords.posY[1484]=-60.6898917075837;
starCoords.posX[1485]=98.4927495755702;starCoords.posY[1485]=-55.5371553698283;
starCoords.posX[1486]=98.4668574055568;starCoords.posY[1486]=-56.3849772940971;
starCoords.posX[1487]=96.8700796755401;starCoords.posY[1487]=-49.8820437599588;
starCoords.posX[1488]=88.1718687640337;starCoords.posY[1488]=-50.089995364067;
starCoords.posX[1489]=83.0944461342789;starCoords.posY[1489]=-45.9626698771184;
starCoords.posX[1490]=82.6246052714167;starCoords.posY[1490]=-49.0644049116532;
starCoords.posX[1491]=83.0944461342789;starCoords.posY[1491]=-45.9626698771184;
starCoords.posX[1492]=87.0302324645701;starCoords.posY[1492]=-45.9519625881042;
starCoords.posX[1493]=114.874636647939;starCoords.posY[1493]=-50.1760632530394;
starCoords.posX[1494]=113.042891723751;starCoords.posY[1494]=-47.5739177860756;
starCoords.posX[1495]=114.874636647939;starCoords.posY[1495]=-50.1760632530394;
starCoords.posX[1496]=119.034831189684;starCoords.posY[1496]=-49.253399758089;
starCoords.posX[1497]=119.034831189684;starCoords.posY[1497]=-49.253399758089;
starCoords.posX[1498]=118.222082637161;starCoords.posY[1498]=-45.1962810164142;
starCoords.posX[1499]=113.042891723751;starCoords.posY[1499]=-47.5739177860756;
starCoords.posX[1500]=118.222082637161;starCoords.posY[1500]=-45.1962810164142;
starCoords.posX[1501]=39.8792775190927;starCoords.posY[1501]=-53.412084440861;
starCoords.posX[1502]=30.3732757111853;starCoords.posY[1502]=-54.9505768307195;
starCoords.posX[1503]=50.4554304015927;starCoords.posY[1503]=-47.2605350088842;
starCoords.posX[1504]=39.8792775190927;starCoords.posY[1504]=-53.412084440861;
starCoords.posX[1505]=50.4554304015927;starCoords.posY[1505]=-47.2605350088842;
starCoords.posX[1506]=48.8315702502036;starCoords.posY[1506]=-51.8889527449061;
starCoords.posX[1507]=46.1281783247117;starCoords.posY[1507]=-58.4204437486447;
starCoords.posX[1508]=48.8315702502036;starCoords.posY[1508]=-51.8889527449061;
starCoords.posX[1509]=72.4836829041253;starCoords.posY[1509]=-37.8898719191051;
starCoords.posX[1510]=73.248089455759;starCoords.posY[1510]=-37.0494553341805;
starCoords.posX[1511]=72.3425222414612;starCoords.posY[1511]=-39.3260799419669;
starCoords.posX[1512]=72.4836829041253;starCoords.posY[1512]=-37.8898719191051;
starCoords.posX[1513]=72.3425222414612;starCoords.posY[1513]=-39.3260799419669;
starCoords.posX[1514]=72.7608171375745;starCoords.posY[1514]=-40.4823267329041;
starCoords.posX[1515]=72.7608171375745;starCoords.posY[1515]=-40.4823267329041;
starCoords.posX[1516]=81.4682880911582;starCoords.posY[1516]=-42.3053479373433;
starCoords.posX[1517]=15.4679133947879;starCoords.posY[1517]=-29.5752974665315;
starCoords.posX[1518]=19.7155791589726;starCoords.posY[1518]=-26.9977732923031;
starCoords.posX[1519]=15.4679133947879;starCoords.posY[1519]=-29.5752974665315;
starCoords.posX[1520]=15.8922834112121;starCoords.posY[1520]=-32.4927875896073;
starCoords.posX[1521]=15.8922834112121;starCoords.posY[1521]=-32.4927875896073;
starCoords.posX[1522]=16.7473880901084;starCoords.posY[1522]=-32.8288684579301;
starCoords.posX[1523]=21.9999654289145;starCoords.posY[1523]=-32.3009237231548;
starCoords.posX[1524]=16.7473880901084;starCoords.posY[1524]=-32.8288684579301;
starCoords.posX[1525]=21.9999654289145;starCoords.posY[1525]=-32.3009237231548;
starCoords.posX[1526]=27.7773059421746;starCoords.posY[1526]=-32.9453906837951;
starCoords.posX[1527]=19.7155791589726;starCoords.posY[1527]=-26.9977732923031;
starCoords.posX[1528]=27.7773059421746;starCoords.posY[1528]=-32.9453906837951;
starCoords.posX[1529]=33.6336453277123;starCoords.posY[1529]=-32.985250678616;
starCoords.posX[1530]=27.7773059421746;starCoords.posY[1530]=-32.9453906837951;
starCoords.posX[1531]=33.6336453277123;starCoords.posY[1531]=-32.985250678616;
starCoords.posX[1532]=32.9380569336272;starCoords.posY[1532]=-30.8574478721583;
starCoords.posX[1533]=27.7773059421746;starCoords.posY[1533]=-32.9453906837951;
starCoords.posX[1534]=32.9380569336272;starCoords.posY[1534]=-30.8574478721583;
starCoords.posX[1535]=118.513182626246;starCoords.posY[1535]=-19.8287564748749;
starCoords.posX[1536]=116.87364425734;starCoords.posY[1536]=-19.48277771511;
}

initializeMiniStars();

function drawMiniStars(){
	for (var i = 0; i<starCoords.posX.length; i++){
		c.beginPath();
		c.arc((starCoords.posX[i]*30)-(playerVar.posX/10), (starCoords.posY[i]*30)-(playerVar.posY/10), 1, 0, Math.PI*2);
		c.closePath();
		c.fillStyle="#FFF";
		c.fill();
	
	}
}

function vignette(){
	
	  // Create gradient
      grd = c.createRadialGradient(midX, midY, 0.000, midX, midY, 500); 
      // Add colors
      grd.addColorStop(0.500, 'rgba(0, 0, 0, 0.000)');
      grd.addColorStop(1.000, 'rgba(0, 0, 0, 1.000)');
	  c.fillStyle = grd;
	  c.rect(0,0, c.canvas.width/mapScale,c.canvas.height/mapScale);
	  c.fill();
}


//Declare asteroid area objects:
var asteroid= {
	id: [],
	type:[],
	posX : [],
	posY : [],
	dispX: [],
	dispY: [],
	rotateX: [],
	rotateY: [],
	velX : [],
	velY : [],
	accX: [],
	accY:[],
	f: [],
	fX: [],
	fY: [],
	mass : [],
	radius: [],
	stat: [],
	collision: [],
	timer: [],
	}

var star= {
	id: [],
	type:[],
	posX : [],
	posY : [],
	dispX: [],
	dispY: [],
	rotateX: [],
	rotateY: [],
	velX : [],
	velY : [],
	accX: [],
	accY:[],
	f: [],
	fX: [],
	fY: [],
	mass : [],
	radius: [],
	stat: [],
	collision: [],
	timer: [],
	}
                                                                                                          
var torp= {                                                                                               
	id: [],                                                                                               
	type:[],                                                                                              
	posX : [],                                                                                            
	posY : [],                                                                                            
	dispX: [],                                                                                            
	dispY: [],                                                                                            
	rotateX: [],                                                                                          
	rotateY: [],                                                                                          
	velX : [],                                                                                            
	velY : [],                                                                                            
	accX: [],                                                                                             
	accY:[],                                                                                              
	f: [],                                                                                                
	fX: [],                                                                                               
	fY: [],                                                                                               
	mass : [],                                                                                            
	radius: [],                                                                                           
	stat: [],                                                                                             
	collision: [],                                                                                        
	timer: [],
	}

function startingTorps(){
torp.id[0]=0;
torp.type[0]=0;
torp.posX [0]=0;
torp.posY [0]=0;
torp.dispX[0]=0;
torp.dispY[0]=0;
torp.rotateX[0]=0;
torp.rotateY[0]=0;
torp.velX [0]=0;
torp.velY [0]=0;
torp.accX[0]=0;
torp.accY[0]=0;
torp.f[0]=0;
torp.fX[0]=0;
torp.fY[0]=0;
torp.mass [0]=10;
torp.radius[0]=0;
torp.stat[0]=0;
torp.collision[0]=0;
torp.timer[0]=0;
}

function drawTorps(){
	var grdTorp;
	
	for (var  i = 0; i<torp.id.length-1; i++){

		c.beginPath();
		c.arc(torp.dispX[i], torp.dispY[i], 10, 0, Math.PI*2);
		c.closePath();
		c.fillStyle="#fff";
		/* grdTorp = c.createRadialGradient(torps.dispX[i], torps.dispY[i], 0.000,100, 100, 100);		
		grdTorp.addColorStop(0.000, 'rgba(255, 255, 255, 1.000)');
		grdTorp.addColorStop(1.000, 'rgba(200, 200, 200, 0');
		c.fillStyle = grdTorp; */
		c.fill();
	}
}

function initTorp(){
	torp.id[torp.id.length]=torp.id.length;
	torp.posX[torp.id.length]= playerVar.posX+playerVar.velX;
	torp.posY[torp.id.length]= playerVar.posY-playerVar.velY;	
	torp.accX[torp.id.length]=0;// playerVar.accX;
	torp.accY[torp.id.length]=0;// playerVar.accY;
	
	
	torp.velX[torp.id.length]= playerVar.velX;
	torp.velY[torp.id.length]= -playerVar.velY;
	
	torp.fX[torp.id.length]=0;
	torp.fY[torp.id.length]=0;
	
	torp.mass[torp.id.length]= 10;
	torpDisplayPositionHelper();
	drawTorps();
}

function timerTorp(){
}

function torpInc(){
	for (var i = 0; i<torp.id.length; i++){
		torp.posX[i]=torp.posX[i]+torp.velX[i];
		torp.posY[i]=torp.posY[i]+torp.velY[i];
		}
	}

function torpVelocityInc(){
		for (var i = 0; i<torp.id.length; i++){
			if (torp.velX[i]>100){
				torp.velX[i]=100;
			}
			if (torp.velY[i]>100){
				torp.velY[i]=100;
			}
		
	
		else{
		torp.velX[i] = torp.velX[i] +torp.accX[i];
	    torp.velY[i] = torp.velY[i] +torp.accY[i];
		}
	}
}

function torpAccelerationInc(){
	
	var torpAzCalc;
	
	for (var i = 0; i<torp.id.length; i++){
		torpAzCalc = azCalc(mouseX, mouseY, torp.dispX[i], torp.dispY[i]);
		torp.fX[torp.id.length]=+deps(torpAzCalc,1000);
		torp.fY[torp.id.length]=-lats(torpAzCalc,1000);
		
		torp.accX[i] = (torp.fX[i]/torp.mass[i]);
		torp.accY[i] = (torp.fY[i]/torp.mass[i]);
		
		for (var i = 0; i<torp.id.length; i++){
			if (torp.velX[i]>100){
				torp.velX[i]=100;
			}
			if (torp.velY[i]>100){
				torp.velY[i]=100;
			}
		}
		}
}

function torpDisplayPositionHelper(){
	for (var i = 0; i<torp.id.length; i++){
		torp.dispX[i] = (torp.posX[i]*mapScale)-(playerVar.posX*mapScale)+midX;
		torp.dispY[i] = (torp.posY[i]*mapScale)-(playerVar.posY*mapScale)+midY;
		}
	}
		
var planet= {
	parentStar:[],
	id: [],
	type:[],
	posX : [],
	posY : [],
	dispX: [],
	dispY: [],
	rotateX: [],
	rotateY: [],
	velX : [],
	velY : [],
	accX: [],
	accY:[],
	f: [],
	fX: [],
	fY: [],
	mass : [],
	radius: [],
	stat: [],
	collision: [],
	timer: [],
	}

function asteroidSplice(i){
	asteroid.id.splice(i,1);
	asteroid.type.splice(i,1);
	asteroid.posX.splice(i,1);
	asteroid.posY.splice(i,1);
	asteroid.dispX.splice(i,1);
	asteroid.dispY.splice(i,1);
	asteroid.rotateX.splice(i,1);
	asteroid.rotateY.splice(i,1);
	asteroid.velX.splice(i,1);
	asteroid.velY.splice(i,1);
	asteroid.accX.splice(i,1);
	asteroid.accY.splice(i,1);
	asteroid.f.splice(i,1);
	asteroid.fX.splice(i,1);
	asteroid.fY.splice(i,1);
	asteroid.mass.splice(i,1);
	asteroid.radius.splice(i,1);
	asteroid.stat.splice(i,1);
	asteroid.collision.splice(i,1);
	asteroid.timer.splice(i,1);
	
	}

function collisionDetection(){
	var v1, v2, m1, m2, moveAng1, moveAng2, contAng, v1X, v1Y, v2X, v2Y;
	var blackholeid;
	var blackholestatus = false;
	for (i = 0; i<asteroid.id.length; i++){

		for (j = 0; j<asteroid.id.length; j++){	
				if(i==j){
				}
				else{					
					var dist = inverse(asteroid.posX[i], asteroid.posY[i], asteroid.posX[j], asteroid.posY[j]);
					var az = azCalc(asteroid.posX[i], asteroid.posY[i], asteroid.posX[j], asteroid.posY[j]);
					
					m1= asteroid.mass[i];
					m2= asteroid.mass[j];
					v1 = Math.sqrt((Math.pow(asteroid.velX[i], 2))+(Math.pow(asteroid.velY[i], 2)));
					v2 = Math.sqrt((Math.pow(asteroid.velX[j], 2))+(Math.pow(asteroid.velY[j], 2)));
				
					if (dist<=asteroid.radius[i]+asteroid.radius[j]){
						asteroid.collision[i] = true; asteroid.collision[j]= true;
						moveAng1 = mathAng(asteroid.posX[i],asteroid.posY[i],asteroid.posX[i]+asteroid.velX[i],asteroid.posY[i]+asteroid.velY[i]);
						moveAng2 = mathAng(asteroid.posX[j],asteroid.posY[j],asteroid.posX[j]+asteroid.velX[j],asteroid.posY[j]+asteroid.velY[j]);
						contAng = (mathAng(asteroid.posX[i],asteroid.posY[i], asteroid.posX[j],asteroid.posY[j]));
						v1X =((((v1*(Math.cos(moveAng1-contAng))*(m1-m2))+(2*m2*v2*Math.cos(moveAng2-contAng)))/(m1+m2))*(Math.cos(contAng)))+(v1*(Math.sin(moveAng1-contAng))*(Math.sin(contAng)));
						v1Y =((((v1*(Math.cos(moveAng1-contAng))*(m1-m2))+(2*m2*v2*Math.cos(moveAng2-contAng)))/(m1+m2))*(Math.sin(contAng)))+(v1*(Math.sin(moveAng1-contAng))*(Math.cos(contAng)));
						v2X =((((v2*(Math.cos(moveAng2-contAng))*(m1-m2))+(2*m1*v1*Math.cos(moveAng1-contAng)))/(m2+m1))*(Math.cos(contAng)))+(v2*(Math.sin(moveAng2-contAng))*(Math.sin(contAng)));
						v2Y =((((v2*(Math.cos(moveAng2-contAng))*(m1-m2))+(2*m1*v1*Math.cos(moveAng1-contAng)))/(m2+m1))*(Math.sin(contAng)))+(v2*(Math.sin(moveAng2-contAng))*(Math.cos(contAng)));
						asteroid.accX[i] = 0;
						asteroid.accY[i] = 0;
						asteroid.accX[j] = 0;
						asteroid.accY[j] = 0;	
	
						
						asteroid.velX[i] = v1X*0.1;
						asteroid.velY[i] = v1Y*0.1;
						asteroid.velX[j] = v2X*0.1;
						asteroid.velY[j] = v2Y*0.1;		
						}	

						
 					if(dist+1<asteroid.radius[i]+asteroid.radius[j]){
						asteroid.posX[j] = asteroid.posX[i]+deps(az, asteroid.radius[i]+asteroid.radius[j]);
						asteroid.posY[j] = asteroid.posY[i]-lats(az, asteroid.radius[i]+asteroid.radius[j]);		 
				}		
			}
			
			if(asteroid.radius[i]>299){
				if(i==j){
						}
				else{	
					if(dist-700<asteroid.radius[i]+asteroid.radius[j]){
						console.log("touch");
						c.fillStyle = "#FFF";
						c.beginPath();
						c.arc(asteroid.dispX[i], asteroid.dispY[i], asteroid.radius[i]*mapScale, 0, Math.PI*2);
						c.closePath();
						c.fill();
						asteroidSplice(j);
					}
				}
			}	
		}	
	}
}


function collisionDetectionPlayer(){
}
	
//Velocity increment:
function velocityInc(){
	for (i = 0; i<asteroid.id.length; i++){
		asteroid.velX[i] = asteroid.velX[i] +asteroid.accX[i];
	    asteroid.velY[i] = asteroid.velY[i] +asteroid.accY[i];
	}
}

function velocityIncPlayer(){
		//if(loadScreenCounter==false){
			if( playerVar.velX >15){
				playerVar.velX = 15;
			} 
			if( playerVar.velY >15){
				playerVar.velY = 15;
			}			
		else{
		playerVar.velX = playerVar.velX + playerVar.accX;
	    playerVar.velY = playerVar.velY + playerVar.accY;
		}
		playerVar.direction = azCalc(0,0, playerVar.velX, playerVar.velY);
}

//Calculate acceleration:
function accelerationInc(){
	for (i = 0; i<asteroid.id.length; i++){
		asteroid.accX[i] = (asteroid.fX[i]/asteroid.mass[i]);
		asteroid.accY[i] = (asteroid.fY[i]/asteroid.mass[i]);
		}
}

function accelerationIncPlayer(){
		playerVar.accX = playerVar.fX/playerVar.mass;
	    playerVar.accY = playerVar.fY/playerVar.mass;
}

function playerThrust(){
		playerVar.fX = lats(playerVar.thrustAz-90, playerVar.thrust);
		playerVar.fY = deps(playerVar.thrustAz+90, playerVar.thrust);
		
}

//Increment locations of asteroid objects by velX/velY
function asteroidInc(){
	for (i = 0; i<asteroid.id.length; i++){
		if(asteroid.stat[i]==1){
			asteroid.timer[i] += 0.025; 
			}
		asteroid.posX[i]=asteroid.posX[i]+asteroid.velX[i];
		asteroid.posY[i]=asteroid.posY[i]+asteroid.velY[i];
		}
	}
	
function playerInc(){
	playerVar.posX = playerVar.posX + playerVar.velX;
	playerVar.posY = playerVar.posY - playerVar.velY;
}

function gravityCalcAsteroid(){
	var sumForceX;
	var	sumForceY;
	var dist, az, force, forceX, forceY;
	
	for (i = 0; i<asteroid.id.length; i++){
		sumForceX = 0;
		sumForceY = 0;
		
		for (j = 0; j<asteroid.id.length; j++){		
			if (i==j){
			}
			
			else{	
			
			dist = inverse(asteroid.posX[i], asteroid.posY[i], asteroid.posX[j], asteroid.posY[j]);
			az = azCalc(asteroid.posX[i], asteroid.posY[i], asteroid.posX[j], asteroid.posY[j]);
			force = (asteroid.mass[i]*asteroid.mass[j])/(Math.pow(dist,2));
			forceX = deps(az, force);
			forceY = lats(az, force);
			
			sumForceX += forceX;
			sumForceY += forceY;			
			}
			
			asteroid.fX[i] = sumForceX;
			asteroid.fY[i] = sumForceY;
			}
			
		}
	}

function gravityCalcstar(){
	var sumForceX;
	var	sumForceY;
	var dist, az, force, forceX, forceY;
	sumForceX = 0;
	sumForceY = 0;
	
	for (i = 0; i<star.id.length; i++){		
		dist = inverse(star.posX[i], star.posY[i], playerVar.posX, playerVar.posY);
		az = azCalc(star.posX[i], star.posY[i], playerVar.posX, playerVar.posY);
		force = (star.mass[i]* playerVar.mass)/(Math.pow(dist,2));
		forceX = deps(az, force);
		forceY = lats(az, force);	
		sumForceX += forceX;
		sumForceY += forceY;	
		}		

	for (i = 0; i<asteroid.id.length; i++){
		if(asteroid.radius[i]>299){
			dist = inverse(asteroid.posX[i], asteroid.posY[i], playerVar.posX, playerVar.posY);
			az = azCalc(asteroid.posX[i], asteroid.posY[i], playerVar.posX, playerVar.posY);
			force = (asteroid.mass[i]*5* playerVar.mass)/(Math.pow(dist,2));
			forceX = deps(az, force);
			forceY = lats(az, force);	
			sumForceX += forceX;
			sumForceY += forceY;				
			}
		}


		
		playerVar.fX -= sumForceX;
		playerVar.fY -= sumForceY;
			
	}


//Calculate display positon based on player position and scale factor
function asteroidDisplayPositionHelper(){
	for (i = 0; i<asteroid.id.length; i++){
		asteroid.dispX[i] = (asteroid.posX[i]*mapScale)-(playerVar.posX*mapScale)+midX;
		asteroid.dispY[i] = (asteroid.posY[i]*mapScale)-(playerVar.posY*mapScale)+midY;
		}
	}
		
//Declare Player Properties 
var playerVar = {
	name:"Player A",
	posX: 5000,
	posY: 5000,
	az: 0,
	direction: 0,
	thrustAz: 0,
	velX : 0,
	velY : 0,
	accX: 0,
	accY: 0,
	thrust: 0,
	fX: 0,
	fY: 0,
	mass : 200,
	collision: false,
	timer: 0,
	heat: 50,
	denergy: 900,
	eenergy: 300,
	charging: false,
	laserStatus: false,
	dead: false
	}
	
var radar ={
	active: -1,
	harvester: -1,
	filler: -1
}

var redOutStatus = false;
var redOutTimer = 0;

function redOut(){
	
	var grdredout = c.createRadialGradient(midX, midY, 0, midX, midY, 5000);
		grdredout.addColorStop(0.0, 'rgba(256,0,0,' + redOutTimer*4 +')');
		grdredout.addColorStop(1.000,  'rgba(0,0,0, 1');
		
	if (redOutStatus==true){
		thrustSound.stop();
		burnerSound.stop();
		harvesterSound.stop();
		radarSound.stop();
		alertSound.stop();
		alarmSound.stop(); 
		laserSound.stop(); 

		deathSound.play();
		
		redOutTimer +=0.025;
		c.fillStyle = grdredout;
		c.fillRect(0,0,w,h)
		
		if (redOutTimer>1){
			c.textAlign="center";
			c.fillStyle="#FFFF00";
			c.font = "48px Audiowide";
			c.fillText("TEMPERATURE CRITICAL", midX, midY-36);

		if (redOutTimer>2){
			c.font = "24px Audiowide";
			c.fillText("CONTACT LOST", midX, midY);
			}
		if (redOutTimer>5){
			redOutStatus = false;
			loadScreenState = true;
			lst =0;
			playerVar.velX =0;
			playerVar.velY-10;
			}	
			
		grdredout2 = c.createRadialGradient(0+t*20, midY, 0, 0+t*20, midY, 300);
		grdredout2.addColorStop(0.0, 'rgba(256,0,0,' + 0.5 +')');
		grdredout2.addColorStop(1.000,  'rgba(256,0,0, 0');			
		c.fillStyle = grdredout2;
		c.fillRect(0,0,w,h);
		}
		
	}		
}




var whiteOutStatus = false;
var whiteOutTimer = 0;

function whiteOut(){
	
	var grdWhiteout = c.createRadialGradient(midX, midY, 0, midX, midY, 5000);
		grdWhiteout.addColorStop(0.0, 'rgba(256,256,256,' + whiteOutTimer*4 +')');
		grdWhiteout.addColorStop(1.000,  'rgba(0,0,0, 1');
		
	if (whiteOutStatus==true){
		
		thrustSoundStat=false;	
		thrustSound.stop();
		burnerSound.stop();
		harvesterSound.stop();
		radarSound.stop();
		alertSound.stop();
		alarmSound.stop(); 
		laserSound.stop(); 		
		deathSound.play();
		
		
		playerVar.velX=0;
		playerVar.velY=0;
		whiteOutTimer +=0.025;
		c.fillStyle = grdWhiteout;
		c.fillRect(0,0,w,h)
		
		deathSound.play();
		
		
		if (whiteOutTimer>1){
			c.textAlign="center";
			c.fillStyle="#000";
			c.font = "48px Audiowide";
			c.fillText("STARFALLEN", midX, midY-36);

		if (whiteOutTimer>2){
			c.font = "24px Audiowide";
			c.fillText("CONTACT LOST", midX, midY);
			}
		if (whiteOutTimer>5){
			whiteOutStatus = false;
			loadScreenState = true;
			lst =0;
			playerVar.velX =0;
			playerVar.velY-10;
			}	
			
		grdWhiteout2 = c.createRadialGradient(0+t*20, midY, 0, 0+t*20, midY, 300);
		grdWhiteout2.addColorStop(0.0, 'rgba(256,256,256,' + 0.5 +')');
		grdWhiteout2.addColorStop(1.000,  'rgba(256,256,256, 0');			
		c.fillStyle = grdWhiteout2;
		c.fillRect(0,0,w,h);
		}
		
	}		
}
	

var blackOutStatus = false;
var blackOutTimer = 0;

function blackOut(){
	
	var grdblackout = c.createRadialGradient(midX, midY, 0, midX, midY, 5000);
		grdblackout.addColorStop(0.0, 'rgba(0,0,0,' + blackOutTimer +')');
		grdblackout.addColorStop(1.000,  'rgba(0,0,0, 1');
		
	if (blackOutStatus==true){
		thrustSoundStat=false;	
		thrustSound.stop();
		burnerSound.stop();
		harvesterSound.stop();
		radarSound.stop();
		alertSound.stop();
		alarmSound.stop(); 
		laserSound.stop(); 		
		deathSound.play();
		
		
		playerVar.velX=0;
		playerVar.velY=0;
		blackOutTimer +=0.025;
		c.fillStyle = grdblackout;
		c.fillRect(0,0,w,h)
		
		if (blackOutTimer>0.5){
			c.textAlign="center";
			c.fillStyle="#FFF";
			c.font = "48px Audiowide";
			c.fillText("STRUCTRURAL COLLAPSE", midX, midY-36);

		if (blackOutTimer>1){
			c.font = "24px Audiowide";
			c.fillText("CONTACT LOST", midX, midY);
			}
		if (blackOutTimer>5){
			blackOutStatus = false;
			loadScreenState = true;
			lst =0;
			playerVar.velX =0;
			playerVar.velY-10;
			}	
			
		grdblackout2 = c.createRadialGradient(0+t*20, midY, 0, 0+t*20, midY, 300);
		grdblackout2.addColorStop(0.0, 'rgba(0,0,0,' + 0.5 +')');
		grdblackout2.addColorStop(1.000,  'rgba(0,0,0, 0');			
		c.fillStyle = grdblackout2;
		c.fillRect(0,0,w,h);
		}
		
	}		
}


function drawLaser(){
	var grdLaser, grdLaser2;
	
	grdLaser = c.createRadialGradient((midX-lats(mouseAz+90, 40*mapScale)), (midY-deps(mouseAz+90, 40*mapScale)), 0, (midX-lats(mouseAz+90, 40*mapScale)), (midY-deps(mouseAz+90,40*mapScale)), 30); 
	grdLaser.addColorStop(0.500, 'rgba(256,256,256, 1.000');
	grdLaser.addColorStop(1.000,  'rgba(0,0,0, 0.000');
	
	
	if(playerVar.laserStatus==true && playerVar.denergy>0){
		playerVar.denergy-=1.05;
		playerVar.heat+=1.5;
		laserSound.play();
		
		c.strokeStyle="#FFF";
		c.lineWidth=1; 
		
		for(var i = 0; i<360; i+=45){
			c.strokeStyle="#FFF";
			c.beginPath();
			c.moveTo(midX-lats(mouseAz+90, 50*mapScale)-lats(mouseAz+90+(t*100)+i, 10*mapScale), midY-deps(mouseAz+90, 50*mapScale)-deps(mouseAz-90+(t*100)+i, 10*mapScale));
			c.lineTo(mouseX, mouseY);
			c.stroke();	
			
			c.beginPath();
			c.moveTo(midX-lats(mouseAz+90, 50*mapScale)-lats(mouseAz+90+(-t*100)+i, 10*mapScale), midY-deps(mouseAz+90,50*mapScale)-deps(mouseAz-90+(-t*100)+i, 10*mapScale));
			c.lineTo(mouseX, mouseY);
			c.stroke();		
			
			c.beginPath();
			c.moveTo(midX-lats(mouseAz+80, 60*mapScale)-lats(mouseAz+90+(-t*100)+i, 10*mapScale), midY-deps(mouseAz+80, 60*mapScale)-deps(mouseAz-90+(-t*100)+i, 10*mapScale));
			c.lineTo(mouseX, mouseY);
			c.stroke();
			
			c.beginPath();
			c.moveTo(midX-lats(mouseAz+100, 60*mapScale)-lats(mouseAz+90+(t*100)+i, 10*mapScale), midY-deps(mouseAz+100, 60*mapScale)-deps(mouseAz-90+(t*100)+i, 10*mapScale));
			c.lineTo(mouseX, mouseY);
			c.stroke();		
			}
		
		c.fillStyle = grdLaser;
		c.beginPath();
		c.arc(midX-lats(mouseAz+90, 60*mapScale), midY-deps(mouseAz+90, 60*mapScale), 20*mapScale, 0, Math.PI*2);
		c.closePath();
		c.fill();
		
		c.beginPath();
		c.arc(midX-lats(mouseAz+ 100, 60*mapScale), midY-deps(mouseAz+100, 60*mapScale), 10*mapScale, 0, Math.PI*2);
		c.closePath();
		c.fill();
		
		c.beginPath();
		c.arc(midX-lats(mouseAz+ 80, 60*mapScale), midY-deps(mouseAz+80, 60*mapScale), 10*mapScale, 0, Math.PI*2);
		c.closePath();
		c.fill();
		
		grdLaser = c.createRadialGradient(midX-lats(mouseAz+90, 20*mapScale), midY-deps(mouseAz+90, 20*mapScale),0, midX-lats(mouseAz+ 90, 40*mapScale), midY-deps(mouseAz+90, 40*mapScale), 20*mapScale); 
		grdLaser.addColorStop(0.300, 'rgba(256,256,256, 1.000');
		grdLaser.addColorStop(1.000,  'rgba(0,0,0,  0.000');
		c.fillStyle =grdLaser;	
		c.beginPath();
		c.arc(midX-lats(mouseAz+ 90, 20*mapScale), midY-deps(mouseAz+90, 20*mapScale), 20*mapScale, 0, Math.PI*2);
		c.closePath();
		c.fill();
		
		grdLaser = c.createRadialGradient(midX-lats(mouseAz+90, 50*mapScale), midY-deps(mouseAz+90, 50*mapScale),0, midX-lats(mouseAz+ 90, 70*mapScale), midY-deps(mouseAz+90, 70*mapScale), 30*mapScale); 
		grdLaser.addColorStop(0.300, 'rgba(256,256,256, 1.000');
		grdLaser.addColorStop(1.000,  'rgba(0,0,0,  0.000');
		c.fillStyle =grdLaser;	
		
		c.beginPath();
		c.arc(midX-lats(mouseAz+ 90, 60*mapScale), midY-deps(mouseAz+90, 60*mapScale), 60*mapScale, 0, Math.PI*2);
		c.closePath();
		c.fill();
	
		grdLaser = c.createRadialGradient(mouseX, mouseY,0, mouseX, mouseY, 4*mapScale	); 
		grdLaser.addColorStop(0.300, 'rgba(256,256,256, 1.000');
		grdLaser.addColorStop(1.000,  'rgba(0,0,0,  0.000');
		c.fillStyle =grdLaser;
		c.beginPath();
		c.arc(mouseX, mouseY,4*mapScale,0,Math.PI*2);
		c.closePath();
		c.fill();
		
	}
	else{
		laserSound.stop();
		}

}

//*********//
//Cursor Draw:
function drawCursor(){
	function setTarget(){}
	c.strokeStyle = "#00FF00";
	//If space is down, laser is firing, do not draw cursor:
	
	if(spaceDown == false){
	//If mouse is over other object:
	if(mouseDown == true){
		for(i = 0; i<asteroid.id.length; i++){
			if (inverse(asteroid.dispX[i],asteroid.dispY[i],mouseX,mouseY)<50){
				asteroid.stat[i]=1;
				}
			else{
				radar.harvester=-1;
				radar.filler=-1;
				asteroid.stat[i]=-1;
				}
			}	
		}	
	//If mouse is over player:
	if ((inverse(this.midX,this.midY,mouseX,mouseY))<50){
		c.strokeStyle = "#00FFFF";
		c.beginPath();
		c.arc(this.midX, this.midY, (Math.abs(Math.sin((t)))*30)+30, 0, Math.PI*2);
		c.closePath();
		c.stroke();
		}
	
	if(playerVar.laserStatus==true){
		c.strokeStyle = "#FF000";
	}
		
	//Neutral mouse state (not over player or other object):
	//Mouse circles:
	c.beginPath();
	c.arc(mouseX, mouseY, 10, 0, Math.PI*2);
	c.closePath();
	c.stroke();
	c.beginPath();
	c.arc(mouseX, mouseY, 1, 0, Math.PI*2);
	c.closePath();
	c.stroke();
	}
	}
//End Cursor Draw
//*********//

//Harvest energy compute/draw animation
function harvestEnergy(){
	playerVar.heat-=1;
		if(playerVar.heat>300){
			playerVar.heat=300;
			redOutStatus = true;
		}
		if(playerVar.heat>250){
			alarmSound.play();
		}
		
		if(playerVar.heat<0){
			playerVar.heat=0;
		}
	
		if(playerVar.eenergy>300){
			playerVar.eenergy=300;
		}
		if(playerVar.eenergy<0){
			playerVar.eenergy=0;
		}
		
		if(playerVar.denergy>900){
			playerVar.denergy=900;
		}
		if(playerVar.denergy<0){
			playerVar.denergy=0;
			radar.harvester=-1;
			radar.filler=-1;
		}
		
		
		
		if(playerVar.eenergy<1){
			radar.active =-1;
			radar.harvester=-1;
			radar.filler=-1;
			alertSound.stop();
		}
		if(playerVar.eenergy>50){
			alertSound.stop();
		}
		else{
			if(blackOutStatus==false && whiteOutStatus==false && redOutStatus==false){
			alertSound.play();
			}
		}
			
		var closestDist = 551;
		
		
		for (i = 0; i<star.id.length; i++){
			var distStar = inverse(midX, midY, star.dispX[i], star.dispY[i]);
			if (distStar<550){
				playerVar.eenergy+=0.5;
				closestDist = distStar
				}
				
			if (distStar<700){
				playerVar.heat+=1.1;
			}	
		}
		
		if(closestDist<200*mapScale){
			whiteOutStatus = true;	
		}
		
		if(closestDist<550*mapScale){
			playerVar.charging= true;	
		}
		else{
			playerVar.charging= false;
		}
			
		if (radar.active == 1 && radar.harvester==1){
			playerVar.heat+=0.2;
			for(var i = 0; i<asteroid.id.length; i++){
			var perpAng = azCalc(midX, midY,asteroid.dispX[i], asteroid.dispY[i]);
			var distRadar = inverse(midX, midY, asteroid.dispX[i], asteroid.dispY[i]);
				if(distRadar<200*mapScale && asteroid.stat[i] == 1){
					if (asteroid.radius[i]<5){
						radar.harvester=-1;
						harvesterSound.stop();
					}
					else{
					playerVar.denergy+=1.1;
					harvesterSound.play();
					asteroid.radius[i]-=0.5;
					asteroid.mass[i]-=10;
					c.strokeStyle="#00FFFF";
					
					c.beginPath();
					c.moveTo(midX, midY);
					c.lineTo(asteroid.dispX[i]+lats(perpAng+t*200,asteroid.radius[i])*mapScale, asteroid.dispY[i]+deps(perpAng+t*200,asteroid.radius[i])*mapScale);
					c.closePath();
					c.stroke();
					
					c.beginPath();
					c.moveTo(midX, midY);
					c.lineTo(asteroid.dispX[i]+lats(perpAng+t*400,asteroid.radius[i])*mapScale, asteroid.dispY[i]+deps(perpAng+t*400,asteroid.radius[i])*mapScale);
					c.closePath();
					c.stroke();
					
					c.beginPath();
					c.moveTo(midX, midY);
					c.lineTo(asteroid.dispX[i]+lats(perpAng-t*500,asteroid.radius[i])*mapScale, asteroid.dispY[i]+deps(perpAng-t*500,asteroid.radius[i])*mapScale);
					c.closePath();
					
					c.beginPath();
					c.moveTo(midX, midY);
					c.lineTo(asteroid.dispX[i]+lats(perpAng-t*300,asteroid.radius[i])*mapScale, asteroid.dispY[i]+deps(perpAng-t*300,asteroid.radius[i])*mapScale);
					c.closePath();	
					c.stroke();
					}
					
				if(distRadar>200*mapScale && asteroid.stat[i] == 1){	
					radar.harvester=-1;
					}
				}
					
			}
		}	
		if (radar.active == 1 && radar.filler==1){
			playerVar.heat+=0.2;
			for(var i = 0; i<asteroid.id.length; i++){
			var perpAng = azCalc(midX, midY,asteroid.dispX[i], asteroid.dispY[i]);
			var distRadar = inverse(midX, midY, asteroid.dispX[i], asteroid.dispY[i]);
				if(distRadar<500*mapScale && asteroid.stat[i] == 1){
					if (asteroid.radius[i]>300){
						radar.filler=-1;
						harvesterSound.stop();
					}
					else{
					playerVar.denergy-=1.2;
					harvesterSound.play();
					asteroid.radius[i]+=0.5;
					asteroid.mass[i]+=10;
					
					c.strokeStyle="#FFFF00";
					
					c.beginPath();
					c.moveTo(midX, midY);
					c.lineTo(asteroid.dispX[i]+lats(perpAng+t*200,asteroid.radius[i])*mapScale, asteroid.dispY[i]+deps(perpAng+t*200,asteroid.radius[i])*mapScale);
					c.closePath();
					c.stroke();
					
					c.beginPath();
					c.moveTo(midX, midY);
					c.lineTo(asteroid.dispX[i]+lats(perpAng+t*400,asteroid.radius[i])*mapScale, asteroid.dispY[i]+deps(perpAng+t*400,asteroid.radius[i])*mapScale);
					c.closePath();
					c.stroke();
					
					c.beginPath();
					c.moveTo(midX, midY);
					c.lineTo(asteroid.dispX[i]+lats(perpAng-t*500,asteroid.radius[i])*mapScale, asteroid.dispY[i]+deps(perpAng-t*500,asteroid.radius[i])*mapScale);
					c.closePath();
					
					c.beginPath();
					c.moveTo(midX, midY);
					c.lineTo(asteroid.dispX[i]+lats(perpAng-t*300,asteroid.radius[i])*mapScale, asteroid.dispY[i]+deps(perpAng-t*300,asteroid.radius[i])*mapScale);
					c.closePath();
					
					c.stroke();
					}
				if(distRadar>200*mapScale && asteroid.stat[i] == 1){	
					radar.harvester=-1;
					}
				}					
			}
		}				
}

function drawPlayerStats(){
	var grdMatter, grdMatter2;
	
	grdMatter = c.createRadialGradient(w-60, 150-(playerVar.heat/4),0, w-60, 150-(playerVar.heat/4), 350); 
	grdMatter.addColorStop(1.000, 'rgba(0,0,0, 1.000');
	grdMatter.addColorStop(0.500, 'rgba('+(playerVar.denergy+(Math.sin(t*5)))+','+(playerVar.denergy+(Math.sin(t*5)))+','+(playerVar.denergy+(Math.sin(t*5)))+')');
	
	grdMatter2 = c.createRadialGradient(w-60, 150-Math.sin(t)*50,0, w-60, 150, 300); 
	grdMatter2.addColorStop(1.000, 'rgba(0,0,0, 1.000');
	grdMatter2.addColorStop(0.000, 'rgba(250,250,250, 1.000)');
	
	
	c.fillStyle = grdMatter;
	c.strokeStyle = grdMatter2;
	c.fillRect(w-20, 150, 20, 300);
	
	
	for (var i = 0; i<30; i++){
		c.fillStyle="rgba(0,0,0,.1)";
		c.beginPath();
		c.arc(w-20+(Math.sin(t*2)*10)+Math.sin(i/2),450-i*10, 10, 0, Math.PI*2);
		c.arc(w-20+(Math.sin(t*2+i/0.3)*10)+i,450-i*10, 10, 0, Math.PI*2);
		c.arc(w-20+(Math.sin(-t*2)*10)+i,450-i*10, 10, 0, Math.PI*2);
		c.arc(w-20+(Math.sin(-t*2+i/0.3)*10)+i,450-i*10, 10, 0, Math.PI*2);
		c.closePath();
		c.fill();
	}
	if(playerVar.denergy>40){
	for (var i = 0; i<100; i+=10){
		c.fillStyle="rgba(0,0,0,.5)";
		c.beginPath();
		c.arc(w-10+(Math.sin(t*8+i)*10),450-i*3, 15, 0, Math.PI*2);
		c.closePath();
		c.fill();
	}
	}
	
	if(playerVar.denergy>80){
	for (var i = 0; i<80; i+=10){
		c.fillStyle="rgba(0,0,0,.5)";
		c.beginPath();
		c.arc(w-10+(Math.sin(t*7+i)*10),450-i*3, 14, 0, Math.PI*2);
		c.closePath();
		c.fill();
	}
	}
	if(playerVar.denergy>160){
	for (var i = 0; i<60; i+=10){
		c.fillStyle="rgba(0,0,0,.5)";
		c.beginPath();
		c.arc(w-10+(Math.sin(t*7+i)*10),450-i*3, 13, 0, Math.PI*2);
		c.closePath();
		c.fill();
	}
	}
	
	c.strokeRect(w-20, 150, 20, 300);
	
	//c.fillRect(w-450, 10, 410, 110);
 	
	var grdTemp, grdTemp2;
	c.lineWidth = 2;
	grdTemp = c.createRadialGradient(w-60, 150-(playerVar.heat/4),0, w-60, 150-(playerVar.heat/4), 350); 
	grdTemp.addColorStop(1.000, 'rgba(256,0,0, 1.000');
	grdTemp.addColorStop(0.500, 'rgba('+(playerVar.heat)+',0,'+Math.abs(-playerVar.heat+256)+', .5000)');
	

	grdTemp2 = c.createRadialGradient(w-60, 150-Math.sin(t)*50,0, w-60, 150, 300); 
	grdTemp2.addColorStop(0.000, 'rgba(0,0,0, 1.000');
	grdTemp2.addColorStop(1.000, 'rgba(250,250,250, 1.000)');
	
	if(playerVar.heat>250){
		grdTemp2 = c.createRadialGradient(w-60, 50,0, w-60, 150, 50); 
		grdTemp2.addColorStop(0.000, 'rgba(0,0,0, 1.000');
		grdTemp2.addColorStop(1.000, 'rgba('+(playerVar.heat)+','+(playerVar.heat)+',0, 1.000)');
	}
	
	c.fillStyle= grdTemp;
	c.fillRect(w-60, 150, 20, 300);
	c.strokeStyle = grdTemp2;
	c.strokeRect(w-60, 150, 20, 300);
	
	if(playerVar.heat>200){
		c.fillStyle="rgba(255,255,255, 0.5)";
		if(playerVar.heat>250){
			c.fillStyle="rgba(255,255,0, 1)";
		}
		if(playerVar.heat>290){
			c.fillStyle="rgba(255,0,0, 1)";
		}
		c.font = "12px Audiowide";
		c.fillText("W",w-55	,170);	
		c.fillText("A",w-55	,190);	
		c.fillText("R",w-55	,210);	
		c.fillText("N",w-55	,230);	
		c.fillText("I",w-55	,250);	
		c.fillText("N",w-55	,270);	
		c.fillText("G",w-55	,290);	
	}
	
	
	
	var grdStat, grdStat2;
	// Create gradient
	grdStat = c.createRadialGradient(w-100, 150,0, w-100, 150, 350); 
	// Add colors
	grdStat.addColorStop(1.000, 'rgba(0,0,0, 1.000');
	grdStat.addColorStop(0.000, 'rgba(256,256,256, 1.000)');
	
	if(playerVar.charging == false){
	
		// Create gradient
		grdStat2 = c.createRadialGradient(w-100, 150-Math.sin(t)*50,0, w-100, 150, 300); 
		// Add colors
		grdStat2.addColorStop(1.000, 'rgba(0,0,0, 1.000');
		grdStat2.addColorStop(0.000, 'rgba(0,100,0, 1.000)');
		c.fillStyle= grdStat2;
		c.fillRect(w-100, 150, 20, playerVar.eenergy);
		
	}
	else{	
		c.fillRect(w-100, 150, 20, playerVar.eenergy);
		// Create gradient
		grdStat2 = c.createRadialGradient(w-100, 150-Math.sin(t)*200,0, w-100, 150, 300); 
		// Add colors
		grdStat2.addColorStop(1.000, 'rgba(0,0,0, 1.000');
		grdStat2.addColorStop(0.000, 'rgba(0,200,0, 1.000)');
		c.fillStyle= grdStat2;
		c.fillRect(w-100, 150, 20, playerVar.eenergy);
		
		
		if(playerVar.eenergy<299){
			c.fillStyle="rgba(0,255,0, 1)";
			c.font = "12px Audiowide";
			c.fillText("C",w-95	,170);
			c.fillText("H",w-95	,190);
			c.fillText("A",w-95	,210);
			c.fillText("R",w-95	,230);
			c.fillText("G",w-95	,250);
			c.fillText("I",w-95	,270);
			c.fillText("N",w-95	,290);
			c.fillText("G",w-95	,310);
		}
		else{
			c.fillStyle="rgba(255,255,255, 1)";
			c.font = "12px Audiowide";
			c.fillText("C",w-95	,170);
			c.fillText("H",w-95	,190);
			c.fillText("A",w-95	,210);
			c.fillText("R",w-95	,230);
			c.fillText("G",w-95	,250);
			c.fillText("E",w-95	,270);
			c.fillText("D",w-95	,290);
			}
	}
	
	if(playerVar.eenergy>=300){
		grdStat = c.createRadialGradient(w-100, 200,0, w-100, 200, 350); 
		// Add colors
		grdStat.addColorStop(1.000, 'rgba(0,0,0, 1.000');
		grdStat.addColorStop(0.000, 'rgba(256,256,256, 1.000)');
		c.strokeStyle= grdStat;
		c.strokeRect(w-100, 150, 20, 300);
	}
	
	c.strokeStyle= grdStat;

	c.strokeRect(w-100, 150, 20, 300);
	
	if(playerVar.eenergy<1){
		c.font = "12px Audiowide";
		c.fillStyle="rgba(255,255,255, 0.5)";
		c.fillText("E",w-95,170);	
		c.fillText("N",w-95,190);	
		c.fillText("E",w-95,210);	
		c.fillText("R",w-95,230);	
		c.fillText("G",w-95,250);	
		c.fillText("Y",w-95,270);	
		c.fillText("D",w-95,290);	
		c.fillText("E",w-95,310);	
		c.fillText("P",w-95,330);	
		c.fillText("L",w-95,350);	
		c.fillText("E",w-95,370);
		c.fillText("T",w-95,390);
		c.fillText("E",w-95,410);
		c.fillText("D",w-95,430);
	}
	
}	

function drawRadar(){
	if (radar.active == 1){
		if(blackOutStatus==false && whiteOutStatus==false && redOutStatus==false){
			radarSound.play();
		}
	for(var i = 0; i<asteroid.id.length; i++){
		var perpAng = azCalc(midX, midY,asteroid.dispX[i], asteroid.dispY[i]);
		var distRadar = inverse(midX, midY, asteroid.dispX[i], asteroid.dispY[i]);
		var dispDistRadar = 2000*mapScale;
		var coneX1, coneY1, coneX2, coneY2, coneAz1, coneAz2;
		var drawConeX1, drawConeY1, drawConeX2, drawConeY2; 
		
		coneX1= asteroid.dispX[i]+lats(perpAng,asteroid.radius[i]*mapScale);
		coneY1 = asteroid.dispY[i]+deps(perpAng,asteroid.radius[i]*mapScale);
		coneX2= asteroid.dispX[i]-lats(perpAng,asteroid.radius[i]*mapScale);
		coneY2 = asteroid.dispY[i]-deps(perpAng,asteroid.radius[i]*mapScale);
		coneAz1 = azCalc(midX, midY, coneX1, coneY1);
		coneAz2 = azCalc(midX, midY, coneX2, coneY2);
		
		drawConeX1 = midX-lats(coneAz1+90-10,dispDistRadar);
		drawConeY1 = midY-deps(coneAz1+90-10,dispDistRadar);
		drawConeX2 = midX-lats(coneAz2+90+10,dispDistRadar);
		drawConeY2 = midY-deps(coneAz2+90+10,dispDistRadar);
		
		// Create gradient
		grd = c.createRadialGradient((drawConeX1+drawConeX2)/2,(drawConeY1+drawConeY2)/2,0,midX, midY,dispDistRadar); 
		// Add colors
		grd.addColorStop(0.300, 'rgba(0,0,0, 0.000');
		grd.addColorStop(0.400, 'rgba(0,0,0, 0.000');
		grd.addColorStop(0.500, 'rgba(0, 100, 0,1.000)');
		grd.addColorStop(0.900, 'rgba(0, 0, 0, .000)');
		grd.addColorStop(1.000, 'rgba(0,0,0, .000)');
		
		
		if(distRadar<2000*mapScale){
				c.beginPath();
				c.moveTo(midX, midY);
				c.lineTo(coneX1, coneY1);
				c.lineTo(coneX2, coneY2);
				c.lineTo(midX, midY);
				c.closePath();
				c.fillStyle = grd;
				c.fill();
				c.resetTransform();
					
			if(distRadar<200*mapScale){
		c.beginPath();
		c.moveTo(midX, midY);
		
		c.lineTo(asteroid.dispX[i]+lats(perpAng+t*200,asteroid.radius[i])*mapScale, asteroid.dispY[i]+deps(perpAng+t*200,asteroid.radius[i])*mapScale);
		c.closePath();
		c.strokeStyle="#00FF00";
		c.stroke();
			}
		
		}	
		}
	}
	else{
		radarSound.stop();
	}
		
}

function starDisplayPositionHelper(){
	for (i = 0; i<asteroid.id.length; i++){
		star.dispX[i] = (star.posX[i]*mapScale)-(playerVar.posX*mapScale)+midX;
		star.dispY[i] = (star.posY[i]*mapScale)-(playerVar.posY*mapScale)+midY;
		}
	}

function drawMinimap(){
	var miniMapX = w-300;
	var miniMapY = 450;
	var miniMapRadius = 200;
	var miniMapDistance;
	var minigrd;
	var miniMapDir;
	
	
      // Create gradient
      minigrd = c.createRadialGradient(miniMapX, miniMapY-150, 0.000, miniMapX, miniMapY-150, 400);
      
      // Add colors
      minigrd.addColorStop(.500, 'rgba(0, 0, 0, 0.000)');
      minigrd.addColorStop(.000, 'rgba(0, 255, 0, .500)');
      
      // Fill with gradient
	c.fillStyle = minigrd;
	c.beginPath();
	c.arc(miniMapX,miniMapY-150, miniMapRadius, 0, Math.PI*2);
	c.closePath();
	c.lineWidth= 4;
	c.fill();
	c.strokeStyle='rgba(0, 255, 0, .500)';
	//c.stroke();

	for (var i = 0; i<asteroid.id.length; i++){
		miniMapDistance = inverse((asteroid.posX[i]*0.1)-(playerVar.posX*0.1)+midX+w/2-300, (asteroid.posY[i]*0.1)-(playerVar.posY*0.1)+midY-150, miniMapX, miniMapY-150);
		
		if (miniMapDistance>150){
		}
		else{
		
		c.fillStyle = 'rgba(0, 0, 0, 1.000)'
		c.beginPath();
		c.arc((asteroid.posX[i]*0.1)-(playerVar.posX*0.1)+midX+w/2-300, (asteroid.posY[i]*0.1)-(playerVar.posY*0.1)+midY-150, 3, 0, Math.PI*2);
		c.closePath();
		c.fill();
		}
	}	
	
		
	for(var i = 0; i<360; i+=60){
		c.strokeStyle= 'rgba(0, 255, 0, 0.100)';	
		c.beginPath();
		c.moveTo(miniMapX+deps(i-(t)*10, miniMapRadius-50),(miniMapY-150)+lats(i-(t)*10, miniMapRadius-50));
		c.lineTo(miniMapX-deps(i-(t)*10, miniMapRadius-50),(miniMapY-150)-lats(i-(t)*10, miniMapRadius-50));
		c.closePath();
		c.lineWidth= 2;
		c.stroke();	
		c.beginPath();
		c.moveTo(miniMapX+deps(i+(t)*10, miniMapRadius-50),(miniMapY-150)+lats(i+(t)*10, miniMapRadius-50));
		c.lineTo(miniMapX-deps(i+(t)*10, miniMapRadius-50),(miniMapY-150)-lats(i+(t)*10, miniMapRadius-50));
		c.closePath();
		c.lineWidth= 2;
		c.stroke();	
	}

		for (var i = 0; i<star.id.length; i++){
			miniMapDistance = inverse((star.posX[i]*0.1)-(playerVar.posX*0.1)+midX+w/2-300, (star.posY[i]*0.1)-(playerVar.posY*0.1)+midY-150, miniMapX, miniMapY-150);
			miniMapDir = azCalc((star.posX[i]*0.1)-(playerVar.posX*0.1)+midX+w/2-300, (star.posY[i]*0.1)-(playerVar.posY*0.1)+midY-150, miniMapX, miniMapY-150);
			
			if (miniMapDistance+star.radius[i]*0.05>200){
				}
			else{
				c.fillStyle = 'rgba(256, 256, 256, 1.00)'
				c.beginPath();
				c.arc((star.posX[i]*0.1)-(playerVar.posX*0.1)+midX+w/2-300, (star.posY[i]*0.1)-(playerVar.posY*0.1)+midY-150,star.radius[i]*0.05 , 0, Math.PI*2);
				c.closePath();
				c.fill();		
				}
			
			if (miniMapDistance+star.radius[i]*0.05<200){
				
				c.strokeStyle='rgba(256, 256, 256, 0.3';
				c.beginPath();
				c.moveTo(miniMapX,(miniMapY-150));
				c.lineTo(  ((star.posX[i]*0.1)-(playerVar.posX*0.1)+midX+w/2-300)    ,((star.posY[i]*0.1)-(playerVar.posY*0.1)+midY-150))  ;
				c.closePath();
				c.stroke();
				} 
			
			
			if (miniMapDistance+star.radius[i]*0.05>200){
				c.strokeStyle='rgba(256, 256, 256, 0.3';
				if (miniMapDistance+star.radius[i]*0.05<300){
					c.strokeStyle='rgba(256, 256, 256, 0.7';
				}
				
				c.beginPath();
				c.moveTo(miniMapX,(miniMapY-150));
				c.lineTo( miniMapX-deps(miniMapDir,175), miniMapY-150+lats(miniMapDir,175))  ;
				c.closePath();
				c.stroke();
			}
			
			
	}
	
	
	
}

//Draw asteroid function:
function drawAsteroid(){
	var grd;
	for (i = 0; i<asteroid.id.length; i++){
		var distVisib = inverse(midX, midY, asteroid.dispX[i], asteroid.dispY[i])/mapScale;
		
		if (distVisib<1500){
			c.beginPath();
			c.arc(asteroid.dispX[i], asteroid.dispY[i], ((asteroid.radius[i]*1.5)*mapScale), 0, Math.PI*2);
			c.closePath();
			grdAst = c.createRadialGradient(asteroid.dispX[i], asteroid.dispY[i], 0.000, asteroid.dispX[i], asteroid.dispY[i], (asteroid.radius[i]*1.5)*mapScale);
			
			grdAst.addColorStop(0.000, 'rgba(255, 255, 255, 1.000)');
			grdAst.addColorStop(1.000, 'rgba(200, 200, 200, ' + ((distVisib/10000*mapScale)-0.5) +')');
			c.fillStyle = grdAst;
			c.lineWidth = 2;
			c.fill();
		}
			c.fillStyle = "#000";
			c.beginPath();
			c.strokeStyle= 'rgb(' + Math.floor(512-distVisib) + ', ' + Math.floor(512-distVisib) + ', ' + Math.floor(512-distVisib) +')';
			c.arc(asteroid.dispX[i], asteroid.dispY[i], (asteroid.radius[i]*mapScale), 0, Math.PI*2);
			c.closePath();
			c.fill();
			c.stroke();
	
				
		//If asteroid is selected:
		if (asteroid.stat[i] == 1){
			c.strokeStyle= "#00FF00";
			if(radar.harvester==1){
				c.strokeStyle= "#00FFFF";
			}
			if(radar.filler==1){
				c.strokeStyle= "#FFFF00";
			}
			c.beginPath();
			c.arc(asteroid.dispX[i], asteroid.dispY[i],(((Math.abs(Math.sin(t))*10)*mapScale)+asteroid.radius[i]+10)*mapScale, 0, Math.PI*2);
			c.closePath();
			c.stroke();
		}
			
/* 		c.textAlign="right";
		c.font = "15px Arial";
		c.fillStyle="#FF0000";
		c.fillText('id: ' + asteroid.id[i] , asteroid.dispX[i]-40, asteroid.dispY[i]-30);
		c.fillText('PosX: ' + Math.floor(asteroid.posX[i]) , asteroid.dispX[i]-40, asteroid.dispY[i]-15);
		c.fillText('PosY: ' + Math.floor(asteroid.posY[i]) , asteroid.dispX[i]-40, asteroid.dispY[i]);	
		c.fillText('velX: ' + Math.floor(asteroid.velX[i]) , asteroid.dispX[i]-40, asteroid.dispY[i]+15);
		c.fillText('velY: ' + Math.floor(asteroid.velY[i]) , asteroid.dispX[i]-40, asteroid.dispY[i]+30);
		c.fillText('mass: ' + Math.floor(asteroid.mass[i]) , asteroid.dispX[i]-40, asteroid.dispY[i]+60);
		c.fillText('ΣfX: ' + Math.floor(asteroid.fX[i]), asteroid.dispX[i]-40, asteroid.dispY[i]+75);
		c.fillText('ΣfY: ' + Math.floor(asteroid.fY[i]), asteroid.dispX[i]-40, asteroid.dispY[i]+90);
		c.fillText('accX: ' + asteroid.accX[i].toFixed(2), asteroid.dispX[i]-40, asteroid.dispY[i]+105);
		c.fillText('accY: ' + asteroid.accY[i].toFixed(2), asteroid.dispX[i]-40, asteroid.dispY[i]+120);  */
		}
		
/* 		for(j=0; j<asteroid.id.length[i];j++){
			c.beginPath();
			c.fillStyle = "#000";
			c.arc(asteroid.dispX[j], asteroid.dispY[j], (asteroid.radius[j]*mapScale), 0, Math.PI*2);
			c.closePath();
			c.fill();
		} */
	}

//populate asteroid array with random positions and velocities:
for (var i = 0; i<100; i++){
	asteroid.id    [i] = i;
	asteroid.posX  [i] = i*10+(Math.random()*12000)+4000;
	asteroid.posY  [i] = i*10+(Math.random()*12000)+3000; 
	asteroid.velX  [i] = 0;
	asteroid.velY  [i] = 0;
	asteroid.radius[i] = (Math.random()*50)+20;
	asteroid.fX    [i] = 0;
	asteroid.fY    [i] = 0;
	asteroid.stat  [i] = -1;
	asteroid.timer [i] = 0;
	asteroid.mass  [i] = sphereVol(asteroid.radius[i])/10000;
	}

for (var i = 0; i<3; i++){
	star.id    [i] = i;
	star.posX  [i] = 5000+(i*5000)+(Math.random()*1000);
	star.posY  [i] = 1000+(i*5000)+(Math.random()*2000);
	star.velX  [i] = 0;
	star.velY  [i] = 0;
	star.radius[i] = 500;
	star.fX    [i] = 0;
	star.fY    [i] = 0;
	star.stat  [i] = -1;
	star.timer [i] = 0;
	star.mass  [i] = sphereVol(star.radius[i])/4000;
	}

function starDisplayPositionHelper(){
	for (i = 0; i<asteroid.id.length; i++){
		star.dispX[i] = (star.posX[i]*mapScale)-(playerVar.posX*mapScale)+midX;
		star.dispY[i] = (star.posY[i]*mapScale)-(playerVar.posY*mapScale)+midY;
		}
	}

var shiftDir;
function drawBlackHole(){
	var grdBhole;
	var distVisib;
	var velTotal = Math.sqrt(Math.pow(playerVar.velX, 2) +Math.pow(playerVar.velY, 2));
	

	for (var i = 0; i<asteroid.id.length; i++){
		
		playerAz = azCalc(midX, midY, asteroid.dispX[i], asteroid.dispY[i]);
		distVisib = inverse(midX, midY, asteroid.dispX[i], asteroid.dispY[i]);
		if( asteroid.radius[i]>300){
			if (distVisib<290*mapScale){
				thrustSoundStat = 0;	
				blackOutStatus= true;
			}
			
			
			if (distVisib<2000*mapScale ){		
						grdBhole = c.createRadialGradient(asteroid.dispX[i],asteroid.dispY[i], 0.000,asteroid.dispX[i],asteroid.dispY[i],  2000*mapScale);
						grdBhole.addColorStop(0.5, 'rgba(100, 0,0, 0)');
						grdBhole.addColorStop(0, 'rgba(100, 0, 0,'+ ((Math.abs(velTotal/10))-0.5) +' )');
						c.fillStyle=grdBhole;	
						c.beginPath();
						c.arc(midX ,midY,2000*mapScale, 0, Math.PI*2);
						c.closePath();
						c.fill();
						
						c.beginPath();
						c.arc(asteroid.dispX[i]+deps(playerAz+180,200), asteroid.dispY[i]-lats(playerAz+180,200), asteroid.radius[i]*mapScale*2, 0, Math.PI*2);
						c.closePath();
						c.fill();
				
						grdBhole = c.createRadialGradient(asteroid.dispX[i],asteroid.dispY[i], 0.000,asteroid.dispX[i],asteroid.dispY[i],  asteroid.radius[i]*2*mapScale);
						grdBhole.addColorStop(0.900, 'rgba(255, 255, 255, 0)');
						grdBhole.addColorStop(1.000, 'rgba(255, 255, 255, 0.5 )');
						c.fillStyle=grdBhole;
						c.beginPath();
						c.arc(asteroid.dispX[i], asteroid.dispY[i], asteroid.radius[i]*mapScale, 0, Math.PI*2);
						c.closePath();
						c.fill();

						grdBhole = c.createRadialGradient(asteroid.dispX[i],asteroid.dispY[i], 0.000,asteroid.dispX[i],asteroid.dispY[i],  2000*mapScale);
						grdBhole.addColorStop(0.5, 'rgba(0, 0,100, 0)');
						grdBhole.addColorStop(0, 'rgba(0, 0, 100,'+ ((Math.abs(velTotal/10))-1.1) +' )');
						c.fillStyle=grdBhole;
						
						c.beginPath();
						c.arc(midX ,midY,2000*mapScale, 0, Math.PI*2);
						c.closePath();
						c.fill();
						
						c.beginPath();
						c.arc(asteroid.dispX[i]+deps(playerAz+180,-600), asteroid.dispY[i]-lats(playerAz+180,-600), asteroid.radius[i]*mapScale*5, 0, Math.PI*2);
						c.closePath();
						c.fill();

				}
				c.fillStyle="#000";
				c.beginPath();
				c.arc(asteroid.dispX[i], asteroid.dispY[i], (asteroid.radius[i]+2)*mapScale, 0, Math.PI*2);
				c.closePath();
				c.fill();



				grdBhole = c.createRadialGradient(asteroid.dispX[i],asteroid.dispY[i], 0.000,asteroid.dispX[i],asteroid.dispY[i],  asteroid.radius[i]*4*mapScale);
				grdBhole.addColorStop(0.000, 'rgba(255, 255,255, 1)');
				grdBhole.addColorStop(1.000, 'rgba(255, 255, 255, 0 )');
				c.fillStyle=grdBhole;
				c.beginPath();
				c.arc(asteroid.dispX[i], asteroid.dispY[i], asteroid.radius[i]*mapScale*4, 0, Math.PI*2);
				c.closePath();
				c.fill();



				grdBhole = c.createRadialGradient(asteroid.dispX[i],asteroid.dispY[i], 0.000,asteroid.dispX[i],asteroid.dispY[i],  asteroid.radius[i]*1.6*mapScale);
				grdBhole.addColorStop(0.500, 'rgba(0, 0,0, 1)');
				grdBhole.addColorStop(1.000, 'rgba(255, 255, 255, 0.5 )');
				c.fillStyle=grdBhole;
				c.beginPath();
				c.arc(asteroid.dispX[i], asteroid.dispY[i], asteroid.radius[i]*mapScale, 0, Math.PI*2);
				c.closePath();
				c.fill();
				
				
				
				
		
			if (distVisib<200*mapScale){
				blackOutStatus = true;
				}	
				
			}
		}		
	}
	
	
	
function drawstar(){
		var grdStar;
		for (var i = 0; i<star.id.length; i++){
			
			grdStar = c.createRadialGradient(star.dispX[i], star.dispY[i], 10.000, star.dispX[i], star.dispY[i], (star.radius[i])*mapScale);
			grdStar.addColorStop(1.000, 'rgba(000, 000, 000, 0.000)');
			grdStar.addColorStop(0.500, 'rgba(255, 255, 255, 1.000)');
			grdStar.addColorStop(0.000, 'rgba(255, 255, 255, 9.000)');
			c.fillStyle=grdStar;
			c.beginPath();
			c.arc(star.dispX[i], star.dispY[i], (star.radius[i]*mapScale), 0, Math.PI*2);
			c.closePath();
			c.fill();
			c.resetTransform();
		}
}
	
	
//Player sprite function:
function playerSprite(){
	var grdThrust;	
	c.fillStyle="#fff";
	c.strokeStyle="#fff";
/* 	
	c.lineWidth=1;
	c.beginPath();
	c.moveTo(midX-lats(playerVar.az+45,20 *mapScale), midY-deps(playerVar.az+45,20  *mapScale));
	c.lineTo(midX+lats(playerVar.az-45,20 *mapScale), midY+deps(playerVar.az-45,20  *mapScale));
	c.lineTo(midX+lats(playerVar.az-45,30 *mapScale), midY+deps(playerVar.az-45,30  *mapScale));
	c.lineTo(midX-lats(playerVar.az+45,30*mapScale), midY-deps(playerVar.az+45,30  *mapScale));
	c.closePath();
	c.stroke(); */
	
	
	
	c.lineWidth=5;
	c.beginPath();
	c.moveTo(midX-lats(playerVar.az+90,20 *mapScale), midY-deps(playerVar.az+90,20  *mapScale));
	c.lineTo(midX+lats(playerVar.az+90,20 *mapScale), midY+deps(playerVar.az+90,20  *mapScale));
	c.closePath();
	c.stroke();

	c.stroke();
	c.lineWidth=3;
	c.beginPath();
	c.moveTo(midX-lats(playerVar.az-45,20 *mapScale), midY-deps(playerVar.az-45,20 *mapScale));
	c.lineTo(midX+lats(playerVar.az+90,20 *mapScale ), midY+deps(playerVar.az+90,20*mapScale ));
	c.moveTo(midX+lats(playerVar.az+45,20  *mapScale), midY+deps(playerVar.az+45,20*mapScale ));
	c.lineTo(midX-lats(playerVar.az-90,20 *mapScale ), midY-deps(playerVar.az-90,20*mapScale ));
	c.moveTo(midX-lats(playerVar.az+270,5 *mapScale), midY-deps(playerVar.az+270,5  *mapScale));
	c.lineTo(midX+lats(playerVar.az+60,20	 *mapScale), midY+deps(playerVar.az+60,20  *mapScale));
	c.moveTo(midX+lats(playerVar.az-270,5 *mapScale), midY+deps(playerVar.az-270,5  *mapScale));
	c.lineTo(midX-lats(playerVar.az-60,20	 *mapScale), midY-deps(playerVar.az-60,20  *mapScale));
	c.closePath();
	c.stroke();
	
	c.beginPath();
	c.moveTo(midX-lats(mouseAz+90,0 *mapScale),   midY-deps (mouseAz +90,0  *mapScale));
	c.lineTo(midX+lats(mouseAz+90,10 *mapScale ), midY+deps(mouseAz +90,10  *mapScale ));
	c.lineTo(midX+lats(mouseAz+110,0 *mapScale ), midY+deps(mouseAz+110,0*mapScale ));
	c.closePath();
	c.stroke();
	c.beginPath();
	c.moveTo(midX+lats(mouseAz+90,0 *mapScale),   midY+deps (mouseAz +90,0  *mapScale));
	c.lineTo(midX-lats(mouseAz+90,10 *mapScale ), midY-deps(mouseAz +90,10  *mapScale ));
	c.lineTo(midX-lats(mouseAz+110,0 *mapScale ), midY-deps(mouseAz+110,0*mapScale ));
	c.closePath();
	
	// c.moveTo(midX-lats(mouseAz+60,10  *mapScale), midY-deps(mouseAz+60,10*mapScale ));
	// c.lineTo(midX-lats(mouseAz+45,20 *mapScale ), midY-deps(mouseAz-45,30*mapScale ));
	// c.closePath();
	c.stroke();
	
	
	if(playerVar.thrust>1){		
			grdThrust = c.createRadialGradient(midX-lats(playerVar.az+90,-20 *mapScale), midY-deps(playerVar.az+90,-20  *mapScale),0, midX-lats(playerVar.az+90,-20 *mapScale), midY-deps(playerVar.az+90,-20  *mapScale), 20);
			grdThrust.addColorStop(1.000, 'rgba(000, 000, 000, 0.000)');
			grdThrust.addColorStop(0.500, 'rgba(255, 255, 255, .2000)');
			grdThrust.addColorStop(0.000, 'rgba(255, 255, 255, 1.000)');
			
			c.fillStyle= grdThrust;		
			c.beginPath();
			c.arc(midX-lats(playerVar.az+90,-28 *mapScale), midY-deps(playerVar.az+90,-28  *mapScale), 10, 0, Math.PI*2);
			c.closePath();
			c.fill();
			c.beginPath();
			c.arc(midX-lats(playerVar.az+115,-30 *mapScale), midY-deps(playerVar.az+115,-30  *mapScale), 10, 0, Math.PI*2);
			c.closePath();
			c.fill();
			c.beginPath();
			c.arc(midX-lats(playerVar.az+65,-30 *mapScale), midY-deps(playerVar.az+65,-30  *mapScale), 10, 0, Math.PI*2);
			c.closePath();
			c.fill();
			
			if(shiftDown == true){
				grdThrust = c.createRadialGradient(midX-lats(playerVar.az+90,-40 *mapScale), midY-deps(playerVar.az+90,-30  *mapScale),0, midX-lats(playerVar.az+90,-40 *mapScale), midY-deps(playerVar.az+90,-40  *mapScale), 20);
				grdThrust.addColorStop(1.000, 'rgba(000, 000, 000, 0.000)');
				grdThrust.addColorStop(0.500, 'rgba(255, 255, 255, 1.000)');
				grdThrust.addColorStop(0.000, 'rgba(255, 255, 255, 1.000)');
				c.beginPath();
				c.arc(midX-lats(playerVar.az+90,40*mapScale), midY-deps(playerVar.az+90,40 *mapScale),70, 0, Math.PI*2);
				c.closePath();
				c.fill();
			
			}
			
		}

	
	}

bgMusic = new sound("virtual_light.mp3");
thrustSound = new sound("thruster.mp3");
burnerSound = new sound("burner.mp3");
harvesterSound = new sound("harvester.mp3");
radarSound = new sound("radar.mp3");
alertSound = new sound("alert.mp3");
alarmSound = new sound("alarm.mp3");
laserSound = new sound("laser.mp3");
deathSound = new sound("death.mp3");

var thrustSoundStat=0;
var soundDelay = 0;

function thrusterSoundFunc(){
	if(thrustSoundStat==1){
		thrustSound.play();
		if(shiftDown==true){
		burnerSound.play();
		}
		if(shiftDown==false){
		burnerSound.stop();
		}
		
	}
	if(thrustSoundStat==false){
		thrustSound.stop();
	}
	
}

//load Screen variable and function:
var loadScreenState = true;
var loadScreenCounter = false;
var lst = 0;

function loadScreen(){
	var grdAst;
	if(spaceDown == true){
		loadScreenCounter = true;
	}
	if(lst>150){
		loadScreenState = false;
	}
	
	playerVar.az+=0.1;
	c.fillStyle="#000";
	c.rect(0,0, c.canvas.width,c.canvas.height);
	c.fill();
	
	
	grdAst = c.createRadialGradient(midX+(lst*100),-200+lst, 0.000, midX+(lst*100),-200, 1000);
	grdAst.addColorStop(1.000, 'rgba(0, 0,0, ' + Math.sin(t+1*.6)+')');
	grdAst.addColorStop(0.000, 'rgba(0, 255,0, ' + Math.abs(Math.sin(t*2)-.5) +')');
	c.fillStyle = grdAst;
	c.rect(0,0, c.canvas.width,c.canvas.height);
	c.fill();
	
	grdAst = c.createRadialGradient(0+(lst*100),midY, 0.000, 0+(lst*100),midY, 1000);
	grdAst.addColorStop(1.000, 'rgba(0, 0,0, ' + Math.sin(t+2*.5)+')');
	grdAst.addColorStop(0.000, 'rgba(0, 255,0, ' + Math.abs(Math.sin(t+2*2)-.5) +')');
	c.fillStyle = grdAst;
	c.rect(0,0, c.canvas.width,c.canvas.height);
	c.fill();
	
	grdAst = c.createRadialGradient(0,h+(lst*100), 0.000, 0,h+(lst*100), 1000);
	grdAst.addColorStop(1.000, 'rgba(0, 0,0, ' + Math.sin(t+3*.5)+')');
	grdAst.addColorStop(0.000, 'rgba(0, 255,0, ' + Math.abs(Math.sin(t+3*2)-.5) +')');
	c.fillStyle = grdAst;
	c.rect(0,0, c.canvas.width,c.canvas.height);
	c.fill();
	
	grdAst = c.createRadialGradient(w+(lst*100),h+(lst*100), 0.000, w+(lst*100),h+(lst*100), 1000);
	grdAst.addColorStop(1.000, 'rgba(0, 0,0, ' + Math.sin(t+4*.5)+')');
	grdAst.addColorStop(0.000, 'rgba(0, 255,0, ' + Math.abs(Math.sin(t+4*2)-.5) +')');
	c.fillStyle = grdAst;
	c.rect(0,0, c.canvas.width,c.canvas.height);
	c.fill();
	
	grdAst = c.createRadialGradient(midX+(lst*100),midY+(lst*100), 0.000, midX+(lst*100),midY+(lst*100), 1000);
	grdAst.addColorStop(1.000, 'rgba(0, 0,0, ' + Math.sin(t+4*.01)+')');
	grdAst.addColorStop(0.000, 'rgba(0, 255,0, ' + Math.abs(Math.sin(t+4*.01)-.9) +')');
	c.fillStyle = grdAst;
	c.rect(0,0, c.canvas.width,c.canvas.height);
	c.fill();
	
	grdAst = c.createRadialGradient(t*40,h/3+(lst*100), 0.000, t*40,h/3+(lst*100),500);
	grdAst.addColorStop(1.000, 'rgba(0, 0,0, ' + 0+')');
	grdAst.addColorStop(0.000, 'rgba(255, 255,255, ' + .5+')');
	c.fillStyle = grdAst;
	c.rect(0,0, c.canvas.width,c.canvas.height);
	c.fill();
	
	grdAst = c.createRadialGradient(t+5*40,h/3+(lst*100), 0.000, t+5*40,h/3+(lst*100),500);
	grdAst.addColorStop(1.000, 'rgba(0, 0,0, ' + 0+')');
	grdAst.addColorStop(0.000, 'rgba(255, 255,255, ' + .5+')');
	c.fillStyle = grdAst;
	c.rect(0,0, c.canvas.width,c.canvas.height);
	c.fill();
	
	grdAst = c.createRadialGradient(w-t+5*40,h/3+(lst*100), 0.000, w-t+5*40,h/3+(lst*100),500);
	grdAst.addColorStop(1.000, 'rgba(0, 0,0, ' + 0+')');
	grdAst.addColorStop(0.000, 'rgba(255, 255,255, ' + .5+')');
	c.fillStyle = grdAst;
	c.rect(0,0, c.canvas.width,c.canvas.height);
	c.fill();
	
	grdAst = c.createRadialGradient(w-t-3*40,h/3+(lst*100), 0.000, w-t-3*40,h/3+(lst*100),700);
	grdAst.addColorStop(1.000, 'rgba(0, 0,0, ' + 0+')');
	grdAst.addColorStop(0.000, 'rgba(255, 255,255, ' + .5+')');
	c.fillStyle = grdAst;
	c.rect(0,0, c.canvas.width,c.canvas.height);
	c.fill();
	

	c.beginPath();
	c.arc(t*10, h+100, 1500, 0, Math.PI*2);
	c.closePath();
	grdAst = c.createRadialGradient(t*10, h+100+(lst*100), 0, t*10, h+100+(lst*100),1500);
	grdAst.addColorStop(0.000, 'rgba(255, 255, 255, 1.000)');
	grdAst.addColorStop(1.000, 'rgba(0, 0, 0, ' + 0 +')');
	c.fillStyle = grdAst;
	c.fill();
	
	c.beginPath();
	c.arc(t*10, h+100, 700, 0, Math.PI*2);
	c.closePath();
	grdAst = c.createRadialGradient(t*10, h+100+(lst*100), 0, t*10, h+100+(lst*100),700);
	grdAst.addColorStop(0.500, 'rgba(255, 255, 255,' + ((151-lst)/150) +')');
	grdAst.addColorStop(1.000, 'rgba(0, 0, 0, ' + .01 +')');
	c.fillStyle = grdAst;
	c.fill();
	
	drawMinimap();
	drawMiniStars();
	asteroidDisplayPositionHelper();
	drawAsteroid();
	
	c.fillStyle="#000"
	c.lineWidth = 10;
	c.beginPath();
	c.arc(t*10+(lst*50), h+100+(lst*100), 400+(lst*50), 0, Math.PI*2);
	c.closePath();
	c.fill();
	c.strokeStyle="rgba(255,255,255,.10)"
	c.stroke();
	
	
	
	grdAst = c.createRadialGradient(midX/2+(lst*100),midY-(midY*0.5)+500+(lst*100), 0.000, midX+(lst*100),midY-(midY*0.5)+500+(lst*100), 700);
	grdAst.addColorStop(1.000, 'rgba(0, 20, 0,' +(150-lst)/150 +')');
	grdAst.addColorStop(0.000, 'rgba(0,' +(((lst-150)/150)+100) +',' +0 +',' +((150-lst)/150) +')');
	c.fillStyle = grdAst;
	c.textAlign="center";
	c.font = "150px Audiowide";
	c.lineWidth=5;
	c.fillText('DARK MATTER', midX,h/3);
	
	c.font = "45px Audiowide";
	c.fillText('I N T E R D I M E N S I O N A L  C O M B A T', midX,h/3+50);
	
	c.fillStyle='rgba(255,255,255,' + (0.2+(lst/150)) + ')';
	
	c.font = "15px Audiowide";
	
	if(lst<100){
	c.fillText('You are earth\'s last hope - Good luck captain.', midX,h/3+70);
	}
	
	if(lst>99){
		c.fillText('Exiting Hyperspace.', midX,h/3+70);
	}
	

	c.strokeStyle="rgba(0,0,0,.5)"
	
	playerSprite();
	drawCursor();
	playerInc();
	
	// Create gradient
    grd = c.createRadialGradient(midX, midY, 0.000, midX, midY, 1200); 
    // Add colors
    grd.addColorStop(0.100, 'rgba(0, 0, 0, 0.000)');
    grd.addColorStop(1.000, 'rgba(0, 0, 0,' + ((151-lst)/150) +')');
	c.fillStyle = grd;
	c.rect(0,0, c.canvas.width,c.canvas.height);
	c.fill();
	
	
	if (loadScreenCounter==false){
		c.fillStyle="#fff"; 
		c.fillText('Press spacebar to launch.', midX,midY+70);
		c.textAlign="left";
		c.fillText('W: THRUSTER', 								midX,midY+200);
		c.fillText('SHIFT-W: AFTERBURNER (GENERATES HEAT)', 	midX,midY+220);
		c.fillText('S: ANTI-GRAVITY BRAKE (GENERATES HEAT)', 	midX,midY+240);
		c.fillText('A/D: ROTATE LEFT/RIGHT',				 	midX,midY+260);
		c.fillText('1: TOGGLE SCANNER ON/OFF',					 	midX,midY+280);
		c.fillText('R: COLLECT ANTI-MATTER',					midX,midY+300);
		c.fillText('F: RELEASE ANTI-MATTER',					midX,midY+320);
		c.fillText('SPACEBAR: ANTI-MATTER BEAM (GENERATES HEAT)',				midX,midY+340);
		
		c.textAlign="right";
		c.fillText('Anti-Matter is attracted to Anti-Matter by Anti-Gravity', 							midX-20,midY+200);
		c.fillText('You are armed with a fearsome Anti-Matter beam.', 									midX-20,midY+220);
		c.fillText('You are equiped with a powerful Anti-Gravity shield', 								midX-20,midY+240);
		c.fillText('You may collect or release Anti-Matter',				 							midX-20,midY+260);
		c.fillText('Anti-Matter is dangerous when being collected or released',							midX-20,midY+280);
		c.fillText('Your scanner Energy reserves are limited and must be recharged by orbiting stars',	midX-20,midY+300);
		c.fillText('Anti-Matter particles of sufficient Anti-Mass may become Super-Massive and form black holes',midX-20,midY+320);
		c.fillText('Critical overheating will result in destruction',									midX-20,midY+340);	
	}

	if(loadScreenCounter == true){
		lst++;
		grd = c.createRadialGradient(midX, midY, 0, midX, midY, 2000); 
		grd.addColorStop(0.000, 'rgba(255, 255, 255,' + ((151-lst)/150) +')');
		grd.addColorStop(.900, 'rgba(255, 255, 255,' + ((151-lst)/150) +')');
		c.fillStyle = grd;
		c.beginPath();
		c.arc(midX, midY, 2000, 0, Math.PI*2);
		c.closePath();
		c.fill();
	}
	
}

	
var keyDelay = 0;
var keyDelay2 = 0;
//*********************************************************//		
c = gameCanvas.getContext('2d');
setInterval(draw,25);
function draw(event){
	//Set canvas size with window:
	c.canvas.width  = window.innerWidth;
	c.canvas.height = window.innerHeight;
	w = c.canvas.width;
	h = c.canvas.height;
	//Clear All:
	c.clearRect(0,0, c.canvas.width,c.canvas.height);
	//Window midpoint variables:
	midX = w/2;
	midY = h/2;
	mouseAz = azCalc(midX,midY,mouseX,mouseY);

	bgMusic.play();
	thrusterSoundFunc();

	
	//Increment time by 25 milliseconds as set by canvas draw interval
	//And other time related function calls
	timeInc();
	
	//Load screen/start screen function call:
	if (loadScreenState==true){
		loadScreen();
	}
	
	//If loadscreen is not being called draw the game:
	else{


	//Game element draw function calls:
	asteroidDisplayPositionHelper();
	starDisplayPositionHelper();

	playerSprite();
	
	c.fillStyle="#000";
	c.rect(0,0, c.canvas.width,c.canvas.height);
	c.fill();
	
	drawTorps();
	torpAccelerationInc();
	torpVelocityInc();
	torpInc();
	torpDisplayPositionHelper();
	
	
	drawMiniStars();
	drawRadar();
	harvestEnergy();
	collisionDetection();
	playerThrust();
	gravityCalcAsteroid();
	gravityCalcstar();
	accelerationInc();
	accelerationIncPlayer();
	velocityInc();
	velocityIncPlayer();
	asteroidInc();
	playerInc();
	

	
	
	//Radar Draw:
	//Asteroids Draw:
	drawAsteroid();
	drawstar();


	//Draw edge vignette:

	playerSprite();
	drawLaser();
	drawBlackHole();
	vignette();
	
	drawPlayerStats();
	
	
	//Call Minimap draw:
	drawMinimap();
	
	whiteOut();
	blackOut();
	redOut();
	//Cursor draw:
	drawCursor();

	
	//Debugging Text:
 	c.textAlign="right";
	c.font = "30px Arial";
	c.fillStyle="#fff";
	c.fillText('Time: ', 180,50);
	c.fillText('Mouse X: ', 180,110);
	c.fillText('Mouse Y: ', 180,140);
	c.fillText('Center X: ', 180,180);
	c.fillText('Center Y: ', 180,210);
	c.fillText('Mouse Az: ', 180,250);
	c.fillText('Distance: ', 180,280);
	c.fillText('Dark Energy: ', 180,320);
	
	c.textAlign="left";
	c.fillText(formatTime(t), 180,50);
	c.fillText(mouseX, 180,110);
	c.fillText(mouseY, 180,140);
	c.fillText((w)/2, 180,180);
	c.fillText((h)/2, 180,210);
	c.fillText((dms(azCalc(midX,midY,mouseX,mouseY))), 180,250);
	c.fillText(Math.floor(inverse(midX,midY,mouseX,mouseY)), 180,280);
	c.fillText(playerVar.denergy, 180,320);

if(blackOutStatus==false && whiteOutStatus==false && redOutStatus==false){

	keyDelay-=0.025;
	keyDelay2-=0.025;
	
	if(keyDelay2<0.015){
	 keyDelay2 = 0;
	}
	
	playerVar.thrust=0;	
	if(wDown == true){
			playerVar.thrustAz = playerVar.az;
			playerVar.thrust=40;
			thrustSoundStat=1;
			if(shiftDown){
				playerVar.thrust=80;
				playerVar.heat+=1.2;
			}
			}
		if(wDown == false){
			thrustSoundStat=false;	
			}
		if(sDown == true){
			playerVar.accX=-1;
			playerVar.accY=-1;
			playerVar.velX*=.95;
			playerVar.velY*=.95;
			playerVar.heat+=1.1;
			}
		if(aDown == true){
			playerVar.az-=5;
			}
		if(dDown == true){
			playerVar.az+=5;
			}
			
		if(keyDelay<0.050){
			if(key1Down == true){
				keyDelay = 1;
					if(playerVar.eenergy>1){
					radar.active *=-1;
					radar.harvester=-1;
					radar.filler=-1;
					}
				}
			if(radar.active==1 && rDown ==true){
				keyDelay = 1;
				radar.harvester*=-1;
				radar.filler=-1;
				}		
			if(radar.active==1 && fDown ==true){
				keyDelay = 1;
				radar.filler *=-1 ;
				radar.harvester=-1;
				}
			if(radar.active==1){
				playerVar.eenergy-=0.25;
				}		
			}
		
		
		if(keyDelay<0.025){
			keyDelay = 0;
			}
			
			if(spaceDown==true){
				playerVar.laserStatus=true;
			}
			if(spaceDown==false){
				playerVar.laserStatus=false ;
			}
	}
		
	
	}
	//console.log(t);	
	}/*Close draw function*/
	
	
}/*close init function*/

</script>
