import { Game } from "./lib/Game";
import { Player } from "./Player";
import { Position } from "./lib/Position";
import { Keyboard } from "./lib/Keyboard";

export default class MainGame extends Game {
  public setup() {
    const player1 = new Player(
      new Position(this.width / 3, this.height / 2),
      {
        width: 10,
        height: 10,
      },
      this,
    );

    const player2 = new Player(
      new Position((this.width * 2) / 3, this.height / 2),
      {
        width: 10,
        height: 10,
      },
      this,
      {
        [Keyboard.keys.l]: "right",
        [Keyboard.keys.j]: "left",
        [Keyboard.keys.i]: "up",
        [Keyboard.keys.k]: "down",
      },
      "blue",
    );

    this.addGameObject(player1);
    this.addGameObject(player2);
  }
}
