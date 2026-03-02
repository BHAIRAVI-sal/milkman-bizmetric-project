 import Navbar from "../components/Navbar";
 
 export default function DeliveryPanel() {
   return (
     <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
       <Navbar />
       <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
         <h1 className="text-3xl font-extrabold mb-6">Milkman Delivery Panel</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-6 bg-white rounded-2xl shadow">
             <h2 className="font-semibold mb-3">Today's Deliveries</h2>
             <ul className="text-sm space-y-2">
               <li>John Doe — 1L Cow Milk — Morning — Pending</li>
               <li>Sarah Lee — 500ml Buffalo Milk — Evening — Pending</li>
             </ul>
           </div>
           <div className="p-6 bg-white rounded-2xl shadow">
             <h2 className="font-semibold mb-3">Summary</h2>
             <div className="text-sm text-gray-600">2 deliveries pending • 0 delivered</div>
           </div>
         </div>
         <div className="mt-8 p-6 bg-white rounded-2xl shadow">
           <h2 className="font-semibold mb-3">Status Update</h2>
           <div className="text-sm text-gray-600">Mock controls — connect to delivery APIs later.</div>
         </div>
       </div>
     </div>
   );
 }
