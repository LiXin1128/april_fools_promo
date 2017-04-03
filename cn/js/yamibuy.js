/**
 * Yamibuy
 */
(function(root, factory) {

	if (typeof jQuery == "undefined") {
		throw new Error("jQuery is required.");
	}

	if (typeof define === 'function' && define.amd) {
		return define('yamibuy', [ 'jquery' ], function($) {
			return factory($, root);
		});
	} else {
		return factory(root.jQuery, root);
	}

}(window, function($, window) {
	(function($) {
		$.yamibuy = {};
	}(jQuery));

	(function($, undefined) {
		var common = {};
		$.yamibuy.common = common = {
			_loadDefaults : {
				method : "get",
				dataType : "JSON",
				crossDomain : false,
				enctype : "application/x-www-form-urlencoded"
			},
			doAjax : function(url, data, doneFn, options){
				if(typeof options === "undefined"){
					options = {};
				}
				$.ajax({
					cache : false,
					url : url,
					data : data,
					beforeSend : function() {
						if(options.showloading == true){
							common.showLoading();
						}
					},
					complete : function(){
						if(options.showloading == true){
							common.hideLoading();
						}
					},
					enctype : typeof options.enctype != "undefined" ? options.enctype : this._loadDefaults.enctype,
					dataType : typeof options.dataType != "undefined" ? options.dataType : this._loadDefaults.dataType,
					method  :	typeof options.method != "undefined" ? options.method : this._loadDefaults.method,
					crossDomain : typeof options.crossDomain != "undefined" ? options.crossDomain : this._loadDefaults.crossDomain,
				}).done(doneFn).fail(function(jqXHR, textStatus, errorThrown) {
					// common.alert('数据传输错误或服务连接异常。');
				});	
			},
			sleep : function(milliseconds) {
				  var start = new Date().getTime();
				  for (var i = 0; i < 1e7; i++) {
				    if ((new Date().getTime() - start) > milliseconds){
				      break;
				    }
				  }
			},
			isEmpty : function (str) {
				if(typeof str === "undefined"){
					return true;
				}else if (str == null){
					return true;
				}else if (str === ''){
					return true
				}else{
					return false;
				}
			},
			validateEmail : function (email) {
			    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			    return re.test(email);
			},
			getCookie : function(cname) {
				var name = cname + "=";
				var ca = document.cookie.split(';');
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) == ' ')
						c = c.substring(1);
					if (c.indexOf(name) == 0)
						return c.substring(name.length, c.length);
				}
				return "";
			},
			setCookie : function(cname, cvalue, exdays) {
				var d = new Date();
				d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
				var expires = "expires=" + d.toUTCString();
				document.cookie = cname + "=" + cvalue + "; " + expires;
			},
			isIpad : function(){
				return navigator.userAgent.match(/iPad/i) != null;
			},
			showLoading : function() {
				if($(".loading-mask").length){
					return;
				}
				$('<div class="loading-mask"><div class="cssload-spin-box"></div></div>').appendTo(document.body);
			},
			hideLoading : function() {
				$(".loading-mask").remove();
			},
			alert : function(message, ok_fn){
				if($('#alert-popup').length){
					$('#alert-popup').remove();
				}
				
				$('<div id="alert-popup" class="popup-mask" style="display: block;"><div class="login-popup"><div class="alert cf"><p class="alert-text">' + message + '</p><a id="OK" href="javascript:;" class="orange-btn prim-btn">确定</a><a class="fvpp-close">&#10005;</a></div></div></div>').appendTo(document.body);
				$('#alert-popup a').on('click', function(){
					$('#alert-popup').remove();
					if(typeof ok_fn == "function"){
						ok_fn();
					}
				});
				
			},
			confirm : function(message, yes_fn, no_fn){
				if(typeof yes_fn != "function"){
					common.alert('无效参数');
					return;
				}
				if($('#confirm-popup').length){
					$('#confirm-popup').remove();
				}
				
				$('<div id="confirm-popup" class="popup-mask" style="display: block;"><div class="login-popup"><div class="alert cf"><p class="alert-text">' + message + '</p><a id="YES" href="javascript:;" class="orange-btn prim-btn">确定</a><a id="NO" href="javascript:;" class="line-btn secd-btn">取消</a><a class="fvpp-close">&#10005;</a></div></div></div>').appendTo(document.body);
				$('#confirm-popup a').on('click', function(event){
					$('#confirm-popup').remove();
					if(event.target.id == "YES"){
						yes_fn();
						return;
					}
					if(event.target.id == "NO" && typeof no_fn == "function"){
						no_fn();
						return;
					}
				});
			}
		}
	}(jQuery));
	
	(function($, undefined) {
		search = {};
		$.yamibuy.search = search = {
			options : {
				txtSearchSelector : "[data-name=txtSearch]",
				btnSearchSelector : "#search-btn"
			},
			bind : function (){
				var txtSearch = $(this.options.txtSearchSelector);
				if(txtSearch.length){
					txtSearch.on('keypress', function(event){
						if(event.keyCode == 13) { 
							$('#search-btn').click();
						}
					});
					
					txtSearch.autocomplete({
					      source: function( request, response ) {
					        $.ajax({
					        	cache : false,
					        	url: "http://search.yamibuy.com:8080/webservice-search/search/searchSuggestions",
					        	dataType: "jsonp",
					        	crossDomain : true,
					        	data: {
					        		input : request.term
					        	},
					        	success: function( data ) {
					        		response( data );					        	  
					        	}
					        });
					      },
					      minLength: 1,
					      delay: 500
					});
				}
				var btnSearch = $(this.options.btnSearchSelector);
				if(btnSearch.length){
					btnSearch.on('click', function(event){
						if(txtSearch.val().length == 0){
							window.location.href = '//' + window.location.host + '/cn/' + $('#search-btn').data('url');
						}else{
							window.location.href = '//' + window.location.host + '/cn/search.php?keywords=' + encodeURIComponent($('[data-name=txtSearch]').val());
						}
					});
				}
			},
			
		}
	}(jQuery));
	
	(function($, undefined) {
		var customer = {};
		$.yamibuy.customer = customer = {
			options : {
				btnSubmitMessageSelector : "[data-name=btnSubmitMessage]",
				txtSubjectSelector : "[data-name=txtSubject]",
				txtEmailSelector : "[data-name=txtEmail]",
				txtMessageSelector : "[data-name=txtMessage]"
			},
			bind : function(){
				var btnAdd = $(this.options.btnSubmitMessageSelector);
				if (btnAdd.length) {
					btnAdd.off('click').on('click', this._submitMessageHandler);
				}
			},
			_submitMessageHandler : function(event){
				var subject = $(customer.options.txtSubjectSelector).val();
				var email = $(customer.options.txtEmailSelector).val();
				var message = $(customer.options.txtMessageSelector).val();
				if($.yamibuy.common.isEmpty(subject)){
					$.yamibuy.common.alert('请输入标题');
					return;
				}
				if(!$.yamibuy.common.validateEmail(email)){
					$.yamibuy.common.alert('请输入有效的邮箱地址');
					return;
				}
				if($.yamibuy.common.isEmpty(message)){
					$.yamibuy.common.alert('请输入留言内容');
					return;
				}
				customer.submitMessage(subject, email, message);
			},
			submitMessage : function(subject, email, message) {
				$.yamibuy.common.doAjax('service.php', 
						{act : 'leaveMessage', subject : subject, email : email, message : message },
						function(response){
							if(response.status == "1"){
								$.yamibuy.common.alert(response.message);
							}else{
								$.yamibuy.common.alert('您的留言已经提交成功');
								$(customer.options.txtSubjectSelector).val("");
								$(customer.options.txtEmailSelector).val("");
								$(customer.options.txtMessageSelector).val("");
							}
						}
				);
			}
		}
	}(jQuery));
	
	(function($, undefined) {
		var user = {};
		$.yamibuy.user = user = {
			isSigned : function () {
				var token = window.atob(decodeURIComponent($.yamibuy.common.getCookie('YMB_TK')));
				return JSON.parse(token).isLogin;
			},
			signIn : function(email, pwd, donefn){
				url = 'https://' + window.location.host + '/cn/service.php';
				$.yamibuy.common.doAjax(url, {act: 'login' ,email: email, pwd : pwd}, function(response){
					if(response.status == 1){
						$.yamibuy.common.alert(response.message);
					}else{
						donefn();
					}
				},{crossDomain : true, showloading : true, method : "POST", dataType : "JSONP"});
			},
			signOut : function(){
				$.yamibuy.common.showLoading();
				$.yamibuy.common.doAjax('service.php', {act: 'logout'}, function(response){
					if(response.status == 1){
						$.yamibuy.common.hideLoading();
						$.yamibuy.common.alert(response.message);
					}else{
						window.location.href = 'http://' + window.location.host + '/cn/';;
					}
				});
			},
			displaySignIn : function (data) {
				if(user.isSigned() == false){
					$.yamibuy.common.doAjax('service.php', 
							{act:'viewMiniLogin'}, 
							function(response){
								$(response.html).appendTo(document.body);
								$('#login-popup #btn-login').on('click', data , user._loginHandler);
								$('#login-popup #btn-close').on('click', function(){
									$('#login-popup').remove();
								});
					});
				}else{
					user._execute(data);
				}
			},
			_loginHandler : function(event) {
				var email = $('#l-email').val();
				var pwd = $('#l-pw').val();
				
				if(!$.yamibuy.common.validateEmail(email)){
					$.yamibuy.common.alert('请输入一个有效的邮箱地址。');
					return;
				}
				
				user.signIn(email, pwd, function(){
					$('#login-popup').remove();
					user._execute(event.data);
				})	
			},
			_execute : function (data){
				if(typeof data == "undefined" || typeof data.method != "function"){
					return;
				}else if (typeof data.param != "undefined"){
					data.method(data.param);
				}else{
					data.method();
				}
			}
		};
	}(jQuery));

	(function($, undefined) {
		var favorites = {};
		$.yamibuy.favorites = favorites = {
			options : {
				btnAddToFavoritesSelector : "[data-name=btnAddToFavorites]",
				btnAddedFavoritesSelector : "[data-name=btnAddedFavorites]",
			},
			bind : function(){
				var btnAdd = $(this.options.btnAddToFavoritesSelector);
				if (btnAdd.length) {
					btnAdd.off('click').on('click', this._addHandler);
				}
				var btnAdded = $(this.options.btnAddedFavoritesSelector);
				if (btnAdded.length) {
					btnAdded.off('click').on('click', this._addedHandler);
				}
			},
			_addHandler : function(event) {
//				var btnAdd = $(event.currentTarget);
//				favorites.add(btnAdd.data('gid'));
			},
			_addedHandler : function(event) {
				var btnAdd = $(event.currentTarget);
				$.yamibuy.user.displaySignIn({method : favorites.add, param : btnAdd.data('gid')});
			},
			add : function(gid){
				$.yamibuy.common.doAjax('service.php', 
						{act : 'addToFavorites', gid : gid}, 
						function(response){
							$.yamibuy.common.alert('当前商品已经成功加入到收藏夹。');
						},
						{showloading:true}
				);
			}
		};
	}(jQuery));
	
	(function($, undefined) {
		var cart = {}, cartRefresh = true;
		$.yamibuy.cart = cart = {
			options : {
				btnAddToCartSelector : "[data-name=btnAddToCart]",
				btnRemoveFromCartSelector : ".cart-not-empty .del-btn",
				btnIncreaseInCartSelector : ".cart-not-empty .increase-btn",
				btnDecreaseInCartSelector : ".cart-not-empty .decrease-btn",
				btnDisplayCartSelector : ".cart-cont .cont-wrap",
				lblCartAmountSelector : ".cart-cont .cont-wrap .amount",
				cartContainerSelector : ".cart-cont .cart-content",
				loadingSelector: ".cart-cont .cart-content .update-mask.container"
			},
			_request : function(url, data, doneFn, showLoading){
				$.ajax({
					cache : false,
					url : url,
					data : data,
					beforeSend : function() {
						if(typeof showLoading === "undefined"){
							cart._showLoading();
						}
					},
					complete : function(){
						if(typeof showLoading === "undefined"){
							cart._hideLoading();
						}
					},
					dataType : "JSON"
				}).done(doneFn).fail(function() {
					$.yamibuy.common.alert( "网络连接错误，稍后重试。" );
				});		
			},
			initialize : function() {
				cart.bind();
				var btnDisplay = $(this.options.btnDisplayCartSelector);
				if (btnDisplay.length) {
					btnDisplay.hover(this._hoverHandler, function(){});
				}
				cart._refreshCartAmount();
			},
			bind :function(){
				var btnAdd = $(this.options.btnAddToCartSelector);
				if (btnAdd.length) {
					btnAdd.off('click').on('click', this._addHandler);
				}
			},
			_bindCartEvent : function(){
				var btnRemove = $(this.options.btnRemoveFromCartSelector);
				if (btnRemove.length) {
					btnRemove.on('click', this._removeHandler);
				}
				var btnIncrease = $(this.options.btnIncreaseInCartSelector);
				if (btnIncrease.length) {
					btnIncrease.on('click', this._increaseHandler);
				}
				var btnDecrease = $(this.options.btnDecreaseInCartSelector);
				if (btnDecrease.length) {
					btnDecrease.on('click', this._decreaseHandler);
				}
			},
			_hoverHandler : function(event){
				cart._displayMiniCart();
			},
			_addHandler : function(event) {
				event.preventDefault();
				var btnAdd = $(event.currentTarget);
				var num = 1;
				if (typeof btnAdd.data('for') != "undefined") {
					var inputNum = $(btnAdd.data('for'));
					if (inputNum.length && inputNum.text() > 0) {
						num = inputNum.text();
					}
				}
				cart.add(btnAdd.data('gid'), num);
			},
			_removeHandler : function(event){
				var btnRemove = $(event.currentTarget);
				cart.remove(btnRemove.data('vid'), btnRemove.data('gid'));
			},
			_increaseHandler : function(event){
				var btnIncrease = $(event.currentTarget);
				cart.change(btnIncrease.data('vid'), btnIncrease.data('gid'), btnIncrease.data('number') + 1);
			},
			_decreaseHandler : function(event){
				var btnDecrease = $(event.currentTarget);
				cart.change(btnDecrease.data('vid'), btnDecrease.data('gid'), btnDecrease.data('number') - 1);
			},
			_showLoading : function(){
				var loading = $(cart.options.loadingSelector);
				if(loading.length == 0){					
					$(cart.options.cartContainerSelector).append('<div class="update-mask container"><div class="content"><p class="updating">更新中</p><div class="circle"></div><div class="circle1"></div></div></div>');
				}
			},
			_hideLoading : function(){
				var loading = $(cart.options.loadingSelector);
				if(loading.length){
					loading.remove();
				}			
			},
			_displayMiniCart : function(cartData) {
				if(typeof cartData != "undefined"){
					$(cart.options.cartContainerSelector).empty();
					$(cart.options.cartContainerSelector).append(cartData);
					cart._bindCartEvent();
				}else{
					if (cartRefresh) {
						$('.cart-btn').prop("href","javascript:;");
						cart._request("service.php", {act:"viewMiniCart"}, 
						function(response) {
							if (response.status == "1") {

							} else {
								$(cart.options.cartContainerSelector).empty();
								$(cart.options.cartContainerSelector).append(response.html);
								$('.cart-btn').prop("href","cart.php");
								cart._bindCartEvent();
							}
						});	
					}
				}
				cartRefresh = false;
			},
			_refreshCartAmount : function(amount){
				var cartAmount = $(cart.options.lblCartAmountSelector);
				if(cartAmount.length){
					if(typeof amount != "undefined"){
						cartAmount.text(amount);
					}else{
						$.yamibuy.common.doAjax("service.php", {act:"getCartGoodsAmount"}, 
								function(response) {
									if (response.status == "1") {

									} else {
										cartAmount.text(response.object.cartGoodsNum);		
									}
						});
					}
				}
			
			},
			_displayAddedGoods : function(div){
				$('.cart-cont').append(div);
				window.setTimeout(function() {
					$('.cart-cont .added-to-cart').remove();
				}, 1000);
			},
			add : function(gid, num) {
				$.yamibuy.common.doAjax("service.php", {act:"addGoodsToCart", gid : gid, num : num}, 
						function(response) {
							if (response.status == "1") {
								$.yamibuy.common.alert(response.message);
							} else {
								cart._refreshCartAmount(response.object.cartGoodsNum);
								cartRefresh = true;
								cart._displayAddedGoods(response.html);
							}
				}, {showloading : true});	
			},
			change : function(vid, gid, num) {
				cart._request("service.php", {act:"changeGoodsNumOfCart", vid: vid, gid : gid, num : num}, 
						function(response) {
							if (response.status == "1") {
								$.yamibuy.common.alert(response.message);
							} else {
								cart._refreshCartAmount(response.object.cartGoodsNum);
								cart._displayMiniCart(response.html);
							}
				});	
			},
			remove : function(vid, gid) {
				cart._request("service.php", {act:"removeGoodsFromCart", vid : vid, gid :gid}, 
					function(response) {
						if (response.status == "1") {
							$.yamibuy.common.alert(response.message);
						} else {
							cart._refreshCartAmount(response.object.cartGoodsNum);
							cart._displayMiniCart(response.html);
						}
				});	
			}
		};

	}(jQuery));
	
	$(function() {
		// Initialize Cart
		$.yamibuy.cart.initialize();
		
		// Initialize Favoriates
		$.yamibuy.favorites.bind();
		
		// Initialize Customer Service
		$.yamibuy.customer.bind();
		
		// // Initialize Search Service
		$.yamibuy.search.bind();
				
		// timer
		 $('[data-countdown]').each(function() {
			    var $this = $(this), 
			    finalDate = $(this).data('countdown');
			    $this.countdown(finalDate*1000, function(event) {
					$(this).html(event.strftime(event.strftime('%D d %H:%M:%S')));
			    });
		 });
		
		// Contact 
		var contactBtn = $(".contact-btn");
		if(contactBtn.length){
			contactBtn.click(function(){
				$('.contact-info').animate({width:'toggle'}, 350);
			});	
		}
		// Go top 
		var goTopBtn = $(".go-top");
		if(goTopBtn.length){
			goTopBtn.click(function(){
				$('html, body').animate({scrollTop: 0}, 300);
			});
			$(window).scroll(function() {
				if ($(this).scrollTop() > 200) {
					goTopBtn.fadeIn(200);
				} else {
					goTopBtn.fadeOut(200);
				}
			});
		}
		
		// Swiper
		if($(".home-page #masterslider").length){
				
			var slider = new MasterSlider();
			slider.setup('masterslider',{
				width:1200,
				height:445,
				autoplay:true,
				loop:true,
				view:"fade"
			});
			slider.control('thumblist' , {autohide:false ,dir:'h',type:'tabs', align:'bottom',width:12, height:12, space:12, inset:true, margin:10});
	
	        //
			slider.api.addEventListener(MSSliderEvent.INIT , function(){
			});
	
	
			slider.api.addEventListener(MSSliderEvent.CHANGE_START, function(){
	           var color = slider.api.view.currentSlide.$element[0].dataset.bgcolor;
	           $('.p1').css({'background-color':color});
			});
		}

		if($(".cat-page #masterslider").length){
				
			var slider = new MasterSlider();
			slider.setup('masterslider',{
				width:1200,
				height:400,
				autoplay:true,
				loop:true,
				view:"fade"
			});
			slider.control('arrows');
			slider.control('thumblist' , {autohide:false ,dir:'h',type:'tabs', align:'bottom',width:12, height:12, space:12, inset:true, margin:10});
	
	        //
			slider.api.addEventListener(MSSliderEvent.INIT , function(){
			});
	
	
			slider.api.addEventListener(MSSliderEvent.CHANGE_START, function(){
	           var color = slider.api.view.currentSlide.$element[0].dataset.bgcolor;
	           $('.p1').css({'background-color':color});
			});
		}
		// 
		$('.promo-bar').waypoint(function(direction) {
			var nva_main = $(".nav-main-2");
			if (nva_main.is(":hidden")) {
				nva_main.slideDown(100);
			} else {
				nva_main.slideUp(100);
			};
			
			if (direction == 'up'){
				$(".cart-cont").unwrap();
				$(".search-cont").unwrap();
				$(".search-words").show();
			} else {
				$(".cart-cont").wrap("<div class='full-w-cart'></div>");
				$(".search-cont").wrap("<div class='full-w-search'></div>");
				$(".search-words").hide();
			}
			
			var full_cart = $(".full-w-cart");
			if (full_cart.hasClass("po-fixed")){
				full_cart.removeClass("po-fixed");
			} else {
				full_cart.addClass("po-fixed");
			}

			var full_search = $(".full-w-search");
			if (full_search.hasClass("po-fixed")){
				full_search.removeClass("po-fixed");
			} else {
				full_search.addClass("po-fixed");
			}
		});
		
		/* 轮转 */	
		$('.jcarousel').jcarousel({wrap: 'circular'}).jcarouselAutoscroll({interval: 3000,target: '+=1',autostart: false,});
		 
		$('.jcarousel-prev').jcarouselControl({
			target: '-=2'
		});
		
		$('.jcarousel-next').jcarouselControl({
			target: '+=2'
		});	
	});
}));
