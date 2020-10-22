class DustBin{
    constructor(x1, y1, x2, y2, x3, y3, w1, h1, w2, h2, w3, h3) {
        var options = {
            isStatic: true
        }
        this.body1 = Matter.Bodies.rectangle(x1, y1, w1, h1, options);
        this.body2 = Matter.Bodies.rectangle(x2, y2, w2, h2, options);
        this.body3 = Matter.Bodies.rectangle(x3, y3, w3, h3, options);

        this.width1 = w1;
        this.height1 = h1;
        this.width2 = w2;
        this.height2 = h2;
        this.width3 = w3;
        this.height3 = h3;

        World.add(world, this.body1);
        World.add(world, this.body2);
        World.add(world, this.body3);
    }
    display() {
        var pos1 = this.body1.position;
        var pos2 = this.body2.position;
        var pos3 = this.body3.position;
        rectMode(CENTER);
        fill("red");
        rect(pos1.x, pos1.y, this.width1, this.height1);
        rect(pos2.x, pos2.y, this.width2, this.height2);
        rect(pos3.x, pos3.y, this.width3, this.height3);


    }
}