// JavaScript Document
$(window).on('load', function(){
	$('#loading').delay(300).queue(function(){
		$(this).hide()
	});
});
$(function(){
	$(".events_tag").click(function(event) {
		// good
        var j = $(".events_tag").index(this);  // 존재하는 모든 버튼을 기준으로 index
        console.log(j);
		window.open(linkURL[j]); 
		return false;
	});	
	$("td").not(".month > td").addClass("days");
})