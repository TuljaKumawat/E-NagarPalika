import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Step1form() {
    const navigate = useNavigate()
    const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'; // Fallback for local development
    const [natureOfRequests, setNatureOfRequests] = useState([]); // Changed to an array
    const [date, setDate] = useState(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    });


    function handleNatureOfRequestChange(e) {
        const { value, checked } = e.target;
        if (checked) {
            // Add the value to the array if checked
            setNatureOfRequests(prev => [...prev, value]);
        } else {
            // Remove the value from the array if unchecked
            setNatureOfRequests(prev => prev.filter(request => request !== value));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (natureOfRequests.length === 0) {
            alert("Please select at least one option under 'Nature of Request'.");
            return; // Stop form submission
        }

        const fdata = { date, natureOfRequests };

        fetch(`${API_BASE_URL}/user/form`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fdata)
        });

        navigate('/step2', { state: fdata });
    }

    return (
        <section id="step1">
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 bg-light p-2 text-dark bg-opacity-75">
                        <h4 className="text-center mb-4">ई-नगरपालिका</h4>
                        <h5 className="text-center mb-4">
                            Form for User ID Creation / Authorization Changes etc.<br />
                            फॉर्म ऑफ न्यू यूजर आईडी क्रिएशन / ऑथोराइजेशन चेंज के लिए
                        </h5>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>Date *</label>
                                <input type="date" name="date" className="form-control"
                                    value={date}
                                    onChange={(e) => { setDate(e.target.value) }}
                                />
                            </div>

                            <fieldset className="border p-3 mb-3">
                                <legend className="w-auto">Nature of Request / आवेदन का कारण *</legend>
                                {['New User ID Creation', 'Change in Authorizations', 'Transfer', 'Additional Charge', 'Change of ownership', 'Password Reset'].map((requestOption, idx) => (
                                    <div key={idx} className="form-check">
                                        <input type="checkbox" className="form-check-input"
                                            value={requestOption}
                                            checked={natureOfRequests.includes(requestOption)} // This is crucial for controlling the checkbox
                                            onChange={handleNatureOfRequestChange}
                                        />
                                        <label className="form-check-label">{requestOption}</label>
                                    </div>
                                ))}
                            </fieldset>
                            <div className="text-center">
                                <button type="submit" className="btn next-btn "><strong>Next</strong></button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </section>

    );
}

export default Step1form;