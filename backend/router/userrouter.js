const router = require('express').Router()
const userformc = require('../Controllers/userformcontroller')
const loginc = require('../Controllers/logincontroller')
const officerc = require('../Controllers/officercontroller')

router.post('/form', userformc.handleStep1)
router.post('/step2', userformc.submitForm)
router.get('/track/:ticketNo', userformc.track)
router.post('/login', loginc.login)

router.get('/dashforms', officerc.dashforms)

// routes/officerrouter.js
router.post("/approve/:id", officerc.approve);

router.post("/reject/:id", officerc.reject);



module.exports = router