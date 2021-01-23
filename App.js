import React from 'react'
import BookPanel from './BookPanel'
import Search from './Search'
import SwipeableTemporaryDrawer from './Menu'
import SimpleList from './Menu';
import StudentsPage from './StudentsPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from "./Nav";
import Home from "./Home";
import students from './students';
import EnhancedTable from "./StudentTable"
import Records from "./Records";

function App() {


  return (
    <Router>
      <body>
      <SimpleList />
      <Records/>
        <div>
          <Switch>
            <Route path="/Nav" component ={Nav}/>
            <Route path="/" exact component={Home} />
            <Route path="/studentspage" component={StudentsPage} />
            <Route path="/students" component={students} />
          </Switch>
        </div>
      </body>

    </Router>
  )
}



export default App;