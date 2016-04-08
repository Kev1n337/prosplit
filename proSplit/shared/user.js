/**
 * Created by Kevin on 13.03.16.
 */
Meteor.methods({
    "Users.addFriend": function(user, friend){
        Meteor.users.update({username: user}, {$push:{'friends': {name:friend, amount:0}}});
        Meteor.users.update({username: friend}, {$push:{'friends': {name:user, amount:0}}});
    },

    "User.addEvent": function(user, eventId){
        return Meteor.users.update({username: user}, {$addToSet:{'events': eventId}});
    },

    "User.addDebt": function(user, friend, amount){
        Meteor.users.update({username: user, 'friends.name':friend}, {$set:{'friends.$.amount': friends.$.amount-amount}});
        Meteor.users.update({username: friend, 'friends.name':user}, {$set:{'friends.$.amount': friends.$.amount+amount}});
    },

    "User.setFriends":function(user, friends){
        Meteor.users.update({username:user}, {$set: {'friends': friends}});
    }
});