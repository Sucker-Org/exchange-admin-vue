<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-07-31 11:50:07
-->
<template>
  <div class="robot-grid-container" :style="{ height: openDrawDialog ? '100%' : '150vh' }">
    <div class="card">
      <pro-descriptions title="控盘机器人" style="height: 100%">
        <template #title>
          <el-space>
            <el-select v-model="filterParams.symbol" placeholder="请选择交易对" style="width: 200px" @change="reload">
              <el-option v-for="item in symbolOptions" :key="item.symbol" :value="item.symbol">{{ item.symbol }}</el-option>
            </el-select>
            <el-button type="primary" icon="edit-pen" plain @click="openDrawDialog = true">绘画</el-button>
            <el-button type="primary" icon="refresh" plain @click="reload">刷新</el-button>
          </el-space>
        </template>
        <template #extra>
          <pro-form
            v-model="filterParams"
            :inline="true"
            :label-width="0"
            :show-action="false"
            :items="config.searchFormItems"
            @change="onFilterParamsChange"
          >
            <template #maxPrice-input-box>
              <el-input v-model="maxPrice" placeholder="最高限价" style="width: 200px">
                <template #append>
                  <el-button
                    @click="
                      () => {
                        if (Number.isNaN(+maxPrice)) {
                          return ElMessage.warning('请输入数字格式');
                        }
                        filterParams.maxPrice = maxPrice;
                      }
                    "
                  >
                    确定
                  </el-button>
                </template>
              </el-input>
            </template>
          </pro-form>
        </template>
        <echarts
          :height="'calc(100% - 50px)'"
          :option="{
            ...config.commonChartOption,
            grid: {
              ...config.commonChartOption.grid,
              top: 28
            },
            xAxis: config.commonChartOption.xAxis,
            yAxis: {
              name: '价格',
              scale: true,
              max: filterParams.maxPrice,
              min: 0,
              ...config.commonChartOption.yAxis
            },
            series: config.defaultLineSeries
          }"
          @init-success="
            instance => {
              lineChartRef = instance;
              instance.showLoading();
            }
          "
        />
      </pro-descriptions>
    </div>
    <div class="card kline">
      <pro-descriptions title="绘制的K线图" style="height: 100%">
        <template #extra>
          <el-button
            :disabled="disabledRedrawButton"
            type="primary"
            size="small"
            @click="
              () => {
                drawKline(chartData.line);
                disabledRedrawButton = true;
              }
            "
            >重绘预览K线图
          </el-button>
          <el-button type="success" size="small" @click="openFloatingRatioSetting = true">保存机器人趋势数据</el-button>
        </template>
        <echarts
          :height="'calc(100% - 40px)'"
          :option="{
            ...config.commonChartOption,
            grid: config.commonChartOption.grid,
            xAxis: {
              ...config.commonChartOption.xAxis,
              type: chartData.kLine.length ? 'category' : 'value'
            },
            yAxis: {
              scale: true,
              max: klineMaxPrice,
              min: 0,
              ...config.commonChartOption.yAxis
            },
            series: kLineSeries
          }"
          @init-success="
            instance => {
              klineChartRef = instance;
              instance.showLoading();
            }
          "
        />
      </pro-descriptions>
    </div>
    <div class="card table">
      <pro-descriptions title="BTC/USDT 交易对机器人趋势数据" style="height: 100%">
        <div v-loading="table.loading" style="height: calc(100% - 40px)">
          <pro-table
            :columns="config.tableColumns"
            :data="table.data?.map(({ customRobotKline }) => customRobotKline)"
            :tool-button="false"
            :pagination="false"
            :height="'100%'"
          >
            <template #operation="{ row, $index }">
              <el-button
                :disabled="row.coinName === filterParams.symbol && row.kdate === filterParams.kdate"
                type="primary"
                size="small"
                @click="onCopy(row, $index)"
              >
                复制
              </el-button>
            </template>
          </pro-table>
        </div>
      </pro-descriptions>
    </div>
    <pro-form-dialog
      v-model="openFloatingRatioSetting"
      title="允许价格浮动比例设置"
      width="25%"
      :form-items="[{ field: 'pricePencent', type: 'input-number', initialValue: 5, inputProps: { min: 0, append: '%' } }]"
      :request="saveKlineData"
    />
    <PaintbrushBoard v-model="openDrawDialog" :y-axis-max="filterParams.maxPrice" @save="onPaintbrushBoardSave" />
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/coin";
import { formatDate } from "@/utils/date";
import { ElMessage } from "element-plus";
import { computed, onMounted, reactive, ref } from "vue";
import PaintbrushBoard from "./PaintbrushBoard";
import * as config from "./config";
import { generateGraphicConfig } from "./utils";

