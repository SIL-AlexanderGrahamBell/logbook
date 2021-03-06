var feedback = new ReactiveVar();

Template.LogsAdd.helpers({
    schemaLog: App.Schema.Log,
    feedback: function() {
        return feedback.get();
    },
    optsGoogleplace: function() {
      return {
        type: 'googleUI'
      }
    }
});

Template.LogsAdd.events({
    "submit #form-logs-add": function(event) {
        event.preventDefault();

        // assembling data
        var data = {
            logtype: event.target.logtype.value,
            address: AutoForm.getFieldValue('address', 'form-logs-add'),
            contactFullName: event.target.contactFullName.value,
            contactGroup: event.target.contactGroup.value
        };

        Meteor.call("Logs:add", data, function(error, result){
            if(error){
                error.type = "danger";
                feedback.set(error);
            }
            if(result){
                feedback.set({
                    success: true
                });
            }
        });
    }
});
