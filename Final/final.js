var teachRating;
var knowledgeRating;

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function footerAlign() {
	$("footer").css("display", "block");
	$("footer").css("height", "auto");
	var footerHeight = $("footer").outerHeight();
	$("body").css("padding-bottom", footerHeight);
	$("footer").css("height", footerHeight);
}

jQuery.fn.ratingStars = function( options ) {
 
    var defaults = {
        selectors: {
            starsSelector: '.rating-stars',
            starSelector: '.rating-star',
            starActiveClass: 'is--active',
            starHoverClass: 'is--hover',
            starNoHoverClass: 'is--no-hover',
            targetFormElementSelector: '.rating-value'
        }
    };
 
    var settings = $.extend( {}, defaults, options );

    var methods = {
        init: function(element) {
            var me = this;
            
            methods.registerEvents(element);
            methods.loadDefaultValue(element);
        },

        loadDefaultValue: function (element) {
            var me = this;
            var defaultValue = $(element).children(settings.selectors.targetFormElementSelector).val();

            var i = 0;
            $.each($(element).children(settings.starsSelector).children(settings.starSelector), function(index, element) {
                if(i <= (defaultValue - 1)) {
                    $(element).addClass(settings.selectors.starActiveClass);
                }
                i++;
            });
        },

        registerEvents: function (element) {
            var me = this;
    
            $.each($(element).children(settings.starsSelector).children(settings.starSelector), function(index, starElement) {
                $(starElement).on("mouseenter", $.proxy(me.onStarEnter, me, starElement, element));
                $(starElement).on("mouseleave", $.proxy(me.onStarLeave, me, starElement, element));
                $(starElement).on("click touchstart", $.proxy(me.onStarSelected, me, starElement, element));
            });
        },

        onStarEnter: function(starElement, container) {
            var me = this;
             var elementIndex = $(starElement).index();
     if(container[0].id === teach){
        teachRating=elementIndex;
     }else if(container[0].id === knowledge){
         knowledgeRating = elementIndex;
     }
            // add the hover classes
            var i = 0;
            $.each($(container).children(settings.starsSelector).children(settings.starSelector), function(index, element) {
                if(i <= elementIndex) {
                    // add a class to represent the chosen stars.
                    $(element).addClass(settings.selectors.starHoverClass);
                } else {
                    // add a class to represent the remaining stars.
                    $(element).addClass(settings.selectors.starNoHoverClass);
                }
                i++;
            });

            $(container).trigger("ratingOnEnter", {
                ratingValue: (elementIndex + 1)
            });
        },
    
        onStarLeave: function(starElement, container) {
            var me = this;
            var elementIndex = $(starElement).index();
    
            // remove all hover classes
            $(container).children(settings.starsSelector).children(settings.starSelector).removeClass(settings.selectors.starHoverClass);
            $(container).children(settings.starsSelector).children(settings.starSelector).removeClass(settings.selectors.starNoHoverClass);

            $(container).trigger("ratingOnLeave", {
                ratingValue: (elementIndex + 1)
            });
        },
    
        onStarSelected: function(starElement, container) {
            var me = this;
            var elementIndex = $(starElement).index();
            console.log(container[0].id);
            console.log(elementIndex);
    
            // remove the currently selected class
            $(container).children(settings.starsSelector).children(settings.starSelector).removeClass(settings.selectors.starActiveClass);
    
            // set the selected class for the stars
            var i = 0;
            $.each($(container).children(settings.starsSelector).children(settings.starSelector), function(index, element) {
                if(i <= elementIndex) {
                    $(element).addClass(settings.selectors.starActiveClass);
                }
                i++;
            });
    
            // set the rating value to the form
            $(container).children(settings.selectors.targetFormElementSelector).val(elementIndex + 1);

            $(container).trigger("ratingChanged", {
                ratingValue: (elementIndex + 1)
            });
        }
    };
 
    return this.each(function() {
        methods.init($(this));
    });
};
$(document).ready(()=>{
    let cook = JSON.parse(readCookie('tutorLink'));
    let tutorID = cook.tutor.tutorID;
    let courseID = cook.course_id;
    let linkedInID = cook.tutor.tutor.linkedin_ID;
    $('#linkdIn').attr('href','https://linkedin.com/in/'+linkedInID);
    $('#done').click(()=>{
        $.post("http://localhost:3000/api/tutors/"+tutorID+"/rate",'tutor_rate='+(teachRating+1)+'&course_ID='+courseID+'course_rate='+(knowledgeRating+1),(data)=>{
            document.location.replace('../index.html');
        },'jsonp')
    });
});