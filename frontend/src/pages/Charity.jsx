import { useEffect, useState } from "react";
import API from "../services/api";

function Charity() {
  const [charities, setCharities] = useState([]);
  const [selected, setSelected] = useState(null);   // 🔥 FIX
  const [percentage, setPercentage] = useState(10);
  const [loading, setLoading] = useState(false);

  // 📋 Fetch charities
  const getCharities = async () => {
    try {
      const res = await API.get("/charity");
      console.log("CHARITIES:", res.data); // debug
      setCharities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ❤️ Select charity
  const handleSelect = async () => {
    console.log("FINAL SELECTED:", selected);

    if (!selected) {
      alert("Please select a charity");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/charity/select", {
        charityId: selected,
        percentage
      });

      // ✅ localStorage update
      const oldUser = JSON.parse(localStorage.getItem("user")) || {};

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...oldUser,
          charity: res.data.charity
        })
      );

      alert("Charity selected successfully ❤️");

      // 🔥 refresh
      window.location.reload();

    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Load selected charity
  useEffect(() => {
    getCharities();

    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.charity?._id) {
      setSelected(user.charity._id);
      setPercentage(user.charity.percentage || 10);
    }
  }, []);

  return (
    <div className="p-6">

      <h2 className="text-3xl font-bold mb-6">
        Choose a Charity ❤️
      </h2>

      {/* CHARITY LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

        {charities.length === 0 ? (
          <p>No charities found</p>
        ) : (
          charities.map((c) => (
            <button
              key={c._id}
              type="button"
              onClick={() => {
                console.log("CLICKED:", c._id);
                setSelected(c._id);
              }}
              className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition ${
                selected === c._id
                  ? "border-green-800 bg-green-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-green-800 text-white flex items-center justify-center">
                ❤️
              </div>

              <div>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-sm text-gray-500">
                  {c.description}
                </p>
              </div>
            </button>
          ))
        )}

      </div>

      {/* SLIDER */}
      <div className="mb-6">
        <input
          type="range"
          min="10"
          max="50"
          value={percentage}
          onChange={(e) => setPercentage(Number(e.target.value))}
          className="w-full"
        />
        <p>{percentage}% donation</p>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleSelect}
        disabled={loading}
        className="bg-green-800 text-white px-6 py-2 rounded"
      >
        {loading ? "Saving..." : "Confirm"}
      </button>

    </div>
  );
}

export default Charity;