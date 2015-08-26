$(document).ready(function() {

    /* Set up single page navigation */
    $('[data-navigate]').click(function(){
        // hide all content
        $('.content').addClass("hidden");

        // show this specific div
        $("#" + $(this).data("navigate")).removeClass("hidden");
    })


});