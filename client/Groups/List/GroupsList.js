Meteor.subscribe("Groups");

Template.GroupsListOwner.helpers({
    groups: function() {
        return App.Collections.Groups.find({owner: Meteor.userId()}).fetch();
    }
});

Template.GroupsListMember.helpers({
    groups: function() {
        return App.Collections.Groups.find({members: Meteor.userId()}).fetch();
    }
});
