Meteor.subscribe("Groups");

Template.LogsListOwner.helpers({
    groups: function() {
        return App.Collections.Logs.find({owner: Meteor.userId()}).fetch();
    }
});
