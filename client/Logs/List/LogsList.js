Meteor.subscribe("Logs");

Template.LogsListOwner.helpers({
    logs: function() {
        return App.Collections.Logs.find({owner: Meteor.userId()}).fetch();
    }
});
