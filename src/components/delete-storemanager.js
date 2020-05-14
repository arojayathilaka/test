import React, { Component } from "react";
import axios from 'axios';
import swal from 'sweetalert';

class DeleteStoreManager extends Component{

    constructor(props) {
        super(props);

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
        swal({
            title: "Are you sure?",
            text: "You want to Delete "+storemanager.username+" Store Manager.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post('http://localhost:5000/userDetails/delete', storemanager)
                        .then(res => {
                            if (res.data.success === true){
                                swal("Poof! This Store Manager is Deleted!", {
                                    icon: "success",
                                    buttons: "success",
                                });
                            }
                        });
                } else {
                    swal("This Store Manager is not Deleted!", {
                        icon: "success",
                        buttons: "success",
                    });
                }
            });
    }

    render() {
        return(
            <div className="container">
                <h3>Delete Store Manager</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Store Manager ID: </label>
                        <input type="text" className="form-control" value={this.state.userid} readOnly/>
                    </div>
                    <div className="form-group">
                        <label>Store Manager Name: </label>
                        <input type="text" className="form-control" value={this.state.username} readOnly/>
                    </div>
                    <div className="form-group">
                        <label>Store Manager Contact: </label>
                        <input type="text" className="form-control" value={this.state.contact} readOnly/>
                    </div>
                    <div className="form-group">
                        <label>Store Manager Email: </label>
                        <input type="text" className="form-control" value={this.state.email} readOnly/>
                    </div>
                    <div className="form-group">
                        <label>Store Manager Password: </label>
                        <input type="password" className="form-control" value={this.state.password} readOnly/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Delete StoreManagers" className="btn btn-danger"/>
                    </div>
                </form>
            </div>

        );
    }
}

export default DeleteStoreManager;