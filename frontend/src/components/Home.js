import React from 'react';


function Home() {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundImage: `url(${/images/img.png})`,
            fontFamily: 'Poppins, sans-serif',
            padding: '60px 30px'
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '80px auto 0',
                backgroundColor: '#ffffffBF',
                padding: '40px ',
                borderRadius: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center'
            }}>
                <h2 style={{ fontSize: '32px', marginBottom: '30px' }}>
                    <strong>ई-नगरपालिका पोर्टल में आपका स्वागत है</strong>
                </h2>
                <p style={{ fontSize: '20px' }}>
                    Through this portal, you can apply for various municipal services, submit forms, and get important information.
                    Please use the navigation menu above to proceed.
                </p>
            </div>
        </div >
    );
}

export default Home;
