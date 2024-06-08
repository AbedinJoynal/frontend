import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userAPI from '../services/userAPI';

function EditProfileForm({ user }) {
    const [profession, setProfession] = useState(user.profession);
    const [interests, setInterests] = useState(user.interests || []);
    const [bio, setBio] = useState(user.bio || '');
    const { userId } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedUser = { profession, interests, bio };
        try {
            await userAPI.updateUser(userId, updatedUser);
            navigate('/'); // Redirect to the home page after successful update
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleInterestChange = (event) => {
        const newInterests = event.target.value
            .split(',')
            .map((interest) => interest.trim());
        setInterests(newInterests);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>
            <div>
                <label htmlFor="profession">Profession:</label>
                <select
                    id="profession"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    required
                >
                    <option value="Marketing Professional">
                        Marketing Professional
                    </option>
                    <option value="Entrepreneur">Entrepreneur</option>
                    <option value="Content Creator">Content Creator</option>
                </select>
            </div>
            <div>
                <label htmlFor="interests">Interests (comma-separated):</label>
                <input
                    type="text"
                    id="interests"
                    value={interests.join(', ')}
                    onChange={handleInterestChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="bio">Bio (under 50 words):</label>
                <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Save Changes</button>
        </form>
    );
}

export default EditProfileForm;
