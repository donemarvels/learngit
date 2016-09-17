$(function(){
	$("#lulu").click(function(){
		window.open("denglu.html");
	})
	var Tag = false;
	//----------------用户名验证-----------------
	var aYonghu =  cookieUntil.getCookie("name");
	
	$("#userId").focus(function(){
		$("#userId_error").css("display","none");
		$("#user_ok").css("display","none");
		$("#user").html("");
		$(this).addClass("light");
	})
	$("#userId").blur(function(){
		var str = $('#userId').val();
		$(this).removeClass("light");
		if(str == ""){
			$("#user").html("请输入手机号");
		}
		var reg1 = /^((\d{3}-\d{8}|\d{4}-\d{7,8})|(1[3|5|7|8][0-9]{9}))$/
		//console.log(aYonghu.length,str.length);
		if(str !=""){
			if(!reg1.test(str)){
				$("#userId_error").css("display","block");
				$("#user_ok").css("display","none");
				$("#userid").html("请输入格式正确的手机号")
				Tag = false;
			}else if(str == aYonghu){
				console.log("aa")
				$("#userId_error").css("display","block");
				$("#userid").html("户名存在");
				Tag = false;
		   }else{
				$("#userId_error").css("display","none");
				$("#user_ok").css("display","block");
				Tag = true;
			}
		}
		
	})
	//-----------------验证码------------------
	
	$("#yanZhengCode").focus(function(){
		$("#yanzheng").html("");
		$(this).addClass("light");
		$("#oYan").css("display","none");
		$("#zheng").css("display","none");
	})
	$("#yanZhengCode").blur(function(){
		var yanstr = $('#yanZhengCode').val();
		$(this).removeClass("light");
		if(yanstr == ""){
			$("#yanzheng").html("请输入验证码");
		}
		if(yanstr != ""){
			var $tlt = $("#oimg").attr("tltName");
			if(yanstr == $tlt){
				$("#zheng").css("display","block");
				$("#oYan").css("display","none");
				Tag = false;
			}else{
				$("#oYan").css("display","block");
				$("#zheng").css("display","none");
				Tag = true;
			}
		}
	})
	//---------------免费获取校验--------------
	$("#code").focus(function(){
		$("#yanZhengCode_moren").html("");
		$(this).addClass("light");
	})
	$("#code").blur(function(){
		var $oCode = $("#code").val();
		$("#yanZhengCode_moren").html("");
		$(this).removeClass("light");
		if($oCode == ""){
			$("#yanZhengCode_moren").html("请输入验证码");
		}
	})
	//---------------密码验证-----------------
	$("#passWord").focus(function(){
		$("#passWord_moren").html("");
		$(this).addClass("light");
		$("#mimakuang").css("display","none");
		$("#passWord_ok").css("display","none");
	})
	$("#passWord").blur(function(){
		var reg3 = /^[\w.]{6,16}$/;
		var $pass = $("#passWord").val();
		$(this).removeClass("light");
		if($pass == ""){
			$("#passWord_moren").html("请输入密码");
		}
		if($pass != ""){
			if(!reg3.test($pass)){
				$("#mimakuang").css("display","block");
				$("#mima").html("密码长度只能在6-16位字符之间");
				$("#passWord_ok").css("display","none");
				Tag = false;
			}else{
				$("#mimakuang").css("display","none");
				$("#passWord_ok").css("display","block");
				Tag = true;
			}
		}
	})
	//-------------------确认密码------------------
	$("#repeatPassWord").focus(function(){
		$("#opass").html("");
		$(this).addClass("light");
	})
	$("#repeatPassWord").blur(function(){
		$(this).removeClass("light");
		var $oWord = $("#repeatPassWord").val();
		if($oWord == ""){
			$("#opass").html("请输入确认密码");
		}
		if($oWord != ""){
			if($oWord != $("#passWord").val()){
				$("#shuru").css("display","block");
				$("#sure").css("display","none");
				$("#queren").html("两次输入密码不一致");
				Tag = false;
			}else{
				$("#shuru").css("display","none");
				$("#sure").css("display","block");
				Tag = true;
			}
		}
	})
	//----------------注册成功---------------
	$("#sub").click(function(){
		if(Tag){
			cookieUntil.setCookie("name",$('#userId').val(),7);
			cookieUntil.setCookie("pass",$("#passWord").val(),7);
			cookieUntil.setCookie("tag","1",7);
			location.href="denglu.html";
		}
	})
	
})
