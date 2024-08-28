<!--
 * @Description: 
 * @Date: 2024-08-01 11:42:23
 * @LastEditTime: 2024-08-05 10:08:15
-->
<template>
  <card title="注册数据统计" :content-style="{ height: '300px' }">
    <template #extra>
      <el-space :size="5" style="font-size: 14px; color: #666666; cursor: pointer" @click="router.push('/member/register')">
        <span>查看更多</span>
        <el-icon><ArrowRight /></el-icon>
      </el-space>
    </template>
    <echarts :height="300" :option="option" />
  </card>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { getSignupStatistics } from "@/api/modules/home";
import { nextTick, ref } from "vue";
import { formatNum } from "@/utils";
import Card from "./Card.vue";
const router = useRouter();
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
    left: "32%",
    top: "center",
    textAlign: "center",
    textStyle: {
      color: "#000000",
      fontSize: 15,
      lineHeight: 20
    }
  },

  tooltip: {
    trigger: "item"
  },
  legend: {
    top: "center",
    right: 10,
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
      let arr = "{a|" + name + ":" + "}" + "{b|" + target + "}" + "\n\n{c|" + percent + "}";
      let tmp = arr.split("\n\n");
      let res = "" + arr;
      for (let i in tmp) {
        res = res.replace(tmp[i], "");
      }
      return res + arr;
    },
    textStyle: {
      rich: {
        a: {
          fontSize: 14,
          color: "#666666",
          padding: [0, 5, 0, 0],
          lineHeight: 30
        },
        b: {
          fontSize: 15,
          color: "#000000"
        },
        c: {
          fontSize: 18,
          fontWeight: "bold",
          lineHeight: 11
        }
      }
    }
  },
  series: [
    {
      // name: 'Access From',
      type: "pie",
      radius: ["38%", "68%"],
      center: ["32%", "50%"],
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
    console.log(res, "getSignupStatistics");
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

<style scoped lang="scss">
.card {
  height: 400px;
}
</style>
