/**
 * Created by Kevin on 13.03.16.
 */
Deps.autorun(function(){
    Meteor.subscribe('User.usernames');
});

Template.addUserView.helpers({
    users: function(){
        var allUser = Meteor.users.find();
        var nonFriends = [];
        if(allUser){
            $.each(allUser.fetch(), function(key,value) {
                if (!($.inArray(value.username, Meteor.user().friends) !== -1)) { //Schon befreundet
                    if(value.username !== Meteor.user().username) { //Eigener Username
                        nonFriends.push(value.username);
                    }

                }
            });
        }

        return nonFriends;
    }
});

Template.addUserView.events({
    "input #searchUser": function(event){
        var inputname = $(event.target).val();
        $('#results').empty();
        var userDocs;
        if(inputname.length > 0) {
            var userDocs = Meteor.users.find({"username": {$regex: ".*" + inputname + ".*"}});

        } else {
            userDocs = Meteor.users.find();
        }

        if(!userDocs){
            return;
        }

        $.each(userDocs.fetch(), function(key,value) {
            if (!($.inArray(value.username, Meteor.user().friends) !== -1)) { //Schon befreundet
                if(value.username !== Meteor.user().username) { //Eigener Username
                    $('#results').append('<tr><td><span style="float:left;">' + value.username + '</span><img src="/next.png" style="float: right;width:20px;" /></td></tr>');
                }

            }
        });


    },

    "click td": function(e){
        var friend = $(e.target).text();
        var user = Meteor.user().username;
        Meteor.call("Users.addFriend", user, friend, function(e){
            console.log(e);
        });
        Meteor.user().friends.sort();
        Router.go('/user');
    }
});