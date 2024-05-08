import type { TweenAttrNames } from './tween';
import type { CSSProperties } from 'react';
export declare function getType(data: any): string;
export declare function isArray<T>(data: any): data is T[];
export declare function isObject(data: any): data is {
    [propName: string]: any;
};
export declare function isMap<K, V>(data: any): data is Map<K, V>;
export declare function isSet<T>(data: any): data is Set<T>;
/**
 * 判断数据是不是为空，null、undefined、false、0、' 等所有假值都将返回 true。空对象、空数组也返回 true。
 * @param data
 * @returns
 */
export declare function isEmpty(data: null | undefined | object | Array<any> | Map<any, any> | Set<any>): data is undefined;
/**
 * 获取文件后缀名
 * @param filename 完整的文件名
 * @returns
 */
export declare function extName(filename: string): string;
/**
 * 下载文件
 * @param fileName 指定文件下载后的文件名
 * @param data     文件资源（blob）
 * @param extName  文件后缀
 * @returns
 */
export declare function downloadFile(fileName: string, data: Blob | ArrayBuffer | DataView, extName?: string): void;
/**
 * 判断两个值是否完全相等，可以比较 +0 !== -0，NaN === NaN
 * @param v1
 * @param v2
 * @returns
 */
export declare function objectIs(v1: any, v2: any): boolean;
/**
 * 浅比较
 * @param obj1
 * @param obj2
 * @returns
 */
export declare function shallowEqual(obj1: any, obj2: any): boolean;
/**
 * 防抖
 * @param func        防抖的方法
 * @param delay       防抖的时间间隔
 * @param immediately 是否立即执行 func
 * @returns
 */
export declare function debounce(func: Function, delay: number, immediately?: boolean): (...args: any[]) => void;
/**
 * 节流
 * @param func        节流的方法
 * @param delay       节流的时间间隔
 * @param immediately 是否立即执行 func
 * @returns
 */
export declare function throttle(func: Function, delay: number, immediately?: boolean): (...args: any[]) => void;
type ScrollToPositionOptions = {
    times?: number;
    position: number;
    container?: HTMLElement;
    timingFunction?: TweenAttrNames;
};
/**
 * 在容器内从当前位置滚动到指定位置（JS动效）
 * @param options
 */
export declare function scrollToPosition(options: ScrollToPositionOptions): void;
/**
 * 延迟执行函数
 * @param time  延迟执行的的时间
 * @param value 期望得到的值。如果 value 是一个 Error 实例则返回 rejected promise，否则返回 fulfuilled promise
 * @returns
 */
export declare function delay<T>(time: number, value: T): Promise<T>;
/**
 * 数据存储
 * @param key
 * @param value
 */
export declare function setLocalStorage(key: string, value: any): void;
/**
 * 获取存储数据
 * @param key
 * @returns
 */
export declare function getLocalStorage(key: string): any;
/**
 * 数字格式化，toFixed(1234567, 2, 10000) => 123.46
 * @param value   需要计算的数值
 * @param float   保留的小数
 * @param divisor 格式化的单位。
 * @returns
 */
export declare function toFixed(value: string | number | null, float?: number, divisor?: number): string;
/**
 * 获取指定的 cookie
 * @param name cookie 的名称
 * @returns
 */
export declare function getCookie(name: string): string | null;
/**
 * 设置（添加）cookie
 * @param name cookie 的名称
 * @param value cookie 的值
 * @param maxAge cookie的有效期（以秒为单位）
 */
export declare function setCookie(name: string, value: string, maxAge?: number): void;
/**
 * 获取用户 TOKEN
 * @returns
 */
export declare function getUserToken(): string;
/**
 * 设置用户 TOKEN
 * @param token
 */
export declare function setUserToken(token: string): void;
/**
 * 将区域编码格式化，[省，市，区，镇，村]
 * @param regionCode 区域编码
 */
export declare function formatRegionCode(regionCode: string): string[];
/**
 * 拆分页面路径 '/aa/bb/cc' => ['/aa', '/aa/bb', '/aa/bb/cc']
 * @param pathname 页面路由
 * @returns
 */
export declare function splitPath(pathname: string): string[];
/**
 * 格式化请求参数
 * @param query 请求参数
 * @returns
 */
export declare function formatQueryData(query: {
    order: Array<{
        direction: boolean;
        field: string;
        [propName: string]: any;
    }>;
}): any;
/**
 * 获取树中指定层级的所有父级节点的 id
 * @param tree 树形结构数据
 * @param id   指定节点
 * @param fieldNames 字段名定义 { id: 'id', parentId: 'parentId', children: 'children' }
 * @returns
 */
export declare function getParentIdsOfTree(tree: {
    [x: string]: any;
}, id: string, fieldNames?: {
    id?: string;
    parentId?: string;
    children?: string;
}): any[];
export declare function getViewportSize(): {
    width: number;
    height: number;
};
/**
 * 将字符串样式格式化为 CSSProperties
 * @param style
 * @returns
 */
export declare function parseStyle(style: string): CSSProperties | undefined;
export {};
