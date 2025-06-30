import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const YourDealsModal = ({ onClose }) => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch("http://localhost:8080/mydeals", {
          credentials: "include",
        });
        const data = await res.json();
        setDeals(data);
      } catch (err) {
        console.error("Error fetching deals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const handleDelete = async (dealId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this deal?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:8080/deals/${dealId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setDeals((prev) => prev.filter((deal) => deal._id !== dealId));
        setToast("Deal deleted successfully");
        setTimeout(() => setToast(null), 3000);
      } else {
        alert("Failed to delete deal");
      }
    } catch (err) {
      console.error("Error deleting deal:", err);
    }
  };

  return (
    <div className="fixed top-8 right-8 z-50">
      <div className="relative bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 border border-blue-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-blue-400 hover:text-blue-700 font-bold transition"
        >
          &times;
        </button>

        <h2 className="text-2xl font-extrabold text-blue-700 mb-6 text-center tracking-tight">
          Your Deals
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : deals.length === 0 ? (
          <p className="text-center text-gray-400">No deals found.</p>
        ) : (
          <ul className="space-y-4 max-h-72 overflow-y-auto pr-1">
            {deals.map((deal) => (
              <li
                key={deal._id}
                className="flex justify-between items-center border border-blue-100 p-4 rounded-xl bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 shadow group transition"
              >
                <div>
                  <p className="font-semibold text-blue-700">{deal.name}</p>
                  <p className="text-xs text-gray-500">
                    {deal.city}, {deal.state}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(deal._id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition"
                  title="Delete Deal"
                >
                  <MdDelete size={20} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {toast && (
          <div className="fixed bottom-6 right-6 bg-green-100/90 text-green-800 px-5 py-3 rounded-lg shadow-lg border border-green-200 font-semibold text-base animate-fade-in">
            ✅ {toast}
          </div>
        )}
      </div>
    </div>
  );
};

export default YourDealsModal;
