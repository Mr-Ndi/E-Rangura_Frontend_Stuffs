import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Sample interfaces for TypeScript
interface Order {
    id: number;
    items: string[];
    total: number;
    status: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
}

interface User {
    name: string;
    email: string;
}

interface Transaction {
    id: number;
    date: string;
    amount: number;
}

interface RFQ {
    id: number;
    requestDetails: string;
}

interface Shipping {
    id: number;
    address: string;
}

interface Notification {
    id: number;
    message: string;
}

// Order Management Component
const OrderManagement: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/my-orders/', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setOrders(response.data);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div>Loading orders...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="order-management">
            <h2>Your Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map(order => (
                    <div key={order.id}>
                        <h3>Order ID: {order.id}</h3>
                        <p>Status: {order.status}</p>
                        <p>Total Amount: ${order.total}</p>
                        {/* Add more order details as necessary */}
                    </div>
                ))
            )}
        </div>
    );
};

// Wishlist Component
const Wishlist: React.FC = () => {
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/my-wishlist/', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setWishlistItems(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchWishlist();
    }, []);

    return (
        <div className="wishlist">
            <h2>Your Wishlist</h2>
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                wishlistItems.map(item => (
                    <div key={item.id}>
                        <h3>{item.name}</h3>
                        <p>Price: ${item.price}</p>
                    </div>
                ))
            )}
        </div>
    );
};

// Account Information Component
const AccountInfo: React.FC = () => {
    const [userInfo, setUserInfo] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user-info/', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setUserInfo(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserInfo();
    }, []);

    return (
        <div className="account-info">
            <h2>Your Account Information</h2>
            {userInfo ? (
                <div>
                    <p>Name: {userInfo.name}</p>
                    <p>Email: {userInfo.email}</p>
                    {/* Add more fields as necessary */}
                </div>
            ) : (
                <p>Loading account information...</p>
            )}
        </div>
    );
};

// Transaction History Component
const TransactionHistory: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/my-transactions/', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setTransactions(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTransactions();
    }, []);

    return (
        <div className="transaction-history">
            <h2>Your Transaction History</h2>
            {transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                transactions.map(transaction => (
                    <div key={transaction.id}>
                        <h3>Transaction ID: {transaction.id}</h3>
                        <p>Date: {transaction.date}</p>
                        <p>Amount: ${transaction.amount}</p>
                    </div>
                ))
            )}
        </div>
    );
};

// RFQ Section Component
const RFQSection: React.FC = () => {
    const [rfqs, setRfqs] = useState<RFQ[]>([]);

    useEffect(() => {
        const fetchRFQs = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/my-rfqs/', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setRfqs(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRFQs();
    }, []);

    return (
        <div className="rfq-section">
            <h2>Your Requests for Quote</h2>
            {rfqs.length === 0 ? (
                <p>No RFQs submitted.</p>
            ) : (
                rfqs.map(rfq => (
                    <div key={rfq.id}>
                        <h3>RFQ ID: {rfq.id}</h3>
                        <p>Details: {rfq.requestDetails}</p>
                    </div>
                ))
            )}
        </div>
    );
};

// Shipping Information Component
const ShippingInfo: React.FC = () => {
    const [shippingDetails, setShippingDetails] = useState<Shipping[]>([]);

    useEffect(() => {
        const fetchShippingDetails = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/my-shipping-details/', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setShippingDetails(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchShippingDetails();
    }, []);

    return (
        <div className="shipping-info">
            <h2>Your Shipping Information</h2>
            {shippingDetails.length === 0 ? (
                <p>No shipping information available.</p>
            ) : (
                shippingDetails.map(detail => (
                    <div key={detail.id}>
                        <h3>Shipping ID: {detail.id}</h3>
                        <p>Address: {detail.address}</p>
                    </div>
                ))
            )}
        </div>
    );
};

// Notifications Component
const Notifications: React.FC = () => {
   const [notifications, setNotifications] = useState<Notification[]>([]);

   useEffect(() => {
       const fetchNotifications = async () => {
           try {
               const response = await axios.get('http://127.0.0.1:8000/api/my-notifications/', {
                   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
               });
               setNotifications(response.data);
           } catch (error) {
               console.error(error);
           }
       };
       fetchNotifications();
   }, []);

   return (
       <div className="notifications">
           <h2>Your Notifications</h2>
           {notifications.length === 0 ? (
               <p>No new notifications.</p>
           ) : (
               notifications.map(notification => (
                   <div key={notification.id}>
                       <p>{notification.message}</p>
                   </div>
               ))
           )}
       </div>
   );
};

// User Dashboard Component
const UserDashboard: React.FC = () => {

   return (
       <div className="user-dashboard">
           {/* Include all the sections */}
           <OrderManagement />
           <Wishlist />
           <AccountInfo />
           <TransactionHistory />
           <RFQSection />
           <ShippingInfo />
           <Notifications />
       </div>
   );
};

export default UserDashboard;
