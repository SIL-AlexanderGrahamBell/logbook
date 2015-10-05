

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

Template.Dashboard.onRendered(function() {
    this.autorun(function(){
        var data = App.Collections.Logs.find({}).fetch();
        var rows = _.map(data, function(log) {
            return [log.address.country];
        });
        var chart = {
          target: 'countries',
          type: 'GeoChart',
          columns: [
            ['string', 'Country']
          ],
          rows: rows
        };

        drawChart(chart);
    }.bind(this));
});
