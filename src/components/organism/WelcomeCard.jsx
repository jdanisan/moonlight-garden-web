// organism/WelcomeCard.jsx
const WelcomeCard = () => {
  return (
    <div className="bg-green-700 text-white p-8 rounded-2xl mb-6">
      <h1 className="text-3xl font-bold mb-2">
        Welcome back, Alex.
      </h1>
      <p className="opacity-90">
        Your indoor jungle is thriving...
      </p>

      <div className="flex gap-4 mt-4">
        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
          3 pending tasks
        </span>
        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
          perfect conditions
        </span>
      </div>
    </div>
  );
};