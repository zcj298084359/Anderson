setTimeout(function () {
	$(".page01").hide();
	$(".page02").show();
	loadFn ();
},2000)

//loading过渡页面
var index=0;
var ltimer;
var loading=document.getElementById("loading");
function loadFn () {
	var ltimer=setInterval(function () {
		index++;
		if (index<121) {
			loading.style.backgroundPositionX=(-242+index*2)+"px";			
		}else{
			clearInterval(ltimer);
			$(".page02").hide();
			$(".page03").show();
			$("#time-wrap").show();
			setTime ()
		}
	},20);	
}

var startTime=59;
var lastTime=0;
function setTime () {
	startTime=59;
	lastTime=0;
	$("#time").html(startTime);
	$("#time-wrap").show();
	clearInterval(timer);
	var timer=setInterval(function () {
		if (startTime==0&&right<5) {			
			$(".page03").hide();
			$(".page04").hide();
			$(".page05").hide();
			$(".page06").hide();
			$(".page07").hide();
			$(".page11").show();
			$(".overtime").show();
			$(".nopass").hide();
			clearInterval(timer);
		}
		if (lastTime==59) {			
			clearInterval(timer);
		}
		if (arr.length==5) {
			clearInterval(timer);
		}
		$("#time").html(startTime--);
		lastTime++;
		$("#lasttime").html(59-startTime);
		$("#nopasstime").html(59-startTime);
	},1000)
}

var arr=[];
var right=0;
resultFn () 
function resultFn () {	
	$(".select").click(function () {	
		$(this).parent().parent().parent().hide();
		$(this).parent().parent().parent().next().show();
		var value=$(this).val();
		arr.push(value);
		console.log(arr);
		if (value==1) {
			right++;
			console.log(right);
		}
		if (arr.length==5&&right<5) {			
			$(".page08").hide();
			$(".page11").show();
			$("#questionsum").html(right);
			$("#time-wrap").hide();
		}		
	});	
	
}

 //音乐开关
 var musicplay=true;//播放开关
 $(window).one("touchstart",function(){
	$("#bgm").get(0).play();
});
$("#music").click(function () {
	if (musicplay) {
		$(this).html("<img src='img/music-close.png'/>");
		$("#bgm").get(0).pause();
		musicplay=false;
	}else{
		$(this).html("<img src='img/music-btn.png'/>");
		$("#bgm").get(0).play();
		musicplay=true;
	}
})

//再玩一次
$(".one-more").click(function () {	
	right=0;
	arr.length=0;
	$(this).parent().hide();
	$("#time-wrap").show();
	$(".page03").show();
	setTime();
})

//现在抽奖
$(".raffle").click(function () {
	$(".page08").hide();
	$(".page09").show();
	$("#time-wrap").hide();
})

//提交信息
$(".submit-btn").click(function (e) {
	var nameval = $("#name").val();
	var phoneval = $("#phone").val();
	var addressval = $("#address").val();
	if (nameval==""||phoneval==""||addressval=="") {
		e.preventDefault();
		return false;
	}else{
		$(".page10").hide();
		$(".page12").show();
	}
})


//抽奖转盘
var prize=0;
var otimer;
$(".circle_inner").click(function () {
	prize=ranFn(1,3);
	//根据prize值进行旋转 
	switch(prize){
		case 1:
			$(".circle_outer").transition({
				transform:"rotate(700deg)"
			},2000,"linear");
			break;
		case 2:
			$(".circle_outer").transition({
				transform:"rotate(854deg)"
			},2000,"linear");
			break;
		case 3:
			$(".circle_outer").transition({
				transform:"rotate(1125deg)"
			},2000,"linear");
			break;
		default:
			$(".circle_outer").transition({
				transform:"rotate(886deg)"
			},2000,"linear");
			break;
	}
	//自动弹出对应页面
	var otimer=setTimeout(function(){
		$(".page09").hide();
		switch(prize){
			case 1:
				$(".page10").show();
				break;
			case 2:
				$(".page13").show();
				break;
			case 3:
				$(".page13").show();
				$(".secondprize").hide();
				$(".thirdprize").show();
				break;
			default:
				$(".page09").show();
		}		
	},3000)	
})

//分享页面
$(".share").click(function () {
	$(".secondprize").hide();
	$(".thirdprize").hide();
	$(".shareimg").show();
    $("#music").hide();
})

//随机函数，取整数，包括最大最小值
function ranFn(min,max){
	return Math.floor(Math.random()*(max-min+1)+min);
}