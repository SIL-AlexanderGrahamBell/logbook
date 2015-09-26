Meteor.subscribe("Logs");

Template.LogsListOwner.helpers({
    logs: function() {
        return App.Collections.Logs.find({owner: Meteor.userId()}, {sort: {createdAt: -1}}).fetch();
    }
});

Template.LogsListOwner.events({
    "click .remove-log": function(event) {
        Meteor.call("Logs:remove", $(event.currentTarget).attr('data-id'));
    }
});
