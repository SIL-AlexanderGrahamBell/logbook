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
        var groupId = $(event.target).attr('data-id', suggestion.id);

        Meteor.call("Groups:join", groupId, function(error, result){
            if(error){
                error.type = "danger";
                feedbackGroupsAdd.set(error);
            }
            if(result){
                feedbackGroupsAdd.set({
                    type: "success"
                });
            }
        });
    }
});

Template.GroupsJoin.rendered = function() {
  Meteor.typeahead.inject();
}

Template.GroupsJoin.events({
    "submit #form-group-join": function(event) {

        console.log($(event.target.group).attr("data-id"));
    }
});
