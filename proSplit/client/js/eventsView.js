/**
 * Created by Kevin on 13.03.16.
 */
Deps.autorun(function(){
    Meteor.subscribe('Events.eventdata');
});

Template.eventsView.rendered = function(){
    $('#home img').attr("src", "/icons/home.png");
    $('#events img').attr("src", "/icons/event_active.png");
    $('#user img').attr("src", "/icons/user.png");
    $('#more img').attr("src", "/icons/more.png");
    $('#home-label').removeClass("active");
    $('#event-label').addClass("active");
    $('#user-label').removeClass("active");
    $('#more-label').removeClass("active");

};

Template.eventsView.events({
    "click td": function(e){
        var event = $(e.target).text(); //Event-Titel
        var id = $(e.target).attr("data-id");
        console.log(id);
        Router.go('/event/' + id);
    }
});

Template.eventsView.helpers({
    events: function(){
        return Events.find();
    }
});