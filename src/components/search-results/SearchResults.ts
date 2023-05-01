import { useMapStore, usePLacesStore } from "@/composables";
import { Feature } from "@/interfaces/places";
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "SearchResults",
  setup() {
    const { places, isLoadingPlaces, userLocation } = usePLacesStore();
    const { map, setPlacesMarkers, getRouteBetweenPoints } = useMapStore();
    const activePlace = ref("");

    watch(places, (newPlaces) => {
      setPlacesMarkers(newPlaces);
    });

    return {
      places,
      isLoadingPlaces,
      activePlace,
      onPlaceClicked: (place: Feature) => {
        activePlace.value = place.id;
        const [lng, lat] = place.center;
        map.value?.flyTo({
          zoom: 14,
          center: [lng, lat],
        });
      },
      getRouteDirections: (place: Feature) => {
        if (!userLocation.value) return;
        const [startLng, startLat] = userLocation.value;
        const [lng, lat] = place.center;
        const start: [number, number] = [startLng, startLat];
        const end: [number, number] = [lng, lat];
        getRouteBetweenPoints(start, end);
      },
    };
  },
});
