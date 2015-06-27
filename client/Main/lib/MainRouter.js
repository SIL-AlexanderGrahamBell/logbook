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
