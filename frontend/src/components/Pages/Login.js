import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Contextapi } from "../../Contextapi/Contextapi";



function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { loginName, setLoginName, setRole } = useContext(Contextapi)
    const navigate = useNavigate()
    const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'; // Fallback for local development

    function handleSubmit(e) {
        e.preventDefault()
        const fdata = { email, password }
        fetch(`${API_BASE_URL}/user/login`, {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fdata)
        }).then((res) => { return res.json() })
            .then((data) => {
                if (data.status === 200) {
                    localStorage.setItem('loginName', data.email)
                    localStorage.setItem('role', data.role)
                    setLoginName(localStorage.getItem('loginName'))
                    setRole(localStorage.getItem('role'))
                    navigate('/dashboard')


                    setEmail('')
                    setPassword('')

                } else {
                    alert(data.message)
                }


            })
    }




    return (

        <section id="login">
            <div className="container mt-4">
                <div className="row" id="loginrow">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 bg-light p-2 text-dark bg-opacity-75">
                        <h2 className="text-center">Login Here....</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Username/Email</label>
                            <input type="text"
                                className="form-control"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                            <label>Password</label>
                            <input type="text"
                                className="form-control"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            <div className="text-center">
                                <button type="submit" className="btn next-btn mt-2"><strong>Login Here!!!</strong></button>
                            </div>


                        </form>

                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </section>
    );
}

export default Login;