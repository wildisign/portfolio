// JavaScript Document
var docStyle = document.documentElement.style;

// setting CSS variables inside this JS where they 
// can be declaratively used inside the CSS file.
	document.addEventListener('mousemove', function(e) {
		
	console.log("클라이언트x == ", screen.width);
	docStyle.setProperty('--mouse-x', e.clientX - (screen.width / 2));
  	docStyle.setProperty('--mouse-y', e.clientY - (screen.height / 2));
});

