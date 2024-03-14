export default (ctx, canvas, boatProps, image) => {

    let boat = new Boat(ctx, canvas, boatProps.x, image)
    boat.move();
    if (boatProps.x <= 0) {
        boatProps.x = 0;
    } else if (boatProps.x > canvas.width){
        boatProps.x = canvas.width
    }
};

class Boat {
    constructor(ctx, canvas, x, image) {
        this.canvas = canvas
        this.ctx = ctx
        this.x = x;
        this.image = image;
    }
    move() {
        this.image.onload = () => {
            this.ctx.drawImage(this.image, this.x, 350, 100, 100)
        }
        this.ctx.drawImage(this.image, this.x, 350, 100, 100)
    }
}