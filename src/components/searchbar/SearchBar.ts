import { computed, defineComponent, ref } from "vue";
import SearchResults from "@/components/search-results/SearchResults.vue";
import { usePLacesStore } from "@/composables";

export default defineComponent({
  name: "SearchBar",
  components: { SearchResults },
  setup() {
    const { searchPlacesByTerm } = usePLacesStore();
    const debounceTimeout = ref();
    const debouncedValue = ref("");

    return {
      debouncedValue,
      searchTerm: computed({
        get() {
          return debouncedValue.value;
        },
        set(val: string) {
          if (debounceTimeout.value) clearTimeout(debounceTimeout.value);
          debounceTimeout.value = setTimeout(() => {
            debouncedValue.value = val;
            searchPlacesByTerm(val);
          }, 500);
        },
      }),
    };
  },
});
