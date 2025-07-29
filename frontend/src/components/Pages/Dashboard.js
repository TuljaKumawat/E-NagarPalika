// import { useEffect, useState } from "react";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";

// function Dashboard() {
//     const [forms, setForms] = useState([]);
//     const [selectedForm, setSelectedForm] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [rejectReason, setRejectReason] = useState("");
//     const [showReasonBox, setShowReasonBox] = useState(false);

//     useEffect(() => {
//         fetch("/user/dashforms")
//             .then((res) => res.json())
//             .then((data) => setForms(data))
//             .catch((err) => console.error("Error fetching forms:", err));
//     }, []);

//     const handleViewDetails = (form) => {
//         setSelectedForm(form);
//         setShowModal(true);
//         setShowReasonBox(false);
//         setRejectReason("");
//     };

//     const handleApprove = async (id) => {
//         await fetch(`/user/approve / ${id}`, {
//             method: "POST"
//         });
//         alert("Form approved");
//     };

//     const handleReject = async (id, reason) => {
//         await fetch(`/user/reject / ${id}`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ reason }),
//         });
//         alert("Form rejected with reason: " + reason);
//     };

//     return (
//         <section id="step1">
//             <div className="container mt-4">
//                 <div className="row">
//                     <div className="col-md-12 bg-light p-2 text-dark bg-opacity-75">
//                         <h4>Officer Dashboard - Form Approval</h4>

//                         {forms.map((form) => (
//                             <div className="card mb-3" key={form._id}>
//                                 <div className="card-body d-flex justify-content-between align-items-center">
//                                     <div>
//                                         <h5 className="card-title">Ticket No: {form.ticketNumber}</h5>
//                                         <p>Employee: {form.employeeName}</p>
//                                         <p>Status: {form.status}</p>
//                                     </div>
//                                     <Button className="btn next-btn " onClick={() => handleViewDetails(form)}>
//                                         <strong>View Details</strong>
//                                     </Button>
//                                 </div>
//                             </div>
//                         ))}

//                         {/* Modal */}
//                         <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
//                             <Modal.Header closeButton>
//                                 <Modal.Title>Form Details - {selectedForm?.ticketNumber}</Modal.Title>
//                             </Modal.Header>

