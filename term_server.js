
var express       = require('express'); //일종의 프레임웤 ->파싱,세션관리..한꺼번에 저공
var fs            = require('fs'); //파일 읽고쓰기
var app           = express();
var http          = require('http').Server(app); //웹서버 객체 생성
var io            = require('socket.io').listen(http);

var Global_values = {
    ing               : 0,
    random_ing        : 0,
    random_check      : 0,
    eventSave         : null,
    isIntervalPlaying : 0,
    head_location     : "0.000",
    tail_count        : -1,
    check             : 0,
    name_count        : 2,
    move              : 0,
    SleepTIme         : 100,
    bomb_count        : 0,
    fast_count        : 0,
    slow_count        : 0,
    long_count        : 0
};

//ing변수의         경우 Interval 제어(정지)를 위해 생성
//random_ing변수    경우 Random_Interval 제어(정지)를 위해 생성
//random_check변수  경우 랜덤 쓰래드가 한번이상 실행되는걸 막기위해 생성
//eventSave변수의   경우 클릭시, event객체를 잡아두기위해 생성
//isIntervalPlaying 경우 실행도중 다른 방향키를 입력받았을시 interval제어를 위해 생성
//head_location     경우 머리의 위치 표시
//tail_location     경우 꼬리의 위치 표시 -> 시작은 머리와 같음
//check의           경우 보드판 감추기에 실행읠 막기위해 생성
//name_count의      경우 속성name으로 꼬리 조작 -> 버그방지를위해 3부터 시작

app.get("/",function(req, res){
  res.sendFile(__dirname +"/"+"term_client.html");
});

//서버단에서 사진 가져오기 blank
app.get("/blank",function(req, res){
  fs.readFile('blank.png', function (error,data) {
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  });
});

//boom
app.get("/boom",function(req, res){
  fs.readFile('boom.png', function (error,data) {
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  });
});

//fast
app.get("/fast",function(req, res){
  fs.readFile('fast.png', function (error,data) {
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  });
});

//head
app.get("/head",function(req, res){
  fs.readFile('head.png', function (error,data) {
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  });
});

//my_head
app.get("/my_head",function(req, res){
  fs.readFile('my_head.png', function (error,data) {
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  });
});

//long_item
app.get("/long_item",function(req, res){
  fs.readFile('long_item.png', function (error,data) {
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  });
});

//slow
app.get("/slow",function(req, res){
  fs.readFile('slow.png', function (error,data) {
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  });
});

//tail
app.get("/tail",function(req, res){
  fs.readFile('tail.png', function (error,data) {
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  });
});

//접속한 클라이언트수
var count = 0;

//유저가 접속 했을시,
io.on('connection', function(socket){
  count++;
  console.log('user connected: ', socket.id);

  //var name = "user" + count++;
  //io.to(socket.id).emit('change name',name);

  //접속이 끊겼을 시,
  socket.on('disconnect', function(){
    count--;
    console.log('user disconnected: ', socket.id);
  });

  //최초 맵 생성시, 유저들 맵 동기화
  socket.on('map size', function(map_size){
    console.log("mapsize:",map_size);
  });

  //테이블  생성시, 유저들 맵 동기화
  socket.on('crt table', function (cr_tab, input) {
    io.emit('created table',cr_tab, input);
    //나포함 모든 소켓에게 전송
  });

  //몸통 움직임 유저들에게 뿌려주기
  socket.on('move loc', function (head_location, imge) {
    //나를 제외한 모든 소켓에게 전송
    socket.broadcast.emit('moved loc', head_location, imge);
  });

  //꼬리 움직임 유저들에게 뿌려주기
  socket.on('tail move', function (tail_point) {
    socket.broadcast.emit('tail moved', tail_point);
  });
});

//포트번호 3000
http.listen('3000', function(){
  console.log("server on!");
});
