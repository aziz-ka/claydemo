$(function() {
	var url = window.location.href;
	$("header ul li a").each(function() {
		if(url + ".html" == this.href) {
			$(this).addClass("current");
		}
	})
	// $(document).ready(function() {
	// 	resizeDropdown();
	// })
	$(window).resize(function() {
		csslider();
		resizeDropdown();
	})
	
	$(".toggle").click(function(e) {
		e.preventDefault();
		openSideNav();
	})

	var openSideNav = function() {
		if ($("html").hasClass("openNav")) {
			$("html").removeClass("openNav").css("overflow", "visible");
			$(".toggle").css("color", "inherit");
		} else {
  		$("html").addClass("openNav").css("overflow", "hidden");
			$(".toggle").css("color", "#444");
		}
	}

	// var touchToOpenSideNav = function() {
	// 	if ($("body").hasClass("opened")) {
	// 		$("body").removeClass("opened").css("-webkit-transform", "translate3d(0, 0, 0)")
	// 																	.css("-moz-transform", "translate3d(0, 0, 0)")
	// 																	.css("-o-transform", "translate3d(0, 0, 0)")
	// 																	.css("transform", "translate3d(0, 0, 0)")
	// 																	.css("-webkit-transition", "-webkit-transform 500ms ease")
	// 																	.css("-moz-transition", "-moz-transform 500ms ease")
	// 																	.css("-o-transition", "-o-transform 500ms ease")
	// 																	.css("transition", "transform 500ms ease;");
	// 		$(".toggle").css("color", "inherit");
	// 	} else {
 //  		$("body").addClass("opened").css("-webkit-transform", "translate3d(75%, 0, 0)")
 //  																.css("-moz-transform", "translate3d(75%, 0, 0)")
 //  																.css("-o-transform", "translate3d(75%, 0, 0)")
 //  																.css("transform", "translate3d(75%, 0, 0)")
	// 																.css("-webkit-transition", "-webkit-transform 500ms ease")
	// 																.css("-moz-transition", "-moz-transform 500ms ease")
	// 																.css("-o-transition", "-o-transform 500ms ease")
	// 																.css("transition", "transform 500ms ease;");
	// 		$(".toggle").css("color", "#444");
	// 	}
	// }

	// $(".toggle").on("touchstart", function(e) {
	// 	e.preventDefault();
	// 	var touchObject = e.originalEvent.targetTouches[0];
	// 	start = parseInt(touchObject.pageX);
	// 	console.log(start);
	// })

	// $(".toggle").on("touchmove", function(e) {
	// 	e.preventDefault();
	// 	var touchObject = e.originalEvent.targetTouches[0];
	// 	distance = parseInt(touchObject.pageX) - start;
	// 	if($("body").hasClass("opened")) {
	// 		$("body").css("-webkit-transform", "translate3d(" + (75 - Math.abs(slideNav())) + "%, 0, 0)")
	// 						 .css("-moz-transform", "translate3d(" + (75 - Math.abs(slideNav())) + "%, 0, 0)")
	// 						 .css("-o-transform", "translate3d(" + (75 - Math.abs(slideNav())) + "%, 0, 0)")
	// 						 .css("transform", "translate3d(" + (75 - Math.abs(slideNav())) + "%, 0, 0)");
	// 	} else {
	// 		$("body").css("-webkit-transform", "translate3d(" + Math.abs(slideNav()) + "%, 0, 0)")
	// 						 .css("-moz-transform", "translate3d(" + Math.abs(slideNav()) + "%, 0, 0)")
	// 						 .css("-o-transform", "translate3d(" + Math.abs(slideNav()) + "%, 0, 0)")
	// 						 .css("transform", "translate3d(" + Math.abs(slideNav()) + "%, 0, 0)");
	// 	}
	// 	console.log(distance);
	// })

	$(".toggle").on("touchend", function(e) {
		e.preventDefault();
		// touchToOpenSideNav();
		openSideNav();
	})
	$("main").on("touchend", function(e) {
		e.preventDefault();
		if($("html").hasClass("openNav")) {
			// openSideNav();
		}
	})

	var slideNav = function() {
		if(distance <= 75 || distance >= -75) {
			return distance;
		} else {
			return 75;
		}
	}
	
	var resizeDropdown = function() {
		if($(window).width() > 600) {
			var left = Math.floor($("body").width() / -2.53);
			$(".dropdown").width($("body").width()).css("left", left);
		} else {
			$(".dropdown").css("left", "inherit").css("width", "inherit");
		}
	}
	resizeDropdown();

	$("#portfolio").mouseover(function() {
		resizeDropdown();
	})
	$("#portfolio > a").click(function(e) {
		e.preventDefault();
	})
	
	var cssliderHeightChange = function() {
		$(".csslider > ul").height($(".csslider > ul > li > img").height());
	}
	
	var sliderCount = 0;
	
	var nextSlide = function() {
		sliderCount += 1;
		var el = $(".csslider input:nth-of-type("+sliderCount+")");
		$(el).next().click();
		if(sliderCount == $(".csslider input").length) {
			$(".csslider input:nth-of-type(1)").click();
			sliderCount = 0;
		}
	}
	setInterval(nextSlide, 5000);

	var sliderImage = $(".csslider > ul");
	var start = 0;
	var distance = 0;

	$(sliderImage).on("touchstart", function(e) {
		e.preventDefault();
		var touchObject = e.originalEvent.targetTouches[0];
		start = parseInt(touchObject.pageX);
		console.log(start);
	})

	$(sliderImage).on("touchmove", function(e) {
		e.preventDefault();
		var touchObject = e.originalEvent.targetTouches[0];
		distance = parseInt(touchObject.pageX) - start;
		console.log(distance);
	})

	$(sliderImage).on("touchend", function(e) {
		e.preventDefault();
		var touchObject = e.originalEvent.targetTouches[0];
		if(distance < -50) {
			nextSlide();
		}
	})
	



	var image = $(".gallery li img");
	// image.hover(function() {
	// 	$(image).css("-webkit-filter", "blur(3px)");
	// 	$(this).css("-webkit-filter", "blur(0)");
	// }, function() {
	// 	$(image).css("-webkit-filter", "blur(0)");
	// 	$(this).css("-webkit-filter", "blur(0)");
	// });
	image.click(function() {
		if($(window).width() > 600) {
			that = this;
			var imageURI = $(this).attr("src");
			$(".largeImage").attr({src: imageURI}).addClass("modal");
			$(".modal, .overlay").css("visibility", "visible");
		}
	})
	
	$(".overlay, .close").click(function() {
		$(image).removeClass("modal");
		$(".modal, .overlay").css("visibility", "hidden");
	})

	// var numOfClicks = 0;
	// $(".next").click(function() {
	// 	numOfClicks += 1;
	// 	console.log(numOfClicks);
	// 	return numOfClicks;
	// })

	$(".next").click(function() {
		debugger
		var count = image.index(that);
		if (count === image.length - 1) {
			$(".largeImage").attr("src", $(image[0]).attr('src'));
		} else {
			$(".largeImage").attr("src", $(image[count + 1]).attr('src'));
		}
		console.log(that);
	})

	$(".previous").click(function() {
		var count = image.index(that);
		if (count < image.length) {
			$(".largeImage").attr("src", $(image[count - 1]).attr('src'));
		}
		if (count === 0) {
			$(".largeImage").attr("src", $(image[image.length - 1]).attr('src'));
		}
	})
})