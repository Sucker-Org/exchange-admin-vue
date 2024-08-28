/*
 * @Description: 画笔面板
 * @Date: 2024-06-26 17:13:03
 * @LastEditTime: 2024-07-23 11:30:38
 */
import { FunctionalComponent, computed, defineComponent, reactive, ref } from "vue";
import * as config from "./config";
import { generateGraphicConfig } from "./utils";

const PaintbrushBoard = defineComponent((props, ctx) => {
  const brushInstance = ref();

  const isBrushFinish = ref(false);

  const maxPrice = ref(props.yAxisMax);

  const dragTarget = ref<null | Record<string, any>>(null);

  const open = computed({
    get: () => props.modelValue,
    set: v => ctx.emit("update:modelValue", v)
  });

  const point = reactive<{
    start: number;
    end: number;
    values: [number, number][];
    firstDrawValues: [number, number][];
    changeValues: { index: number; value: number }[];
  }>({
    start: 0,
    end: 0,
    values: [],
    firstDrawValues: [],
    changeValues: []
  });
  const initOption = computed(() => {
    const max = +maxPrice.value || 10;
    const isInteger = Math.floor(max) === max;
    return {
      grid: {
        ...config.commonChartOption.grid,
        top: 28
      },
      xAxis: {
        ...config.commonChartOption.xAxis,
        axisLabel: {
          ...config.commonChartOption.xAxis.axisLabel,
          fontSize: 12
        }
      },
      yAxis: {
        name: "价格",
        max: isInteger ? max : +`${max}`,
        //min: isInteger ? -`${max}` : max,
        ...config.commonChartOption.yAxis,
        splitNumber: 10,
        axisLabel: {
          fontSize: 12
        },
        nameTextStyle: {
          ...config.commonChartOption.yAxis.nameTextStyle,
          fontSize: 12
        }
      },
      series: config.defaultLineSeries
    };
  });

  /**
   * 开始绘制
   * @param e
   * @returns
   */
  const onStart = e => {
    if (e?.target) {
      dragTarget.value = e.target;
      return;
    }
    if (point.values.length > 2) {
      reset();
    }
    isBrushFinish.value = false;
    point.values = [];
    point.start = brushInstance.value.convertFromPixel({ seriesIndex: 0 }, [e.offsetX, e.offsetY])[1];
    point.values.push([0, point.start]);
  };

  /**
   * 结束绘制
   * @param e
   * @returns
   */
  const onEnd = e => {
    isBrushFinish.value = true;
    point.end = brushInstance.value.convertFromPixel({ seriesIndex: 0 }, [e.offsetX, e.offsetY])[1];
    if (point.start === point.end) {
      return reset(() => drawLine([]));
    }
    const length = point.values.length;
    const lastIndex = length - 1;
    if (length === 2 && point.values[lastIndex][1] === point.end) {
      return reset(() => drawLine([]));
    }
    point.values.push([lastIndex + 1, point.end]);
    if (length < 97) {
      const surplus = 97 - length;
      for (let i = 1; i < surplus; i++) {
        point.values.push([length + i, point.end]);
      }
      drawLine(point.values);
    }
    if (!point.firstDrawValues.length) {
      point.firstDrawValues = point.values;
    }
  };

  /**
   * 监听鼠标移动轨迹
   * @param e
   * @returns
   */
  const onMousemove = e => {
    if (!point.start || isBrushFinish.value || dragTarget.value || point.values.length >= 97) {
      return;
    }
    const [x, y] = brushInstance.value.convertFromPixel({ seriesIndex: 0 }, [e.offsetX, e.offsetY]);
    const xAxisValue = Math.floor(x) == -1 ? 0 : Math.floor(x);
    const index = xAxisValue < 0 ? 0 : xAxisValue - 1;
    const lastIndex = point.values.length - 1;
    if (index == -1 || (xAxisValue < 0 && xAxisValue > 97) || point.values[lastIndex][1] === y) {
      return;
    }
    // 中间断层量
    const faultVolume = index - point.values.length;
    if (faultVolume > 0) {
      for (let i = 0; i < faultVolume; i++) {
        if (point.values[lastIndex][0] !== lastIndex + i) {
          point.values.push([lastIndex + i, y]);
        }
      }
      return drawLine(point.values);
    }
    if (point.values[index]) {
      point.values[index] = [index, y];
    } else {
      point.values.push([index, y]);
    }
    drawLine(point.values);
  };

  /**
   * 绘制鼠标轨迹线
   * @param data
   */
  const drawLine = (data: [number, number][]) => {
    let seriesData = [...data];
    const getSeries = () => ({
      data: data,
      type: "line",
      smooth: true,
      symbolSize: 8,
      lineStyle: {
        color: "#fd1050"
      },
      itemStyle: {
        color: "#fd1050"
      }
    });
    brushInstance.value.draw({
      series: getSeries(),
      graphic: generateGraphicConfig(seriesData, {
        instance: brushInstance.value,
        onChange: (values, changeValue) => {
          point.values = values as [];
          drawLine(values);
          const index = point.changeValues.findIndex(item => item.index === changeValue.index);
          if (index === -1) {
            point.changeValues.push(changeValue);
          } else {
            point.changeValues[index] = changeValue;
          }
        }
      })
    });
  };

  /**
   * 重置画布
   */
  const reset = (darw?: () => void) => {
    point.start = 0;
    point.end = 0;
    point.values = [];
    point.changeValues = [];
    point.firstDrawValues = [];
    dragTarget.value = null;
    isBrushFinish.value = false;
    if (typeof darw === "function") return darw();
    brushInstance.value.draw(initOption.value);
  };

  return () => (
    <pro-dialog-page
      v-model={open.value}
      class="robot-dialog-page"
      onOnClose={reset}
      v-slots={{
        title: () => {
          return (
            <el-space>
              <h4>绘画</h4>
              <el-text type="primary" tag="i" style="font-size: 12px">
                (鼠标按下并拖动生成轨迹线，鼠标放开绘画结束，空缺区间自动填充。点击Symbol标记并拖动微调曲线，点击空白处，重新绘制~)
              </el-text>
            </el-space>
          );
        },
        "header-tools": () => {
          return (
            <>
              <el-input v-model={maxPrice.value} type="number" min={1} placeholder="最高限价" style="width: 200px" size="small" />
              <el-button disabled={!isBrushFinish.value || point.values.length <= 2} type="info" size="small" onClick={reset}>
                重置
              </el-button>
              <el-button
                disabled={!isBrushFinish.value || point.values.length <= 2}
                type="primary"
                size="small"
                onClick={() => {
                  ctx.emit("save", {
                    values: point.values,
                    yAxisMax: +`${maxPrice.value}`,
                    yAxisMin: -`${maxPrice.value}`,
                    changeValues: point.changeValues,
                    firstDrawValues: point.firstDrawValues
                  });
                }}
              >
                保存
              </el-button>
            </>
          );
        }
      }}
    >
      <echarts
        option={initOption.value}
        onZrMousedown={onStart}
        onZrMouseup={onEnd}
        onZrMousemove={onMousemove}
        onInitSuccess={instance => {
          brushInstance.value = instance;
        }}
      />
    </pro-dialog-page>
  );
}) as unknown as FunctionalComponent;

PaintbrushBoard.props = {
  modelValue: {
    type: Boolean
  },
  yAxisMax: {
    type: Number
  }
};

export default PaintbrushBoard;
