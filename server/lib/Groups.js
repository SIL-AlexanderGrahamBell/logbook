
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
     * edit group
     * @param  {string} groupId
     * @param  {any} data
     * @return {int} number of updated records
     */
    "Groups:edit": function(groupId, data) {
        if (!Meteor.userId() || !isOwner(groupId)) {
            throw new Meteor.Error("not-authorized");
        }

        return App.Collections.Groups.update(groupId, {$set: data});
    },

    /**
     * get list of groups where member (& owner)
     */
    "Groups:own": function() {
        var groups = [];
        App.Collections.Groups.find().fetch().forEach(function(group) {
            if (isOwner(group._id) || isMember(group._id)) {
				group.isOwner = isOwner(group._id);
                groups.push(group);
            }
        });

        return groups;
    },
	"Groups:join": function(groupId) {
		var group = App.Collections.Groups.findOne(groupId);
		// throw error if already member
		if (isOwner(groupId) || isMember(groupId)) {
			throw new Meteor.Error("Already member of " + group.name);
		}

		App.Collections.Groups.update(groupId, {$push: { members: Meteor.userId()}});
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
    var group = App.Collections.Groups.findOne(groupId);

	if (group.members) {
		var isMemberFlag = false;
	    group.members.forEach(function(member) {
	        if (member === Meteor.userId()) {
	            isMemberFlag = true;
	        }
	    });

		if (isMemberFlag) {
			return true;
		}
	}

    return false;
};
