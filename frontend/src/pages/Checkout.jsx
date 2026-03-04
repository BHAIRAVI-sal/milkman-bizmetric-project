 import Navbar from "../components/Navbar";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/cart.jsx";
import { createRazorpayOrder, verifyRazorpay } from "../lib/payments";

function CheckoutBody() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [upiId, setUpiId] = React.useState("");
  const payWithCOD = async () => {
    try {
      const payload = {
        items: items.map((i) => ({
          product_id: i.product.id || i.product,
          quantity_label: i.quantityLabel || "default",
          count: i.count,
        })),
      };
      await fetch("http://localhost:8000/api/orders/checkout/cod/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      clear();
      alert("Order placed with Cash on Delivery!");
      navigate("/order-success");
    } catch {
      alert("COD failed. Please try again.");
    }
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = resolve;
      document.body.appendChild(s);
    });

  const payOnline = async () => {
    try {
      await loadRazorpayScript();
      const orderData = await createRazorpayOrder(
        items.map((i) => ({
          product_id: i.product.id || i.product,
          quantity_label: i.quantityLabel || "default",
          count: i.count,
        }))
      );
      const options = {
        key: orderData.key || "rzp_test_xxxxx",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "DairyDash",
        description: "Milk & Dairy Order",
        order_id: orderData.razorpay_order_id,
        handler: async function (response) {
          await verifyRazorpay({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            order_id: orderData.order_id,
          });
          clear();
          alert("Payment successful. Order placed!");
          navigate("/order-success");
        },
        theme: { color: "#db2777" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      alert("Online payment failed. Please try again.");
    }
  };
  const payOnlineUPI = async () => {
    try {
      await loadRazorpayScript();
      const orderData = await createRazorpayOrder(
        items.map((i) => ({
          product_id: i.product.id || i.product,
          quantity_label: i.quantityLabel || "default",
          count: i.count,
        }))
      );
      const options = {
        key: orderData.key || "rzp_test_xxxxx",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "DairyDash",
        description: "Milk & Dairy Order (UPI)",
        order_id: orderData.razorpay_order_id,
        handler: async function (response) {
          await verifyRazorpay({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            order_id: orderData.order_id,
          });
          clear();
          alert("UPI payment successful. Order placed!");
          navigate("/order-success");
        },
        method: { upi: 1, card: 0, netbanking: 0, wallet: 0 },
        prefill: { vpa: upiId || undefined },
        theme: { color: "#db2777" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      alert("UPI payment failed. Please try again.");
    }
  };
   return (
     <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
       <Navbar />
       <div className="max-w-4xl mx-auto px-6 md:px-10 py-10">
         <h1 className="text-3xl font-extrabold mb-6">Checkout</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4">
             <div className="p-4 bg-white rounded-xl shadow">
               <h2 className="font-semibold mb-3">Delivery Address</h2>
               <input className="w-full border rounded-lg px-4 py-2 mb-2" placeholder="Full Name" />
               <input className="w-full border rounded-lg px-4 py-2 mb-2" placeholder="Address Line" />
               <div className="flex gap-2">
                 <input className="w-1/2 border rounded-lg px-4 py-2" placeholder="City" />
                 <input className="w-1/2 border rounded-lg px-4 py-2" placeholder="Pincode" />
               </div>
             </div>
            <div className="p-4 bg-white rounded-xl shadow">
              <h2 className="font-semibold mb-3">Payment</h2>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <button onClick={payWithCOD} className="px-4 py-2 rounded-xl border">Cash on Delivery</button>
                  <button onClick={payOnline} className="px-4 py-2 rounded-xl bg-pink-600 text-white">Pay Online (All)</button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="Enter UPI ID (e.g., name@upi)"
                    className="flex-1 px-4 py-2 rounded-xl border"
                  />
                  <button onClick={payOnlineUPI} className="px-4 py-2 rounded-xl bg-indigo-600 text-white">Pay via UPI</button>
                </div>
              </div>
            </div>
           </div>
           <div className="p-4 bg-white rounded-xl shadow">
             <h2 className="font-semibold mb-3">Order Summary</h2>
             <div className="space-y-2">
               {items.map((i) => (
                 <div key={i.key} className="flex justify-between text-sm">
                   <div>
                     {i.product.name} • {i.quantityLabel} • {i.plan} x{i.count}
                   </div>
                   <div>₹ {i.price * i.count}</div>
                 </div>
               ))}
               <div className="pt-3 border-t mt-2 flex justify-between font-bold">
                 <div>Total</div>
                 <div>₹ {total}</div>
               </div>
             </div>
            <div className="text-sm text-gray-500 mt-2">Choose a payment option above.</div>
           </div>
         </div>
       </div>
     </div>
   );
 }
 
 export default function Checkout() {
   return <CheckoutBody />;
 }
