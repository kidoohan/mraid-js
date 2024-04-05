import { Size } from "./size";

/**
 * Represents a rectangle.
 * @public
 */
export interface Rectangle extends Size {
  width: number;

  height: number;

  /**
   * The number of density-independent pixels offset from left edge.
   */
  x: number;

  /**
   * The number of density-independent pixels offset from top edge.
   */
  y: number;
}
