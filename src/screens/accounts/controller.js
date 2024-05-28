export const validatePhoneNumber = (Mobile) => {
    // Regular expression to match a valid phone number
    const phoneRegex = /^\d{10}$/; // Matches a 10-digit number
    
    // Check if the phone number matches the regular expression
    return phoneRegex.test(Mobile);
};

export const validateEmail = (Email) => {
    // Regular expression to match a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check if the email matches the regular expression
    return emailRegex.test(Email);
};
