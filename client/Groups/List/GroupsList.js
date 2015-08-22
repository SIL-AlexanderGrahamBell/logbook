Meteor.subscribe("Groups");

Template.GroupsListMember.helpers({
    groups: function() {
        return App.Collections.Groups.find({owner: Meteor.userId()}).fetch();
    }
});
