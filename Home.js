import React from 'react'
import BookPanel from './BookPanel'
import Search from './Search'
import SwipeableTemporaryDrawer from './Menu'
import SimpleList from './Menu';
import EnhancedTable from "./Table";
import StudentsPage from './StudentsPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function Home() {

    return (
        <body>
            <container>
            <img src class = "logo" />
            <div class="space">
                <Search />
                
            </div>
            </container>
        </body>
    )
}

export default Home