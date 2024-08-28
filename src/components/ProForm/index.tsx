/*
 * @Description:
 * @Date: 2024-03-16 09:47:43
 * @LastEditTime: 2024-07-16 11:45:51
 */
import { InfoFilled } from "@element-plus/icons-vue";
import { ElMessage, FormInstance } from "element-plus";
import { computed, defineComponent, readonly, ref, toRaw, type FunctionalComponent } from "vue";
import { components } from "./components";
import "./style.scss";
import { ProFormItem, ProFormProps, Tools, props } from "./types";

const ProForm = defineComponent<ProFormProps>((props, ctx) => {
  //TODO 使用结构出的props变量会存在当props发生变化时，组件无法重新渲染，后续调整
  const { gridColumns, inputWidth: globalInputWidth } = props;

  const formRef = ref<FormInstance>();

  const uploadRef = ref<{ [x: string]: any }>();

  const defaultModelValue = ref({});

  const optionMap = ref<{ [x: string]: { label: string; value: any; [x: string]: any }[] }>({});

  const formData = computed({
    get() {
      return props.modelValue || defaultModelValue.value;
    },
    set(v) {
      if (props.modelValue) {
        ctx.emit("update:modelValue", v);
      } else {
        defaultModelValue.value = v;
      }
    }
  });

  const formItems = computed(() => {
    if (!Array.isArray(props?.items)) {
      return [];
    }

    return (
      props?.items?.filter(item => {
        if (item.field && item.initialValue !== void 0) {
          const initialValue = typeof item.initialValue == "function" ? item.initialValue(formData.value) : item.initialValue;
          formData.value[item.field] = formData.value[item.field] ?? initialValue;
        }
        const hide = typeof item.hide == "function" ? item.hide(toRaw(formData.value)) : item.hide;
        return hide !== true || hide === void 0;
      }) ?? []
    );
  });

  /**
   * 表单验证规则集合
   */
  const rules = computed(() => {
    const rulesOption =
      props.required === true ? formItems.value : formItems.value?.filter(option => option.rule || option.required) || [];
    const data: Record<string, any> = {};
    rulesOption.forEach(item => {
      if (!item.field) {
        return;
      }
      const itemRequired = typeof item.required == "function" ? item.required(formData.value) : item.required;
      let required = {};
      if ((props.required === true && (itemRequired === false || itemRequired === void 0)) || item.required === true) {
        required = {
          required: true,
          message: "",
          trigger: "blur"
        };
      }
      const rule = typeof item.rule == "function" ? item.rule(toRaw(formData.value)) : item.rule || required;
      data[item.field] = Array.isArray(rule) ? rule : [rule];
    });
    return data;
  });

  const inputWidth = computed(() => {
    return (value: string | number): string => {
      const reg = /(px|vw|rem|%)$/;
      if (typeof value == "string") {
        return Number.isNaN(value) ? value : `${reg.test(value) ? value : value + "px"}`;
      }
      return `${value}px`;
    };
  });

  /**
   *
   * @param propertyName 当前变化的属性
   * @returns
   */
  const onValueChange = (v, propertyName: string) => {
    formData.value[propertyName] = v;
    ctx.emit("change", formData.value, propertyName);
  };

  /**
   * 提交表单
   */
  const submitForm = () => {
    formRef.value?.validate(valid => {
      if (valid) {
        ctx.emit("submit", toRaw(formData.value));
      } else {
        ElMessage({
          type: "error",
          message: "表单验证未通过，请检查!"
        });
      }
    });
  };

  // 验证
  const validate = (callback: (valid: boolean) => any) => formRef.value?.validate(callback);

  const clearValidate = () => formRef.value?.clearValidate();

  /**
   * 重置表单
   */
  const resetFields = () => {
    formRef.value?.resetFields();
    uploadRef.value?.clearFiles?.();
  };

  const renderFormItemElement = (option: ProFormItem) => {
    const field = option.field;
    const slot = typeof option.slot === "string" ? option.slot : "";
    const custom = ctx.slots[`${slot || field}-input-box`];
    if (custom) {
      return custom?.();
    }

    const itemType = typeof option.type == "function" ? option.type(formData.value, readonly(optionMap.value)) : option.type;

    const type = props.readonly ? "text" : itemType;
    const RenderNode = components[type || "input-text"];

    let config = { ...option, type: itemType };

    if (typeof option.options == "function" && field) {
      const itemOptions = option.options(props.modelValue ?? {});
      config.options = optionMap.value[field] || itemOptions;
    }

    if (field && !optionMap.value[field] && Array.isArray(config.options) && config.options.length) {
      optionMap.value[field] = config.options as any[];
    }

    if (typeof option.inputProps == "function") {
      config.inputProps = option.inputProps(formData.value, readonly(optionMap.value));
    }

    return (
      <>
        {type === "upload" ? (
          <RenderNode config={config as any} v-model={formData.value[field ?? ""]} ref={uploadRef} />
        ) : (
          <RenderNode
            config={{ empty: props.textEmpty, ...config } as any}
            v-model={formData.value[field ?? ""]}
            onValueChange={v => onValueChange(v, field ?? "")}
          />
        )}
        {renderTools(option.tools, field)}
      </>
    );
  };

  const renderTools = (tools?: Tools, field?: string) => {
    let content: any = "";

    if (ctx.slots[`${field}-tools`]) {
      content = ctx.slots[`${field}-tools`]?.();
    }

    if (Array.isArray(tools) && tools.length) {
      content = (
        <>
          {tools.map((item, index) => (
            <el-button {...item} key={index} onClick={() => ctx.emit("tools", `${field}-tool-${index + 1}`)}>
              {item.content}
            </el-button>
          ))}
        </>
      );
    }

    if (typeof tools == "function") {
      content = tools?.(`${field}-tools`);
    }

    return content ? <div style="margin-left: 15px">{content}</div> : "";
  };

  ctx.expose({ resetFields, validate, clearValidate });

  return () => (
    <el-form
      ref={formRef}
      class="pro-form"
      {...props}
      model={formData.value}
      rules={rules.value}
      label-width={props.labelWidth || "auto"}
      hide-required-asterisk={props.readonly || false}
      style={{
        gridTemplateColumns: `repeat(${props.inline ? formItems.value.length : gridColumns}, 1fr)`
      }}
    >
      {formItems.value.length > 0 &&
        formItems.value.map((option: ProFormItem, index: number) => {
          const field = option.field;

          const isRenderRow = option.valueEmptyRenderRow === void 0 ? true : option.valueEmptyRenderRow;

          const slotRender =
            typeof option.slot == "function" && field
              ? option.slot(props?.modelValue?.[field])
              : ctx.slots[String(option.slot)]?.();

          if (!isRenderRow && field && !props?.modelValue?.[field]) {
            return "";
          }

          const label = typeof option.label == "function" ? option.label(props.modelValue ?? {}) : option.label;

          return (
            <>
              {slotRender ? (
                slotRender
              ) : field && ctx.slots[field] ? (
                ctx.slots[field]?.()
              ) : (
                <el-form-item
                  prop={field || `item${index}`}
                  key={index}
                  style={option.style ?? {}}
                  v-slots={{
                    label: () => (
                      <el-space size={3}>
                        {option.tooltip && (
                          <el-tooltip effect="dark" content={option.tooltip} placement="top">
                            <el-icon>
                              <InfoFilled />
                            </el-icon>
                          </el-tooltip>
                        )}
                        <span style={props.labelStyle}>{label}</span>
                      </el-space>
                    )
                  }}
                >
                  <div
                    class="form-item-content-box"
                    style={{
                      //width: inputWidth.value(option.inputWidth || globalInputWidth || "100%")
                      width: !props.readonly ? inputWidth.value(option.inputWidth || globalInputWidth || "100%") : "fit-content"
                    }}
                  >
                    {typeof option.renderContent == "function"
                      ? option.renderContent(formData.value)
                      : renderFormItemElement({ ...option, label })}
                  </div>
                </el-form-item>
              )}
            </>
          );
        })}
      {props.showAction && formItems.value.length > 0 && (
        <el-form-item label=" ">
          <div style={{ flex: "1", display: "flex", justifyContent: props.actionAlign }}>
            {ctx.slots.actions ? (
              ctx.slots.actions?.(toRaw(props.modelValue))
            ) : (
              <>
                <el-button type="primary" style={{ flex: 1 }} onClick={submitForm}>
                  {props.submitButtonText || "提交"}
                </el-button>
                <el-button style={{ flex: 1 }} onClick={resetFields}>
                  {props.resetButtonText || "重置"}
                </el-button>
              </>
            )}
          </div>
        </el-form-item>
      )}
    </el-form>
  );
}) as unknown as FunctionalComponent<ProFormProps>;

ProForm.props = props as any;

export type * from "./types";

export default ProForm;
