/**
 * instantiating global stuff
 */
App = {};
App.Schema = {}; // defining Schema
App.Collections = {}; // defining Collections
App.Actions = {}; // action functions

if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load({ v: '3', key: Meteor.settings.public.googleMapsKey, libraries: 'geometry,places' });
  });
}
