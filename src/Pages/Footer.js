import React from "react";

const FooterView = () => {
    return (
        <>
            <div style={{
                width: '80vw',
                height: '200px',
                background: '#000',
                boxShadow: '0 -1px 5px 2px #00CEFF',
                padding: '0 10vw 0 10vw',
                marginTop: '100px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <img src="Logo.png" width={'70px'} height={'70px'} />
                    <div style={{
                        fontFamily: 'Roboto',
                        fontWeight: '900',
                        fontSize: '18px',
                        lineHeight: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        color: '#fff',
                        marginLeft: '10px',
                    }}>
                        <span>STUDY OF</span>
                        <span>STOCKS</span>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </>
    );
}

export default FooterView;