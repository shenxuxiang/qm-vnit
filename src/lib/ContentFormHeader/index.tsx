import React, { memo, useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Button, Col, Row, Form, Input, Select, DatePicker, Cascader } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { throttle } from '@/utils';
import './index.less';

const { useForm, Item: FormItem } = Form;
const SelectOption = Select.Option;
const colSpanConfig = {
  xxl: 6,
  xl: 8,
  lg: 8,
  md: 12,
  sm: 12,
  xs: 12,
};

export type QueryListItem = {
  name?: string;
  label?: string;
  title?: string;
  options?: any[];
  formType?: string;
  dataIndex?: string;
  properties?: object;
  keyNameForKey?: string;
  keyNameForValue?: string;
  component?: React.ReactElement;
  // 每当表单项值改变时触发的监听事件
  watch?: (...args: any[]) => void;
  placeholder?: string | string[];
  // 数据格式化函数
  dataFormat?: (value: any) => { [propName: string]: any };
};

type ContentFormHeaderProps = {
  // 指定一行放置几列（指定后，布局列数不在随屏幕宽度的大小而变化）
  cols?: number;
  // 提交查询表单按钮的文字
  submitButtonText?: string;
  // 表单查询的初始值
  initialValues?: object;
  // 是否展开所有查询的表单，默认 true
  defaultExpand?: boolean;
  // 是否展示重置按钮，默认 true
  showResetButton?: boolean;
  // 是否展示导出功能按钮
  showExportButton?: boolean;
  // 查询表单项
  queryList: QueryListItem[];
  // 需要展示的额外内容
  extraNodes?: React.ReactNode;
  // 表单重置
  onReset?: (values: any) => void;
  // 表单提交回调函数
  onSubmit: (values: any) => void;
  // 导出功能回调函数
  onExport?: (values: any) => void;
};

