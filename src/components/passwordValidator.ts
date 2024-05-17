<<<<<<< HEAD
// passwordValidator.ts
const passwordValidator = (value: string | undefined) => {
    if (!value) return false;
    return value.length >= 8 && /\d/.test(value) && /[a-z]/.test(value);
};

export default passwordValidator;
=======
// passwordValidator.ts
const passwordValidator = (value: string | undefined) => {
    if (!value) return false;
    return value.length >= 8 && /\d/.test(value) && /[a-z]/.test(value);
};

export default passwordValidator;
>>>>>>> 8a41e603a73576420e5cce7727e64d81b17dcdd4
