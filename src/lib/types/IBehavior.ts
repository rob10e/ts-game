import { Game } from "../Game";

export interface IBehavior {
  game: Game;
  setup?: () => void;
  update: (deltaTime: number) => void;
}
