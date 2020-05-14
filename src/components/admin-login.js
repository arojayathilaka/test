import React, { Component } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import {Link} from "react-router-dom";

const goAdminPages = (
    <div className="form-group">
        <Link to={"/viewSM"}><input type="submit" value="View Store Managers" className="btn btn-primary"/>   </Link>
        <Link to={"/addSM"}><input type="submit" value="Add Store Managers" className="btn btn-success" />   </Link>
        <Link to={"/addCategory"}><input type="submit" value="Add Category" className="btn badge-danger" /></Link>
    </div>
)

class AdminLogin extends Component{

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeUserpassword = this.onChangeUserpassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.sweetalertfunction = this.sweetalertfunction.bind(this);

        this.state = {
            name: '',
            password: '',
            isLogin: false
        }
    }

    onChangeUsername(e){
        this.setState({
            name: e.target.value
        });
    }

    onChangeUserpassword(e){
        this.setState({
            password: e.target.value
        });
    }

    adminPages(){
        return (goAdminPages);
    }

    sweetalertfunction(){
        swal({
            title: "Login!",
            text: "You are Successfully Login!",
            icon: "success",
            button: true,
        }).then(()=>{
            this.setState({
                isLogin: true
            });
        });
    }

    onSubmit(e){
        e.preventDefault();

        const storemanager = {
            name: this.state.name,
            password: this.state.password
        }
        console.log(storemanager);

        axios.post('http://localhost:5000/userDetails/admin', storemanager)
            .then(res => {
                if (res.data.success === true){
                    this.sweetalertfunction()
                }
                else if(res.data.success === false){
                    swal({
                        title: "Login Error!",
                        text: res.data.message,
                        icon: "error",
                        button: true,
                        dangerMode: true,
                    });
                }
            });
    }

    render() {
        if (this.state.isLogin){
            return (
                <div className="container">
                    <h3>Admin Home Page</h3>
                    <br/>
                    {this.adminPages()}
                </div>
            );
        }
        return(
            <div className="container">
                <h3>Admin Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Enter Username:</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.name}
                               onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Enter Password:</label>
                        <input type="password"
                               className="form-control"
                               value={this.state.password}
                               onChange={this.onChangeUserpassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }

}

export default AdminLogin;