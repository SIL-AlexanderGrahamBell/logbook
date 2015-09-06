
/**
 * publishing Groups collection
 */
Meteor.publish('Logs', function() {
	return App.Collections.Logs.find();
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
    "Logs:add": function(data) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        return App.Collections.Logs.insert(data);
    },

	/**
     * edit group
     * @param  {string} groupId
     * @param  {any} data
     * @return {int} number of updated records
     */
    "Logs:edit": function(logId, data) {
        if (!Meteor.userId() || !isOwner(logId)) {
            throw new Meteor.Error("not-authorized");
        }

        return App.Collections.Groups.update(logId, {$set: data});
    }
});

/**
 * check if loggedIn user is owner of log
 * @param  {string} logId
 * @return {boolean}
 */
var isOwner = function(logId) {
    var log = App.Collections.Groups.findOne(logId);

    if (log.owner === Meteor.userId()) {
        return true;
    }
    return false;
};
