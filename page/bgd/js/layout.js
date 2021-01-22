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
			heightNum : 2,
			scrollHeight : 0,
			objs : { 
				container : document.querySelector("#scroll-section-0"),
				imageA : document.querySelector('#scroll-section-0 .main-img-wrap'),
				messageA : document.querySelector('#scroll-section-0 .section00_msg.a'),
				
				/*messageB : document.querySelector('#scroll-section-1 .main-message.b'),
				messageC : document.querySelector('#scroll-section-2 .main-message.c'),
				messageD : document.querySelector('#scroll-section-3 .main-message.d'),*/
				
			},
			values : { 
				/*messageA_opacity_in: [0,1, {start: 0.9, end: 1}],*/
				messageA_opacity_out: [1,0, {start: section00_Point[0][0], end: section00_Point[0][1]}],
				sec00_imgA_out01: [0, 80, {start:section00_Point[1][0], end: section00_Point[1][1]}],
				sec00_imgA_out02: [0, 150, {start:section00_Point[2][0], end: section00_Point[2][1]}],
				sec00_imgA_translate_out: [0,-440, {start:section00_Point[3][0], end: section00_Point[3][1]}],
				sec00_imgA_opacity_out: [1,0, {start:section00_Point[4][0], end: section00_Point[4][1]}],
			}
		},
		{ 
			type : 'sticky',
			heightNum : 3,
			scrollHeight : 0,
			objs : { 
				container : document.querySelector("#scroll-section-1"),
				imgA_simg : document.querySelector('#scroll-section-1 .simg:nth-child(1)'),
				imgB_simg : document.querySelector('#scroll-section-1 .simg:nth-child(2)'),
				imgA : document.querySelector('#scroll-section-1 .simg:nth-child(1) img'),
				imgB : document.querySelector('#scroll-section-1 .simg:nth-child(2) img'),
				scbox : document.querySelector('#scroll-section-1 .scbox'),
				messageA : document.querySelector('#scroll-section-1 .sec1-stxt'),
			},
			values : { 
				imgA_scale : [1,2, {start: 0.1, end: 0.5}], //calcValues
				imgB_scale : [1,2, {start: 0.1, end: 0.5}],
				imgA_transY : [0,500, {start: 0.5, end: 1}],
				imgB_transY : [0,500, {start: 0.5, end: 1}],
				sec01_imgA_opacity_in: [0, 1, {start:0.1, end: 0.3}],
				sec01_imgB_opacity_in: [0, 1, {start:0.2, end: 0.4}],
				sec01_imgA_opacity_out: [1, 0, {start:0.8, end: 1}],
				sec01_imgB_opacity_out: [1, 0, {start:0.7, end: 0.9}],
				
				sec01_scbox_translate_in: [200, 0, {start:0, end: 0.4}],
				sec01_scbox_translate_out: [0, -200, {start:0.6, end: 1}],
				
				sec01_messageA_in01: [50, 0, {start:0, end: 0.3}],
				sec01_messageA_in02: [100, 0, {start:0, end: 0.3}],
				sec01_messageA_translate_in: [200, 0, {start:0, end: 0.4}],
				sec01_messageA_opacity_in: [0, 1, {start:0, end: 0.4}],
				sec01_messageA_out01: [0, 50, {start:0.7, end: 1}],
				sec01_messageA_out02: [0, 100, {start:0.7, end: 1}],
				sec01_messageA_translate_out: [0, -200, {start:0.6, end: 1}],
				sec01_messageA_opacity_out: [1, 0, {start:0.6, end: 1}],
			

			}
		},
		{ 
			type : 'sticky',
			heightNum : 9,
			scrollHeight : 0,
			objs : { 
				container : document.querySelector("#scroll-section-2"),
				imgA_simg : document.querySelector('#scroll-section-2 .sec2-wrap.page1 .scbox .simg:nth-child(1)'),
				imgB_simg : document.querySelector('#scroll-section-2 .sec2-wrap.page1 .scbox .simg:nth-child(2)'),
				imgA : document.querySelector('#scroll-section-2 .sec2-wrap.page1 .scbox .simg:nth-child(1) img'),
				imgB : document.querySelector('#scroll-section-2 .sec2-wrap.page1 .scbox .simg:nth-child(2) img'),
				flex : document.querySelector('#scroll-section-2 .sec2-wrap.page2 .sec2-flex'),
				itemA : document.querySelector('#scroll-section-2 .sec2-wrap.page2 .sec2-flex > .item:nth-child(1)'),
				itemB : document.querySelector('#scroll-section-2 .sec2-wrap.page2 .sec2-flex > .item:nth-child(3)'),
				bg : document.querySelector('#scroll-section-2 .sec2-wrap.page3'),
			},
			values : {
				sec02_imgA_transY : [700,-700, {start: section02_Point[0][0], end: section02_Point[0][1]}],
				sec02_imgB_transY : [1000,-1000, {start: section02_Point[1][0], end: section02_Point[1][1]}],
				sec02_imgA_scale : [1.4,1, {start: section02_Point[2][0], end: section02_Point[2][1]}],
				sec02_imgB_scale : [1.5,1, {start: section02_Point[3][0], end: section02_Point[3][1]}],
				sec02_imgA_opacity_in: [0, 1, {start:section02_Point[4][0], end: section02_Point[4][1]}],
				sec02_imgB_opacity_in: [0, 1, {start:section02_Point[5][0], end: section02_Point[5][1]}],
				sec02_imgA_opacity_out: [1, 0, {start:section02_Point[6][0], end: section02_Point[6][1]}],
				sec02_imgB_opacity_out: [1, 0, {start:section02_Point[7][0], end: section02_Point[7][1]}],
				
				sec02_flex_opacity_in: [0, 1, {start:section02_Point[8][0], end: section02_Point[8][1]}],
				sec02_flex_opacity_out: [1, 0, {start:section02_Point[9][0], end: section02_Point[9][1]}],
				sec02_flex_translate_in: [200, 0, {start:section02_Point[10][0], end: section02_Point[10][1]}],
				sec02_flex_translate_out: [0, -200, {start:section02_Point[11][0], end: section02_Point[11][1]}],
				sec02_flex_in01: [50, 0, {start:section02_Point[12][0], end: section02_Point[12][1]}],
				sec02_flex_in02: [100, 0, {start:section02_Point[13][0], end: section02_Point[13][1]}],
				sec02_flex_out01: [0, 50, {start:section02_Point[14][0], end: section02_Point[14][1]}],
				sec02_flex_out02: [0, 100, {start:section02_Point[15][0], end: section02_Point[15][1]}],
				
				sec02_itemA_transY : [0,-100, {start: section02_Point[16][0], end: section02_Point[16][1]}],
				sec02_itemB_transY : [0,100, {start: section02_Point[17][0], end: section02_Point[17][1]}],
				
				sec02_bg_translate_in: [800, 0, {start:section02_Point[18][0], end: section02_Point[18][1]}],
				sec02_bg_translate_out: [0, -60, {start:section02_Point[19][0], end: section02_Point[19][1]}],
				sec02_bg_opacity_in: [0, 1, {start:section02_Point[20][0], end: section02_Point[20][1]}],
				sec02_bg_opacity_out: [1, 0, {start:section02_Point[21][0], end: section02_Point[21][1]}],
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
		
		const scene01_values = sceneInfo[1].values;
		
		//console.log("yOffset", yOffset);
		//console.log("prevScrollHeight", prevScrollHeight);
		//console.log("yOffset - prevScrollHeight", currentYOffset);
		
		let scene01_imgA_scale_in = totalCalcValue(scene01_values.imgA_scale, yOffset); //어디엔가 저장된 인자를 불러 옴 : 콜백 함수
		let scene01_imgB_scale_in = totalCalcValue(scene01_values.imgB_scale, yOffset);
		let scene01_imgA_transY_in = totalCalcValue(scene01_values.imgA_transY, yOffset);
		let scene01_imgB_transY_in = totalCalcValue(scene01_values.imgB_transY, yOffset);
		

			
		sceneInfo[1].objs.imgA.style.transform = (`scale(${scene01_imgA_scale_in})`);
		sceneInfo[1].objs.imgB.style.transform = (`scale(${scene01_imgB_scale_in})`);
		sceneInfo[1].objs.imgA_simg.style.transform = (`translateY(${scene01_imgA_transY_in}px)`);
		sceneInfo[1].objs.imgB_simg.style.transform = (`translateY(${scene01_imgB_transY_in}px)`);
		
		//console.log(sceneInfo[1].scrollHeight);
		//console.log(yOffset);
		//console.log(totalScrollHeight);

		//objs.messageC1.setAttribute("style", 'opacity :' + sec00_msgC1_opacity_in + '; transform : translateY(' + sec00_msgC1_translate_in + 'px)');
		

//		sceneInfo[2].objs.imgA.setAttribute("style", 'transform : translateY(' + scene02_imgA_transY_in + 'px); scale(' + scene02_imgA_scale_in + ');');
		
//		sceneInfo[2].objs.imgA.style.transform = (`scale(${scene02_imgA_scale_in})`);
//		sceneInfo[2].objs.imgB.style.transform = (`scale(${scene02_imgB_scale_in})`);
//		sceneInfo[2].objs.imgA_simg.style.transform = (`translateY(${scene02_imgA_transY_in}px)`);
//		sceneInfo[2].objs.imgB_simg.style.transform = (`translateY(${scene02_imgB_transY_in}px)`);
		

		
		
		//console.log(imgA_scale_in);
		//console.log("currentScene ==", currentScene);
		//console.log(yOffset);
		switch(currentScene) { 
			case 0 : 
				
				/*let messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);*/
				let messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);
				let sec00_imgA_out01 = calcValues(values.sec00_imgA_out01, currentYOffset);
				let sec00_imgA_out02 = calcValues(values.sec00_imgA_out02, currentYOffset);	
				let sec00_imgA_translate_out = calcValues(values.sec00_imgA_translate_out, currentYOffset);	
				let sec00_imgA_opacity_out = calcValues(values.sec00_imgA_opacity_out, currentYOffset);	
				
				//console.log("messageA_opacity_in ==", messageA_opacity_in);
				/*if(scrollRatio <= 0.25) { 
					objs.messageA.style.opacity = messageA_opacity_in;
					
				} else { 
					objs.messageA.style.opacity = messageA_opacity_out;
					
				}*/
				

				if(scrollRatio < section00_Point[0][1]) { 
					objs.messageA.style.opacity = messageA_opacity_out;
					
				}		
				if(scrollRatio < section00_Point[0][1]) { 
					objs.imageA.setAttribute("style", '--gradient-progress_sec00_01 :' + sec00_imgA_out01 + '%; --gradient-progress_sec00_02 :' + sec00_imgA_out02 + '%; transform : translateY(' + sec00_imgA_translate_out + 'px); opacity : ' + sec00_imgA_opacity_out);
				}
				
				
				
				/*
				if(scrollRatio <= 0.65) { 
					//objs.messageA.style.opacity = messageA_opacity_in;
					objs.messageA.setAttribute("style", 'opacity :' + sec03_imgA_opacity_in + '; --gradient-progress_sec03_01 :' + scene03FstCopy_in01 + '%; --gradient-progress_sec03_02 :' + scene03FstCopy_in02 + '%; transform : translateY(' + sec03_imgA_translate_in + 'px);');

				} else { 
					objs.messageA.setAttribute("style", '--gradient-progress_sec03_01 :' + scene03FstCopy_out01 + '%; --gradient-progress_sec03_02 :' + scene03FstCopy_out02 + '%; transform : translateY(' + sec03_imgA_translate_out + 'px); opacity : ' + sec03_imgA_opacity_out);
				} //학원 홈페이지 폼	
				*/
				
				//console.log(messageA_opacity_in);
				break;
			case 1 : 
				
				let sec01_messageA_in01 = calcValues(values.sec01_messageA_in01, currentYOffset);
				let sec01_messageA_in02 = calcValues(values.sec01_messageA_in02, currentYOffset);	
				let sec01_messageA_translate_in = calcValues(values.sec01_messageA_translate_in, currentYOffset);	
				let sec01_messageA_opacity_in = calcValues(values.sec01_messageA_opacity_in, currentYOffset);	
				let sec01_messageA_out01 = calcValues(values.sec01_messageA_out01, currentYOffset);
				let sec01_messageA_out02 = calcValues(values.sec01_messageA_out02, currentYOffset);	
				let sec01_messageA_translate_out = calcValues(values.sec01_messageA_translate_out, currentYOffset);	
				let sec01_messageA_opacity_out = calcValues(values.sec01_messageA_opacity_out, currentYOffset);	
				
				let sec01_scbox_translate_in = calcValues(values.sec01_scbox_translate_in, currentYOffset);
				let sec01_scbox_translate_out = calcValues(values.sec01_scbox_translate_out, currentYOffset);	
				
				let sec01_imgB_opacity_in = calcValues(values.sec01_imgB_opacity_in, currentYOffset);	
				let sec01_imgB_opacity_out = calcValues(values.sec01_imgB_opacity_out, currentYOffset);	

				let sec01_imgA_opacity_in = calcValues(values.sec01_imgA_opacity_in, currentYOffset);	
				let sec01_imgA_opacity_out = calcValues(values.sec01_imgA_opacity_out, currentYOffset);	
				
				if(scrollRatio <= 0.5) { 
					//objs.messageA.style.opacity = messageA_opacity_in;
					objs.messageA.setAttribute("style", 'opacity :' + sec01_messageA_opacity_in + '; --gradient-progress_sec01_01 :' + sec01_messageA_in01 + '%; --gradient-progress_sec01_02 :' + sec01_messageA_in02 + '%; transform : translateY(' + sec01_messageA_translate_in + 'px);');

				} else { 
					objs.messageA.setAttribute("style", '--gradient-progress_sec01_01 :' + sec01_messageA_out01 + '%; --gradient-progress_sec01_02 :' + sec01_messageA_out02 + '%; transform : translateY(' + sec01_messageA_translate_out + 'px); opacity : ' + sec01_messageA_opacity_out);
				}
				
				
				if(scrollRatio <= 0.4) { 
					//objs.scbox.style.opacity = scbox_opacity_in;
					objs.scbox.setAttribute("style", 'transform : translateY(' + sec01_scbox_translate_in + 'px)');

				}
				
				if(scrollRatio >= 0.5) { 
					//objs.scbox.style.opacity = scbox_opacity_in;
					objs.scbox.setAttribute("style", 'transform : translateY(' + sec01_scbox_translate_out + 'px)');

				}	
				
				if(scrollRatio <= 0.5) { 
					//objs.imgA.style.opacity = imgA_opacity_in;
					objs.imgA.setAttribute("style", 'opacity :' + sec01_imgA_opacity_in);

				} else { 
					objs.imgA.setAttribute("style", 'opacity : ' + sec01_imgA_opacity_out);
				}
				
				if(scrollRatio <= 0.5) { 
					//objs.imgA.style.opacity = imgA_opacity_in;
					objs.imgB.setAttribute("style", 'opacity :' + sec01_imgB_opacity_in);

				} else { 
					objs.imgB.setAttribute("style", 'opacity : ' + sec01_imgB_opacity_out);
				}			
				break;
				
				
			case 2 : 
				
				let sec02_imgA_opacity_in = calcValues(values.sec02_imgA_opacity_in, currentYOffset);	
				let sec02_imgA_opacity_out = calcValues(values.sec02_imgA_opacity_out, currentYOffset);
				let sec02_imgA_scale = calcValues(values.sec02_imgA_scale, currentYOffset);
				let sec02_imgA_transY = calcValues(values.sec02_imgA_transY, currentYOffset);
				let sec02_imgB_opacity_in = calcValues(values.sec02_imgB_opacity_in, currentYOffset);	
				let sec02_imgB_opacity_out = calcValues(values.sec02_imgB_opacity_out, currentYOffset);	
				let sec02_imgB_scale = calcValues(values.sec02_imgB_scale, currentYOffset);
				let sec02_imgB_transY = calcValues(values.sec02_imgB_transY, currentYOffset);
				
				let sec02_flex_in01 = calcValues(values.sec02_flex_in01, currentYOffset);
				let sec02_flex_in02 = calcValues(values.sec02_flex_in02, currentYOffset);	
				let sec02_flex_translate_in = calcValues(values.sec02_flex_translate_in, currentYOffset);	
				let sec02_flex_opacity_in = calcValues(values.sec02_flex_opacity_in, currentYOffset);	
				let sec02_flex_out01 = calcValues(values.sec02_flex_out01, currentYOffset);
				let sec02_flex_out02 = calcValues(values.sec02_flex_out02, currentYOffset);	
				let sec02_flex_translate_out = calcValues(values.sec02_flex_translate_out, currentYOffset);	
				let sec02_flex_opacity_out = calcValues(values.sec02_flex_opacity_out, currentYOffset);	
				
				let sec02_itemA_transY = calcValues(values.sec02_itemA_transY, currentYOffset);
				let sec02_itemB_transY = calcValues(values.sec02_itemB_transY, currentYOffset);
				
				let sec02_bg_translate_in = calcValues(values.sec02_bg_translate_in, currentYOffset);	
				let sec02_bg_translate_out = calcValues(values.sec02_bg_translate_out, currentYOffset);
				let sec02_bg_opacity_in = calcValues(values.sec02_bg_opacity_in, currentYOffset);
				let sec02_bg_opacity_out = calcValues(values.sec02_bg_opacity_out, currentYOffset);
				
				if(scrollRatio <= section02_Point[4][1]) { 
					//objs.imgA.style.opacity = imgA_opacity_in;
					objs.imgA_simg.setAttribute("style", 'transform : translateY(' + sec02_imgA_transY + 'px);');
					objs.imgA.setAttribute("style", 'opacity :' + sec02_imgA_opacity_in + '; transform : scale(' + sec02_imgA_scale + ');');
				} else { 
					objs.imgA_simg.setAttribute("style", 'transform : translateY(' + sec02_imgA_transY + 'px);');
					objs.imgA.setAttribute("style", 'opacity : ' + sec02_imgA_opacity_out + '; transform : scale(' + sec02_imgA_scale + ');');
				}
				
				if(scrollRatio <= section02_Point[5][1]) { 
					//objs.imgA.style.opacity = imgA_opacity_in;
					objs.imgB_simg.setAttribute("style", 'transform : translateY(' + sec02_imgB_transY + 'px);');
					objs.imgB.setAttribute("style", 'opacity :' + sec02_imgB_opacity_in + '; transform : scale(' + sec02_imgB_scale + ');');

				} else { 
					objs.imgB_simg.setAttribute("style", 'transform : translateY(' + sec02_imgB_transY + 'px);');
					objs.imgB.setAttribute("style", 'opacity : ' + sec02_imgB_opacity_out + '; transform : scale(' + sec02_imgB_scale + ');');
				}						
				
				if(scrollRatio <= section02_Point[8][1]) {
					objs.flex.setAttribute("style", 'opacity :' + sec02_flex_opacity_in + '; --gradient-progress_sec02_01 :' + sec02_flex_in01 + '%; --gradient-progress_sec02_02 :' + sec02_flex_in02 + '%; transform : translateY(' + sec02_flex_translate_in + 'px);');
				} else {
					objs.flex.setAttribute("style", 'opacity :' + sec02_flex_opacity_out + '; --gradient-progress_sec02_01 :' + sec02_flex_out01 + '%; --gradient-progress_sec02_02 :' + sec02_flex_out02 + '%; transform : translateY(' + sec02_flex_translate_out + 'px);');
				}
				
				if(scrollRatio <= section02_Point[16][1]) { 
					objs.itemA.setAttribute("style", 'transform : translateY(' + sec02_itemA_transY + 'px);');
				}
				 
				if(scrollRatio <= section02_Point[17][1]) { 
					objs.itemB.setAttribute("style", 'transform : translateY(' + sec02_itemB_transY + 'px);');
				}
				
				if(scrollRatio <= section02_Point[18][1]) {
					objs.bg.setAttribute("style", 'opacity :' + sec02_bg_opacity_in + '; transform : translateY(' + sec02_bg_translate_in + 'px);');
				} else {
					objs.bg.setAttribute("style", 'opacity :' + sec02_bg_opacity_out + '; transform : translateY(' + sec02_bg_translate_out + 'px);');
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
	
    $('#navbtn1').on('click', function(){
        $('html, body').animate({
            scrollTop: $('#page1').offset().top
        }, 1000);
    });
    $('#navbtn2').on('click', function(){
        $('html, body').animate({
            scrollTop: $(document).height() - $(window).height()
        }, 1000);
    });
	$("#navbtn3").on('click', function(){
		location.href = 'page/menu/index.html'; 
		return false;
	});
	
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
		
		console.log($(this).scrollTop());

		
		
	});
	
	window.addEventListener('load', setLayout);
	window.addEventListener('resize', setLayout);
	
})();





