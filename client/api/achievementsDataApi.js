// api/achievementsDataApi.js

export const getAchievementsData = async () => {
  try {
    await new Promise((r) => setTimeout(r, 300));

    const res = await fetch(
      "https://agri-shield-w53f.onrender.com/api/achievements",
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to load achievements");

    const data = await res.json();

    if (data && Array.isArray(data.achievements)) {
      return data.achievements.map((a) => ({
        ...a,
        userEmail: a.userEmail?.trim().toLowerCase(),
      }));
    }

    if (Array.isArray(data)) return data;

    console.warn("Unexpected achievements API format:", data);
    return [];
  } catch (err) {
    console.error("Achievements API error:", err);
    return [];
  }
};
