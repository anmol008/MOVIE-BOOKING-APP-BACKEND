const User = require('../models').user;
const {v4: uuid} = require('uuid');
const TokenGenerator = require('uuid-token-generator');
const {btoa, atob} = require('b2a');
const tokgen = new TokenGenerator(TokenGenerator.BASE62);

exports.signUp = (req, res) => {
    //Validate API call
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Please provide emailId and password to continue.",
        });
        return;
    }
    
    //filter db based on email to check for duplicate user
    const filter = { email: req.body.email };
    const username = btoa(req.body.first_name + req.body.last_name);
    const password = btoa(req.body.password);
    const token = tokgen.generate();
    console.log(token);
    const newUuid = uuid();

    User.findOne(filter, (err, user) => {
        if (!err && user === null) {
            //create user object
            const user = new User({
                userid: req.body.userid,
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: username,
                contact: req.body.contact,
                password: password,
                role: req.body.role ? req.body.role : "user",// set default role to user
                isLoggedIn: false,
                uuid: newUuid,
                accessToken: token,
            });

            user.save(user)
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(err => {
                    res.status(500).send(err);
                })
        } else {
            res.status(400).send({ message: "User already exists" });
        }
    });
};

exports.login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Please provide email id and password to continue.",
        });
        return;
    }
    const filter = { email: req.body.email };

    User.findOne(filter, (err, user) => {
        if (user === null) {
            res.status(401).send({ message: "User Not Found. Please Register" });
            return;
        } else {
            if (user.password === req.body.password) {
                user.isLoggedIn = true;
                User.findOneAndUpdate(filter, user)
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message: "Some error occured.",
                        });
                    });
            } else {
                res.status(401).send({
                    message: "Incorrect Password. Please Try Again",
                });
            }
        }
    });
};

exports.logout = (req, res) => {
    if (!req.body.userid) {
        res.status(400).send({ message: "User ID not provided" });
        return;
    }

    const filter = { userid: req.body.userid };
    User.findOne(filter, (err, user) => {
        if (user === null) {
            res.status(401).send({ message: "User ID does not exist" });
            return;
        } else {
            user.isLoggedIn = false;

            User.findOneAndUpdate(filter, user)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({ message: "Some Error Occured" });
                });
        }
    });
};

exports.getCouponCode = (req, res) => {
    const user = req.query.userid;
    User.find({ userid: user }).select("coupens")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Some error occured while fetching coupons" });
        });
};

exports.bookShow = (req, res) => {
    if (!req.body.userid && !req.body.bookingRequests) {
        res.status(400).send({ message: "User ID or Booking Requests not provided" });
        return;
    }
    const filter = { userid: req.body.userid };
    User.findOne(filter, (err, user) => {
        if (user === null) {
            res.status(401).send({ message: "User does not exist" });
            return;
        } else {
            user.bookingRequests = req.body.bookingRequests;
            User.findOneAndUpdate(filter, user)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({ message: "Some Error Occured while creating Booking Request" });
                })
        }
    });
}; 