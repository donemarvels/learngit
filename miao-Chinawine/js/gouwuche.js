$(function(){
	//------------商品的增加与减少--------------
	$('ul.cart_list').on("click",'b.jian_p',function(){
				var $pum = $(this).parent().parent().attr("id");
				console.log($pum);
				$(this).siblings(".number").val(cookieUntil.getCookie($pum));
				var n = $(this).siblings(".number").val();
				console.log(n);
				if(n>1){
					n--;
					$(this).siblings(".number").val(n);
					var $oPri =$(this).parent().siblings(".c_p_price").find("span").html();
					$oPri.substr(1)*n
					$(this).parent().siblings(".c_p_amount").html("￥"+$oPri.substr(1)*n);
					cookieUntil.setCookie($pum,n,7);
				}
				var total ="￥" + zonghe();
				$("#zong").html(total);
				$("#sum").html(total);
				var pin_total = tale();
				$(".amout span").html(pin_total);
			})
			$('ul.cart_list').on("click",'b.add_p',function(){
				var $pum = $(this).parent().parent().attr("id");
				$(this).siblings(".number").val(cookieUntil.getCookie($pum));
				var k = $(this).siblings(".number").val();
				k++;
				$(this).siblings(".number").val(k);
				var $oPri = $(this).parent().siblings(".c_p_price").find("span").html();
					$oPri.substr(1)*k
					$(this).parent().siblings(".c_p_amount").html("￥"+$oPri.substr(1)*k);
				cookieUntil.setCookie($pum,k,7);
				var total ="￥" + zonghe();
				$("#zong").html(total);
				$("#sum").html(total);
				var pin_total = tale();
				$(".amout span").html(pin_total);
			})
//-----------------失去焦点------------------
$('ul.cart_list').on("blur","input.number",function(){
	var $aLiId = $(this).parent().parent().attr("id");
	console.log($aLiId);
	var $num = $(this).val();
	var $price = $(this).parent().siblings(".c_p_price").find("span").html();
	$price.substr(1)*$num;
	$(this).parent().siblings(".c_p_amount").html("￥"+$price.substr(1)*$num);
	cookieUntil.setCookie($aLiId,$num,7);
	var total ="￥" + zonghe();
	$("#zong").html(total);
	$("#sum").html(total);
	var pin_total = tale();
	$(".amout span").html(pin_total);
})

//--------------------删除事件---------------------	
	$('ul.cart_list').on("click","a.delete",function(){
		$(this).parent().parent().parent().remove();
		cookieUntil.removeCookie($(this).parent().parent().parent().attr("id"));
		var total ="￥" + zonghe();
		$("#zong").html(total);
		$("#sum").html(total);
		var pin_total = tale();
		$(".amout span").html(pin_total);
	})

	//---------------调取数据---------------
	var $oUll = $(".cart_list");
	$.get("js/cookie.txt",function(data){
		$oUll.html("");
		var oData = eval("("+data+")");
		for(var i in oData){
			if(cookieUntil.getCookie(i)){
				createGo(i,oData);
			}	
		}		
	})
	$('ul.cart_list').on("click","a.tiaozhuan",function(){
			location.href="xiangqing.html?name="+escape($(this).attr("name"));
	})	

	
function createGo (i,oData) {
	$.get("js/xiangqing.txt",function(ite){
	var $aLi = $("<li class='cart_list_box clearfid' id="+i+"></li>");
	$aLi.appendTo($oUll);
	var $aDiv = $("<div class='c_p'></div>");
	$aDiv.appendTo($aLi);
	var $aImgDiv = $("<div class='c_p_img'></div>");
	$aImgDiv.appendTo($aDiv);
	var $aImg = $("<a></a>");
	$aImg.appendTo($aImgDiv);
	var $c_p_name = $("<div class='c_p_name'></div>");
	$c_p_name.appendTo($aDiv);
	var $tiao = $("<a class='tiaozhuan'></a>");
	$tiao.appendTo($c_p_name);
	$tiao.html(oData[i][2]);
	$tiao.attr("name",oData[i][0]+","+oData[i][1]+","+oData[i][2]);
	var $c_p_price = $("<div class='c_p_price'></div>");
	$c_p_price.appendTo($aLi);
	
	var $c_p_num = $("<div class='c_p_num'></div>");
	$c_p_num.appendTo($aLi);
	var $jian_p = $("<b class='jian_p'></b>");
	$jian_p.appendTo($c_p_num);
	$jian_p.html("-");
	var $oInput = $("<input type='text' value='' class='number'/>") 	
	$oInput.appendTo($c_p_num);
	$oInput.val(cookieUntil.getCookie(i));
	var $add_p = $("<b class='add_p'></b>");
	$add_p.appendTo($c_p_num);
	$add_p.html("+");
	var $c_p_amount = $("<div class='c_p_amount'></div>")
	$c_p_amount.appendTo($aLi);
	var $c_p_operate = $("<div class='c_p_operate' id='dd_405'></div>");
	$c_p_operate.appendTo($aLi);
	var $oSpan = $("<span></span>");
	$oSpan.appendTo($c_p_operate);
	var $oShanChu = $("<a href='javascript:void(0);' class='delete'></a>");
	$oShanChu.appendTo($oSpan);
	$oShanChu.html("删除");
		var oIte = eval("("+ite+")");
		var oShu =  oIte[oData[i][0]][oData[i][1]][oData[i][2]].head;	
		
		$("<img src="+oShu.img+"/>").appendTo($aImg);
		$("<span>").html(oShu.price).appendTo($c_p_price);
		var $oPRI = oShu.price;
		var $amount = $oPRI.substr(1);
		$c_p_amount.html("￥"+$amount*cookieUntil.getCookie(i));
		var total ="￥" + zonghe();
		$("#zong").html(total);
		$("#sum").html(total);
		var pin_total = tale();
		$(".amout span").html(pin_total);
	})
	
}	
	
function zonghe(){
	var $aLiNum =  $(".cart_list li");
	var heji = 0;
	var money = 0;
	for(var i=0;i<$aLiNum.length;i++){
		money = $aLiNum.eq(i).find(".c_p_amount").html().substr(1);
		console.log(parseFloat(money));
		 heji += parseFloat(money);
	}
	console.log(heji);
	return heji;
}
function tale(){
	var $aLiNum =  $(".cart_list li");
	var heji = 0;
	var total = 0;
	for(var i=0;i<$aLiNum.length;i++){
		total = $aLiNum.eq(i).find(".number").val();
		 heji += parseFloat(total);
	}
	console.log(heji);
	return heji;
}
})
