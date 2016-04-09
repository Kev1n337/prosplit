/**
 * Created by Kevin on 13.03.16.
 */
Meteor.methods({
    "Events.addEvent":function(title){
        return Events.insert({title:title, owner:Meteor.user().username, createdOn:new Date() ,bills:[], eqBills:[]});
        //Meteor.users.update({username:Meteor.user().username}, $push:{events:})
    },

    "Events.addBill":function(eventId, title, amount, payer, receiver){
        Events.update({_id: eventId}, {$push:{'bills': {title: title, amount:amount, payer:payer, receiver:receiver}}});
    },

    "Events.setEqBills":function(eventId, eqBills){
        Events.update({_id: eventId}, {$set: {eqBills : eqBills}});
    }
});