// export const ValidateEmail = email => {
//   // Regular expression for email validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   if (emailRegex.test(email)) {
//     return true
//   } else {
//     return false
//   }

// };

// export const validateMobileNumber = mobilenumber => {
//   // Regular expression for mobile number validation
//   const mobileRegex =/^\+91[6-9]\d{9}$/;
//   const replaceString = mobilenumber.replace(/\s/g,'')
//   if (replaceString.test(replaceString)) {
//     return true
//   } else {
//     return false
//   }
// };

// validation.js
export const ValidateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateMobileNumber = (number) => {
  const re = /^\d{10}$/;
  return re.test(number);
};