const maxPrice = ref(10);

const klineMaxPrice = ref(maxPrice.value);

const filterParams = ref({
  symbol: "", //"HDC/CNHD",
  kdate: formatDate(Date.now()).split(" ")[0],
  maxPrice: 10,
  timePeriod: 1
});

const lineChartRef = ref();

const klineChartRef = ref();

const chartData = reactive<{
  original: [];
  line: [number, number][];
  kLine: [number, number, number, number] | [];
  firstDrawValues: [number, number][];
  changeLineValues: { index: number; value: number }[];
}>({
  original: [],
  line: [],
  kLine: [],
  firstDrawValues: [],
  changeLineValues: []
});

const table = reactive<{
  loading: boolean;
  data: {
    maxLimit: number;
    minLimit: number;
    customRobotKline: any[];
  }[];
}>({
  data: [],
  loading: false
});

const symbolOptions = ref<{ symbol: string }[]>([]);

const openFloatingRatioSetting = ref(false);

const disabledRedrawButton = ref(true);

const openDrawDialog = ref(false);

const kLineSeries = computed(() => {
  if (!chartData.kLine.length) {
    return {
      type: "candlestick",
      data: [0, 0, 0, 0],
      itemStyle: {
        opacity: 0
      }
    };
  }
  return {
    type: "candlestick",
    data: chartData.kLine,
    itemStyle: {
      color: "#FD1050",
      color0: "#0CF49B",
      borderColor: "#FD1050",
      borderColor0: "#0CF49B"
    }
  };
});

const getSymbolOptions = (callback: Function) => {
  service.getCoinSettingListByPage({ page: 1, limit: 9999 }, false).then((res: any) => {
    symbolOptions.value = res.data.content ?? [];
    filterParams.value.symbol = symbolOptions.value[0]?.symbol;
    callback();
  });
};

const getKline = () => {
  lineChartRef?.value?.showLoading();
  klineChartRef?.value?.showLoading();
  service
    .getRobotRecentKlineBySymbol({
      symbol: filterParams.value.symbol,
      kdate: filterParams.value.kdate
    })
    .then((res: any) => {
      klineMaxPrice.value = res.data.maxLimit || 10;
      filterParams.value.maxPrice = res.data.maxLimit || 10;
      generateLine(res?.data?.customRobotKline?.kline);
    })
    .catch(() => {
      generateLine("");
    });
};

const generateLine = (data: string) => {
  lineChartRef.value?.showLoading();
  klineChartRef.value?.showLoading();
  const arrData = data ? JSON.parse(data) : [];
  const lineData = arrData?.map(item => +item[1]);
  chartData.original = arrData;
  chartData.line = lineData?.map((v, i) => [i, v]) ?? [];
  drawLine(filterParams.value.timePeriod, chartData.line);
  drawKline(chartData.line);
};

const getKlineList = () => {
  table.loading = true;
  service
    .getRobotRecentKlineList({ symbol: filterParams.value.symbol })
    .then((res: any) => {
      table.data = res.data;
    })
    .catch(() => {
      table.data = [];
    })
    .finally(() => {
      table.loading = false;
    });
};

/**
 *
 * @param data 绘制k线
 */
