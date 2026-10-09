import Phaser from 'phaser';
import { WorldScene } from './WorldScene';
import { installKeyboard } from './input';

export function createGame(parent: HTMLElement): Phaser.Game {
  installKeyboard();
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    backgroundColor: '#1d2b3a',
    pixelArt: true,
    roundPixels: true,
    scale: { mode: Phaser.Scale.RESIZE, width: parent.clientWidth || 960, height: parent.clientHeight || 640 },
    scene: [WorldScene],
    banner: false,
    audio: { noAudio: true },
  });
}
