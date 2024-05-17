// passwordValidator.ts
const passwordValidator = (value: string | undefined) => {
    if (!value) return false;
    return value.length >= 8 && /\d/.test(value) && /[a-z]/.test(value);
};

export default passwordValidator;
