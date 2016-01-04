// JavaScript Document
//redirecting function
function redirect(locale){
	$.mobile.changePage(locale, "slide");
}
//disable ajax
$(document).bind('pagecreate',function(){
	$.mobile.ajaxEnabled = false;
	console.log('Event Binded');
});

$( document ).on( "pagecreate", "#main_page", function() {
    $( document ).on( "swipeleft swiperight", "#main_page", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            } else if ( e.type === "swipeleft" ) {
                $( "#right-panel" ).panel( "open" );
            }
        }
    });
});

//ajax setup
$.ajaxSetup({cache:false,beforeSend: function(){
					  /*$('#display').hide();*/
					  $('#loading').show();
				  },complete: function(){
					  $('#loading').hide();
					  /*$('#display').show();*/
				  },success: function(){
					  $('#loading').hide();
					  /*$('#display').show();*/
				  }, error: function(e){
					  alert('Please Check Your Network Connection');
					  console.log('xhr: '+ e.xhr +'\n Status:' + e.status + '\n Error:' + e.error);
				  }
			});

//Do Usernames
	$(document).on("pagecreate","#page1",function(){
			//check for username
			if(!window.localStorage['user']){
				console.log('Go to Registration Page');
				window.location="main.html#reg";
			}else{
				var user = window.localStorage['user'];
				$('#userId').html(user);
				//$('#userId').attr('value',user);
				$('#userId').refresh;
				console.log(user);
			}
		});
		
//Exit the APP
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){
    document.addEventListener("backbutton", function(e){
      // if($.mobile.activePage.is('#homepage')){
		  if(!confirm('Are you sure you want to Exit?')){
			  navigator.app.exitApp();
			  e.preventDefault();
			  console.log('back fired');
		  }
       //}
       //else {
         //  navigator.app.backHistory()
       //}
    }, false);
}