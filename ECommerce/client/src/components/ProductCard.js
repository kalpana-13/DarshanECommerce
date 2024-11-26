import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';

export default function ProductCard({ id, productImage, title, description, price, addToCart }) {
    return (
        <div className={styles.Productcard}>
            <img src={productImage} alt={title} className={styles.productImage} />
            <h4>{title}</h4>
            <p>{description}</p>
            <p>{price}</p>
            <div>
                <button onClick={() => addToCart({ id, productImage, title, price })} className={styles.addToCart}>Add to Cart</button>
            </div>
            <Link to={`/product/${id}`} className={styles.viewProduct} >View Details</Link> {/* Added Link */}
        </div>
    );
}
