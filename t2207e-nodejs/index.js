const express = require("express"); // Khai báo thư viện
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log("Server is running...");
});

// Share api access all
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// config to connect mysql
const configDB = {
    host: "139.180.186.20",
    port: 3306,
    database: "t2207e",
    user: "t2207e",
    password: "t2207e123", // mamp : "root" -- xampp: "" (ai dùng mamp thì điền là "root", còn dùng xampp thì để "")
    multipleStatements: true // cho phép sử dụng nhiều câu SQL 1 lần gửi yêu cầu
}

// connect to mysql
const mysql = require("mysql");
const conn = mysql.createConnection(configDB);

// api list all class
app.get("/get-classes", function (req, res){
   const sql = "select * from classes";
   conn.query(sql, function (err, data){
        if(err){
            res.send("404 not found");
        }
        else{
            res.send(data);
        }
   })
});

// api list all student
app.get("/get-students", function (req, res){
    const sql = "select * from students";
    conn.query(sql, function (err, data){
        if(err){
            res.send("404 not found");
        }
        else{
            res.send(data);
        }
    })
});

// lọc theo id
app.get("/student-by-class", function (req, res){
    const cid = req.query.id;
    const sql = "select * from students where id = " + cid;
    conn.query(sql, function (err, data){
        if(err){
            res.send("404 not found");
        }
        else{
            res.send(data);
        }
    })
});

// search student by name
app.get("/search-student-by-name", function (req, res){
    const name = req.query.name;
    const sql = `select * from students where name like '%${name}%' or email like '%${name}%'`;
    conn.query(sql, function (err, data){
        if(err){
            res.send("404 not found");
        }
        else{
            res.send(data);
        }
    })
});

// search students by class name
app.get("/search-students-by-class-name", function (req, res){
    const classes = req.query.n;
    const sql = `select * from students where id in (select id from classes where name like '%${classes}%')`;
    conn.query(sql, function (err, data){
        if(err){
            res.send("404 not found");
        }
        else{
            res.send(data);
        }
    })
});

// get 1 student by id
app.get("/detail-student", function (req, res){
    const sid = req.query.id;
    const sql = `select * from students where sid = ${sid}`;
    conn.query(sql, function (err, data){
        if(err){
            res.status(403).send("404 not found");
        }
        else if(data.length > 0){
            res.send(data[0]);
        }
        else {
            res.status(404).send("404 not found");
        }
    })
});

app.get("/student", function (req, res) {
    // liệt kê sinh viên
    res.send("Student with GET");
});
app.post("/student", function (req, res) {
    // thêm 1 sinh viên
    res.send("Student with POST");
});
app.put("/student", function (req, res) {
    // update sinh viên
    res.send("Student with PUT");
});
app.delete("/student", function (req, res) {
    // delete sinh viên
    res.send("Student with DELETE");
});