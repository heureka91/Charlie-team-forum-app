import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/react';
import validationSchema from './validationSchema';

interface FormValues {
    username: string;
    password: string;
    passwordConfirm: string;
    firstName: string;
    lastName: string;
}

const RegistrationForm: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const formik = useFormik<FormValues>({
        initialValues: {
            username: '',
            password: '',
            passwordConfirm: '',
            firstName: '',
            lastName: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setError(null);
            try {
                const response = await fetch('http://localhost:5000/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    const data = await response.json();
                    alert('Sikeres regisztráció!');
                    resetForm();
                    navigate('/login');
                } else {
                    const errorData = await response.json();
                    switch (response.status) {
                        case 400:
                            throw new Error(errorData.message || 'A bevitt adatok érvénytelenek.');
                        case 409:
                            throw new Error(errorData.message || 'A felhasználó már létezik.');
                        default:
                            throw new Error(errorData.message || 'Ismeretlen hiba történt.');
                    }
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Ismeretlen hiba történt.');
                }
            }
        },
    });

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2 style={{ textAlign: 'center' }}>Regisztrációs űrlap</h2>
            <form onSubmit={formik.handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="email"
                        name="username"
                        placeholder="Felhasználónév"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
                    />
                    {formik.touched.username && formik.errors.username && (
                        <div style={{ color: 'red' }}>{formik.errors.username}</div>
                    )}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Jelszó"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div style={{ color: 'red' }}>{formik.errors.password}</div>
                    )}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="password"
                        name="passwordConfirm"
                        placeholder="Jelszó megerősítése"
                        value={formik.values.passwordConfirm}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
                    />
                    {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
                        <div style={{ color: 'red' }}>{formik.errors.passwordConfirm}</div>
                    )}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Keresztnév"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                        <div style={{ color: 'red' }}>{formik.errors.firstName}</div>
                    )}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Vezetéknév"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                        <div style={{ color: 'red' }}>{formik.errors.lastName}</div>
                    )}
                </div>
                {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
                <ButtonGroup>
                    <Button type="submit" colorScheme="green" width="100%" isLoading={formik.isSubmitting} isDisabled={!formik.isValid || formik.isSubmitting}>
                        Regisztráció
                    </Button>
                    <Button type="button" colorScheme="red" width="100%" onClick={() => formik.resetForm()}>
                        Mégsem
                    </Button>
                </ButtonGroup>
            </form>
        </div>
    );
};

export default RegistrationForm;
