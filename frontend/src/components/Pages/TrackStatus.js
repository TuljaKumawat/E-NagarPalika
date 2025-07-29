import React, { useState } from "react";
// Agar aapne is component ko ek alag CSS file mein styles diye hain, to use yahan import karein.
// Jaise: import './TrackStatus.css'; // Agar aapne iske liye alag CSS banayi hai

function TrackStatus() {
    const [ticketNo, setTicketNo] = useState("");
    const [formData, setFormData] = useState(null);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false); // New state for modal visibility
    const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'; // Fallback for local development

    const handleTrack = async (e) => {
        e.preventDefault();
        setError(""); // reset error
        setFormData(null); // reset old data
        setShowModal(false); // Hide modal before new attempt

        try {
            const res = await fetch(`${API_BASE_URL}/user/track/${ticketNo}`);
            console.log(res);
            if (res.ok) {
                const data = await res.json();
                setFormData(data);
                setShowModal(true); // Show modal on success
            } else {
                setError("Ticket not found or status not available");
                setShowModal(false); // Ensure modal is hidden on error
            }
        } catch (err) {
            console.error("Error:", err);
            setError("Something went wrong while tracking.");
            setShowModal(false); // Ensure modal is hidden on error
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData(null); // Optionally clear data when closing
        setError(""); // Optionally clear error when closing
    };

    return (
        <section id="step1">
            <div className="container mt-4">
                <div className='row' id="loginrow">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 bg-light p-2 text-dark bg-opacity-75">
                        <h4 className="mb-3 text-center"><strong>Track Your Ticket</strong></h4>
                        <form onSubmit={handleTrack} className="mb-4">
                            <input
                                type="text"
                                placeholder="Enter Ticket No."
                                value={ticketNo}
                                onChange={(e) => setTicketNo(e.target.value)}
                                className="form-control mb-2"
                                required
                            />
                            <div className="text-center">
                                <button type="submit" className="btn next-btn mt-2"><strong>Track</strong></button>
                            </div>
                        </form>

                        {error && <div className="alert alert-danger">{error}</div>}

                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>

            {/* Modal Popup for Ticket Details */}
            {showModal && formData && (
                <div className="modal-overlay">
                    {/* Using a section here and your existing column classes */}
                    <section className="col-md-6 bg-light text-dark modal-content-custom">
                        <button className="modal-close-button" onClick={closeModal}>&times;</button>
                        <h5 className="modal-title text-dark text-center">Ticket Details</h5>
                        <p><strong>Date:</strong> {formData.date}</p>
                        <p><strong>Nature of Request:</strong> {formData.natureOfRequests.join(", ")}</p>
                        <p><strong>Source System:</strong> {formData.sourceSystem.join(", ")}</p>
                        <p><strong>ULB Code And Name:</strong> {formData.ulbCodeAndName}</p>
                        <p><strong>User ID:</strong> {formData.userId}</p>
                        <p><strong> Name of Employee:</strong> {formData.employeeName}</p>
                        <p><strong>Employee Code:</strong> {formData.employeeCode}</p>
                        <p><strong>Designation:</strong> {formData.designation}</p>
                        <p><strong>Mobile Number:</strong> {formData.mobile}</p>
                        <p><strong>Employee's Official E-mail Id:</strong> {formData.email}</p>
                        <p><strong>Section of ULB:</strong> {formData.section}</p>
                        <p><strong>Tcode List:</strong> {formData.tcodeList}</p>
                        <p><strong>Status:</strong> {formData.status || "Pending"}</p>

                    </section>

                </div>
            )}
        </section>
    );
}

export default TrackStatus;