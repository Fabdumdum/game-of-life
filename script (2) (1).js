// var matrix = [
//     [0, 0, 1, 0, 0],
//     [1, 0, 0, 2, 0], 
//     [0, 1, 0, 0, 0],
//     [0, 0, 1, 0, 0],
//     [1, 1, 0, 0, 0],
//     [1, 1, 0, 2, 0],
//     [1, 1, 0, 0, 0]
// ];

// var side = 100;
// var grassArr = [];
// var grassEat = [];

// function setup(){
//     frameRate(5)
//     createCanvas(side*matrix[0].length+1, side*matrix.length+1);
//     background('#acacac');
    
//     for(var y = 0; y < matrix.length; y++){
//         for(var x = 0; x < matrix[y].length; x++){
//             if(matrix[y][x] == 1){
//                 var gr = new Grass(x,y);
//                 grassArr.push(gr);
//             }
//             else if(matrix[y][x] == 2){
     
//             }
//             else if(matrix[y][x] == 8){
     
//             }
//         }
//      }
// }

// console.log(grassArr)

// function draw() {
//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {
 
//             if (matrix[y][x] == 1) {
//                 fill("green");
//                 rect(x * side, y * side, side, side);
//             }
//             else if (matrix[y][x] == 0) {
//                 fill("#acacac");
//                 rect(x * side, y * side, side, side);
//             }
//             else if (matrix[y][x] == 2) {
//                 fill("yellow");
//                 rect(x * side, y * side, side, side);
//             }
//         }
//     }
//     for(var i in grassArr){
//         grassArr[i].mul();s
//     }
 
// }



var  matrix=[];
var side=10;
var size2=100

function setup(){
    createCanvas(3000,3000)

    for(var y=0;y<size2;y++){
        for (var x=0;x<size2;x++){
            var a=[]
        var value=Math.round(Math.random()*(2-0))
        if(value==0){
            var emptyBox=new Empty(x,y)
            a.push(emptyBox)
        }
        else if (value==1) {
            var grass=new Grass(x,y)
            a.push(grass)

        }  
      else if (value==2){
          var grassEater=new GrassEater(x,y)
          a.push(grassEater)
      }
      rect(x * side, y * side, side, side);
    }  
   
    matrix.push(a)
  
    
 }

}
function draw(){
    emptyCells=[];
    for(var y=0;y<matrix.length;y++){
        for(var x=0;x<matrix[y].length;x++){
       matrix[y][x].multiply()
            
            }
           
        }
    }



class Grass{
    constructor(x,y){
        this.multiply=0;
        this.x=x;
        this.y=y;
        fill("green")
        this.directions=[
            [this.x-1,this.y-1],
            [this.x,this.y-1],
            [this.x+1,this.y-1],
            [this.x-1,this.y],
            [this.x+1,this.y],
            [this.x-1,this.y+1],
            [this.x,this.y+1],
            [this.x+1,this.y+1]
        ];    
    }

   
    
    chooseCells(){
                var found = [];
                for (var i in this.directions) {
                    var x = this.directions[i][0];
                    var y = this.directions[i][1];
                    if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                        if (matrix[y][x] instanceof Empty) {
                            found.push(this.directions[i]);
                        }
                    }  
                }
                var target = random(found);
                return target;}
   
        // multiply () {
        
        // for(var d of this.directions){
        //    this.multiply++;
        //    if (d[0]<0 ||d[0] >=100 || d[1]< 0 || d[1]>= 100){
        //     var u = matrix[d[0]][d[1]];
        //     if ( u instanceof Empty){
        //         if (this.multiply>8){
        //             matrix[d[0]][d[1]]=new Grass(d[0],d[1])
        //             this.multiply=0
        //         }
        //     }
        //    }
        // }
    }

            
class GrassEater {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.hungry=0
      fill("yellow");
        this.directions = [ 
        [this.x - 1, this.y - 1],
        [this.x    , this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y    ],
        [this.x + 1, this.y    ],
        [this.x - 1, this.y + 1],
        [this.x    , this.y + 1],
        [this.x + 1, this.y + 1],
        ];
    }
    
    chooseCells(){
                var foundGrassEater = [];
                for (var i in this.directions) {
                    var x = this.directions[i][0];
                    var y = this.directions[i][1];
                    if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                        if (matrix[y][x] instanceof Grass) {
                            foundGrassEater.push(this.directions[i]);
                            this.energy = 15;
                        }   
                    }
                }
                if (foundGrassEater == 0) {
                    for (var i in this.directions) {
                        var x = this.directions[i][0];
                        var y = this.directions[i][1];
                        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                            if (matrix[y][x] instanceof Empty) {
                                foundGrassEater.push(this.directions[i]);
                            }
                            
                        }  
                    }
                    this.energy--
               }
                if (foundGrassEater == 0) {
                    for (var i in this.directions) {
                        var x = this.directions[i][0];
                        var y = this.directions[i][1];
                        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                            if (matrix[y][x] instanceof GrassEater) {
                                foundGrassEater.push(this.directions[i]);
                            }
                            
                        }  
                    }
                    this.energy--
                }
                var found = random(foundGrassEater);
                return found;

            }
               multiply(){
                        var aimCell = this.chooseCells()
                        var x = aimCell[0]
                        var y = aimCell[1]
                        var aimCellClone = this.chooseCells()
                        var xK = aimCellClone[0]
                        var yK= aimCellClone[1]
                        matrix[this.y][this.x] = new Empty(this.x,this.y)
                        if(this.energy > 0){
                            matrix[y][x] = new GrassEater(x,y,this.energy)
                            if(Math.random()<0.05){  
                                matrix[yK][xK] = new GrassEater(xK,yK,this.energy)
                            }
                        }
                    }
             
            }
        
    
class Empty{
    constructor(x,y){
    this.x=x;
    this.y=y;
    fill("gray")

  }
}
     

