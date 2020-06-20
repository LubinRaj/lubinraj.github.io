/* ===================================
--------------------------------------
  NISSA - PHOTOGRAPHY STUDIO TEMPLATE
  Version: 1.0
 -------------------------------------
 =====================================*/


'use strict';

$(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut();
	$("#preloder").delay(400).fadeOut("slow");

});

(function($) {
	/*------------------
		Navigation
	--------------------*/
	$('.nav-switch').on('click', function() {
		$('.main-site-warp').addClass('push-side');
		$('body').addClass('push-side');
		setTimeout(function(){
			hero_section();
		}, 400)
		
	});
	$('.close-menu').on('click', function() {
		$('.main-site-warp').removeClass('push-side');
		setTimeout(function(){
			$('body').removeClass('push-side');		
		}, 400);
	});


	/*------------------
		Background Set
	--------------------*/
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});


	/*------------------
	   Custom Scrollbar
	--------------------*/
	function site_scrollbar() {

		if ($(window).width() > 991) {
			$(".main-sidebar").niceScroll({
				cursorborder:"",
				cursorcolor:"#f1f1f1",
				boxzoom:false,
				cursorwidth: 4,
				cursorborderradius:0,
			});
		
			$(".about-section, .contact-section, .elements-section").niceScroll({
				cursorborder:"",
				cursorcolor:"#f1f1f1",
				boxzoom:false,
				cursorwidth: 4,
				cursorborderradius:0,
			});
		
			$(".blog-posts").niceScroll({
				cursorborder:"",
				cursorcolor:"#242424",
				boxzoom:false,
				cursorwidth: 4,
				autohidemode:true,
				background: '#eeeeee',
				railoffset: { top: 50, right: 0, left: 40, bottom: 0 },
				railpadding: { top: 0, right: 0, left: 0, bottom: 100 },
			});
		
			$(".portfolio-section").niceScroll({
				cursorborder:"",
				cursorcolor:"#242424",
				boxzoom:false,
				cursorwidth: 4,
				autohidemode:true,
				background: '#eeeeee',
				railoffset: { top: 50, right: 0, left: -14, bottom: 0 },
				railpadding: { top: 0, right: 0, left: 0, bottom: 100 },
			});
		}
		
	}
	site_scrollbar();
	

	/*------------------
		Video Popup
	--------------------*/
	$('.video-popup').magnificPopup({
		type: 'iframe'
	});

	/*------------------
		Hero section
	--------------------*/
	function hero_section() {
		if ($(window).width() > 768) {
			
			var ps_w = $('.page-section').innerWidth();
			$('.hs-item').width(ps_w / 2);
			var trackW = (($('.hs-item').width()) * $('.hs-item').length) + ($('.hs-item').length * 50);
			$('.hero-track').width(trackW);

			var hs_width =  $(window).innerHeight() - 170;
			$('.hs-item').height(hs_width);

			$(".hero-scroll").niceScroll({
				cursorborder:"",
				cursorcolor:"#242424",
				boxzoom:false,
				cursorwidth: 4,
				autohidemode:false,
				background: '#eeeeee',
				cursorborderradius:0,
				railoffset: { top: 0, right: 50, left: 0, bottom: 0 },
				railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
			});
		}
		if ($(window).width() < 768) {
			$('.hero-track').addClass('owl-carousel')
			$('.hero-track').owlCarousel({
				loop: true,
				margin: 0,
				nav: true,
				items: 1,
				dots: false,
				margin: 30,
				navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
			});
		}
	}

	hero_section();

	$(window).resize(function () { 
		hero_section();
		site_scrollbar();
	});

	
	/*------------------
		Accordions
	--------------------*/
	$('.panel-link').on('click', function (e) {
		$('.panel-link').parent('.panel-header').removeClass('active');
		var $this = $(this).parent('.panel-header');
		if (!$this.hasClass('active')) {
			$this.addClass('active');
		}
		e.preventDefault();
	});

	/*------------------
		Progress Bar
	--------------------*/
	$('.progress-bar-style').each(function() {
		var progress = $(this).data("progress");
		var prog_width = progress + '%';
		if (progress <= 100) {
			$(this).append('<div class="bar-inner" style="width:' + prog_width + '"><span>' + prog_width + '</span></div>');
		}
		else {
			$(this).append('<div class="bar-inner" style="width:100%"><span>' + prog_width + '</span></div>');
		}
	});

	/*------------------
		Circle progress
	--------------------*/
	$('.circle-progress').each(function() {
		var cpvalue = $(this).data("cpvalue");
		var cpcolor = $(this).data("cpcolor");
		var cpid 	= $(this).data("cpid");

		$(this).prepend('<div class="'+ cpid +' circle-warp"></div><h2>'+ cpvalue +'<span>%</span></h2>');

		if (cpvalue < 100) {

			$('.' + cpid).circleProgress({
				value: '0.' + cpvalue,
				size: 84,
				thickness: 5,
				fill: cpcolor,
				emptyFill: "rgba(0, 0, 0, 0)"
			});
		} else {
			$('.' + cpid).circleProgress({
				value: 1,
				size: 84,
				thickness: 5,
				fill: cpcolor,
				emptyFill: "rgba(0, 0, 0, 0)"
			});
		}
	});

})(jQuery);
