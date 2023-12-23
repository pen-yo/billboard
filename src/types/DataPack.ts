import type { DataUnit } from "@/types/DataUnit";

/**
 * 数据包
 */
export interface DataPack {
  /**
   * 标题
   */
  title: string;
  /**
   * 单位
   */
  unit?: string;
  /**
   * 来源
   */
  source: string;
  /**
   * 是否需要根据权重排序
   */
  needSort?: boolean;
  /**
   * 数据
   */
  data: DataUnit[];
}
