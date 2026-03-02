 import axios from "axios";
 
 const api = axios.create({
   baseURL: "http://localhost:8000/api",
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