const drawKline = (data: [number, number][]) => {
  console.log(data, "drawKline");
  if (!chartData.kLine.length) {
    const groupArray = (arr, size, repair) => {
      return arr.map((_, i) => {
        const values = arr.slice(i, i + size);
        const data = values.concat(Array(size - values.length).fill(repair));
        // data[2] = Math.ceil(Math.random() * 5);
        // data[3] = Math.ceil(Math.random() * 5);
        return data;
      });
    };
    klineMaxPrice.value = filterParams.value.maxPrice;
    const newData = chartData.firstDrawValues?.map(v => v[1]);
    const values = groupArray(newData, 4, newData[newData.length - 1]);
    chartData.kLine = updateKline(values);
    klineChartRef.value?.hideLoading();
  } else {
    chartData.kLine = updateKline(chartData.kLine);
  }
};

const updateKline = (values: [number, number, number, number]) => {
  if (chartData.changeLineValues.length) {
    chartData.changeLineValues.forEach(item => {
      values[item.index][1] = item.value;
      if (item.index + 1 < values.length) {
        values[item.index + 1][0] = item.value;
      }
    });
    chartData.changeLineValues = [];
  }
  return values;
};

const onFilterParamsChange = (entity, k) => {
  if (k == "kdate") {
    return reload();
  }
  if (k == "timePeriod") {
    return drawLine(entity.timePeriod, chartData.line);
  }
};

const drawLine = (intervals, data: [number, number][]) => {
  const seriesData = [...data];

  const getSeries = () => ({
    type: "line",
    name: "test",
    smooth: true,
    symbolSize: 8,
    lineStyle: {
      color: "#fd1050"
    },
    data: seriesData.map((value, index) => {
      return {
        value: value,
        itemStyle: {
          color: "#fd1050",
          opacity: index % intervals === 0 ? 1 : 0
        }
      };
    })
  });

  if (data && data.length > 0) {
    lineChartRef.value.draw({
      series: getSeries(),
      graphic: generateGraphicConfig(seriesData, {
        instance: lineChartRef.value,
        onChange: (values, changeValue: { index: number; value: number }) => {
          chartData.line = values as [];
          drawLine(filterParams.value.timePeriod, values);
          disabledRedrawButton.value = false;
          const index = chartData.changeLineValues.findIndex(item => item.index === changeValue.index);
          if (index === -1) {
            chartData.changeLineValues.push(changeValue);
          } else {
            chartData.changeLineValues[index] = changeValue;
          }
        }
      })
    });
  } else {
    lineChartRef.value.draw({
      series: config.defaultLineSeries
    });
  }
  lineChartRef.value?.hideLoading();
};

const saveKlineData = ({ pricePencent }) => {
  service
    .saveRobotKline({
      coinName: filterParams.value.symbol,
      kdate: filterParams.value.kdate,
      kline: JSON.stringify(chartData.line),
      pricePencent
    })
    .then(() => {
      ElMessage.success("保存成功");
      openFloatingRatioSetting.value = false;
    });
};

const onPaintbrushBoardSave = ({ values, yAxisMax, changeValues, firstDrawValues }) => {
  chartData.line = values;
  chartData.firstDrawValues = firstDrawValues;
  chartData.changeLineValues = changeValues;
  maxPrice.value = yAxisMax;
  filterParams.value.maxPrice = +yAxisMax;
  openDrawDialog.value = false;
  disabledRedrawButton.value = true;
  drawLine(filterParams.value.timePeriod, values);
  chartData.kLine = [];
  drawKline(chartData.line);
};

const onCopy = (row, index) => {
  maxPrice.value = table.data[index].maxLimit;
  filterParams.value.maxPrice = table.data[index].maxLimit;
  filterParams.value.kdate = row.kdate;
  generateLine(row.kline);
};

const reload = () => {
  getKline();
  getKlineList();
};

onMounted(() => {
  getSymbolOptions(reload);
});
</script>

<style scoped lang="scss">
.el-descriptions__extra {
  .el-form {
    grid-template-columns: repeat(3, auto) !important;
  }
}
.robot-dialog-page :deep(.el-dialog__body) {
  height: calc(100% - 95px) !important;
}
:deep(.el-descriptions__extra) {
  display: flex;
  flex: 1;
  justify-content: right;
}
:deep(.el-form-item) {
  margin: 0;
}
.card.table :deep(.card) {
  padding: 0;
  border: 0;
  border-radius: 0;
  box-shadow: unset;
}
.robot-grid-container {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 15px;
}
</style>
