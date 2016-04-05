/**
 * Created by  on 13.03.16.
 */
Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', function () {
    this.layout('layout');
    if(Meteor.userId()){
        this.render('homeView');
    }else{
        this.render('loginView');
    }
});

Router.route('/more', function() {
    this.layout('layout');

    this.render('moreView');
});

Router.route('/user', function() {
    this.layout('layout');
    this.render('userView');
});

Router.route('/addUser', function(){
    this.layout('layout');
    this.render('addUserView');
});

Router.route('/events', function() {
    this.layout('layout');
    this.render('eventsView');
});

Router.route('/addEvent', function(){
    this.layout('layout');
    this.render('addEventView');
});

Router.route('/event/:id/addBill', {
    template: 'addBillView',
    data:function(){
        return Events.findOne({_id:this.params.id});
    }
});

Router.route('/event/:id',{
    //layout:'layout',
    template: 'eventDetailView',
    data:function(){
        var event = Events.findOne({_id:this.params.id});

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
            });

            $.each(event.bills, function(key, bill){

                $.each(balance, function(index, memb){
                    if(this.name==bill.payer){
                        memb.actBalance += bill.amount;
                    }

                    $.each(bill.receiver, function(index, receiver){
                        if(memb.name==receiver){
                            var amountPerReceiver = bill.amount / bill.receiver.length;
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

        var ret = {
            event: event,
            member: user,
            balance: balance
        };


        return ret;
    }
});

Router.route('/event/:id/:bill', {
    template: 'billDetailView',
    data:function(){

        var billTitle = this.params.bill;
        var doc = Events.findOne({_id:this.params.id}, {fields:{'bills':1}});
        var doc2 = {title: "default"};
        //return doc;
        if(doc) {
            doc.bills.forEach(function (value) {
                if (value.title == billTitle) {
                    doc2 = {
                        title: value.title,
                        amount: value.amount,
                        payer: value.payer,
                        receiver: value.receiver
                    };
                }
            });
        }
        return doc2;
    }
});