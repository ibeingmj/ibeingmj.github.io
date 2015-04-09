$( document ).ready(function(){
	var selector,hint;
	formHint = function( selector, hint )
	{
		$( '#'+selector ).focus(function(){
			$( '#formHint' ).slideDown(1000,function(){
				$( '#formHint' ).html( hint );
			});
		});
	}

	$( '#username' ).focus(function(){
		selector = 'username';
		hint     = 'This will be your Login Username. Hope you make it sweet and cute. ;)';
		formHint( selector, hint );
	});

	$( '#password' ).focus(function(){
		selector = 'password';
		hint     = 'Please make it secure and never disclose with any one');
		formHint( selector, hint );
	});

		
	$( '#username,#password' ).focusout(function(){
		$( '#formHint' ).fadeOut(1000);
	});
});