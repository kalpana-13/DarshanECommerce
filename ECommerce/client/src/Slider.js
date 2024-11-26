import React from 'react'
import styles from './Slider.module.scss'

export default function Slider() {
    return (
        <div className={styles.slider}>
            < div className={styles.left} >
                <div className={styles.heading}>
                    <h3>This is heading</h3>
                </div>
                <div className={styles.text}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id non eaque corporis facilis autem beatae molestias nisi at consectetur quaerat.
                </div>
                <div className={styles.right}>
                    <img src="./slider1.jpg" alt="" height={"300px"} />
                </div>
            </div >
        </div>
    )
}
