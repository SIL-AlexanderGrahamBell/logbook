/**
 * Group Schema
 */
App.Schema.Group = new SimpleSchema({
    name: {
        type: String,
        label: "Group Name"
    },
    location: {
        type: App.Schema.Location
    },
    owner: {
        type: String,
        label: "Owner Id",
    },
    members: {
        type: [String],
        label: "Members"
    }
});
