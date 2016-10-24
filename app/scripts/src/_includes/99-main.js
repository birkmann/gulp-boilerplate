$(document).ready(function(){

	$('input, textarea').placeholder();

	$(".nav-toggle").click(function(){
		$("body").toggleClass("open");
		$(".header-main .right").slideToggle(300);
	});

});