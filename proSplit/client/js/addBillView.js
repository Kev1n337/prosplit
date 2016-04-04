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

Template.addBillView.events({
    "click #addBill":function(){
        var title = $("#title").val();
        var amount = $("#amount").val();
        var payer= $("#payer").val();
        var receiver = $('input:checkbox:checked').map(function () {
            return this.value;
        }).get();
        var eventId = $("h1").attr("data-id");

        Meteor.call("Events.addBill",eventId, title, amount, payer, receiver, function(err, res){
            if(err){
                console.log(err);
            } else {
                Router.go('/event/' + eventId);
            }
        });
    }
});