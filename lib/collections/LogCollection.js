/**
 * Address Schema
 */
var AddressSchema = new SimpleSchema({
   fullAddress: {
     type: String
   },
   geometry: {
     type: Object,
     blackbox: true
   },
   lat: {
     type: Number,
     decimal: true
   },
   lng: {
     type: Number,
     decimal: true
   },
   street: {
     type: String,
     max: 100,
     optional: true
   },
   city: {
     type: String,
     max: 50
   },
   state: {
     type: String,
     optional: true
   },
   zip: {
     type: String,
     regEx: /^[0-9]{5}$/,
     optional: true
   },
   country: {
     type: String
   }
 });
/**
 * Group Schema
 */
App.Schema.Log = new SimpleSchema({
    logtype: {
        type: String,
        label: 'Type of Log',
        autoform: {
            type: "select",
            options: [
                { value: "internet-irc", label: "Internet IRC-Chat" },
                { value: "internet-voice", label: "Internet Voice" },
                { value: "internet-video", label: "Internet Video" },
                { value: "radio-voice", label: "Radio Voice" },
                { value: "radio-digi", label: "Radio Digital" },
                { value: "radio-cw", label: "Radio CW" }
            ]
        }
    },
    address: {
        label: 'Location of Contact',
        type: AddressSchema
    },
    owner: {
        type: String,
        label: "Owner Id",
        defaultValue: ""
    }
});



/**
 * initializing Groups collection
 */
App.Collections.Logs = new Mongo.Collection("Logs");

/**
 * setting Groups permissions
 */
App.Collections.Logs.allow({
    insert: function(){
        return false;
    },
    update: function(){
        return false;
    },
    remove: function(){
        return false;
    }
});
