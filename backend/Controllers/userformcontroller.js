const formTable = require('../models/form')

// Step 1 Controller — logs/validates step1
exports.handleStep1 = (req, res) => {
    console.log("Step 1 Data:", req.body);
    res.status(200).json({ message: "Step 1 received" });
};

// Step 2 Controller — saves final form
exports.submitForm = async (req, res) => {
    try {
        // Generate ticketNo: format = TICKET-yyyyMMdd-HHMMSS
        const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // e.g., 20250625
        const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random
        const ticketNo = `T-${datePart}-${randomPart}`;

        const newForm = await formTable.create({ ...req.body, ticketNo });

        console.log("Ticket No:", newForm.ticketNo);
        res.status(201).json({ message: "Form saved", ticketNo: newForm.ticketNo, form: newForm });
    } catch (error) {
        console.error("Error saving form:", error);
        res.status(500).json({ error: "Failed to save form" });
    }
};

exports.track = async (req, res) => {
    const form = await formTable.findOne({ ticketNo: req.params.ticketNo });
    if (!form) return res.status(404).json({ error: "Ticket not found" });
    res.json(form);

};