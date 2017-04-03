$(function () {
	$(".event-p2-cont>ul>li").click(function () {
		$(".event-p2-cont>ul>li").removeClass("day-clk");
		$(".event-p2-cont>ul>li").eq($(this).index()).addClass("day-clk");
		$("#p2-list li").eq($(this).index()).addClass("dis-b").siblings().removeClass("dis-b")
	});
	$(".event-p4-cont>ul>li").click(function () {
		$(".event-p4-cont>ul>li").removeClass("tab-clk");
		$(".event-p4-cont>ul>li").eq($(this).index()).addClass("tab-clk");
		$("#p4-list li").eq($(this).index()).addClass("dis-b").siblings().removeClass("dis-b")
	});
	$(".event-p5-cont>ul>li").click(function () {
		$(".event-p5-cont>ul>li").removeClass("tab-clk");
		$(".event-p5-cont>ul>li").eq($(this).index()).addClass("tab-clk");
		$("#p5-list li").eq($(this).index()).addClass("dis-b").siblings().removeClass("dis-b")
	});
	$(".event-p6-cont>ul>li").click(function () {
		$(".event-p6-cont>ul>li").removeClass("tab-clk");
		$(".event-p6-cont>ul>li").eq($(this).index()).addClass("tab-clk");
		$("#p6-list li").eq($(this).index()).addClass("dis-b").siblings().removeClass("dis-b")
	});
	$(".event-p7-cont>ul>li").click(function () {
		$(".event-p7-cont>ul>li").removeClass("tab-clk");
		$(".event-p7-cont>ul>li").eq($(this).index()).addClass("tab-clk");
		$("#p7-list li").eq($(this).index()).addClass("dis-b").siblings().removeClass("dis-b")
	});
	$(".event-p8-cont>ul>li").click(function () {
		$(".event-p8-cont>ul>li").removeClass("tab-clk");
		$(".event-p8-cont>ul>li").eq($(this).index()).addClass("tab-clk");
		$("#p8-list li").eq($(this).index()).addClass("dis-b").siblings().removeClass("dis-b")
	});
	$(".event-p9-cont>ul>li").click(function () {
		$(".event-p9-cont>ul>li").removeClass("tab-clk");
		$(".event-p9-cont>ul>li").eq($(this).index()).addClass("tab-clk");
		$("#p9-list li").eq($(this).index()).addClass("dis-b").siblings().removeClass("dis-b")
	});
})

