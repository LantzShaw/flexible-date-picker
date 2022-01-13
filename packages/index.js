import FlexibleDatePicker from "./flexible-date-picker";

const components = [FlexibleDatePicker];

const install = Vue => {
  if (install.installed) return;

  components.map(component => Vue.component(component.name, component));
};

// 判单是否直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install, // 导出的对象必须具备一个 install 方法
  ...components, // 组件列表
};
