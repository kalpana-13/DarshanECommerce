import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import styles from './ProductList.module.scss';
import products from './sampleProducts.json'; // Import the JSON data

export default function Electronics(props) {
    const [productList, setProductList] = useState([]);

    // Set the products state once the component is mounted and filter by electronics category
    useEffect(() => {
        const filteredProducts = products.filter(product => product.category === 'Fashion');
        setProductList(filteredProducts);
        console.log(filteredProducts);
    }, []); // Empty dependency array to run this effect only once after mount

    return (
        <div className={styles.Products}>
            {productList.map(product => (
                <ProductCard
                    key={product.id}
                    {...product}
                // addToCart={props.addToCart}
                />
            ))}
        </div>
    );
}
