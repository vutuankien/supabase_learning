import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Loading from './Loading';

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { session, signInUser, error } = UserAuth();

    useEffect(() => {
        if (session) {
            navigate('/dashboard');
        }
    }, [session, navigate]);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        const start = Date.now();
        await signInUser(email, password);
        const elapsed = Date.now() - start;
        setTimeout(() => setLoading(false), Math.max(0, 1000 - elapsed));
    };

    return (
        <div>
            {loading && <Loading />}
            <form onSubmit={handleSignIn} className="max-w-screen-md mx-auto p-6 rounded bg-white shadow-neutral-200">
                <h2 className="text-2xl font-bold pb-2">Sign In Today</h2>
                <p>
                    Do not have an account?{' '}
                    <Link to="/sign-up" className="text-blue-500 hover:underline">
                        Sign up!
                    </Link>
                </p>
                <div className="flex flex-col gap-4 mt-4">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email"
                        className="p-2 rounded-md border border-gray-300"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                        className="p-2 rounded-md border border-gray-300"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 p-2 bg-gray-800 cursor-pointer text-white rounded-md"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                    {error && <p className="text-red-600 text-center pt-4">{error}</p>}
                </div>
            </form>
        </div>
    );
};

export default SignIn;