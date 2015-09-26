

Template.Dashboard.helpers({
    myLogsNumber: function() {
		return App.Collections.Logs.find({owner: Meteor.userId()}).count();
	},
    myCountriesNumber: function() {
        var data = App.Collections.Logs.find({}).fetch();
        var uniqueCountryElement = _.uniq(data, false, function(d) {return d.address.country});
        return uniqueCountryElement.length;
	}
});
