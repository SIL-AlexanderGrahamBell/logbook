/**
 * Landing Route Definition
 */
Router.route("/", {
    name: "MainHome"
});

/**
 * login route
 */
Router.route("/login", {
    layout: "MainNotAuthenticated",
    name: "MainLogin"
});

/**
 * register route
 */
Router.route("/register", {
    name: "MainRegister"
});

/**
 * logout route
 */
Router.route('/logout', {
	action: function() {
		Meteor.logout();
	}
});
