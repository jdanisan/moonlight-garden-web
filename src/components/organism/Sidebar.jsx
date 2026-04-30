// organism/Sidebar.jsx
const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#e9e6d8] p-6 flex flex-col">
      <h2 className="font-bold text-lg mb-6">Verdant</h2>

      <nav className="space-y-4">
        <p>My Jungle</p>
        <p>Reminders</p>
        <p>Collections</p>
        <p>Settings</p>
      </nav>

      <button className="mt-auto bg-green-600 text-white py-2 rounded">
        Add New Plant
      </button>
    </aside>
  );
};