$( document ).ready(function(){
	var userid = sessionStorage.getItem("userid");

	if( userid == null ){
		window.location = "index.html";
	}

	toggleStatus = function( id, currentStatus )
	{
		var toggleStatus = {
			'id' : id,
			'currentStatus' : currentStatus
		};
		$.ajax({
			type : "GET",
			url  : "http://craftmanoj.host22.com/todo/toggleStatus.php",
			data : toggleStatus
		})
		.done(function( data ){
			var toggleStatus = data;
			if( toggleStatus == 1 ){
				$( 'todo'+id ).prop("checked", false);
			}
		})
		.fail(function(){
			displayError();
		});
	}

	removeTodo = function( id )
	{
		var removeTodo = {
			'id' : id
		};
		$.ajax({
			type : "GET",
			url  : "http://craftmanoj.host22.com/todo/deleteTodo.php",
			data : removeTodo
		})
		.done(function(){
			$( '#para'+id ).fadeOut(1000,function(){
				$( this ).remove();
			});
			// $( 'para'+id ).fadeOut(1000,function(){ $( this ).remove(); });
		})
		.fail(function(){
			displayError();
		})
	}

	displayError = function()
	{
		$( '#displayError' ).html("<div class='card-panel'><span class='red-text text-darken-2'> Something went wrong </span></div>");
		setTimeout(function() {
			$( '#displayError' ).fadeOut(100);
		}, 4000);

	}


	$.ajax({
		type : "GET",
		url  : "http://craftmanoj.host22.com/todo/getAllTodo.php"
	})
	.done(function( data ){
		var parsedTodo = $.parseJSON( data );
		var checkboxStatus = '';
		var currentStatus = '';
		for( id in parsedTodo ){
			currentStatus = parsedTodo[id]['status'];
			checkboxStatus = ( currentStatus == 2 ) ? 'checked' : '';
			$( '#todoList' ).append("<p id='para"+id+"'><input type='checkbox' id='todo"+ id +"' onclick=toggleStatus("+ id +","+ currentStatus +"); "+checkboxStatus+" /><label for='todo"+id+"'>"+ parsedTodo[id]['title'] +"</label><button class='todo-delete waves-effect waves-teal btn-flat' onclick='removeTodo("+id+")'><i class='mdi-action-delete'></i></button></p><div class='clearfix'></div>");
		}
	})
	.fail(function(){
		displayError();
	});

	$( "form[name=addTodo]" ).submit(function(){
		var newItem = $( '#newTodo' ).val();
		var newTodo = {
			'add' : newItem
		};
		
		$.ajax({
			type : "GET",
			url  : "http://craftmanoj.host22.com/todo/add.php",
			data : newTodo
		})
		.done(function( data ){
			var insertdID = data;
			$( '#todoList' ).append("<p><input type='checkbox' id='todo"+ insertdID +"' /><label for='todo"+ insertdID +"'> "+ newItem +" </label><button class='todo-delete waves-effect waves-teal btn-flat' onclick='removeTodo("+insertdID+")'><i class='mdi-action-delete'></i></button></p><div class='clearfix'></div>");
			$( '#newTodo' ).val('');
		})
		.fail(function(){

		});
		return false;
	});

	$( '#logout' ).click(function(){
		sessionStorage.clear();
		window.location = "index.html";
	});
});