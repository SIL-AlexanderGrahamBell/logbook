// reactive var for feedback
var feedbackRegister = new ReactiveVar();

Template.MainRegister.helpers({
    schemaUserRegistration: App.Schema.UserRegistration,
    feedbackRegister: function() {
		return feedbackRegister.get();
	}
});

Template.MainRegister.events({
    "submit #form-register": function(event, template){
        event.preventDefault();

        var userObject = {
            username: event.target.email.value,
            email: event.target.email.value,
            password: event.target.password.value
        };

        // create new user
        Accounts.createUser(userObject, function(error){
            // meteor is autologin on register, so we had to check the
            // first login flag which returns an login forbidden altough the
            // sign-up was successful
            if (error && error.reason !== "Login forbidden") {
                error.type = "danger";
                console.log(error);
                feedbackRegister.set(error);
                return;
            }
            feedbackRegister.set({
                type: "success",
                message: "Successfully Registered"
            });
        });

    }
});
