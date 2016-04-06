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
    },
    username: function(){
        return Meteor.user().username;
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


        //Receiver and payer in one array (all members once)
        var member = receiver;
        if($.inArray(payer, receiver) < 0) {
            member.push(payer);
        }


        var currentDebts = []; //{ from, to, amount }

        $.each(member, function(i, mem){
            //Schulden von mem
            var user = Meteor.users.findOne({username: mem});


            if(user) {
                var debts = user.friends;
                if(debts) {

                    $.each(member, function (j, m) {
                        if (mem != m) {
                            $.each(debts, function (k, debt) {
                                if (debt.name == m) {
                                    if (debt.amount < 0) {
                                        //mem schuldet m
                                        currentDebts.push({from: mem, to: m, amount: -debt.amount}); //found debt added to allDebtsArray
                                    }
                                }
                            });
                        }
                    });
                }
            }
        });

        console.log(currentDebts);





    }
});