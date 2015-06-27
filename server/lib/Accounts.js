/**
 * we do not want to automically login the user after registration
 * so let us set a flag on create user
 */
Accounts.onCreateUser(function(options, user) {
    user.firstLogin = true;
    return user;
});

/**
 * check on login if the first login flag is set.
 * as on registration he tries to login this function gets executed, resetting
 * the flag for the proper initial login
 */
Accounts.validateLoginAttempt(function(attemptInfo) {
    if (!attemptInfo.user) {
        return false;
    }
    if (!attemptInfo.user.firstLogin) {
        return true;
    } else {
    updateUserFirstLogin(attemptInfo.user._id);
        return false;
    }
});

/**
 * function to set firstLogin to false
 * @private
 *
 */
var updateUserFirstLogin = function(userId) {
    Meteor.users.update({
        _id: userId
    }, {
        $set: {
            'firstLogin': false
        }
    });
}
