var express = require('express');
var app=express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Music");
var db= mongoose.connection;
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());

// Set Static Folder
app.use(express.static(__dirname + '/public/'));
/*
db.once('open', function () {
    console.log('open');
    var gfs = Grid(db.db);

    // streaming to gridfs
    //filename to store in mongodb
    var writestream = gfs.createWriteStream({
        filename: 'mongo_song.mp3'
    });
    fs.createReadStream('/home/akshay/Music/Jab\ Tak\ -\ M.S.\ Dhoni.mp3').pipe(writestream);

    writestream.on('close', function (file) {
        // do something with `file`
        console.log(file.filename + 'Written To DB');
    });
    var fs_write_stream = fs.createWriteStream('write.mp3');

//read from mongodb
    var readstream = gfs.createReadStream({
        filename: 'mongo_song.mp3'
    });
    readstream.pipe(fs_write_stream);
    fs_write_stream.on('close', function () {
        console.log('file has been written fully!');
    });
});
*/
app.get('/getMusic',function (req,res) {
    res.header('Access-Control-Allow-Origin','*');
    res.sendFile('/write.mp3',{root:__dirname});
});
app.get('/getMusic1',function (req,res) {
    res.header('Access-Control-Allow-Origin','*');
    res.sendFile('/guitar1.mp3',{root:__dirname});
});
app.listen(3000,function () {
        console.log("Listening");
});






//=================================MIDDLE WARE===================================
// let io = require('socket.io')(http);
//  io.on('connection', (socket) => { 
//      console.log('user connected'); 
//      socket.on('disconnect', function(){ 
//          console.log('user disconnected'); 
//         }); 
//         socket.on('add-message', (message) => { 
//             io.emit('message', {type:'new-message', text: message}); 
//         }); 
//     }); 
//     http.listen(5000, () => { 
//         console.log('started on port 5000'); 
//     });
