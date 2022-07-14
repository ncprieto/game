class player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, side, orientation){
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.side = side;
        this.orientation = orientation;
        this.justHit = false;
        this.health = 3;
    }
    update(){
        if(this.side == 'left' && this.orientation == 'vertical'){
            if(keyA.isDown && this.x > 16) {
            this.body.setVelocityX(-300);
            }
            else if(keyD.isDown && this.x < 508) {
                this.body.setVelocityX(300);
            }
            else {
                this.body.setVelocityX(0);
            }
            if(keyW.isDown && this.y > 32) {
                this.body.setVelocityY(-300);
            }
            else if(keyS.isDown && this.y < 608) {
                this.body.setVelocityY(300);
            }
            else {
                this.body.setVelocityY(0);
            }
        }
        else if(this.side == 'right' && this.orientation == 'vertical'){
            if(keyLEFT.isDown && this.x > 588) {
                this.body.setVelocityX(-300);
            }
            else if(keyRIGHT.isDown && this.x < 1048) {
                this.body.setVelocityX(300);
            }
            else {
                this.body.setVelocityX(0);
            }
            if(keyUP.isDown && this.y > 32) {
                this.body.setVelocityY(-300);
            }
            else if(keyDOWN.isDown && this.y < 608) {
                this.body.setVelocityY(300);
            }
            else {
                this.body.setVelocityY(0);
            }
        }
    }
}