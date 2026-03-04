import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const SUCCESS_IMAGE_URL = "https://png.pngtree.com/png-clipart/20250206/original/pngtree-vector-cartoon-delivery-order-png-image_20332029.png";

export default function OrderSuccess() {
  const showImage = Boolean(SUCCESS_IMAGE_URL);
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10 text-center">
        {showImage ? (
          <div className="mb-6">
            <img
              src={SUCCESS_IMAGE_URL}
              alt="Order placed successfully"
              className="mx-auto max-h-[305px] w-[74%] object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const el = document.getElementById("order-success-image-error");
                if (el) el.style.display = "block";
              }}
            />
            <div
              id="order-success-image-error"
              style={{ display: "none" }}
              className="text-sm text-gray-500"
            >
              Image failed to load. This usually happens when the site blocks hotlinking.
              Put the image file in `frontend/public/images/` and set `SUCCESS_IMAGE_URL` to something like
              `/images/order-success.png`.
            </div>
          </div>
        ) : null}
        <h1 className="text-3xl font-extrabold text-green-600">Order placed successfully</h1>
        <p className="mt-3 text-gray-600">Thank you! Your order has been placed.</p>

        <div className="mt-7 flex items-center justify-center gap-4">
          <Link to="/products" className="px-5 py-2 rounded bg-pink-600 text-white hover:bg-pink-700">
            Continue shopping
          </Link>
          <Link to="/dashboard" className="px-5 py-2 rounded border">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
