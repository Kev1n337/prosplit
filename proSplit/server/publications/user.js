/**
 * Created by Kevin on 13.03.16.
 */
Meteor.publish('User.userdata', function() {
    return Meteor.users.find({}, {fields: {'friends':1, 'debts':1}});
});