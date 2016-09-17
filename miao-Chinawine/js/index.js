$(function() {
	show(0);
	yang(0);
	other(0);
//-------------------弹出层操作-----------------
$(".close").click(function(){
	$(".wrap").css("display","none");
	$(".tcImg").css("display","none");
})
	//导航微博微信出现消失
//	$(".weibo-img img").hover(function() {
//		$(".weibo").css("display", "block");
//	}, function() {
//		$(".weibo").css("display", "none");
//	});
//	$(".weixin-img img").hover(function() {
//		$(".weixin").css("display", "block");
//	}, function() {
//		$(".weixin").css("display", "none");
//	});
//
//	$("#keyword").focus(function() {
//		$(this).attr("value", "");
//	});
//	$("#keyword").blur(function() {
//		$(this).attr("value", "茅台");
//	});
//
//	//购物车隐藏出现-------------
//	$(".shopcar").hover(function() {
//		$(".shopCartWrap").css("display", "block");
//		$(".xian").css("display", "block");
//		$(".shopcar dt").css("box-shadow", "0 0 2px rgba(0,0,0,.2)");
//	}, function() {
//		$(".shopCartWrap").css("display", "none");
//		$(".xian").css("display", "none");
//		$(".shopcar dt").css("box-shadow", "");
//	})
//
//	//二级页面的数据调用-----------------
//	var $box = "";
//	$("#category-nav li").hover(function() {
//		var $_this = $(this);
//		$box = $("<div class='pop clearfix'></div>");
//		$box.appendTo($(this));
//		$(this).css("background-color", "#B81C22");
//		$(this).find(".icon-tri").css("display", "block");
//		$.get("js/data.txt", function(data) {
//			$(".pop").html("");
//			var oPageData = eval(data);
//			//console.log(typeof oPageData);
//			oPageData[$_this.index()].forEach(function(item, index) {
//				var $dl;
//				if (index == 0) {
//					$dl = $("<dl>").addClass("fl pop-trees").appendTo($box);
//					item.forEach(function(zuoshuju) {
//						for (var i in zuoshuju) {
//
//							var $dt = $("<dt>").appendTo($dl).html(i);
//							var $dd = $("<dd>").addClass("clearfix").appendTo($dl);
//							var $oUl = $("<ul>").addClass("teshu").appendTo($dd);
//							zuoshuju[i].forEach(function(it) {
//								$("<li>").appendTo($oUl).html(it);
//							})
//						}
//					})
//				}else {
//					$dl = $("<dl>").addClass("fr pop-promotion").appendTo($box);
//					item.forEach(function(zuoshuju) {
//						for (var i in zuoshuju) {
//
//							var $dt = $("<dt>").appendTo($dl).html(i);
//
//							zuoshuju[i].forEach(function(it) {
//								var $dd = $("<dd><img src=" + it + "></dd>").addClass("clearfix").appendTo($dl);
//							})
//						}
//					})
//				}
//			})
//		})
//
//	}, function() {
//		$box.remove();
//		$(this).css("background-color", "#313131");
//		$(this).find(".icon-tri").css("display", "none");
//	})
//	//banner图图 滚动效果的实现
//	var i = 0;
//	var timer = null;
//	$(".flex-control li").on("click",function(){
//		i = $(".flex-control li").index($(this))-1;
//		move();
//	})
//	timer = setInterval(move,3000);
//	function move(){
//		clearInterval(timer);
//		i++;
//		$(".sliders li").stop().animate({"opacity":"0"},500).eq(i%7).css("display","block").stop().animate({"opacity":"1"});
//		$(".flex-control li a").removeClass();
//		$(".flex-control li a").eq(i%7).addClass("active");
//		timer = setInterval(move,3000);
//	}

	//品牌推荐------------------------------
var aNavLi=$("#nav li");
	aNavLi.each(function(i){
		$(this).index=i;
		$(this).on("click",function(){
		$("#nav li").removeClass("select")
		$(this).addClass("select");
		$("#nav1 ul").css("display","none")
		$("#nav1 ul").eq(i).css("display","block")
		})
	})
	//限时抢购-----------------------------
	var t = 200000	
	var $clock = $(".clock em");
	function getTime(){
		if(t == 0){
				document.write("已过期！！");
				clearInterval(tim);
			}
		var oD = Math.floor(t/(60*60*24));
		var oH = Math.floor((t/(60*60))%24);
		var oM = Math.floor((t/60)%60);
		var oS = t%60;
		var ooS;
		var ooM;
		if(oS<10){
			ooS = "0" + oS;
		}else{
			ooS = oS;
		}
		if(ooM<10){
			ooM = "0" + oM;
		}else{
			ooM = oM;
		}
		if(oH<10){
			oH = "0" + oH;
		}
		$clock.get(0).innerHTML= "还剩"+ oD + "天" + oH + "时" +ooM + "分" + ooS + "秒结束";
			t--;
	}
	var tim = setInterval(getTime,1000);
	$("#time-sale .tab li").on("click",function(){
		$("#time-sale .tab li").removeClass("select")
		$(this).addClass("select")
		$("#time-sale .tab-con ul").css("display","none")
		$("#time-sale .tab-con ul").eq($(this).index()).css("display","block").siblings().css("display","none")
	})
		//白酒分类----------------------------
	$("#nav-bai li:lt(6)").on("mouseover",function(){
		$("#nav-bai li").removeClass("select");
		var i = $(this).index();
			$(this).addClass("select");
			var k = i*92;
			$(".tab-st").animate({"padding-left":(582+k)+"px"},30);
			$("#tab-bai ul").css("display","none")
			$("#tab-bai ul").eq($(this).index()).css("display","block")
		
	})
	
//----------------------红酒分类管理数据-------------------------------

$("#nav-hong li:lt(6)").on("mouseover",function(){
		$("#nav-hong li").removeClass("select");
		var i = $(this).index();
			$(this).addClass("select");
			var k = i*92;
			$(".tab-sthong").animate({"padding-left":(582+k)+"px"},30);
			show(i);	
	})

function show(n){
	var $oHong = $(".hongjiu");
	$.get("js/canpin.txt",function(data){
				$oHong.html("");
				var oDataH = eval(data);
//				console.log(typeof oDataH);
				oDataH[n].forEach(function(item,index){
					var $aLi = $("<li>").appendTo($oHong);
					$("<img src = "+item.src+"/>").appendTo($aLi);
					$("<p>"+item.name+"</p>").appendTo($aLi);
					var $oDiv = $("<div class='clearfix'></div>");
					$oDiv.appendTo($aLi);
					$("<span class='highlight'>"+item.pice+"</span>").appendTo($oDiv);
					if(item.tu){
						var $oTu =$("<div class='qian'></div>")
						$oTu.appendTo($aLi);
						$("<img src = "+item.tu+"/>").appendTo($oTu);
					}
				})
			})
}
//---------------------------洋酒分类管理-----------------------------

$("#nav-yang li:lt(4)").on("mouseover",function(){
		$("#nav-yang li").removeClass("select");
		var i = $(this).index();
			$(this).addClass("select");
			var k = i*92;
			$(".tab-styang").animate({"padding-left":(766+k)+"px"},30);
			yang(i);
	})

function yang(n){
	var $oYong = $(".yangjiu");
	$.get("js/yangjiu.txt",function(data){
				$oYong.html("");
				var oDataH = eval(data);
//				console.log(typeof oDataH);
				oDataH[n].forEach(function(item,index){
					var $aLi = $("<li>").appendTo($oYong);
					$("<img src = "+item.src+"/>").appendTo($aLi);
					$("<p>"+item.name+"</p>").appendTo($aLi);
					var $oDiv = $("<div class='clearfix'></div>");
					$oDiv.appendTo($aLi);
					$("<span class='highlight'>"+item.pice+"</span>").appendTo($oDiv);
					if(item.tu){
						var $oTu =$("<div class='qian'></div>")
						$oTu.appendTo($aLi);
						$("<img src = "+item.tu+"/>").appendTo($oTu);
					}
				})
			})
}
//---------------------------其他分类管理-----------------------------

$("#nav-qi li:lt(4)").on("mouseover",function(){
		$("#nav-qi li").removeClass("select");
		var i = $(this).index();
			$(this).addClass("select");
			var k = i*92;
			$(".tab-stqi").animate({"padding-left":(766+k)+"px"},30);
			other(i);
	})
function other(n){
	var $oYuTiao = $(".yutiao");
	$.get("js/other.txt",function(data){
				$oYuTiao.html("");
				var oDataH = eval(data);
//				console.log(typeof oDataH);
				oDataH[n].forEach(function(item,index){
					var $aLi = $("<li>").appendTo($oYuTiao);
					$("<img src = "+item.src+"/>").appendTo($aLi);
					$("<p>"+item.name+"</p>").appendTo($aLi);
					var $oDiv = $("<div class='clearfix'></div>");
					$oDiv.appendTo($aLi);
					$("<span class='highlight'>"+item.pice+"</span>").appendTo($oDiv);
					if(item.tu){
						var $oTu =$("<div class='qian'></div>")
						$oTu.appendTo($aLi);
						$("<img src = "+item.tu+"/>").appendTo($oTu);
					}
				})
			})
}


	//品牌的透明度----------------
	$(".brand li").mouseover(function(){
		$(this).find("a").css("display","block");
	})
	$(".brand li").mouseout(function(){
		$(this).find("a").css("display","none");
	})
	


})

	
	























