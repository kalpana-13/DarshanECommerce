import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import styles from './ProductList.module.scss';
import { useLocation } from 'react-router-dom';
import products from './sampleProducts.json'; // Import the product data

export default function SearchResults(props) {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q'); // Extract the search query from the URL
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Filter products based on the search query
    useEffect(() => {
        if (query) {
            const results = products.filter((product) =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(results);
        } else {
            setFilteredProducts([]);
        }
    }, [query]);

    return (
        <div className={`${styles.Products} ${localStorage.getItem('theme') === 'light' ? styles.light : styles.dark}`}>
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        {...product}
                        addToCart={props.addToCart}
                    />
                ))
            ) : (
                <p className={styles.noResults}>
                    No results found for "<strong>{query}</strong>"
                </p>
            )}
        </div>
    );
}
