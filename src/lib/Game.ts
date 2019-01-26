import { Map, fromJS } from "immutable";
import { IMoveable } from "./types/IMovable";
import { IGameObject } from "./types/IGameObject";
export type GameType = typeof Game;

export interface IGameOptions {
  canvas: HTMLCanvasElement;
  width?: number;
  height?: number;
  fullscreen?: boolean;
}

export enum RunningState {
  Stopped,
  Running,
  Paused,
}

export abstract class Game {
  private lastRender: number = 0;
  public width: number;
  public height: number;
  private readonly surface: CanvasRenderingContext2D;
  // public state: TState;
  private readonly canvas: HTMLCanvasElement;
  private readonly isFullscreen: boolean;
  private runningState: RunningState = RunningState.Stopped;
  private objects: IGameObject[] = [];
  public clearEveryFrame: boolean = true;

  constructor(gameOptions: IGameOptions) {
    this.canvas = gameOptions.canvas;
    this.isFullscreen = gameOptions.fullscreen;

    if (this.isFullscreen) {
      this.setCanvasFullscreen();
    } else {
      if (gameOptions.width) {
        this.canvas.width = gameOptions.width;
      }
      if (gameOptions.height) {
        this.canvas.height = gameOptions.height;
      }
      this.width = this.canvas.width;
      this.height = this.canvas.height;
    }
    this.surface = this.canvas.getContext("2d");
  }

  public addGameObject(object: IGameObject) {
    this.objects.push(object);
  }

  private setCanvasFullscreen() {
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  public start(): void {
    this.setupListeners();
    this.setup();
    this.runningState = RunningState.Running;
    window.requestAnimationFrame(this.loop);
  }

  public stop(): void {
    this.stopListeners();
    this.teardown();
    this.runningState = RunningState.Stopped;
  }

  public restart(): void {
    this.stop();
    this.start();
  }

  public abstract setup(): void;
  public teardown(): void {}

  private setupListeners(): void {
    window.addEventListener("keydown", this.keyboardHandler, false);
    window.addEventListener("keyup", this.keyboardHandler, false);

    window.addEventListener("click", this.mouseHandler, false);
    window.addEventListener("dblclick", this.mouseHandler, false);
    window.addEventListener("mousedown", this.mouseHandler, false);
    window.addEventListener("mouseup", this.mouseHandler, false);
    window.addEventListener("mouseover", this.mouseHandler, false);
    window.addEventListener("mouseout", this.mouseHandler, false);
    window.addEventListener("mousemove", this.mouseHandler, false);
    window.addEventListener("contextmenu", this.mouseHandler, false);

    window.addEventListener("drag", this.dragHandler, false);
    window.addEventListener("dragstart", this.dragHandler, false);
    window.addEventListener("dragend", this.dragHandler, false);
    window.addEventListener("dragenter", this.dragHandler, false);
    window.addEventListener("dragleave", this.dragHandler, false);
    window.addEventListener("dragover", this.dragHandler, false);
    window.addEventListener("drop", this.dragHandler, false);

    window.addEventListener("mousewheel", this.mouseWheelHandler, false);

    window.addEventListener("scroll", this.scrollHandler, false);

    window.addEventListener("resize", this.resizeHandler, false);
  }

  private stopListeners(): void {
    window.removeEventListener("keydown", this.keyboardHandler, false);
    window.removeEventListener("keyup", this.keyboardHandler, false);

    window.removeEventListener("click", this.mouseHandler, false);
    window.removeEventListener("dblclick", this.mouseHandler, false);
    window.removeEventListener("mousedown", this.mouseHandler, false);
    window.removeEventListener("mouseup", this.mouseHandler, false);
    window.removeEventListener("mouseover", this.mouseHandler, false);
    window.removeEventListener("mouseout", this.mouseHandler, false);
    window.removeEventListener("mousemove", this.mouseHandler, false);
    window.removeEventListener("contextmenu", this.mouseHandler, false);

    window.removeEventListener("drag", this.dragHandler, false);
    window.removeEventListener("dragstart", this.dragHandler, false);
    window.removeEventListener("dragend", this.dragHandler, false);
    window.removeEventListener("dragenter", this.dragHandler, false);
    window.removeEventListener("dragleave", this.dragHandler, false);
    window.removeEventListener("dragover", this.dragHandler, false);
    window.removeEventListener("drop", this.dragHandler, false);

    window.removeEventListener("mousewheel", this.mouseWheelHandler, false);

    window.removeEventListener("scroll", this.scrollHandler, false);

    window.removeEventListener("resize", this.resizeHandler, false);
  }

  public resizeHandler = (event: UIEvent) => {
    if (this.isFullscreen) {
      this.setCanvasFullscreen();
    }
    if (this.runningState !== RunningState.Stopped) {
      this.restart();
    }
  };

  public keyboardHandler = (event: KeyboardEvent) => {
    this.objects.forEach(object => {
      if (object.behaviors) {
        object.behaviors.forEach(behavior => {
          if (((behavior as unknown) as IMoveable).onkeyboard) {
            ((behavior as unknown) as IMoveable).onkeyboard(event);
          }
        });
      }
    });
  };

  public mouseHandler = (event: MouseEvent) => {};
  public dragHandler = (event: DragEvent) => {};
  public mouseWheelHandler = (event: WheelEvent) => {};
  public scrollHandler = (event: UIEvent) => {};

  public pauseToggle() {
    if (this.runningState === RunningState.Running) {
      this.runningState = RunningState.Paused;
    } else if (this.runningState === RunningState.Paused) {
      this.runningState = RunningState.Running;
    }
  }

  public update = (deltaTime: number): void => {
    this.objects.forEach(object => {
      if (object.update) {
        object.update(deltaTime);
      }
      if (object.behaviors) {
        object.behaviors.forEach(behavior => {
          behavior.update(deltaTime);
        });
      }
    });
  };

  public draw = (surface: CanvasRenderingContext2D): void => {
    if (this.clearEveryFrame) {
      surface.clearRect(0, 0, this.width, this.height);
    }

    this.objects.forEach(item => {
      item.display(surface);
    });
  };

  private loop = (timestamp: number): void => {
    const deltaTime = timestamp - this.lastRender;
    const { surface, update, draw } = this;

    if (this.runningState === RunningState.Running) {
      update(deltaTime);
      surface.save();
      draw(surface);
      surface.restore();
      this.lastRender = timestamp;
    }

    window.requestAnimationFrame(this.loop);
  };
}
