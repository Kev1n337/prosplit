/**
 * Created by Kevin on 13.03.16.
 */
Deps.autorun(function(){
    Meteor.subscribe('Events.lastEvents');
});

Template.homeView.rendered = function(){
    $('#home img').attr("src", "/icons/home_active.png");
    $('#events img').attr("src", "/icons/event.png");
    $('#user img').attr("src", "/icons/user.png");
    $('#more img').attr("src", "/icons/more.png");
    $('#home-label').addClass("active");
    $('#event-label').removeClass("active");
    $('#user-label').removeClass("active");
    $('#more-label').removeClass("active");
};

Template.homeView.helpers({
    username: function(){
        if(Meteor.user()) {
            return Meteor.user().username;
        }
        return "";
    },

    events: function(){
        var events = [];
        console.log(Events.find().fetch());
        return Events.find({}, {$sort: {createdOn:1}});

        return events;
    }
});