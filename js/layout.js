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

	var Box = $(".cont_inner > .section");
	var timer = 8000;
	var count = 0;

	var focus = setInterval (function(){
			count++;
			var first = count % 5,
				second = (count + 1) % 5,
				third = (count + 2) % 5,
				fourth = (count + 3) % 5,
				fifth = (count + 4) % 5;

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
	console.log("작동");

	}, timer)
	

});