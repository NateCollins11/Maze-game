

var path = [[0,0]]
var play_path = [[0,0]]
var allow_move = true
var allow_reset = false
var game_size = 5

function setUp(){
    var grid_size = document.getElementById("grid_size")
    if (grid_size.value == 'rand_size'){
        game_size = Math.floor(Math.random()*7 + 3)
    } else {
        game_size = parseInt(grid_size.value)
    }
    resetBoard()
        console.log(game_size)
        var successful_path = false
        while (successful_path == false){
            path = [[0,0]]
            var i = 0;
            while ((path[path.length - 1][0] != game_size - 1 || path[path.length - 1][1] != game_size - 1) && (i < 30 + (game_size * 10))){
                i++
                var repeat = false;
                var neg_toggle = 1
                var next_square_distance = [1, 0]
                var path_direction = Math.random() < .5
                var path_negativity = Math.random() < .4
                if (path_direction == true){
                    next_square_distance = [0, 1]
                }
                if (path_negativity == true){
                    neg_toggle = -1
                }
                var new_pos = [(path[path.length - 1][0] + (next_square_distance[0]*neg_toggle)), (path[path.length - 1][1] + (next_square_distance[1]*neg_toggle))]
                if (new_pos[0] >= 0 && new_pos[0] <= game_size - 1 && new_pos[1] >= 0 && new_pos[1] <= game_size - 1){
                    
                    for (let count = 0; count < path.length; count++){
                        if (String(path[count]) == String(new_pos)){
                            repeat = true;
                        }
                    }
                    if (repeat == false){
                    path.push(new_pos)
                    }else{
                    }
                }else{
                }
                if (path[path.length - 1][0] == game_size - 1 && path[path.length - 1][1] == game_size - 1){
                    if (path.length > (game_size * 2 + 1)){
                        successful_path = true
                        i = 60
                    }
                }
            }
            if (path[path.length - 1][0] == game_size - 1 && path[path.length - 1][1] == game_size - 1){
                if (path.length > (game_size * 3 - 1)){
                successful_path = true
                }
            }
        
        }
        console.log(path)
        document.getElementById("game_text_box").innerHTML = "Try to reach the end"
}


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
        case 82: //r key
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

    if (next_pos[0] >= 0 && next_pos[0] <= game_size - 1 && next_pos[1] >= 0 && next_pos[1] <= game_size - 1){
       if (next_pos[0] == path[play_path.length][0] && next_pos[1] == path[play_path.length][1]){
            play_path.push(next_pos)
            if (next_pos[0] == game_size - 1 && next_pos[1] == game_size - 1){
            drawNextSquare(next_pos, 'gold', dir)
            document.getElementById("game_text_box").innerHTML = "You Won!!! Play Again?"
            }else {
                drawNextSquare(next_pos, 'blue', dir)    
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
    var h = canvas.height/game_size;
    var w = canvas.width/game_size;


    c.fillStyle = color
    
    c.beginPath();
    c.arc(pos[0] * w + w/2, pos[1] * h + h/2, w/9 , 0, 2*Math.PI);
    c.fill();


    if (dir == 'right'){
    c.fillRect(((pos[0]) * w) + (7*w/12), ((pos[1]) * h) + (11*h/24), w * -1, h/12)
    }
    if (dir == 'left'){
        c.fillRect(((pos[0]) * w) + (5*w/12), ((pos[1]) * h) + (11*h/24), w, h/12)
    }
    if (dir == 'up'){
        c.fillRect(((pos[0]) * w) + (11*w/24), ((pos[1]) * h) + (5*h/12), w/12, h)
    }
    if (dir == 'down'){
        c.fillRect(((pos[0]) * w) + (11*w/24), ((pos[1]) * h) + (7*h/12), w/12, -1 * h)
    }
}

function prepareResetGame(){
    allow_move = false
    allow_reset = true


}
function resetBoard(){
    var canvas = document.getElementById("board");
    var c = canvas.getContext("2d");
    var h = canvas.height/game_size;
    var w = canvas.width/game_size;
    c.fillStyle = 'black'
    c.fillRect(0,0,game_size*w, game_size*h)
    for (var line_counter = 1; line_counter < game_size; line_counter++){
        c.beginPath();
        c.strokeStyle = 'green'
        c.moveTo(line_counter * w, 0);
        c.lineTo(line_counter * w, h * game_size);
        c.moveTo(0, line_counter * h);
        c.lineTo(w * game_size, line_counter * h)
        c.stroke()
    }

    c.fillStyle = "blue"
    c.fillRect(w-(2*(w/3)), h-(2*(h/3)), w/3, h/3)
    play_path = [[0,0]]
    allow_move = true
    allow_reset = false


}