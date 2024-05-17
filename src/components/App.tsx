<<<<<<< HEAD
// components/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Profile from './Profile';
import UpdateUserForm from './UpdateUserForm';
import ChangePasswordForm from './ChangePasswordForm';

const App: React.FC = () => (
    <ChakraProvider>
        <Router>
            <Routes>
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/update" element={<UpdateUserForm />} />
                <Route path="/change-password" element={<ChangePasswordForm />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    </ChakraProvider>
);

export default App;
=======
// components/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Profile from './Profile';
import UpdateUserForm from './UpdateUserForm';
import ChangePasswordForm from './ChangePasswordForm';

const App: React.FC = () => (
    <ChakraProvider>
        <Router>
            <Routes>
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/update" element={<UpdateUserForm />} />
                <Route path="/change-password" element={<ChangePasswordForm />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    </ChakraProvider>
);

export default App;
>>>>>>> 8a41e603a73576420e5cce7727e64d81b17dcdd4
