import { Game } from "../Game";
import { ISize } from "./ISize";
import { IPosition } from "./IPosition";
import { IBehavior } from "./IBehavior";
export interface IGameObject {
  behaviors: IBehavior[];
  game: Game;
  position: IPosition;
  size: ISize;
  setup?: () => void;
  update: (deltaTime: number) => void;
  display: (surface: CanvasRenderingContext2D) => void;
}
