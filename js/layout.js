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

});