import React from 'react';
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
    watch?: (...args: any[]) => void;
};
interface ContentFormPageProps {
    tableTitle?: string;
    extra?: React.ReactNode;
    dataExport?: Function;
    exportFileName?: string;
    searchButtonText?: string;
    showResetButton?: boolean;
    showExportButton?: boolean;
    extraNodesInsertHeader?: React.ReactNode;
    requestDataSource: (query: any) => Promise<any>;
    hasSearchFunction?: boolean;
    customResponse?: (data: any) => {
        pageList: any[];
        total: number;
        pageNum: number;
        pageSize: number;
    };
    tableScroll?: any;
    rowKey: string | ((record: any) => string);
    columns: TableColumnsType[];
    bordered?: boolean;
    rowSelection?: any;
    paginationSize?: 'default' | 'small';
    paginationShowTotal?: (total: number, range: number[]) => string;
    onPaginationChange?: (pageNum: number, pageSize: number) => void;
}
declare const _default: React.ForwardRefExoticComponent<ContentFormPageProps & React.RefAttributes<unknown>>;
export default _default;
