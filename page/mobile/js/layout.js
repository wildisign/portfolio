$(window).on('load', function(){
	$('#loading').delay(300).queue(function(){
		$(this).hide()
	});
});
	$(function () {
		$(".tab_content").hide();
		$(".tab_content:first").show();
		$("ul.tabs > li").click(function () {
			$("ul.tabs > li").removeClass("active").css("color", "#777");
			//$(this).addClass("active").css({"color": "darkred","font-weight": "bolder"});
			$(this).addClass("active").css("color", "#fff");
			$(".tab_content").hide()
			var activeTab = $(this).attr("rel");
			$("#" + activeTab).show()
		});
	
	$('.nav .nav_btn').on("click", function(){
		var _this = $(this);
		var _origin = _this.parents('nav');
		
		if(_origin.hasClass('on')) {
			_origin.removeClass('on');
		} else {
			_origin.addClass('on');
		}
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