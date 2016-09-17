$(function(){
	fenlei(0);
	$(".today_deals_con").hover(function(){
		$(this).addClass("box_sd2")
	},function(){
		$(this).removeClass("box_sd2")
	})
	var t = 100000	
	var $clock = $(".icon em");
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
	//-----------------------品牌数据调取------------------------
	var $oPin = $(".pinpai_box");
	$.get("js/pinpai.txt",function(data){
		var oData = eval(data);
		oData.forEach(function(item){
			//console.log(item);
			var $aLi = $("<li class='deal_box box_sd'></li>");
			$aLi.appendTo($oPin);
			$aImgDiv = $("<div class='img_box'></div>");
			$aImgDiv.appendTo($aLi);
			$("<img src="+item.img+">").appendTo($aImgDiv);
			var $aBiaoDiv = $("<div class='zj_icon1'></div>");
			$aBiaoDiv.appendTo($aImgDiv);
			$aBiaoDiv.css("background",item.biao);
			var $aLinkDiv = $("<div class='deal_link'></div>");
			$aLinkDiv.appendTo($aLi);
			var $oP = $("<p class='title_box'></p>");
			$oP.appendTo($aLinkDiv);
			$oP.html(item.name);
			$aLi.get(0).titleName = item.titleName;
//			$aLi.click(function(){
//				console.log(this.titleName);
//			})
			var $oSpan = $("<span class='pnum'></span>");
			$oSpan.appendTo($aLinkDiv);
			$oSpan.html(item.pice);
			var $oBspan = $("<span class='box2'></span>");
			$oBspan.appendTo($aLinkDiv);
			$("<em>").html(item.liang).appendTo($oBspan);
			$("<i>").html(item.people).appendTo($oBspan);
		})
		$(".deal_box").hover(function(){
			$(this).addClass("box_sd2");
		},function(){
			$(this).removeClass("box_sd2");
		})
	})
		
		//-------------------全部分类----------------------
		$(".quan_tab ul li").hover(function(){
			var n = $(this).index(); 
			$(".tab_arrow").animate({"left":(96*n)+"px"},300);
			fenlei(n)
		})
		
		function fenlei(m){
			var $oUlList = $(".quan_list");
			$.get("js/pinpaifenlei.txt",function(data){
				$oUlList.html("");
				var oFenData = eval(data);
				oFenData[m].forEach(function(kind){
					//console.log(kind);
					var $aLi = $("<li>")
					$aLi.appendTo($oUlList);
					var $oDiv = $("<div class='fl_lf'></div>")
					$oDiv.appendTo($aLi);
					$("<img src="+kind.img+">").appendTo($oDiv);
					var $oP = $("<p>");
					$oP.appendTo($aLi);
					$("<span class='cat2_name'></span>").html(kind.title).appendTo($oP);
					$("<span class='a_name'></span>").html(kind.name).appendTo($oP);
					$("<span class='red2'></span>").html(kind.pice).appendTo($oP);
				})
			})
		}
		
		$(document).scroll(function(){
			var $top = $(document).scrollTop();
			if($top>600){
				$(".right_nav").css("display","block");
			}else{
				$(".right_nav").css("display","none");
			}
		})
		$(".back_top").click(function(){
			$("body").animate({"scrollTop":0},1000);
		})
		$("#oProduct li").click(function(){
//			overArr = ($(this).attr("titleName"))
//			location.href = "xiangqing.html";
//			location.href="xiangqing.html?titleName="+$(this).attr("titleName");
			location.href="xiangqing.html?titleName="+escape($(this).attr("titleName"));

		})
			
})	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
