import React, { useState, useEffect } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserProfileList from './components/UserProfileList';
import UserProfile from './components/UserProfile';
import EditProfileForm from './components/EditProfileForm';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import userAPI from './services/userAPI';

function App() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userAPI.getAllUsers();
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const fetchUser = async () => {
                try {
                    const response = await userAPI.getCurrentUser();
                    setCurrentUser(response.data);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            };
            fetchUser();
        }
    }, []);

    async function handleLogin(userData) {
        try {
            const response = await userAPI.login(userData);
            setCurrentUser(response.data);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Login error:', error);
        }
    }

    async function handleRegister(userData) {
        try {
            const response = await userAPI.register(userData);
            setCurrentUser(response.data);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Registration error:', error);
        }
    }

    async function handleDeleteUser() {
        try {
            await userAPI.deleteUser(userToDelete);
            setUsers(users.filter((user) => user._id !== userToDelete));
            setIsModalOpen(false);
            setUserToDelete(null);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    return (
        <Router>
            <div className="App">
                {currentUser ? (
                    <AuthenticatedApp
                        users={users}
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                        setUsers={setUsers}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        userToDelete={userToDelete}
                        setUserToDelete={setUserToDelete}
                    />
                ) : (
                    <UnauthenticatedApp
                        handleLogin={handleLogin}
                        handleRegister={handleRegister}
                    />
                )}
                {isModalOpen && (
                    <DeleteConfirmationModal
                        isOpen={isModalOpen}
                        onConfirm={handleDeleteUser}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}
            </div>
        </Router>
    );
}

function AuthenticatedApp({
    users,
    currentUser,
    setCurrentUser,
    setUsers,
    isModalOpen,
    setIsModalOpen,
    userToDelete,
    setUserToDelete,
}) {
    return (
        <>
            <h1>User Profile Manager</h1>
            <button onClick={handleLogout}>Logout</button>
            <Routes>
                <Route
                    path="/"
                    element={
                        <UserProfileList
                            users={users}
                            onDeleteConfirmation={handleDeleteConfirmation}
                        />
                    }
                />
                <Route
                    path="/profile/:userId"
                    element={<UserProfile user={currentUser} />}
                />
                <Route
                    path="/edit/:userId"
                    element={<EditProfileForm user={currentUser} />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );

    function handleLogout() {
        setCurrentUser(null);
        localStorage.removeItem('token');
    }

    function handleDeleteConfirmation(userId) {
        setIsModalOpen(true);
        setUserToDelete(userId);
    }
}

function UnauthenticatedApp({ handleLogin, handleRegister }) {
    return (
        <Routes>
            <Route
                path="/login"
                element={<LoginForm onLogin={handleLogin} />}
            />
            <Route
                path="/register"
                element={<RegisterForm onRegister={handleRegister} />}
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}

export default App;
