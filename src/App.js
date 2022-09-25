import React, { Fragment } from "react"
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom"
import loadable from '@loadable/component'
import "./static/styles.scss"
const Main = loadable(() => import('./pages/Main'));
const LogIn = loadable(() => import('./pages/LogIn'));
const ArticleDetails = loadable(() => import('./pages/ArticleDetails'));
const DiscourceMsg = loadable(() => import('./pages/DiscourceMsg'));
const Register = loadable(() => import('./pages/Register'));



function App() {

  // console.log(params.get('access_token'))
  return (
    <Router>
      <Fragment>
        {/* <SideBar /> */}
        {/* <Rescategorys/> */}
        <Routes>
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/register" element={<Register />} />


          
          <Route exact path="/" element={<Main />} />
          <Route exact path="/article/:articleId" element={<ArticleDetails />} />
          <Route exact path="/discource/:id" element={<DiscourceMsg />} />
        </Routes>
      </Fragment>
    </Router>


  );
}

export default App;
