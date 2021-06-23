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
var text = document.getElementById("text");
var ctx = canvas.getContext("2d");
var selected = false;
var selectedx = -1;
var selectedy = -1;
var type = "";
var game = "";
var turn =0;
ctx.beginPath();
function returnturn(){
    if(turn%2){
        return "black";
    }else{
        return "red";
    }
}
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
function typeofarmy(type){
    if(type!=0){
        if(type == type.toUpperCase()){
            return "black";
        }else{
            return "red";
        }
    }else{
        return 0;
    }
}
function isvalid(type,yori,xori,ynew,xnew){
    if(typeofarmy(type)==typeofarmy(board[ynew][xnew])){
        return false
    }
    if(type.toUpperCase()=="M"){
        if(Math.abs(ynew-yori)==2){
            if(ynew>yori){
                if(board[yori+1][xori]!=0){
                    return false;
                }
                if(typeofarmy(type)=="black"){
                    game = game+"马"+(xori+1)+"进"+(xnew+1) + "\n"
                }else{
                    game = game+ "马"+(xori+1)+"退"+(xnew+1) + " "
                }
                
            }else{
                if(board[yori-1][xori]!=0){
                    return false;
                }
                if(typeofarmy(type)=="red"){
                    game = game+ "马"+(xori+1)+"进"+(xnew+1) + " "
                }else{
                    game = game+"马"+(xori+1)+"退"+(xnew+1) + "\n"
                }
                
            }
        }else if(Math.abs(xnew-xori)==2){
            if(xnew>xori){
                if(board[yori][xori+1]!=0){
                    return false
                }
                
            }else{
                if(board[yori][xori-1]!=0){
                    return false
                }
            }
            if(ynew>yori){
                if(typeofarmy(type)=="black"){
                    game = game+ "马"+(xori+1)+"进"+(xnew+1) + "\n"
                }else{
                    game = game+ "马"+(xori+1)+"退"+(xnew+1) + " "
                }
            }else{
                if(typeofarmy(type)=="red"){
                    game = game+ "马"+(xori+1)+"进"+(xnew+1) + " "
                }else{
                    game = game+ "马"+(xori+1)+"退"+(xnew+1) + "\n"
                }
            }
        }
        if((((yori-ynew)*(yori-ynew)+(xori-xnew)*(xori-xnew))==5)){
            return true;
        }
    }else if(type.toUpperCase()=="J"){
        if((((yori-ynew)*(yori-ynew)+(xori-xnew)*(xori-xnew))!=1)){
            return false;
        }
        if((ynew!=yori)&&(xnew!=xori)){
            return false;
        }
        if(xnew<3||xnew>5){
            return false;
        }
        if(type = "j"){
            if(ynew<7){
                return false;
            }
            if(ynew>yori){
                game = game+ "将"+(xori+1)+"退"+1 + " "
            }else if(ynew<yori){
                game = game+ "将"+(xori+1)+"进"+1 + " "
            }else{
                game = game+ "将"+(xori+1)+"平"+(xnew+1) + " "
            }
        }else{
            if(ynew>2){
                return false;
            }
            if(ynew<yori){
                game = game+ "将"+(xori+1)+"退"+1 + "\n"
            }else if(ynew>yori){
                game = game+ "将"+(xori+1)+"进"+1+ "\n"
            }else{
                game = game+ "将"+(xori+1)+"平"+(xnew+1) + "\n"
            }
        }
        
        return true;
    }else if(type.toUpperCase()=="S"){
        if(xnew<3||xnew>5){
            return false;
        }
        if(type== "S"){
            if(ynew>2){
                return false;
            }
            if(ynew<yori){
                game = game+ "士"+(xori+1)+"退"+(xnew+1) + "\n"
            }else{
                game = game+ "士"+(xori+1)+"进"+(xnew+1) + "\n"
            }
        }else{
            if(ynew<7){
                return false;
            }
            if(ynew>yori){
                game = game+ "士"+(xori+1)+"退"+(xnew+1) + " "
            }else{
                game = game+ "士"+(xori+1)+"进"+(xnew+1) + " "
            }
        }
        if((((yori-ynew)*(yori-ynew)+(xori-xnew)*(xori-xnew))==2)){
            return true;
        }
    }else if(type.toUpperCase()=="X"){
        if(type== "X"){
            if(ynew>4){
                return false;
            }
            if(ynew<yori){
                game = game+ "相"+(xori+1)+"退"+(xnew+1) + "\n"
            }else{
                game = game+ "相"+(xori+1)+"进"+(xnew+1) + "\n"
            }
        }else{
            if(ynew<5){
                return false;
            }
            if(ynew>yori){
                game = game+ "相"+(xori+1)+"退"+(xnew+1) + " "
            }else{
                game = game+ "相"+(xori+1)+"进"+(xnew+1) + " "
            }
        }
        if((((yori-ynew)*(yori-ynew)+(xori-xnew)*(xori-xnew))==8)&&(board[(yori+ynew)/2][(xori+xnew)/2]==0)){
            return true;
        }
    }else if(type.toUpperCase()=="B"){
        if(type == "B"){
            if(ynew<yori){
                return false;
            }
            if(yori<5){
                if(xnew!=xori){
                    return false;
                }
            }
        }else{
            if(ynew>yori){
                return false;
            }
            if(yori>4){
                if(xnew!=xori){
                    return false;
                }
            }
        }
        if(ynew!=yori){
            game = game + "兵" + (xori+1) + "进" + 1
        }else{
            game = game + "兵" + (xori+1) + "平" + (xnew+1)
        }
        if(type == "B"){
            game = game + "\n"
        }else{
            game = game + " "
        }
        if((((yori-ynew)*(yori-ynew)+(xori-xnew)*(xori-xnew))==1)){
            return true;
        }
    }else if(type.toUpperCase()=="C"){
        if((xori!=xnew)&&(yori!=ynew)){
            return false;
        }
        if(xori==xnew){
            if(yori>ynew){
                for(var q=ynew+1;q<=yori;q++){
                    if(board[q][xori]!=0){
                        return false
                    }
                }
                if(type == "c"){
                    game = game + "车" + (xori+1) + "进" + (yori-ynew) + " ";
                }else{
                    game = game + "车" + (xori+1) + "退" + (yori-ynew)+ "\n";
                }
            }else{
                for(var q=yori+1;q<ynew;q++){
                    if(board[q][xori]!=0){
                        return false
                    }
                }
                if(type == "C"){
                    game = game + "车" + (xori+1) + "进" + (ynew-yori)+ "\n";
                }else{
                    game = game + "车" + (xori+1) + "退" + (ynew-yori)+" ";
                }
            }
        }if(yori==ynew){
            if(xori>xnew){
                for(var q=xnew+1;q<=xori;q++){
                    if(board[yori][q]!=0){
                        return false
                    }
                }
            }else{
                for(var q=xori+1;q<xnew;q++){
                    if(board[yori][q]!=0){
                        return false
                    }
                }
            }
            game = game + "车" + (xori+1) + "平" + (xnew+1);
            if(type == "c"){
                game = game + " "
            }else{
                game = game + "\n"
            }
        }
        return true;
    }else if((type.toUpperCase()=="P")){
        if(((xori!=xnew)&&(yori!=ynew))||((xori==xnew)&&(yori==ynew))){
            return false;
        }
        if(board[ynew][xnew]==0){
            if(xori==xnew){
                if(yori>ynew){
                    for(var q=ynew;q<=yori;q++){
                        if(board[q][xori]!=0){
                            return false
                        }
                    }
                    if(type == "P"){
                        game = game + "炮" + (xori+1) + "退" + (yori-ynew)+ "\n";
                    }else{
                        game = game + "炮" + (xori+1) + "进" + (yori-ynew)+" ";
                    }
                }else{
                    for(var q=yori+1;q<=ynew;q++){
                        if(board[q][xori]!=0){
                            return false
                        }
                    }
                    if(type == "P"){
                        game = game + "炮" + (xori+1) + "进" + (ynew-yori)+ "\n";
                    }else{
                        game = game + "炮" + (xori+1) + "退" + (ynew-yori)+" ";
                    }
                }
            }if(yori==ynew){
                if(xori>xnew){
                    for(var q=xnew;q<=xori;q++){
                        if(board[yori][q]!=0){
                            return false
                        }
                    }
                }else{
                    for(var q=xori+1;q<=xnew;q++){
                        if(board[yori][q]!=0){
                            return false
                        }
                    }
                }
                game = game + "炮" + (xori+1) + "平" + (xnew+1);
                if(type =="P"){
                    game = game + "\n";
                }else{
                    game = game + " ";
                }
            }
            return true;
        }else{
            middle = 0
            if(xori==xnew){
                if(yori>ynew){
                    for(var q=ynew+1;q<=yori;q++){
                        if(board[q][xori]!=0){
                            middle = middle +1;
                        }
                    }
                }else{
                    for(var q=yori+1;q<ynew;q++){
                        if(board[q][xori]!=0){
                            middle = middle +1;
                        }
                    }
                }
            }if(yori==ynew){
                if(xori>xnew){
                    for(var q=xnew+1;q<=xori;q++){
                        if(board[yori][q]!=0){
                            middle = middle +1;
                        }
                    }
                }else{
                    for(var q=xori+1;q<xnew;q++){
                        if(board[yori][q]!=0){
                            middle = middle +1;
                        }
                    }
                }
            }
            if(middle==1){
                if(yori==ynew){
                    game = game + "炮" + (xori+1) + "平" + (xnew+1);
                    if(type =="P"){
                        game = game + "\n";
                    }else{
                        game = game + " ";
                    }
                }else{
                    if(yori>ynew){
                        if(type == "P"){
                            game = game + "炮" + (xori+1) + "退" + (yori-ynew)+ "\n";
                        }else{
                            game = game + "炮" + (xori+1) + "进" + (yori-ynew)+" ";
                        }
                    }else{
                        if(type == "P"){
                            game = game + "炮" + (xori+1) + "进" + (ynew-yori)+ "\n";
                        }else{
                            game = game + "炮" + (xori+1) + "退" + (ynew-yori)+" ";
                        }
                    }
                }
                return true;
            }else{
                return false;
            }
        }
    }
}
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
            if(typeofarmy(type)==returnturn()){
                board[selectedy][selectedx] = 0;
                drawcanvas();
                selected = true;
            }
        }
    }else{
        if(isvalid(type,selectedy,selectedx,arrayy,arrayx)){
            selectedx = arrayx;
            selectedy = arrayy;
            board[selectedy][selectedx] = type;
            drawcanvas();
            selected = false;
            turn = turn +1;
            document.getElementById("textmove").value = game;
        }
    }
});