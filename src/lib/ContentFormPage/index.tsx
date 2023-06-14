import React, { useCallback, useEffect, forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { Card, Table, Pagination, message } from 'antd';
import ContentFormHead from '../ContentFormHead';
import useReducer from '@/utils/useReducer';
import { downloadFile } from '@/utils';
import './index.less';

type TableColumnsType = {
  name: string;
  title: string;
  label?: string;
  options?: any[];
  formType?: string;
  dataIndex: string;
  initialValue?: any;
  properties?: object;
  placeholder?: string;
  keyNameForKey?: string;
  keyNameForValue?: string;
  visibleInTable?: boolean;
  component?: React.ReactElement;
  formatData?: (value: any) => any;
};

interface ContentFormPageProps {
  // 表格左上角展示的标题
  tableTitle?: string;
  // 表格右上角展示自定义内容
  extra?: React.ReactNode;
  // 数据导出功能
  dataExport?: Function;
  // 导出的文件名
  exportFileName?: string;
  // 表单查询按钮内容自定义
  searchButtonText?: string;
  // 是否显示表单重置按钮
  showResetButton?: boolean;
  // 请求页面数据的
  requestDataSource: (query: any) => Promise<any>;
  // 是否具有搜索表单功能
  hasSearchFunction?: boolean;
  customResponse?: (data: any) => { pageList: any[]; total: number; pageNum: number; pageSize: number };

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
  // 同 Pagination 组件的 paginationShowTotal
  paginationShowTotal?: (total: number, range: number[]) => string;
  // 同 Pagination 组件的 onChange 事件
  onPaginationChange?: (pageNum: number, pageSize: number) => void;
}

type OrderListItem = {
  field: string;
  direction: boolean;
};

type OrderList = OrderListItem[];

type SearchCondition = {
  orderList?: OrderList;
  [propName: string]: any;
};

function initialState() {
  return {
    total: 0,
    pageNum: 1,
    pageList: [],
    pageSize: 10,
    loading: false,
    searchContent: {} as SearchCondition,
  };
}

function ContentFormPage(props: ContentFormPageProps, ref: any) {
  const [state, setState] = useReducer(initialState);
  const { total, pageNum, loading, pageSize, pageList, searchContent } = state;

  const {
    extra,
    rowKey,
    columns,
    bordered,
    tableTitle,
    dataExport,
    tableScroll,
    rowSelection,
    exportFileName,
    paginationSize,
    showResetButton,
    searchButtonText,
    requestDataSource,
    hasSearchFunction,
    onPaginationChange,
    paginationShowTotal = showTotal,
    customResponse = handleResponse,
  } = props;

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
      const { dataIndex, name, initialValue } = queryList[i];
      if (initialValue) initialValues[name || dataIndex] = initialValue;
    }

    initialSearchCondition.current = initialValues;
    setState({ searchContent: formatFormData(initialValues, queryList) });
  }

  // 请求数据
  const sendRequestPageList = useCallback(async (query: any) => {
    setState({ loading: true });
    try {
      const response = await requestDataSource(query);
      const { data, code } = response;
      if (code === 0) {
        setState({ ...customResponse(data) });
      }
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
        const query = { pageSize, pageNum, ...searchContent, ...opts };
        sendRequestPageList(query).finally(() => callback?.());
      },
    }),
    [pageSize, pageNum, searchContent],
  );

  // 页面初始化。
  // 之后，每当 deps 变化都会触发 sendRequestPageList() 重新请求数据
  useEffect(() => {
    sendRequestPageList({ pageSize, pageNum, ...searchContent });
  }, [pageSize, pageNum, searchContent]);

  useEffect(() => {
    onPaginationChange?.(pageNum, pageSize);
  }, [pageSize, pageNum]);

  const onPageSizeChange = useCallback((_: any, pageSize: number) => {
    setState({ pageSize, pageNum: 1 });
  }, []);

  const onPageNumChange = useCallback((pageNum: number) => {
    setState({ pageNum });
  }, []);

  // 点击查询按钮
  const handleSubmit = useCallback(
    (values: any) => {
      const formData = formatFormData(values, queryList);
      setState({ searchContent: formData, pageNum: 1 });
    },
    [queryList],
  );

  // 导出数据
  const handleExport = useCallback(
    async (values: any) => {
      const formData = formatFormData(values, queryList);
      try {
        const file = await dataExport!({ pageNum, pageSize, ...formData });
        if (file.data.type === 'application/json') {
          throw new Error('文件下载失败');
        } else {
          downloadFile(exportFileName || file.fileName, file.data);
        }
      } catch (error) {
        message.warning('文件下载失败');
      }
    },
    [dataExport, exportFileName, queryList, pageNum, pageSize],
  );

  // 当 columns 中的某一项设置了 sorter 时，可以设置【倒叙/正序】 查询。
  const handleTableChange = useCallback(
    (_: any, __: any, sorter: any) => {
      const orderList: OrderList = [];
      // sorter 可能是对象，也可能是数组。分开处理
      if (sorter instanceof Array) {
        for (let i = 0; i < sorter.length; i++) {
          const { field, order } = sorter[i];
          // 如果 order 字段不存在则说明没有排序
          // 正序-true、倒叙-false，
          if (order) orderList.push({ field, direction: order.includes('asc') });
        }
      } else {
        const { field, order } = sorter;
        // 如果 order 字段不存在则说明没有排序
        // 正序-true、倒叙-false，
        if (order) orderList.push({ field, direction: order.includes('asc') });
      }
      const newSearchCondition: SearchCondition = {
        ...searchContent,
        order: orderList,
      };
      if (orderList.length <= 0) delete newSearchCondition.order;

      setState({ searchContent: newSearchCondition });
    },
    [searchContent],
  );

  return (
    <div className="qm-content-form-page">
      {hasSearchFunction && (
        <ContentFormHead
          queryList={queryList}
          onSubmit={handleSubmit}
          onExport={handleExport}
          okButtonText={searchButtonText}
          showResetButton={showResetButton}
          initialValues={initialSearchCondition.current}
        />
      )}
      <Card bodyStyle={{ padding: '0 24px' }}>
        <div className="qm-content-form-page-table-head ">
          <div className="qm-content-form-page-table-head-title">{tableTitle || '查询表格'}</div>
          {extra ? <div>{extra}</div> : null}
        </div>

        <Table
          rowKey={rowKey}
          loading={loading}
          pagination={false}
          bordered={bordered}
          scroll={tableScroll}
          dataSource={pageList}
          columns={tableColumns}
          rowSelection={rowSelection}
          onChange={handleTableChange}
        />

        {total > 0 ? (
          <Pagination
            total={total}
            current={pageNum}
            pageSize={pageSize}
            size={paginationSize}
            showSizeChanger={true}
            onChange={onPageNumChange}
            showTotal={paginationShowTotal}
            onShowSizeChange={onPageSizeChange}
            className="qm-content-form-page-pagination"
          />
        ) : null}
      </Card>
    </div>
  );
}

export default forwardRef(ContentFormPage);

function showTotal(total: number) {
  return `共 ${total} 条数据`;
}

function handleResponse(data: any) {
  const { list: pageList, total, pageSize, pageNum } = data;
  return { pageList, total, pageSize, pageNum };
}

function formatFormData(values: any, columns: TableColumnsType[]): SearchCondition {
  const formData = {} as { [propName: string]: any };

  for (let i = 0; i < columns.length; i++) {
    const { dataIndex, name = dataIndex, formatData } = columns[i];
    const value = values[name];
    // eslint-disable-next-line
    if (value == null) continue;

    // 通过 formatData() 将数据格式化，并做为最总发送给后端的查询内容
    if (typeof formatData === 'function') {
      const fieldValue = formatData(value);
      Object.assign(formData, fieldValue);
    } else {
      formData[name] = value;
    }
  }
  return formData;
}
