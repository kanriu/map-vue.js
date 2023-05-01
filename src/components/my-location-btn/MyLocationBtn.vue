<template>
  <IconMapPinUserFill v-if="isBtnReady" @click="onMyLocationClicked" />
</template>

<script lang="ts">
import { useMapStore, usePLacesStore } from "@/composables";
import { computed, defineComponent } from "vue";
import IconMapPinUserFill from "@/assets/svg/IconMapPinUserFill.vue";

export default defineComponent({
  name: "MyLocationBtn",
  components: { IconMapPinUserFill },
  setup() {
    const { userLocation, isUserlocationReady } = usePLacesStore();
    const { map, isMapReady } = useMapStore();
    return {
      isBtnReady: computed<boolean>(
        () => isUserlocationReady.value && isMapReady.value
      ),
      onMyLocationClicked: () => {
        map.value?.flyTo({
          center: userLocation.value,
          zoom: 14,
        });
      },
    };
  },
});
</script>

<style scoped>
svg {
  position: fixed;
  top: 30px;
  right: 30px;
  cursor: pointer;
  transition: 0.5s ease;
}

svg:hover {
  filter: drop-shadow(0 0 1rem #0d6efd);
}
</style>
