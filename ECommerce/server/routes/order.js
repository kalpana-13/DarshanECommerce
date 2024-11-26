const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Order = require('../models/order'); // Import the Order model

// POST endpoint to create a new order
router.post('/newOrder', async (req, res) => {
    try {
        const { cartItems, totalPrice, gst, discount, finalTotal, paymentMethod, orderDate } = req.body;

        const newOrder = new Order({
            cartItems,
            totalPrice: parseFloat(totalPrice),
            gst: parseFloat(gst),
            discount: parseFloat(discount),
            finalTotal: parseFloat(finalTotal),
            paymentMethod,
            orderDate: orderDate || new Date(),
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', orderData: newOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Failed to place the order', error: error.message });
    }
});

// GET endpoint to fetch all orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
});

// GET endpoint to fetch a single order by ID
router.get('/orders/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Failed to fetch order', error: error.message });
    }
});

// PATCH endpoint to update the status of an order
router.patch('/orders/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            message: `Order status updated to ${status}`,
            orderData: updatedOrder,
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Failed to update order status', error: error.message });
    }
});

module.exports = router;
