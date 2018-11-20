(function($) {
    try {
        ScrollReveal().reveal('.site-content section:not(.parallax) > *');
        ScrollReveal().reveal('footer > *', {
            delay: 0
        });        
    } catch (error) {
        
    }
})(jQuery);
