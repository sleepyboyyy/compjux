import './Rootlayout.css'
import {Link, NavLink, Outlet, useNavigate} from "react-router-dom";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import AccountSVG from "../../svg_icons/AccountSVG";
import CartSVG from "../../svg_icons/CartSVG";
import SearchSVG from "../../svg_icons/SearchSVG";


function Rootlayout() {
    const navigate = useNavigate();

    // Handlers
    // Account Click Handler
    const handleAccountClick = () => {
        navigate("/account_settings");
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Link to="/" className="navbar-brand me-4">Compjux</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Link to="/" className="nav-link mx-2" >Daily Special</Link>

                            {/* DROPDOWN GAMING PCs*/}
                            <NavDropdown title="Gaming PCs" className="mega-menu mx-2" id="basic-nav-dropdown"
                                         renderMenuOnMount={true}>
                                <div className="d-flex justify-content-evenly py-4">
                                    <div className="dropdown-section">
                                        <h2 className="dropdown-header">Featured</h2>
                                        <Link to="/" className="dropdown-item">Best Selling Gaming PCs</Link>
                                        <Link to="/" className="dropdown-item">AMD Gaming PCs</Link>
                                        <Link to="/" className="dropdown-item">GeForce Selling Gaming PCs</Link>
                                    </div>
                                    <div className="dropdown-section">
                                        <Link to="/" className="dropdown-item">Creator Series</Link>
                                        <Link to="/" className="dropdown-item">Signature Series</Link>
                                        <Link to="/" className="dropdown-item">Powered By Asus PCs</Link>
                                    </div>
                                    <div className="dropdown-section">
                                        <Link to="/" className="dropdown-item">Luxe Series</Link>
                                        <Link to="/" className="dropdown-item">EVO mini Series</Link>
                                        <Link to="/" className="dropdown-item">Corsair iCUE Series</Link>
                                    </div>
                                </div>
                            </NavDropdown>

                            {/* DROPDOWN GAMING Laptops*/}
                            <NavDropdown title="Gaming Laptops" className="mega-menu mx-2" id="basic-nav-dropdown"
                                         renderMenuOnMount={true}>
                                <div className="d-flex justify-content-evenly py-4">
                                    <div className="dropdown-section">
                                        <h2 className="dropdown-header">Featured Laptops</h2>
                                        <Link to="/" className="dropdown-item">Best Selling Gaming Laptops</Link>
                                        <Link to="/" className="dropdown-item">AMD Gaming Laptops</Link>
                                        <Link to="/" className="dropdown-item">GeForce Gaming Laptops</Link>
                                    </div>
                                    <div className="dropdown-section">
                                        <h2 className="dropdown-header">Asus Gaming Laptops</h2>
                                        <Link to="/" className="dropdown-item">Republic of Gamers - Series</Link>
                                        <Link to="/" className="dropdown-item">TUF Gaming - Series</Link>
                                    </div>
                                    <div className="dropdown-section">
                                        <h2 className="dropdown-header">Acer Gaming Laptops</h2>
                                        <Link to="/" className="dropdown-item">Predator - Series</Link>
                                        <Link to="/" className="dropdown-item">Nitro - Series</Link>
                                    </div>
                                    <div className="dropdown-section">
                                        <h2 className="dropdown-header">Lenovo Gaming Laptops</h2>
                                        <Link to="/" className="dropdown-item">Legion - Series</Link>
                                        <Link to="/" className="dropdown-item">LOQ - Series</Link>
                                        <Link to="/" className="dropdown-item">IdeaPad - Series</Link>
                                    </div>
                                </div>
                            </NavDropdown>
                            <Link to="/" className="nav-link mx-2">Gear Store</Link>
                            <Link to="/" className="nav-link mx-2">Support</Link>

                        </Nav>
                        <Nav className="ms-auto" >
                            <Link to="login" className="nav-link mx-1">
                                <AccountSVG />
                            </Link>
                            <Link to="/" className="nav-link mx-1">
                                <CartSVG />
                            </Link>
                            <Link to="/" className="nav-link mx-1">
                                <SearchSVG />
                            </Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet/>
        </>
    );
}

export default Rootlayout;