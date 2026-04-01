function Card({ title, value, highlight }) {
  return (
    <div
      className={`p-5 rounded-xl border ${
        highlight
          ? "bg-[#1A3A2A] text-yellow-400 border-[#1A3A2A]"
          : "bg-white border-gray-200"
      }`}
    >
      <p className="text-xs uppercase tracking-wider text-gray-500">
        {title}
      </p>

      <h2 className="text-2xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}

export default Card;