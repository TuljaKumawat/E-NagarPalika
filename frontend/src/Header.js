import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Contextapi } from './Contextapi/Contextapi';
function Header() {
    const { loginName, setLoginName, setRole } = useContext(Contextapi)
    const navigate = useNavigate()
    function handlelogout(e) {
        localStorage.removeItem('loginName')
        localStorage.removeItem('role')
        setLoginName(localStorage.getItem('loginName'))
        setRole(localStorage.getItem('role'))
        navigate('/')
    }
    if (loginName) {

        return (
            <section id="navbar">
                <div className="container-fluid p-0">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light p-2 text-dark bg-opacity-25">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/"><h5 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '25px' }}><strong>ई-नगरपालिका</strong></h5></Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                                <ul className="navbar-nav me-4 mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <button className="btn btn-custom mt-2" ><strong>welcome: {loginName}</strong></button>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/login"><button className="btn btn-custom" onClick={(e) => { handlelogout(e) }}><strong>Logout</strong></button></Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </section>
        )


    } else {
        return (
            <section id="navbar" >
                <div className="container-fluid p-0">
                    {/* backgroundColor: '#b37feb' */}
                    <nav className="navbar navbar-expand-lg  navbar-light bg-light p-2 text-dark bg-opacity-25" >
                        <div className="container-fluid" >
                            <Link className="navbar-brand" to="/"><h5 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '25px' }}><strong>ई-नगरपालिका</strong></h5></Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                                <ul className="navbar-nav  me-2 mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/form"><button className="btn btn-custom"  ><strong>Form</strong></button></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/track"><button className="btn btn-custom"  ><strong>Status</strong></button></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/login"><button className="btn btn-custom"  ><strong>Login</strong></button></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </section >
        );
    }
}


export default Header;