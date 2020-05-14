import React, { Component } from "react";
import axios from 'axios';
import swal from 'sweetalert';

class AddStoreManager extends Component{

    constructor(props) {
        super(props);

        this.onChangeUserID = this.onChangeUserID.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserContact = this.onChangeUserContact.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            userid:0,
            username:'',
            contact:0,
            email:'',
            password:'',
        }

    }

    onChangeUserID(e){
        this.setState({
            userid: e.target.value
        });
    }

    onChangeUserName(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangeUserContact(e){
        this.setState({
            contact: e.target.value
        });
    }

    onChangeUserEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    onChangeUserPassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const storemanager = {
            userid: this.state.userid,
            username: this.state.username,
            contact: this.state.contact,
            email: this.state.email,
            password: this.state.password
        }

        console.log(storemanager);

        axios.post('http://localhost:5000/userDetails/add', storemanager)
            .then(res => {
                if (res.data.success === true) {
                    swal({
                        title: "Store Manager Added",
                        text: "You are Successfully Added Store Manager Details.",
                        icon: "success",
                        button: true,
                    });
                }
                if (res.data.success === false) {
                    swal({
                        title: "Store Manager Details Not Added!",
                        text: res.data.message,
                        icon: "error",
                        button: true,
                        dangerMode: true,
                    });
                }
            });

    }

    render() {
        return(
            <div className="container">
               <h3>Add a new Store Manager here</h3>
               <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                       <label>Store Manager ID:</label>
                       <input type="text"
                              className="form-control"
                              value={this.state.userid}
                              onChange={this.onChangeUserID}
                              />
                   </div>
                   <div className="form-group">
                       <label>Store Manager Name:</label>
                       <input type="text"
                              className="form-control"
                              value={this.state.username}
                              onChange={this.onChangeUserName}
                       />
                   </div>
                   <div className="form-group">
                       <label>Store Manager Contact:</label>
                       <input type="text"
                              className="form-control"
                              value={this.state.contact}
                              onChange={this.onChangeUserContact}
                       />
                   </div>
                   <div className="form-group">
                       <label>Store Manager Email:</label>
                       <input type="text"
                              className="form-control"
                              value={this.state.email}
                              onChange={this.onChangeUserEmail}
                       />
                   </div>
                   <div className="form-group">
                       <label>Store Manager Password:</label>
                       <input type="password"
                              className="form-control"
                              value={this.state.password}
                              onChange={this.onChangeUserPassword}
                       />
                   </div>
                   <div className="form-group">
                        <input type="submit" value="Add Store Manager" className="btn btn-primary"/>
                   </div>
               </form>
            </div>
        );
    }
}

export default AddStoreManager;