/**
 * Created by Kevin on 13.03.16.
 */
Template.home.rendered = function(){
    $('#home img').attr("src", "icons/home_active.png");
    $('#events img').attr("src", "icons/event.png");
    $('#user img').attr("src", "icons/user.png");
    $('#more img').attr("src", "icons/more.png");
    $('#home-label').addClass("active");
    $('#event-label').removeClass("active");
    $('#user-label').removeClass("active");
    $('#more-label').removeClass("active");
};