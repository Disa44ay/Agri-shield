export const updateCrop = async (email, batchId, updates) => {
  const res = await fetch(
    `https://agri-shield-w53f.onrender.com/api/crops/${email}/${batchId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }
  );
  return res.json();
};
