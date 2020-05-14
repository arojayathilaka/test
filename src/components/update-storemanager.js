import React, { Component } from "react";
import axios from 'axios';
import swal from 'sweetalert';

class UpdateStoreManager extends Component{

    constructor(props) {
        super(props);

        this.onChangeUserid = this.onChangeUserid.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeUsercontact = this.onChangeUsercontact.bind(this);
        this.onChangeUseremail = this.onChangeUseremail.bind(this);
        this.onChangeUserpassword = this.onChangeUserpassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            userid: 0,
            username: '',
            contact: 0,
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/userDetails/'+this.props.match.params.id)
            .then(response =>{
                this.setState({
                    userid: response.data.userid,
                    username: response.data.username,
                    contact: response.data.contact,
                    email: response.data.email,
                    password: response.data.password,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeUserid(e){
        this.setState({
            userid: e.target.value
        });
    }
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangeUsercontact(e){
        this.setState({
            contact: e.target.value
        });
    }
    onChangeUseremail(e){
        this.setState({
            email: e.target.value
        });
    }
    onChangeUserpassword(e){
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
        axios.put('http://localhost:5000/userDetails/update', storemanager)
            .then(res => {
                if (res.data.success === true) {
                    swal({
                        title: "Store Manager Updated",
                        text: "You are Successfully Updated Store Manager Details.",
                        icon: "success",
                        button: true,
                    });
                }
                if (res.data.success === false) {
                    swal({
                        title: "Store Manager Details Not Updated!",
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
                <h3>Update Store Manager</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Store Manager ID: </label>
                        <input type="text" className="form-control" value={this.state.userid} readOnly/>
                    </div>
                    <div className="form-group">
                        <label>Store Manager Name: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Store Manager Contact: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.contact}
                               onChange={this.onChangeUsercontact}
                        />
                    </div>
                    <div className="form-group">
                        <label>Store Manager Email: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.email}
                               onChange={this.onChangeUseremail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Store Manager Password: </label>
                        <input type="password"
                               className="form-control"
                               value={this.state.password}
                               onChange={this.onChangeUserpassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update StoreManagers" className="btn btn-dark"/>
                    </div>
                </form>
            </div>

        );
    }
}

export default UpdateStoreManager;