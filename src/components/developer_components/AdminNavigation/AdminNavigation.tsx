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
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import logo from '../../../assets/logo/logo.png'

// Styles
import './AdminNavigation.css'
import {Link, NavLink} from "react-router-dom";

//TODO: finish vertical navigation and add Outlet logic

function AdminNavigation({ children }: { children: JSX.Element}) {
    const { state } = useAuthContext();

    return (
        <div className="adminNavigation-container">
            <nav className="adminNavigation-vertical">
                <div className="adminNavigation-vertical_top_content">
                    <div className="adminNavigation-vertical_logo">
                        <div className="adminNavigation-vertical_logo_image_container">
                            <img src={logo} alt=""/>
                        </div>
                        <p>COMPJUX</p>
                    </div>

                    <div className="adminNavigation-vertical_navigation_container adminNavigation-vertical_main_navigation">
                        <ul>
                            <li>
                                <NavLink to="/adminDashboard">
                                    <div className="menu_link_image_container">
                                        <DashboardOutlinedIcon sx={{fontsize: 18}}/>
                                    </div>
                                    <p>Dashboard</p>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="admin_orders">
                                    <div className="menu_link_image_container">
                                        <ShoppingBasketOutlinedIcon sx={{fontsize: 18}}/>
                                    </div>
                                    <p>Orders</p>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/admin_products">
                                    <div className="menu_link_image_container">
                                        <StoreMallDirectoryOutlinedIcon sx={{fontsize: 18}}/>
                                    </div>
                                    <p>Products</p>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/admin_storage">
                                    <div className="menu_link_image_container">
                                        <WarehouseOutlinedIcon sx={{fontsize: 18}}/>
                                    </div>
                                    <p>Storage</p>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/admin_statistics">
                                    <div className="menu_link_image_container">
                                        <InsertChartOutlinedIcon sx={{fontsize: 18}}/>
                                    </div>
                                    <p>Statistics</p>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="adminNavigation-vertical_bottom_content">
                    <div
                        className="adminNavigation-vertical_navigation_container adminNavigation-vertical_bottom_navigation">
                        <ul>
                            <li>
                                <NavLink to="/admin_help">
                                    <div className="menu_link_image_container">
                                        <HelpOutlineIcon sx={{fontsize: 18}}/>
                                    </div>
                                    <p>Help</p>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/admin_account_settings">
                                    <div className="menu_link_image_container">
                                        <SettingsOutlinedIcon sx={{fontsize: 18}}/>
                                    </div>
                                    <p>Account Settings</p>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="adminNavigation-main_content">
                <nav className="adminNavigation-horizontal">
                    <div className="adminNavigation-horizontal_welcomeText">
                        <h3 className="mb-0">Good Morning {state.user?.displayName}</h3>
                        <p className="mb-0">Welcome to your Dashboard</p>
                    </div>
                    <div className="adminNavigation-horizontal_accountContent">
                        <MessageIcon/>
                        <NotificationsNoneIcon sx={{ml: 0.5}}/>
                        <AccountCircleIcon sx={{fontSize: 48, ml: 1}}/>
                    </div>
                </nav>

                <div className="adminNavigation-non_navigational_content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AdminNavigation;