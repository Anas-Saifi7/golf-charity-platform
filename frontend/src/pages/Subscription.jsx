import API from "../services/api";
import { useState } from "react";
function Subscription() {
  const [loading, setLoading] = useState(false);

const subscribe = async (plan) => {
  try {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    const res = await API.post("/subscription/create-checkout", {
      plan,
      userId
    });

    window.location.href = res.data.url;

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1A3A2A]">
          Choose Your Plan 💳
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Play, win rewards & support charity every month
        </p>
      </div>

      {/* PLANS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

        {/* MONTHLY */}
        <div className="bg-white p-6 rounded-2xl border text-center hover:shadow-lg transition">

          <h3 className="text-lg font-semibold text-[#1A3A2A] mb-2">
            Monthly Plan
          </h3>

          <p className="text-3xl font-bold mb-2">₹500</p>
          <p className="text-sm text-gray-500 mb-4">
            Billed monthly
          </p>

          {/* FEATURES */}
          <div className="text-sm text-gray-600 mb-6 space-y-2">
            <p>✔ Enter monthly draws</p>
            <p>✔ Track your scores</p>
            <p>✔ Support charity</p>
          </div>

          <button
            onClick={() => subscribe("monthly")}
            className="w-full bg-[#1A3A2A] text-white py-3 rounded-lg hover:bg-[#2D5A3D] transition"
          >
            Subscribe Monthly
          </button>
          {/* <button              className="w-full bg-[#1A3A2A] text-white py-3 rounded-lg hover:bg-[#2D5A3D] transition"
          disabled={loading}>
  {loading ? "Processing..." : "Subscribe Monthly"}
</button> */}

        </div>

        {/* YEARLY (HIGHLIGHT) */}
        <div className="bg-[#1A3A2A] text-white p-6 rounded-2xl border text-center relative shadow-lg">

          {/* BADGE */}
          <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full">
            BEST VALUE
          </div>

          <h3 className="text-lg font-semibold mb-2">
            Yearly Plan
          </h3>

          <p className="text-3xl font-bold mb-2 text-yellow-400">
            ₹5000
          </p>

          <p className="text-sm text-gray-300 mb-4">
            Save more with yearly billing
          </p>

          {/* FEATURES */}
          <div className="text-sm text-gray-300 mb-6 space-y-2">
            <p>✔ Enter all draws</p>
            <p>✔ Higher winning chances</p>
            <p>✔ Bigger charity impact</p>
          </div>

          <button
            onClick={() => subscribe("yearly")}
            className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Subscribe Yearly
          </button>

        </div>

      </div>

    </div>
  );
}

export default Subscription;