function ContentFormHeader(props: ContentFormHeaderProps) {
  const {
    onReset,
    onSubmit,
    onExport,
    queryList,
    extraNodes,
    initialValues,
    cols: propCols,
    showExportButton,
    defaultExpand = true,
    showResetButton = true,
    submitButtonText = '查询',
  } = props;
  const [form] = useForm();
  const [colSpan, setColSpan] = useState(6);
  const [expand, setExpand] = useState(defaultExpand);
  const [formName] = useState(() => 'qm-vnit-form-' + Math.random().toString(32).slice(2));

  const xRef = useRef<any>();
  const containerRef = useRef<any>();

  useEffect(() => {
    function resize() {
      const colSpan = propCols ? 24 / propCols : computeColSpan(xRef.current);
      setColSpan(() => colSpan);

      if (expand) {
        const cols = 24 / colSpan;
        // 计算表单查询项一共是多少列。
        const length = queryList.filter((item) => item.component || item.formType).length;
        //  length + 1 是因为 【查询、重置、导出】这些功能按钮需要占一列。
        const rows = Math.ceil((length + 1) / cols);
        containerRef.current.style.height = expand ? `${rows * 64}px` : '64px';
      } else {
        containerRef.current.style.height = '64px';
      }
    }

    resize();

    if (propCols) return;

    // 如果没有设置 props.cols，则组件会根据 pagesize 事件自动计算
    const hanleResize = throttle(resize, 200);
    window.addEventListener('resize', hanleResize, false);
    return () => {
      window.removeEventListener('resize', hanleResize, false);
    };
  }, [queryList, expand, propCols]);

  // 计算【展开项】所在的 Col 组件的 offsetSpan 数
  const offsetSpan = useMemo(() => {
    // 一行可以盛放几个 Col 组件
    const cols = 24 / colSpan;
    const { length } = queryList;
    if (length < cols) return (cols - length - 1) * colSpan;

    // 取模，表示最后一行会有几个 Col 组件
    const reset = length % cols;
    // 注意 cols - 1 是因为 【展开项】自身要占一列
    const offset = (cols - 1 - reset) * colSpan;
    return expand ? offset : 0;
  }, [queryList, colSpan, expand]);

  const renderFormContent = useMemo(() => {
    const cols = 24 / colSpan;
    const context = [];

    for (let i = 0; i < queryList.length; i++) {
      const {
        watch,
        title,
        options,
        formType,
        dataIndex,
        component,
        properties,
        placeholder,
        name = dataIndex,
        keyNameForKey = 'label',
        keyNameForValue = 'value',
      } = queryList[i];

      let contextItem = null;

      // 表单项事件
      const handleWatch = typeof watch === 'function' ? (...args: any[]) => watch(...args, form) : undefined;

      // 如果条件满足，则不渲染该项
      if (!component && !formType) continue;
      if (component) {
        contextItem = React.cloneElement(component, { onChange: handleWatch, ...properties });
      } else {
        switch (formType) {
          case 'input':
            contextItem = (
              <Input
                allowClear
                {...properties}
                autoComplete="off"
                onChange={handleWatch}
                placeholder={(placeholder as string) || `请输入要查询的${title}`}
              />
            );
            break;

          case 'select':
            contextItem = (
              <Select
                allowClear
                {...properties}
                onChange={handleWatch}
                placeholder={placeholder || `请选择您要查询的${title}`}
              >
                {options?.map((item: any) => (
                  <SelectOption key={item[keyNameForKey]} value={item[keyNameForValue]}>
                    {item[keyNameForKey]}
                  </SelectOption>
                ))}
              </Select>
            );
            break;

          case 'rangePicker':
            contextItem = (
              <DatePicker.RangePicker
                {...properties}
                onChange={handleWatch}
                placeholder={placeholder as [string, string]}
              />
            );
            break;

          case 'datePicker':
            contextItem = <DatePicker {...properties} onChange={handleWatch} placeholder={placeholder as string} />;
            break;

          case 'cascader':
            contextItem = (
              <Cascader
                changeOnSelect
                {...properties}
                options={options}
                onChange={handleWatch}
                placeholder={placeholder || `请选择您要查询的${title}`}
              />
            );
            break;

          default:
            break;
        }
      }

      context.push(
        <Col key={name} span={colSpan} style={{ display: i > cols - 2 && !expand ? 'none' : '' }}>
          <FormItem label={title} name={name}>
            {contextItem}
          </FormItem>
        </Col>,
      );
    }
    return context;
  }, [queryList, colSpan, expand, propCols]);

  const handleFinish = useCallback(
    (values: any) => {
      const query = formatFormModel(queryList, values);
      onSubmit?.(query);
    },
    [onSubmit, queryList],
  );

  const handleReset = useCallback(() => {
    const query = formatFormModel(queryList, initialValues as any);
    onReset?.(query);
  }, [queryList]);

  const handleExport = useCallback(() => {
    const query = formatFormModel(queryList, form.getFieldsValue());
    onExport?.(query);
  }, [onExport, queryList]);

  // 展开/收起
  const handleChangeExpand = useCallback(() => {
    const newNewExpand = !expand;
    setExpand(newNewExpand);
    if (newNewExpand) {
      const cols = 24 / colSpan;

      const rows = Math.ceil((renderFormContent.length + 1) / cols);
      containerRef.current.style.height = newNewExpand ? `${rows * 64}px` : '64px';
    } else {
      containerRef.current.style.height = '64px';
    }
  }, [expand, colSpan, renderFormContent.length]);

  return (
    <section className="qm-content-form-head" ref={xRef}>
      <Form form={form} name={formName} onReset={handleReset} onFinish={handleFinish} initialValues={initialValues}>
        <Row className="qm-content-form-head-row" ref={containerRef}>
          {renderFormContent}
          <Col span={colSpan} offset={offsetSpan} className="qm-content-form-head-button-group">
            <Button type="primary" htmlType="submit">
              {submitButtonText}
            </Button>
            {showResetButton && (
              <Button htmlType="reset" style={{ marginLeft: '8px' }}>
                重置
              </Button>
            )}
            {showExportButton && (
              <Button style={{ marginLeft: '8px' }} onClick={handleExport}>
                导出
              </Button>
            )}
            {/* 附加的自定义节点 */}
            {extraNodes ? extraNodes : null}
            {queryList.length >= 24 / colSpan && (
              <Button type="link" onClick={handleChangeExpand}>
                {expand ? '收起' : '展开'}
                <DownOutlined className={`icon${expand ? ' expand' : ''}`} />
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </section>
  );
}

export default memo(ContentFormHeader);

// 格式化表单数据
function formatFormModel(queryList: QueryListItem[], data: { [propName: string]: any } = {}) {
  const query: any = {};
  queryList.forEach((item) => {
    const { dataIndex, name = dataIndex!, dataFormat } = item;
    const value = data[name];

    // eslint-disable-next-line
    if (value == null) return;

    if (typeof dataFormat === 'function') {
      Object.assign(query, dataFormat(value));
    } else {
      query[name] = value;
    }
  });
  return query;
}

// 计算 <Row /> 容器下面一个 <Col/> 组件将设置多少 span
function computeColSpan(element: HTMLElement): number {
  const width: number = element.offsetWidth;

  if (width >= 1600) return colSpanConfig.xxl;
  if (width >= 1200) return colSpanConfig.xl;
  if (width >= 992) return colSpanConfig.lg;
  if (width >= 768) return colSpanConfig.md;
  return colSpanConfig.sm;
}
