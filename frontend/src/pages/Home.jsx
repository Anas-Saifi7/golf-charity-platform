import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
   const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach((r) => observer.observe(r));
  }, []);

  return (
    <div className="bg-[#F5F0E8] text-[#0D1117] font-sans">

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 flex justify-between items-center px-6 py-4 bg-[#F5F0E8]/80 backdrop-blur border-b border-[#C9A84C]/30">
        <div className="text-xl font-black text-[#1A3A2A] font-serif">
          Green<span className="text-[#C9A84C]">Heart</span>
        </div>

        <ul className="hidden md:flex gap-8 text-sm uppercase text-[#1A3A2A]">
          <li><a href="#how">How It Works</a></li>
          <li><a href="#prizes">Prizes</a></li>
          <li><a href="#charity">Charity</a></li>
          <li><a href="#plans">Plans</a></li>
        </ul>

        <button className="bg-[#1A3A2A] text-[#F5F0E8] px-5 py-2 rounded-full" onClick={() => navigate("/auth")}>
          Join Now
        </button>

        <div className="md:hidden text-2xl" onClick={() => setMenuOpen(true)}>☰</div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[#F5F0E8] flex flex-col items-center justify-center gap-6 z-50">
          <button onClick={() => setMenuOpen(false)}>✕</button>
          <a href="#how">How It Works</a>
          <a href="#prizes">Prizes</a>
          <a href="#charity">Charity</a>
          <a href="#plans">Plans</a>
        </div>
      )}

      {/* HERO */}
      <section className="min-h-screen grid md:grid-cols-2 gap-10 items-center px-6 pt-32">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#C9A84C] mb-4">
            Golf · Give · Win
          </p>

          <h1 className="font-serif text-5xl font-black text-[#1A3A2A] leading-tight mb-6">
            Play golf.<br />
            <em className="text-[#C9A84C]">Change lives.</em><br />
            Win prizes.
          </h1>

          <p className="text-gray-500 mb-6">
            Enter your Stableford scores, join monthly prize draws,
            and automatically donate to causes that matter.
          </p>

          <div className="flex gap-4">
            <button  onClick={() => navigate("/auth")} className="bg-[#1A3A2A] text-[#F5F0E8] px-6 py-3 rounded-full">
              Start Your Journey
            </button>
            <button className="border border-[#1A3A2A] px-6 py-3 rounded-full">
              See How It Works
            </button>
          </div>

          <div className="flex gap-10 mt-10 border-t pt-6">
            <div>
              <h2 className="font-serif text-2xl text-[#1A3A2A]">£48K</h2>
              <p className="text-xs text-gray-400">Prize Pool</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-[#1A3A2A]">£12K</h2>
              <p className="text-xs text-gray-400">Charity</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-[#1A3A2A]">2400</h2>
              <p className="text-xs text-gray-400">Players</p>
            </div>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-[#1A3A2A] p-8 rounded-2xl text-[#F5F0E8]">
          <h4 className="text-xs opacity-70">Current Jackpot</h4>
          <h2 className="text-4xl text-[#C9A84C] font-serif">£19,200</h2>

          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>4-Number Match</span>
              <span className="text-[#E8C96E]">£16,800</span>
            </div>
            <div className="flex justify-between">
              <span>3-Number Match</span>
              <span className="text-[#E8C96E]">£12,000</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="px-6 py-20">
        <h2 className="text-3xl font-serif font-black text-[#1A3A2A] mb-10">
          Four steps to making a difference
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {["Subscribe","Enter Scores","Draw","Charity"].map((item,i)=>(
            <div key={i} className="bg-white p-6 rounded-xl border">
              <h3 className="font-semibold text-[#1A3A2A]">{item}</h3>
              <p className="text-sm text-gray-500 mt-2">
                Description of step {i+1}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PRIZES */}
      <section id="prizes" className="bg-[#1A3A2A] text-white px-6 py-20">
        <h2 className="text-3xl font-serif font-black mb-10">
          Three ways to win
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border p-6 rounded-xl">
            <h3>5 Match</h3>
            <h2 className="text-3xl text-[#C9A84C]">40%</h2>
          </div>
          <div className="border p-6 rounded-xl">
            <h3>4 Match</h3>
            <h2 className="text-3xl text-[#C9A84C]">35%</h2>
          </div>
          <div className="border p-6 rounded-xl">
            <h3>3 Match</h3>
            <h2 className="text-3xl text-[#C9A84C]">25%</h2>
          </div>
        </div>
      </section>

      {/* CHARITY */}
      <section id="charity" className="px-6 py-20">
        <h2 className="text-3xl font-serif font-black mb-10">
          Your game, their future
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {["🌿","❤️","💧","🦁"].map((icon,i)=>(
            <div key={i} className="bg-white p-6 rounded-xl border text-center">
              <div className="text-3xl">{icon}</div>
              <h3 className="mt-3 font-semibold">Charity</h3>
            </div>
          ))}
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="bg-[#F9F6F0] px-6 py-20">
        <h2 className="text-3xl font-serif font-black mb-10">
          Pricing
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
          <div className="bg-white p-8 rounded-xl border">
            <h3>Monthly</h3>
            <h2 className="text-3xl font-serif">£9.99</h2>
          </div>

          <div className="bg-[#1A3A2A] text-white p-8 rounded-xl">
            <h3>Yearly</h3>
            <h2 className="text-3xl text-[#C9A84C] font-serif">£89</h2>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D1117] text-gray-400 px-6 py-12">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <h2 className="text-white font-bold">GreenHeart</h2>
            <p className="text-sm mt-2">Golf with purpose.</p>
          </div>
          <div>Platform</div>
          <div>Account</div>
          <div>Legal</div>
        </div>
      </footer>

    </div>
  );
}