/**
 * Created by Kevin on 13.03.16.
 */
Meteor.publish('User.userdata', function() {
    return Meteor.users.find({}, {fields: {'username':1, 'friends':1, 'debts':1}});
});

Meteor.publish('User.usernames', function() {
    return Meteor.users.find({}, {fields: {'username':1}});
});