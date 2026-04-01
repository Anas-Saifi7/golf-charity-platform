import { useState } from "react";
import API from "../services/api";

function Auth() {
  const [tab, setTab] = useState("signup");

  // Signup state
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Login state
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Handle change
  const handleSignupChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  // Signup API
  const handleSignup = async () => {
    try {
      setLoading(true);
      setMsg("");

      await API.post("/auth/register", signup);

      setMsg("✅ Account Created Successfully");
      setTab("login");

    } catch (err) {
      setMsg(err.response?.data?.msg || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  // Login API
 const handleLogin = async () => {
  try {
    setLoading(true);
    setMsg("");

    const res = await API.post("/auth/login", login);
console.log("LOGIN RESPONSE:", res.data);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    const user = res.data.user;

    // ✅ NEW LOGIC ADD
    if (user.role === "admin") {
      window.location.href = "/admin";
    } 
 else if (user.subscription?.status !== "active") {
  window.location.href = "/subscription";
} 
else {
  window.location.href = "/dashboard";
}

  } catch (err) {
    setMsg(err.response?.data?.msg || "Login Failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[#F5F0E8]">

      {/* LEFT PANEL */}
      <div className="hidden md:flex flex-col justify-between bg-[#1A3A2A] text-white p-10">
        <h1 className="text-2xl font-bold">
          Green<span className="text-yellow-400">Heart</span>
        </h1>

        <div>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Golf with <span className="text-yellow-400">purpose.</span>
          </h2>
          <p className="text-gray-300">
            Play, win rewards & donate to charity.
          </p>
        </div>

        <p className="text-sm text-gray-400">
          © 2026 GreenHeart
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">

          {/* Tabs */}
          <div className="flex mb-6 bg-gray-200 rounded-full p-1">
            <button
              onClick={() => setTab("signup")}
              className={`flex-1 p-2 rounded-full ${
                tab === "signup" ? "bg-green-700 text-white" : ""
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setTab("login")}
              className={`flex-1 p-2 rounded-full ${
                tab === "login" ? "bg-green-700 text-white" : ""
              }`}
            >
              Sign In
            </button>
          </div>

          {/* MESSAGE */}
          {msg && (
            <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
              {msg}
            </div>
          )}

          {/* SIGNUP */}
          {tab === "signup" && (
            <>
              <h2 className="text-2xl font-bold mb-4">Create Account</h2>

              <input
                name="name"
                placeholder="Name"
                onChange={handleSignupChange}
                className="w-full p-3 mb-3 border rounded"
              />

              <input
                name="email"
                placeholder="Email"
                onChange={handleSignupChange}
                className="w-full p-3 mb-3 border rounded"
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleSignupChange}
                className="w-full p-3 mb-3 border rounded"
              />

              <button
                onClick={handleSignup}
                className="w-full bg-green-700 text-white p-3 rounded"
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </>
          )}

          {/* LOGIN */}
          {tab === "login" && (
            <>
              <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>

              <input
                name="email"
                placeholder="Email"
                onChange={handleLoginChange}
                className="w-full p-3 mb-3 border rounded"
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleLoginChange}
                className="w-full p-3 mb-3 border rounded"
              />

              <button
                onClick={handleLogin}
                className="w-full bg-green-700 text-white p-3 rounded"
              >
                {loading ? "Logging in..." : "Sign In"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;