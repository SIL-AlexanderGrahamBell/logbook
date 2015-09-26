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
 * Group Join Schema
 */
App.Schema.GroupJoin = new SimpleSchema({
    group: {
        type: String,
        label: "Group Name"
    }
});

/**
 * initializing Groups collection
 */
App.Collections.Groups = new Mongo.Collection("Groups");

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
