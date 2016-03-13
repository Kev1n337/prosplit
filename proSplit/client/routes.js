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