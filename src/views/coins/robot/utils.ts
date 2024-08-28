/*
 * @Description:
 * @Date: 2024-06-28 11:25:35
 * @LastEditTime: 2024-07-23 10:46:14
 */
export function generateGraphicConfig(
  data: [number, number][],
  config: {
    instance: Record<string, any>;
    onChange: (newData: [number, number][], changeValue: { index: number; value: number }) => void;
  }
) {
  return data.map(function (item, dataIndex) {
    return {
      type: "circle",
      z: 100,
      invisible: true,
      draggable: true,
      shape: { r: 10 },
      position: config.instance.convertToPixel("grid", item),
      ondrag: function (e) {
        const values = config.instance.convertFromPixel("grid", [e.offsetX, e.offsetY]);
        data[dataIndex][1] = +values[1];
        config.onChange(data, { index: dataIndex, value: data[dataIndex][1] });
      }
    };
  });
}
