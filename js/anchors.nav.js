$(function(){

	var contentTop = {}, contentOffset = 0, currentAnchor = window.location.hash.replace('/', ''), scrollFlag = 0, scrollLinkSelector = '.anchor-scroll';

	// Stop animated scroll if the user does something
	$('html,body').bind('scroll mousedown DOMMouseScroll mousewheel keyup', function(e){
		if ( (e.which > 0 || e.type == 'mousedown' || e.type == 'mousewheel') && scrollFlag ){

			$('html,body').stop();
			scrollFlag = 0;
			setScrollAnchor();
		}
	});

	// Animate scroll after clicking menu link
	$(scrollLinkSelector).on('click', function(){
		setImmediateAnchor($(this), 800);
		return false;
	});

	// Fill object with scroll blocks data (offset and height)
	function setContentTopObject(){
		contentTop = {};
		$(scrollLinkSelector).each(function(){
			var $this = $( $(this).attr('href') );
			contentTop[$(this).attr('href')] = {'top':$this.offset().top - contentOffset, 'bottom':$this.offset().top  - contentOffset + $this.outerHeight()};
		});


	}

	// Set browser bar anchor during scrolling
	function setScrollAnchor(){
		if(!scrollFlag){
			var scrollPositionTop = $(window).scrollTop();
			for(var p in contentTop){
				if(contentTop[p].top<=scrollPositionTop && contentTop[p].bottom>scrollPositionTop && currentAnchor!=p){

	
					/*-----console test-----*/

					$(scrollLinkSelector).removeClass('active');
					$(scrollLinkSelector+'[href="'+p+'"]').addClass('active');
					window.location.hash = '#/'+p.substr(1);
					currentAnchor = p;
					break;
				}
			}
		}
	}

	// Set browser bar anchor immediately
	function setImmediateAnchor(anchorObject, time){
		scrollFlag = 1;
		$('html,body').stop().animate({ 'scrollTop' : contentTop[anchorObject.attr('href')].top }, time, function(){
			$(scrollLinkSelector).removeClass('active');
			anchorObject.addClass('active');
			$('nav').removeClass('slide-menu');
			$('.nav-menu-icon a').removeClass('active');
			$('body').css({'overflow':'auto'});
			window.location.hash = '#/'+anchorObject.attr('href').substr(1);
			var currentAnchor = anchorObject.attr('href');
			scrollFlag = 0;
		});
	}

	

	$(window).load(function(){
		setContentTopObject();
		if(currentAnchor) setImmediateAnchor($(scrollLinkSelector+'[href="'+currentAnchor+'"]'), 1);
	});

	$(window).scroll(function(){
		setScrollAnchor();
	});

	$(window).resize(function(){
		setContentTopObject();
	});

	

});