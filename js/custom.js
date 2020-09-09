/* Author:WebThemez
 * Author URI:http://webthemez.com
 * License: Creative Commons Attribution 3.0 License (https://creativecommons.org/licenses/by/3.0/)
 */

(function($){
	$(document).ready(function(){
		$(".banner-image").backstretch('images/logos_darker/logo_transparent_no_text.png');

		// Fixed header
		//-----------------------------------------------
		$(window).scroll(function() {
			if (($(".header.fixed").length > 0)) { 
				if(($(this).scrollTop() > 0) && ($(window).width() > 767)) {
					$("body").addClass("fixed-header-on");
				} else {
					$("body").removeClass("fixed-header-on");
				}
			};
		});

		user_block(function(){
            page_ready();
        })

		
		
		// filter items on button click
		$('.filters').on( 'click', 'ul.nav li a', function() {
			var filterValue = $(this).attr('data-filter');
			$(".filters").find("li.active").removeClass("active");
			$(this).parent().addClass("active");
			$container = $('.isotope-container').isotope({
				itemSelector: '.isotope-item',
				layoutMode: 'masonry',
				transitionDuration: '0.6s',
				filter: filterValue
			});
			console.log("filter click")
			return false;
		});


	}); // End document ready

	function page_ready() {
		
		$(window).load(function() {
			if (($(".header.fixed").length > 0)) { 
				if(($(this).scrollTop() > 0) && ($(window).width() > 767)) {
					$("body").addClass("fixed-header-on");
				} else {
					$("body").removeClass("fixed-header-on");
				}
			};
		});
		
	   $('#quote-carousel').carousel({
		 pause: true,
		 interval: 4000,
	   });
		//Scroll Spy
		//-----------------------------------------------
		if($(".scrollspy").length>0) {
			$("body").addClass("scroll-spy");
			$('body').scrollspy({ 
				target: '.scrollspy',
				offset: 152
			});
		}

		//Smooth Scroll
		//-----------------------------------------------
		if ($(".smooth-scroll").length>0) {
			$('.smooth-scroll a[href*=#]:not([href=#]), a[href*=#]:not([href=#]).smooth-scroll').click(function() {
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
					var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
					if (target.length) {
						$('html,body').animate({
							scrollTop: target.offset().top-151
						}, 1000);
						return false;
					}
				}
			});
		}

		// Animations
		//-----------------------------------------------
		if (($("[data-animation-effect]").length>0) && !Modernizr.touch) {
			$("[data-animation-effect]").each(function() {
				var $this = $(this),
				animationEffect = $this.attr("data-animation-effect");
				if(Modernizr.mq('only all and (min-width: 768px)') && Modernizr.csstransitions) {
					$this.appear(function() {
						setTimeout(function() {
							$this.addClass('animated object-visible ' + animationEffect);
						}, 400);
					}, {accX: 0, accY: -130});
				} else {
					$this.addClass('object-visible');
				}
			});
		};

		// Isotope filters
		//-----------------------------------------------
		if ($('.isotope-container').length>0) {
			$(window).load(function() {
				$('.isotope-container').fadeIn();
				var $container = $('.isotope-container').isotope({
					itemSelector: '.isotope-item',
					layoutMode: 'masonry',
					transitionDuration: '0.6s',
					filter: "*"
				});
				// filter items on button click
				$('.filters').on( 'click', 'ul.nav li a', function() {
					var filterValue = $(this).attr('data-filter');
					$(".filters").find("li.active").removeClass("active");
					$(this).parent().addClass("active");
					$container.isotope({ filter: filterValue });
					return false;
				});
			});
		};

		//Modal
        //-----------------------------------------------
		if($(".modal").length>0) {
            
			console.log("modal executed")
			$(".modal").each(function() {
				$(".modal").prependTo( "body" );
			});
		}

	}

	function user_block(callback) {
        return firebase.database().ref("/users/").once("value", function(snapshot) {
            var myValue = snapshot.val();
            
            console.log("userblock executed")

            var keyList = Object.keys(myValue);
            console.log(keyList);
            

            for (var i=0; i<keyList.length; i++){
                let details=[];
                var currKey = keyList[i];
                details.push(myValue[currKey].id_name);
                details.push(myValue[currKey].title);
                details.push(myValue[currKey].tier);
                details.push(myValue[currKey].image_url);

                console.log(details);

                var usertable = document.getElementById("userlist");

                var block = document.createElement("div");
				if (details[1] != "클랜원") {
					block.setAttribute("class","col-sm-6 col-md-3 isotope-item admin");
				}
				else {
					block.setAttribute("class","col-sm-6 col-md-3 isotope-item member");
				}
                
                var divimage = document.createElement("div");
                divimage.setAttribute("class","image-box");
                var divcontainer = document.createElement("div");
                divcontainer.setAttribute("class","overlay-container");

                var initimage = document.createElement("img");
                initimage.setAttribute("src",details[3])
                
                var hover = document.createElement("a");
                hover.setAttribute("class","overlay");
                hover.setAttribute("data-toggle","modal");
                var num = i+1;
                hover.setAttribute("data-target",`#project-${num}`);

                var searchicon = document.createElement("i");
                searchicon.setAttribute("class","fa fa-search-plus");

                var button = document.createElement("a");
                button.setAttribute("class","btn btn-default btn-block");
                button.setAttribute("data-toggle","modal");
                button.setAttribute("data-target",`#project-${num}`);
                button.innerHTML = details[0];


                divcontainer.appendChild(initimage);
                hover.appendChild(searchicon);
                divcontainer.appendChild(hover);
                divimage.appendChild(divcontainer);
                divimage.appendChild(button);
                block.appendChild(divimage);
                usertable.appendChild(block);

                var divmodal = document.createElement("div");
                divmodal.setAttribute("class","modal fade");
                divmodal.setAttribute("id",`project-${num}`);
                divmodal.setAttribute("tabindex","-1");
                divmodal.setAttribute("role","dialog");
                divmodal.setAttribute("aria-labelledby",`project-${num}-label`);
                divmodal.setAttribute("aria-hidden","true");
                var divmodal1 = document.createElement("div");
                divmodal1.setAttribute("class","modal-dialog modal-lg");
                var divmodal2 = document.createElement("div");
                divmodal2.setAttribute("class","modal-content");
                var divmodalhead = document.createElement("div");
                divmodalhead.setAttribute("class","modal-header");
                var divmodalbody = document.createElement("div");

                var closebutton = document.createElement("button");
                closebutton.setAttribute("class","close");
                closebutton.setAttribute("data-dismiss","modal");
                var spantimes = document.createElement("span");
                spantimes.setAttribute("aria-hidden","true");
                spantimes.innerHTML = "&times;"
                var spanclose = document.createElement("span");
                spanclose.setAttribute("class","sr-only")
                spanclose.innerHTML = "Close"

                closebutton.appendChild(spantimes);
                closebutton.appendChild(spanclose);

                var nickname = document.createElement("h4");
                nickname.setAttribute("class","modal-title");
                nickname.setAttribute("id",`project-${num}-label`);
                nickname.innerHTML = details[0]

                divmodalhead.appendChild(closebutton);
                divmodalhead.appendChild(nickname);


                divmodalbody.setAttribute("class","modal-body");
                var divcol12 = document.createElement("div");
                divcol12.setAttribute("class","col-md-12");
                var divfoot = document.createElement("div");
                divfoot.setAttribute("class","modal-footer");
                var divrow = document.createElement("div");
                divrow.setAttribute("class","row");


                var modalimage = document.createElement("img");
                modalimage.setAttribute("src",details[3]);
                var linebreak = document.createElement("br");
                var title = document.createElement("h3");
                title.innerHTML = details[1];
                var paragraph = document.createElement("p");
                paragraph.innerHTML = details[2];

                divcol12.appendChild(modalimage);
                divcol12.appendChild(linebreak);
                divcol12.appendChild(title);
                divcol12.appendChild(paragraph);
                divrow.appendChild(divcol12);
                divmodalbody.appendChild(divrow);

                var bottombutton = document.createElement("button");
                bottombutton.setAttribute("type","button");
                bottombutton.setAttribute("class","btn btn-sm btn-default");
                bottombutton.setAttribute("data-dismiss","modal");
                bottombutton.innerHTML = "Close";

                divfoot.appendChild(bottombutton);

                divmodal2.appendChild(divmodalhead);
                divmodal2.appendChild(divmodalbody);
                divmodal2.appendChild(divfoot);

                divmodal1.appendChild(divmodal2);
                divmodal.appendChild(divmodal1);

                block.appendChild(divmodal);
                
            }

            callback();
        })
    };

})(this.jQuery);