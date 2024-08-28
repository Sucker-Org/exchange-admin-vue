/*
 * @Description:
 * @Date: 2024-04-30 17:42:23
 * @LastEditTime: 2024-06-28 17:07:07
 */
import { descriptionProps } from "element-plus";
import type { CSSProperties, ExtractPropTypes, PropType } from "vue";
import { JSX } from "vue/jsx-runtime";

export const proDescriptionProps = {
  ...descriptionProps,
  gap: {
    type: Number
  },
  title: {
    type: [String, Array] as PropType<string | string[]>
  },
  items: {
    type: Array as PropType<ProDescriptionsItem[] | ProDescriptionsItem[][]>
  },
  data: {
    type: Object as PropType<Record<string, any>>
  },
  emptyText: {
    type: String
  },
  bodyStyle: {
    type: Object as PropType<CSSProperties>
  },
  labelStyle: {
    type: Object as PropType<CSSProperties>
  },
  titlePrefixVerticalLine: {
    type: Boolean
  }
};
export interface ProDescriptionsItem {
  label: string;
  span?: number;
  field?: string;
  copyable?: boolean;
  hide?: (data) => boolean;
  render?: (data) => JSX.Element;
}

export type ProDescriptionsProps = ExtractPropTypes<typeof proDescriptionProps>;

// type ElDescriptionsProps = ExtractPropTypes<typeof descriptionProps>;
// export interface ProDescriptionsProps extends Omit<ElDescriptionsProps, "title"> {
//   gap?: number;
//   title?: string | string[];
//   items: ProDescriptionsItem[] | ProDescriptionsItem[][];
//   data?: Record<string, any>;
//   emptyText?: string;
//   bodyStyle?: CSSProperties;
//   labelStyle?: CSSProperties;
//   titlePrefixVerticalLine?: boolean;
// }
