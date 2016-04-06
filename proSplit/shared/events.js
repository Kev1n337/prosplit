/**
 * Created by Kevin on 13.03.16.
 */
Meteor.methods({
    "Events.addEvent":function(title){
        Events.insert({title:title, owner:Meteor.user().username, createdOn:new Date() ,bills:[]});
    },

    "Events.addBill":function(eventId, title, amount, payer, receiver){
        Events.update({_id: eventId}, {$push:{'bills': {title: title, amount:amount, payer:payer, receiver:receiver}}});
    }
});