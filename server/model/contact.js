const { default: mongoose } = require('mongoose')

const Schema = mongoose.Schema

const ContactSchema = new Schema({
    lastName: String,
    firstName: String,
    lastNamePseudonym: String,
    firstNamePseudonym: String,
    postCode: String,
    address: String,
    buildingName: String,
    phoneNumber: String,
    phoneType: String,
    emailFirst: String,
    emailLast: String,
    desiredContact: String,
    status: String,
    priority: String,
    manager: String,
    contactForm: String,
    date: String,
})

module.exports = mongoose.model('Contact', ContactSchema)