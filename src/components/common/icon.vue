<template>
  <svg
    :class="svgClass"
    class="svg-icon"
    aria-hidden="true"
    :style="`width: ${iconWidth}rem;height:${iconWidth}rem`"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
  iconWidth: {
    type: Number,
    default: () => 0.5,
  },
  iconClass: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
});
let iconName = computed({
  get() {
    return `#icon-${props.iconClass}`;
  },
});
let svgClass = computed({
  get() {
    if (props.className) {
      return "svg-icon " + props.className;
    } else {
      return "svg-icon";
    }
  },
});
</script>

<!-- <script>
export default {
  name: "SvgIcon",
  props: {
    iconWidth: {
      type: Number,
      default: () => 16,
    },
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    },
  },
};
</script> -->

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
