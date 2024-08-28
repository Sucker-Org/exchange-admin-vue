/*
 * @Description:
 * @Date: 2024-06-17 17:09:14
 * @LastEditTime: 2024-08-05 16:49:47
 */
import "echarts-liquidfill";
import type {
  BarSeriesOption,
  GaugeSeriesOption,
  LineSeriesOption,
  LinesSeriesOption,
  PieSeriesOption,
  RadarSeriesOption,
  ScatterSeriesOption
} from "echarts/charts";
import {
  BarChart,
  CandlestickChart,
  CandlestickSeriesOption,
  GaugeChart,
  LineChart,
  LinesChart,
  PieChart,
  RadarChart,
  ScatterChart
} from "echarts/charts";
import type {
  DatasetComponentOption,
  GraphicComponentOption,
  GridComponentOption,
  TitleComponentOption,
  TooltipComponentOption
} from "echarts/components";
import {
  DataZoomComponent,
  DatasetComponent,
  GeoComponent,
  GraphicComponent,
  GridComponent,
  LegendComponent,
  PolarComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
  VisualMapComponent
} from "echarts/components";
import type { ComposeOption } from "echarts/core";
import * as echarts from "echarts/core";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | LinesSeriesOption
  | PieSeriesOption
  | RadarSeriesOption
  | GaugeSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | ScatterSeriesOption
  | CandlestickSeriesOption
  | GraphicComponentOption
>;

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  PolarComponent,
  GeoComponent,
  ToolboxComponent,
  DataZoomComponent,
  GraphicComponent,
  VisualMapComponent,
  BarChart,
  LineChart,
  LinesChart,
  PieChart,
  ScatterChart,
  RadarChart,
  GaugeChart,
  CandlestickChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

export default echarts;
