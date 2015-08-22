
/**
 * publishing Groups collection
 */
Meteor.publish('Groups', function() {
	return App.Collections.Groups.find();
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
    },
    /**
     * get list of groups where member (& owner)
     */
    "Groups:own": function() {
        var groups = [];
        App.Collections.Groups.find().fetch().forEach(function(group) {
            if (isOwner(group._id) || isMember(group._id)) {
                groups.push(group);
            }
        });

        console.log(groups);

        return groups;
    }
});

/**
 * check if loggedIn user is owner of group
 * @param  {string} groupId
 * @return {boolean}
 */
var isOwner = function(groupId) {
    var group = App.Collections.Groups.findOne(groupId);

    if (group.owner === Meteor.userId()) {
        return true;
    }
    return false;
};

/**
 * check if loggedIn user is member of group
 * @param  {string} groupId
 * @return {boolean}
 */
var isMember = function(groupId) {
    var group = App.Collections.Groups.findOne(groupId).fetch();

    group.members.each(function(member) {
        if (member === Meteor.userId()) {
            return true;
        }
    });

    return false;
};