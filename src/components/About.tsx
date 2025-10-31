import '../css/About.scss'

const About: React.FC = () => {
    return (
        <div className="about">
            <img src={require('../assets/mexicanCorn.webp')} alt="Making Dishes" />
            <div className="about-text">
                <h1>About Us</h1>
                <p>
                    Every dish is crafted with the finest, freshest ingredients and cooked to perfection. Our diverse menu offers something for everyone – from crisp, vibrant salads and hearty soups to sizzling appetizers, mouthwatering mains, and indulgent desserts.
                    We take pride in using authentic recipes inspired by global cuisines, bringing you flavors from Italy, Asia, the Mediterranean, and beyond. Whether you’re craving a juicy burger, a perfectly grilled steak, a wholesome vegetarian meal, or a delightful sweet treat, we’ve got you covered.
                    Our warm and friendly service ensures every visit feels special – whether you’re a local regular or a first-time guest. Come and explore our delicious food menu today, and let us make your dining experience unforgettable.
                </p>
            </div>
        </div>
    );
}

export default About;

