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
        Router.go('/event/' + id);
    }
});

Template.eventsView.helpers({
    events: function(){
        var events = [];
        var docs = Events.find();

        if(docs) {
            $.each(docs.fetch(), function(i, event){
                if(event && event.bills) {
                    $.each(event.bills, function(j, bill){
                        if(bill.payer == Meteor.user().username || $.inArray(Meteor.user().username, bill.receiver) > 0) {
                            events.push(event);
                            return false;
                        }
                    });
                }

            });
        }

        return events;
    }
});