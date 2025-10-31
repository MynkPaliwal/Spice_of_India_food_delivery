import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "firebase/auth";
import { auth } from "../firebase/setup";
import foodLogo from "../assets/foodLogo.png";
import userIcon from "../assets/userIcon.png";
import "../css/navbar.scss";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Ensure proper mobile text rendering
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="logo-section">
          <Link to="/" className="logo-link" onClick={closeMobileMenu}>
            <img src={foodLogo} alt="Food Logo" className="logo" />
            <span className="brand-name">Spice of India</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav" role="navigation" aria-label="Main navigation">
          <Link to="/" className="nav-link" onClick={closeMobileMenu} aria-label="Go to home page">
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Home</span>
          </Link>
          <Link to="/menu" className="nav-link" onClick={closeMobileMenu} aria-label="View menu">
            <span className="nav-icon">🍽️</span>
            <span className="nav-text">Menu</span>
          </Link>
          <Link to="/about" className="nav-link" onClick={closeMobileMenu} aria-label="Learn about us">
            <span className="nav-icon">ℹ️</span>
            <span className="nav-text">About</span>
          </Link>
          <Link to="/contact" className="nav-link" onClick={closeMobileMenu} aria-label="Contact us">
            <span className="nav-icon">📞</span>
            <span className="nav-text">Contact</span>
          </Link>
        </nav>

        {/* User Actions */}
        <div className="user-actions">
          {!user ? (
            <Link to="/login" className="login-btn" onClick={closeMobileMenu} aria-label="Login to your account">
              <span className="nav-icon">🔐</span>
              <span className="nav-text">Login</span>
            </Link>
          ) : (
            <div className="authenticated-user">
              <Link to="/card" className="cart-btn" onClick={closeMobileMenu} aria-label="View shopping cart">
                <span className="nav-icon">🛒</span>
                <span className="nav-text">Cart</span>
              </Link>
              <button
                className="user-profile"
                onClick={() => {
                  navigate("/profile");
                  closeMobileMenu();
                }}
                aria-label="View user profile"
              >
                <img src={userIcon} alt="Profile" className="profile-img" />
                <span className="profile-name">{user.displayName || 'User'}</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Menu Toggle Button */}
      <button
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}>
        <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div className="sidebar-overlay" onClick={closeMobileMenu}></div>
      )}
    </>
  );
};

export default Navbar;
