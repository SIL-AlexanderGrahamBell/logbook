/**
 * instantiating global stuff
 */
App = {};
App.Schema = {}; // defining Schema
App.Collections = {}; // defining Collections
App.Actions = {}; // action functions

if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });
}
