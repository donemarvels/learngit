var cookieUntil = {
	//添加cookie                                                          
	setCookie: function(name, value, time) {
		//console.log(name,value)
		var date = new Date();
		date.setDate(date.getDate() + time); //设置date的天为现在加上间隔
		document.cookie = name + "=" + value + ";expires=" + date;
	},

	//删除cookie
	removeCookie: function(name) {
		this.setCookie(name, 1, -1); //设置cookie过期，则该条cookie被删除
	},

	//获取cookie的值
	getCookie: function(name) {
		var str = document.cookie;
		var arr = str.split("; "); //分割成 key1=value1; key2=value2; key3=value3 
		for (var i = 0; i < arr.length; i++) { //遍历每个键值对
			var arr1 = arr[i].split("="); //得到存储键值对的数组  [key,value]
			if (arr1[0] == name) { //找到则返回对应的值
				return arr1[1];
			}
		}
		return ""; //找不到，返回空值
	}
}


$(function(){
	 
	//导航微博微信出现消失
	$(".weibo-img img").hover(function() {
		$(".weibo").css("display", "block");
	}, function() {
		$(".weibo").css("display", "none");
	});
	$(".weixin-img img").hover(function() {
		$(".weixin").css("display", "block");
	}, function() {
		$(".weixin").css("display", "none");
	});

	$("#keyword").focus(function() {
		$(this).attr("value", "");
	});
	$("#keyword").blur(function() {
		$(this).attr("value", "茅台");
	});

	//购物车隐藏出现-------------
	
	$(".shopcar").hover(function() {
		$(".shopCartWrap").css("display", "block");
		$(".xian").css("display", "block");
		$(".shopcar dt").css("box-shadow", "0 0 2px rgba(0,0,0,.2)");
	}, function() {
		$(".shopCartWrap").css("display", "none");
		$(".xian").css("display", "none");
		$(".shopcar dt").css("box-shadow", "");
	})
	//--------------------购物车删除事件---------------------	
	$('ul.goods-list').on("click","em.op",function(){
		$(this).parent().parent().parent().remove();
		cookieUntil.removeCookie($(this).parent().parent().parent().attr("id"));
		var total ="￥" + gongji();
		$(".qianshu").html(total);
		var pin_total = zongde();
		$(".geshu").html(pin_total);
		$(".count").html(pin_total);
	})
	//---------------购物车数据---------------
	var $gou = $(".goods-list");
	var $gou = $(".goods-list");
	$.get("js/cookie.txt",function(car){
		$gou.html("");
		var oData = eval("("+car+")");
		var biaozhi = false;
		for(var i in oData){
			if(cookieUntil.getCookie(i)){
				biaozhi = true;
				$(".con_one").css("display","block");
				
				createCar(i,oData);
			}
		}
		if(biaozhi){
			$(".con").css("display","none");
		}else{
			$(".con_one").css("display","none");
			$(".con").css("display","block");
		}
	})
	function createCar(i,oData) {
	$.get("js/xiangqing.txt",function(ite){
		var $aXli = $("<li id="+i+"></li>");
		$aXli.appendTo($gou);
		var $oXp = $("<p>");
		$oXp.appendTo($aXli);
		var $oXa = $("<a>");
		$oXa.appendTo($oXp);
		var oIte = eval("("+ite+")");
		var oShu =  oIte[oData[i][0]][oData[i][1]][oData[i][2]].head;
		$("<img src="+oShu.img+"/>").appendTo($oXa);
		var $detail = $("<div class='detail'></div>");
		$detail.appendTo($aXli);
		var $oXh = $("<h5>");
		$oXh.appendTo($detail);
		$("<a>").html(oData[i][2]).appendTo($oXh);
		var $oDelit = $("<p>");
		$oDelit.appendTo($detail);
		var $oOP = $("<em class='op'></em>")
		$oOP.appendTo($oDelit);
		$oOP.html("删除");
		var $oPr = $("<em class='pr'></em>");
		$oPr.appendTo($oDelit);
		$oPr.html(oShu.price);
		var $oXx = $("<em class='xx'></em>");
		$oXx.appendTo($oDelit);
		$oXx.html("x"+cookieUntil.getCookie(i));
		var total ="￥" + gongji();
		$(".qianshu").html(total);
		var oTot = zongde();
		$(".geshu").html(oTot);
		$(".count").html(oTot);
	})
	
}
	function gongji(){
	var $aLiNum =  $(".goods-list li");
	var heji = 0;
	var money = 0;
	var shuliang = 0;
	for(var i=0;i<$aLiNum.length;i++){
		money = $aLiNum.eq(i).find(".pr").html().substr(1);
		shuliang = $aLiNum.eq(i).find(".xx").html().substr(1);
		 heji += parseFloat(money)*parseFloat(shuliang);
	}
	console.log(heji);
	return heji;
}
function zongde(){
	var $aLiNum =  $(".goods-list li");
	var heji = 0;
	var total = 0;
	for(var i=0;i<$aLiNum.length;i++){
		total = $aLiNum.eq(i).find(".xx").html().substr(1);
		 heji += parseFloat(total);
	}
	console.log(heji);
	return heji;
}

	//二级页面的数据调用-----------------
	var $box = "";
	$("#category-nav li").hover(function() {
		var $_this = $(this);
		$box = $("<div class='pop clearfix'></div>");
		$box.appendTo($(this));
		$(this).css("background-color", "#B81C22");
		$(this).find(".icon-tri").css("display", "block");
		$.get("js/data.txt", function(data) {
			$(".pop").html("");
			var oPageData = eval(data);
			//console.log(typeof oPageData);
			oPageData[$_this.index()].forEach(function(item, index) {
				var $dl;
				if (index == 0) {
					$dl = $("<dl>").addClass("fl pop-trees").appendTo($box);
					item.forEach(function(zuoshuju) {
						for (var i in zuoshuju) {

							var $dt = $("<dt>").appendTo($dl).html(i);
							var $dd = $("<dd>").addClass("clearfix").appendTo($dl);
							var $oUl = $("<ul>").addClass("teshu").appendTo($dd);
							zuoshuju[i].forEach(function(it) {
								$("<li>").appendTo($oUl).html(it);
							})
						}
					})
				}else {
					$dl = $("<dl>").addClass("fr pop-promotion").appendTo($box);
					item.forEach(function(zuoshuju) {
						for (var i in zuoshuju) {

							var $dt = $("<dt>").appendTo($dl).html(i);

							zuoshuju[i].forEach(function(it) {
								var $dd = $("<dd><img src=" + it + "></dd>").addClass("clearfix").appendTo($dl);
							})
						}
					})
				}
			})
		})

	}, function() {
		$box.remove();
		$(this).css("background-color", "#313131");
		$(this).find(".icon-tri").css("display", "none");
	})

	var i = 0;
	var timer = null;
	$(".flex-control li").on("click",function(){
		i = $(".flex-control li").index($(this))-1;
		move();
	})
	timer = setInterval(move,3000);
	$(".sliders li").eq(0).css("opacity","1");
	function move(){
		clearInterval(timer);
		i++;
		i = i == $(".sliders li").size()?0 : i;
		$(".sliders li").eq(i).css("display","block").animate({"opacity":"1"},500).siblings().stop().animate({"opacity":"0"},500);
		$(".flex-control li a").removeClass();
		$(".flex-control li a").eq(i).addClass("active").siblings().removeClass("active");
		timer = setInterval(move,3000);
	}
	
//---------------cookie的获取与处理---------------
var aTT = 1;
var aName =  cookieUntil.getCookie("name");
var aPass = cookieUntil.getCookie("pass");
var aTag = cookieUntil.getCookie("tag");

console.log(aTag == aTT);
	if(aTag == aTT){
		if(aName != ""){
		$("#yonghu li").eq(1).html("Hi,欢迎"+aName+"来到中酒");
		$("#yonghu li").eq(2).html("");
		$("#yonghu li").eq(3).find("a").html("退出");
		}
		$("#yonghu li").eq(3).click(function(){
			cookieUntil.setCookie("tag","false",7);	
			window.open("index.html","_self");	
		})
	}else{
		$("#yonghu li").eq(1).html("Hi,欢迎来到中酒");
		$("#yonghu li").eq(2).html("请登录");
		$("#yonghu li").eq(3).find("a").html("注册");
		$("#yonghu li").eq(2).click(function(){
			window.open("denglu.html","_self");
		});
		$("#yonghu li").eq(3).click(function(){
			window.open("zhuce.html","_self");
		});
			
}

	//-----------------------闪购跳转-----------------------	
$("#shangou").click(function(){
		window.open("liebiao.html");
	})
	









	
	
	
	
	
	
	
	
})



