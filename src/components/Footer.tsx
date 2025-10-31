import '../css/Footer.scss'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
    return (
        <div className="footer">
            <div className="footerIcons">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                    <TwitterIcon />
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FacebookIcon />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon />
                </a>
            </div>
            <p>&copy; DevReact 25</p>
        </div>
    )
}

export default Footer;
