/**
 * Created by Kevin on 13.03.16.
 */
Deps.autorun(function(){
    Meteor.subscribe('User.userdata');
    Meteor.subscribe('Events.eventdata');
});

Template.userView.rendered = function(){
    $('#home img').attr("src", "/icons/home.png");
    $('#events img').attr("src", "/icons/event.png");
    $('#user img').attr("src", "/icons/user_active.png");
    $('#more img').attr("src", "/icons/more.png");
    $('#home-label').removeClass("active");
    $('#event-label').removeClass("active");
    $('#user-label').addClass("active");
    $('#more-label').removeClass("active");
};

Template.userView.helpers({
    friends: function(){
        var contacts = [];

        if(Meteor.user() && Meteor.user().friends) {
            var friends = Meteor.user().friends;
            $.each(friends, function(){
                contacts.push({name: this, amount:0});
            });

            //var user = Meteor.users.findOne({username:Meteor.user().username});

            console.log(Meteor.user());

            if(Meteor.user() && Meteor.user().events) {
                $.each(Meteor.user().events, function () {
                    var event = Events.findOne({_id: this.toString()});
                    $.each(event.eqBills, function (i, bill) {
                        if (Meteor.user().username == bill.to) {
                            $.each(contacts, function () {
                                if (this.name == bill.from) {
                                    this.amount += bill.amount;
                                }
                            });
                        }
                        if (Meteor.user().username == bill.from) {
                            $.each(contacts, function () {
                                if (this.name == bill.to) {
                                    this.amount -= bill.amount;
                                }
                            });
                        }
                    });
                });
            }

            $.each(contacts, function(){
                if(this.amount < 0) {
                    this.cssClass = "red-text";
                } else {
                    this.cssClass = "green-text";
                }

                console.log(this);
            });

            return contacts;
        }
        return [];
    }
});