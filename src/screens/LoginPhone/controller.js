export const validateOtp = (otp) => {
    return /[!@#$%^&*(),.?":{}|<>]/.test(otp);
};