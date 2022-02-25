import React, { useRef, useEffect, useState, useCallback } from 'react';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

import './Event.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

export default function Event() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  console.log(map);
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const fetchData = useCallback(() => {
    const geocodingClient = mbxGeocoding({
      accessToken: mapboxgl.accessToken,
    });

    // geocoding with countries
    return geocodingClient
      .forwardGeocode({
        query: 'moda center',
        // countries: ['ng'],
        limit: 2,
      })
      .send()
      .then((response) => {
        const match = response.body;
        const coordinates = match.features[0].geometry.coordinates;
        const placeName = match.features[0].place_name;
        const center = match.features[0].center;

        return {
          type: 'Feature',
          center: center,
          geometry: {
            type: 'Point',
            coordinates: coordinates,
          },
          properties: {
            description: placeName,
          },
        };
      });
  }, []);

  useEffect(() => {
    if (!map.current) return; // Waits for the map to initialise

    const results = fetchData();
    console.log(results);

    results.then((marker) => {
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';

      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML('<p>' + marker.properties.description + '</p>')
        )
        .addTo(map.current);

      map.current.on('load', async () => {
        map.current.flyTo({
          center: marker.center,
        });
      });
    });
  }, [fetchData]);

  return <div ref={mapContainer} id="map-container"></div>;
}
