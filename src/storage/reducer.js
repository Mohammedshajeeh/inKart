import { LOGIN, SIGNOUT, UPDATEPROFILE, UPDATECATAGORIES, UPDATECARTCOUNT, UPDATEWISHID } from "./constant";

const initialState = {
    isLoggedIN: true,
    userId: "",
    FirstName: "",
    LastName: "",
    email: "",
    mobilenumber: "",
    catagories: [], // <-- Added catagories key with initial value []
    cartCount: 0,
    wishId: []

};

export const inKartReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                userId: action.payload.userId,
                FirstName: action.payload.FirstName,
                LastName: action.payload.LastName,
                email: action.payload.email,
                mobilenumber: action.payload.mobilenumber,
                isLoggedIN: true // <-- Corrected value
            };
        case SIGNOUT:
            return {
                ...state,
                userId: "",
                FirstName: "",
                LastName: "",
                email: "",
                mobilenumber: "",
                isLoggedIN: false,
            };
        case UPDATEPROFILE:
            return {
                ...state,
                FirstName: action.payload.FirstName,
                LastName: action.payload.LastName,
                email: action.payload.email,
                mobilenumber: action.payload.mobilenumber,
                isLoggedIN: true
            };
        case UPDATECATAGORIES:
            return {
                ...state,
                catagories: [...action.payload.catagories]
            };
        case UPDATECARTCOUNT:
            return {
                ...state,
                cartCount: action.payload.cartCount
            };
        case UPDATEWISHID:
            return {
                ...state,
                wishId: action.payload.wishId
            };
        default:
            return state;
    }
};
