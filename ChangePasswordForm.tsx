import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Box, Text, Input, VStack } from '@chakra-ui/react';

const ChangePasswordForm: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        oldPassword: Yup.string()
            .min(8, 'A jelszónak legalább 8 karakter hosszúnak kell lennie')
            .matches(/\d/, 'A jelszónak tartalmaznia kell legalább egy számot')
            .matches(/[a-z]/, 'A jelszónak tartalmaznia kell legalább egy kisbetűt')
            .required('Kötelező mező'),
        password: Yup.string()
            .min(8, 'A jelszónak legalább 8 karakter hosszúnak kell lennie')
            .matches(/\d/, 'A jelszónak tartalmaznia kell legalább egy számot')
            .matches(/[a-z]/, 'A jelszónak tartalmaznia kell legalább egy kisbetűt')
            .notOneOf([Yup.ref('oldPassword')], 'Az új jelszó nem egyezhet meg a régi jelszóval')
            .required('Kötelező mező'),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password')], 'A két jelszó nem egyezik meg')
            .required('Kötelező mező'),
    });

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            password: '',
            passwordConfirm: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setError(null);
            setSuccessMessage(null);
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/user/login', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    setSuccessMessage('Jelszó sikeresen megváltoztatva!');
                    setTimeout(() => {
                        navigate('/profile');
                    }, 2000);
                } else {
                    const errorData = await response.json();
                    switch (response.status) {
                        case 400:
                            throw new Error(errorData.message || 'A bevitt adatok érvénytelenek.');
                        case 401:
                            throw new Error(errorData.message || 'Hiányzó vagy érvénytelen token.');
                        case 409:
                            throw new Error(errorData.message || 'A régi és az új jelszó azonos.');
                        default:
                            throw new Error(errorData.message || 'Ismeretlen hiba történt.');
                    }
                }
            } catch (err) {
                if (err instanceof Error) {
                    if (err.message === 'Hiányzó vagy érvénytelen token.') {
                        localStorage.removeItem('token');
                        navigate('/login');
                    } else {
                        setError(err.message);
                    }
                } else {
                    setError('Ismeretlen hiba történt.');
                }
            }
        },
    });

    return (
        <Box maxWidth="400px" margin="auto" padding="20px" border="1px solid #ccc" borderRadius="5px">
            <Text as="h2" textAlign="center">Jelszó Módosítása</Text>
            <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4}>
                    <Input
                        type="password"
                        name="oldPassword"
                        placeholder="Régi Jelszó"
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.oldPassword && !!formik.errors.oldPassword}
                        errorBorderColor="crimson"
                    />
                    {formik.touched.oldPassword && formik.errors.oldPassword && (
                        <Text color="red">{formik.errors.oldPassword}</Text>
                    )}
                    <Input
                        type="password"
                        name="password"
                        placeholder="Új Jelszó"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.password && !!formik.errors.password}
                        errorBorderColor="crimson"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <Text color="red">{formik.errors.password}</Text>
                    )}
                    <Input
                        type="password"
                        name="passwordConfirm"
                        placeholder="Új Jelszó Megerősítése"
                        value={formik.values.passwordConfirm}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.passwordConfirm && !!formik.errors.passwordConfirm}
                        errorBorderColor="crimson"
                    />
                    {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
                        <Text color="red">{formik.errors.passwordConfirm}</Text>
                    )}
                    {error && <Text color="red" textAlign="center" marginTop="10px">{error}</Text>}
                    {successMessage && <Text color="green" textAlign="center" marginTop="10px">{successMessage}</Text>}
                    <ButtonGroup>
                        <Button type="submit" colorScheme="green" width="100%" isDisabled={!formik.isValid || formik.isSubmitting}>
                            Mentés
                        </Button>
                    </ButtonGroup>
                </VStack>
            </form>
        </Box>
    );
};

export default ChangePasswordForm;
