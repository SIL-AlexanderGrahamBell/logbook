var marker;
var feedback = new ReactiveVar();

Template.GroupsEdit.helpers({
    schemaGroupEdit: App.Schema.Group,
    currentGroup: function() {
        return App.Collections.Groups.findOne(Router.current().params.id);
    },
    feedback: function() {
        return feedback.get();
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

Template.GroupsEdit.events({
    "submit #form-group-edit": function(event) {
        event.preventDefault();

        // assembling data
        var data = {
            name: event.target.name.value,
            locationLatitude: event.target.locationLatitude.value,
            locationLongitude: event.target.locationLongitude.value
        };

        Meteor.call("Groups:edit", Router.current().params.id, data, function(error, result){
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

Template.GroupsEdit.onCreated(function() {
    // we want to make sure that no feedback is set on re-navigating
    // to the site
    feedback.set({});

    // making sure that marker is set
    marker = null;

    GoogleMaps.ready('groupAddMap', function(map) {
        var group = App.Collections.Groups.findOne(Router.current().params.id);

        if (marker) {
            return;
        }

        marker = new google.maps.Marker({
          position: new google.maps.LatLng(group.locationLatitude, group.locationLongitude),
          map: map.instance,
          draggable: true
        });

        google.maps.event.addListener(marker, 'dragend', function(event) {
            // updating position on drag
            updateMarkerToForm(event.latLng);
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