//                             <Modal.Body>
//                                 {selectedForm && (
//                                     <>
//                                         <p><strong>User ID:</strong> {selectedForm.userId}</p>
//                                         <p><strong>Employee Code:</strong> {selectedForm.employeeCode}</p>
//                                         <p><strong>Designation:</strong> {selectedForm.designation}</p>
//                                         <p><strong>Email:</strong> {selectedForm.email}</p>
//                                         <p><strong>Mobile:</strong> {selectedForm.mobile}</p>
//                                         <p><strong>Section:</strong> {selectedForm.section}</p>
//                                         <p><strong>Tcode List:</strong> {selectedForm.tcodeList}</p>
//                                         <p><strong>Excel Sheet Attached:</strong> {selectedForm.isExcelSheetAttached}</p>
//                                         {/* Add more fields as needed */}
//                                         {showReasonBox && (
//                                             <textarea
//                                                 className="form-control mt-3"
//                                                 placeholder="Reason for rejection..."
//                                                 value={rejectReason}
//                                                 onChange={(e) => setRejectReason(e.target.value)}
//                                             />
//                                         )}
//                                     </>
//                                 )}
//                             </Modal.Body>
//                             <Modal.Footer>
//                                 {!showReasonBox ? (
//                                     <>
//                                         <Button variant="success" onClick={handleApprove}>Approve</Button>
//                                         <Button variant="danger" onClick={() => setShowReasonBox(true)}>Reject</Button>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <Button variant="secondary" onClick={() => setShowReasonBox(false)}>Cancel</Button>
//                                         <Button variant="danger" onClick={handleReject}>Submit Rejection</Button>
//                                     </>
//                                 )}
//                             </Modal.Footer>
//                         </Modal>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Dashboard() {
    const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [showReasonBox, setShowReasonBox] = useState(false);
    const [rejectLevel, setRejectLevel] = useState(null);
    const [officerLevel, setOfficerLevel] = useState(null);
    const [statusFilter, setStatusFilter] = useState("");
    const [dateSort, setDateSort] = useState("desc");
    const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'; // Fallback for local development

    useEffect(() => {
        const role = localStorage.getItem("role"); // e.g., "level2"
        const level = parseInt(role?.replace("level", "")); // Convert to number
        setOfficerLevel(level);

        const fetchForms = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/user/dashforms?role=${role}&status=${statusFilter}&sort=${dateSort}`);
                const data = await res.json();
                setForms(data.forms); // Use .forms here, assuming backend sends { forms: [...] }
            } catch (err) {
                console.error("Error fetching forms:", err);
            }
        };

        fetchForms();
    }, [showModal, statusFilter, dateSort]);

    const handleViewDetails = (form) => {
        setSelectedForm(form);
        setShowModal(true);
        setShowReasonBox(false);
        setRejectReason("");
    };

    const handleApprove = async (id, levelToApprove) => {
        await fetch(`${API_BASE_URL}/user/approve/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ level: levelToApprove, approvedBy: officerLevel }),
        });
        alert(`Level ${levelToApprove} Approved by Level ${officerLevel}`);
        setShowModal(false);
    };

    const handleReject = async (id, levelToReject) => {
        await fetch(`${API_BASE_URL}/user/reject/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reason: rejectReason, level: levelToReject, rejectedBy: officerLevel }),
        });
        alert(`Level ${levelToReject} Rejected by Level ${officerLevel}`);
        setShowModal(false);
    };

    const renderSingleFieldRow = (label, value) => (
        <tr key={label}>
            <td style={{ fontWeight: 'bold' }}>{label}:</td>
            <td>{Array.isArray(value) ? value.join(", ") : value || "N/A"}</td>
        </tr>
    );

    return (
        <section id="step1">
            <div className="container mt-4">

                <div class="card p-3 mb-3  bg-secondary p-2 text-dark bg-opacity-75" >
                    <h4 class="text-center mb-3"><strong>Officer Dashboard - Form Approval</strong></h4>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <label><strong>Status Filter: </strong></label>
                            <select
                                className="btn next-btn d-inline w-auto ms-2"
                                // className="form-select d-inline w-auto ms-2"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">All</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Pending">Pending</option>

                            </select>
                        </div>

                        <div>
                            <label><strong>Sort by Date:</strong> </label>
                            <select
                                className="btn next-btn d-inline w-auto ms-2"
                                // className="form-select d-inline w-auto ms-2"
                                value={dateSort}
                                onChange={(e) => setDateSort(e.target.value)}
                            >
                                <option value="desc">Newest First</option>
                                <option value="asc">Oldest First</option>
                            </select>
                        </div>
                    </div>
                </div>

                {forms.length > 0 &&
                    forms.map((form) => (

                        <section id="step1">
                            <div className="card mb-3 bg-light p-2 text-dark bg-opacity-75 " key={form._id}>
                                <div className="card-body d-flex justify-content-between align-items-center text-dark " >
                                    <div>
                                        <h5>Ticket No: {form.ticketNo}</h5>
                                        <p>Employee: {form.employeeName}</p>
                                        <p>Level 1 Status: {form.level1Status || "Pending"}</p>
                                        <p>Level 2 Status: {form.level2Status || "Pending"}</p>
                                        <p>Status: {form.status || "Not Started"}</p>
                                    </div>
                                    <div className="text-center ">
                                        <Button type="submit" className="btn next-btn" onClick={() => handleViewDetails(form)}>
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}

                {/* Modal for Form Details */}
                <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Form Details - {selectedForm?.ticketNo}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedForm && (
                            <>
                                <h4 className="text-center mb-3">ई-नगरपालिका</h4>
                                <h5 className="text-center mb-4">
                                    Form for User ID Creation / Authorization Changes etc.
                                </h5>

                                {/* Ticket & Date */}
                                <table className="table table-bordered table-striped mb-2">
                                    <tbody>
                                        <tr>
                                            <td style={{ fontWeight: 'bold' }}>Ticket No:</td>
                                            <td>{selectedForm.ticketNo || 'N/A'}</td>
                                            <td style={{ fontWeight: 'bold' }}>Date:</td>
                                            <td>{selectedForm.date || 'N/A'}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* Full Field Table */}
                                <table className="table table-bordered table-striped">
                                    <tbody>
                                        {renderSingleFieldRow("Nature of Request", selectedForm.natureOfRequests)}
                                        {renderSingleFieldRow("Source System", selectedForm.sourceSystem)}
                                        {renderSingleFieldRow("ULB Code And Name", selectedForm.ulbCodeAndName)}
                                        {renderSingleFieldRow("User ID", selectedForm.userId)}
                                        {renderSingleFieldRow("Name of Employee", selectedForm.employeeName)}
                                        {renderSingleFieldRow("Employee Code", selectedForm.employeeCode)}
                                        {renderSingleFieldRow("Designation", selectedForm.designation)}
                                        {renderSingleFieldRow("Mobile Number", selectedForm.mobile)}
                                        {renderSingleFieldRow("Email ID", selectedForm.email)}
                                        {renderSingleFieldRow("Section", selectedForm.section)}
                                        {renderSingleFieldRow("Tcode List", selectedForm.tcodeList)}
                                        {renderSingleFieldRow("Excel Sheet Attached", selectedForm.excelSheetAttached)}
                                    </tbody>
                                </table>

                                {/* Rejection Reason Input */}
                                {showReasonBox && (
                                    <textarea
                                        className="form-control mt-3"
                                        placeholder="Reason for rejection..."
                                        value={rejectReason}
                                        onChange={(e) => setRejectReason(e.target.value)}
                                    />
                                )}
                            </>
                        )}
                    </Modal.Body>

                    <Modal.Footer>
                        {selectedForm && officerLevel && (
                            <>
                                {[1, 2, 3, 4].map((level) => {
                                    const status = selectedForm[`level${level}Status`];

                                    if (level > officerLevel) return null; // Hide buttons for higher levels

                                    return (
                                        <div key={level} className="w-100 my-2">
                                            <h6>Level {level}</h6>
                                            {status && status !== "Pending" ? (
                                                <div><strong>Status:</strong> {status}</div>
                                            ) : (
                                                <>
                                                    <Button
                                                        variant="success"
                                                        className="me-2"
                                                        onClick={() => handleApprove(selectedForm._id, level)}
                                                    >
                                                        Approve Level {level}
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => {
                                                            setRejectLevel(level);
                                                            setShowReasonBox(true);
                                                        }}
                                                    >
                                                        Reject Level {level}
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </>
                        )}

                        {/* Rejection Submit Area */}
                        {showReasonBox && (
                            <div className="w-100 mt-3">
                                <Button
                                    variant="secondary"
                                    className="me-2"
                                    onClick={() => {
                                        setShowReasonBox(false);
                                        setRejectReason("");
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleReject(selectedForm._id, rejectLevel)}
                                >
                                    Submit Rejection
                                </Button>
                            </div>
                        )}
                    </Modal.Footer>
                </Modal>
            </div>
        </section>

    );


}
export default Dashboard;