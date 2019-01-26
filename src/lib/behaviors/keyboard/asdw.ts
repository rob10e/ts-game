import { IKeyPressed } from "../../types/IKeyPressed";
import { IKeyMap } from "../../types/IKeyMap";
import { Keyboard } from "../../Keyboard";
import { Game } from "../../Game";
import { Position } from "../../Position";
import { ISize } from "../../types/ISize";
import { IBehavior } from "../../types/IBehavior";
import { IMoveable } from "../../types/IMovable";

export default class AsdwBehavior implements IBehavior, IMoveable {
  private readonly pressedKeys: IKeyPressed = {
    left: false,
    right: false,
    up: false,
    down: false,
  };

  private keyMap: IKeyMap = {
    [Keyboard.keys.d]: "right",
    [Keyboard.keys.a]: "left",
    [Keyboard.keys.w]: "up",
    [Keyboard.keys.s]: "down",
  };
  constructor(
    public position: Position,
    public size: ISize,
    public game: Game,
    keyMap?: IKeyMap,
  ) {
    if (keyMap) {
      this.keyMap = keyMap;
    }
  }

  public onkeyboard = (event: KeyboardEvent) => {
    const key = this.keyMap[event.keyCode];
    this.pressedKeys[key] = event.type === "keydown";
  };

  public update = (deltaTime: number) => {
    const { pressedKeys } = this;
    if (pressedKeys.left) {
      this.position.setPositionDelta({ x: -deltaTime });
    }
    if (pressedKeys.right) {
      this.position.setPositionDelta({ x: deltaTime });
    }
    if (pressedKeys.up) {
      this.position.setPositionDelta({ y: -deltaTime });
    }
    if (pressedKeys.down) {
      this.position.setPositionDelta({ y: deltaTime });
    }
    // Flip position at boundaries
    if (this.position.x > this.game.width) {
      this.position.setPositionDelta({ x: -this.game.width });
    } else if (this.position.x < 0) {
      this.position.setPositionDelta({ x: this.game.width });
    }
    if (this.position.y > this.game.height) {
      this.position.setPositionDelta({ y: -this.game.height });
    } else if (this.position.y < 0) {
      this.position.setPositionDelta({ y: this.game.height });
    }
  };

  setup?: () => void;
}
