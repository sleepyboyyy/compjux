import './Rootlayout.css'
import {Link, NavLink, Outlet, useNavigate} from "react-router-dom";
import {useState} from "react";
import {
    AppBar,
    Box,
    Button, Divider, Drawer,
    IconButton, List, ListItem, ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useCartContext } from '../../hooks/useCartContext';
import CartDrawerComponent from "../../components/misc-components/CartDrawerComponent";
import {useSignOut} from "../../hooks/useSignOut";
import {useAuthContext} from "../../hooks/useAuthContext";


function Rootlayout() {
    const [accountMenuAnchor, setAccountMenuAnchor] = useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const { cartItems } = useCartContext();
    const { signUserOut } = useSignOut();
    const { state } = useAuthContext();

    // Handlers
    // Account Click Handler

    const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        if (state.user) {
            setAccountMenuAnchor(event.currentTarget);
        } else {
            navigate('/login');
        }
    };

    const handleAccountMenuClose = () => {
        setAccountMenuAnchor(null);
    };

    const handleUserSignOut = async () => {
        await signUserOut();
        setAccountMenuAnchor(null);
        navigate('/');
    }

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleCartDrawerToggle = (open: boolean) => {
        setCartDrawerOpen(open);
    };

    const navigationLinks = [
        { label: 'Home', to: '/' },
        { label: 'PC Store', to: '/pc-store' },
        { label: 'Documentation', to: '/documentation' },
    ];

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: 'var(--softWhite-color)', boxShadow: 'none', padding: {lg: '0 96px', xs: '0 16px'} }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Logo Section */}
                    <Box>
                        <Typography
                            variant="h6"
                            component={Link}
                            to="/"
                            sx={{ textDecoration: 'none', color: 'var(--primary-color)', fontWeight: 'bold' }}
                        >
                            Compjux
                        </Typography>
                    </Box>

                    {/* Desktop Navigation Links */}
                    {!isMobile && (
                        <Box sx={{ display: 'flex', gap: 3 }}>
                            {navigationLinks.map((link) => (
                                <Button
                                    key={link.to}
                                    component={NavLink}
                                    to={link.to}
                                    sx={{
                                        color: 'black',
                                        position: 'relative',
                                        textTransform: 'none', // Ensures no uppercase text
                                        '&:hover': { backgroundColor: 'var(--softWhite-color)' },
                                        '&.active::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 'calc(50% - 12px)',
                                            width: '24px',
                                            height: '2px',
                                            backgroundColor: 'var(--primary-color)',
                                            transition: 'width 0.15s ease, left 0.15s ease',
                                        },
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: '50%',
                                            width: 0,
                                            height: '2px',
                                            backgroundColor: 'var(--primary-color)',
                                            transition: 'width 0.15s ease, left 0.15s ease',
                                        },
                                        '&:hover::after': {
                                            width: '16px',
                                            left: 'calc(50% - 8px)',
                                        },
                                    }}
                                >
                                    {link.label}
                                </Button>
                            ))}
                        </Box>
                    )}

                    {/* Desktop Account and Cart Section */}
                    {!isMobile && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {/* Account Dropdown */}
                            {/* If not logged in show icon */}
                            {!state.user && <IconButton onClick={handleAccountMenuOpen} sx={{color: 'var(--primary-color)'}}>
                                <AccountCircleIcon sx={{fontSize: '32px'}}/>
                            </IconButton>}

                            {/* If logged in show username */}
                            {state.user && <Button
                                onClick={handleAccountMenuOpen}
                                variant="text"
                                sx={{
                                    ml: 1,
                                    textTransform: 'none',
                                    color: 'var(--primary-color)',
                                    '&:hover': {
                                        backgroundColor: '#F7EFEF',
                                        color: '#7C1615',
                                    }
                                }}
                            >
                                {state.user?.displayName}
                            </Button>}

                            <Menu
                                anchorEl={accountMenuAnchor}
                                open={Boolean(accountMenuAnchor)}
                                onClose={handleAccountMenuClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                <MenuItem component={Link} to="/settings" onClick={handleAccountMenuClose}>
                                    Account Settings
                                </MenuItem>
                                <MenuItem component={Link} to="/settings/account-orders" onClick={handleAccountMenuClose}>
                                    My Orders
                                </MenuItem>
                                <Divider sx={{ width: '75%', margin: '0 auto', backgroundColor: 'var(--softGray-color)' }}/>
                                <MenuItem onClick={handleUserSignOut}>
                                    Log Out
                                </MenuItem>
                            </Menu>

                            {/* Cart Icon with Drawer */}
                            <IconButton onClick={() => setCartDrawerOpen(true)} sx={{ color: 'var(--primary-color)', position: 'relative' }}>
                                <ShoppingCartIcon sx={{ fontSize: '32px' }} />
                                {cartItems.length > 0 && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: 'var(--primary-color)',
                                            borderRadius: '50%',
                                            border: '2px solid var(--softWhite-color)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Typography variant="caption" sx={{ color: 'var(--softWhite-color)' }}>
                                            {cartItems.length}
                                        </Typography>
                                    </Box>
                                )}
                            </IconButton>
                        </Box>
                    )}

                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <IconButton onClick={handleDrawerToggle} sx={{ color: 'black' }}>
                            <MenuIcon />
                        </IconButton>
                    )}
                </Toolbar>

                {/* Mobile Drawer */}
                <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
                    <Box sx={{ width: 250, padding: 2 }}>
                        <List>
                            <ListItem component={Link} to="/settings" onClick={handleDrawerToggle} sx={{color: 'var(--secondary-color)'}}>
                                <AccountCircleIcon sx={{ marginRight: 2, color: 'var(--primary-color)' }} /> Account
                            </ListItem>
                            <ListItem component={Link} to="/cart" onClick={handleDrawerToggle} sx={{color: 'var(--secondary-color)'}}>
                                <ShoppingCartIcon sx={{ marginRight: 2, color: 'var(--primary-color)' }} /> Cart
                            </ListItem>
                            {navigationLinks.map((link) => (
                                <ListItem key={link.to} component={Link} to={link.to} onClick={handleDrawerToggle} sx={{color: 'var(--secondary-color)'}}>
                                    <ListItemText primary={link.label} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </AppBar>

            {/* Cart Drawer */}
            <CartDrawerComponent isOpen={cartDrawerOpen} toggleDrawer={handleCartDrawerToggle} />

            <Outlet/>
        </>
    );
}

export default Rootlayout;