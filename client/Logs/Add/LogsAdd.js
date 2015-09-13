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

        console.log(event);

        // assembling data
        var data = {
            logtype: event.target.logtype.value,
            address: event.target.address.value,
            owner: Meteor.userId()
        };

        console.log(data);

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
