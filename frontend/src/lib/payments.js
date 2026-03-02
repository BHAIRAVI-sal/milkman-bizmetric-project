 import api from "./api";
 
 export const createRazorpayOrder = async (items) => {
   const res = await api.post("/orders/payment/razorpay/create-order/", { items });
   return res.data;
 };
 
 export const verifyRazorpay = async (payload) => {
   const res = await api.post("/orders/payment/razorpay/verify/", payload);
   return res.data;
 };
