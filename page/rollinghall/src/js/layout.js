var pshinit = function() { 	
	$(document).off('touchstart');
	$(document).off('focusin');
	$(document).off('focusout');
	$(document).off('blur');
	
	/* 버튼 클릭시 버튼 효과 */
	
	$(document).on('touchstart', '.btn , button', function(){			
		$(this).addClass('active');
		$(this).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
		function() {
			$(this).removeClass('active');
		});

		$(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
		function() {
			$(this).removeClass('active');
		});		
	});
	
	
	/*  인풋 포커스 제어 */
	$(document).on({
		'focusin' : function(){ 
			if($(this).parent('.inputset').hasClass("on")) { 
				$(this).parent('.inputset').removeClass("on");
			} else { 
				$(this).parent('.inputset').addClass("on");
			}		
		},
		'focusout' : function(){ 
			if($(this).parent('.inputset').hasClass("on")) { 
				$(this).parent('.inputset').removeClass("on");
			} else { 
				$(this).parent('.inputset').addClass("on");
			}		
		}	
	},'.inputset > input , .inputset > select, .inputset > textarea');	

	$(document).on({
		'click' : function() { 
			
			if($(this).prop("checked")) { 
				$(this).parents('.inputset').addClass("on");
				
			} else { 
				$(this).parents('.inputset').removeClass("on");
				
			}
		}
	}, '.inputset.ckbox label > input');

	$(document).on({
		'click' : function() { 
			var chkname = $(this).attr("name");
			if($(this).prop("checked")) { 
				$(".inputset.rdo input[name ='" + chkname + "']").parents('.inputset').removeClass("on");
				$(this).parents('.inputset').addClass("on");
				
			} 
		}
	}, '.inputset.rdo label > input');	
	
	$('.popselect .btn.frm').on("click", function() { 
		var _this = $(this);
		var _thistarget = _this.siblings();
		_thistarget.addClass("on");
	});

	$('.popselect .tollbox .close .btn').on("click", function() { 
		var _this = $(this);
		var _thispttg = _this.parents(".tollbox");
		_thispttg.removeClass("on");
	});

	$('.popselect .tollbox > ul > li > a').on("click", function() { 
		var _this = $(this);
		var _thispttg = _this.parents(".tollbox");
		_thispttg.removeClass("on");
	});
	
	$('.navbar  .pull-right.trans > .btn').on("click", function() { 
		var _this = $(this);
		var _thispt = _this.parent();
		var _thisptsb = _thispt.siblings();
		_thispt.css({"transform" : "translate3d(-90vw,0,0)"});
		_thisptsb.css({"transform" : "translate3d(0,0,0)"});		
	});
	
	$('.serchinput .pull-right.close').on("click", function() { 
		var _this = $(this);
		var _thispt = _this.parent();
		var _thisptprev = _thispt.prev();
		console.log(_thisptprev);
		_thisptprev.css({"transform" : "translate3d(0,0,0)"});
		_thispt.css({"transform" : "translate3d(100vw,0,0)"});
	});
};

var swipefunc = function() { 
   var swiper = new Swiper('.swiper-container', {
	  direction: 'vertical',
	  slidesPerView: 'auto',
	  freeMode: true,
	  scrollbar: {
		el: '.swiper-scrollbar',
	  },
	  mousewheel: true,
	});
};









	
	