import FlexibleDatePicker from "./src/main.vue";

FlexibleDatePicker.install = Vue => {
  Vue.component(FlexibleDatePicker.name, FlexibleDatePicker);
};

export default FlexibleDatePicker;
