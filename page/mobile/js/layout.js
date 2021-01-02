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
});