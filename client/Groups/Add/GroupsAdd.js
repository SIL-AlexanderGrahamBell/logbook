SimpleSchema.debug = true
var marker;
var feedbackGroupsAdd = new ReactiveVar();

Template.GroupsAdd.helpers({
    schemaGroupAdd: App.Schema.Group,
    feedbackGroupsAdd: function() {
        return feedbackGroupsAdd.get();
    },
    mapOptions: function() {
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(30, 0),
                zoom: 2
            };
        }
    }
});

Template.GroupsAdd.events({
    "submit #form-group-add": function(event) {
        event.preventDefault();

        // assembling data
        var data = {
            name: event.target.name.value,
            locationLatitude: event.target.locationLatitude.value,
            locationLongitude: event.target.locationLongitude.value,
            owner: Meteor.userId()
        };

        Meteor.call("Groups:add", data, function(error, result){
            if(error){
                error.type = "danger";
                feedbackGroupsAdd.set(error);
            }
            if(result){
                feedbackGroupsAdd.set({
                    type: "success"
                });
            }
        });
    }
});

Template.GroupsAdd.onCreated(function() {
    // making sure that marker is null on creation
    marker = null;

    GoogleMaps.ready('groupAddMap', function(map) {
        // create listener for initial click
        map.instance.addListener('click', function(event) {
            // if marker on map, do not add a second one
            if (marker) {
                return;
            }
            marker = new google.maps.Marker({
              position: event.latLng,
              map: map.instance,
              draggable: true
            });

            // setting initial position
            updateMarkerToForm(marker.getPosition());

            google.maps.event.addListener(marker, 'dragend', function(event) {
                // updating position on drag
                updateMarkerToForm(event.latLng);
            });
        });
    });
});

/**
 * map form to marker
 */
var updateMarkerToForm = function(markerPosition) {
    $('[name="locationLatitude"]').val(markerPosition.G);
    $('[name="locationLongitude"]').val(markerPosition.K);
}
