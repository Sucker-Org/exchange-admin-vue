/*
 * @Description:
 * @Date: 2024-04-07 09:54:32
 * @LastEditTime: 2024-05-15 09:42:20
 */
import { ElLoading } from "element-plus";

/* 全局请求 loading */
let loadingInstance: ReturnType<typeof ElLoading.service>;

/**
 * @description 开启 Loading
 * */
const startLoading = (text = "Loading") => {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    lock: true,
    text,
    background: "rgba(0, 0, 0, 0.7)"
  });
};

/**
 * @description 结束 Loading
 * */
const endLoading = () => {
  loadingInstance.close();
};

/**
 * @description 显示全屏加载
 * */
let needLoadingRequestCount = 0;
export const showFullScreenLoading = (text = "Loading") => {
  if (needLoadingRequestCount === 0) {
    startLoading(text);
  }
  needLoadingRequestCount++;
};

/**
 * @description 隐藏全屏加载
 * */
export const tryHideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
};
