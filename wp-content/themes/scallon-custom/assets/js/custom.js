jQuery(document).ready(function($) {

    // custom radio
    $('.wpcf7-list-item input').each(function() {
        $(this).after('<span class="checkmark"></span>');
    });

    $('a').smoothScroll();

    // moibe menu
    $('.mobile-icon').click(function() {
        $('.mobile-icon').toggleClass('toggle-btn');
        $('.nav').slideToggle();
    });
    if ($(window).width() <= 767) {
        $('.nav ul li a').click(function() {
            $('.nav').css("display", "none");
            $('.mobile-icon').removeClass('toggle-btn');
        });
    }

    // contact scroll section
    /*$(".nav ul li:last-child a").click(function() {
    	event.preventDefault();
        $('html, body').animate({
            scrollTop: $("#worktogrther").offset().top
        }, 2000);
    });*/

    // .about-hidden
    $(document).ready(function() {
        $("#toggle").click(function() {
            $('.about-sec').toggleClass('about-bg');
            var elem = $("#toggle").text();
            if (elem == "Read More") {
                //Stuff to do when btn is in the read more state
                $("#toggle").text("Read Less");
                $("#text").slideDown();
            } else {
                //Stuff to do when btn is in the read less state
                $("#toggle").text("Read More");
                $("#text").slideUp();
            }
        });
    });


    // other Projects
    if ($(window).width() > 767) {
        var project_id = $(".other-projects .other-projects-img p:first-child a").data("id");
        home_sale_slider(project_id);
    } else {
        var project_id = $(".other-projects .select-dropdown select option:selected").val();
        home_sale_slider(project_id);
    }

    $(".other-projects .other-projects-img > p > a").on("click", function(event) {
        event.preventDefault();
        var project_id = jQuery(this).data("id");
        home_sale_slider(project_id);
    });

    $(".other-projects .select-dropdown select").change(function() {
        var project_id = jQuery(this).val();
        home_sale_slider(project_id);
    });

    //gallery page
    /*$(".gallery-anchor").on("click", function(event){
    	event.preventDefault();
    	var pagedValue = $(this).data("id");
    	var projectTitle = $(this).data("name");
    	fetch(pagedValue,projectTitle);
    });*/



    // $('.masnory-grid').masonry({
    //   // options...
    //   itemSelector: '.gallery-item',
    //   // columnWidth: 200
    // });

    // flex-slider
    $(window).load(function() {
        $('.spruce-sec').removeClass("slider-loading");

        $('.gallery-slider').flexslider({
            animation: "slide",
            animationLoop: true,
            controlNav: "thumbnails"
        });

        function getGridSize() {
            return (window.innerWidth < 600) ? 2 :
                (window.innerWidth < 1440) ? 3 : 4;
        }

        $('.homesale-slider').flexslider({
            animation: "slide",
            animationLoop: true,
            itemWidth: 280,
            itemMargin: 25,
            touch: true,
            maxItems: getGridSize()
        });

        // responsiveness slider
        $("#slider2").responsiveSlides({
            animation: "slide",
            auto: true,
            pager: true,
            speed: 300,
            maxwidth: 540
        });
    });


    /*function fetch(pagedValue,projectTitle) {
    	$.ajax({
    		type: 'POST',
    		url: '../wp-admin/admin-ajax.php',
    		data: {
    			action: 'data_fetch',
    			'paged': pagedValue
    		},
    		success: function( response ) {
    			if(response){
    				console.log(response);
    				$('#show-title').html(projectTitle);
    				$('#custom-ajax').html(response);

    			}
    		}
    	});
    }*/

    function home_sale_slider(filterValue) {
        $.ajax({
            type: 'POST',
            url: 'wp-admin/admin-ajax.php',
            data: {
                project_id: filterValue,
                action: 'project_posts'
            },
            beforeSend: function() {
                $('.spruce-sec').addClass("slider-loading");
            },
            success: function(response) {
                $('.spruce-sec').removeClass("slider-loading");
                if (response) {
                    if ($(".spruce-sec .slider-wrap").length && $(".spruce-sec .spruce-inner-content").length) {
                        $(".spruce-sec .slider-wrap").remove();
                        $(".spruce-sec .spruce-inner-content").remove();
                        $(response).insertBefore(".spruce-sec .other-projects");
                    } else {
                        $(response).insertBefore(".spruce-sec .other-projects");
                    }

                }
                $('.project-slider').flexslider({
                    animation: "slide",
                    animationLoop: true,
                    controlNav: "thumbnails"
                });
            }
        });
    }


    // gallery page slider
    $('.multiple-items').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [{

            breakpoint: 1023,
            settings: {
                slidesToShow: 2,
                infinite: true,
                slidesToScroll: 1
            }

        }, {

            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                dots: true,
                slidesToScroll: 1,
            }

        }, {

            breakpoint: 599,
            settings: {
                slidesToShow: 1,
                dots: true,
                slidesToScroll: 1,
            }

        }]
    });


    // animation call
    new WOW().init();

});