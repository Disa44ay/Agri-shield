export const getAchievementsData = async () => {
  // Fake network delay
  await new Promise((r) => setTimeout(r, 500));

  const res = await fetch("/achievementsdata/achievements.json");

  if (!res.ok) {
    throw new Error("Failed to load achievements data");
  }

  return res.json();
};
