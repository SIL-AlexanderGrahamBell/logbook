Meteor.subscribe("Groups");

Template.StatisticsGroupsList.helpers({
    groups: function() {
        return App.Collections.Groups.find().fetch();
    }
});
