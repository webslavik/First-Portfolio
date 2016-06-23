//= jquery.js
//= bxslider.js
//= fancy.js
//= inputmask.js

var unl = 0;

$(window).scroll(function(){
	var st = $(this).scrollTop();
	if ( st >= $('header').outerHeight() ) {
		$('nav').addClass('navf');
		$('nav').fadeIn('slow');
	}
	else {
		$('nav').removeClass('navf');
		$('nav').fadeOut();
	}

	$('nav li a').each(function(){
		var x = $(this).attr('href');
		var ot = st + $('nav').height() + 1;
		if ( ot >= $(x).offset().top/1 && ot <= $(x).offset().top + $(x).height() ) {
			$(this).addClass('mcurrt');
		}
		else {
			$(this).removeClass('mcurrt');
		}
	});

});

$(".fancy").fancybox();

$(".sl1").bxSlider({
	pagerCustom:"#sln"
});

$(".sl2").bxSlider({
	pagerCustom:"#sl2",
	controls:false
});

$(".sl3").bxSlider({
	pagerCustom:"#sl3",
	controls:false
});

$(".sl4").bxSlider({
	pagerCustom:"#sl4",
	controls:false
});

$('#sl5 a').click(function(){
	$('#sl5 a').removeClass('current');
	$(this).addClass('current');
});

$('.lmenu').click(function(){
	$(this).hide();
	if ( $(window).width() < 980 ) {
	  $('nav ul, nav .zak').toggleClass('show');
	} else {
	  $('nav ul').css('display','inline-block');
	  $('nav .zak').removeClass('show');
  }
});

$('nav li a').click(function(){
	if ( $(window).width() < 980 ) {
		$('.lmenu').fadeIn();
	  $('nav ul, nav .zak').toggleClass('show');
	}
});

$(" a[href*=#]").bind("click",function(b){
	var a=$(this);
	$("html, body").stop().animate({
		scrollTop:$(a.attr("href")).offset().top - $('nav').height()
	},1000);
	b.preventDefault();
});

$('.overlay,.close,.look').click(function(){
	$('#popup,#r1,#r2,#r3').fadeOut();
});

$('#bcl .overlay,#bcl .close').click(function(){
	$('#bcl').fadeOut();
 	unl = 1;
 });

$('.b6 .zak').click(function() {
	$('#popup').fadeIn();
	$('#popup h2').html('Заказать тандыр');
	$('#popup .tt').val( $('#popup h2').html() );
});

$('.b2 .rec1, .b2 .clim1').click(function() {
	$('#r1').fadeIn();
});

$('.b2 .rec2, .b2 .clim2').click(function() {
	$('#r2').fadeIn();
});

$('.b2 .rec3, .b2 .clim3').click(function() {
	$('#r3').fadeIn();
});


$('nav .zak, header .buy').click(function() {
	$('#popup').fadeIn();
	$('#popup h2').html('Заказать звонок');
	$('#popup .tt').val( $('#popup h2').html() );
});
$('.m1').click(function() {
	$('#popup').fadeIn();
	$('#popup h2').html('Заказать тандыр Ханский');
	$('#popup .tt').val( $('#popup h2').html() );
});

$('.m2').click(function() {
	$('#popup').fadeIn();
	$('#popup h2').html('Заказать тандыр Сабантуй');
	$('#popup .tt').val( $('#popup h2').html() );
});

$('.m3').click(function() {
	$('#popup').fadeIn();
	$('#popup h2').html('Заказать тандыр Семейный');
	$('#popup .tt').val( $('#popup h2').html() );
});

$('.m4').click(function() {
	$('#popup').fadeIn();
	$('#popup h2').html('Заказать тандыр Пикник');
	$('#popup .tt').val( $('#popup h2').html() );
});

$('footer a.form').click(function() {
	$('#popup').fadeIn();
	$('#popup h2').html('Вопрос менеджеру');
	$('#popup .tt').val( $('#popup h2').html() );
});

function recs() {
	$('.recepts .cont').height( $(window).height() - 20 );
}

$(document).ready(function(){
	recs();
	$(".tel").inputmask("mask",{mask:"+9(999)999-99-99",clearIncomplete:true});

	if ( $(window).width() < 700 ) {
		var i = 0, otz = [], j = 0;
		$('#otz .cont').each(function(){
			if (otz.indexOf( $(this).html() ) == -1) otz.push( $(this).html() );
			i++;
		});
		$('.sl5').html('');
		while ( j < otz.length ) {
			$('.sl5').html( $('.sl5').html() + '<li><div class="cont">'+otz[j]+'</div></li>' );
			j++;
		}
	}
	else {
		$('.b4 .sl img').addClass('imghov');
	}

	$(".sl5").bxSlider({
		adaptiveHeight: true,
		captions: true,
    controls: false
	});

});

$(window).resize(function(){
	recs();
});


$('.sfrm').submit(function(e){
    var t = $(this).children('.tel');
    var f = $(this).children('.fio');
    var ca = $(this).children('.capcha');

    if ( t.val() !== '' && f.val() !== '' && ca.val() !== '' ) {
    	unl = 1;
    	return true;
	}
	else {
		if (t.val() === '') {
			$(this).children('.p4').css('color','red');
		}
		if (f.val() === '') {
			$(this).children('.p3').css('color','red');
		}
		if (ca.val() === '') {
			$(this).children('.p5').css('color','red');
		}
	    e.preventDefault();
	}
});

$('input').click(function(){
	$(this).parent().children('p').css('color', 'inherit');
});

$(window).on('beforeunload', function(){
    if (unl === 0) {
        $('#bcl').fadeIn();
        return 'Хотите 15 дней тест-драйва?';
    }
});

var $_GET = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    $_GET[decode(arguments[1])] = decode(arguments[2]);
});

$(function(){

	if($_GET.utm_source !='undefined') $("input[name='utm_source']").val($_GET.utm_source);
	if($_GET.utm_medium !='undefined') $("input[name='utm_medium']").val($_GET.utm_medium);
	if($_GET.utm_term !='undefined') $("input[name='utm_term']").val($_GET.utm_term);
	if($_GET.utm_campaign !='undefined') $("input[name='utm_campaign']").val($_GET.utm_campaign);
	if($_GET.utm_content !='undefined') $("input[name='utm_content']").val($_GET.utm_content);

	});
