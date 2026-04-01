import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function Success() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Processing your payment...");

  useEffect(() => {
    const activate = async () => {
      try {
        const userId = params.get("userId");
        const plan = params.get("plan");

        if (!userId || !plan) {
          setMessage("Invalid payment session ❌");
          setLoading(false);
          return;
        }

        // 🔥 Activate subscription
        await API.post("/subscription/activate", {
          userId,
          plan
        });

        // 🔥 Get fresh user data (IMPORTANT FIX)
        const userRes = await API.get("/auth/me");

        localStorage.setItem("user", JSON.stringify(userRes.data));

        // ✅ Success message
        setMessage("Subscription activated successfully 🎉");

        // 🔥 Redirect after 2 sec
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);

      } catch (err) {
        console.log(err);
        setMessage("Something went wrong ❌");
      } finally {
        setLoading(false);
      }
    };

    activate();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0EBE0]">

      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">

        {/* ICON */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1A3A2A] flex items-center justify-center text-yellow-400 text-2xl">
          {loading ? "⏳" : "✔"}
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-[#1A3A2A] mb-2">
          Payment Status
        </h2>

        {/* MESSAGE */}
        <p className="text-gray-600 mb-6">
          {message}
        </p>

        {/* BUTTON */}
        {!loading && (
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#1A3A2A] text-white px-6 py-3 rounded-lg hover:bg-[#2D5A3D] transition"
          >
            Go to Dashboard
          </button>
        )}

      </div>

    </div>
  );
}

export default Success;