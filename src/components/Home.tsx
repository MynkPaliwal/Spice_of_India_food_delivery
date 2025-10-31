import React from 'react';
import '../css/Home.scss'
import homeImage from '../assets/homeImage.webp';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Home: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.showToast) {
            toast.success('Login successful!');
        }
    }, [location]);

    return (
        <div className="homePage">
            <ToastContainer 
                position="top-center" 
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{
                    fontSize: '14px',
                    borderRadius: '8px'
                }}
            />
            
            {/* Hero Section */}
            <section className="heroSection">
                <div className="heroContent">
                    <div className="heroText">
                        <h1 className="heroTitle">
                            Multi Restaurant <span className="highlight">Food Ordering & Delivery</span> Solution
                        </h1>
                        <p className="heroSubtitle">
                            Build your very own multi restaurant online food ordering & delivery business with our complete solution. 
                            Connect restaurants and customers in a single platform.
                        </p>
                        <div className="heroButtons">
                            <Link to="/menu" className="btnPrimary" aria-label="Order food from menu">Order Now</Link>
                        </div>
                    </div>
                    <div className="heroImage">
                        <img src={homeImage} alt="Food Delivery" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="featuresSection">
                <div className="container">
                    <h2 className="sectionTitle">What Comes with Our Platform?</h2>
                    <div className="featuresGrid">
                        <div className="featureCard">
                            <div className="featureIcon">🍽️</div>
                            <h3>Multi Restaurant Management</h3>
                            <p>Manage multiple restaurants from a single platform with zone-wise organization.</p>
                        </div>
                        <div className="featureCard">
                            <div className="featureIcon">📱</div>
                            <h3>Customer App</h3>
                            <p>Beautiful mobile app for customers to browse, order, and track their food delivery.</p>
                        </div>
                        <div className="featureCard">
                            <div className="featureIcon">🏪</div>
                            <h3>Restaurant Panel</h3>
                            <p>Complete dashboard for restaurant owners to manage orders, menu, and operations.</p>
                        </div>
                        <div className="featureCard">
                            <div className="featureIcon">🚚</div>
                            <h3>Delivery Management</h3>
                            <p>Efficient delivery system with real-time tracking and route optimization.</p>
                        </div>
                        <div className="featureCard">
                            <div className="featureIcon">💳</div>
                            <h3>Payment Integration</h3>
                            <p>Multiple payment options including digital wallets, cards, and cash on delivery.</p>
                        </div>
                        <div className="featureCard">
                            <div className="featureIcon">📊</div>
                            <h3>Analytics & Reports</h3>
                            <p>Comprehensive analytics to track sales, customer behavior, and business growth.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="howItWorksSection">
                <div className="container">
                    <h2 className="sectionTitle">How Does Our Platform Work?</h2>
                    <div className="stepsContainer">
                        <div className="step">
                            <div className="stepNumber">1</div>
                            <div className="stepContent">
                                <h3>Customer Places Order</h3>
                                <p>Customers browse restaurants, select food items, and place orders through our app or website.</p>
                            </div>
                        </div>
                        <div className="step">
                            <div className="stepNumber">2</div>
                            <div className="stepContent">
                                <h3>Restaurant Accepts Order</h3>
                                <p>Restaurant receives the order notification and accepts it, then starts preparing the food.</p>
                            </div>
                        </div>
                        <div className="step">
                            <div className="stepNumber">3</div>
                            <div className="stepContent">
                                <h3>Delivery Assignment</h3>
                                <p>Our system automatically assigns the nearest available delivery person to pick up the order.</p>
                            </div>
                        </div>
                        <div className="step">
                            <div className="stepNumber">4</div>
                            <div className="stepContent">
                                <h3>Food Preparation</h3>
                                <p>Restaurant prepares the food and hands it over to the delivery person when ready.</p>
                            </div>
                        </div>
                        <div className="step">
                            <div className="stepNumber">5</div>
                            <div className="stepContent">
                                <h3>Delivery to Customer</h3>
                                <p>Delivery person delivers the food to the customer's location with real-time tracking.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="ctaSection">
                <div className="container">
                    <div className="ctaContent">
                        <h2>Ready to Start Your Food Delivery Business?</h2>
                        <p>Join thousands of successful food delivery businesses worldwide</p>
                        <div className="ctaButtons">
                            <Link to="/menu" className="btnPrimary" role="button" aria-label="Get started with our platform">Get Started</Link>
                            <Link to="/contact" className="btnSecondary" role="button" aria-label="Contact us for more information">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;



