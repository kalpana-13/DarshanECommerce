import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styles from './ProductPage.module.scss';
import products from './sampleProducts.json'; // Import the JSON data

export default function ProductPage(props) {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);

    // Fetch product details based on ID from the URL
    useEffect(() => {
        const selectedProduct = products.find(product => product.id === parseInt(id));
        setProduct(selectedProduct);
    }, [id]);

    if (!product) return <div>Loading...</div>; // Handle loading state if product is not found

    // Generate some random reviews
    const generateRandomReviews = () => {
        const reviews = [
            { user: 'John Doe', rating: 5, text: 'Excellent product! Highly recommend.' },
            { user: 'Jane Smith', rating: 4, text: 'Very good, but could use some improvements.' },
            { user: 'Samuel L', rating: 3, text: 'It’s okay, not great but not bad either.' },
            { user: 'Alice W', rating: 2, text: 'Not what I expected, disappointed with the quality.' },
            { user: 'Bob J', rating: 1, text: 'Very poor quality. Would not recommend.' }
        ];
        return reviews;
    };

    const randomReviews = generateRandomReviews();

    // Get recommendations from the same category as the current product
    const getCategoryRecommendations = () => {
        const category = product.category; // Current product's category
        const relatedProducts = products.filter(p => p.category === category && p.id !== parseInt(id)); // Filter by category
        return relatedProducts.sort(() => 0.5 - Math.random()).slice(0, 4); // Get 4 random products from the same category
    };

    const relatedProducts = getCategoryRecommendations();

    return (
        <div className={styles.ProductPage}>
            <div className={styles.main}>
                <div className={styles.images}>
                    <img src={product.productImage} alt={product.title} />
                </div>
                <div className={styles.info}>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <span className={styles.rating}>
                        <Icon icon="material-symbols:star" width="1.2em" height="1.2em" />
                        <p>{product.rating}</p>
                    </span>
                    <p>{product.price}</p>
                    <div className={styles.actions}>
                        <button onClick={() => props.addToCart(product)}>Add to Cart</button>
                    </div>
                </div>
            </div>

            <div className={styles.reviews}>
                <h4>Customer Reviews</h4>
                {randomReviews.map((review, index) => (
                    <div key={index} className={styles.review}>
                        <p><strong>{review.user}</strong> - {review.rating} stars</p>
                        <p>{review.text}</p>
                    </div>
                ))}
            </div>

            <div className={styles.recommendations}>
                <h4>Related Products</h4>
                <div className={styles.relatedProducts}>
                    {relatedProducts.map(product => (
                        <div key={product.id} className={styles.relatedProduct}>
                            <img src={product.productImage} alt={product.title} />
                            <p>{product.title}</p>
                            <p>{product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
