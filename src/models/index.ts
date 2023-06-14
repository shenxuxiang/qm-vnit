import request from '@/utils/axios';

export const getTableList = (query: any) => request.post('/v1.0/page/table-list', query);
