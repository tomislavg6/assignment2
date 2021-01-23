var express = require("express")
var cors = require('cors');
var bodyParser = require("body-parser");
var db = require("./database.js")
var app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8080

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});


// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" })
});



// list all students
app.get("/students", (req, res, next) => {
    console.log("SELECT students");
    let sql = `SELECT studentName, studentID, courseName, courseID FROM students ORDER BY studentName`;
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.send(JSON.stringify(rows, null, ""));
    });
});

// Get a single students by name
app.get("/students/:studentName", (req, res, next) => {
    var sql = "select * from students where name = ?"
    var params = [req.params.name]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    });
});

//Create new student
    
    app.post("/addstudent", (req, res, next) => {

        console.log(req.body);
        var errors = []
        var insert = 'INSERT INTO students (studentName, studentId, courseName, courseId) VALUES (?,?,?,?)'
        var params = [req.body.studentName, req.body.studentId, req.body.courseName, req.body.courseId]
       
    
        db.run(insert, params);
    
        if (!req.body.name) {
            errors.push("Name for students not specified");
        }
        if (errors.length) {
            res.status(400).json({ "error": errors.join(",") });
            return;
        }
        console.log("ADDED STUDENT: " + req.body.studentName);
    });


/*  var data = {
     studentName: req.body.studentName,
     studentId: req.body.studentId,
     courseName: req.body.courseName,
     courseId: req.body.courseId,
 }
 var insert ='INSERT INTO students (studentName, studentId, courseName, courseId) VALUES (?,?,?,?)'
 var params =[req.body.studentName, req.body.studentId, req.body.courseName, req.body.courseId] 
 console.log("parameters created" + params);
 db.run(insert, [params]);
 db.run(sql, params, function (err, result) {
     if (err){
         res.status(400).json({"error": err.message})
         return;
     }
     res.json({
         "message": "success",
         "data": data,
         "id" : this.lastID
     })
 }); */



// update students
// we use COALESCE function to keep the current value if there is no new value (null)
/* app.put("/updateStudent/:name", (req, res, next) => {
    console.log("UPDATE students:" + req.params.name);
    var data = {
        name: req.body.name,
        author: req.body.author,
        publisher: req.body.publisher
    }
    console.log("UPDATE students: data.name = " + data.name);
    db.run(
        `UPDATE students set 
           name = COALESCE(?,name), 
           author = COALESCE(?,author),
           publisher = COALESCE(?,publisher)  
             WHERE name = ?`,
        [data.name, data.author, data.publisher, req.params.name],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
}) */
//
// delete
/* app.delete("/deleteStudent/:name", (req, res, next) => {

    console.log("DELETE Student:" + req.params.name);
    var remove = 'DELETE FROM students WHERE name = ?'
    db.run(remove, req.params.name)

        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", changes: this.changes })
        });
}) */


// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});