$( document ).ready(function(){
	$( "form" ).submit(function(){
		var username = $( '#userName' ).val();
		var password = $( '#userPassword' ).val();
		// password = CryptoJS.MD5( password );
		// alert(password);
		/*return false;*/
		var formData = {
			'username' : username,
			'password' : password
		};

		$.ajax({
			type : "POST",
			url  : "http://192.168.90.12/test/authenticate.php",
			data : formData
		})
		.done(function(data){
			var parsedData = $.parseJSON( data );
			if( parsedData.status ){
				$( '#formStatus' ).addClass("text-info").text("Login Success");
				sessionStorage.setItem("userid",parsedData.userid);
				window.location = "dashboard.html";
			} else {
				$( '#formStatus' ).removeClass("text-info").addClass("text-warning").text("Username / Password is wrong !!");
				$( '#userName' ).focus();
			}
		})
		.fail(function(){
			alert('went');
		});

		return false;
	});
	return false;

});