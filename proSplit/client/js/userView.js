/**
 * Created by Kevin on 13.03.16.
 */
Deps.autorun(function(){
    Meteor.subscribe('User.userdata');
});

Template.userView.rendered = function(){
    $('#home img').attr("src", "icons/home.png");
    $('#events img').attr("src", "icons/event.png");
    $('#user img').attr("src", "icons/user_active.png");
    $('#more img').attr("src", "icons/more.png");
    $('#home-label').removeClass("active");
    $('#event-label').removeClass("active");
    $('#user-label').addClass("active");
    $('#more-label').removeClass("active");
};

Template.userView.helpers({
    friends: function(){
        console.log(Meteor.user().friends);
        return Meteor.user().friends;
    }
});