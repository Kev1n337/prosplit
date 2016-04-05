/**
 * Created by Kevin on 01.04.16.
 */
Meteor.startup(function(){

    if(!Meteor.users.findOne()) {
        var user1 = {
            username:"testuser1",
            password:"test123",
            friends:[
                {
                    name: "testuser2",
                    debt: 12.03
                }, {
                    name: "testuser3",
                    debt: -5.03
                }, {
                    name: "testuser5",
                    debt: 0
                }
            ]
        };

        var user2 = {
            username:"testuser2",
            password:"test123",
            friends:[
                {
                    name: "testuser1",
                    debt: -12.03
                }
            ]
        };

        var user3 = {
            username:"testuser3",
            password:"test123",
            friends:[
                {
                    name: "testuser1",
                    debt: 5.03
                }, {
                    name: "testuser5",
                    debt: 1
                }
            ]
        };

        var user4 = {
            username:"testuser4",
            password:"test123",
            friends:[]
        };

        var user5 = {
            username:"testuser5",
            password:"test123",
            friends:[
                {
                    name: "testuser1",
                    debt: 0
                }, {
                    name: "testuser3",
                    debt: -1
                }
            ]
        };

        Accounts.createUser(user1);
        Accounts.createUser(user2);
        Accounts.createUser(user3);
        Accounts.createUser(user4);
        Accounts.createUser(user5);
    }

    if (!Events.findOne()) {
        var event1 = {
            title: "testevent1",
            owner: "testuser1",
            bills: [{
                title:"Testbill1",
                amount: 10.00,
                payer: "testuser1",
                receiver: ["testuser1", "testuser2"]
            }, {
                title:"Testbill2",
                amount: 13.36,
                payer: "testuser2",
                receiver: ["testuser1", "testuser2"]
            }]
        };

        var event2 = {
            title: "testevent2",
            owner: "testuser4",
            bills: [{
                title:"Testbill1",
                amount: 10.00,
                payer: "testuser3",
                receiver: ["testuser3", "testuser5", "testuser1"]
            }, {
                title:"Testbill2",
                amount: 13.36,
                payer: "testuser1",
                receiver: ["testuser1", "testuser5"]
            }]
        };

        Events.insert(event1);
        Events.insert(event2);
    }

});