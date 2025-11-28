export const updateUser = async (email, updates) => {
  const res = await fetch(
    `https://agri-shield-w53f.onrender.com/api/users/${email}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }
  );
  return res.json();
};
