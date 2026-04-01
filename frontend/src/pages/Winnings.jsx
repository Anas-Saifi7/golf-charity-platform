import { useEffect, useState } from "react";
import API from "../services/api";

function Winnings() {
  const [data, setData] = useState([]);

  const getWinnings = async () => {
    try {
      const res = await API.get("/draw/winnings");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWinnings();
  }, []);

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6 text-[#1A3A2A]">
        🏆 Your Winnings
      </h2>

      {data.length === 0 ? (
        <p className="text-gray-500">
          No winnings yet 😢
        </p>
      ) : (
        <div className="space-y-4">
          {data.map((w, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl border flex justify-between"
            >
              <div>
                <p className="font-semibold">
                  {w.match} Match
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(w.date).toLocaleDateString()}
                </p>
              </div>

              <p className="text-green-700 font-bold">
                ₹{w.amount}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Winnings;