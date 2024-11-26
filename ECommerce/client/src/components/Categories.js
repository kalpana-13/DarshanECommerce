import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Categories.module.scss'

export default function Categories() {
    return (
        <div className={`${styles.Categories} ${localStorage.getItem('theme') == 'light' ? styles.light : styles.dark}`}>
            <li>
                <Link to="/electronics">
                    <img src="/electronics.jpg" className={styles.categoryImage} alt="Electronics" />
                    <h4>Electronics</h4>
                </Link>
            </li>
            <li>
                <Link to="/fashion">
                    <img src="fashion.jpg" className={styles.categoryImage} alt="Fashion" />
                    <h4>Fashion</h4>
                </Link>
            </li>
            <li>
                <Link to="/homeAppliances">
                    <img src="appliances.jpg" className={styles.categoryImage} alt="Home Appliances" />
                    <h4>Home Appliances</h4>
                </Link>
            </li>
            <li>
                <Link to="/gaming">
                    <img src="/gaming.jpg" className={styles.categoryImage} alt="Sports" />
                    <h4>Gaming</h4>
                </Link>
            </li>
            <li>
                <Link to="/books">
                    <img src="books.jpg" className={styles.categoryImage} alt="Books" />
                    <h4>Books</h4>
                </Link>
            </li>
        </div>
    )
}
