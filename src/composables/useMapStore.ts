import { Feature } from "@/interfaces/places";
import { StateInterface } from "@/store";
import { LngLat } from "@/store/map/actions";
import { Map } from "mapbox-gl";
import { computed } from "vue";
import { useStore } from "vuex";

export const useMapStore = () => {
  const store = useStore<StateInterface>();

  return {
    map: computed(() => store.state.map.map),
    distance: computed(() => store.state.map.distance),
    duration: computed(() => store.state.map.duration),
    //Getters
    isMapReady: computed(() => store.getters["map/isMapReady"]),
    //Mutations
    setMap: (map: Map) => store.commit("map/setMap", map),
    setPlacesMarkers: (places: Feature[]) =>
      store.commit("map/setPlacesMarkers", places),
    //Actions
    getRouteBetweenPoints: (start: LngLat, end: LngLat) =>
      store.dispatch("map/getRouteBetweenPoints", { start, end }),
  };
};
