/**
 * Created by Kevin on 13.03.16.
 */
Meteor.publish('Events.eventdata', function() {
    return Events.find({});
});