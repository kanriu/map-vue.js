import { StateInterface } from "@/store";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export const usePLacesStore = () => {
  const store = useStore<StateInterface>();

  //Es una funcion que permite disparar un callback, cuando esta composable functions se llama la primera vez, tambien se llama el onMounted
  onMounted(() => {
    if (!store.getters["places/isUserLocationReady"]) {
      store.dispatch("places/getInitialLocation");
    }
  });

  return {
    //State
    isLoading: computed(() => store.state.places.isLoading),
    userLocation: computed(() => store.state.places.userLocation),
    places: computed(() => store.state.places.places),
    isLoadingPlaces: computed(() => store.state.places.isLoadingPlaces),
    // Getters
    isUserlocationReady: computed(
      () => store.getters["places/isUserLocationReady"]
    ),
    //Actions
    searchPlacesByTerm: (query = "") =>
      store.dispatch("places/searchPlacesByTerm", query),
  };
};
