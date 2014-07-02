/*	@group Info

	LIQUIDVISUAL.TOPBAR.JS  **ALPHA v.2**
	
	Last updated: 22.04.14
	
	Copyright 2014 - http://liquidvisual.com
	
	Released under the MIT license - http://opensource.org/licenses/MIT
	
	Notes: http://starter.pixelgraphics.us
	
*/

//----------------------------------------------------------------
// - USAGE -
//----------------------------------------------------------------

//$(window).load(function(){
//
//	$('#lv-topbar-1').lvTopBar(
//	{
//		search: true,
//		searchSelector: '.lv-search-icon',
//		searchText: 'Search',
//		searchMethod: 'get',
//		searchAction: '/',
//		clickDefault: 'mouseover'
//	});
//});

//----------------------------------------------------------------
// lvTopBar
//----------------------------------------------------------------

;(function($) {

	$.lvTopBar = function(element, options) {
	
	var defaults = {
	
		 search: false,
		 searchSelector: '.lv-search-icon',
		 searchText: 'Search',
		 searchMethod: 'get', 
		 searchAction: '/search/',
		 clickDefault: 'mouseover',
		 onFoo: function() {}
	}
	
  	var plugin = this;

  	// plugin.settings.propertyName from inside the plugin or
  	// theElement.data('lvTopBar').settings.propertyName from outside the plugin, 

  	plugin.settings = {}

  	var $element = $(element), // reference to the jQuery version of DOM element
 		  element = element;    // reference to the actual DOM element
  
  //------------------------------------------------
  // init
  //------------------------------------------------
  
  	plugin.init = function() {

   	plugin.settings = $.extend({}, defaults, options);

   	setupSearch();
   			
   	setupDropdowns();
   	
   	// Open Nav on Hover
   	
   	$('.lv-menu-icon', $element).click(function(){
   	 	
   		$('.lv-topbar-body', $element).slideToggle(300);
   		
   		return false;
   	});
   	
   	$element.addClass('is-loaded');
  	}

  	//------------------------------------------------
  	// Public Methods
  	//------------------------------------------------

  	// Eg. plugin.methodName(arg1, arg2, ... argn) from inside the plugin or
  	// theElement.data('lvTopBar').publicMethod(arg1, arg2, ... argn) from outside 

  	plugin.publicMethod = function() {

  	}
  	
  	//================================================
  	// Private | setupSearch
  	//================================================
  	
  	var setupDropdowns = function() {
  		
  		var clickDefault = plugin.settings.clickDefault;
  		
  		// Inject wrappers to establish relative context for is-liquid dropdowns.
  		// Resolves issue in Firefox.
  			
		$('.lv-dropdown', $element)
		.not('.lv-dropdown .lv-dropdown')
		.wrap('<div class="lv-dropdown-outer"><div class="lv-dropdown-inner"></div></div>');
		
		// Loop through dropdown anchors
									
	   $('.has-dropdown > a', $element).each(function() {
	   		   	
	   	var $dropdown = $(this).parent().find('.lv-dropdown-inner').first();
	   	
	   	//==========================================
	   	// ** CLICK **
	   	//==========================================
	   	
	   	$(this).on('click', $dropdown, function(e){
	  		  	 		  			  	  		  	
	  			// close all other instances first
	  		  	
	  		  	$('.lv-dropdown-inner').slideUp(200);
	  		  			  		  			  		  		  		  		  					  			
	  			$dropdown.stop().slideToggle(300);
		  			
		  		if (clickDefault == 'click' || $(window).width() < 768){		  			
		  			return false;
	  			}	
	  
	   	});
	   });
  	}
  				
	//================================================
	// Private | setupSearch
	//================================================
	
	var setupSearch = function() {
			
		var selector 	= $(plugin.settings.searchSelector, $element);
		var action 		= plugin.settings.searchAction;
		var text 		= plugin.settings.searchText;
		var method 		= plugin.settings.searchMethod;
		var searchElem = $('<div class="lv-topbar-search"><form id="lv-topbar-search-form" action="'+action+'" method="'+method+'"><input type="text" name="lv-topbar-search" placeholder="'+text+'"></form></div>');
		
		if (plugin.settings.search == true) {
									 
			$element.find('.lv-topbar-header').after(searchElem);
			
			//==========================================
			// Search Form to send by hitting ENTER
			//==========================================
				
			$('#lv-topbar-search-form').keypress(function(event) {
			    if (event.which == 13) {
			        event.preventDefault();
			        $(this).submit();
			    }
			});
			
			//==========================================
			// onClick
			//==========================================
			
			selector.on("click", searchElem, function(){
			
				searchElem.slideToggle(300);
				
				return false;
			});
			
				        		
		} else {
		
			selector.remove();
		}		 	 
	};
	
	//================================================
	// INIT
	//================================================			
	
	plugin.init();

}
 
$.fn.lvTopBar = function(options) {

  return this.each(function() {

      if (undefined == $(this).data('lvTopBar')) {

          var plugin = new $.lvTopBar(this, options);

          $(this).data('lvTopBar', plugin);
      }
  });
}
	 
})(jQuery);