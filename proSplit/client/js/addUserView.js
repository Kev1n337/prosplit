/**
 * Created by Kevin on 13.03.16.
 */
Deps.autorun(function(){
    Meteor.subscribe('User.userdata');
});

Template.addUserView.events({
    "input #searchUser": function(event){
        var inputname = $(event.target).val();
        if(inputname.length > 0) {
            $('#results').empty();
            var userDocs = Meteor.users.find({"username" : {$regex : ".*"+inputname+".*"}});
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

        }
    },

    "click td": function(e){
        var username = $(e.target).text();
        Meteor.call("Users.addFriend", username, function(e){
            console.log(e);
        });
        Meteor.user().friends.sort();
        Router.go('/user');
    }
});