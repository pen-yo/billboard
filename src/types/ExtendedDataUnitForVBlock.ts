import type { DataUnit } from "@/types/DataUnit";

/**
 * 服务 `VBlock` 的扩展数据单元
 */
export interface ExtendedDataUnitForVBlock extends DataUnit {
  /**
   * 配图
   */
  illustration: {
    url: string;
  };
  /**
   * 副标题
   */
  subtitle: string;
  /**
   * 描述
   */
  description: string;
}
