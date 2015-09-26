// defining reactive var for feedback
var feedbackLogin = new ReactiveVar();

Template.MainLogin.helpers({
    schemaUserLogin: App.Schema.UserLogin,
    feedbackLogin: function() {
		return feedbackLogin.get();
	}
});

Template.MainLogin.events({
    "submit #form-login": function(event, template){
        event.preventDefault();

        var email = event.target.email.value;
        var password = event.target.password.value;

        // authenticate
        Meteor.loginWithPassword(email, password, function(error) {
            if (error) {
                error.type = "danger";
                feedbackLogin.set(error);
                return;
            }
            Router.go("Intro");
        });
    }
});
