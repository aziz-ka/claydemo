$(function() {

	var url = window.location.href;
	$("nav li a").each(function() {
		if(url + ".html" == this.href) {
			$(this).addClass("current");
		}
	})
	$(window).resize(function() {
//		csslider();
	})
	$("#portfolio > a").click(function(e) {
		e.preventDefault();
	})
	$(".inter-buyer a").hover(function() {
		$(".fa-globe").toggleClass("fa-spin");
	})
	
	//////////// TOGGLE ////////////
	
	$(".toggle").on("click touchstart", function(e) {
		e.preventDefault();
		openSideNav();
	})

	var openSideNav = function() {
		$("html").toggleClass("openNav no-scroll");
		$(".toggle").toggleClass("toggle-pressed");
	}
	
	//////////// HOME PAGE IMAGE SLIDER ////////////
	
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
		// window.scroll(0, distanceY * (-1));
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
		if($(window).width() > 600 && $(this).parent().hasClass("active")) {
			that = this;
			var imageURI = $(this).attr("src");
			$(".largeImage").attr({src: imageURI}).addClass("modal");
			$(".modal, .overlay").css("visibility", "visible");
		}
	})
	
	$(".overlay, .close").on("click", function(e) {
		e.preventDefault();
		$(lightbox).removeClass("modal");
		$(".gallery li").removeClass("active");
		$(".modal, .overlay").css("visibility", "hidden");
		numOfClicks = 0;
	})

	$(".next").on("click touchstart", function(e) {
		e.preventDefault();
		numOfClicks += 1;
		var imageIndex = lightbox.index(that) + numOfClicks;
		if (imageIndex === lightbox.length) {
			numOfClicks = lightbox.index(that) * (-1);
			$(".largeImage").attr("src", $(lightbox[0]).attr('src'));
		} else {
			$(".largeImage").attr("src", $(lightbox[imageIndex]).attr('src'));
		}
	})

	$(".previous").on("click touchstart", function(e) {
		e.preventDefault();
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
	
	if("ontouchstart" in window) {
		$(".gallery li").click(function() {
			$(".gallery li").removeClass("active");
			$(this).toggleClass("active");
		})
	} else {
		$(".gallery li").hover(function() {
			$(this).toggleClass("active");
		})
	}

	//////////// SQUARE & ETSY API ////////////

//	$.ajax({
//		url: "https://connect.squareup.com/v1/me/items",
//	  headers: { "Authorization": "Bearer ZZfRR1MSVVvahFa1sazQhA" },
//		dataType: "json",
//		method: "get",
//		success: function(data) {
//			console.log(data);
//		}
//	})

	$.ajax({
		url: "https://openapi.etsy.com/v2/users/venera88/feedback/as-subject.js?api_key=klnnnt4w3cts35bn6z9cpnql",
		dataType: "jsonp",
		method: "get",
		success: function(data) {
			for(var i = 0; i < 6; i++) {
				var feedback = data.results[i].message;
				var firstSubstring = feedback.substring(0, 140) + " ";
				var secondSubstring = feedback.substring(140);
				var readMore = $("<a>").text("read more").attr("href", "#").addClass("read-more");
				var quoteIcon = $("<i>").addClass("fa fa-quote-left");
				if (feedback.length > 140) {
					$(readMore).appendTo($("<li>").text(firstSubstring).data("text", secondSubstring).appendTo($(".feedback ul")).before(quoteIcon));
				} else {
					$("<li>").text(feedback).appendTo($(".feedback ul")).before(quoteIcon);
				}
			}
		}
	})
	
	$(".feedback ul").on("click", ".read-more", function(e) {
		e.preventDefault();
		var readLess = $(this).text("read less").removeClass("read-more").addClass("read-less");
		var parent = $(this).parent();
		$(readLess).appendTo($(parent).text($(parent).text().substring(0, 140) + $(parent).data("text") + " "));
	})
	
	$(".feedback ul").on("click", ".read-less", function(e) {
		e.preventDefault();
		var readMore = $(this).text("read more").removeClass("read-less").addClass("read-more");
		var parent = $(this).parent();
		$(readMore).appendTo($(parent).text($(parent).text().substring(0, 140) + " "));
	})

})