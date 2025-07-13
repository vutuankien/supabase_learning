import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { signUpNewUser, error } = UserAuth();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        const start = Date.now();
        const result = await signUpNewUser(email, password);
        const elapsed = Date.now() - start;
        setTimeout(() => {
            setLoading(false);
            if (result && result.success) {
                navigate('/sign-in');
            }
        }, Math.max(0, 1000 - elapsed));
    };

    return (
        <div>
            <form onSubmit={handleSignUp} className="max-w-screen-md mx-auto p-6 rounded bg-white shadow-neutral-200">
                <h2 className="text-2xl font-bold pb-2">Sign Up Today</h2>
                <p>
                    Already have an account?{' '}
                    <Link to="/sign-in" className="text-blue-500 hover:underline">
                        Sign in!
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
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    {error && <p className="text-red-600 text-center pt-4">{error}</p>}
                </div>
            </form>
        </div>
    );
};

export default SignUp;