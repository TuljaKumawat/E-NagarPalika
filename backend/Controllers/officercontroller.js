const formTable = require('../models/form');

// Get all forms
exports.dashforms = async (req, res) => {
    try {
        const officerRole = req.query.role;
        const statusFilter = req.query.status;
        const sortOrder = req.query.sort === "asc" ? 1 : -1;

        const query = {};
        if (statusFilter) {
            query.status = statusFilter;
        }

        const forms = await formTable.find(query).sort({ createdAt: sortOrder });
        res.json({ forms, officerRole });
    } catch (error) {
        console.error("Dashforms error:", error);
        res.status(500).json({ message: "Failed to fetch forms" });
    }
};

const sendMail = require('../utils/mailer'); // ← Add this at top

exports.approve = async (req, res) => {
    try {
        const { level, approvedBy } = req.body;
        const formId = req.params.id;

        const form = await formTable.findById(formId);
        if (!form) return res.status(404).json({ message: "Form not found" });

        form[`level${level}Status`] = `Approved by Level ${approvedBy} Officer`;

        if (parseInt(level) === 4) {
            form.status = "Approved";

            // 📧 Send email on final approval
            await sendMail(
                form.email,
                "Form Approved - E-NagarPalika",
                `Dear ${form.employeeName},\n\nYour form (Ticket No: ${form.ticketNo}) has been fully approved by Level 4.\n\nRegards,\nE-NagarPalika`
            );
        }

        await form.save();
        res.status(200).json({ message: `Level ${level} Approved by Level ${approvedBy}` });
    } catch (error) {
        console.error("Approve error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};




// Reject form at a specific level
exports.reject = async (req, res) => {
    try {
        const { reason, level, rejectedBy } = req.body;
        const formId = req.params.id;

        const form = await formTable.findById(formId);
        if (!form) return res.status(404).json({ message: "Form not found" });

        form[`level${level}Status`] = `Rejected by Level ${rejectedBy} Officer - Reason: ${reason}`;
        form.status = "Rejected";

        await form.save();

        // 📧 Send rejection mail
        await sendMail(
            form.email,
            "Form Rejected - E-NagarPalika",
            `Dear ${form.employeeName},\n\nYour form (Ticket No: ${form.ticketNo}) was rejected at Level ${level} by Level ${rejectedBy} Officer.\n\nReason: ${reason}\n\nRegards,\nE-NagarPalika`
        );

        res.status(200).json({ message: `Level ${level} Rejected by Level ${rejectedBy}` });
    } catch (error) {
        console.error("Reject error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};