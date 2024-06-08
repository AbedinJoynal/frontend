import React from 'react';

function UserProfile({ user }) {
    if (!user) {
        return <div>Loading user profile...</div>;
    }

    return (
        <div>
            <h2>{user.name}'s Profile</h2>
            <p>Profession: {user.profession}</p>
            <p>Interests: {user.interests.join(', ')}</p>
            <p>Bio: {user.bio}</p>
        </div>
    );
}

export default UserProfile;
