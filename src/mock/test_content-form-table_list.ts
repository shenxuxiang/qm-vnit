import { HttpResponse, delay } from 'msw';
import { mockHttp } from './utils';

const tableList = [
  {
    id: '1',
    name: 'shenxuxiang',
    nation: 'china',
    status: '1',
    birthTime: '2022',
  },
  {
    id: '2',
    name: 'xiaoming',
    nation: 'franch',
    status: '0',
    birthTime: '1991',
  },
  {
    id: '3',
    name: 'zhaoming',
    nation: 'american',
    status: '1',
    birthTime: '2021',
  },
  {
    id: '4',
    name: 'zhangwuji',
    nation: 'english',
    status: '0',
    birthTime: '2020',
  },
  {
    id: '5',
    name: 'wuqiang',
    nation: 'china',
    status: '1',
    birthTime: '1992',
  },
  {
    id: '6',
    name: 'wangguoqing',
    nation: 'franch',
    status: '0',
    birthTime: '1991',
  },
  {
    id: '7',
    name: 'dingliubing',
    nation: 'american',
    status: '1',
    birthTime: '1992',
  },
  {
    id: '8',
    name: 'raoming',
    nation: 'english',
    status: '1',
    birthTime: '1993',
  },
  {
    id: '9',
    name: 'zhangwuji_1',
    nation: 'english',
    status: '1',
    birthTime: '1998',
  },
  {
    id: '10',
    name: 'shenxx',
    nation: 'american',
    status: '0',
    birthTime: '1994',
  },
  {
    id: '11',
    name: 'liangxiaosong',
    nation: 'english',
    status: '1',
    birthTime: '1990',
  },
  {
    id: '12',
    name: 'zhangwei',
    nation: 'china',
    status: '0',
    birthTime: '1993',
  },
];

export default mockHttp.post('/test/content-form-table/list', async (query: any) => {
  const { pageSize, pageNum, birthTime } = await query.request.json();

  const end = pageSize * pageNum;
  const start = pageSize * (pageNum - 1);
  const list = birthTime
    ? tableList.filter((item) => item.birthTime === birthTime).slice(start, end)
    : tableList.slice(start, end);

  await delay(1000);
  return HttpResponse.json({
    code: 0,
    message: 'ok',
    data: { list, pageNum, pageSize, total: tableList.length },
  });
});
