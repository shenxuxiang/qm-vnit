import React, { memo, useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Button, Col, Row, Form, Input, Select, DatePicker, Cascader } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { throttle } from '@/utils';
import './index.less';

// 计算 <Row /> 容器下面一个 <Col/> 组件将设置多少 span
function computeColSpan(): number {
  const width: number = window.innerWidth || document.documentElement.clientWidth;

  if (width >= 1600) return colSpanConfig.xxl;
  if (width >= 1200) return colSpanConfig.xl;
  if (width >= 992) return colSpanConfig.lg;
  if (width >= 768) return colSpanConfig.md;
  return colSpanConfig.sm;
}

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

type QueryListItem = {
  name?: string;
  label?: string;
  title?: string;
  options?: any[];
  formType?: string;
  dataIndex?: string;
  properties?: object;
  placeholder?: string;
  keyNameForKey?: string;
  keyNameForValue?: string;
  component?: React.ReactElement;
};

type ContentFormHeadProps = {
  // 指定一行放置几列（指定后，布局列数不在随屏幕宽度的大小而变化）
  cols?: number;
  // 提交查询表单按钮的文字
  okButtonText?: string;
  // 表单查询的初始值
  initialValues?: object;
  // 是否展开所有查询的表单，默认 true
  defaultExpand?: boolean;
  // 是否展示重置按钮，默认 true
  showResetButton?: boolean;
  // 查询表单项
  queryList: QueryListItem[];
  // 是否展示导出功能按钮
  showExportButton?: boolean;
  // 表单提交回调函数
  onSubmit: (values: any) => void;
  // 导出功能回调函数
  onExport?: (values: any) => void;
};

function ContentFormHead(props: ContentFormHeadProps) {
  const {
    onSubmit,
    onExport,
    queryList,
    initialValues,
    cols: propCols,
    showExportButton,
    defaultExpand = true,
    okButtonText = '查询',
    showResetButton = true,
  } = props;
  const [colSpan, setColSpan] = useState(propCols ? 24 / propCols : computeColSpan);
  const [expand, setExpand] = useState(defaultExpand);
  const [form] = useForm();
  const containerRef = useRef<any>();

  useEffect(() => {
    function resize() {
      const colSpan = propCols ? 24 / propCols : computeColSpan();
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
        title,
        options,
        formType,
        dataIndex,
        component,
        properties,
        placeholder,
        label = title,
        name = dataIndex,
        keyNameForKey = 'label',
        keyNameForValue = 'value',
      } = queryList[i];

      let contextItem = null;

      // 如果条件满足，则不渲染该项
      if (!component && !formType) continue;
      if (component) {
        contextItem = React.cloneElement(component, { ...properties });
      } else {
        switch (formType) {
          case 'input':
            contextItem = (
              <Input
                allowClear
                {...properties}
                autoComplete="off"
                placeholder={placeholder || `请输入要查询的${label}`}
              />
            );
            break;

          case 'select':
            contextItem = (
              <Select allowClear placeholder={placeholder || `请选择您要查询的${label}`} {...properties}>
                {options?.map((item: any) => (
                  <SelectOption key={item[keyNameForKey]} value={item[keyNameForValue]}>
                    {item[keyNameForKey]}
                  </SelectOption>
                ))}
              </Select>
            );
            break;

          case 'rangePicker':
            contextItem = <DatePicker.RangePicker format="YYYY-MM-DD" {...properties} />;
            break;

          case 'datePicker':
            contextItem = <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} {...properties} />;
            break;

          case 'cascader':
            contextItem = (
              <Cascader
                changeOnSelect
                {...properties}
                options={options}
                placeholder={placeholder || `请选择您要查询的${label}`}
              />
            );
            break;

          default:
            break;
        }
      }

      const spanProps = propCols ? { span: 24 / propCols } : colSpanConfig;

      context.push(
        <Col key={name} {...spanProps} style={{ display: i > cols - 2 && !expand ? 'none' : '' }}>
          <FormItem label={label} name={name}>
            {contextItem}
          </FormItem>
        </Col>,
      );
    }
    return context;
  }, [queryList, colSpan, expand, propCols]);

  const handleFinish = useCallback(
    (values: {}) => {
      onSubmit?.(values);
    },
    [onSubmit],
  );

  const handleReset = useCallback(() => {
    onSubmit?.({});
  }, []);

  const handleExport = useCallback(() => {
    onExport?.(form.getFieldsValue());
  }, [onExport]);

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

  const spanProps = useMemo(() => (propCols ? { span: 24 / propCols } : colSpanConfig), [propCols]);

  return (
    <section className="qm-content-form-head">
      <Form
        form={form}
        onReset={handleReset}
        onFinish={handleFinish}
        name="content-form-head"
        initialValues={initialValues}
      >
        <Row className="qm-content-form-head-row" ref={containerRef}>
          {renderFormContent}
          <Col {...spanProps} offset={offsetSpan} className="qm-content-form-head-button-group">
            <Button type="primary" htmlType="submit">
              {okButtonText}
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

export default memo(ContentFormHead);
