const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    date: {
        type: String,
        default: () => {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        }
    },
    natureOfRequests: {
        type: [String], // e.g., ['New User ID Creation', 'Change in Authorizations']
        required: true,
    },
    ticketNo: {
        type: String,
        default: "",
    },

    // Step 2 fields will go here

    sourceSystem: [String],
    ulbCodeAndName: String,
    userId: String,
    employeeName: String,
    employeeCode: String,
    designation: String,
    mobile: String,
    email: String,
    section: String,
    tcodeList: String,
    excelSheetAttached: String,
    // Tracking approval flow
    level1Status: { type: String, default: "Pending" },
    level1Date: Date,
    level1RejectionReason: String,

    level2Status: { type: String, default: "Pending" },
    level2Date: Date,
    level2RejectionReason: String,

    level3Status: { type: String, default: "Pending" },
    level3Date: Date,
    level3RejectionReason: String,

    level4Status: { type: String, default: "Pending" },
    level4Date: Date,
    level4RejectionReason: String,

    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Level 1 Approved", "Level 2 Approved", "Level 3 Approved", "Approved", "Rejected"]
    }

}, { timestamps: true });

module.exports = mongoose.model('Form', FormSchema);