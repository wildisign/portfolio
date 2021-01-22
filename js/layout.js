// JavaScript Document
$(function(){
	
	var docStyle = document.documentElement.style;

	// setting CSS variables inside this JS where they 
	// can be declaratively used inside the CSS file.
		document.addEventListener('mousemove', function(e) {

		console.log("클라이언트x == ", screen.width);
		docStyle.setProperty('--mouse-x', e.clientX - (screen.width / 2));
		docStyle.setProperty('--mouse-y', e.clientY - (screen.height / 2));
	});

	
	let skillBar = [
		[5],//HTML
		[4],//CSS
		[3],//Jquery
		[5],//PS
		[4],//AI
	]
	
	var barHtml = $( '.skill.html > .bar > div' );
	var barCss = $( '.skill.css > .bar > div' );
	var barJquery = $( '.skill.jquery > .bar > div' );
	var barPs = $( '.skill.ps > .bar > div' );
	var barAi = $( '.skill.ai > .bar > div' );
	
	barHtml.slice( 0, skillBar[0] ).addClass('full');
	barCss.slice( 0, skillBar[1] ).addClass('full');
	barJquery.slice( 0, skillBar[2] ).addClass('full');
	barPs.slice( 0, skillBar[3] ).addClass('full');
	barAi.slice( 0, skillBar[4] ).addClass('full');
	
	
	
	var stop = false;
	var frameCount = 0;
	var fps, fpsInterval, startTime, now, then, elapsed;
	var count = 0;
	var Box = $(".cont_inner > .section")

	startAnimating(1/8);

	function startAnimating(fps) {
		fpsInterval = 1000 / fps;
		then = Date.now();
		startTime = then;
		console.log(startTime);
		animate();
	}


	function animate() {

		// stop
		if (stop) {
			return;
		}

		// request another frame

		requestAnimationFrame(animate);

		// calc elapsed time since last loop

		now = Date.now();
		elapsed = now - then;

		// if enough time has elapsed, draw the next frame

		if (elapsed > fpsInterval) {

			// Get ready for next frame by setting then=now, but...
			// Also, adjust for fpsInterval not being multiple of 16.67
			then = now - (elapsed % fpsInterval);

			// draw stuff here
			count++;
			var first = count % 5,
				second = (count + 1) % 5,
				third = (count + 2) % 5,
				fourth = (count + 3) % 5,
				fifth = (count + 4) % 5;
			console.log(count);

				Box.eq(first).removeClass();
				Box.eq(first).addClass("section sec0");
				Box.eq(second).removeClass();
				Box.eq(second).addClass("section sec1");
				Box.eq(third).removeClass();
				Box.eq(third).addClass("section sec2");
				Box.eq(fourth).removeClass();
				Box.eq(fourth).addClass("section sec3");
				Box.eq(fifth).removeClass();
				Box.eq(fifth).addClass("section sec4");

		}
	}
	
    $('#navbtn1').on('click', function(){
        $('html, body').animate({
            scrollTop: $('#page1').offset().top
        }, 500);
    });
    $('#navbtn2').on('click', function(){
        $('html, body').animate({
            scrollTop: $('#page2').offset().top
        }, 500);
    });
    $('#navbtn3').on('click', function(){
        $('html, body').animate({
            scrollTop: $('#page3').offset().top
        }, 500);
    });
	
	//네비게이션숨기기
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('.header').outerHeight();

	$(window).scroll(function(event){
		didScroll = true;
	});

	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);

	function hasScrolled() {
		var st = $(this).scrollTop();

		// Make sure they scroll more than delta
		if(Math.abs(lastScrollTop - st) <= delta)
			return;

		// If they scrolled down and are past the navbar, add class .nav-up.
		// This is necessary so you never see what is "behind" the navbar.
		if (st > lastScrollTop && st > navbarHeight){
			// Scroll Down
			$('.header').removeClass('nav-down').addClass('nav-up');
		} else {
			// Scroll Up
			if(st + $(window).height() < $(document).height()) {
				$('.header').removeClass('nav-up').addClass('nav-down');
			}
		}

		lastScrollTop = st;
		
}
	
});
/*
window.addEventListener('scroll', () => { // 삼각형 함수
		yOffset = window.pageYOffset;
		if((yOffset == 0) == false) {
			$('.header_inner .logo > img').css('visibility', 'hidden');
		} else {
			$('.header_inner .logo > img').css('visibility', 'visible');
		}
})
*/
