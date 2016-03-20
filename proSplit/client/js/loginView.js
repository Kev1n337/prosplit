/**
 * Created by Kevin on 13.03.16.
 */
Template.loginView.events({
    "click #register": function(event){
        event.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();

        Accounts.createUser({
            username:username,
            password:password,
            friends:[],
            debts:[]
        });

        Router.go('/');
    },

    "click #login": function(event){
        event.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        Meteor.loginWithPassword(username, password, function(error){
            if(error) {
                console.log(error.reason);
            } else {
                Router.go('/');
            }

        });
    },

    "input #username": function() {
        var username = $('#username').val();
        if(username.length > 0) {
            var userDoc = Meteor.users.findOne({username:username});
            if(!userDoc) {
                $('#register').removeAttr("disabled");
                $('#login').attr("disabled", "disabled");

            } else {
                $('#login').removeAttr("disabled");
                $('#register').attr("disabled", "disabled");
            }
        } else {
            $('#login').attr("disabled", "disabled");
            $('#register').attr("disabled", "disabled");
        }
    }
});