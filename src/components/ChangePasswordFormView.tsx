// src/ChangePasswordFormView.tsx
import React from 'react';
import { FormikProps } from 'formik';
import { Box, Button, ButtonGroup, Input, Text, Heading } from '@chakra-ui/react';

interface ChangePasswordFormViewProps {
    formik: FormikProps<{
        oldPassword: string;
        password: string;
        passwordConfirm: string;
    }>;
    error: string | null;
    onCancel: () => void;
}

const ChangePasswordFormView: React.FC<ChangePasswordFormViewProps> = ({ formik, error, onCancel }) => {
    return (
        <Box maxWidth="400px" margin="auto" padding="20px" border="1px solid #ccc" borderRadius="5px">
            <Heading as="h2" textAlign="center">Jelszó Módosítása</Heading>
            <form onSubmit={formik.handleSubmit}>
                <Box marginBottom="15px">
                    <Input
                        type="password"
                        name="oldPassword"
                        placeholder="Régi Jelszó"
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    {formik.touched.oldPassword && formik.errors.oldPassword && (
                        <Text color="red">{formik.errors.oldPassword}</Text>
                    )}
                </Box>
                <Box marginBottom="15px">
                    <Input
                        type="password"
                        name="password"
                        placeholder="Új Jelszó"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <Text color="red">{formik.errors.password}</Text>
                    )}
                </Box>
                <Box marginBottom="15px">
                    <Input
                        type="password"
                        name="passwordConfirm"
                        placeholder="Új Jelszó Megerősítése"
                        value={formik.values.passwordConfirm}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
                        <Text color="red">{formik.errors.passwordConfirm}</Text>
                    )}
                </Box>
                {error && <Text color="red" textAlign="center" marginTop="10px">{error}</Text>}
                <ButtonGroup width="100%">
                    <Button type="submit" colorScheme="green" width="100%" isDisabled={!formik.isValid || formik.isSubmitting}>
                        Mentés
                    </Button>
                    <Button type="button" colorScheme="red" width="100%" onClick={onCancel} isDisabled={formik.isSubmitting}>
                        Mégse
                    </Button>
                </ButtonGroup>
            </form>
        </Box>
    );
};

export default ChangePasswordFormView;
