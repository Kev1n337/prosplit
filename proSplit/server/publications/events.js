/**
 * Created by Kevin on 13.03.16.
 */
Meteor.publish('Events.eventdata', function() {
    return Events.find({});
});

Meteor.publish('Events.eventBills', function(eventId) {
    return Events.find({_id:eventId}, {fields:{'bills':1}});
});
