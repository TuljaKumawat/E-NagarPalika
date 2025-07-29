// import { useState } from "react";
// import { useLocation } from "react-router-dom";

// function Print() {
//     const location = useLocation();
//     const form = location.state;
//     const [copySuccess, setCopySuccess] = useState("");

//     const handleCopy = () => {
//         navigator.clipboard.writeText(form.ticketNo).then(() => {
//             setCopySuccess("Copied!");
//             setTimeout(() => setCopySuccess(""), 2000); // Remove message after 2 sec
//         });
//     };

//     return (

//         <section id="step1">
//             <div className="container">
//                 <div className='row mt-4 d-flex justify-content-center'>
//                     <div className="col-md-3"> </div>
//                     <div className="col-md-6">
//                         <h4>
//                             Ticket No: {form.ticketNo}
//                             <button
//                                 onClick={handleCopy}
//                                 style={{
//                                     marginLeft: "10px",
//                                     border: "none",
//                                     background: "none",
//                                     cursor: "pointer",
//                                 }}
//                                 title="Copy Ticket No"
//                             >
//                                 📋
//                             </button>
//                             <span style={{ color: "green", fontSize: "14px", marginLeft: "5px" }}>
//                                 {copySuccess}
//                             </span>
//                         </h4>

//                         <p><strong>Date:</strong> {form.date}</p>
//                         <p><strong>Nature of Request:</strong> {form.natureOfRequests.join(", ")}</p>
//                         <p><strong>Source System:</strong> {form.sourceSystem.join(", ")}</p>
//                         <p><strong>ULB Code And Name:</strong> {form.ulbCodeAndName}</p>
//                         <p><strong>User ID:</strong> {form.userId}</p>
//                         <p><strong> Name of Employee:</strong> {form.employeeName}</p>
//                         <p><strong>Employee Code:</strong> {form.employeeCode}</p>
//                         <p><strong>Designation:</strong> {form.designation}</p>
//                         <p><strong>Mobile Number:</strong> {form.mobile}</p>
//                         <p><strong>Employee's Official E-mail Id:</strong> {form.email}</p>
//                         <p><strong>Section of ULB:</strong> {form.section}</p>
//                         <p><strong>Tcode List:</strong> {form.tcodeList}</p>
//                         <p><strong>Excel Sheet for Authorization Matrix:</strong> {form.excelSheetAttached}</p>
//                         {/* baki saare fields yaha dikhaye */}
//                         <button onClick={() => window.print()} className="btn next-btn">🖨 Print</button>
//                     </div>
//                     <div className="col-md-3"> </div>
//                 </div>
//             </div>
//         </section>

//     );
// }

// export default Print;

import { useState } from "react";
import { useLocation } from "react-router-dom";

function Print() {
    const location = useLocation();
    const form = location.state; // This 'form' object should contain all the data
    const [copySuccess, setCopySuccess] = useState("");

    const handleCopy = () => {
        navigator.clipboard.writeText(form.ticketNo).then(() => {
            setCopySuccess("Copied!");
            setTimeout(() => setCopySuccess(""), 2000); // 2 सेकंड के बाद मैसेज हटा दें
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            setCopySuccess("Copy failed!");
            setTimeout(() => setCopySuccess(""), 2000);
        });
    };

    // Helper function to render a table row (single label-value pair per row)
    const renderSingleFieldRow = (label, value) => {
        const displayValue = Array.isArray(value) ? value.join(", ") : value;
        return (
            <tr key={label}>
                <td style={{ fontWeight: 'bold', paddingRight: '10px' }}>{label}:</td>
                <td>{displayValue || 'N/A'}</td>
            </tr>
        );
    };

    return (
        <section id="step1">
            <div className="container">
                <div className='row mt-4 d-flex justify-content-center'>
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h4 className="text-center mb-2">ई-नगरपालिका</h4>
                        <h5 className="text-center mb-4">
                            Form for User ID Creation / Authorization Changes etc.<br />
                            फॉर्म ऑफ न्यू यूजर आईडी क्रिएशन / ऑथोराइजेशन चेंज के लिए
                        </h5>
                        {/* Start of the table */}
                        <table className="table table-bordered table-striped pb-0" style={{ width: '100%', marginBottom: '20px' }}>
                            <tbody className="pb-0">
                                {/* Ticket No and Date in one row */}
                                <tr>
                                    <td style={{ fontWeight: 'bold', paddingRight: '10px', width: '25%' }}>Ticket No:</td>
                                    <td style={{ fontWeight: 'bold', width: '25%' }}>
                                        {form.ticketNo || 'N/A'}
                                        <button
                                            onClick={handleCopy}
                                            style={{
                                                marginLeft: "10px",
                                                border: "none",
                                                background: "none",
                                                cursor: "pointer",
                                                fontSize: "1em", // Normal size for inline
                                                verticalAlign: 'middle' // Align with text
                                            }}
                                            title="Copy Ticket No"
                                        >
                                            📋
                                        </button>
                                        <span style={{ color: "green", fontSize: "12px", marginLeft: "5px" }}>
                                            {copySuccess}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: 'bold', paddingRight: '10px', width: '25%' }}>Date:</td>
                                    <td style={{ width: '25%' }}>{form.date || 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="table table-bordered table-striped pt-0" style={{ width: '100%', marginBottom: '20px' }}>
                            <tbody>
                                {/* Other fields using the helper function */}
                                {renderSingleFieldRow("Nature of Request", form.natureOfRequests)}
                                {renderSingleFieldRow("Source System", form.sourceSystem)}
                                {renderSingleFieldRow("ULB Code And Name", form.ulbCodeAndName)}
                                {renderSingleFieldRow("User ID", form.userId)}
                                {renderSingleFieldRow("Name of Employee", form.employeeName)}
                                {renderSingleFieldRow("Employee Code", form.employeeCode)}
                                {renderSingleFieldRow("Designation", form.designation)}
                                {renderSingleFieldRow("Mobile Number", form.mobile)} {/* Corrected from 'mobile' */}
                                {renderSingleFieldRow("Employee's Official E-mail Id", form.email)} {/* Corrected from 'email' */}
                                {renderSingleFieldRow("Section of ULB", form.section)}
                                {renderSingleFieldRow("Tcode List", form.tcodeList)}
                                {renderSingleFieldRow("Excel Sheet for Authorization Matrix", form.excelSheetAttached)}
                            </tbody>
                        </table>
                        {/* End of the table */}

                        <div className="text-center">
                            <button onClick={() => window.print()} className="btn next-btn">
                                🖨 Print
                            </button>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </section >
    );
}

export default Print;



