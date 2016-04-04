/**
 * Created by Kevin on 13.03.16.
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

Router.route('/event/:id',{
    //layout:'layout',
    template: 'eventDetailView',
    data:function(){
        return Events.findOne({_id:this.params.id});
    }
});