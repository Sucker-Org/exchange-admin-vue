<!--
 * @Description: 
 * @Date: 2024-07-31 13:40:55
 * @LastEditTime: 2024-08-02 17:32:34
-->
<template>
  <div class="card-container card">
    <header>
      <slot name="title">
        <h4>{{ title }}</h4>
      </slot>
      <slot name="extra">
        <span class="extra">{{ extra }}</span>
      </slot>
    </header>
    <div :style="{ display: 'grid', placeItems: 'center', marginTop: title ? '20px' : 0, ...contentStyle }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, PropType } from "vue";

defineProps({
  title: String,
  extra: String,
  contentStyle: {
    type: Object as PropType<CSSProperties>
  }
});
</script>

<style scoped lang="scss">
.card-container {
  border-radius: 5px;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4 {
      margin: 0;
      font-weight: 600;
    }
  }
}
</style>
