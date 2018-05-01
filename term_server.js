var express = require('express');
var fs = require('fs');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Global_values = {
    ing: 0,
    random_ing: 0,
    random_check: 0,
    eventSave: null,
    isIntervalPlaying: 0,
    head_location: "0.000",
    tail_count: -1,
    check: 0,
    name_count: 2,
    move: 0,
    SleepTIme: 100,
    bomb_count: 0,
    fast_count: 0,
    slow_count: 0,
    long_count: 0
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
  res.sendfile("term_client.html");
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

io.on('connection', function(socket){
  count++;
  console.log('user connected: ', socket.id);
  //var name = "user" + count++;
  //io.to(socket.id).emit('change name',name);

  socket.on('disconnect', function(){
    count--;
    console.log('user disconnected: ', socket.id);
  });

  socket.on('map size', function(map_size){
    console.log("mapsize:",map_size);
  });
  socket.on('crt table', function (cr_tab, input) {
    console.log("cyka:",cr_tab);
    io.emit('created table',cr_tab, input);
  });
  socket.on('move loc', function (head_location, imge) {
    io.emit('moved loc', head_location, imge);
  });

});

http.listen('3000', function(){
  console.log("server on!");
});
