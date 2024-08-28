/*
 * @Description:
 * @Date: 2024-04-30 17:41:09
 * @LastEditTime: 2024-07-30 09:51:02
 */
import ProCopyable from "@/components/ProCopyable/index.vue";
import { FunctionalComponent, defineComponent } from "vue";
import "./styles.scss";
import { ProDescriptionsItem, ProDescriptionsProps, proDescriptionProps } from "./typing";

const ProDescriptions = defineComponent<ProDescriptionsProps>((props, ctx) => {
  const itemsFormat = (items): ProDescriptionsItem[][] => {
    let filterExtractItem = {
      startIndex: null,
      data: []
    } as Record<string, any>;

    const data = items.filter((item, index) => {
      if (!Array.isArray(item)) {
        filterExtractItem.data.push(item);
        if (!filterExtractItem.startIndex) {
          filterExtractItem.startIndex = index;
        }
      }
      return Array.isArray(item);
    });

    const { startIndex } = filterExtractItem;

    return filterExtractItem.data.length ? data.toSpliced(startIndex, startIndex, filterExtractItem.data) : data;
  };

  return () => (
    <el-space fill size={props.gap} direction="vertical" prefix-cls="pro-descriptions" style="width: 100%;">
      {itemsFormat(props.items ?? [[{}]]).map((descItems, index) => {
        const { title } = props;

        const titleSlot = ctx.slots.title ? ctx.slots.title?.() : Array.isArray(title) ? title[index] : title || "";
        const extraSlot = index < 1 ? ctx.slots.extra?.() : ctx.slots[`extra${index + 1}`]?.();

        const slots = !titleSlot && !extraSlot ? {} : { title: () => titleSlot, extra: () => extraSlot };

        return (
          <div style="height: 100%">
            <el-descriptions
              class="pro-descriptions"
              {...props}
              key={index}
              style={{
                "--is-show-mark": ctx.slots.title ? "none" : "block",
                "--title-margin-left": ctx.slots.title ? 0 : "10px"
              }}
              v-slots={slots}
            >
              {!ctx.slots.default &&
                descItems?.map((item, index) => {
                  const { field = "", render } = item;
                  const data = props.data ?? {};
                  const slotContent = field && ctx.slots[field] ? ctx.slots[field]?.(data) : render?.(data ?? {});
                  const emptyText = props.emptyText ?? "--";
                  const hide = typeof item.hide === "function" ? item.hide(data) : false;
                  return hide === true ? (
                    ""
                  ) : (
                    <el-descriptions-item
                      {...item}
                      key={index}
                      v-slots={{
                        label: () => <span style={props.labelStyle ?? {}}>{item.label}</span>
                      }}
                    >
                      {slotContent ??
                        (item.copyable && (data[field] || data[field] === 0) ? (
                          <ProCopyable value={data[field]} />
                        ) : (
                          data[field] || emptyText
                        ))}
                    </el-descriptions-item>
                  );
                })}
            </el-descriptions>
            {ctx.slots?.default?.()}
          </div>
        );
      })}
    </el-space>
  );
}) as unknown as FunctionalComponent<ProDescriptionsProps>;

ProDescriptions.props = proDescriptionProps as any;

export * from "./typing";

export default ProDescriptions;
