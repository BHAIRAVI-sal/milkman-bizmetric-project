 const hero =
   "https://www.linkedin.com/posts/jayesh-tarsariya-717819269_history-of-amul-dairy-the-birth-of-amul-activity-7289232233423380480-ZJzo";
 
 const categoryImages = {
   Milk:
     "https://png.pngtree.com/png-vector/20250513/ourmid/pngtree-adorable-milk-bottle-icon-in-3d-cartoon-style-png-image_16272908.png",
   Paneer:
     "https://png.pngtree.com/png-clipart/20240627/original/pngtree-palak-paneer-delight-authentic-indian-cuisine-poster-png-image_15425820.png",
   Butter:
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiDej0uC7A9Snn7Q7wmCnoa9JI8G9y3I5Hnw&s",
   Cheese:
     "https://img.freepik.com/free-psd/fresh-cubes-creamy-feta-cheese-plate-garnished-with-basil_632498-25707.jpg?semt=ais_rp_progressive&w=740&q=80",
   "Curd & Yogurt":
     "https://images.unsplash.com/photo-1559550879-6d5631fb8d8b?q=80&w=1887&auto=format&fit=crophttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSYJPgj7KrTxO1j5yHY6ZASOk5Rg954qA7vA&s",
 };
 
 const fallback =
   "https://images.unsplash.com/photo-1518725522904-4b3939358343?q=80&w=1887&auto=format&fit=crop";
 
 const getCategoryImage = (name) => categoryImages[name] || fallback;
 
 export { hero, getCategoryImage, fallback, categoryImages };
