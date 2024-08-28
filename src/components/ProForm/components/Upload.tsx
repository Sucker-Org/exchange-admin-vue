/*
 * @Description:
 * @Date: 2024-04-08 11:14:23
 * @LastEditTime: 2024-04-18 17:53:36
 */
import { ElMessage } from "element-plus";
import { defineComponent, ref, type FunctionalComponent } from "vue";
import { Ctx, Props, props as uploadProps } from "./types";

/**
 * 文件上传
 */
const Upload = defineComponent(({ config }: Props, ctx: Ctx) => {
  const { action, multiple = false, limit, headers = {}, returnDataFormat = "file-path" } = config.params || {};

  const defaultFileList: any[] = [];

  const fileList = ref<any[]>(defaultFileList);

  const upload = ref();

  const onError = () => {
    ElMessage({ type: "error", message: "上传失败，请检查" });
  };

  const updateModelValue = () => {
    const data = formatData(fileList.value);
    ctx.emit("update:modelValue", data);
  };

  const formatData = (files: Record<string, any>[]) => {
    let data = "" as any;
    if (returnDataFormat === "file-path") {
      data = files.map(item => item?.url || item?.response?.url);
    }
    if (returnDataFormat === "json-parse" || returnDataFormat === "json-stringify") {
      data = files.map(({ name, size, response }) => ({ name, size, url: response?.url || "" }));
      if (returnDataFormat === "json-stringify") {
        return JSON.stringify(limit == 1 ? data[0] : data);
      }
    }
    return limit == 1 ? data[0] : data;
  };

  const tip = () => <div class="el-upload__tip">{config?.params?.tip}</div>;

  const clearFiles = () => upload.value?.clearFiles();

  ctx.expose({ clearFiles });

  return () => (
    <el-upload
      ref={upload}
      v-model:file-list={fileList.value}
      action={action}
      multiple={multiple}
      limit={limit}
      headers={headers}
      v-slots={{ tip }}
      on-error={onError}
      on-success={updateModelValue}
      on-remove={updateModelValue}
    >
      <el-button type="primary">文件上传</el-button>
    </el-upload>
  );
}) as unknown as FunctionalComponent;

Upload.props = uploadProps;

export default Upload;
