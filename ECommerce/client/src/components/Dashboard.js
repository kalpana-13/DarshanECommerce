import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Dashboard.module.scss';

export default function Dashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all orders when component mounts
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/order/orders');
                const data = await response.json();
                console.log(data);  // Log to check if the data is correct

                // Ensure the backend response has the proper structure
                setOrders(data);
            } catch (error) {
                toast.error('Failed to fetch orders: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleOrderStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/order/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            // Show success toast
            toast.success(`Order ${orderId} marked as ${newStatus}`);

            // Refresh the orders list by updating the state
            const updatedOrders = orders.map(order =>
                order._id === orderId ? { ...order, status: newStatus } : order
            );
            setOrders(updatedOrders);

        } catch (error) {
            toast.error('Error updating order status: ' + error.message);
        }
    };

    if (loading) {
        return <div>Loading orders...</div>;
    }

    return (
        <div className={styles.Dashboard}>
            <h2>Admin Dashboard</h2>
            {orders.length === 0 ? (
                <p>No orders placed yet.</p>
            ) : (
                <div className={styles.ordersList}>
                    <table className={styles.ordersTable}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.customerName}</td>
                                    <td>${order.finalTotal.toFixed(2)}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <button
                                            className={styles.statusButton}
                                            onClick={() => handleOrderStatusChange(order._id, 'Shipped')}
                                            disabled={order.status === 'Shipped'}
                                        >
                                            Mark as Shipped
                                        </button>
                                        <button
                                            className={styles.statusButton}
                                            onClick={() => handleOrderStatusChange(order._id, 'Delivered')}
                                            disabled={order.status === 'Delivered'}
                                        >
                                            Mark as Delivered
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}
