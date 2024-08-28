<!--
 * @Description: 
 * @Date: 2024-04-07 09:54:32
 * @LastEditTime: 2024-08-05 17:12:42
-->
<template>
  <div ref="chartRef" class="chart-box" :style="echartsStyle" />
</template>

<script setup lang="ts" name="ECharts">
import { useGlobalStore } from "@/stores/modules/global";
import { useDebounceFn } from "@vueuse/core";
import { ECElementEvent, EChartsType } from "echarts/core";
import { storeToRefs } from "pinia";
import { computed, markRaw, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import echarts, { ECOption } from "./config";

interface Props {
  option: ECOption;
  renderer?: "canvas" | "svg";
  resize?: boolean;
  theme?: Object | string;
  width?: number | string;
  height?: number | string;
  loading?: boolean;
  map?: {
    name: string;
    data: Record<string, any>;
  };
  onClick?: (event: ECElementEvent) => any;
}

const props = withDefaults(defineProps<Props>(), {
  renderer: "canvas",
  resize: true,
  width: "100%",
  height: "100%"
});

const emit = defineEmits([
  "initSuccess",
  "drawSuccess",
  "mousedown",
  "mousemove",
  "mouseup",
  "click",
  "zrMousedown",
  "zrMousemove",
  "zrMouseup",
  "zrClick"
]);

const lastOption = ref<null | Record<string, any>>(null);

const echartsStyle = computed(() => {
  return {
    width: typeof props.width === "number" ? `${props.width}px` : props.width,
    height: typeof props.height === "number" ? `${props.height}px` : props.height
  };
});

const chartRef = ref<HTMLDivElement | HTMLCanvasElement>();
const chartInstance = ref<EChartsType>();

const draw = (option = {}) => {
  if (chartInstance.value) {
    if (props.loading === true) {
      chartInstance.value.showLoading();
    }
    lastOption.value = option;
    const newOption = { ...props.option, ...option };
    chartInstance.value.setOption(
      {
        ...chartInstance.value.getOption(),
        ...newOption
      },
      { notMerge: true }
    );
    chartInstance.value["draw"] = draw;
    emit("drawSuccess", chartInstance.value, newOption);
  }
};

watch(
  () => props.option,
  () => {
    // 通过props设置执行时机在setOption之后, 导致通过setOption设置的参数会被覆盖，通过lastOption字段保存setOption参数
    draw(lastOption.value ?? {});
  },
  {
    deep: true
  }
);

watch(
  () => props.loading,
  () => {
    if (props.loading === false) {
      chartInstance.value?.hideLoading();
    }
  }
);

const handleClick = (event: ECElementEvent) => props.onClick && props.onClick(event);

const init = () => {
  if (!chartRef.value) return;
  chartInstance.value = markRaw(
    echarts.init(chartRef.value, props.theme, {
      renderer: props.renderer
    })
  );
  if (props.map && Object.keys(props.map).length) {
    echarts.registerMap(props.map?.name, props.map?.data as any);
  }
  chartInstance.value.on("click", handleClick);
  chartInstance.value.on("mousedown", e => emit("mousedown", e));
  chartInstance.value.on("mousemove", e => emit("mousemove", e));
  chartInstance.value.on("mouseup", e => emit("mouseup", e));
  chartInstance.value.getZr().on("click", e => emit("zrClick", e));
  chartInstance.value.getZr().on("mouseup", e => emit("zrMouseup", e));
  chartInstance.value.getZr().on("mousedown", e => emit("zrMousedown", e));
  chartInstance.value.getZr().on("mousemove", e => emit("zrMousemove", e));
  chartInstance.value["draw"] = draw;
  emit("initSuccess", chartInstance.value, props.option);
  draw();
};

const resize = () => {
  if (chartInstance.value && props.resize) {
    chartInstance.value.resize({ animation: { duration: 300 } });
  }
};

const debouncedResize = useDebounceFn(resize, 300, { maxWait: 800 });

const globalStore = useGlobalStore();
const { maximize, isCollapse, tabs, footer } = storeToRefs(globalStore);

watch(
  () => [maximize, isCollapse, tabs, footer],
  () => {
    debouncedResize();
  },
  { deep: true }
);

onMounted(() => {
  nextTick(() => init());
  window.addEventListener("resize", debouncedResize);
});

onBeforeUnmount(() => {
  chartInstance.value?.dispose();
});

defineExpose({
  getInstance: () => chartInstance.value,
  draw,
  resize
});
</script>
