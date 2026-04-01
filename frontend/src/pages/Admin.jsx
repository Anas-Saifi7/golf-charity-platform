import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(false);

  // 👤 Get Users
  const getUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 📊 Get Stats
  const getStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🏆 Winners
  const getWinners = async () => {
    try {
      const res = await API.get("/admin/winners");
      setWinners(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🎯 Run Draw
  const runDraw = async () => {
    try {
      setLoading(true);
      await API.post("/draw/run");
      setMsg("Draw executed successfully 🎯");
      getWinners();
      getStats();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
    getStats();
    getWinners();
  }, []);

  return (
    <div className="p-6 bg-[#F0EBE0] min-h-screen">

      {/* HEADER */}
      {/* <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1A3A2A]">
          Admin Panel 🛠️
        </h2>
        <p className="text-gray-500 text-sm">
          Manage users, draws, and platform data
        </p>
      </div> */}
      <div className="flex justify-between items-center mb-8">
  <div>
    <h2 className="text-3xl font-bold text-[#1A3A2A]">
      Admin Panel 🛠️
    </h2>
    <p className="text-gray-500 text-sm">
      Manage users, draws, and platform data
    </p>
  </div>

  {/* 🔥 LOGOUT BUTTON */}
  <button
    onClick={() => {
      localStorage.clear();
      window.location.href = "/";
    }}
    className="mb:rounded bg-red-500 text-white px-4 py-2 rounded-lg mb:rounded hover:bg-red-600"
  >
    Logout 🚪
  </button>
</div>
    

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-white p-5 rounded-xl border">
          <p className="text-xs text-gray-500 uppercase">Users</p>
          <h2 className="text-2xl font-bold text-[#1A3A2A]">
            {stats.users || 0}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl border">
          <p className="text-xs text-gray-500 uppercase">Draws</p>
          <h2 className="text-2xl font-bold text-[#1A3A2A]">
            {stats.draws || 0}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl border">
          <p className="text-xs text-gray-500 uppercase">Charities</p>
          <h2 className="text-2xl font-bold text-[#1A3A2A]">
            {stats.charities || 0}
          </h2>
        </div>

        <div className="bg-[#1A3A2A] text-yellow-400 p-5 rounded-xl border">
          <p className="text-xs uppercase">Donations</p>
          <h2 className="text-2xl font-bold">
            ₹{stats.totalDonations || 0}
          </h2>
        </div>

      </div>

      {/* RUN DRAW */}
      <div className="mb-8">
        <button
          onClick={runDraw}
          disabled={loading}
          className="bg-[#1A3A2A] text-white px-8 py-3 rounded-lg hover:bg-[#2D5A3D] transition"
        >
          {loading ? "Running..." : "Run Draw 🎯"}
        </button>
        {msg && <p className="text-green-600 mt-2">{msg}</p>}
      </div>

      {/* USERS */}
      <div className="bg-white p-6 rounded-xl border mb-8">

        <h3 className="text-lg font-semibold text-[#1A3A2A] mb-4">
          Users 👤
        </h3>

        <div className="space-y-3 max-h-60 overflow-y-auto">

          {users.map((u) => (
            <div
              key={u._id}
              className="flex justify-between items-center p-3 rounded-lg border bg-[#F5F0E8]"
            >
              <div>
                <p className="font-medium text-[#1A3A2A]">
                  {u.name}
                </p>
                <p className="text-xs text-gray-500">
                  {u.email}
                </p>
              </div>

              {/* DELETE BUTTON */}
              <button
             onClick={async () => {
  const confirmDelete = window.confirm("Delete this user?");
  if (!confirmDelete) return;

  await API.delete(`/admin/users/${u._id}`);
  getUsers();
}}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          ))}

        </div>
        {users.length === 0 && (
  <p className="text-gray-500">No users found</p>
)}

      </div>

      {/* WINNERS */}
      <div className="bg-white p-6 rounded-xl border">

        <h3 className="text-lg font-semibold text-[#1A3A2A] mb-4">
          Winners 🏆
        </h3>

        {winners.length === 0 ? (
          <p className="text-gray-500 text-sm">
         No winners yet — run a draw 🎯
          </p>
        ) : (
          <div className="space-y-3">

            {winners.map((w, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 rounded-lg border bg-[#F5F0E8]"
              >
                <span className="text-[#1A3A2A] font-medium">
                  {w.userId?.name || "User"}
                </span>

                <span className="font-bold text-green-700">
                  ₹{w.prize}
                </span>
              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Admin;