$(function(){
	var aName =  cookieUntil.getCookie("name");
	var aPass = cookieUntil.getCookie("pass");
	var username = cookieUntil.getCookie("username");
	var Tag = false;
	//----------------用户名验证-----------------
	$("#ouserId").focus(function(){
		$("#error").css("display","none");
		$("#ming").css("display","none");
		$("#userId_MoRen").html("");
		$(this).addClass("light");
	})
	$("#ouserId").blur(function(){
		var $strr = $('#ouserId').val();
		$(this).removeClass("light");
		if($strr == ""){
			$("#userId_MoRen").html("请输入手机号");
			Tag = false;
		}
		var reg1 = /^((\d{3}-\d{8}|\d{4}-\d{7,8})|(1[3|5|7|8][0-9]{9}))$/
		if($strr !=""){
			if(!reg1.test($strr)){
				$("#error").css("display","block");
				$("#ming").css("display","none");
				$("#kuang").html("请输入格式正确的手机号")
				Tag = false;
			}else if($strr != aName){
				console.log("aa")
				$("#error").css("display","block");
				$("#kuang").html("户名不存在");
				Tag = false;
		   }else{
				$("#error").css("display","none");
				$("#ming").css("display","block");
				Tag = true;
			}
		}
		
	})
	//---------------------密码验证--------------------
	
	$("#passWord").focus(function(){
		$("#tishi").html("");
		$(this).addClass("light");
		$("#denglu_error").css("display","none");
		$("#dengluOk").css("display","none");
	})
	$("#passWord").blur(function(){
		var reg3 = /^[\w.]{6,16}$/;
		var $dengPass = $("#passWord").val();
		$(this).removeClass("light");
		if($dengPass == ""){
			$("#tishi").html("请输入密码");
			Tag = false;
		}
		if($dengPass != ""){
			if(!reg3.test($dengPass)){
				$("#denglu_error").css("display","block");
				$("#denglu_xin").html("密码长度只能在6-16位字符之间");
				$("#dengluOk").css("display","none");
				Tag = false;
			}else if($dengPass != aPass){
				$("#denglu_error").css("display","block");
				$("#denglu_xin").html("您输入的账户名和密码不匹配，请重新输入");
				Tag = false;
			}else if($dengPass == aPass){
				$("#denglu_error").css("display","none");
				$("#dengluOk").css("display","block");
				Tag = true;
			}
		}
	})
	//-------------------登录操作------------------
	$("#denglu").click(function(){
		if(Tag){
			cookieUntil.setCookie("tag","1",7);
			location.href="index.html";
		}
	})
	$("#jizhu").click(function(){
		cookieUntil.setCookie("username",$('#ouserId').val(),7);
	})
	console.log(username);
	window.onload = function(){
		if(username != ""){
			$("#userId_MoRen").html("");
			$('#ouserId').val(username);
			$("#jizhu").attr("checked","checked")
		}
	}
	
	$("#kuaizhu").click(function(){
		window.open("zhuce.html");
	})
	
})
