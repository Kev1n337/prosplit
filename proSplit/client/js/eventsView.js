/**
 * Created by Kevin on 13.03.16.
 */
Deps.autorun(function(){
    Meteor.subscribe('Events.eventdata');
});

Template.eventsView.rendered = function(){
    $('#home img').attr("src", "icons/home.png");
    $('#events img').attr("src", "icons/event_active.png");
    $('#user img').attr("src", "icons/user.png");
    $('#more img').attr("src", "icons/more.png");
    $('#home-label').removeClass("active");
    $('#event-label').addClass("active");
    $('#user-label').removeClass("active");
    $('#more-label').removeClass("active");

    var eventsAr = [];
    var events = Events.find().forEach(function(value){
        eventsAr.push(value.title);
    });
    console.log(Events.find().fetch());
    $.each(events, function(key,value){
        //var tablerow = '<tr><a href="/event/' + value.title + '"><td><span style="float:left;">' + value.title + '</span><img src="/next.png" style="float: right;width:20px;" /></td></a></tr>';
        console.log(key + ": " + value);
        //$('#events').append(tablerow);
    });
};

Template.eventsView.events({
    "click td": function(e){
        var event = $(e.target).text(); //Event-Titel
        Router.go('/event/' + event);
    }
});

Template.eventsView.helpers({
    events: function(){
        return Events.find();
    }
});