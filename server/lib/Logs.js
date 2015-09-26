
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

		data.createdAt = moment().toISOString();
		data.owner = Meteor.userId();

        return App.Collections.Logs.insert(data);
    },

	/**
     * edit log
     * @param  {string} logId
     * @param  {any} data
     * @return {int} number of updated records
     */
    "Logs:edit": function(logId, data) {
        if (!isOwner(logId)) {
            throw new Meteor.Error("not-authorized");
        }

		data.updatedAt = moment().toISOString();
        return App.Collections.Logs.update(logId, {$set: data});
    },

	/**
     * remove log
     * @param  {string} logId
     */
    "Logs:remove": function(logId) {
        if (!logId || !isOwner(logId)) {
            throw new Meteor.Error("not-authorized");
        }

        return App.Collections.Logs.remove(logId);
    }
});

/**
 * check if loggedIn user is owner of log
 * @param  {string} logId
 * @return {boolean}
 */
var isOwner = function(logId) {
    var log = App.Collections.Logs.findOne(logId);

    if (log.owner === Meteor.userId()) {
        return true;
    }
    return false;
};
