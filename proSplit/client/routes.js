/**
 * Created by Kevin on 13.03.16.
 */
Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', function () {
    this.layout('layout');
    if(Meteor.userId()){
        this.render('home');
    }else{
        //this.render('login');
    }
});