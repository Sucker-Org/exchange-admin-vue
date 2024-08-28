/*
 * @Author: myj myj_abc123@163.com
 * @Date: 2024-04-28 13:35:48
 * @LastEditors: sjd shi_junda@outlook.com
 * @LastEditTime: 2024-05-29 17:45:21
 * @FilePath: \exchange-admin-vue\src\api\modules\upload.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from "@/api";
import { PORT1 } from "@/api/config/servicePort";
import { Upload } from "@/api/interface/index";

/**
 * @name 文件上传模块
 */
// 图片上传
export const uploadImg = (params: FormData) => {
  // return http.post<Upload.ResFileUrl>(PORT1 + `/file/upload/img`, params, { cancel: false });
  return http.post<Upload.ResFileUrl>(`/admin/common/upload/oss/image`, params, { cancel: false });
};

// 视频上传
export const uploadVideo = (params: FormData) => {
  return http.post<Upload.ResFileUrl>(PORT1 + `/file/upload/video`, params, { cancel: false });
};
