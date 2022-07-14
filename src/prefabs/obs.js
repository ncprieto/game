class obstacle extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, min, max){
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.min = min;
        this.max = max;
        this.reset();
    }
    update(){
        if(this.active){
            this.y += 2;
        }
        if(this.y > 700){
            this.reset();
        }
    }
    reset(){
        this.active = false;
        this.y = -64;
        this.x = Math.floor(Math.random() * (this.max - this.min) + this.min);
        this.setScale(1.5);
    }
}