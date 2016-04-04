/**
 * Created by Kevin on 13.03.16.
 */
Meteor.methods({
    "Users.addFriend": function(user, friend){
        Meteor.users.update({username: user}, {$push:{'friends': friend}});
        Meteor.users.update({username: friend}, {$push:{'friends': user}});
    }
});