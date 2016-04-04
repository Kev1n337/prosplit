/**
 * Created by Kevin on 04.04.16.
 */
Deps.autorun(function(){
    Meteor.subscribe('User.userdata');
});

Template.addBillView.helpers({
    friends: function(){
        if(Meteor.user()) {
            return Meteor.user().friends;
        }
        return [];
    }
});