let config = {
    type: Phaser.auto,
    width: 1080,
    height: 640,
    scene: [Menu, Play],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
}

let game = new Phaser.Game(config);
let keyW, keyA, keyS, keyD, keyRIGHT, keyLEFT, keyUP, keyDOWN, keyF;
