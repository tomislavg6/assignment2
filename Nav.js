import React from 'react';
import './App.css';
import SimpleList from './Menu';
import Search from './Search'


function Nav() {

    return (
        <body>
            <SimpleList />
            <div class="space">
                {/* <Search /> */}
            </div>
        </body>
    )
}

export default Nav