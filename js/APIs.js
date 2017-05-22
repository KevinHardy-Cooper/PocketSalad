/* Note: Requires that the user consents to location sharing when
* prompted by their browser.
* The error "The Geolocation service failed." means permission was not
* given for the browser to locate the user.
*/

//global variables for map and the place "tool tip" aka infoWindow
var map, infoWindow;

/**
* This function initializes the map
*/
function initMap()
{
  //default location is set to Ottawa
  ottawa = {lat: 45.4215, lng: -75.6972};
  //setting initial map properties
  map = new google.maps.Map(document.getElementById('map'),
  {
    center: ottawa,
    zoom: 13
  });
  // if HTML5 geolocation exists
  if (navigator.geolocation)
  {
    //gets the current position of the user
    navigator.geolocation.getCurrentPosition
    (
      //on success
      function(position)
      {
        //setting
        origin =
        {
          //setting the lat and lon for the user's position
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        //allows for "Location Found" infoWindow to exist
        infoWindow = new google.maps.InfoWindow();
        //setting infoWindow properties
        infoWindow.setPosition(origin);
        infoWindow.setContent('Your location');
        //placing infoWindow on map
        infoWindow.open(map);
        //setting center of map to user's position
        map.setCenter(origin);
        //this will run ClickEventHandler on click
        var clickHandler = new ClickEventHandler(map, origin);
        //displays markers around origin
        places(origin, map);
      },
      //on error
      function()
      {
        //sets infoWindow to feedback for user
        handleLocationError(true, infoWindow, map.getCenter());
      }
    ); //closing getCurrentPosition
  } //closing if clause
  else
  {
    // if browser doesn't support HTML5 geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
} //closing initMap

  /**
  * Gets and sets places and markers
  * @param {Coordinates} origin
  * @param {Map} map
  */
  function places(origin, map)
  {
    //using PlacesService with map
    var service = new google.maps.places.PlacesService(map);
    //search for places within certain area
    service.nearbySearch
    (
      //properties
      {
        location: origin,
        //setting radius to 5000 meters (5km)
        radius: 5000,
        //places searched for will be hardware stores
        type: ['hardware_store']
      },
      //running callback which makes the Markers
      callback
    );
  }

  /**
  * Make the markers
  * @param {Array of Objects} results
  * @param {String} status
  */
  function callback(results, status)
  {
    //if status is OK to proceed
    if (status === google.maps.places.PlacesServiceStatus.OK)
    {
      for (var i = 0; i < results.length; i++)
      {
        createMarker(results[i]);
      }
    }
  }

  /**
  * Create a Marker
  * @param {Place Object} place
  */
  function createMarker(place)
  {
    //get location of given place
    var placeLoc = place.geometry.location;
    //create new marker with properties
    var marker = new google.maps.Marker
    ({
      map: map,
      position: place.geometry.location,
    });
    //adds click listener on marker
    google.maps.event.addListener(marker, 'click', function()
    {
      //placing the place name into the infoWindow
      infoWindow.setContent(place.name);
      infoWindow.open(map, this);
    });
  }

  /*
  * Provides feedback to user about location error
  * @param {Boolean} browserHasGeolocation
  * @param {infoWindow object} infoWindow
  * @param {Position} pos
  */
  function handleLocationError(browserHasGeolocation, infoWindow, pos)
  {
    //setting infoWindow properties
    infoWindow.setPosition(pos);
    //feedback to the user based on the browser settings
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  /**
   * The following is from the Google Map API
   * @constructor ClickEventHandler
   */
  var ClickEventHandler = function(map, origin)
  {
    this.origin = origin;
    this.map = map;
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsDisplay.setMap(map);
    this.placesService = new google.maps.places.PlacesService(map);
    this.infowindow = new google.maps.InfoWindow;
    this.infowindowContent = document.getElementById('infowindow-content');
    this.infowindow.setContent(this.infowindowContent);

    // Listen for clicks on the map.
    this.map.addListener('click', this.handleClick.bind(this));
  };

  ClickEventHandler.prototype.handleClick = function(event)
  {
    console.log('You clicked on: ' + event.latLng);
    // If the event has a placeId, use it.
    if (event.placeId)
    {
      console.log('You clicked on place:' + event.placeId);

      // Calling e.stop() on the event prevents the default info window from
      // showing.
      // If you call stop here when there is no placeId you will prevent some
      // other map click event handlers from receiving the event.
      event.stop();
      this.calculateAndDisplayRoute(event.placeId);
      this.getPlaceInformation(event.placeId);
    }
  };

  ClickEventHandler.prototype.calculateAndDisplayRoute = function(placeId)
  {
    var me = this;
    this.directionsService.route
    (
      {
        origin: this.origin,
        destination: {placeId: placeId},
        travelMode: 'WALKING'
      },
      function(response, status)
      {
        if (status === 'OK')
        {
          me.directionsDisplay.setDirections(response);
        }
        else
        {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  };

  ClickEventHandler.prototype.getPlaceInformation = function(placeId)
  {
    var me = this;
    this.placesService.getDetails({placeId: placeId}, function(place, status)
    {
      if (status === 'OK')
      {
        me.infowindow.close();
        me.infowindow.setPosition(place.geometry.location);
        me.infowindowContent.children['place-icon'].src = place.icon;
        me.infowindowContent.children['place-name'].textContent = place.name;
        me.infowindowContent.children['place-address'].textContent =
        place.formatted_address;
        me.infowindow.open(me.map);
      }
    });
  };

  /**
  *Creates the Typed.js section
  */
  document.addEventListener("DOMContentLoaded", function()
  {
    Typed.new(".element",
    {
      stringsElement: document.getElementById('typed-strings'),
      typeSpeed: 0,
      // time before typing starts
      startDelay: 4000,
      // time before backspacing
      backDelay: 500,
    });
  });
