export const deleteCrop = async (email, batchId) => {
  const res = await fetch(
    `https://agri-shield-w53f.onrender.com/api/crops/${email}/${batchId}`,
    { method: "DELETE" }
  );
  return res.json();
};
