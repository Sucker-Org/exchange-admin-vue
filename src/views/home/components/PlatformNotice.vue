<!--
 * @Description: 
 * @Date: 2024-08-01 11:56:16
 * @LastEditTime: 2024-08-01 15:45:27
-->
<template>
  <card title="平台公告">
    <template #extra>
      <el-space :size="5" style="font-size: 14px; color: #666666; cursor: pointer" @click="router.push('/content/announcement')">
        <span>查看更多</span>
        <el-icon><ArrowRight /></el-icon>
      </el-space>
    </template>
    <ul>
      <li v-for="(notice, index) in data" :key="index" @click="toDetail(notice.id)">
        <img src="@/assets/images/tz.png" />
        <div class="noticeContent">
          <h5 class="sle">{{ notice.title }}</h5>
          <p>{{ notice.createTime }}</p>
        </div>
      </li>
    </ul>
  </card>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { list } from "@/api/modules/content/announcement";
import { ref } from "vue";
import Card from "./Card.vue";

const router = useRouter();
// const data = ref([
//   {
//     title: "公告公告标题公告标题公告标题标题",
//     createDate: "2024-01-09 13:27:56"
//   },
//   {
//     title: "公告公告标题公告标题公告标题标题",
//     createDate: "2024-01-09 13:27:56"
//   },
//   {
//     title: "公告公告标题公告标题公告标题标题",
//     createDate: "2024-01-09 13:27:56"
//   },
//   {
//     title: "公告公告标题公告标题公告标题标题",
//     createDate: "2024-01-09 13:27:56"
//   },
//   {
//     title: "公告公告标题公告标题公告标题标题",
//     createDate: "2024-01-09 13:27:56"
//   }
// ]);
const data = ref<Record<string, any>>({});
const getData = () => {
  list({ page: 1, limit: 5 }).then(res => {
    data.value = res.data.content;
  });
};

getData();
const toDetail = id => {
  router.push(`/content/announcement?type=view&id=${id}`);
};
</script>

<style scoped lang="scss">
ul {
  width: 100%;
  min-height: 300px;
  max-height: 500px;
  margin: 0;
  overflow-y: auto;
  h5 {
    width: 100%;
    margin: 0;
    font-size: 14px;
    color: #191919;
  }
  p {
    margin: 6px 0 0;
    font-size: 13px;
    color: #666666;
  }
}
ul > li:not(:last-child) {
  /* margin-bottom: 20px; */
  border-bottom: #f5f5f5 solid 1px;
}
ul > li:first-child {
  padding-top: 15px;
}
ul > li {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 24px 0 16px;
  cursor: pointer;
}
ul > li > img {
  width: 40px;
  height: 40px;
  margin-right: 12px;
}
ul > li > p {
  font-size: 12px;
}
.noticeContent {
  width: calc(100% - 95px);
}
</style>
