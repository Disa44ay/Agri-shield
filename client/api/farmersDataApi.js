// api/farmersDataApi.js

export const getFarmersData = async () => {
  try {
    await new Promise((r) => setTimeout(r, 300));

    const res = await fetch("https://agri-shield-w53f.onrender.com/api/users", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to load farmers data");

    const data = await res.json();

    if (data && Array.isArray(data.users)) {
      return data.users.map((u) => ({
        ...u,
        avatar:
          u.picture && u.picture.startsWith("http")
            ? u.picture
            : "/images/default-farmer.png",

        email: u.email?.trim().toLowerCase(), // normalize emails
      }));
    }

    if (Array.isArray(data)) return data;

    console.warn("Unexpected users API format:", data);
    return [];
  } catch (err) {
    console.error("Farmers API Error:", err);
    return [];
  }
};
