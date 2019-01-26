import { IPosition } from "./types/IPosition";
export class Position implements IPosition {
  constructor(public x: number, public y: number) {}
  public setPositionDelta<K extends keyof IPosition>(
    delta: Pick<IPosition, K> | IPosition | null,
  ): void {
    if ((<IPosition>delta).x) {
      this.x = this.x + (<IPosition>delta).x;
    }
    if ((<IPosition>delta).y) {
      this.y = this.y + (<IPosition>delta).y;
    }
  }
  public setPosition<K extends keyof IPosition>(
    delta: Pick<IPosition, K> | IPosition | null,
  ): void {
    if ((<IPosition>delta).x) {
      this.x = (<IPosition>delta).x;
    }
    if ((<IPosition>delta).y) {
      this.y = (<IPosition>delta).y;
    }
  }
}
