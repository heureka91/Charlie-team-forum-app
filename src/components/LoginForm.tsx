import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import LoginFormView from './LoginFormView';

const LoginForm: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/profile');
        }
    }, [navigate]);

    const validationSchema = Yup.object({
        username: Yup.string().email('Érvénytelen email cím').required('Kötelező mező'),
        password: Yup.string()
            .min(8, 'A jelszónak legalább 8 karakter hosszúnak kell lennie')
            .matches(/\d/, 'A jelszónak tartalmaznia kell legalább egy számot')
            .matches(/[a-z]/, 'A jelszónak tartalmaznia kell legalább egy kisbetűt')
            .required('Kötelező mező'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setError(null);
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.accessToken);
                    toast({
                        title: 'Sikeres bejelentkezés',
                        description: 'Sikeresen bejelentkeztél!',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });
                    navigate('/profile');
                } else {
                    const errorData = await response.json();
                    switch (response.status) {
                        case 400:
                            throw new Error(errorData.message || 'A bevitt adatok érvénytelenek.');
                        case 401:
                            throw new Error(errorData.message || 'Hibás felhasználónév vagy jelszó.');
                        default:
                            throw new Error(errorData.message || 'Ismeretlen hiba történt.');
                    }
                }
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                    toast({
                        title: 'Hiba történt',
                        description: err.message,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    setError('Ismeretlen hiba történt.');
                    toast({
                        title: 'Hiba történt',
                        description: 'Ismeretlen hiba történt.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                }
            } finally {
                setLoading(false);
            }
        },
    });

    return <LoginFormView formik={formik} error={error} loading={loading} />;
};

export default LoginForm;
