;(function($, window, document, undefined) {
    "use strict";

    /*============================*/
	/* SWIPER SLIDE */
	/*============================*/
	
	var swipers = [], winW, winH, winScr, _isresponsive, smPoint = 768, mdPoint = 992, lgPoint = 1200, addPoint = 1600, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

	function pageCalculations(){
		winW = $(window).width();
		winH = $(window).height();
	}

	pageCalculations();
	
	
	
	function updateSlidesPerView(swiperContainer){
		if(winW>=addPoint) return parseInt(swiperContainer.attr('data-add-slides'),10);
		else if(winW>=lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'),10);
		else if(winW>=mdPoint) return parseInt(swiperContainer.attr('data-md-slides'),10);
		else if(winW>=smPoint) return parseInt(swiperContainer.attr('data-sm-slides'),10);
		else return parseInt(swiperContainer.attr('data-xs-slides'),10);
	}

	function resizeCall(){
		pageCalculations();

		$('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function(){
			var thisSwiper = swipers['swiper-'+$(this).attr('id')], $t = $(this), slidesPerViewVar = updateSlidesPerView($t), centerVar = thisSwiper.params.centeredSlides;
			thisSwiper.params.slidesPerView = slidesPerViewVar;
			thisSwiper.reInit();
			if(!centerVar){
				var paginationSpan = $t.find('.pagination span');
				var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
				if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
				else $t.removeClass('pagination-hidden');
				paginationSlice.show();
			}
		});
	}
	if(!_ismobile){
		$(window).resize(function(){
			resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			resizeCall();
		}, false);
	}

	/*=====================*/
	/* 07 - swiper sliders */
	/*=====================*/
	function initSwiper(){
		var initIterator = 0;
		$('.swiper-container').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index + ' initialized').attr('id', index);
			$t.find('.pagination').addClass('pagination-'+index);

			var autoPlayVar = parseInt($t.attr('data-autoplay'),10);

			var slidesPerViewVar = $t.attr('data-slides-per-view');
			if(slidesPerViewVar == 'responsive'){
				slidesPerViewVar = updateSlidesPerView($t);
			}
			else slidesPerViewVar = parseInt(slidesPerViewVar,10);

			var loopVar = parseInt($t.attr('data-loop'),10);
			var speedVar = parseInt($t.attr('data-speed'),10);
            var centerVar = parseInt($t.attr('data-center'),10);
			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				speed: speedVar,
				pagination: '.pagination-'+index,
				loop: loopVar,
				paginationClickable: true,
				autoplay: autoPlayVar,
				slidesPerView: slidesPerViewVar,
				keyboardControl: true,
				calculateHeight: true, 
				simulateTouch: true,
				roundLengths: true,
				centeredSlides: centerVar,
				onInit: function(swiper){
				    $t.find('.swiper-slide').addClass('active');
				},
				onSlideChangeEnd: function(swiper){
					var activeIndex = (loopVar===1)?swiper.activeLoopIndex:swiper.activeIndex;
					var qVal = $t.find('.swiper-slide-active').attr('data-val');
					$t.find('.swiper-slide[data-val="'+qVal+'"]').addClass('active');
				},
				onSlideChangeStart: function(swiper){
					$t.find('.swiper-slide.active').removeClass('active');
				}
			});
			swipers['swiper-'+index].reInit();
				if($t.attr('data-slides-per-view')=='responsive'){
					var paginationSpan = $t.find('.pagination span');
					var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
					if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
					else $t.removeClass('pagination-hidden');
					paginationSlice.show();
				}
			initIterator++;
		});
		
	}

	

	//swiper arrows
	
	$('.swiper-arrow-left').on('click', function(){
		swipers['swiper-'+$(this).closest('.swiper-anime').find('.swiper-container').attr('id')].swipePrev();
	});

	$('.swiper-arrow-right').on('click', function(){
		swipers['swiper-'+$(this).closest('.swiper-anime').find('.swiper-container').attr('id')].swipeNext();
	});
	
	/*============================*/
	/* DROPDOWN */
	/*============================*/
	
	$('.nav-menu-icon a').on('click', function() { 
	  if ($('nav').hasClass('slide-menu')){
		   $('nav').removeClass('slide-menu'); 
		   $(this).removeClass('active');
		   $('body').css({'overflow':'auto'});
	  }else {
		   $('nav').addClass('slide-menu');
		   $(this).addClass('active');
		   $('body').css({'overflow':'hidden'});
	  }
		return false;
	 });
	
	/***********************************/
	/*WINDOW SCROLL*/
	/**********************************/
	
    $(window).scroll(function() {
	   if ($(this).scrollTop() >= 80) {
		   $('header').addClass('scrol');
		}else{
		   $('header').removeClass('scrol');
		}
	   if ($('.time-line').length) {
		 $('.time-line').not('.animated').each(function(){
		  if($(window).scrollTop() >= $(this).offset().top-$(window).height()*0.5)
		   {$(this).addClass('animated').find('.timer').countTo();}});
		}
		
		if ($('.start-line').length){
			if($(window).scrollTop() >= $('.start-line').offset().top - $('.start-line').height()){
				 $('.skill-line div').each(function(){
							var objel = $(this);
							var pb_width = objel.attr('data-width-pb');
							objel.css({'width':pb_width});
						});
			  }
		 }
	});
	
    $('.up-button').on('click', function(){
		$('body, html').animate({'scrollTop':'0'});
		   return false;
	});	
	
	/***********************************/
	/*IZOTOPE*/
	/**********************************/
	
	if ($('.izotope-container').length) {
	 var $container = $('.izotope-container');
	  $container.isotope({
		itemSelector: '.item',
		layoutMode: 'masonry',
		masonry: {
		  columnWidth: '.grid-sizer'
		}
	  });
	}	
    function getItemElements() {
	  var $item = $('.item').slice(4).clone();
	    return $item;
	}
	
	$('.load-more a').on( 'click', function(e) {
	  e.preventDefault();
	     $(this).fadeOut(300);
	     $('.work-section').append('<span class="no-more">no more projects</span>');
		    var $elems = getItemElements();
			  $container.append( $elems ).isotope( 'appended', $elems );
	});
		
    $('#filters').on('click', '.but', function() {
	  $('.izotope-container').each(function(){
	     $(this).find('.item').removeClass('animated');
	});
		
	$('#filters .but').removeClass('activbut');
	  $(this).addClass('activbut');
		 var filterValue = $(this).attr('data-filter');
			$container.isotope({filter: filterValue});
			  });
     

	/***********************************/
	/*GOOGLE MAP*/
	/**********************************/
	
	function initialize(obj) {
		var stylesArray = {
		'style-1' : {
    		'style': [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
		}
		}

		var lat = $('#'+obj).attr("data-lat");
        var lng = $('#'+obj).attr("data-lng");
		var contentString = $('#'+obj).attr("data-string");
		var myLatlng = new google.maps.LatLng(lat,lng);
		var map, marker, infowindow;
		var image = $('#'+obj).attr("data-marker");
		var zoomLevel = parseInt($('#'+obj).attr("data-zoom"),10);
		var styles = stylesArray[$('#map-canvas-contact').attr("data-style")]['style'];
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
	    
		var mapOptions = {
			zoom: zoomLevel,
			disableDefaultUI: true,
			center: myLatlng,
            scrollwheel: false,
			mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
		}
		
		map = new google.maps.Map(document.getElementById(obj), mapOptions);
	
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
	
		infowindow = new google.maps.InfoWindow({
			content: contentString
		});
      
	    
        marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image
		});
	
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
	
	}
	
	/***********************************/
	/*STYLE BAR*/
	/**********************************/
	
	$('.conf-button').on('click', function(){
		if ($('.style-page').hasClass('slide-right')){
		    $('.style-page').removeClass('slide-right'); 
			$('.conf-button span').removeClass('act');
		}else{
		    $('.style-page').addClass('slide-right');
			$('.conf-button span').addClass('act');
		}return false;			 
    });
	
	 $('.entry').on('click', function(){
		  var prevTheme = $('body').attr('data-color');
		  var newTheme = $(this).attr('data-color');
		  if($(this).hasClass('active')) return false;
		  $(this).parent().find('.active').removeClass('active');
		  $(this).addClass('active');
		  $('body').attr('data-color', newTheme);
		  $('img').each(function() {
		   $(this).attr("src", $(this).attr("src").replace(prevTheme+'/', newTheme+'/'));
		  });
		     $('.map-canvas').attr('data-marker', $('.map-canvas').attr('data-marker').replace(prevTheme+'/', newTheme+'/')) 
	         localStorage.setItem("color", newTheme);
	 });

	var localStorageThemeVar = localStorage.getItem('color');
	$('.entry[data-color="'+localStorageThemeVar+'"]').click();
	
	/***********************************/
	/*POPUP*/
	/**********************************/
	
	if ($('.popup-gallery').length) {
		$('.popup-gallery').magnificPopup({
			delegate: 'a',
			type: 'image',
			removalDelay: 300,
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-fade',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] 
			},
			zoom: {
				enabled: true,
				duration: 300, 
				easing: 'ease-in-out',
				opener: function(openerElement) {
				  return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});
	}
	
	/*============================*/
	/* WINDOW LOAD */
	/*============================*/
	
	$(window).load(function(){
		
		$('#loading').hide();
		
		if($('#map-canvas-contact').length==1){
		  initialize('map-canvas-contact');}
		
	    initSwiper();
		
		if ($('.izotope-container').length) {
		 var $container = $('.izotope-container');
		  $container.isotope({
			itemSelector: '.item',
			layoutMode: 'masonry',
			masonry: {
			  columnWidth: '.grid-sizer'
			}
		  });
		}
	});


})(jQuery, window, document);

