

var path = [[0,0]]
var play_path = [[0,0]]
var allow_move = true
var allow_reset = false

function setUp(){
    resetBoard()
        var successful_path = false
        while (successful_path == false){
            path = [[0,0]]
            var i = 0;
            while ((path[path.length - 1][0] != 4 || path[path.length - 1][1] != 4) && (i < 60)){
                i++
                var repeat = false;
                var neg_toggle = 1
                var next_square_distance = [1, 0]
                var path_direction = Math.random() < .5
                var path_negativity = Math.random() < .4
                console.log(path_direction)
                console.log(path_negativity)
                if (path_direction == true){
                    next_square_distance = [0, 1]
                }
                if (path_negativity == true){
                    console.log('backwards')
                    neg_toggle = -1
                }
                console.log(next_square_distance)
                var new_pos = [(path[path.length - 1][0] + (next_square_distance[0]*neg_toggle)), (path[path.length - 1][1] + (next_square_distance[1]*neg_toggle))]
                console.log(new_pos);
                
                if (new_pos[0] >= 0 && new_pos[0] <= 4 && new_pos[1] >= 0 && new_pos[1] <= 4){
                    
                    for (let count = 0; count < path.length; count++){
                        if (String(path[count]) == String(new_pos)){
                            repeat = true;
                        }
                    }
                    if (repeat == false){
                    path.push(new_pos)
                    }else{
                        console.log("already been there!")
                    }
                    console.log(path[path.length - 1])
                }else{
                    console.log('cant go there')
                }
                if (path[path.length - 1][0] == 4 && path[path.length - 1][1] == 4){
                    if (path.length > 17){
                    console.log('FINISH')
                    successful_path = true
                    i = 60
                    }
                }
            }
            console.log(path)
            if (path[path.length - 1][0] == 4 && path[path.length - 1][1] == 4){
                if (path.length > 17){
                console.log('FinisH')
                successful_path = true
                }
            }
        
        }
        console.log(path)
}
setUp();

function getKeyAndMove(e){				
    var key_code=e.which||e.keyCode;
    switch(key_code){
        case 37: //left arrow key
        if (allow_move == true){
            move('left');}
            break;
        case 38: //Up arrow key
            if (allow_move == true){
            move('up');}
            break;
        case 39: //right arrow key
            if (allow_move == true){
            move('right');}
            break;
        case 40: //down arrow key
            if (allow_move == true){
            move('down');}
            break;
        case 82: //r
            if (allow_reset == true){
            resetBoard();}
            break;
    }
}

function move(dir){
    var distance = [0,0]
    var current_pos = play_path[play_path.length - 1]
    if (dir == 'left'){
        distance = [-1, 0]
    }
    if (dir == 'up'){
        distance = [0, -1]
    }
    if (dir == 'right'){
        distance = [1, 0]
    }
    if (dir == 'down'){
        distance = [0, 1]
    }
    var next_pos = [current_pos[0] + distance[0], current_pos[1] + distance[1]]

    if (next_pos[0] >= 0 && next_pos[0] <= 4 && next_pos[1] >= 0 && next_pos[1] <= 4){
       if (next_pos[0] == path[play_path.length][0] && next_pos[1] == path[play_path.length][1]){
            play_path.push(next_pos)
            if (next_pos[0] == 4 && next_pos[1] == 4){
            drawNextSquare(next_pos, 'gold', dir)
            alert('You Won')
            }else {
                drawNextSquare(next_pos, 'green', dir)    
            }
       }else{
            drawNextSquare(next_pos, 'red', dir)
            prepareResetGame()
       }
    }
}






function drawNextSquare(pos, color, dir){
    var canvas = document.getElementById("board");
    var c = canvas.getContext("2d");
    var h = canvas.height/5;
    var w = canvas.width/5;


    c.fillStyle = color
    
    c.fillRect((pos[0] * w + w)-(2*(w/3)), (pos[1] * h + h)-(2*(h/3)), w/3, h/3)
    if (dir == 'right'){
    c.fillRect(((pos[0]) * w) + (7*w/12), ((pos[1]) * h) + (5*h/12), w * -1, h/6)
    }
    if (dir == 'left'){
        c.fillRect(((pos[0]) * w) + (5*w/12), ((pos[1]) * h) + (5*h/12), w, h/6)
    }
    if (dir == 'up'){
        c.fillRect(((pos[0]) * w) + (5*w/12), ((pos[1]) * h) + (5*h/12), w/6, h)
    }
    if (dir == 'down'){
        c.fillRect(((pos[0]) * w) + (5*w/12), ((pos[1]) * h) + (7*h/12), w/6, -1 * h)
    }
}

function prepareResetGame(){
    allow_move = false
    allow_reset = true


}
function resetBoard(){
    var canvas = document.getElementById("board");
    var c = canvas.getContext("2d");
    var h = canvas.height/5;
    var w = canvas.width/5;
    c.fillStyle = 'antiquewhite'
    c.fillRect(0,0,5*w, 5*h)
    c.moveTo(w, 0);
    c.lineTo(w, h * 5);
    c.moveTo(w * 2, 0);
    c.lineTo(w * 2, h * 5)
    c.moveTo(w * 3, 0);
    c.lineTo(w * 3, h * 5)
    c.moveTo(w * 4, 0);
    c.lineTo(w * 4, h * 5)
    c.moveTo(0, h);
    c.lineTo(w * 5, h);
    c.moveTo(0, h * 2);
    c.lineTo(w * 5, h * 2)
    c.moveTo(0, h * 3);
    c.lineTo(w * 5, h * 3)
    c.moveTo(0, h * 4);
    c.lineTo(w * 5, h * 4)
    c.stroke();
    c.fillStyle = "green"
    c.fillRect(w-(2*(w/3)), h-(2*(h/3)), w/3, h/3)
    play_path = [[0,0]]
    allow_move = true
    allow_reset = false


}