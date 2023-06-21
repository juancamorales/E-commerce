function validate(input) {
    let errors = {}

    if (!input.name) {
        errors.name = "The name is required"
    }
    else if (!/^[A-Za-z\s]+$/g.test(input.name)) {
        errors.name = "The name is invalid"
    }
    if (!input.lastName) {
        errors.lastName = "Last name is required"
    }
    else if (!/^[A-Za-z\s]+$/g.test(input.lastName)) {
        errors.lastName = "Last name is invalid"
    }
    else if (!input.dni) {
        errors.dni = "Your DNI is required"
    }
    else if (!input.telephone) {
        errors.telephone = "Your telephone is required"
    }
    else if (!/^[0-9]+$/.test(input.telephone)) {
        errors.telephone = "Your telephone is invalid"
    }
    else if (!input.eMail) {
        errors.eMail = "Your email is required"
    }
    else if (!/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(input.eMail)) {
        errors.eMail = "The email is invalid"
    }
    else if (!input.password) {
        errors.password = "The password must have at least 8 and 16 characters, at least one digit, at least one lower case and at least one upper case."
    }
    else if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password))
        errors.password = "The password is Invalid"
    return errors
}

export default validate