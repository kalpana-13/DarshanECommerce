import React from 'react';
import styles from './Footer.module.scss';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <div className={styles.Footer}>
            <div className={styles.footerTop}>
                <div className={styles.footerSection}>
                    <h3>About Us</h3>
                    <p>We are a leading eCommerce platform offering a wide range of quality products at competitive prices. Our mission is to provide excellent customer service and deliver products right to your doorstep.</p>
                </div>
                <div className={styles.footerSection}>
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Shop</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className={styles.footerSection}>
                    <h3>Contact Us</h3>
                    <p>Email: newdarshan.mokama@gmail.com</p>
                    <p>Phone: +91 9852622628</p>
                    <p>Address: Ward No. 2, Station Road, Mokama, Patna</p>
                </div>
                <div className={styles.footerSection}>
                    <h3>Follow Us</h3>
                    <div className={styles.socialIcons}>
                        <a href="#" target="_blank" rel="noopener noreferrer"><FaFacebook size={24} /></a>
                        <a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter size={24} /></a>
                        <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram size={24} /></a>
                        <a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>
                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>&copy; 2024 Darshan Enterprises. All Rights Reserved.</p>
            </div>
        </div>
    );
}
