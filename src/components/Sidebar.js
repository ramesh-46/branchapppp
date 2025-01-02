// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import HelpIcon from '@mui/icons-material/Help';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function Sidebar() {
    const [isBranchesOpen, setIsBranchesOpen] = useState(false);
    const logoUrl = 'http://digitrac.keydraft.com/images/logos/digitrac_full_logo.png';

    const handleHelpClick = () => {
        window.open('https://digitracimages.s3.ap-south-1.amazonaws.com/Help/Fuel_Management_User_Manual_13042024.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250102T101244Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIAQIFGXUJPYXZ3Q2VP%2F20250102%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=19615bfa8fdd52219c81818d4488ed4a935629263796efc519abb0f5f04f6f4d', '_blank');
    };

    return (
        <div className="sidebar">
            <div className="logo-container">
                <img src={logoUrl} alt="Digitrac Logo" className="sidebar-logo" />
            </div>
            <ul>
                <li>
                    <Link to="/" className="sidebar-link active"> {/* Added active class */}
                        <HomeIcon className="sidebar-icon" />
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <div onClick={() => setIsBranchesOpen(!isBranchesOpen)} className="master-link">
                        <BusinessIcon className="sidebar-icon" />
                        <span>Masters</span>
                        {isBranchesOpen ? <ExpandLess /> : <ExpandMore />}
                    </div>
                    {isBranchesOpen && (
                        <ul className="dropdown">
                            <li>
                                <Link to="/branches" className="sidebar-link">
                                    <BusinessIcon className="sidebar-icon" />
                                    <span>Branches</span>
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
                <li>
                    <button onClick={handleHelpClick} className="sidebar-link">
                        <HelpIcon className="sidebar-icon" />
                        <span>Help</span>
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;