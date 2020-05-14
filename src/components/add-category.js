import React, { Component } from "react";
import axios from 'axios';
import swal from 'sweetalert';

class AddCategory extends Component{

    constructor(props) {
        super(props);

        this.onChangeCategoryname = this.onChangeCategoryname.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            categoryname: ''
        }
    }

    onChangeCategoryname(e){
        this.setState({
            categoryname: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const category = {
            categoryname: this.state.categoryname,
        }

        console.log(category);

        axios.post('http://localhost:5000/userDetails/addCategory', category)
            .then(res => {
                if (res.data.success === true) {
                    swal({
                        title: "New Category Added",
                        text: "You are Successfully Added new Category.",
                        icon: "success",
                        button: true,
                    });
                }
                if (res.data.success === false) {
                    swal({
                        title: "Category Not Added!",
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
                <h3>Add Category Page</h3>
                <br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>New Category Name: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.categoryname}
                               onChange={this.onChangeCategoryname}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Category" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddCategory;