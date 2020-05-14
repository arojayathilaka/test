import React, { Component } from "react";
import axios from 'axios';
import swal from 'sweetalert';

const Category = props => (
    <div className="nav flex-column nav-pills" aria-orientation="vertical">
        <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile"
           role="tab" aria-controls="v-pills-profile" aria-selected="false">{props.category.categoryname}</a>
    </div>
)

class StoreManagerLogin extends Component{

    constructor(props) {
        super(props);

        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.sweetalertfunction = this.sweetalertfunction.bind(this);

        this.state ={
            email:'',
            password:'',
            isLogin: false,
            categories: []
        }
    }

    componentDidMount() {
        axios.post('http://localhost:5000/userDetails/getCategories')
            .then(response =>{
                this.setState({categories: response.data})
            })
            .catch((error) =>{
                console.log(error);
            })
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

    categoriesList(){
        return this.state.categories.map(currentcategory =>{
            return <Category category={currentcategory}/>
        })
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
            email: this.state.email,
            password: this.state.password
        }

        console.log(storemanager);

        axios.post('http://localhost:5000/userDetails/signin', storemanager)
            .then(res => {
                if (res.data.success === true){
                    this.sweetalertfunction();
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
            return(
                <div className="row">
                    <div className="col-3">
                        <div className="nav flex-column nav-pills" aria-orientation="vertical">
                            <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home"
                               role="tab" aria-controls="v-pills-home" aria-selected="true">Categories</a>
                            <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile"
                               role="tab" aria-controls="v-pills-profile" aria-selected="false">{this.categoriesList()}</a>
                        </div>
                    </div>
                </div>
            );
        }
        return(
            <div className="container">
                <h3>Store Manager Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Enter Email:</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.email}
                               onChange={this.onChangeUserEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Enter Password:</label>
                        <input type="password"
                               className="form-control"
                               value={this.state.password}
                               onChange={this.onChangeUserPassword}
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

export default StoreManagerLogin;