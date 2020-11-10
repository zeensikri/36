class Food{
    constructor(){
        this.foodstock = 0;
        this.lastfed;
    }

    updateFoodStock(food){
        this.foodstock = food;
    }

    deductFood(){
        if(this.foodstock>0){
            this.foodstock--;
        }
    }

    getFoodStock(){
        return this.foodstock;
    }

    getfedtime(time){
        this.lastfed=time;
    }

    display(){
        var x = 80, y = 100;

        imageMode(CENTER);

        if(this.foodstock!==0){
            for(var i=0; i<this.foodstock; i++);
            if(i%10===0){
                x = 80;
                y = y + 50;
            }
            image(foodImg,x,y,50,50);
            x=x+30;
        }
    }

    bedroom(){
        background(bedImg, 550, 500);
    }

    garden(){
        background(gardImg, 550, 500);
    }

    washroom(){
        background(washImg, 550, 500);
    }
} 