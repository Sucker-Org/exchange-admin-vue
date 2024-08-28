<!--
 * @Description: 
 * @Date: 2024-08-01 11:42:23
 * @LastEditTime: 2024-08-05 10:08:15
-->
<template>
  <card title="平台注册数量统计" :content-style="{ height: '300px', placeItems: 'unset' }">
    <span v-if="date" style="padding-left: 5px; font-size: 14px; color: #666666"> 更新于{{ date }} </span>
    <echarts width="100%" :height="300" :option="option" />
  </card>
</template>

<script setup lang="ts">
import { getSignupStatistics } from "@/api/modules/home";
import { nextTick, ref } from "vue";
import { formatNum } from "@/utils";
// import { computed } from "vue";
// import dayjs from "dayjs";
import Card from "./Card.vue";
const date = ref(null);
const data = ref([
  {
    name: "未实名人数",
    value: 0,
    percent: ""
  },
  {
    name: "实名人数",
    value: 0,
    percent: ""
  }
]);
const option = ref({
  color: ["#0079FD", "#32CD80"],
  title: {
    text: "总人数" + "\n",
    left: "49.5%",
    top: "center",
    textAlign: "center",
    textStyle: {
      color: "#000000",
      fontSize: 15,
      lineHeight: 22
    }
  },

  tooltip: {
    trigger: "item"
  },
  legend: {
    top: "center",
    right: 60,
    orient: "vertical",
    icon: "circle",
    data: [
      {
        name: "未实名人数",
        textStyle: {
          color: "#0079FD"
        }
      },
      {
        name: "实名人数",
        textStyle: {
          color: "#32CD80"
        }
      }
    ],
    formatter: function (name) {
      let target;
      let percent;
      for (let i = 0; i < option.value.series[0].data.length; i++) {
        if (option.value.series[0].data[i].name == name) {
          target = option.value.series[0].data[i].value;
          percent = option.value.series[0].data[i].percent;
        }
      }
      let arr = "{a|" + name + ":" + "}" + "{b|" + target + "}" + "\n{c|" + percent + "}";
      let tmp = arr.split("\n");
      let res = "" + arr;
      for (let i in tmp) {
        res = res.replace(tmp[i], "");
      }
      console.log(res, arr);

      return res + arr;
    },
    textStyle: {
      rich: {
        a: {
          fontSize: 15,
          color: "#666666",
          padding: [0, 10, 0, 0],
          lineHeight: 60
        },
        b: {
          fontSize: 17,
          color: "#000000",
          fontWeight: "bold"
        },
        c: {
          fontSize: 22,
          fontWeight: "bold",
          lineHeight: 10
        }
      }
    }
  },
  series: [
    {
      type: "pie",
      radius: ["40%", "70%"],
      center: ["50%", "50%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 2
      },
      label: {
        show: false,
        position: "center"
      },
      emphasis: {
        label: {
          show: false,
          fontSize: 40,
          fontWeight: "bold"
        }
      },
      labelLine: {
        show: false
      },
      data: data
    }
  ]
});

const getData = () => {
  getSignupStatistics(1).then((res: any) => {
    data.value[0].value = res.data.unRealNum;
    data.value[1].value = res.data.realNum;
    data.value[0].percent = (res.data.unRealNum / res.data.totalNum).toFixed(4) * 100 + "%";
    data.value[1].percent = (res.data.realNum / res.data.totalNum).toFixed(4) * 100 + "%";
    nextTick(() => {
      let num = formatNum(res.data.totalNum);
      option.value.title.text = "总人数" + "\n" + num;
    });
  });
};

getData();
</script>

<style scoped lang="scss"></style>
