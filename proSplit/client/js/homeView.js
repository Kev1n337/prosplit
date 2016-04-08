/**
 * Created by Kevin on 13.03.16.
 */
Deps.autorun(function(){
    Meteor.subscribe('Events.lastEvents');
    Meteor.subscribe('Users.userdata');
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
        if(Meteor.user() && Meteor.user().events) {
            var eventsSub = Meteor.user().events;

            $.each(eventsSub, function(){
                events.push(Events.findOne({_id:this.toString()}));
            });

            events.sort(function(a, b) {
                return new Date(b.createdOn) - new Date(a.createdOn);
            });

            return events.slice(0,2);
        }


        return [];
    }
});

Template.homeView.events({
    "click td": function(e){
        var id = $(e.target).data("id");
        if(id == "show_more") {
            Router.go('/events');
        } else {
            Router.go('/event/' + id);
        }
    }
});