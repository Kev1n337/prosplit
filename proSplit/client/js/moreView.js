/**
 * Created by Kevin on 13.03.16.
 */
Template.moreView.rendered = function(){
    $('#home img').attr("src", "/icons/home.png");
    $('#events img').attr("src", "/icons/event.png");
    $('#user img').attr("src", "/icons/user.png");
    $('#more img').attr("src", "/icons/more_active.png");
    $('#home-label').removeClass("active");
    $('#event-label').removeClass("active");
    $('#user-label').removeClass("active");
    $('#more-label').addClass("active");
};

Template.moreView.events({
    "click .logout": function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
    }
});