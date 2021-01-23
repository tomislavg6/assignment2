import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

function Records() {

    const [studentName, setStudentName] = React.useState('');
    const [studentId, setstudentID] = React.useState('');
    const [courseName, setcourseName] = React.useState('');
    const [courseId, setcourseID] = React.useState('');

    const buttonstyle = {
        blue: {
            background: 'linear-gradient(20deg, #115293 30%, #4791db 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 48,
            padding: '0 30px',
        },
    };

    const bodystyle = {
        body: {
            padding: '2%',
        }
    }


    function fetchStudentRecords() {
        axios.get('http://localhost:8080/students')
            .then((response) => {
                // handle success
                var resData = response.data;
                let data = JSON.stringify(resData, null, "");
                window.alert(data);
            });
    }


    function addStudent() {
        const value = {
            studentName: studentName,
            studentId: studentId,
            courseName: courseName,
            courseId: courseId,
        };

        axios.post('http://localhost:8080/addStudent', value)
            .then((response) => {
                // handle success
                var resData = response.data;
                let data = JSON.stringify(resData);
                window.alert("Response recieved from server = " + data);
            });
    }



    function deleteStudent() {
        axios.delete(`http://localhost:8080/deleteStudent/${studentName}`)
            .then((response) => {
                // handle success
                var resData = response.data;
                let data = JSON.stringify(resData);
                window.alert("Response recieved from server = " + data);
            });
    }



   /*  function updateBook() {
        const value = {
            name: studentName,
            studentId: studentId,
            courseName: courseName
        };
        axios.put(`http://localhost:8080/updateBook/${studentName}`, value)
            .then((response) => {
                // handle success
                var resData = response.data;
                let data = JSON.stringify(resData);
                window.alert("Response recieved from server = " + data);
            });
    }

 */
    function displayStudentRecords() {
        fetchStudentRecords();
    }

    function saveStudentHandler() {
        addStudent();
    }


    function deleteStudentHandler() {
        deleteStudent();
    }
/* 
    function updateBookHandler() {
        updateBook();
    }
 */
    return (
        <html>
            <head>
                <style>
                </style>
            </head>

            <body style={bodystyle.body}>
                <div>
                    <input type="text" placeholder='Student Name' value={studentName} onChange={e => setStudentName(e.target.value)} />
                    <br />
                    <input type="text" placeholder='studentId' value={studentId} onChange={e => setstudentID(e.target.value)} />
                    <br />
                    <input type="text" placeholder='courseName' value={courseName} onChange={e => setcourseName(e.target.value)} />
                    <br />
                    <button onClick={saveStudentHandler}>Save Student</button>
                    <br />
                    <button onClick={deleteStudentHandler}>Delete Student</button>
                    <br />
                   {/*  <button onClick={updateBookHandler}>Update Student</button> */}
                    <br />
{/*                     <h3>Show Books:</h3> */}
                    <Button style={buttonstyle.blue} onClick={displayStudentRecords}>Show students</Button>
                </div>
            </body>
        </html>

    );

}

export default Records;
