function wide() {
	if ( $(window).width() > 1340 ) {
		$('body').addClass('wide');
	}
	else {
		$('body').removeClass('wide');
	}
}
function panel() {
	if ( $(window).scrollTop() < $('.header').height() ) {
		$('.panel, .control').css({
			'top': $('.header').height()-$(window).scrollTop()+'px',
			'height': $(window).height()-$('.header').height()+$(window).scrollTop()+'px'
		});
		$('.panel > div:first-child').css({
			'height': $(window).height()-$('.header').height()+$(window).scrollTop()-$('.panel .archive').outerHeight()+'px'
		});
		$('.panel .news').css({
			'height': $(window).height()-$('.header').height()+$(window).scrollTop()+'px'
		});
	}
	else {
		$('.panel, .control').css({
			'top': '0',
			'height': '100%'
		});
		$('.panel > div:first-child').css({
			'height': $(window).height()-$('.panel .archive').outerHeight()+'px'
		});
		$('.control, .panel .news').css({
			'height': $(window).height()+'px'
		});
	}
}
function panelpos() {
	if ( $(window).width() < 1340 ) {
		$('.panel, .social').css({
			'margin-left': '0'
		});
		$('.control').css({
			'margin-left': '-16px'
		});
	}
	else {
		$('.panel, .social').css({
			'margin-left': '-314px'
		});
		$('.control').css({
			'margin-left': '0'
		});
	}
}
$(window).resize(function() {
	wide();
	panel();
	panelpos();
});
$(window).scroll(function() {
	panel();
});
$(document).ready(function() {
	wide();
	panel();
	panelpos();
	var panelspeed = 1000;
	var paneleffect = 'easeInOutQuint';
	function open() {
		$('.panel').stop(true,true).animate({
			'margin-left': '-764px'
		}, panelspeed, paneleffect);
		if ( $(window).width() < 1340 ) {
			$('.control').stop(true,true).animate({
				'margin-left': '-780px'
			}, panelspeed, paneleffect);
		}
		$('.panel .preview').addClass('active');
	}
	function close() {
		$('.panel').stop(true,true).animate({
			'margin-left': '-314px'
		}, panelspeed, paneleffect);
		if ( $(window).width() < 1340 ) {
			$('.control').stop(true,true).animate({
				'margin-left': '-330px'
			}, panelspeed, paneleffect);
		}
		$('.panel .preview').removeClass('active');
	}
	$('.panel .preview h2').bind('click', function() {
		if ( $('.panel .preview').hasClass('active') ) {
			close();
		}
		else {
			open();
		}
		return false;
	});
	$('.control').bind('click', function() {
		if ( $(this).hasClass('active') ) {
			$('.panel, .social').stop(true,true).animate({
				'margin-left': '0'
			}, panelspeed, paneleffect);
			$(this).stop(true,true).animate({
				'margin-left': '-16px'
			}, panelspeed, paneleffect);
			$(this).removeClass('active');
			$('.panel .preview').removeClass('active');
		}
		else {
			$('.panel, .social').stop(true,true).animate({
				'margin-left': '-314px'
			}, panelspeed, paneleffect);
			$(this).stop(true,true).animate({
				'margin-left': '-330px'
			}, panelspeed, paneleffect);
			$(this).addClass('active');
		}
		return false;
	});
	$('.header .logo span img').css({
		'top': -Math.floor(Math.random()*$('.header .logo span img').attr('height')/37)*37+'px'
	});
	$('.date').datepicker({
		firstDay: 1,
		monthNames: [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ]
	});
	var col1
	
	var col1 = $('.panel > div:first-child');
	var col2 = $('.panel .news');
	col1.jScrollPane({
		autoReinitialise: true
	});
	col2.jScrollPane({
		autoReinitialise: true,
		animateScroll: true
	});
	var api = col2.data('jsp');
	$('.panel .preview > div > div').bind('click', function() {
		api.scrollToY($('.panel .news > div div div div:nth-child('+($(this).index()+1)+')').position().top);
		open();
		return false;
	});
	$('.wrapper').append('<div class="clear"></div>');
	$('.footer').css({
		'margin-top': -$('.footer').outerHeight()+'px'
	});
	$('.clear').css({
		'height': $('.footer').outerHeight()+'px'
	});
	var max = -1;
	$('.footer .partners > div > div img').each(function() {
		var h = $(this).attr('height')/2; 
		max = h > max ? h : max;
	});
	$('.footer .partners > div > div').each(function() {
		$(this).css({
			'margin-top': max-$(this).find('img').attr('height')/2+'px',
			'width': $(this).find('img').attr('width')+'px',
			'height': $(this).find('img').attr('height')/2+'px'
		});
		$(this).hover(
			function() {
				$(this).find('img').css({
					'top': -$(this).find('img').attr('height')/2+'px'
				});
			},
			function() {
				$(this).find('img').css({
					'top': '0'
				});
			}
		);
	});
	$('.ui-datepicker td span, .ui-datepicker td a').hover(function() {
		console.log('День '+$(this).text()+', месяц '+$(this).parent().attr('data-month')+', год '+$(this).parent().attr('data-year'));
	});
});