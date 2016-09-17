$(function(){
	var t = 100000;	
	var $clock = $(".zs_list em");
	function getTime(){
		if(t == 0){
				document.write("已过期！！");
				clearInterval(tim);
			}
		var oD = Math.floor(t/(60*60*24));
		var oH = Math.floor((t/(60*60))%24);
		var oM = Math.floor((t/60)%60);
		var oS = t%60;
		
		if(oS<10){
			oS = "0" + oS;
		}
		if(oM<10){
			oM = "0" + oM;
		}
		if(oH<10){
			oH = "0" + oH;
		}
		if(oD<10){
			oD = "0" + oD;
		}
		$clock.html(oD + " 天" + oH + " 时" + oM + " 分" + oS + " 秒");
			t--;
	}
	var tim = setInterval(getTime,1000);

	$(document).scroll(function(){
			var $top = $(document).scrollTop();
			if($top >= 891){
				$(".cont_head").css({"position":"fixed","top":"0"});
			}else{
				$(".cont_head").css({"position":"absolute","top":"891px"});
			}
			if($top >= $("#zjys3").offset().top){
				
				$(".cont_head li").eq(1).find("a").addClass("curre").end().siblings().find("a").removeClass("curre");
			}else{
				$(".cont_head li").eq(0).find("a").addClass("curre").end().siblings().find("a").removeClass("curre");
			}
			if($top >= $("#zjys4").offset().top){
				$(".cont_head").css("display","none");
			}else{
				$(".cont_head").css("display","block");
			}
		})
		$("#zjys02").click(function(){
			$("body").eq(0).animate({"scrollTop":$("#zjys2").offset().top},500);
		})
		$("#zjys03").click(function(){
			$("body").eq(0).animate({"scrollTop":$("#zjys3").offset().top},500);
		})
		$("#zjys05").click(function(){
			$("body").eq(0).animate({"scrollTop":$("#zjys5").offset().top},500);
		})
		
		//-----------------详情数据调取-------------------
	
	var a=window.location.href.split("?")[1];
	var overArr = unescape(a);
		overArr=overArr.split("=")[1].split(",");
	var oBj = eval(overArr)
	var $oUl = $(".c_t_list");
	var $aLi1 = $("<li>");
	var $aLi2 = $("<li>");
	var $aLi3 = $("<li>");
	$aLi1.appendTo($oUl);
	$aLi2.appendTo($oUl);
	$aLi3.appendTo($oUl);
	$("<a href='javascript:;'></a>").html(oBj[0]).appendTo($aLi1);
	$("<a href='javascript:;'></a>").html(oBj[1]).appendTo($aLi2);
	$("<span>").html(oBj[2]).appendTo($aLi2);
	var $oH1 = $(".p h1");
	var $oDiv = $(".td_tg_left");
	var $oLogo = $(".zs_img");
	var $oPrice = $(".gm .buy_pri");
	var $oXprice = $(".qg span");
	var $oSimg = $(".pd_img");
	var $aCul = $(".pd_canshu ul");
	var $qiang = $(".gm_a");
	$.get("js/xiangqing.txt",function(data){
		var oData = eval('('+data+')');
		//console.log(typeof oData);
		var oAll = oData[oBj[0]][oBj[1]][oBj[2]];
		//console.log(oAll);
		//头部信息-----------------------
		var oTou = oAll.head;
		//console.log(oTou);
		$qiang.attr("oID",oTou.oId);
		//console.log($qiang.attr("oID"))
		//----------获取oId属性--------
		$oH1.html(oTou.name);
		$("<img src="+oTou.img+">").appendTo($oDiv);
		$("<img src="+oTou.logo+">").appendTo($oLogo);
		$oPrice.html(oTou.price);
		$oXprice.html(oTou.price);
		$("<img src="+oTou.spece+">").appendTo($oSimg);
		//商品参数----------------------------
		var $aCLi;
		oAll.canshu.forEach(function(item,index){
			if(index%2 == 0){
				$aCLi = $("<li>");
				$aCLi.appendTo($aCul);
				$("<label>").html(item).appendTo($aCLi);
			}
			if(index%2 != 0){
				$("<span>").html(item).appendTo($aCLi);
			}
		})
		//商品详情---------------------------------
		var $oImg = $(".pd_shipai p")
		oAll.detail.forEach(function(deil,nex){
			var oDeil = eval(deil);
			var $aSrc = $("<img src="+oDeil.src+">");
			$aSrc.css("height",oDeil.height);
			$aSrc.appendTo($oImg);
		})
	})
	$(".gm_a").click(function(){
		var num=cookieUntil.getCookie($(this).attr("oID"))?Number(cookieUntil.getCookie($(this).attr("oID"))):0;
		cookieUntil.setCookie($(this).attr("oID"),num+1,7);
		window.open("gouwuche.html");
	})

})
