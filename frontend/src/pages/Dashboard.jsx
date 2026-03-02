 import Navbar from "../components/Navbar";
 
 export default function Dashboard() {
   return (
     <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
       <Navbar />
       <div className="max-w-5xl mx-auto px-6 md:px-10 py-10">
         <h1 className="text-3xl font-extrabold mb-6">Your Dashboard</h1>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-6 bg-white rounded-2xl shadow">
             <div className="text-sm text-gray-500">Orders</div>
             <div className="text-3xl font-extrabold">4</div>
           </div>
           <div className="p-6 bg-white rounded-2xl shadow">
             <div className="text-sm text-gray-500">Active Subscriptions</div>
             <div className="text-3xl font-extrabold">1</div>
           </div>
           <div className="p-6 bg-white rounded-2xl shadow">
             <div className="text-sm text-gray-500">Wallet Balance</div>
             <div className="text-3xl font-extrabold">₹ 500</div>
           </div>
         </div>
         <div className="mt-8 p-6 bg-white rounded-2xl shadow">
           <h2 className="font-semibold mb-3">Recent Orders</h2>
           <div className="text-sm text-gray-600">Mock data — integrate with API later.</div>
         </div>
       </div>
     </div>
   );
 }
