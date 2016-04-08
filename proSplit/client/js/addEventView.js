/**
 * Created by Kevin on 13.03.16.
 */
Deps.autorun(function(){
    Meteor.subscribe('Events.eventdata');
});

Template.addEventView.events({
    "click #addEvent": function(event){
        event.preventDefault();
        var title = $("#eventTitle").val();
        Meteor.call("Events.addEvent", title, function(err, res){
            if(err){
                console.log(err);
            } else {
                Meteor.call("User.addEvent", Meteor.user().username, res, function(err, res){
                    if(err) {
                        console.log(err);
                    } else {
                        console.log(res);
                        Router.go('/events');
                    }
                });
            }
        });

    }
});