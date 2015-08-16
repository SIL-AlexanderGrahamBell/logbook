/**
 * User Registration Schema
 */
App.Schema.UserRegistration = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "Email"
    },
    password: {
        type: String,
        label: "Password",
        min: 6
    },
    passwordConfirmation: {
        type: String,
        min: 6,
        label: "Password confirmation",
        custom: function() {
        if (this.value != this.field('password').value)
          return "passwordMissmatch"
        }
    }
});

/**
 * User Login Schema
 */
App.Schema.UserLogin = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "Email"
    },
    password: {
        type: String,
        label: "Password",
        min: 6
    }
});
