/*
 * @Description:
 * @Date: 2024-04-11 14:40:37
 * @LastEditTime: 2024-07-04 14:19:15
 */
import { ElMessage } from "element-plus";
import { FunctionalComponent, computed, defineComponent, reactive, ref, toRaw, watch } from "vue";
import "./style.scss";
import { ProFormDialogProps, TitleEnum, proFormDialogProps } from "./typing";

const ProFormDialog = defineComponent<ProFormDialogProps>(
  (props, ctx) => {
    const formEntity = ref({});

    const proFormRef = ref();

    const defaultTitle = computed(() => TitleEnum[props.mode || "create"]);

    const loading = reactive({
      request: false,
      detail: false
    });

    const open = computed({
      get() {
        return props.modelValue;
      },
      set(v) {
        ctx.emit("update:modelValue", v);
      }
    });

    const onSaveBtn = async () => {
      if (typeof props.validate == "function") {
        const valid = await props.validate(proFormRef.value, toRaw(formEntity.value));
        return valid === true ? sendRequest() : false;
      }
      proFormRef.value.validate(valid => {
        if (!valid) {
          return ElMessage.warning("表单验证未通过~");
        }
        sendRequest();
      });
    };

    const sendRequest = () => {
      if (typeof props.request == "function") {
        try {
          loading.request = true;
          props.request(formEntity.value);
        } finally {
          loading.request = false;
        }
      } else {
        ctx.emit("finish", formEntity.value);
      }
    };

    const formReset = () => {
      formEntity.value = {};
      proFormRef.value?.resetFields();
      proFormRef.value?.clearValidate();
    };

    const onClose = () => {
      formReset();
      ctx.emit("close");
    };

    const renderFormSlots = () => {
      const slots = {};
      for (const name in ctx.slots) {
        slots[name] = () => ctx.slots[name]?.(formEntity.value);
      }
      return slots;
    };

    const Footer = () => {
      return (
        <div
          class={`dialog-footer ${props.mode != "view" ? "top-border" : ""}`}
          style={{ justifyContent: props.footerAlign || "right" }}
        >
          {(props.mode == "create" || props.mode == "update" || props.mode == void 0) &&
            ctx.slots.footer &&
            ctx.slots.footer?.(formEntity.value)}

          {(props.mode == "create" || props.mode == "update" || props.mode == void 0) && !ctx.slots.footer && (
            <>
              <el-button onClick={() => ctx.emit("update:modelValue", false)}>{props.cancelBtnText}</el-button>
              <el-button loading={loading.request} type="primary" onClick={onSaveBtn}>
                {props.saveBtnText}
              </el-button>
            </>
          )}
        </div>
      );
    };

    watch(
      () => [props.initialValue, open.value],
      async () => {
        if (!open.value) {
          return;
        }
        if (typeof props.initialValue == "function") {
          try {
            loading.detail = true;
            const initialValue = await props.initialValue();
            formEntity.value = { ...formEntity.value, ...initialValue };
          } finally {
            loading.detail = false;
          }
        } else {
          formEntity.value = { ...formEntity.value, ...props.initialValue };
        }
      },
      {
        deep: true
      }
    );

    return () => (
      <el-dialog
        class="pro-form-dialog"
        {...props}
        v-model={open.value}
        title={props.title || defaultTitle.value}
        onClose={onClose}
        onOpen={() => ctx.emit("open")}
        style={{
          "--footer-top-border": props.footerTopBorder ? "1px solid var(--el-border-color-lighter)" : "0"
        }}
        v-slots={{
          footer: Footer
        }}
      >
        {ctx.slots.default ? (
          ctx.slots.default()
        ) : (
          <>
            {open.value && (
              <pro-form
                readonly={props.mode == "view"}
                {...props.formProps}
                ref={proFormRef}
                v-loading={props.loading ?? loading.detail}
                v-model={formEntity.value}
                items={props.formItems}
                showAction={false}
                v-slots={renderFormSlots()}
                onChange={(entity, key) => {
                  ctx.emit("valueChange", entity, key);
                }}
              />
            )}
          </>
        )}
      </el-dialog>
    );
  },
  {
    name: "ProFormDialog"
  }
) as unknown as FunctionalComponent<ProFormDialogProps>;

ProFormDialog.props = proFormDialogProps as any;

export default ProFormDialog;
