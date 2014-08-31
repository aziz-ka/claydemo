$(function() {

	var url = window.location.href;
	$("nav li a").each(function() {
		if(url + ".html" == this.href) {
			$(this).addClass("current");
		}
	})
	$(window).resize(function() {
		csslider();
		resizeDropdown();
	})
	
	//////////// TOGGLE ////////////
	
	$(".toggle").on("click", function(e) {
		e.preventDefault();
		openSideNav();
	})

	var openSideNav = function() {
		$("html").toggleClass("openNav");
		$(".toggle").toggleClass("toggle-pressed");
	}

	// $(".social img").on("click touchend", function() {
	// 	var className = $(this).attr("class");
	// 	$(this).toggleClass(className + "-pressed");
	// })

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

	// var slideNav = function() {
	// 	if(distance <= 75 || distance >= -75) {
	// 		return distance;
	// 	} else {
	// 		return 75;
	// 	}
	// }
	
	//////////// NAV BAR DROPDOWN ////////////
	
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
	
	//////////// IMAGE SLIDER ON HOME PAGE ////////////
	
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
	var sliderTimer = setInterval(nextSlide, 5000);
	
	var prevSlide = function() {
		var prevInput = $(".csslider input").length - Math.abs(sliderCount);
		if(sliderCount <= 0) {
			$(".csslider input:nth-of-type(" + prevInput + ")").click();
			sliderCount = prevInput - 1;
		} else {
			var el = $(".csslider input:nth-of-type(" + (sliderCount + 1) + ")");
			$(el).prev().click();
			sliderCount -= 1;
		}
		console.log("sliderCount " + sliderCount);
		console.log("prevInput " + prevInput);
	}

	var startX = 0;
	var startY = 0;
	var distanceX = 0;
	var distanceY = 0;

	$(".csslider > ul").on("touchstart", function(e) {
		e.preventDefault();
		var touchObject = e.originalEvent.targetTouches[0];
		startX = parseInt(touchObject.pageX);
		startY = parseInt(touchObject.pageY);
		// console.log(startX);
	})

	$(".csslider > ul").on("touchmove", function(e) {
		e.preventDefault();
		var touchObject = e.originalEvent.targetTouches[0];
		distanceX = parseInt(touchObject.pageX) - startX;
		distanceY = parseInt(touchObject.pageY) - startY;
		window.scroll(0, distanceY * (-1));
		console.log("x: " + distanceX);
		console.log("y: " + distanceY);
	})

	$(".csslider > ul").on("touchend", function(e) {
		e.preventDefault();
		var touchObject = e.originalEvent.targetTouches[0];
		if(distanceX < -50) {
			nextSlide();
		}
		if(distanceX > 50) {
			prevSlide();
		}
		// clearInterval(sliderTimer);
		// var sliderTimer = setInterval(nextSlide, 5000);
	})
	
	//////////// PORTFOLIO PAGES ////////////

	var lightbox = $(".gallery li img");
	var numOfClicks = 0;

	lightbox.click(function() {
		if($(window).width() > 600) {
			that = this;
			var imageURI = $(this).attr("src");
			$(".largeImage").attr({src: imageURI}).addClass("modal");
			$(".modal, .overlay").css("visibility", "visible");
		}
	})
	
	$(".overlay, .close").click(function() {
		$(lightbox).removeClass("modal");
		$(".modal, .overlay").css("visibility", "hidden");
		numOfClicks = 0;
	})

	$(".next").click(function() {
		// debugger
		numOfClicks += 1;
		var imageIndex = lightbox.index(that) + numOfClicks;
		if (imageIndex === lightbox.length) {
			numOfClicks = lightbox.index(that) * (-1);
			$(".largeImage").attr("src", $(lightbox[0]).attr('src'));
		} else {
			$(".largeImage").attr("src", $(lightbox[imageIndex]).attr('src'));
		}
	})

	$(".previous").click(function() {
		numOfClicks += 1;
		var imageIndex = lightbox.index(that) - numOfClicks;
		if (imageIndex < 0) {
			numOfClicks = (lightbox.length - lightbox.index(that) - 1) * (-1);
			$(".largeImage").attr("src", $(lightbox[lightbox.length - 1]).attr('src'));
		} else {
			$(".largeImage").attr("src", $(lightbox[imageIndex]).attr('src'));
		}
		// console.log(imageIndex);
	})
})