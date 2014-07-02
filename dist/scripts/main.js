/*	@group Info

	MAIN SCRIPTS - Last updated: 23-04-14
*/

//-----------------------------------------------------------------
// IE Caution Message
//-----------------------------------------------------------------

$('.lv-alert .close-btn').click(function(){ $(this).parent().slideUp();});

//-----------------------------------------------------------------
// Topbar
//-----------------------------------------------------------------

$('#lv-topbar').lvTopBar(
{
	search: true,
	searchAction: '/',
	searchMethod: 'get',
	searchName: 'q',
	searchSelector: '.lv-search-icon',
	searchText: 'Search',
	clickDefault: 'mouseover'
});

//-----------------------------------------------------------------
// Document Ready
//-----------------------------------------------------------------

$(document).ready(function() {

	NProgress.start(); // Start preloader bar
	setupHero(); // Setup Banner

	// Magnific popup lightbox
	// $('.popup-youtube').magnificPopup({
 //        disableOn: 700,
 //        type: 'iframe',
 //        mainClass: 'mfp-fade',
 //        removalDelay: 160,
 //        preloader: false,
 //        fixedContentPos: false
 //      });
});

//-----------------------------------------------------------------
// setupHero
//-----------------------------------------------------------------

function setupHero(){

	var isMobile = $(window).width() < 768;
	var heroCount = $(".lv-hero").length;
	var heroModule = $('.lv-hero-wrapper');

	//==================================================
	// Preload image
	//==================================================

		$('.lv-hero').each(function(index){

			var target = $(this);
			var imgPath = target.attr('data-background-image');

			// Preload the first hero

			if (index == 0) {
				$('<img src="'+imgPath+'">').bind('load', function(e) {
					heroModule.addClass('is-loaded');
					launchHero(heroModule);
					NProgress.done();
					target.hide().fadeIn(1000); // must go last
				});
			}

			// Add the background images, except on >0 on mobile
			// Mobile won't load additional images

			else if (isMobile && index > 0) return;

			target.css({"background-image": "url("+imgPath+")"});

		});

	//==================================================
	// launchHero
	//==================================================

	function launchHero(target){

		if (heroCount > 1) {

			bxSlider = $('#lv-hero-carousel').bxSlider(
			{
				auto: (isMobile ? false : true),
				mode: 'horizontal',
				adaptiveHeight: true,
				responsive: true,
				touchEnabled: false,
				pause: 8000, // Slow timer
				slideMargin: 0,
				minSlides: 1,
				controls: false,
				infiniteLoop: true,
				pager: (isMobile ? false : true),
				pagerSelector: '.lv-hero-carousel-bullets',
				onSliderLoad:  function(){  $('.lv-hero-caption').show().addClass('fadeInLeft');},
				onSlideBefore: function(){  $('.lv-hero-caption').hide().removeClass('fadeInLeft');},
				onSlideAfter:  function(){  $('.lv-hero-caption').show().addClass('fadeInLeft');}
			});

			// Switch off slider for mobile (better user experience)

			$(window).resize(function() {
				var isMobile = $(window).width() < 768;
				if (isMobile) bxSlider.stopAuto();
			});

			$(window).resize();

		} else {

		//	$('.lv-hero-caption').delay(10000).addClass('fadeInLeft');

			$('.lv-hero-caption').css("visibility", "hidden").delay(500).queue(function(next){
			    $(this).css("visibility", "visible").addClass('fadeInLeft');
			    next();
			});
		}
	}
	//if (bxCarousel) bxCarousel.destroySlider();
}

//-----------------------------------------------------------------
// +++ HELPERS +++
//-----------------------------------------------------------------

function trace(command){console.log(command+" ("+typeof(command)+")");}

//==================================================
// Search Form to send by hitting ENTER
//==================================================

$("#search-form").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
        $("#search-form").submit();
    }
});

//==================================================
// Developer: COMMAND+S for screen width
//==================================================

$(document).keypress(function(event) {
    if (event.which == 115 && (event.ctrlKey||event.metaKey)|| (event.which == 19)) {
        event.preventDefault();
        alert("(w) "+$(window).width()+" (h) "+$(window).height());
        return false;
    }
    return true;
});

//==================================================
//
//==================================================