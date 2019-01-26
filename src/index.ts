import MainGame from "./MainGame";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const game = new MainGame({ canvas, fullscreen: true });

game.start();
