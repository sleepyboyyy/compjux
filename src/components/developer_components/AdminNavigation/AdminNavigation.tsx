import React from 'react';
import {useAuthContext} from "../../../hooks/useAuthContext";

// Material Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

// Styles
import './AdminNavigation.css'

function AdminNavigation() {
    const { state } = useAuthContext();

    return (
        <div className="adminNavigation-container">
            <nav className="adminNavigation-vertical">
                <div className="adminNavigation-vertical_logo">

                </div>
            </nav>
            <nav className="adminNavigation-horizontal">
                <div className="adminNavigation-horizontal_welcomeText">
                    <h3 className="mb-0">Good Morning {state.user?.displayName}</h3>
                    <p className="mb-0">Welcome to your Dashboard</p>
                </div>
                <div className="adminNavigation-horizontal_accountContent">
                    <MessageIcon />
                    <NotificationsNoneIcon sx={{ ml: 0.5 }} />
                    <AccountCircleIcon sx={{ fontSize: 48, ml: 1 }} />
                </div>
            </nav>
        </div>
    );
}

export default AdminNavigation;