$(function() {
	var url = window.location.href;
	$("header ul li a").each(function() {
		if(url == this.href) {
			$(this).addClass("current");
		}
	})
	$(document).ready(function() {
//		csslider();
		resizeDropdown();
	})
	$(window).resize(function() {
		csslider();
		resizeDropdown();
	})
	
	var csslider = function() {
		$(".csslider > ul").height($(".csslider > ul > li > img").height());
	}
	
	var count = 0;
	
	var changeSlide = function() {
		count += 1;
		var el = $(".csslider input:nth-of-type("+count+")");
		$(el).next().click();
		if(count == $(".csslider input").length) {
			$(".csslider input:nth-of-type(1)").click();
			count = 0;
		}
	}
	
	setInterval(changeSlide, 5000);
	
	var resizeDropdown = function() {
		if($(window).width() > 600) {
			var left = Math.floor($("body").width() / -2.53);
			$(".dropdown").width($("body").width()).css("left", left);
		} else {
			$(".dropdown").css("left", "inherit").css("width", "inherit");
		}
	}
	$("#portfolio").mouseover(function() {
		resizeDropdown();
	})
	$("#portfolio > a").click(function(e) {
		e.preventDefault();
	})
	
	$(".toggle").click(function(e) {
		e.preventDefault();
		if ($("html").hasClass("openNav")) {
			$("html").removeClass("openNav");
			$(".toggle").css("color", "inherit");
		} else {
  		$("html").addClass("openNav");
			$(".toggle").css("color", "#444");
		}
	})
	
	var hoverme = $(".gallery li img");
	// hoverme.hover(function() {
	// 	$(hoverme).css("-webkit-filter", "blur(3px)");
	// 	$(this).css("-webkit-filter", "blur(0)");
	// }, function() {
	// 	$(hoverme).css("-webkit-filter", "blur(0)");
	// 	$(this).css("-webkit-filter", "blur(0)");
	// });
	hoverme.click(function() {
		if($(window).width() > 600) {
			that = this;
			var imageURI = $(this).attr("src");
			$(".largeImage").attr({src: imageURI}).addClass("modal");
			$(".modal, .overlay").css("visibility", "visible");
		}
	})
	
	$(".overlay, .close").click(function() {
		$(hoverme).removeClass("modal");
		$(".modal, .overlay").css("visibility", "hidden");
	})

	// var numOfClicks = 0;
	// $(".next").click(function() {
	// 	numOfClicks += 1;
	// 	console.log(numOfClicks);
	// 	return numOfClicks;
	// })

	$(".next").click(function() {
		// debugger
		var count = hoverme.index(that);
		if (count >= 0) {
			$(".largeImage").attr("src", $(hoverme[count + 1]).attr('src'));
		}
		if (count === hoverme.length - 1) {
			$(".largeImage").attr("src", $(hoverme[0]).attr('src'));
		}
//		console.log(that);
	})

	$(".previous").click(function() {
		// debugger
		var count = hoverme.index(that);
		if (count < hoverme.length) {
			$(".largeImage").attr("src", $(hoverme[count - 1]).attr('src'));
		}
		if (count === 0) {
			$(".largeImage").attr("src", $(hoverme[hoverme.length - 1]).attr('src'));
		}
//		console.log(that);
	})
})