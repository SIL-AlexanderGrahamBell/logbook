var marker;

Template.GroupsAdd.helpers({
    schemaGroupAdd: App.Schema.Group,
    exampleMapOptions: function() {
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(-37.8136, 144.9631),
                zoom: 8
            };
        }
    }
});

Template.GroupsAdd.events({
    ".submit #form-group-add": function(event) {
        console.log('jop');
    }
});

Template.GroupsAdd.onCreated(function() {

    GoogleMaps.ready('groupAddMap', function(map) {
        // create listener for initial click
        map.instance.addListener('click', function(event) {
            if (marker) {
                return;
            }
            marker = new google.maps.Marker({
              position: event.latLng,
              map: map.instance,
              draggable: true
            });
        });
    });
});
