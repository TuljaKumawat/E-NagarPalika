const loginTable = require('../models/login')


exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const emailcheck = await loginTable.findOne({ email: email })

        if (!emailcheck) {
            throw new Error("Email is Wrong");

        }

        if (emailcheck.password !== password) {
            throw new Error("Password is Wrong");

        }

        res.status(200).json({
            status: 200,
            email: email,
            role: emailcheck.role
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })

    }
}