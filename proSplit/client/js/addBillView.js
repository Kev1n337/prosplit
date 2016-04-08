/**
 * Created by Kevin on 04.04.16.
 */
Deps.autorun(function(){
    Meteor.subscribe('User.userdata');
});

Template.addBillView.rendered = function(){
    $('#home img').attr("src", "/icons/home.png");
    $('#events img').attr("src", "/icons/event_active.png");
    $('#user img').attr("src", "/icons/user.png");
    $('#more img').attr("src", "/icons/more.png");
    $('#home-label').removeClass("active");
    $('#event-label').addClass("active");
    $('#user-label').removeClass("active");
    $('#more-label').removeClass("active");
};

Template.addBillView.helpers({
    friends: function(){
        if(Meteor.user()) {
            return Meteor.user().friends;
        }
        return [];
    },
    username: function(){
        if(Meteor.user()) {
            return Meteor.user().username;
        }

    }
});

Template.addBillView.events({
    "click #addBill":function(){
        var title = $("#title").val();
        var amount = $("#sum").val();
        var payer= $("#payer_val").val();
        var receiver = $('input:checkbox:checked').map(function () {
            return this.value;
        }).get();
        var eventId = $("h1").attr("data-id");

        Meteor.call("Events.addBill",eventId, title, amount, payer, receiver, function(err, res){
            if(err){
                console.log(err);
            } else {
                //Router.go('/event/' + eventId);







                var event = Events.findOne({_id:eventId});

                var user = [];
                var balance = [];

                if(event) {
                    if($.inArray(event.owner, user) < 0) {
                        user.push(event.owner);
                    }

                    $.each(event.bills, function(key,bill){
                        if($.inArray(bill.payer, user) < 0) {
                            user.push(bill.payer);
                        }
                        $.each(bill.receiver, function(key, receiver){
                            if($.inArray(receiver, user) < 0) {
                                user.push(receiver);
                            }
                        });

                    });
                    user.sort();
                    $.each(user, function(){
                        balance.push({name: this, actBalance:0});
                        Meteor.call("User.addEvent", this.toString(), eventId,function(err, res){
                            if(err){
                                console.log(err);
                            } else {
                                console.log(res);
                            }
                        });
                    });

                    $.each(event.bills, function(key, bill){

                        $.each(balance, function(index, memb){
                            if(this.name==bill.payer){
                                memb.actBalance += Number(bill.amount);
                            }

                            $.each(bill.receiver, function(index, receiver){
                                if(memb.name==receiver){
                                    var amountPerReceiver = Number(bill.amount) / bill.receiver.length;
                                    memb.actBalance -= amountPerReceiver;
                                }
                            });

                            memb.actBalance = Number((memb.actBalance).toFixed(2)); //Round

                            if(memb.actBalance >= 0) {
                                memb.class = "green-text";
                            } else {
                                memb.class = "red-text";
                            }
                        });

                    });
                }

                var userpay = [];  //User, die bezahlen müssen
                var userget = [];  //User, die Geld bekommen
                var eqBills = [];  //{from, to, amount}
                var noRestTransfer;

                $.each(balance, function(i){
                    if(this.actBalance != 0) {
                        this.actBalance = -Number(this.actBalance); //Negativ: Bekommt Geld, Positiv: bezahlt Geld
                    }
                });

                $.each(balance, function(){
                    if(this.actBalance > 0){
                        userpay.push({name: this.name, payAmount: Number(this.actBalance)});
                    } else if(this.actBalance < 0){
                        userget.push({name: this.name, getAmount: Number(this.actBalance)});
                    }
                });


                //userpay = [{name:"Kevin", payAmount:12}, {name:"Xsile", payAmount: 1}, {name:"Dave", payAmount:17}];
                //userget = [{name:"Tim", getAmount:-13}, {name:"Vonny", getAmount: -2}, {name:"André", getAmount:-15}];


                userpay.sort(function(a, b) {return b.amount - a.amount;});  //Absteigend sortiert  arsort
                userget.sort(function(a, b) {return a.amount - b.amount;});  //Aufsteigend sortiert -- nur in Schleife? asort

                //userpay: [5,3,1] absteigend
                //userget: [-4,-3,-2] aufsteigend
                

                //
                $.each(userpay, function(i, minusUser){
                    userget.sort(function(a, b) {return a.amount - b.amount;});


                    $.each(userget, function(j, plusUser){ //Abfrage der größten offnen Summe, nach erstem aufruf abbruch
                        if(plusUser.getAmount < 0) {
                            if(minusUser.payAmount > -plusUser.getAmount) {
                                minusUser.payAmount += plusUser.getAmount; //Wenn zu zahlender Betrag größer ist, wird der negative zu erhaltende Betrag addiert.
                                 //Empfänger dann komplett ausgezahlt
                                eqBills.push({from:minusUser.name.toString(), to:plusUser.name.toString(), amount:Number(-plusUser.getAmount.toFixed(2))}); //Überweisung

                                plusUser.getAmount = 0;


                                while(minusUser.payAmount > 0) { //Zweite bzw. nachfolgende Überweisung (weniger = besser)

                                    userget.sort(function(a, b) {return a.amount - b.amount;}); //arsort aufsteigend
                                    noRestTransfer = false; //Zählvariable, wenn in $.each passender Wert gefunden wird, wird keine weitere Überweisung benötigt.

                                    var allePlusUserNull = true;
                                    $.each(userget, function(i,plusUser){
                                        if(plusUser.getAmount != 0) allePlusUserNull = false;
                                    });
                                    if(allePlusUserNull) return false;

                                    $.each(userget, function(i, plusUser){

                                        var allePlusUserNull = true;
                                        $.each(userget, function(i,plusUser){
                                            if(plusUser.getAmount != 0) allePlusUserNull = false;
                                        });
                                        if(allePlusUserNull) return false;

                                        if(minusUser.payAmount <= -plusUser.getAmount){  //Suche nach kleinstem Bekommen-Eintrag (negativ), der größer ist als aktueller Restzahlbetrag
                                            plusUser.getAmount += minusUser.payAmount; //Positiver Schuldenbetrag wird addiert

                                            eqBills.push({from:minusUser.name.toString(), to:plusUser.name.toString(), amount:Number(minusUser.payAmount.toFixed(2))}); //Überweisung
                                            minusUser.payAmount = 0; //Schuldende ist schuldenfrei
                                            noRestTransfer = true;
                                            return false;
                                        }
                                    });

                                    if(!noRestTransfer) {
                                        //Aufteilung auf alle verbleibenden Bekommen-Einträge
                                        $.each(userget, function(i, plusUser){
                                            var allePlusUserNull = true;
                                            $.each(userget, function(i,plusUser){
                                                if(plusUser.getAmount != 0) allePlusUserNull = false;
                                            });
                                            if(allePlusUserNull) return false;
                                            while(minusUser.payAmount > 0 && plusUser.getAmount != 0) {
                                                minusUser.payAmount += plusUser.getAmount; //Negativer zu erhaltender Betrag wird addiert.


                                                eqBills.push({from:minusUser.name.toString(), to:plusUser.name.toString(), amount:Number(-plusUser.getAmount.toFixed(2))}); //Überweisung
                                                plusUser.getAmount = 0; //Empfänger ist ausgezahlt

                                            }
                                        });
                                    }

                                }

                            } else {
                                plusUser.getAmount += minusUser.payAmount; //Wenn negative zu erhaltende Betrag größer ist, wird der positive Schuldbetrag addiert.

                                eqBills.push({from:minusUser.name.toString(), to:plusUser.name.toString(), amount:Number(minusUser.payAmount.toFixed(2))}); //Überweisung
                                minusUser.payAmount = 0; //Schuldende ist schuldenfrei
                            }
                            return false;
                        }
                    });
                });

                Meteor.call("Events.setEqBills", eventId, eqBills, function(err, res) {
                    if (err) {
                        console.log(err);
                    } else {

                    }
                });




            }
        });


















        /* Schön und gut, aber überflüssig:

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

        console.log(currentDebts); */





    }
});