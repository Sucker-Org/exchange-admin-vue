import { ProFormItem } from "@/components/ProForm";
import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-07-22 11:57:06
 */

export const searchFormItems: ProFormItem[] = [
  {
    type: "date",
    field: "kdate",
    label: "日期:",
    inputProps: {
      "value-format": "YYYY-MM-DD",
      style: {
        width: "150px"
      }
    }
  },
  {
    field: "maxPrice",
    label: "价格:"
  }
  // {
  //   type: "radio-button",
  //   field: "timePeriod",
  //   options: [
  //     {
  //       label: "15分钟",
  //       value: 1
  //     },
  //     {
  //       label: "30分钟",
  //       value: 2
  //     },
  //     {
  //       label: "1小时",
  //       value: 4
  //     },
  //     {
  //       label: "2小时",
  //       value: 8
  //     },
  //     {
  //       label: "4小时",
  //       value: 16
  //     }
  //   ]
  // }
];

export const tableColumns: ColumnProps[] = [
  {
    prop: "coinName",
    label: "交易对"
  },
  {
    prop: "kdate",
    label: "日期"
  },
  {
    prop: "pricePencent",
    label: "价格浮动百分比",
    render: ({ row }) => (
      <>
        <el-text type="primary">{row.pricePencent}</el-text>%
      </>
    )
  },
  {
    prop: "operation",
    label: "操作",
    width: 200
  }
];

export const commonChartOption = {
  grid: {
    top: 10,
    left: 0,
    right: 20,
    bottom: 0,
    containLabel: true
  },
  xAxis: {
    min: 0,
    max: 96,
    boundaryGap: false,
    interval: 4,
    axisLabel: {
      formatter(value) {
        const strValue = String(value / 4);
        return strValue.includes(".5") ? strValue.replace(".5", ":30") : `${strValue}:00`;
      },
      fontSize: 8
    },
    axisLine: {
      onZero: false
    },
    axisTick: {
      show: true
    },
    splitLine: {
      show: true,
      lineStyle: {
        width: 0.5,
        color: ["#CCC"],
        type: "dashed"
      }
    }
  },
  yAxis: {
    axisLabel: {
      fontSize: 8
    },
    axisLine: {
      show: true
    },
    axisTick: {
      show: true
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ["#CCC"],
        width: 0.5,
        type: "dashed"
      }
    },
    nameTextStyle: {
      fontSize: 10,
      fontWeight: 600
    }
  }
};

export const defaultLineSeries = {
  type: "line",
  data: [
    [93, 0],
    [94, 0],
    [95, 0],
    [96, 0]
  ],
  lineStyle: {
    opacity: 0
  },
  itemStyle: {
    opacity: 0
  }
};
