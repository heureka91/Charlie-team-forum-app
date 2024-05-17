// validationSchema.ts
import * as Yup from 'yup';
import passwordValidator from './passwordValidator';

const validationSchema = Yup.object({
    username: Yup.string().email('Érvénytelen email cím').required('Kötelező mező'),
    password: Yup.string()
        .test('password-test', 'A jelszónak legalább 8 karakter hosszúnak kell lennie legalább egy számmal és 1 kisbetűvel', passwordValidator)
        .required('Kötelező mező'),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password')], 'A két jelszó nem egyezik meg')
        .required('Kötelező mező'),
    firstName: Yup.string().required('Kötelező mező'),
    lastName: Yup.string().required('Kötelező mező'),
});

export default validationSchema;
