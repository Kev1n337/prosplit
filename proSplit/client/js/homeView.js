/**
 * Created by Kevin on 13.03.16.
 */
Deps.autorun(function(){
    Meteor.subscribe('Events.lastEvents');
    Meteor.subscribe('Users.userdata');
});

Template.homeView.rendered = function(){
    $('#home img').attr("src", "/icons/home_active.png");
    $('#events img').attr("src", "/icons/event.png");
    $('#user img').attr("src", "/icons/user.png");
    $('#more img').attr("src", "/icons/more.png");
    $('#home-label').addClass("active");
    $('#event-label').removeClass("active");
    $('#user-label').removeClass("active");
    $('#more-label').removeClass("active");

    if($(".homeContent").text().trim() == "") {
        $(".homeContent").append("<br /><h3>Schön, dass Du hier bist!</h3><br/><p>Scheinbar bist Du zum ersten Mal hier.<br /><br /> Um loszulegen, füge unter <a href='/user'>Benutzer</a> neue Kontakte hinzu.<br/> Wenn Du Kontakte hinzugefügt hast, kannst Du ein <a href='/addEvent'>Event erstellen</a> und Deine Kontakte in Zahlungen als Bezahler und Beteiligte verwenden.</p><p> An dieser Stelle findest Du später die letzten Events und noch ausstehende Ausgleichszahlungen.</p><p>Weitere Infos findest Du <a href='/more'>hier</a>. <p>Viel Spaß mit proSplit!</p>");
    }
};

Template.homeView.helpers({
    username: function(){
        if(Meteor.user()) {
            return Meteor.user().username;
        }
        return "";
    },

    events: function(){

        var events = [];
        if(Meteor.user() && Meteor.user().events) {
            var eventsSub = Meteor.user().events;

            $.each(eventsSub, function(){
                events.push(Events.findOne({_id:this.toString()}));
            });

            events.sort(function(a, b) {
                return new Date(b.createdOn) - new Date(a.createdOn);
            });

            return events.slice(0,2);
        }


        return [];
    },

    openBills: function(){
        var contacts = [];

        if(Meteor.user() && Meteor.user().friends) {
            var friends = Meteor.user().friends;
            $.each(friends, function(){
                contacts.push({name: this, amount:0});
            });

            if(Meteor.user() && Meteor.user().events) {
                $.each(Meteor.user().events, function () {
                    var event = Events.findOne({_id: this.toString()});
                    $.each(event.eqBills, function (i, bill) {
                        if (Meteor.user().username == bill.to) {
                            $.each(contacts, function () {
                                if (this.name == bill.from) {
                                    this.amount += bill.amount;
                                }
                            });
                        }
                        if (Meteor.user().username == bill.from) {
                            $.each(contacts, function () {
                                if (this.name == bill.to) {
                                    this.amount -= bill.amount;
                                }
                            });
                        }
                    });
                });
            }


            var finalArray = [];

            $.each(contacts, function(i){
                this.amount = Number(this.amount.toFixed(2));
                if(this.amount < 0) {
                    this.cssClass = "red-text";
                    finalArray.push(this);
                } else if(this.amount == 0) {
                } else {
                    this.cssClass = "green-text";
                    finalArray.push(this);
                }

            });



            return finalArray;
        }
        return [];
    }
});

Template.homeView.events({
    "click td": function(e){
        var id = $(e.target).data("id");
        if(id == "show_more") {
            Router.go('/events');
        } else {
            Router.go('/event/' + id);
        }
    }
});