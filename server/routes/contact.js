const express = require('express')
const router = express.Router()
const Contact = require('../model/contact')

router.get('', function(req, res) {
    Contact.find({}, function(err, foundContact) {
        res.json(foundContact)
    })
})

router.get('/:contactId', function(req, res) {
    const contactId = req.params.contactId
    Contact.findById(contactId, function(err, foundContact) {
        res.json(foundContact)
    })
})


router.post('/add', function(req, res) {
    const { lastName, firstName, lastNamePseudonym, firstNamePseudonym, postCode, address, buildingName, phoneNumber, phoneType, emailFirst, emailLast, desiredContact, status, priority, manager, contactForm, date } = req.body

    if(!lastName) {
        return res.status(422).send({errors: [{title: 'User error', detail: "お名前を入力してください。"}]})
    }

    if(!firstName) {
        return res.status(422).send({errors: [{title: 'User error', detail: "お名前を入力してください。"}]})
    }

    if(!firstNamePseudonym) {
        return res.status(422).send({errors: [{title: 'User error', detail: "お名前のふりがなを入力してください。"}]})
    }

    if(!lastNamePseudonym) {
        return res.status(422).send({errors: [{title: 'User error', detail: "お名前のふりがなを入力してください。"}]})
    }

    if(!postCode) {
        return res.status(422).send({errors: [{title: 'User error', detail: "郵便番号を入力してください。"}]})
    }

    if(!address) {
        return res.status(422).send({errors: [{title: 'User error', detail: "住所を入力してください。"}]})
    }

    if(!phoneNumber) {
        return res.status(422).send({errors: [{title: 'User error', detail: "電話番号を入力してください。"}]})
    }

    if(!phoneType) {
        return res.status(422).send({errors: [{title: 'User error', detail: "お電話の種類を選択してください。"}]})
    }

    if(!emailFirst) {
        return res.status(422).send({errors: [{title: 'User error', detail: "メールアドレスを入力してください。"}]})
    }

    if(!emailLast) {
        return res.status(422).send({errors: [{title: 'User error', detail: "メールアドレスを入力してください。"}]})
    }

    if(!desiredContact) {
        return res.status(422).send({errors: [{title: 'User error', detail: "ご希望の連絡方法を選択してください。"}]})
    }

    if(!contactForm) {
        return res.status(422).send({errors: [{title: 'User error', detail: "お問合せ内容を入力してください。"}]})
    }

    const contact = new Contact({lastName, firstName, lastNamePseudonym, firstNamePseudonym, postCode, address, buildingName, phoneNumber, phoneType, emailFirst, emailLast, desiredContact, status, priority, manager, contactForm, date })
        contact.save(function(err) {
            if(err) {
                return res.status(422).send({errors: [{title: 'User error', detail: "エラーが発生しました。お手数ですが再度ご入力をお願いします。"}]})
            }
            return res.json({"registed": true})
        })
})


router.patch('/change', function(req, res) {
    const { _id, status, priority, manager } = req.body

    Contact.findById(_id, function(err, foundContact) {
        if(err) {
            return res.status(422).send({errors: [{title: 'Id error', detail: "IDが見つかりません "}]})
        }

    foundContact.status = status
    foundContact.priority = priority
    foundContact.manager = manager

    const contact = new Contact(foundContact)

        contact.save(function(err) {
            if(err) {
                return res.status(422).send({errors: [{title: 'User error', detail: "エラーが発生しました。お手数ですが再度ご入力をお願いします。"}]})
            }
            return res.json(contact)
        })
    })
})

module.exports = router