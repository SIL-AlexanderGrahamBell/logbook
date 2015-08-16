/**
 * Group Schema
 */
App.Schema.Group = new SimpleSchema({
    name: {
        type: String,
        label: "Group Name"
    },
    locationLatitude: {
        type: String,
        label: "Latitude"
    },
    locationLongitude: {
        type: String,
        label: "Longitude"
    },
    owner: {
        type: String,
        label: "Owner Id",
        defaultValue: ""
    },
    members: {
        type: [String],
        label: "Members",
        defaultValue: []
    }
});

/**
 * initializing Groups collection
 */
App.Collections.Groups = new Mongo.Collection("groups");

/**
 * setting Groups permissions
 */
App.Collections.Groups.allow({
    insert: function(){
        return false;
    },
    update: function(){
        return false;
    },
    remove: function(){
        return false;
    }
});

/**
 * publishing Groups collection
 */
Meteor.publish('Groups', function() {
	return App.Collections.Groups;
});

/**
 * defining methods
 */
Meteor.methods({
    /**
     * add group
     * @param  {any} data
     * @return {string} id  id of new element
     */
    "Groups:add": function(data) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        return App.Collections.Groups.insert(data);
    }
    /**
     * get list of groups where member (& owner)
     */
    "Groups:own": function() {

    }
});

var isMember = function(groupId) {
    
}
