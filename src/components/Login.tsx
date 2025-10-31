import React, { useState } from 'react';
import '../css/Login.scss';
import { auth } from '../firebase/setup';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { db } from '../firebase/setup';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [dob, setDob] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isSignUp, setIsSignUp] = useState<boolean>(true);
    const navigate = useNavigate();

    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError('');
        try {
            if (isSignUp) {
                console.log('Starting signup process...');
                const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, emailAddress, password);
                const user = userCredential.user;
                console.log('User created successfully:', user.uid);
                
                await new Promise(resolve => setTimeout(resolve, 500));
                
                console.log('Creating user document in Firestore...');
                await setDoc(doc(db, 'users', user.uid), {
                    name,
                    dob,
                    email: emailAddress,
                    createdAt: new Date().toISOString()
                });
                console.log('User document created successfully');
                navigate('/', { state: { showToast: true } });
            } else {
                console.log('Starting signin process...');
                const userCredential = await signInWithEmailAndPassword(auth, emailAddress, password);
                console.log('User signed in successfully');
                await new Promise(resolve => setTimeout(resolve, 100));
                navigate('/', { state: { showToast: true } });
            }
        } catch (err: unknown) {
            console.error('Authentication error:', err);
            const error = err as { code?: string; message?: string };
            let message = 'Something went wrong';
            
            if (error.code === 'auth/email-already-in-use') {
                message = 'This email is already registered. Please sign in instead.';
            } else if (error.code === 'auth/weak-password') {
                message = 'Password should be at least 6 characters.';
            } else if (error.code === 'auth/invalid-email') {
                message = 'Invalid email address.';
            } else if (error.code === 'auth/user-not-found') {
                message = 'No account found with this email. Please sign up first.';
            } else if (error.code === 'auth/wrong-password') {
                message = 'Incorrect password.';
            } else if (error.message) {
                message = error.message;
            }
            
            setError(message);
        }
    };

    return (
        <div className="login">
            <form onSubmit={handleEmailSubmit} className="form">
                <h2 className="title">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
                {isSignUp && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            className="input"
                            required={isSignUp}
                        />
                        <input
                            type="date"
                            placeholder="Enter Date of Birth"
                            value={dob}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDob(e.target.value)}
                            className="input"
                            required={isSignUp}
                        />
                    </>
                )}
                <input
                    type="email"
                    placeholder="Enter E-mail Address"
                    value={emailAddress}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailAddress(e.target.value)}
                    className="input"
                    required
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className="input"
                    required
                />
                <button type="submit" className="btn primary">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
                <button
                    type="button"
                    className="btn"
                    style={{ background: 'none', color: '#007bff', marginTop: 10, boxShadow: 'none', fontWeight: 600 }}
                    onClick={() => setIsSignUp((prev) => !prev)}
                >
                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </button>
                {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
            </form>
        </div>
    );
}

export default Login;


