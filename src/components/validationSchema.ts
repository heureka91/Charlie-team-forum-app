import * as Yup from 'yup';
import passwordValidator from './passwordValidator';

const validationSchema = Yup.object({
    oldPassword: Yup.string()
        .min(8, 'A jelszónak legalább 8 karakter hosszúnak kell lennie')
        .test('is-valid-password', 'A jelszónak tartalmaznia kell kisbetűt, nagybetűt, számot és speciális karaktert', passwordValidator)
        .required('Kötelező mező'),
    password: Yup.string()
        .min(8, 'A jelszónak legalább 8 karakter hosszúnak kell lennie')
        .test('is-valid-password', 'A jelszónak tartalmaznia kell kisbetűt, nagybetűt, számot és speciális karaktert', passwordValidator)
        .notOneOf([Yup.ref('oldPassword')], 'Az új jelszó nem egyezhet meg a régi jelszóval')
        .required('Kötelező mező'),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password')], 'A két jelszó nem egyezik meg')
        .required('Kötelező mező'),
});

export default validationSchema;
