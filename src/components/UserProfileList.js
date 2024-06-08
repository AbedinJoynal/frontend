import React from 'react';
import { Link } from 'react-router-dom';

function UserProfileList({ users, onDeleteConfirmation }) {
    return (
        <div>
            <h2>User Profiles</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        <Link to={`/profile/${user._id}`}>
                            {user.name} - {user.profession}
                        </Link>
                        <button onClick={() => onDeleteConfirmation(user._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserProfileList;
