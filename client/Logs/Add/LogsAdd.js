var feedback = new ReactiveVar();

Template.LogsAdd.helpers({
    schemaLog: App.Schema.Log,
    feedback: function() {
        return feedback.get();
    }
});

Template.LogsAdd.events({
    "submit #form-logs-add": function(event) {
        event.preventDefault();

        // assembling data
        var data = {
            name: event.target.name.value,
            locationLatitude: event.target.locationLatitude.value,
            locationLongitude: event.target.locationLongitude.value,
            owner: Meteor.userId()
        };

        Meteor.call("Logs:add", data, function(error, result){
            if(error){
                error.type = "danger";
                feedback.set(error);
            }
            if(result){
                feedback.set({
                    type: "success"
                });
            }
        });
    }
});
// 
// Template.autoformGoogleplaceBasic.helpers({
//   optsGoogleplace: function() {
//     return {
//       // type: 'googleUI',
//       // stopTimeoutOnKeyup: false,
//       // googleOptions: {
//       //   componentRestrictions: { country:'us' }
//       // }
//     }
//   }
// });
