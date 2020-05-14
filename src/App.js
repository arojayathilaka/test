import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Navbar from "./components/navbar";
import AddStoreManager from "./components/add-storemanager";
import UpdateStoreManager from "./components/update-storemanager";
import DeleteStoreManager from "./components/delete-storemanager";
import ViewStoreManager from "./components/view-storemanager";
import StoreManagerLogin from "./components/storemanager-login";
import AdminLogin from "./components/admin-login";
import AddCategory from "./components/add-category";

function App() {
  return (
      <Router>
        <Navbar />
        <br/>
        <br/>
        <Route path="/adminLogin" component={AdminLogin} />
        <Route path="/addCategory" component={AddCategory} />
        <Route path="/smLogin" component={StoreManagerLogin} />
        <Route path="/viewSM" component={ViewStoreManager} />
        <Route path="/addSM" component={AddStoreManager} />
        <Route path="/updateSM/:id" component={UpdateStoreManager} />
        <Route path="/deleteSM/:id" component={DeleteStoreManager} />
      </Router>
  );
}

export default App;
