$(function() {
	var url = window.location.href;
	$("header ul li a").each(function() {
		if(url == this.href) {
			$(this).addClass("current");
		}
	});
	
	var hoverme = $(".gallery li img");
	// hoverme.hover(function() {
	// 	$(hoverme).css("-webkit-filter", "blur(3px)");
	// 	$(this).css("-webkit-filter", "blur(0)");
	// }, function() {
	// 	$(hoverme).css("-webkit-filter", "blur(0)");
	// 	$(this).css("-webkit-filter", "blur(0)");
	// });
	hoverme.click(function() {
		that = this;
		var imageURI = $(this).attr("src");
		$(".largeImage").attr({src: imageURI}).addClass("modal");
		$(".modal, .overlay").css("visibility", "visible");
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
		console.log(that);
	})
	$(".overlay, .close").click(function() {
		$(hoverme).removeClass("modal");
		$(".modal, .overlay").css("visibility", "hidden");
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
})