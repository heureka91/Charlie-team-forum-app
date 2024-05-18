import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Profile from './Profile';
import UpdateUserForm from './UpdateUserForm';
import ChangePasswordForm from './ChangePasswordForm';

// Mock authentication function
const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

const App: React.FC = () => (
    <ChakraProvider>
        <Router>
            <Routes>
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route
                    path="/profile"
                    element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />}
                />
                <Route
                    path="/update"
                    element={isAuthenticated() ? <UpdateUserForm /> : <Navigate to="/login" />}
                />
                <Route
                    path="/change-password"
                    element={isAuthenticated() ? <ChangePasswordForm /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    </ChakraProvider>
);

export default App;
