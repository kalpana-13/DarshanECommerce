import React, { useRef, useState } from 'react'
import { Icon } from '@iconify/react';
import styles from './Login.module.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'

export default function Login(props) {
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const navigate = useNavigate();
    const url = "http://localhost:5000";

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${url}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // Specify the content type
                },
                body: JSON.stringify({
                    email: emailRef.current.value.toLowerCase(),
                    password: passRef.current.value
                })
            });

            const user = await response.json();

            if (!response.ok) {
                toast.error(user.alert);
                return;
            }

            // Store token and name in local storage
            localStorage.setItem('token', user.token);
            localStorage.setItem('name', user.name);
            localStorage.setItem('role', user.role); // Store the role as well

            toast.success("Success, logging you in...", { autoClose: 100 });

            // Set the user's name in the parent component
            props.setName(user.name);

            // Check role and navigate accordingly
            if (user.role === 'admin') {
                // Navigate to the admin dashboard if role is admin
                setTimeout(() => {
                    navigate('/dashboard'); // Assuming your admin dashboard route is '/admin-dashboard'
                }, 3000);
            } else {
                // Navigate to the home page if role is user
                setTimeout(() => {
                    navigate('/'); // Assuming home route is '/'
                }, 3000);
            }
        }
        catch (error) {
            toast.error("Some error occurred: " + error.message);
        }
    }

    const [hidden, setHidden] = useState(true);

    const togglePassword = () => {
        const passwordInput = document.getElementById('passwordInput');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            setHidden(false);
        } else {
            passwordInput.type = 'password';
            setHidden(true);
        }
    };

    return (
        <div className={styles.container}>
            <ToastContainer />
            <div className={styles.left}>
                <div className={styles.loginBox}>
                    <div className={styles.logo}>
                        <h3>LOGIN</h3>
                    </div>

                    <form className={styles.login} onSubmit={handleLogin}>
                        <input type="email" placeholder='Enter email address' required ref={emailRef} />
                        <div className={styles.password}>
                            <input type="password" placeholder='Enter your password' required minLength={8} ref={passRef} id='passwordInput' />
                            <span className={styles.togglePassword} onClick={togglePassword} id='togglePassword'>
                                {hidden ?
                                    <Icon icon="mdi:eye" /> :
                                    <Icon icon="ph:eye-closed-bold" />}
                            </span>
                        </div>
                        <button type="submit"><Icon icon="material-symbols:login" />Login</button>
                    </form>

                    <p>Don't have an account? <span><Link to='/signup' className={styles.loginSignup}>Create a new account</Link></span></p>
                </div>
            </div>
            <div className={styles.right}></div>
        </div>
    );
}
