Meteor.startup(function() {
    App.Actions.resize();

    window.addEventListener('resize', function(event){
        App.Actions.resize();
    });
});

App.Actions.resize = function() {
    var viewportHeight = $(window).height();
    var headerHeight = $('.main-header').height();
    var publicHeight = $('.public').height();
    var contentHeight = $('.content').height();
    var menuHeight = $('.main-sidebar').height();

    if (viewportHeight > Math.max(contentHeight) + headerHeight) {
        $('.public, .content-wrapper, .main-sidebar').css('min-height', viewportHeight - headerHeight);
    } else {
        // $('.public, .content-wrapper, .main-sidebar').css('min-height', Math.max(contentHeight, menuHeight, publicHeight));
    }
}
