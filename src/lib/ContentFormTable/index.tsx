import React, { useCallback, useEffect, forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import type { QueryListItem } from '../ContentFormHeader';
import ContentFormHead from '../ContentFormHeader';
import { Card, Table, Pagination } from 'antd';
import useReducer from '@/utils/useReducer';
import './index.less';

type TableColumnsType = QueryListItem & {
  visibleInTable?: boolean;
  initialValue?: any;
};
interface ContentFormPageProps {
  // 查询表单要展示的列数
  cols?: number;
  // 是否再页面初始化时就请求数据接口
  immediate?: boolean;
  // 表格左上角展示的标题
  tableTitle?: React.ReactNode;
  // 是否展开所有查询的表单，默认 true
  defaultExpand?: boolean;
  // 表格右上角展示自定义内容
  extra?: React.ReactNode;
  // 表单查询按钮内容自定义
  submitButtonText?: string;
  // 是否显示表单重置按钮
  showResetButton?: boolean;
  // 是否显示导出表格按钮
  showExportButton?: boolean;
  // 插入到查询表单的自定义内容
  extraNodesInsertHeader?: React.ReactNode;
  // 数据导出功能
  exportTableList?: (query: any) => Promise<any>;
  // 在正式请求表格数据之前，会触发 beforeQueryAction 行为，返回 false 将中断请求。此行为中可以对表单进行校验
  beforeQueryAction?: (query: any) => boolean;
  // 请求页面数据的
  queryTableList: (query: any) => Promise<any>;
  // requestDataSource: (query: any) => Promise<any>;
  customResponse?: (data: any) => { tableList: any[]; total: number };
  // 同 Table 组件的 scroll
  tableScroll?: any;
  // 同 Table 组件的 rowKey
  rowKey: string | ((record: any) => string);
  // 同 Table 组件的 columns
  columns: TableColumnsType[];
  // 同 Table 组件的 bordered
  bordered?: boolean;
  // 同 Table 组件的 rowSelection
  rowSelection?: any;
  // 同 Pagination 组件的 size
  paginationSize?: 'default' | 'small';
  tableSize?: 'small' | 'middle' | 'large';
  // 同 Pagination 组件的 showTotal
  showTotal?: (total: number, range: number[]) => string;
  // 同 Pagination 组件的 onChange 事件
  onPaginationChange?: (pageNum: number, pageSize: number) => void;
}

type OrderListItem = {
  field: string;
  order: string;
};

type OrderList = OrderListItem[];

type SearchCondition = {
  orderList?: OrderList;
  [propName: string]: any;
};

function ContentFormPage(props: ContentFormPageProps, ref: any) {
  const [state, setState] = useReducer(initialState);
  const { total, pageNum, loading, pageSize, tableList } = state;

  const {
    cols,
    extra,
    rowKey,
    columns,
    bordered,
    tableSize,
    tableTitle,
    tableScroll,
    rowSelection,
    paginationSize,
    queryTableList,
    exportTableList,
    showResetButton,
    immediate = true,
    submitButtonText,
    showExportButton,
    beforeQueryAction,
    onPaginationChange,
    defaultExpand = true,
    extraNodesInsertHeader,
    showTotal = defaultShowTotal,
    customResponse = handleResponse,
  } = props;

  const contentHeaderRef = useRef<any>();

  const searchContentRef = useRef<SearchCondition>({});

  // immediate 表示是否在页面初始化的时候请求后台接口。默认 true
  const immediateRef = useRef(immediate);

  // 表单查询条件（初始化的值）。Form 表单不会更新初始化值，所以我们使用 ref。
  const initialSearchCondition = useRef<any>(null);

  // Table 组件使用的 columns
  const tableColumns = useMemo(() => {
    return columns.filter((column) => column.visibleInTable !== false);
  }, [columns]);

  // 条件查询使用的 columns
  const queryList = useMemo(() => {
    return columns.filter((column) => column.component || column.formType);
  }, [columns]);

  // 在此处对查询搜索的内容进行初始化，注意这个方法应该只执行一次。
  if (initialSearchCondition.current === null) {
    const initialValues = {} as any;
    for (let i = 0; i < queryList.length; i++) {
      const { dataIndex, name = dataIndex!, initialValue } = queryList[i];
      if (initialValue) initialValues[name] = initialValue;
    }

    initialSearchCondition.current = initialValues;
    searchContentRef.current = formatFormModel(queryList, initialValues);
  }

  // 请求数据
  const sendRequestTableList = useCallback(async (query: any) => {
    // 如果 action 返回 false， 则行为终止，否则将返回的内容作为 request body。
    const action = beforeQueryAction?.(query) ?? query;

    if (action === false) return;

    setState({ loading: true });
    try {
      const response = await queryTableList(action);
      setState({ ...customResponse(response) });
    } finally {
      setState({ loading: false });
    }
  }, []);

  // 对组件外部暴露可调用的 API
  useImperativeHandle(
    ref,
    () => ({
      // 强制更新页面数据
      forceUpdate(opts?: any, callback?: Function) {
        const query = { pageSize, pageNum, ...searchContentRef.current, ...opts };
        sendRequestTableList(query).finally(() => callback?.());
      },
      getQueryData: () => contentHeaderRef.current.getCurrentFormData(),
      form: contentHeaderRef.current.form,
    }),
    [pageSize, pageNum],
  );

  // 页面初始化。
  // 之后，每当 deps 变化都会触发 sendRequestTableList() 重新请求数据
  useEffect(() => {
    // immediateRef 表示再页面初始化时是否请求数
    if (immediateRef.current === false) {
      immediateRef.current = true;
      return;
    }

    sendRequestTableList({ pageSize, pageNum, ...searchContentRef.current });
  }, []);

  useEffect(() => {
    onPaginationChange?.(pageNum, pageSize);
  }, [pageSize, pageNum]);

  const onPageNumChange = useCallback((pageNum: number, pageSize: number) => {
    setState({ pageSize, pageNum });
    sendRequestTableList({ pageSize, pageNum, ...searchContentRef.current });
  }, []);

  // 点击查询按钮
  const handleSubmit = useCallback(
    async (values: any) => {
      setState({ pageNum: 1 });
      searchContentRef.current = values;
      return sendRequestTableList({ pageSize, pageNum: 1, ...values });
    },
    [pageSize],
  );

  // 点击重置按钮
  const handleReset = useCallback(
    (values: any) => {
      setState({ pageNum: 1 });
      searchContentRef.current = values;
      return sendRequestTableList({ pageSize, pageNum: 1, ...values });
    },
    [pageSize],
  );

  // 导出数据
  const handleExport = useCallback(
    async (query: any) => {
      // 如果 action 返回 false， 则行为终止，否则将返回的内容作为 request body。
      const action = beforeQueryAction?.(query) ?? query;
      if (action === false) return;

      await exportTableList!({ pageNum, pageSize, ...action });
    },
    [exportTableList, pageNum, pageSize],
  );

  // 当 columns 中的某一项设置了 sorter 时，可以设置【倒叙/正序】 查询。
  const handleTableChange = useCallback(
    (...args: any[]) => {
      const [, , sorter] = args;
      const orderList: OrderList = [];
      // sorter 可能是对象，也可能是数组。分开处理
      if (sorter instanceof Array) {
        for (let i = 0; i < sorter.length; i++) {
          const { field, order } = sorter[i];
          // 如果 order 字段不存在则说明没有排序
          // 正序-ascend、倒叙-descend，
          if (order) orderList.push({ field, order });
        }
      } else {
        const { field, order } = sorter;
        // 如果 order 字段不存在则说明没有排序
        // 正序-ascend、倒叙-descend，
        if (order) orderList.push({ field, order });
      }
      const newSearchCondition: SearchCondition = { ...searchContentRef.current, order: orderList };
      if (orderList.length <= 0) delete newSearchCondition.order;

      searchContentRef.current = newSearchCondition;
      return sendRequestTableList({ pageSize, pageNum, ...newSearchCondition });
    },
    [pageSize, pageNum],
  );

  return (
    <div className="qm-content-form-page">
      {queryList?.length > 0 && (
        <ContentFormHead
          cols={cols}
          queryList={queryList}
          onReset={handleReset}
          ref={contentHeaderRef}
          onSubmit={handleSubmit}
          onExport={handleExport}
          defaultExpand={defaultExpand}
          showResetButton={showResetButton}
          submitButtonText={submitButtonText}
          showExportButton={showExportButton}
          extraNodes={extraNodesInsertHeader}
          initialValues={initialSearchCondition.current}
        />
      )}
      <Card styles={{ body: { padding: '0 24px' } }} style={{ marginTop: 24 }} bordered={false}>
        <div className="qm-content-form-page-table-head">
          <div className="qm-content-form-page-table-head-title">{tableTitle || '查询表格'}</div>
          {extra ? <div>{extra}</div> : null}
        </div>

        <Table
          rowKey={rowKey}
          size={tableSize}
          loading={loading}
          pagination={false}
          bordered={bordered}
          scroll={tableScroll}
          dataSource={tableList}
          columns={tableColumns}
          rowSelection={rowSelection}
          onChange={handleTableChange}
        />

        {total > 0 ? (
          <Pagination
            total={total}
            showSizeChanger
            current={pageNum}
            pageSize={pageSize}
            size={paginationSize}
            showTotal={showTotal}
            onChange={onPageNumChange}
            className="qm-content-form-page-pagination"
          />
        ) : (
          <div style={{ width: 0, height: 24 }} />
        )}
      </Card>
    </div>
  );
}

export default forwardRef(ContentFormPage);

function initialState() {
  return {
    total: 0,
    pageNum: 1,
    tableList: [],
    pageSize: 10,
    loading: false,
    searchContent: {} as SearchCondition,
  };
}

function defaultShowTotal(total: number) {
  return `共 ${total} 条数据`;
}

function handleResponse({ data }: any) {
  const { list: tableList, total } = data;
  return { tableList, total };
}

function formatFormModel(columns: TableColumnsType[], values: any): SearchCondition {
  const query = {} as { [propName: string]: any };

  for (let i = 0; i < columns.length; i++) {
    const { dataIndex, name = dataIndex!, dataFormat } = columns[i];
    const value = values[name];
    // eslint-disable-next-line
    if (value == null) continue;

    if (typeof dataFormat === 'function') {
      Object.assign(query, dataFormat(value));
    } else {
      query[name] = value;
    }
  }
  return query;
}
