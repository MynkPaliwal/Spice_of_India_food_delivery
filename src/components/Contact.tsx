import '../css/Contact.scss'
import React from 'react';
import contactImage from '../assets/pepperoni.jpg';

interface ContactProps {
    heading?: string;
    intro?: string;
}

const Contact: React.FC<ContactProps> = ({ heading = 'Contact Us', intro = 'For any questions or concerns, please feel free to contact us.' }) => {
    return (
        <div className="contact">
            <img src={contactImage} alt="Contact" />
            <div className="contactText">
                <h1>{heading}</h1>
                <p>{intro}</p>
                <form method="POST">
                    <label htmlFor="name">Full Name</label>
                    <input name="name" placeholder="Enter your name..." type="text" />
                    <label htmlFor="email">Email</label>
                    <input name="email" placeholder="Enter email..." type="email" />
                    <label htmlFor="message">Message</label>
                    <textarea
                        rows={6}
                        placeholder="Enter message..."
                        name="message"
                        required
                    ></textarea>
                </form>
                <button type="submit"> Send Message</button>
            </div>
        </div>
    )
}

export default Contact;


