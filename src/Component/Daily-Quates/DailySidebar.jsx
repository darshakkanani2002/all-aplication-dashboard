import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Offcanvas, Button } from 'react-bootstrap';

export default function DailySidebar() {
    const [show, setShow] = useState(false);
    const [activeMenu, setActiveMenu] = useState(() => {
        return sessionStorage.getItem('activeMenu') || 'dailylanguage';
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Navigate to /dailylanguage on initial load if no active menu is set
        if (!sessionStorage.getItem('activeMenu')) {
            navigate('/dailylanguage');
        }
    }, [navigate]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        sessionStorage.setItem('activeMenu', menu); // Save the active menu to sessionStorage
        handleClose(); // Close the offcanvas when an item is selected
    };

    return (
        <div>
            <>
                {/* Button for Offcanvas (visible on mobile) */}
                <Button variant="primary" onClick={handleShow} className="mb-3 d-md-none">
                    <i className="fa-solid fa-bars"></i>
                </Button>

                {/* Sidebar for larger screens */}
                <div className="px-3 sidebar-menu-display w-100 z-3 daily-sidebar">
                    <ul className="side-menu d-flex">
                        <li className={`my-2 mx-2 ${activeMenu === 'dailylanguage' ? 'active' : ''}`}>
                            <Link to="/dailylanguage" className='nav-link' onClick={() => handleMenuClick('dailylanguage')}>
                                <i className="fa-solid fa-language me-3 sidebar-icon"></i>Language
                            </Link>
                        </li>
                        <li className={`my-2 mx-2 ${activeMenu === 'dailycategory' ? 'active' : ''}`}>
                            <Link to="/dailycategory" className='nav-link' onClick={() => handleMenuClick('dailycategory')}>
                                <i className="fa-solid fa-layer-group me-3 sidebar-icon"></i>Category
                            </Link>
                        </li>
                        <li className={`my-2 mx-2 ${activeMenu === 'dailypost' ? 'active' : ''}`}>
                            <Link to="/dailypost" className='nav-link' onClick={() => handleMenuClick('dailypost')}>
                                <i className="fa-solid fa-signs-post me-3 sidebar-icon"></i>Post
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Offcanvas for mobile view */}
                <Offcanvas show={show} onHide={handleClose} className="d-md-none">
                    <Offcanvas.Header closeButton>
                        <h2>Daily Quotes</h2>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ul className="side-menu">
                            <li className={`my-3 ${activeMenu === 'dailylanguage' ? 'active' : ''}`}>
                                <Link to="/dailylanguage" className='nav-link' onClick={() => handleMenuClick('dailylanguage')}>
                                    Language
                                </Link>
                            </li>
                            <li className={`my-3 ${activeMenu === 'dailycategory' ? 'active' : ''}`}>
                                <Link to="/dailycategory" className='nav-link' onClick={() => handleMenuClick('dailycategory')}>
                                    Category
                                </Link>
                            </li>
                            <li className={`my-2 ${activeMenu === 'dailypost' ? 'active' : ''}`}>
                                <Link to="/dailypost" className='nav-link' onClick={() => handleMenuClick('dailypost')}>
                                    Post
                                </Link>
                            </li>
                        </ul>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        </div>
    );
}
