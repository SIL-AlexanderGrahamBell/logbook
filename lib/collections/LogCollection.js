/**
 * Address Schema
 */
var AddressSchema = new SimpleSchema({
   fullAddress: {
     type: String
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
     max: 100
   },
   city: {
     type: String,
     max: 50
   },
   state: {
     type: String,
     regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
   },
   zip: {
     type: String,
     regEx: /^[0-9]{5}$/
   },
   country: {
     type: String
   }
 });
/**
 * Group Schema
 */
App.Schema.Log = new SimpleSchema({
    type: {
        type: String,
        label: "Type",
        allowedValues: [
            "radio-voice",
            "radio-digi",
            "radio-cw",
            "internet-irc",
            "internet-voice",
            "internet-video"
        ]
    },
    address: {
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
