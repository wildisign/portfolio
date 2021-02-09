$(window).on('load', function(){
	$('#loading').delay(300).queue(function(){
		$(this).hide()
	});
});

$(function () {
		$(".tab_content").hide();
		$(".tab_content:first").show();
		if($(window).width() >= 1025) {
			$(".container").css("overflow", "hidden");
			   console.log("히든");
		   }
			$("ul.tabs > li").click(function () {
			$("ul.tabs > li").removeClass("active").css("color", "#777");
			//$(this).addClass("active").css({"color": "darkred","font-weight": "bolder"});
			$(this).addClass("active").css("color", "#fff");
			$(".tab_content").hide()
			var activeTab = $(this).attr("rel");
			$("#" + activeTab).show()
		if($(window).width() >= 1025 && $('.tab_play').hasClass('active')) {
			$(".container").css("overflow", "hidden");
			   console.log("히든");
			$(".container").scrollTop(0);
		   }
		if($(window).width() >= 1025 && $('.tab_rent').hasClass('active')) {
			$(".container").css("overflow", "auto");
			   console.log("오토");
		   }
		});

	$('.header_inner .nav_btn').on("click", function(){
		$('.nav_sec').addClass('on');
		$('.nav_sec .bg_nav').addClass('on');
	});			
	$('.nav_sec .nav_btn.gnb').on("click", function(){
		$('.nav_sec').removeClass('on');
		$('.nav_sec .bg_nav').removeClass('on');
	});			
	//링크리스트
	let linkURL = [
		["https://m.ticket.melon.com/public/index.html#performance.index?prodId=205279"],//1st
		["https://m.ticket.melon.com/public/index.html#performance.index?prodId=205281"],//2nd
		["https://m.ticket.melon.com/public/index.html#performance.index?prodId=205333"],//3rd
	]

	$(".play_url").click(function(event) {
		// good
		event.preventDefault();
        var j = $(".play_url").index(this);  // 존재하는 모든 버튼을 기준으로 index
        console.log(j);
		window.open(linkURL[j]); 
		return false;
	});

});
			   
					   
					   