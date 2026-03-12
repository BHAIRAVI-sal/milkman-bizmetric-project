 import axios from "axios";
 
 const api = axios.create({
   baseURL: "https://bhairavisalunkhe.duckdns.org/api",
 });
 
 export const getCategories = async () => {
   const res = await api.get("/products/categories/");
   return res.data;
 };
 
 export const getProducts = async () => {
   const res = await api.get("/products/products/");
   return res.data;
 };
 
 export const getProductsByCategory = async (categoryId) => {
   const res = await api.get(`/products/products/category/${categoryId}/`);
   return res.data;
 };
 
 export default api;
