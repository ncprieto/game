class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('left' ,  './assets/left.png');
        this.load.image('right',  './assets/right.png');
        this.load.image('background', './assets/background.png');
        this.load.image('divider', './assets/divider.png');
        this.load.image('obstacle', './assets/obstacle.png');
        this.load.image('text1', './assets/text1.png');
    }
    create(){
        // text
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#87ceeb',
            color: '#000000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        // keys
        keyLEFT  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP    = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyA     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyF     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        // divider
        this.background = this.add.image(0,0, 'background').setOrigin(0,0);
        this.divider = this.add.image(540, 0, 'divider').setOrigin(0,0);
        // players
        this.left = new player(this, 100, 100, 'left', 'left', 'vertical').setOrigin(0.5,0.5);
        this.right = new player(this, 600, 300, 'right', 'right', 'vertical').setOrigin(0.5,0.5).setScale(1.3);
        // obstacles
        this.leftObstacles = [];
        this.rightObstacles = [];
        for(let i = 0; i < 10; i ++){
            this.leftObstacles.push(new obstacle(this, 0, 0, 'obstacle', 16, 508).setOrigin(0.5, 0.5));
            this.rightObstacles.push(new obstacle(this, 0, 0, 'obstacle', 588, 1048).setOrigin(0.5, 0.5));
        }
        // obstacle timer
        this.leftObsTimer = this.time.addEvent({delay: 300, callback: this.spawnLeftObs, callbackScope: this, loop: true});
        this.rightObsTimer = this.time.addEvent({delay: 300, callback: this.spawnRightObs, callbackScope: this, loop: true});
        this.leftJustHitTimer = this.time.addEvent({delay: 3000, callback: () => {if(this.left.justHit){this.left.justHit = false}}, callbackScope: this, loop: true});
        this.rightJustHitTimer = this.time.addEvent({delay: 2000, callback: () => {if(this.right.justHit){this.right.justHit = false}}, callbackScope: this, loop: true});
        // encounter timer
        this.encounterTimer = this.time.addEvent({delay: 25000, callback: () => this.endingWords = true, callbackScope: this, loop: true});
        // fade in and out timer
        this.fadeInTimer = this.time.addEvent({delay: 100, callback: this.fadeInNOut, callbackScope: this, loop: true});

        //  overlay for words
        this.overlay = this.add.image(0,0, 'background').setOrigin(0,0);
        this.initWords = this.add.image(game.config.width/2, game.config.height/2 - 128, 'text1').setOrigin(0.5,0.5);
        this.endWords = this.add.text(game.config.width/2, game.config.height/2+32, 'Press (z)', textConfig).setOrigin(0.5).setAlpha(0);

        // cons
        this.initialWords = true;
        this.endingWords = false;
    }
    update(){
        if(!this.initialWords && !this.endingWords){
            if(this.left.health > 0 && this.right.health > 0){
                this.left.update();
                this.right.update();
                for(let i in this.leftObstacles){
                    this.leftObstacles[i].update();
                    if(!this.left.justHit && this.checkCollision(this.left, this.leftObstacles[i])){
                        this.left.justHit = true;
                        this.left.health --;
                        console.log("HIT LEFT");
                    }
                }
                for(let i in this.rightObstacles){
                    this.rightObstacles[i].update();
                    if(!this.right.justHit && this.checkCollision(this.right, this.rightObstacles[i])){
                        this.right.justHit = true;
                        this.right.health --;
                        console.log("HIT RIGHT");
                    }
                }
            }
            else{
                console.log("DEAD");
            }
        }
        else if(Phaser.Input.Keyboard.JustDown(keyF) && this.initialWords){
            this.initialWords = false;
        }
        else if(this.endingWords){
            this.left.setVelocityX(0);
            this.left.setVelocityY(0);
            this.right.setVelocityX(0);
            this.right.setVelocityY(0);
        }
        else if(Phaser.Input.Keyboard.JustDown(keyF) && this.endingWords){
            // go to next scene
        }
    }
    spawnLeftObs(){
        if(!this.initialWords && !this.endingWords){
            if(this.leftObsTimer.delay == 600){
                this.leftObsTimer.delay = 300;
            }
            for(let i in this.leftObstacles){
                if(!this.leftObstacles[i].active){
                    this.leftObstacles[i].active = true;
                    if(Math.floor(Math.random() * (5 - 0) + 1) == 1){
                        this.leftObsTimer.delay = 600;
                        this.leftObstacles[i].setScale(3);
                    }
                    return;
                }
            }
        }
    }
    spawnRightObs(){
        if(!this.initialWords && !this.endingWords){
            if(this.rightObsTimer.delay == 1000){
                this.rightObsTimer.delay = 300;
            }
            for(let i in this.rightObstacles){
                if(!this.rightObstacles[i].active){
                    this.rightObstacles[i].active = true;
                    if(Math.floor(Math.random() * (10 - 0) + 1) == 1){
                        this.rightObsTimer.delay = 1000;
                        this.rightObstacles[i].setScale(2.5);
                    }
                    return;
                }
            }
        }
    }
    checkCollision(player, cube){
        if (player.x < cube.x + cube.width && 
            player.x + player.width > cube.x && 
            player.y < cube.y + cube.height &&
            player.height + player.y > cube. y) {
                return true;
        } else {
            return false;
        }
    }
    fadeInNOut(){
        if(!this.initialWords && !this.endingWords){
            if(this.overlay.alpha >= 0 && this.initWords.alpha >= 0){
                this.overlay.alpha -= 0.05;
                this.initWords.alpha -= 0.07;
            }
        }
        if(this.endingWords && !this.initalWords){
            if(this.overlay.alpha <= 1 && this.endWords.alpha <= 1){
                this.overlay.alpha += 0.05;
                this.endWords.alpha += 0.025;
            }
        }
    }
}