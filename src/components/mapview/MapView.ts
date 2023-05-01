import { useMapStore, usePLacesStore } from "@/composables";
import { defineComponent, onMounted, ref, watch } from "vue";
import Mapboxgl from "mapbox-gl";

export default defineComponent({
  name: "MapView",
  setup() {
    const mapElement = ref<HTMLDivElement>();
    const { userLocation, isUserlocationReady } = usePLacesStore();
    const { setMap } = useMapStore();

    const initMap = async () => {
      if (!mapElement.value) throw new Error("Div Element no exits");
      if (!userLocation.value) throw new Error("User location no exits");

      await Promise.resolve();

      const map = new Mapboxgl.Map({
        container: mapElement.value, // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: userLocation.value, // starting position [lng, lat]
        zoom: 15, // starting zoom
      });

      const myLocationPopup = new Mapboxgl.Popup({
        offset: [0, -35],
      }).setLngLat(userLocation.value).setHTML(`
          <h4>Aquí estoy</h4>
          <p>Actualmente en Ilo</p>
        `);

      const myLocationMarker = new Mapboxgl.Marker({ color: "#0d6efd" })
        .setLngLat(userLocation.value)
        .setPopup(myLocationPopup)
        .addTo(map);

      setMap(map);
    };

    onMounted(() => {
      if (isUserlocationReady.value) return initMap();
    });

    watch(isUserlocationReady, (newVal) => {
      if (isUserlocationReady.value) initMap();
    });

    return {
      isUserlocationReady,
      mapElement,
    };
  },
});
