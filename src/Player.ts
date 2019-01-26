import { ISize } from "./lib/types/ISize";
import { Position } from "./lib/Position";
import { Game } from "./lib/Game";
import { IKeyMap } from "./lib/types/IKeyMap";
import AsdwBehavior from "./lib/behaviors/keyboard/asdw";
import { IGameObject } from "./lib/types/IGameObject";
import { IBehavior } from "./lib/types/IBehavior";

export class Player implements IGameObject {
  behaviors: IBehavior[] = [];
  setup?: () => void;
  update: (deltaTime: number) => void;
  constructor(
    public position: Position,
    public size: ISize,
    public game: Game,
    keyMap?: IKeyMap,
    public color: string = "red",
  ) {
    this.behaviors.push(new AsdwBehavior(position, size, this.game, keyMap));
  }

  public display = (surface: CanvasRenderingContext2D): void => {
    surface.fillStyle = this.color;

    surface.fillRect(
      this.position.x - 5,
      this.position.y - 5,
      this.size.width,
      this.size.height,
    );
  };
}
