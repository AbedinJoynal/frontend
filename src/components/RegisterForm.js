import React, { useState } from 'react';

const RegisterForm = ({ onRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profession, setProfession] = useState('');
    const [interests, setInterests] = useState([]);
    const [bio, setBio] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, email, password, profession, interests, bio };
        await onRegister(userData);
    };

    const handleInterestChange = (e) => {
        const newInterests = e.target.value
            .split(',')
            .map((interest) => interest.trim());
        setInterests(newInterests);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <label htmlFor="profession">Profession:</label>
            <select
                id="profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                required
            >
                <option value="">Select Profession</option>
                <option value="Marketing Professional">
                    Marketing Professional
                </option>
                <option value="Entrepreneur">Entrepreneur</option>
                <option value="Content Creator">Content Creator</option>
            </select>
            <label htmlFor="interests">Interests (comma-separated):</label>
            <input
                type="text"
                id="interests"
                value={interests.join(', ')}
                onChange={handleInterestChange}
                required
            />
            <label htmlFor="bio">Bio (under 50 words):</label>
            <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
