import React from 'react';
import {useAuthContext} from "../../../hooks/useAuthContext";

// Material UI
import {ListItemIcon, MenuItem, Typography} from "@mui/material";

// Material Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

import logo from '../../../assets/logo/logo.png'

// Styles
import './AdminNavigation.css'
import {Link, NavLink} from "react-router-dom";

//TODO: finish vertical navigation and add Outlet logic

function AdminNavigation() {
    const { state } = useAuthContext();

    return (
        <div className="adminNavigation-container">
            <nav className="adminNavigation-vertical">
                <div className="adminNavigation-vertical_logo">
                    <div className="adminNavigation-vertical_logo_image_container">
                        <img src={logo} alt=""/>
                    </div>
                    <p>COMPJUX</p>
                </div>
                {/*TODO: fix navlink logic that the entire "li" tag is clickable*/}
                <div className="adminNavigation-vertical_main_navigation">
                    <ul>
                        <li>
                            <div className="menu_link_image_container">
                                <DashboardOutlinedIcon sx={{fontsize: 18}}/>
                            </div>
                            <NavLink to="/adminDashboard">Dashboard</NavLink>
                        </li>

                        <li>
                            <div className="menu_link_image_container">
                                <ShoppingBasketOutlinedIcon sx={{fontsize: 18}}/>
                            </div>
                            <NavLink to="admin_orders">Orders</NavLink>
                        </li>

                        <li>
                            <div className="menu_link_image_container">
                                <StoreMallDirectoryOutlinedIcon sx={{fontsize: 18}}/>
                            </div>
                            <NavLink to="/admin_products">Products</NavLink>
                        </li>

                        <li>
                            <div className="menu_link_image_container">
                                <WarehouseOutlinedIcon sx={{fontsize: 18}}/>
                            </div>
                            <NavLink to="/admin_storage">Storage</NavLink>
                        </li>

                        <li>
                            <div className="menu_link_image_container">
                                <InsertChartOutlinedIcon sx={{fontsize: 18}}/>
                            </div>
                            <NavLink to="/admin_statistics">Statistics</NavLink>
                        </li>
                    </ul>
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