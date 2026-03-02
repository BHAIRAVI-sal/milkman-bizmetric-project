 const hero = "/splash.png";
 
 const categoryImages = {
   Milk: "https://in.pinterest.com/pin/milk-cow-clipart-hd-png-image--367324913350818433/",
   Paneer: "/visuals/paneer.png",
   Butter: "/visuals/butter.png",
   Cheese: "/visuals/cheese.png",
   "Curd & Yogurt": "/visuals/curd.png",
   Lassi: "/visuals/lassi.png",
   Ghee: "/visuals/ghee.png",
   Buttermilk: "/visuals/buttermilk.png",
   Cream: "/visuals/cream.png",
 };
 
 const fallback = "/visuals/fallback.png";
 const getCategoryImage = (name) => categoryImages[name] || fallback;
 
 export { hero, getCategoryImage, fallback, categoryImages };
