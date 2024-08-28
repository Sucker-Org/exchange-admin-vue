/*
 * @Description:分步表单
 * @Date: 2024-06-03 11:52:40
 * @LastEditTime: 2024-06-18 16:07:48
 */
import { useVModel } from "@vueuse/core";
import { ElMessage } from "element-plus";
import { FunctionalComponent, computed, defineComponent, ref, toRaw } from "vue";
import "./style.scss";
import { ProStep, ProStepsFormProps, proStepsFormProps } from "./typing";

const ProStepsForm = defineComponent<ProStepsFormProps>((props, ctx) => {
  const active = computed(() => props.active ?? 0);

  const formRef = ref();

  const defaultModel = ref({});

  const model = props.modelValue ? useVModel(props, "modelValue", ctx.emit) : defaultModel;

  /**
   * 表单验证
   * @param validateProps 外部配置项验证函数
   */
  const validate = (validateProps: () => boolean = () => true) => {
    formRef.value.validate(valid => {
      if (valid && validateProps?.()) {
        if (active.value + 1 != props.steps?.length) {
          ctx.emit("update:active", active.value + 1);
          formRef.value.clearValidate();
        } else {
          ctx.emit("finish", toRaw(model.value));
        }
      } else {
        ElMessage.warning("表单验证未通过，请检查~");
      }
    });
  };

  const onReset = () => formRef.value.resetFields();

  ctx.expose({
    reset: onReset
  });

  return () => (
    <div class="pro-steps-form">
      {Array.isArray(props.steps) && props.steps.length ? (
        <>
          <el-steps {...props} simple={props.simple ?? true}>
            {props.steps.map(item => (
              <el-step key={item.title} {...item} />
            ))}
          </el-steps>
          <div style={{ display: "grid", placeItems: "center", padding: "50px 0 20px" }}>
            {props.steps[active.value] && props.steps[active.value]?.form?.items?.length ? (
              <pro-form
                {...props.formProps}
                {...props.steps[active.value].form}
                ref={formRef}
                v-model={model.value}
                v-slots={{
                  actions: () => (
                    <el-space class="actions-space" fill={props.actionButtonFull ?? false} style="width: 100%">
                      {active.value != 0 && (
                        <el-button
                          type="primary"
                          onClick={() => {
                            ctx.emit("update:active", active.value - 1);
                          }}
                        >
                          {props.prevButtonText || "上一步"}
                        </el-button>
                      )}
                      {active.value + 1 != props.steps?.length && (
                        <el-button type="primary" onClick={() => validate((props.steps as ProStep[])[active.value].validate)}>
                          {props.nextButtonText || "下一步"}
                        </el-button>
                      )}
                      {active.value + 1 === props.steps?.length && (
                        <el-button type="primary" onClick={() => validate((props.steps as ProStep[])[active.value].validate)}>
                          {props.saveButtonText || "保存"}
                        </el-button>
                      )}
                      <el-button onClick={onReset}>{props.resetButtonText || "重置"}</el-button>
                    </el-space>
                  )
                }}
              />
            ) : (
              <el-empty description="暂无相关表单" />
            )}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}) as unknown as FunctionalComponent<ProStepsFormProps>;

ProStepsForm.props = proStepsFormProps as any;

export * from "./typing";

export default ProStepsForm;
