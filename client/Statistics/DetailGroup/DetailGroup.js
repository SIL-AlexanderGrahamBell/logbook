Meteor.subscribe("Groups");
var groupLogs = new ReactiveVar();

Template.StatisticsDetailGroup.helpers({
    group: function() {
        return App.Collections.Groups.findOne(Router.current().params.id);
    },
    logsNumber: function() {
        console.log(groupLogs.get());
		return groupLogs.get();
	},
    countriesNumber: function() {
        var data = App.Collections.Logs.find({}).fetch();
        var uniqueCountryElement = _.uniq(data, false, function(d) {return d.address.country});
        return uniqueCountryElement.length;
	}
});

Template.StatisticsDetailGroup.onCreated(function() {
    updateGroupLogs();
    // App.Collections.Logs.find(Router.current().params.id).observeChanges({
    //     changed: function() {
    //         updateCurrentUsersOfGroup();
    //     }
    // });
});

var updateGroupLogs = function() {
    groupLogs.set(Meteor.call("Groups:logs", Router.current().params.id));
    console.log(Meteor.call("Groups:logs", Router.current().params.id, function(data) {
        groupLogs.set(data);
        console.log(data);
    }));
}
