import type { DataUnit } from "@/types/DataUnit";

/**
 * 服务 `VLine` 的扩展数据单元
 */
export interface ExtendedDataUnitForVLine extends DataUnit {
  /**
   * 权重
   */
  power: number;
  /**
   * 配图
   */
  illustration?: {
    url: string;
  };
}
