const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4 mt-auto">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>About Us</h5>
                        <p>We are committed to delivering exceptional services and innovative solutions to meet the needs of our valued customers.</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-light">Home</a></li>
                            <li><a href="/services" className="text-light">Services</a></li>
                            <li><a href="/contact" className="text-light">Contact</a></li>
                            <li><a href="/about" className="text-light">About Us</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Contact Us</h5>
                        <p>Email: support@yourcompany.com</p>
                        <p>Phone: +1 (800) 123-4567</p>
                        <p>Address: 123 Business Avenue, Suite 456, City, Country</p>
                    </div>
                </div>
                <hr className="bg-light" />
                <div className="text-center">
                    <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
