var board = [["C","M","X","S","J","S","X","M","C"],
             [0,0,0,0,0,0,0,0,0],
             [0,"P",0,0,0,0,0,"P",0],
             ["B",0,"B",0,"B",0,"B",0,"B"],
             [0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0],
             ["b",0,"b",0,"b",0,"b",0,"b"],
             [0,"p",0,0,0,0,0,"p",0],
             [0,0,0,0,0,0,0,0,0],
             ["c","m","x","s","j","s","x","m","c"]]
var canvas = document.getElementById("chessboard");
var ctx = canvas.getContext("2d");
var selected = false;
var selectedx = -1;
var selectedy = -1;
var type = "";
ctx.beginPath();
function drawcanvas(){
    ctx.fillStyle = "#eedbb9";
    ctx.fillRect(0,0,540,600);
    for(var i=0;i<=9;i++){
        ctx.strokeStyle = "black";
        ctx.moveTo(30,i*60+30);
        ctx.lineTo(510,i*60+30);
    }
    for(var i=0;i<=8;i++){
        if((i!=0)&&(i!=8)){
            ctx.moveTo(i*60+30,30);
            ctx.lineTo(i*60+30,270);
            ctx.moveTo(i*60+30,330);
            ctx.lineTo(i*60+30,570);
        }else{
            ctx.moveTo(i*60+30,30);
            ctx.lineTo(i*60+30,570);
        }
    }
    ctx.moveTo(210,30);
    ctx.lineTo(330,150);
    ctx.moveTo(330,30);
    ctx.lineTo(210,150);
    ctx.moveTo(210,450);
    ctx.lineTo(330,570);
    ctx.moveTo(330,450);
    ctx.lineTo(210,570);
    ctx.stroke();
    for(var y=0;y<=9;y++){
        for(var x=0;x<=8;x++){
            if(board[y][x]!=0){
                ctx.beginPath();
                ctx.arc(x*60+30, y*60+30,25, 0, 2 * Math.PI);
                if(board[y][x].toUpperCase()!=board[y][x]){
                    ctx.fillStyle = 'red';
                    ctx.strokeStyle = "red";
                }else{
                    ctx.fillStyle = 'black';
                    ctx.strokeStyle = "black";
                }
                ctx.fill();
                ctx.stroke();
                ctx.font = "25px Microsoft Yahei";
                ctx.fillStyle = 'white';
                ctx.textAlign = "center";
                switch (board[y][x].toUpperCase()){
                    case "C":
                        ctx.fillText("车",x*60+30, y*60+38);
                        break;
                    case "M":
                        ctx.fillText("马",x*60+30, y*60+38);
                        break;
                    case "X":
                        ctx.fillText("相",x*60+30, y*60+38);
                        break;
                    case "S":
                        ctx.fillText("士",x*60+30, y*60+38);
                        break;
                    case "J":
                        ctx.fillText("将",x*60+30, y*60+38);
                        break;
                    case "P":
                        ctx.fillText("炮",x*60+30, y*60+38);
                        break;
                    case "B":
                        ctx.fillText("兵",x*60+30, y*60+38);
                        break;
                }
            }
        }
    }
}
drawcanvas();
canvas.addEventListener("mousedown",function(e){
    var x = Math.floor(e.clientX-canvas.getBoundingClientRect().left);
    var y = Math.floor(e.clientY-canvas.getBoundingClientRect().top);
    var arrayx = Math.floor((x/60));
    var arrayy = Math.floor((y/60));
    if(!selected){
        selectedx = arrayx;
        selectedy = arrayy;
        if(board[selectedy][selectedx]!=0){
            type = board[selectedy][selectedx];
            board[selectedy][selectedx] = 0;
            drawcanvas();
            selected = true;
        }
    }else{
        selectedx = arrayx;
        selectedy = arrayy;
        board[selectedy][selectedx] = type;
        drawcanvas();
        selected = false;
    }
    console.log(selectedx,selectedy);
});