import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function Step2form() {
    const { state } = useLocation();
    const { date, natureOfRequests } = state || {};
    const navigate = useNavigate()
    const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'; // Fallback for local development

    const [formData, setFormData] = useState({
        sourceSystem: [],
        ulbCodeAndName: "1552 - Indore Nagar Palika",
        userId: "",
        employeeName: "",
        employeeCode: "",
        designation: "",
        mobile: "",
        email: "",
        section: "",
        tcodeList: "",
        excelSheetAttached: "No",
    });

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            const updated = checked
                ? [...prev.sourceSystem, value]
                : prev.sourceSystem.filter((item) => item !== value);
            return { ...prev, sourceSystem: updated };
        });
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        // ✅ Validate Source System selection
        if (formData.sourceSystem.length === 0) {
            alert("Please select at least one Source System.");
            return;
        }

        const finalData = {
            date,
            natureOfRequests,
            ...formData,
        };

        fetch(`${API_BASE_URL}/user/step2`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(finalData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Form submission failed");
                }
                return response.json();
            })
            .then((data) => {
                if (data.ticketNo) {
                    navigate("/print", { state: data.form });
                } else {
                    alert("Ticket not generated");
                }
            })
            .catch((err) => console.error(err));
    }
    return (
        <section id="step1">
            <div className="container mt-4 mb-5">

                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 bg-light p-2 text-dark bg-opacity-75">
                        <form onSubmit={handleSubmit}>
                            <h5 className="text-center mb-4"><strong>Step 2 - Additional User Details</strong></h5>
                            <label>Date</label>
                            <input type="text" value={date} className="form-control mb-3" readOnly />

                            <label>Nature of Requests</label>
                            <input
                                type="text"
                                value={natureOfRequests?.join(", ")}
                                className="form-control mb-3"
                                readOnly
                            />

                            <fieldset className="border p-3 mb-3">
                                <legend className="w-auto">Source System / सोर्स सिस्टम *</legend>
                                {['SAP ECC', 'SAP TRM', 'SAP PORTAL', 'SAP CRM'].map((system, idx) => (
                                    <div key={idx} className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            value={system}
                                            checked={formData.sourceSystem.includes(system)}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className="form-check-label">{system}</label>
                                    </div>
                                ))}
                            </fieldset>

                            <label>ULB Code and Name</label>
                            <input
                                type="text"
                                name="ulbCodeAndName"
                                value={formData.ulbCodeAndName}
                                readOnly
                                className="form-control mb-3"
                            />

                            <label>User ID *</label>
                            <input
                                type="text"
                                name="userId"
                                value={formData.userId}
                                onChange={handleChange}
                                className="form-control mb-3"
                                required
                            />

                            <label>Employee Name *</label>
                            <input
                                type="text"
                                name="employeeName"
                                value={formData.employeeName}
                                onChange={handleChange}
                                className="form-control mb-3"
                                required
                            />

                            <label>Employee Code *</label>
                            <input
                                type="text"
                                name="employeeCode"
                                value={formData.employeeCode}
                                onChange={handleChange}
                                className="form-control mb-3"
                                required
                            />

                            <label>Designation *</label>
                            <input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                className="form-control mb-3"
                                required
                            />

                            <label>Mobile *</label>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="form-control mb-3"
                                required
                            />

                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control mb-3"
                                required
                            />

                            <label>Section *</label>
                            <input
                                type="text"
                                name="section"
                                value={formData.section}
                                onChange={handleChange}
                                className="form-control mb-3"
                                required
                            />

                            <label>Tcode List *</label>
                            <textarea
                                name="tcodeList"
                                value={formData.tcodeList}
                                onChange={handleChange}
                                className="form-control mb-3"
                                required
                            ></textarea>

                            <label>Excel Sheet Attached? *</label>
                            <select
                                name="excelSheetAttached"
                                value={formData.excelSheetAttached}
                                onChange={handleChange}
                                className="form-control mb-4"
                                required
                            >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>

                            <div className="text-center">
                                <button type="submit" className="btn next-btn">
                                    Submit Final Form
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        </section>
    );
}

export default Step2form;
