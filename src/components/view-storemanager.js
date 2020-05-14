import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const StoreManager = props => (
    <tr>
        <td>{props.storemanager.userid}</td>
        <td>{props.storemanager.username}</td>
        <td>{props.storemanager.contact}</td>
        <td>{props.storemanager.email}</td>
        <td>
            <Link to={"/updateSM/"+props.storemanager._id}>edit / </Link><Link to={"/deleteSM/"+props.storemanager._id}>delete</Link>
        </td>
    </tr>
);


class ViewStoreManager extends Component{

    constructor(props) {
        super(props);

        this.state = {userDetails: []}
    }

    componentDidMount() {
        axios.get('http://localhost:5000/userDetails/')
            .then(response => {
                this.setState({userDetails: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    storeManagerList(){
        return this.state.userDetails.map(currentstoremanager =>{
            return <StoreManager storemanager={currentstoremanager} key={currentstoremanager._id}/>
        })
    }

    render() {
        return(
            <div className="container">
                <h3>Current Store Managers</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Store manager ID</th>
                        <th>Store manager Name</th>
                        <th>Store manager Contact</th>
                        <th>Store manager Email</th>
                        <th>Update/Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.storeManagerList() }
                    </tbody>
                </table>
            </div>

        );
    }
}

export default ViewStoreManager;