const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cartItems: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            price: { type: String, required: true },  // e.g., "$100"
        },
    ],
    totalPrice: { type: Number, required: true },
    gst: { type: Number, required: true },
    discount: { type: Number, required: true },
    finalTotal: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: 'Pending' },  // Example default status
    orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
