/*
 * @Description:
 * @Date: 2024-04-09 19:12:48
 * @LastEditTime: 2024-07-17 15:44:00
 */
import { Component } from "vue";

import Echarts from "./ECharts/index.vue";
import ProButton from "./ProButton/index.vue";
import ProCopyable from "./ProCopyable/index.vue";
import ProDescriptions from "./ProDescriptions";
import ProDialogPage from "./ProDialogPage/index.vue";
import ProForm from "./ProForm";
import ProFormDialog from "./ProFormDialog";
import ProStepsForm from "./ProStepsForm";
import ProTable from "./ProTable/index.vue";
export const components: { [x: string]: Component } = {
  Echarts,
  ProTable,
  ProForm,
  ProStepsForm,
  ProCopyable,
  ProFormDialog,
  ProDescriptions,
  ProButton,
  ProDialogPage
};

export default function install(app: { component: (arg0: string, arg1: Component) => void }) {
  for (const key in components) {
    app.component(key, components[key]);
  }
}
