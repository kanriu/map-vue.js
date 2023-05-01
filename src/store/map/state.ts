import { Map, Marker } from "mapbox-gl";

export interface MapState {
  map?: Map;
  markers: Marker[];
  distance?: number;
  duration?: number;
}

function state(): MapState {
  return {
    map: undefined,
    markers: [],
    distance: undefined,
    duration: undefined,
  };
}

export default state;
