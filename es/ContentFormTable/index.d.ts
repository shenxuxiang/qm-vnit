import React from 'react';
import type { QueryListItem } from '../ContentFormHeader';
import './index.less';
type TableColumnsType = QueryListItem & {
    visibleInTable?: boolean;
    initialValue?: any;
};
interface ContentFormPageProps {
    cols?: number;
    immediate?: boolean;
    tableTitle?: string;
    defaultExpand?: boolean;
    extra?: React.ReactNode;
    exportFileName?: string;
    exportTableList?: Function;
    submitButtonText?: string;
    showResetButton?: boolean;
    showExportButton?: boolean;
    extraNodesInsertHeader?: React.ReactNode;
    beforeQueryAction?: (query: any) => boolean;
    requestDataSource: (query: any) => Promise<any>;
    customResponse?: (data: any) => {
        tableList: any[];
        total: number;
    };
    tableScroll?: any;
    rowKey: string | ((record: any) => string);
    columns: TableColumnsType[];
    bordered?: boolean;
    rowSelection?: any;
    paginationSize?: 'default' | 'small';
    tableSize?: 'small' | 'middle' | 'large';
    showTotal?: (total: number, range: number[]) => string;
    onPaginationChange?: (pageNum: number, pageSize: number) => void;
}
declare const _default: React.ForwardRefExoticComponent<ContentFormPageProps & React.RefAttributes<unknown>>;
export default _default;
