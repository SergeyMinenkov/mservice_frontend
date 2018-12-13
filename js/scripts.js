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
		$('#order-steps-1').css('background-color', '#34AD00');
		$('#order-steps-2').css('background-color', '#A0A0A0');
		$('#order-steps-3').css('background-color', '#A0A0A0');
	});
	// кнопка "К услугам" на шаг 2
	$('#go-back-step2').click(function() {
		showcart();
		$('#order-steps-1').css('background-color', '#A0A0A0');
		$('#order-steps-2').css('background-color', '#34AD00');
		$('#order-steps-3').css('background-color', '#A0A0A0');
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
		// изменить цвет круга "Шаг 1" и "Шаг 2"
		$('#order-steps-1').css('background-color', '#A0A0A0');
		$('#order-steps-2').css('background-color', '#34AD00');
		$('#order-steps-3').css('background-color', '#A0A0A0');
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
				$('#order-steps-1').css('background-color', '#A0A0A0');
				$('#order-steps-2').css('background-color', '#A0A0A0');
				$('#order-steps-3').css('background-color', '#34AD00');
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
				'<td>' + $(this.parentNode.parentNode).find('a').html() + ' <i class="fa fa-close" title="Удалить"></i></td>' +
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
		// удалить услугу из списка, перед этим запомнить ее № в списке
		var cartLiIndex = $(this).closest('li').index();
		$(this).closest('li').remove();
		
		// удалить услугу из корзины, если ее № в корзине = № в списке
		$('#table-order-step3').find('.counter').each(function() {
				// проверяем, если № услуги в корзине = № в списке
				if( Number($(this).html()) == Number(cartLiIndex+1)) {
					// тогда - удаляем tr
					$(this.parentNode).remove();
				}
			});
		
		//показать "Корзина пуста..." если список пуст
		$('#cart-list').each(function(){
			if( $(this).find('li').length == 0 ) {
				$('#cart-empty-text').show();
			}
		});

	});
	
	/* Страница "Рекомендуемые проверки" */
	
	// посчитать "Итого" в блоке комплекса
	function calcTotalComplex() {
		// обработать в цикле все блоки комплексов
		$('.recommended-block').each(function(){
			var total = 0;
			// внутри комплекса посчитать "Итого" у включенных "чекбоксов"
			$(this).find('.check-sum').each(function(){
				// проверяем, включен ли "чекбокс"
				if($(this.parentNode).find('input[type="checkbox"]').is(':checked')) {
					total = parseFloat(total) + parseFloat($(this).html());
				}
				
			});
			// вывести "Итого"
			$(this).find('.check-sum-total').html(total);
			// если "Итого" = 0, заблокировать кнопку "Выбрать"
			if($(this).find('.check-sum-total').html() === '0') {
				$(this).find('.check-order-btn-block button').addClass('hidden');
			} else {
				$(this).find('.check-order-btn-block button').removeClass('hidden');
			}
		});
	}
	
	// пересчитать "Итого" комплексов при загрузке и обновлении страницы
	$(document).ready(function() {
		calcTotalComplex();
	});
	
	// пересчитать "Итого" комплекса при клике на "чекбокс"
	$('.recommended-block').find('input[type="checkbox"]').change(function() {
		calcTotalComplex();
	});
	
	// обработчик нажатия на кнопку "Выбрать" в блоке комплекса
	$('.check-order-btn-block').on('click', 'button', function () {
		// получаем название текущего комплекса из <h3>
		var complexName = $(this.parentNode.parentNode).find('h3').html();
		// получаем стоимость текущего комплекса из class="check-sum-total"
		var complexPrice = $(this.parentNode.parentNode).find('.check-sum-total').html();
		// делаем блок с формой заказа видимой
		$('#recommended-order-block').removeClass('hidden');
		// прописываем название выбранного комплекса
		//$('#selected-complex').find('h3').html(complexName);
		// прописываем стоимость выбранного комплекса
		//$('#selected-complex').find('h4 span').html(complexPrice);
		
		// делаем невидимыми все комплексы, кроме выбранного
		$('.recommended-block').each(function(){
			if ($(this).find('h3').html() != complexName) {
				$(this).hide();
			}
		});
		// изменяем заголовок h1
		$('#recommended').find('h1').html('<i class="fa fa-shopping-basket"></i> Ваш заказ:');
		// показываем ссылку "К выбору рекомендуемых проверок"
		$('#go-recommended-checks').removeClass('hidden');
		// прячем кнопку "Выбрать"
		$(this).hide();
	});
	
	/* вернуться в список рекомендуемых проверок 
		и восстановить отображение всех блоков по умолчанию
	*/
	$('#go-recommended-checks').click(function(event) {
		// отключаем переход по ссылке по умолчанию
		event.preventDefault();
		// включаем в цикле все блоки комплексов и кнопки "Выбрать"
		$('.recommended-block').each(function(){
			$(this).show();
			$(this).find('.check-order-btn-block button').show();
		});
		//$('.check-order-btn-block').show();
		// изменяем заголовок h1
		$('#recommended').find('h1').html('Рекомендуемые проверки');
		// прячем блок "Как с вами связаться"
		$('#recommended-order-block').addClass('hidden');
		// прячем ссылку "К выбору рекомендуемых проверок" 
		$(this).addClass('hidden');
	});
	
	/* 
		делаем навигацию для комплексов. Навигация будет внутри страницы по
		якорям.	Для этого нужно каждому комплексу задать id.
		Создаем функцию, которая сработает сразу при загрузке документа.
		id будем создавать по шаблону recommended-block-1...2...3...
		Счетчик храним в переменной recommended-block-count.
		В функции в цикле перебираем все блоки recommended-block и 
		добавляем им атрибут (attr) id.
		Увеличиваем счетчик ++
	*/
	$(document).ready(function () {
		var mainID = $('main').attr('page-id');
		if(mainID == 'complex'){
			$('#recommended-menu').removeClass('hidden');
			var recommendedBlockCount = 1;
			$('.recommended-block').each(function(){
				$(this).attr('id','recommended-block' + recommendedBlockCount);
				$('#recommended-menu').find('ol').append('<li>'
					+ '<a href="#' + $(this).attr('id') 
					+ '" class="scrolling-links">' 
					+ $(this).find('h3').html() + '</a></li>'
				);
				recommendedBlockCount++;
			});
		}
	});
	
	/*
	мсервис:
-----------
добавить шаги (три шага) на всех этапах

на втором шаге добавить "подробнее" в услугу (аккордеон)
и над селектом "Выбрать сроки и стоимость"

в таблице на шаге 3 крестик удаления
	*/