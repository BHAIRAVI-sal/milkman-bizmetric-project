 export default function NotFound() {
   return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-pink-50">
       <div className="text-center">
         <div className="text-7xl font-extrabold text-pink-600">404</div>
         <div className="mt-2 text-gray-600">Page not found</div>
         <a href="/" className="mt-6 inline-block px-6 py-3 rounded-xl bg-pink-600 text-white hover:bg-pink-700">
           Go Home
         </a>
       </div>
     </div>
   );
 }
