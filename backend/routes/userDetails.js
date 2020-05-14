const router = require('express').Router();
let userDetail = require('../models/userDetails.models');
let UserSession = require('../models/UserSession');
let Category = require('../models/Category');

router.route('/').get((req, res) => {
    userDetail.find()
        .then(userDetails => res.json(userDetails))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    userDetail.findById(req.params.id)
        .then(userDetails => res.json(userDetails))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/getCategories').post((req, res) => {
    Category.find()
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const userid = Number(req.body.userid);
    const username = req.body.username;
    const contact = Number(req.body.contact);
    let email = req.body.email;
    const password = req.body.password;

    if (!userid) {
        return res.send({
            success: false,
            message: 'Error: User ID cannot be blank.'
        });
    }

    if (!username) {
        return res.send({
            success: false,
            message: 'Error: User name cannot be blank.'
        });
    }

    if (!contact) {
        return res.send({
            success: false,
            message: 'Error: User contact cannot be blank.'
        });
    }

    if (!email) {
        return res.send({
            success: false,
            message: 'Error: User email cannot be blank.'
        });
    }

    if (!password) {
        return res.send({
            success: false,
            message: 'Error: User password cannot be blank.'
        });
    }

    console.log('here');

    email = email.toLowerCase();

    userDetail.find({
        email: email
    }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else if (previousUsers.length > 0) {
            //if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Account already exist.'
                });
            //}
        }
        const newUserDetails = new userDetail({
            userid,
            username,
            contact,
            email,
            password,
        });
        newUserDetails.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'new user added.'
            });
        })

    });
});

router.route('/addCategory').post((req, res) => {

    const categoryname = req.body.categoryname;

    if (!categoryname){
        return res.send({
            success: false,
            message: 'Category Name can not be blank.'
        });
    }

    console.log('here');

    Category.find({
        categoryname: categoryname
    },(err, previousCategory) =>{
        if(err){
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        else if(previousCategory.length > 0){
            return res.send({
                success: false,
                message: 'this category is also exist.'
            });
        }
        else{
            const newCategoryDetails = new Category({
                categoryname,
            });
            newCategoryDetails.save((err, category) => {
                if(err){
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'new category added.'
                });
            })
        }
    });

});

router.route('/update').put((req, res) => {
    const userid = Number(req.body.userid);
    const username = req.body.username;
    const contact = Number(req.body.contact);
    let email = req.body.email;
    const password = req.body.password;

    if (!userid) {
        return res.send({
            success: false,
            message: 'Error: User ID cannot be blank.'
        });
    }

    if (!username) {
        return res.send({
            success: false,
            message: 'Error: User name cannot be blank.'
        });
    }

    if (!contact) {
        return res.send({
            success: false,
            message: 'Error: User contact cannot be blank.'
        });
    }

    if (!email) {
        return res.send({
            success: false,
            message: 'Error: User email cannot be blank.'
        });
    }

    if (!password) {
        return res.send({
            success: false,
            message: 'Error: User password cannot be blank.'
        });
    }

   console.log('here');

    userDetail.find({
        userid: userid
    }, (err, updateUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else if (updateUsers.length === 0) {
            //if (err) {
            return res.send({
                success: false,
                message: 'Error: User not found.'
            });
            //}
        }

        email = email.toLowerCase();

        const updateUser = updateUsers[0];

        userDetail.find({
            email: email,
        },(err, previousUsers) =>{

            if(err){
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            else if (previousUsers.length === 0){
                updateUser.userid = userid;
                updateUser.username = username;
                updateUser.contact = contact;
                updateUser.email = email;
                updateUser.password = password;
                console.log(updateUser.username);
                updateUser.save((err, user) => {
                    if(err){
                        return res.send({
                            success: false,
                            message: 'Error: Server error'
                        });
                    }
                    return res.send({
                        success: true,
                        message: 'User updated.'
                    });
                })
            }
            else if (!(previousUsers[0].userid === userid)){
                if(previousUsers.length > 0){
                    console.log('account exist');
                    return res.send({
                        success: false,
                        message: 'Error: Account already exist.'
                    });
                }
            }
            else{
                updateUser.userid = userid;
                updateUser.username = username;
                updateUser.contact = contact;
                updateUser.email = email;
                updateUser.password = password;

                updateUser.save((err, user) => {
                    if(err){
                        return res.send({
                            success: false,
                            message: 'Error: Server error'
                        });
                    }
                    return res.send({
                        success: true,
                        message: 'User updated.'
                    });
                })
            }
        });
    });
});

router.route('/delete').post((req, res) => {
    const userid = Number(req.body.userid);
    if (!userid){
        return res.send({
            success: false,
            message: 'Error: User ID can not be blank.'
        });
    }
    console.log('here');
    userDetail.find({
        userid: userid
    },(err, deleteUsers) =>{
        if(err){
            console.log(deleteUsers);
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        else if(deleteUsers.length === 0){
            return res.send({
                success: false,
                message: 'Error: User not found.'
            });
        }
        else{
            console.log('amanda');
            const id = deleteUsers[0]._id;
            userDetail.findByIdAndDelete(id)
                .then(() => {
                    return res.send({
                        success: true,
                        message: 'User deleted.'
                    });
                })
                .catch(err => res.status(400).json('Error: ' + err));
        }
    });
});

router.route('/signin').post((req, res) => {
    let email = req.body.email;
    const password = req.body.password;

    if (!email) {
        return res.send({
            success: false,
            message: 'Error: User email cannot be blank.'
        });
    }

    if (!password) {
        return res.send({
            success: false,
            message: 'Error: User password cannot be blank.'
        });
    }

    email = email.toLowerCase();

    userDetail.find({
        email: email
    },(err, users) => {
        if (err){
            console.log('err 2:', err);
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        if (users.length !== 1){
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }
        const user = users[0];
        console.log(user.password);
        console.log(password);
        /*if (!user.validPassword(password)){
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }*/
        if (!(user.password === password)){
            //console.log("you are not valid");
            return res.send({
                success: false,
                message: 'Error: Invalid password'
            });
        }
        const userSession = new UserSession();
        userSession.userId = user._id;
        console.log(userSession.userId);
        userSession.save((err, doc) => {
            if (err){
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Valid sign in',
            });
        });
    });

});

router.route('/admin').post((req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    if (!name){
        return res.send({
            success: false,
            message: 'Error: UserName can not be blank.'
        });
    }
    if (!password){
        return res.send({
            success: false,
            message: 'Error: Password can not be blank.'
        });
    }
    const username = "admin";
    const pass = "admin123";
    if (name === username && password === pass){
        return res.send({
            success: true,
            message: 'Login Successful.'
        });
    }
    else{
        return res.send({
            success: false,
            message: 'username or password is un matching.'
        });
    }
});

    /*const newUserDetails = new userDetail({
        userid,
        username,
        contact,
        email,
        password,
    });

    newUserDetails.save()
        .then(() => res.json('User Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:username').get((req, res) => {
    userDetail.findOne(req.body.username)
        .then(userDetails => res.json(userDetails))
        .catch(err => res.status(400).json('Error: ' + err));
});*/


module.exports = router;