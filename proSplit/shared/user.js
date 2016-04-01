/**
 * Created by Kevin on 13.03.16.
 */
Meteor.methods({
    "Users.addFriend": function(username){
        Meteor.users.update({_id: Meteor.user()._id}, {$push:{'friends': username}});
    }
});