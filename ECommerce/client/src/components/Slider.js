import React, { useState, useEffect } from 'react';
import styles from './Slider.module.scss';

export default function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Images stored in the public folder
    const slides = [
        "/slide1.jpg",
        "/slide2.jpg",
        "/slide3.jpg"
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length); // Move forward
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); // Move backward
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000); // Auto-slide every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.Slider}>
            <div
                className={styles.slides}
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className={styles.slide}>
                        <img src={slide} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>
            <button className={styles.prev} onClick={prevSlide}>Previous</button>
            <button className={styles.next} onClick={nextSlide}>Next</button>
        </div>
    );
}
