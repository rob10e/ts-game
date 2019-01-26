import { IGameObject } from "./IGameObject";
import { IPosition } from "./IPosition";

export interface IMoveable {
  position: IPosition;
  onkeyboard?: (event: KeyboardEvent) => void;
  onMouse?: (event: MouseEvent) => void;
}
