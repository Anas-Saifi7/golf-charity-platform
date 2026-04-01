import { useEffect, useState } from "react";
import API from "../services/api";

function Draw() {
  const [draw, setDraw] = useState(null);

  const getDraw = async () => {
    try {
      const res = await API.get("/draw");
      setDraw(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDraw();
  }, []);

  if (!draw) {
    return (
      <div className="p-6 text-gray-500">
        No draw available
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* HEADER */}
      <h2 className="text-2xl font-bold text-[#1A3A2A] mb-6">
        🎯 Latest Draw Result
      </h2>

      {/* DRAW CARD */}
      <div className="bg-white p-6 rounded-xl border mb-6 text-center">

        <p className="text-sm text-gray-500 mb-3">
          Winning Numbers
        </p>

        <div className="flex justify-center gap-3">

          {draw.numbers.map((num, i) => (
            <div
              key={i}
              className="w-14 h-14 rounded-full bg-[#1A3A2A] text-yellow-400 flex items-center justify-center text-lg font-bold shadow"
            >
              {num}
            </div>
          ))}

        </div>

      </div>

      {/* WINNERS */}
      <div className="bg-white p-6 rounded-xl border">

        <h3 className="text-lg font-semibold text-[#1A3A2A] mb-4">
          Winners 🏆
        </h3>

        {draw.results.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">
            No winners this time 😢
          </p>
        ) : (
          <div className="space-y-3">
            {draw.results.map((r, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 rounded-lg bg-[#F5F0E8]"
              >
                <div>
                  <p className="text-sm text-gray-500">User</p>
                  <p className="font-semibold text-[#1A3A2A]">
                    {r.userId?.name}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-500">
  {r.match} Match
</p>
                  <p className="text-sm text-gray-500">Prize</p>
                  <p className="font-bold text-green-700">
                    ₹{r.prize}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

export default Draw;