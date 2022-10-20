const express = require('express')
const router = express.Router()
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const config = require('../config/')

router.get('', function(req, res) {
    User.find({}, function(err, foundUser) {
        res.json(foundUser)
    })
})

router.get('/:userId', function(req, res) {
    const userId = req.params.userId
    User.findById(userId, function(err, foundUser) {
        res.json(foundUser)
    })
})

router.post('/login', function(req, res) {
    const { email, password } = req.body
    if(!email) {
        return res.status(422).send({errors: [{title: 'User error', detail: 'please fill email!'}]})
    }

    if(!password) {
        return res.status(422).send({errors: [{title: 'User error', detail: 'please fill password!'}]})
    }

    User.findOne({email}, function(err, foundUser) {
        if(err) {
            return res.status(422).send({errors: [{title: 'User error', detail: 'Someting went wrong!'}]})
        }
        if(!foundUser) {
            return res.status(422).send({errors: [{title: 'User error', detail: 'User is not exist!'}]})
        }
        if(!foundUser.hasSamePassword(password)) {
            return res.status(422).send({errors: [{title: 'User error', detail: 'Incorrect password!'}]})
        }

        const token = jwt.sign({
            userId: foundUser.id,
            username: foundUser.username,
            authority: foundUser.authority
          }, config.SECRET, { expiresIn: '1h' });

        return res.json(token)
    })

})

router.post('/register', function(req, res) {
    const{ username, email, password, confirmPassword, authority } = req.body
    const managedCases = '0'

    if(!username) {
        return res.status(422).send({errors: [{title: 'User error', detail: 'please fill username!'}]})
    }

    if(!email) {
        return res.status(422).send({errors: [{title: 'User error', detail: 'please fill email!'}]})
    }

    if(!password) {
        return res.status(422).send({errors: [{title: 'User error', detail: 'please fill password!'}]})
    }

    if(password !== confirmPassword) {
        return res.status(422).send({errors: [{title: 'User error', detail: 'please check password!'}]})
    }

    if(!authority) {
        return res.status(422).send({errors: [{title: 'User error', detail: 'please fill authority!'}]})
    }
    


    User.findOne({email}, function(err, foundUser) {
        if(err) {
            return res.status(422).send({errors: [{title: 'User error', detail: 'Someting went wrong!'}]})
        }
        if(foundUser) {
            return res.status(422).send({errors: [{title: 'User error', detail: 'User alredy exist!'}]})
        }

        const user = new User({username, email, password, authority, managedCases})
        user.save(function(err) {
            if(err) {
                return res.status(422).send({errors: [{title: 'User error', detail: 'went wrong!'}]})
            }
            return res.json(user)
        })
    })
})


router.delete("/:userId", async (req,res) => {
    try {
        await User.findByIdAndRemove(req.params.userId);
    } catch(err) {
        res.status(500).send(err)
    }
    return res.json({delete: true})
})

router.patch('/update', function(req, res) {
    const { _id, managedCases } = req.body

    User.findById(_id, function(err, foundUser) {
        if(err) {
            return res.status(422).send({errors: [{title: 'Id error', detail: "IDが見つかりません "}]})
        }

    foundUser.managedCases = managedCases

    const user = new User(foundUser)

        user.save(function(err) {
            if(err) {
                return res.status(422).send({errors: [{title: 'User error', detail: "エラーが発生しました。お手数ですが再度ご入力をお願いします。"}]})
            }
            return res.json(user)
        })
    })
})

router.patch('/accountUpdate', function(req, res) {
    const { _id, username, email, authority, password } = req.body

    User.findById(_id, function(err, foundUser) {
        if(err) {
            return res.status(422).send({errors: [{title: 'Id error', detail: "IDが見つかりません "}]})
        }

    if(username) {
        foundUser.username = username
    }
    if(email) {
        foundUser.email = email
    }
    if(authority) {
        foundUser.authority = authority
    }
    if(password) {
        foundUser.password = password
    }

    const user = new User(foundUser)

        user.save(function(err) {
            if(err) {
                return res.status(422).send({errors: [{title: 'User error', detail: "エラーが発生しました。お手数ですが再度ご入力をお願いします。"}]})
            }
            return res.json(user)
        })
    })
})

router.post('/checkPassword', function(req, res) {
    const { _id, password } = req.body

    if(!password) {
        return res.status(422).send({errors: [{title: 'User error', detail: 'please fill password!'}]})
    }

    User.findById(_id, function(err, foundUser) {
        if(err) {
            return res.status(422).send({errors: [{title: 'User error', detail: 'Someting went wrong!'}]})
        }
        if(!foundUser) {
            return res.status(422).send({errors: [{title: 'User error', detail: 'User is not exist!'}]})
        }
        if(!foundUser.hasSamePassword(password)) {
            return res.status(422).send({errors: [{title: 'User error', detail: 'Incorrect password!'}]})
        }
        const token = jwt.sign({
            userId: foundUser.id,
            username: foundUser.username,
            authority: foundUser.authority
          }, config.SECRET, { expiresIn: '1h' });

        return res.json(token)
    })

})


module.exports = router