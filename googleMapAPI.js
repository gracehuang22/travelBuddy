    //<![CDATA[


    var customIcons = {
      restaurants: {
        icon: 'img/redMarker.png'
      },
      active: {
        icon: 'img/blueMarker.png'
      },
      arts: {
        icon: 'img/greenMarker.png'
      }
    };

    function load(keywords,location) {
      var hasBusinesses = false;
      console.log("load");
      $keywords = keywords;
      $location = location;

      var infoWindow = new google.maps.InfoWindow;

      // Change this depending on the name of your PHP file
      downloadUrl("yelpAPI.php", $location, $keywords, function(data) {
        console.log(data.responseText);
        var json = JSON.parse(data.responseText);
        var jsonArr = json.businesses;
        if (jsonArr.length > 0){
          var map = new google.maps.Map(document.getElementById("map"), {
            center: new google.maps.LatLng(
                  jsonArr[0].location.coordinate.latitude,
                  jsonArr[0].location.coordinate.longitude),
            zoom: 13,
            mapTypeId: 'roadmap'
          }); 
        }
        else {
          var map = new google.maps.Map(document.getElementById("map"), {
            center: new google.maps.LatLng(
                  jsonArr[0].location.coordinate.latitude,
                  jsonArr[0].location.coordinate.longitude),
            zoom: 13,
            mapTypeId: 'roadmap'
          });
        }
        for (var i = 0; i < jsonArr.length; i++) {
          hasBusinesses = true;
          var name = jsonArr[i].name;
          console.log("name:" + name);
          var address = jsonArr[i].location.display_address;
          console.log("categories[0][0]: " +jsonArr[i].categories[0][0]);
          var type = getCategories(jsonArr[i].categories[0][0]);
          console.log("type " + type);
          var point = new google.maps.LatLng(
              jsonArr[i].location.coordinate.latitude,
              jsonArr[i].location.coordinate.longitude);
          var html = "<b>" + i + ": " +name + "</b> <br/>" + address;
          var icon = customIcons[type] || {};

          var marker = new google.maps.Marker({
            map: map,
            position: point,
            icon:  new google.maps.MarkerImage(icon.icon , undefined, undefined, undefined, new google.maps.Size(20, 30))
          });
          bindInfoWindow(marker, map, infoWindow, html);
        }

      });
      
      
      google.maps.event.trigger(map, 'resize');
      
    }

    function bindInfoWindow(marker, map, infoWindow, html) {
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      });
    }

    function downloadUrl(url, location, keywords, callback) {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
          console.log(request);
          callback(request);
        }

      };
      var requestString = 'keywords='+$keywords+'&location='+$location;
      console.log('requestString: ' +requestString);
      request.open('POST', url, true);
      request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      request.send(requestString);
    }

    function doNothing() {}

    function getUrl(url, callback){
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
          console.log(request);
          callback(request);
        }
      };
    
      request.open('GET', url, true);
      request.send(null);
    }

    function getCategories(type) {
      var url = 'yelp_categories.json';
      getUrl(url,function(data){
        var json = JSON.parse(data.responseText);
        console.log("response Text: " +data.responseText);
        for (var i = 0; i < json.length; i++) {
          console.log("title: " + json[i].title);
          if (json[i].title == type) {
            console.log("parents: " + json[i].parents[0]);
            return json[i].parents[0];
          }
        }
        
      })
    }

    //]]>
