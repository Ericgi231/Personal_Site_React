import './Footer.css';

const Footer = () => {
    return (
        <div className="Box">
            <p style={{ textAlign: "center", marginTop: "10px" }}>
                A Computer Science Portal for Geeks!
            </p>
            <div className="FooterContainer">
                <div className="Row">
                    <div className="Column">
                        <p>About Us</p>
                        <a href="#">Aim</a>
                        <a href="#">Vision</a>
                        <a href="#">Testimonials</a>
                    </div>
                    <div className="Column">
                        <p>Services</p>
                        <a href="#">Writing</a>
                        <a href="#">Internships</a>
                        <a href="#">Coding</a>
                        <a href="#">Teaching</a>
                    </div>
                    <div className="Column">
                        <p>Contact Us</p>
                        <a href="#">Uttar Pradesh</a>
                        <a href="#">Ahemdabad</a>
                        <a href="#">Indore</a>
                        <a href="#">Mumbai</a>
                    </div>
                    <div className="Column">
                        <p>Social Media</p>
                        <a href="#">
                            <i className="fab fa-facebook-f" style={{ marginRight: "10px" }}></i>
                            Facebook
                        </a>
                        <a href="#">
                            <i className="fab fa-instagram" style={{ marginRight: "10px" }}></i>
                            Instagram
                        </a>
                        <a href="#">
                            <i className="fab fa-twitter" style={{ marginRight: "10px" }}></i>
                            Twitter
                        </a>
                        <a href="#">
                            <i className="fab fa-youtube" style={{ marginRight: "10px" }}></i>
                            YouTube
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;