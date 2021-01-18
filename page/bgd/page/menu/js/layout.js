(() => {	
	let yOffset = 0; // javascript의 스크롤탑 window.pageYoffset대신 쓸 값
	let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 있는 스크롤 높이
	let currentScene = 0; // 현재 씬
	let enterNewScene = false; // 새로운 씬이 시작되면  true
	
	//  여기서부터는 나중에 표기 
	let acc = 0.2; 
	let delayedYOffset = 0;
	let rafId;
	let rafState;	

	const sceneInfo = [
		{ 	
			type : 'sticky',
			heightNum : 4,
			scrollHeight : 0,
			objs : { 
				container : document.querySelector("#scroll-section-0"),
				messageSet : document.querySelector('#scroll-section-0 .section00_msgset'),
				
			},
			values : { 
				sec00_messageSet_opacity_out: [1,0, {start: section00_Point[0][0], end: section00_Point[0][1]}],
				sec00_messageSet_translate_out: [0,-1000, {start: section00_Point[1][0], end: section00_Point[1][1]}],
			}
		},
		{ 
			type : 'sticky',
			heightNum : 9,
			scrollHeight : 0,
			objs : { 
				container : document.querySelector("#scroll-section-1"),
				listA : document.querySelector("#scroll-section-1 .sec1-wrap ul.list_menu"),
			},
			values : {
				sec01_listA_translate_in: [2000,0, {start: section01_Point[0][0], end: section01_Point[0][1]}],
				sec01_listA_translate_out: [0,-2000, {start: section01_Point[1][0], end: section01_Point[1][1]}],
				sec01_listA_opacity_in: [0,1, {start: section01_Point[2][0], end: section01_Point[2][1]}],
				sec01_listA_opacity_out: [1,0, {start: section01_Point[3][0], end: section01_Point[3][1]}],
				sec01_listA_width_in: [0,100, {start: section01_Point[4][0], end: section01_Point[4][1]}],
				sec01_listA_width_out: [100,0, {start: section01_Point[5][0], end: section01_Point[5][1]}],
			}
		},
		{ 
			type : 'sticky',
			heightNum : 6,
			scrollHeight : 0,
			objs : { 
				container : document.querySelector("#scroll-section-2"),
				bg : document.querySelector('#scroll-section-2 .sec2-wrap'),
			},
			values : {
 				sec02_bg_translate_in: [30, -25, {start:section02_Point[0][0], end: section02_Point[0][1]}],
 				sec02_bg_opacity_in: [0, 1, {start:section02_Point[1][0], end: section02_Point[1][1]}],
			}
		}
	];
	
	
	// 레이아웃 설정
	function setLayout() { 		
		for(let i = 0; i < sceneInfo.length; i++) { //반복문 for
			sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight; //씬 범위 수치
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`; //css에 범위 입력
		}
		
		
		yOffset = window.pageYOffset; // window.pageYOffset = $(window).scrollTop();
		// 레이아웃 세팅에서 현재 씬을 잡아주는 코드
		let totalScrollHeight = 0;
		for(let i = 0; i < sceneInfo.length; i++) { 
			totalScrollHeight += sceneInfo[i].scrollHeight; // totalScrollHeight = [sceneInfo[i].scrollHeight + totalScrollHeight]
			if(totalScrollHeight > yOffset) { 
			   currentScene = i;
			   console.log("현재 씬 ==", currentScene);
			   break;							   
			}			
		}
		
		document.body.setAttribute('id', `show-scene-${currentScene}`); // 백틱 함수
		
		
	}
	
	function calcValues(values, currentYOffset) { 
		let rv;
		//현재씬에서 스크롤된 비율 구하기
		//console.log(values);	
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;		
		
		if(values.length == 3) { 
		   //start ~ end 사이 애니메이션 실행
		   	const partScrollStart = values[2].start * scrollHeight;
		   	const partScrollEnd = values[2].end * scrollHeight;
			const partScrollHeight = partScrollEnd - partScrollStart;
			
			if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) { 
				rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
			} else if(currentYOffset < partScrollStart) { 
				rv = values[0];
			} else if(currentYOffset > partScrollEnd) { 
				rv = values[1];
			}
			
		} else { 
			rv = scrollRatio * (values[1] - values[0]) + values[0];	//시작도 끝도 아닐 때   
		}
		
		
		return rv;
	}
	
	function totalCalcValue(values, yOffset) { 
		let rv;
		
		const totalScrollHeight = sceneInfo[0].scrollHeight + sceneInfo[1].scrollHeight + sceneInfo[2].scrollHeight;
		const totalScrollRatio = yOffset / totalScrollHeight;

		const partScrollStart = values[2].start * totalScrollHeight;
		const partScrollEnd = values[2].end * totalScrollHeight;
		const partScrollHeight = partScrollEnd - partScrollStart;		
		
		//rv = (yOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
		
		//console.log("yOffset ==", yOffset);
		//console.log("partScrollStart ==", partScrollStart);
		//console.log("토탈스크롤 ", totalScrollRatio);
		//console.log("partScrollHeight ==", partScrollHeight);
		
		if(yOffset >= partScrollStart && yOffset <= partScrollEnd) { 
			
			rv = (yOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
			//console.log(rv)			
		} else if(yOffset < partScrollStart) { 
			rv = values[0];
			//console.log("시작전", rv);
		} else if(yOffset > partScrollEnd) { 
			rv = values[1];
			//console.log("시작후", rv);
		}
		//console.log("rv ", rv);
		
		return rv;
	}
	
	
	function playAnimation() { 
		const objs = sceneInfo[currentScene].objs;
		const values = sceneInfo[currentScene].values;
		const currentYOffset = yOffset - prevScrollHeight; // 씬이 넘어갈 때마다 새로 시작
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = (yOffset - prevScrollHeight) / scrollHeight; //yOffset / 현재 씬의 scrollHeight (씬 시작 = 0, 씬 끝 = 1);	
		
		const totalScrollHeight = sceneInfo[0].scrollHeight + sceneInfo[1].scrollHeight + sceneInfo[2].scrollHeight;
		const totalScrollRatio = yOffset / totalScrollHeight;

		

		if(currentScene == 0) {
			$('ul.list_menu').children().eq(0).removeClass('in');
		} else if (currentScene == 1) {
			
				var i = parseInt(scrollRatio/(1/6));
				
				if((i == 0 || i == 5) === false){
					console.log(i);
						if($(objs.listA).children().eq(i - 1).hasClass('out')) { 
						$(objs.listA).children().eq(i - 1).removeClass('out');
						if(i < 4) {
							$(objs.listA).children().eq(i).removeClass('in');
						}
					} else {
						$(objs.listA).children().eq(i - 1).addClass('in');
						if(i > 1) {
							$(objs.listA).children().eq(i - 2).addClass('out');
						}
					}
				   
				}
			
			
		console.log(i);
		} else if (currentScene == 2) {
			$('ul.list_menu').children().eq(3).addClass('out');
		}
		
		switch(currentScene) { 
			case 0 : 
				
				let sec00_messageSet_opacity_out = calcValues(values.sec00_messageSet_opacity_out, currentYOffset);
				let sec00_messageSet_translate_out = calcValues(values.sec00_messageSet_translate_out, currentYOffset);


				if(scrollRatio < section00_Point[0][1]) { 
					objs.messageSet.setAttribute("style",'transform : translateY(' + sec00_messageSet_translate_out + 'px); opacity : ' + sec00_messageSet_opacity_out);
				}		

				//console.log("Y좌표 = " + currentYOffset);
				
				break;
			case 1 : 
				let sec01_listA_translate_in = calcValues(values.sec01_listA_translate_in, currentYOffset);	
				let sec01_listA_translate_out = calcValues(values.sec01_listA_translate_out, currentYOffset);
				let sec01_listA_opacity_in = calcValues(values.sec01_listA_opacity_in, currentYOffset);
				let sec01_listA_opacity_out = calcValues(values.sec01_listA_opacity_out, currentYOffset);
				let sec01_listA_width_in = calcValues(values.sec01_listA_width_in, currentYOffset);
				let sec01_listA_width_out = calcValues(values.sec01_listA_width_out, currentYOffset);
				
				if(scrollRatio < section01_Point[0][1]) {
					objs.listA.setAttribute("style", 'opacity :' + sec01_listA_opacity_in);
				} else {
					objs.listA.setAttribute("style", 'opacity :' + sec01_listA_opacity_out);
				}
				
				break;

				
			case 2 : 
				
				let sec02_bg_translate_in = calcValues(values.sec02_bg_translate_in, currentYOffset);	
				let sec02_bg_opacity_in = calcValues(values.sec02_bg_opacity_in, currentYOffset);	
				
				if(scrollRatio <= section02_Point[0][1]) {
					objs.bg.setAttribute("style", 'opacity :' + sec02_bg_opacity_in + '; transform : translateY(' + sec02_bg_translate_in + 'em);');
				}				
				break;
				
		}
		
		// 2번째 화면이 윈도우상에서 보이기 시작한 시점부터 애니메이션이 동작해야함 
		var zz = document.getElementById("scroll-section-1").offsetHeight;
		//console.log(zz);
		//console.log(totalScrollRatio);
	}

	function scrollLoop() { 
		prevScrollHeight = 0;
		enterNewScene = false
		for(let i = 0; i < currentScene; i++) { // currentScene 현재씬의 순서
			prevScrollHeight += sceneInfo[i].scrollHeight; // prevScrollHeight = 이전에 스크롤했던 높이 값, 이전 스크롤 높이의 총합
		}

		//console.log("prevScrollHeight ==", prevScrollHeight);
		//console.log("현재신의 스크롤하이트 ==", sceneInfo[currentScene].scrollHeight);
		//console.log("yOffset ==", yOffset);
				
		if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) { 
			enterNewScene = true; // 다음 씬으로 넘어갔을 때
			currentScene++;		
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}

		if(yOffset < prevScrollHeight) { 
			enterNewScene = true;
			if(currentScene === 0) return;
			currentScene--;
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}
		//console.log(yOffset);
		if(enterNewScene) return;
		playAnimation();
	}
	
	
	window.addEventListener('scroll', () => { // 삼각형 함수
		yOffset = window.pageYOffset;
		scrollLoop();

	  if (($(document).height() - $(window).height()) - yOffset < 1 ) {
		console.log('스크롤바 끝 도달');
		$('.footer').addClass('on');
	   } else {
		$('.footer').removeClass('on');
	   }
		//console.log("Y오프셋 == " + yOffset);
		//console.log(($(document).height() - $(window).height()) - yOffset);
		
		
		var navico = $('.header .header_inner .nav_ico');
		var _this = $(this);
		var _origin = _this.parents('.nav');
		
		if(navico.parents('.nav').hasClass('onclick') && yOffset < 0.001) { 
			navico.parents('.nav').removeClass('onclick');
		}
		
		navico.off().on({
		
			mouseenter: function(){
				navico.find('li').css('background','linear-gradient(to top, #fff 0, #96825d 40%, #96825d 60%, #fff 100%)');
				navico.find('li:nth-child(1)').css('left','-0.23rem');
				navico.find('li:nth-child(2)').css('left','0.13rem');
				navico.find('li:nth-child(3)').css('left','-0.23rem');
				console.log("안");
			},
			mouseleave: function(){
				navico.find('li').css('background','linear-gradient(to top, #fff 0, #000 40%, #000 60%, #fff 100%)');
				navico.find('li:nth-child(1)').css('left','0rem');
				navico.find('li:nth-child(2)').css('left','0rem');
				navico.find('li:nth-child(3)').css('left','0rem');
				console.log("밖");
			},
			click: function(e){
				var _this = $(this);
				var _origin = _this.parents('.nav');
				
				e.preventDefault();
				
				
				
				if(_origin.hasClass('onclick')) {
					_origin.removeClass('onclick');
					
				} else {
					_origin.addClass('onclick');
					
				};
			}
		});
		
		
		$('.navlist > li').off();
		$('.navlist > li').addClass("on");
		
		$('.nav .nav_ico > ul > li').addClass("on");
		$('.nav .nav_ico > ul > li').removeClass("out");
		
		
		$('.nav .nav_ico > ul > li').off();
		
		function anireverse() { 
			//console.log("에니리버스가 제대로 타나?");
			$('.logo > h3').removeClass("on");	
			$('.nav .nav_ico > ul > li').addClass("out");
			$('.nav .nav_ico > ul > li').on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){		
				//console.log("애니메이션이 제대로 타서 끝났을때?");
				$('.navlist > li').addClass("reverse");
				$('.navlist > li:nth-child(1)').one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){				
					//console.log("그리고 마지막으로 다시 $('.navlist > li')가 동작함 ");
					$('.navlist > li').removeClass("on reverse");
					$('.nav .nav_ico > ul > li').removeClass("on out");
				});									
			});
		}
		
			$('.navlist > li.on').one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
				if(yOffset == 0) { 
					//console.log("에니메이션이 끝나고 난 이후 첫 지점에 도달했다");
					anireverse();
					
				} else { 
					$('.navlist > li').removeClass("reverse");
					$('.nav .nav_ico > ul > li').addClass("on");
					$('.logo > h3').addClass("on");	
					//console.log("여기를 탄다");
				}

			});			
		
		if($('.navlist > li').hasClass("on") && yOffset == 0) { 
			anireverse();			
		}		

		
		
	});
	
	window.addEventListener('load', setLayout);
	window.addEventListener('resize', setLayout);
	
})();





