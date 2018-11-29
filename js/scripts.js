/*
 * Java-скрипты
 */

	/* toTop Button */
	
		$(function() { 
			$(window).scroll(function() { 
			if($(this).scrollTop() != 0) { 
				$('#toTop').fadeIn(); 
					} else {	 
						$('#toTop').fadeOut(); 
					}	 
				}); 
				$('#toTop').click(function() { 
				$('body,html').animate({scrollTop:0},800); 
			}); 
		});
	
	
	/*Fix menu */
	
	$(document).ready(function(){
	        var $menu = $("#main-menu-container");
	        $(window).scroll(function(){
	            if ( $(this).scrollTop() > 100 && $menu.hasClass("default") ){
	                $menu.removeClass("default").addClass("fixed");
	            } else if($(this).scrollTop() <= 100 && $menu.hasClass("fixed")) {
	                $menu.removeClass("fixed").addClass("default");
			}
		});//scroll
	});
	
	/*scroll to anchor */
	$(document).ready(function() {
		$("a.scrolling-links").click(function () {
		  var elementClick = $(this).attr("href");
		  var destination = $(elementClick).offset().top-50;
		  $('html,body').animate( { scrollTop: destination }, 1100 );
		  return false;
		});
	});
	
	/* active-menu-main */
		function ActiveLinksMain(id){
			try{
				var el=document.getElementById(id).getElementsByTagName('a');
					var url=document.location.href;
					for(var i=0;i<el.length; i++){
					if (url==el[i].href){
					el[i].className = 'active_menu';
					};
				};
			}
			catch(e){}
			};

	
	/* swiper slider */
	$(document).ready(function () {
    //initialize swiper when document ready
    var mySwiper = new Swiper ('.swiper-container', {
		// Optional parameters
		autoplay: {
			delay: 5000,
			},
		pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				//type: 'progressbar',
				bulletElement: 'span',
				bulletClass: 'swiper-pagination-bullets',
				bulletActiveClass: 'swiper-pagination-bullet-active',
				clickable: true
			},
		navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		mousewheel: {
			invert: true,
			},
		effect: 'fade',
		fadeEffect: {
			crossFade: true
			},
		coverflowEffect: {
			rotate: 30,
			slideShadows: false,
			},
		loop: true
		})
	});
	
	function showcart() {
		//document.getElementById('cart-container').style.display = 'block';
		$('#cart-container').show();
	}
	
	function hidecart() {
		//document.getElementById('cart-container').style.display = 'none';
		$('#cart-container').hide();
	}
	
	// кнопка "Назад" на первый шаг
	$('#go-step1').click(function() {
		hidecart();
		$('#banner-on-main-container').show();
		$('.advance').show();
		$('#about-on-main').show();
		$('#banners-on-main').show();
		$('#testimonials-on-main').show();
		$('#our-clients-on-main').show();
		$('#subscribe-container').show();
	});
	// кнопка "Далее" на второй шаг
	$('#go-step2').click(function() {
		showcart();
		$('#banner-on-main-container').hide();
		$('.advance').hide();
		$('#about-on-main').hide();
		$('#banners-on-main').hide();
		$('#testimonials-on-main').hide();
		$('#our-clients-on-main').hide();
		$('#subscribe-container').hide();
		// добавить выбранный регион во все теги на шаге 2 и 3
		var selectedRegion = $('input[name="selectRegion"]:checked').val();
		$('#region-name-step2').html(selectedRegion);
		$('#region-name-step3').html(selectedRegion);

	});
	// кнопка "Заказать" на третий шаг
	$('#go-step3').click(function() {
		// если корзина пуста - показать сообщение и не переходить на шаг 3
		$('#cart-list').each(function(){
			if( $(this).find('li').length == 0 ) {
				$('#go-step3').attr('href', '#');
				alert('Не выбрано ни одной услуги');
			}
			else {
				$('#go-step3').attr('href', '#step3');
				hidecart();
			}
		});
	});

	// выбрать регион на шаге 1
	$('input[name="selectRegion"]').change(function(){ 
		var selectedRegion = $('input[name="selectRegion"]:checked').val();
		$('#region-name-step2').html(selectedRegion);
		$('#region-name-step3').html(selectedRegion);
	});
	
	// добавить услугу в корзину
	$('.select-price').on('change', function () {			
		
		if ($(this).prop('selectedIndex') != 0) {
			
			// добавить услугу в список в корзине
			$('#cart-list').append(
				$('<li>').append(
					$(this.parentNode.parentNode).find('a').html() 
						+ ', цена: <span>' 
							+ $(this).val()
								+ '</span> руб. <i class="fa fa-close" title="Удалить"></i>'
				)
			);
			// добавить услугу в таблицу на шаге 3
			// удалить строку "Итого"
			$('#table-order-step3').find('#total-tr').remove();
			// добавить строку с услугой
			$('#table-order-step3').append(
				'<tr>' + 
				'<td class="counter"></td>' +
				'<td>' + $(this.parentNode.parentNode).find('a').html() + '</td>' +
				'<td class="sum">' + $(this).val() + '</td>' + 
				'</tr>'
			);
			// добавить строку "Итого"
			$('#table-order-step3').append(
				'<tr id="total-tr">' + 
				'<td></td>' +
				'<td>Итого:</td>' +
				'<td><span class="step3-sum">0</span> <i class="fa fa-rub"></i></td>' + 
				'</tr>'
			);
			var counter = 1; // счетчик строк
			// обходим в цикле each все строки, где есть class="counter"
			$('#table-order-step3').find('.counter').each(function() {
				$(this).html(counter);	// добавляем counter
				counter++; // увеличиваем counter на 1
			});
			
			var sum = $('#sum').html();
			$('#sum').html(parseFloat(sum) + parseFloat($(this).val()));
			$('.step3-sum').html(parseFloat(sum) + parseFloat($(this).val()));
			
			//скрыть "Корзина пуста..."
			$('#cart-empty-text').hide();
			
			// показать сообщение gritter
			$.gritter.add({
				title: 'Услуга добавлена:',
				text: $(this.parentNode.parentNode).find('a').html() + '<br>' + 'Цена: ' + $(this).val() + ' руб.',
				image: 'images/logo.png',
				sticky: false,
				position: 'top-right',
				time: '5000'
			});
		}
	});
	
	// удалить услугу из корзины
	$('#cart-list').on('click', '.fa-close', function () {
		// вычесть сумму услуги из общей суммы в корзине и в таблице на шаге 3
		var sum = $('#sum').html();
		if (sum <= 0) {
			$('#sum').html('0');
			$('.step3-sum').html('0');
		} else {
			$('#sum').html( parseFloat(sum) - parseFloat($(this).closest('li').find('span').html()) );
			$('.step3-sum').html( parseFloat(sum) - parseFloat($(this).closest('li').find('span').html()) );
		}
		// удалить услугу из списка
		$(this).closest('li').remove();		
		
		//показать "Корзина пуста..." если список пуст
		$('#cart-list').each(function(){
			if( $(this).find('li').length == 0 ) {
				$('#cart-empty-text').show();
			}
		});

	});