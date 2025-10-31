import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/setup';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { User as FirebaseUser } from 'firebase/auth';
import CircularLoader from './CircularLoader';
import '../css/Profile.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import userIcon from '../assets/userIcon.png';

interface ProfileData {
    name: string;
    dob: string;
    email: string;
}

const Profile: React.FC = () => {
    const [userData, setUserData] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            navigate('/login');
            return;
        }
        const timer = setTimeout(() => {
            void fetchData(user);
        }, 1000);
        return () => clearTimeout(timer);
    }, [navigate]);

    const fetchData = async (user: FirebaseUser): Promise<void> => {
        try {
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data() as Partial<ProfileData>;
                setUserData({
                    name: data.name ?? '',
                    dob: data.dob ?? '',
                    email: data.email ?? ''
                });
            } else {
                console.warn('User document does not exist');
                setUserData({
                    name: user.displayName || '',
                    dob: '',
                    email: user.email || ''
                });
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUserData({
                name: user.displayName || '',
                dob: '',
                email: user.email || ''
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async (): Promise<void> => {
        await auth.signOut();
        navigate('/');
    };

    return (
        isLoading ? (
            <CircularLoader />
        ) : (
            <div className="profile">
                <div className="profileCard">
                    <img src={userIcon} alt="Profile" className="userIcon" />
                    <h2>User Profile</h2>
                    <div>
                        <AccountCircleIcon />
                        <span><strong>Name:</strong> {userData?.name}</span>
                    </div>
                    <div>
                        <CakeIcon />
                        <span><strong>Date of Birth:</strong> {userData?.dob}</span>
                    </div>
                    <div>
                        <EmailIcon />
                        <span><strong>Email:</strong> {userData?.email}</span>
                    </div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        )
    );
};

export default Profile;


