import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

function BookPanel() {

    const [bookName, setBookName] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [publisher, setPublisher] = React.useState('');
    
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


    function fetchBookRecords(){
        axios.get('http://localhost:8080/books')
        .then( (response) => {
            // handle success
            var resData = response.data;
            let data = JSON.stringify(resData);
            window.alert("Response recieved from server = " + data);
        });
    }


    function saveBook(){
        const value = {
            name: bookName,
            author: author,
            publisher: publisher
        };

        axios.post('http://localhost:8080/book', value)
        .then( (response) => {
            // handle success
            var resData = response.data;
            let data = JSON.stringify(resData);
            window.alert("Response recieved from server = " + data);
        });
    }



    function deleteBook(){
        axios.delete(`http://localhost:8080/deleteBook/${bookName}`)
        .then( (response) => {
            // handle success
            var resData = response.data;
            let data = JSON.stringify(resData);
            window.alert("Response recieved from server = " + data);
        });
    }


    
    function updateBook(){
        const value = {
            name: bookName,
            author: author,
            publisher: publisher
        };
        axios.put(`http://localhost:8080/updateBook/${bookName}`, value)
        .then( (response) => {
            // handle success
            var resData = response.data;
            let data = JSON.stringify(resData);
            window.alert("Response recieved from server = " + data);
        });
    }


    function displayBookHandler(){
        fetchBookRecords();
    }

    function saveBookHandler(){
        saveBook();
    }


    function deleteBookHandler(){
        deleteBook();
    }

    function updateBookHandler(){
        updateBook();
    }

    return (
        <html>
            <head>
                <style>
                </style>
            </head>

        <body style={bodystyle.body}>
            <div>
                <input type="text" placeholder='Book Name' value ={bookName} onChange ={e => setBookName(e.target.value) }/>
                <br/>
                <input type="text" placeholder='author' value ={author} onChange ={e => setAuthor(e.target.value) }/>
                <br/>
                <input type="text" placeholder='publisher' value ={publisher} onChange ={e => setPublisher(e.target.value) }/>
                <br/>            
                <button onClick={saveBookHandler}>Save Book</button> 
                <br/>
                <button onClick={deleteBookHandler}>Delete Book</button> 
                <br/>
                <button onClick={updateBookHandler}>Update Book</button> 
                <br/>            
                <h3>Show Books:</h3>
                <Button style={buttonstyle.blue} onClick={displayBookHandler}>Display Books</Button> 
            </div>
        </body>
        </html>
            
    );

}

export default BookPanel;
