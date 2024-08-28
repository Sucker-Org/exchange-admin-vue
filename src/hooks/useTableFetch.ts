/*
 * @Description:
 * @Date: 2024-05-09 15:39:33
 * @LastEditTime: 2024-07-02 09:18:35
 */
export function useTableFetch(request: (params) => Promise<Record<string, any>>, before?: (params) => Record<string, any>) {
  const fetchData = async params => {
    params["page"] = params?.pageNum ?? 1;
    params["limit"] = params?.pageSize ?? 10;

    delete params.pageNum;
    delete params.pageSize;

    if (typeof before == "function") {
      params = before(params);
    }

    try {
      const res = await request(params);

      const data = {
        ...res.data,
        pageNum: res.data.currPage,
        list: res.data.content,
        total: res.data.totalElements ?? res.data.totalNumber
      };
      delete data.content;
      delete data.totalNumber;
      delete data.totalElements;

      return { ...res, data };
    } catch (error) {
      console.error("Error fetching table data:", error);
      throw error;
    }
  };

  return { fetchData };
}
