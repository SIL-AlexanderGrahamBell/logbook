Meteor.subscribe("Groups");

var marker;
var feedbackGroupsJoin = new ReactiveVar();

Template.GroupsJoin.helpers({
    schemaGroupJoin: App.Schema.GroupJoin,
    groups: function() {
        return App.Collections.Groups.find({}).fetch().map(function(group) {
            group.value = group.name;
            group.id = group._id;
            return group;
        });
    },
    feedbackGroupsJoin: function() {
        return feedbackGroupsJoin.get();
    },
    selected: function(event, suggestion, datasetName) {
        // setting id in data-id attribute
        $(event.target).attr('data-id', suggestion.id);
    }
});

Template.GroupsJoin.rendered = function() {
  Meteor.typeahead.inject();
}

Template.GroupsJoin.events({
    "submit #form-group-join": function(event) {
        event.preventDefault();

        var groupId = $(event.target.group).attr('data-id');

        // exit when groupId empty
        if (!groupId) {
            return;
        }

        Meteor.call("Groups:join", groupId, function(error, result){
            if (error) {
                error.type = "danger";
                feedbackGroupsJoin.set(error);
                return;
            }

            feedbackGroupsJoin.set({
                type: "success"
            });
        });
    }
});
