import { LOGIN, SIGNOUT, UPDATEPROFILE,UPDATECATAGORIES,UPDATECARTCOUNT,UPDATEWISHID } from "./constant";

export const login = data => ({
    type: LOGIN,
    payload: {
        userId: data.userId,
        FirstName: data.FirstName,
        LastName: data.LastName,
        email: data.email,
        mobilenumber: data.mobilenumber,
        catagories:[],     
    }
})

export const signout = data => ({
    type: SIGNOUT,
    payload: {}
})

export const updateProfile = data => ({
    type: UPDATEPROFILE,
    payload: {
        FirstName: data.FirstName,
        LastName: data.LastName,
        email: data.email,
        mobilenumber: data.mobilenumber
    }
})

export const updatecatagories = data => ({
    type: UPDATECATAGORIES,
    payload: {
       catagories: data
    }
})
export const updatecartCount = data => ({
    type: UPDATECARTCOUNT,
    payload: {
        cartCount: data
    }
})
export const updateWishId = data => ({
    type: UPDATEWISHID,
    payload: {
        wishId: data
    }
})