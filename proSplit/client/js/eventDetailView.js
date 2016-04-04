/**
 * Created by Kevin on 13.03.16.
 */
Template.eventDetailView.rendered = function(){
    $('#home img').attr("src", "/icons/home.png");
    $('#events img').attr("src", "/icons/event_active.png");
    $('#user img').attr("src", "/icons/user.png");
    $('#more img').attr("src", "/icons/more.png");
    $('#home-label').removeClass("active");
    $('#event-label').addClass("active");
    $('#user-label').removeClass("active");
    $('#more-label').removeClass("active");
};

Template.eventDetailView.events({
    "click td": function(e){
        var bill = $(e.target).text(); //Event-Titel
        var eventId = $("h1").attr("data-id");
        Router.go('/event/' + eventId + '/' + bill);
    },

    "click #addBill": function(){
        var eventId = $("h1").attr("data-id");
        Router.go('/event/' + eventId + '/addBill');
    }
});