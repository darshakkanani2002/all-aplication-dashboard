import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Offcanvas, Button } from 'react-bootstrap';

export default function MainSidebar() {
    const [show, setShow] = useState(false);
    const [activeMenu, setActiveMenu] = useState(() => {
        return sessionStorage.getItem('activeProjectMenu') || 'dailyquates';
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        sessionStorage.setItem('activeProjectMenu', menu); // Save the active menu to sessionStorage
        if (menu === 'dailyquates') {
            // Update DailySidebar to activate 'dailylanguage'
            sessionStorage.setItem('activeMenu', 'dailylanguage');
        } if(menu === 'invitation'){
            sessionStorage.setItem('activeMenu', 'invitationcategory'); 
        }
        handleClose(); // Close the offcanvas when an item is selected
    };

    return (
        <div>
            <Button variant="primary" onClick={handleShow} className="mb-3 d-md-none">
                <i className="fa-solid fa-bars"></i>
            </Button>

            <div className="sidebar d-none sidebar-menu-display">
                <h2><span className='fw-bold'>Project Name</span></h2>
                <ul className="side-menu">
                    <li className={`my-2 ${activeMenu === 'dailyquates' ? 'active' : ''}`}>
                        <Link to="/dailylanguage" className='nav-link active' onClick={() => handleMenuClick('dailyquates')}>
                            <i className="fa-solid fa-1 sidebar-icon"></i>.
                            Daily Quotes
                        </Link>
                    </li>
                    <li className={`my-2 ${activeMenu === 'invitation' ? 'active' : ''}`}>
                        <Link to="/invitationcategory" className='nav-link' onClick={() => handleMenuClick('invitation')}>
                            <i className="fa-solid fa-2 sidebar-icon"></i>.
                            Invitation Post
                        </Link>
                    </li>
                </ul>
            </div>

            <Offcanvas show={show} onHide={handleClose} className="d-md-none">
                <Offcanvas.Header closeButton>
                    <h2>Daily Quotes</h2>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="side-menu">
                        <li className={`my-3 ${activeMenu === 'dailyquates' ? 'active' : ''}`}>
                            <Link to="/dailyquates" className='nav-link' onClick={() => handleMenuClick('dailyquates')}>
                                Daily Quotes
                            </Link>
                        </li>
                        <li className={`my-3 ${activeMenu === 'invitation' ? 'active' : ''}`}>
                            <Link to="/invitation" className='nav-link' onClick={() => handleMenuClick('invitation')}>
                                Invitation Post
                            </Link>
                        </li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}
