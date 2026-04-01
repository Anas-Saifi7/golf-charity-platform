import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [scores, setScores] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // 🔥 INIT (USER + SCORES)
  useEffect(() => {
    const init = async () => {
      try {
        const res = await API.get("/auth/me");

        console.log("USER:", res.data);

        setUser(res.data);

        // 🔥 Subscription check
        if (res.data.subscription?.status !== "active") {
          navigate("/subscription");
          return;
        }

        // 🔥 Load scores
        const scoreRes = await API.get("/scores");
        setScores(scoreRes.data.reverse());

      } catch (err) {
        console.log("INIT ERROR:", err.response?.data || err.message);

        // 🔥 Token issue → redirect login
        navigate("/login");
      }
    };

    init();
  }, []);

  // 🔥 ADD SCORE
  const addScore = async () => {
    if (value === "") {
  alert("Enter a score");
  return;
}

const num = Number(value);

if (isNaN(num)) {
  alert("Invalid number");
  return;
}


    if (num < 1 || num > 45) {
      alert("Score must be between 1 and 45");
      return;
    }

    try {
      setLoading(true);

      await API.post("/scores/add", { value: num });

      setValue("");

      const scoreRes = await API.get("/scores");
      setScores(scoreRes.data.reverse());

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 LOADING UI (IMPORTANT FIX)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0EBE0]">
        <p className="text-lg text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="md:ml-64 w-full bg-[#F0EBE0] min-h-screen">

        <div className="p-6">

          {/* HEADER */}
          <h1 className="text-2xl font-bold text-[#1A3A2A] mb-6">
            Dashboard 👋 {user?.name || "User"}
          </h1>

          {/* CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">

            <Card
              title="Subscription"
              value={
                user?.subscription?.status === "active" && user.subscription?.expiry
                  ? `Active till ${new Date(user.subscription.expiry).toLocaleDateString()}`
                  : "Inactive"
              }
              highlight
            />

            <Card title="Total Scores" value={scores.length} />

            <Card
              title="Charity %"
              value={`${user?.charity?.percentage || 10}%`}
            />

            <Card title="Draw Entries" value={scores.length} />

            <Card
              title="Selected Charity"
              value={user?.charity?.name || "Not Selected"}
            />

            <Card
              title="Winnings"
              value={`₹${user?.winnings || 0}`}
            />

          </div>

          {/* ADD SCORE */}
          <div className="bg-white p-5 rounded-xl border mb-6">

            <h3 className="text-lg font-medium text-[#1A3A2A] mb-2">
              Add Score
            </h3>

            <p className="text-xs text-gray-500 mb-3">
              {scores.length}/5 scores used
            </p>

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter score (1-45)"
                className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-700"
              />

              <button
                onClick={addScore}
                disabled={loading}
                className={`px-6 py-3 rounded-lg text-white transition ${
                  loading ? "bg-gray-400" : "bg-[#1A3A2A] hover:bg-[#2D5A3D]"
                }`}
              >
                {loading ? "Adding..." : "Add"}
              </button>

            </div>

            {loading && (
              <p className="text-sm text-gray-500 mt-2">
                Adding score...
              </p>
            )}

          </div>

          {/* SCORES LIST */}
          <div className="bg-white p-5 rounded-xl border">

            <h3 className="text-lg font-medium text-[#1A3A2A] mb-4">
              Recent Scores
            </h3>

            {scores.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No scores yet. Start by adding your first score 🚀
              </p>
            ) : (
              scores.map((s, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-3 border-b last:border-none"
                >
                  <div className="flex items-center gap-4 w-full">

                    <div className="text-xl font-bold text-[#1A3A2A]">
                      {s.value}
                    </div>

                    <div className="flex-1 bg-gray-200 h-2 rounded">
                      <div
                        className="bg-[#1A3A2A] h-2 rounded"
                        style={{
                          width: `${(s.value / 45) * 100}%`
                        }}
                      />
                    </div>

                  </div>

                  <div className="text-sm text-gray-500 ml-4">
                    {new Date(s.date).toLocaleDateString()}
                  </div>

                </div>
              ))
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;