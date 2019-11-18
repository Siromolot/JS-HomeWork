$(document).ready(function() {

    $("#around_button").hover(

        function() {
            let randomNumTop = Math.floor( Math.random() * ($(".main").height() - 80) );
            $(this).css({"top": randomNumTop + "px"});

            let randomNumLeft = Math.floor( Math.random() * ($(".main").width() - 80) );
            $(this).css({"left": randomNumLeft + "px"});
        },

        function() {
    });

});