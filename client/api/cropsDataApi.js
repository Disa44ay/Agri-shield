export const getCropsData = async () => {
  // Fake network delay (like your farmers API)
  await new Promise((r) => setTimeout(r, 500));

  const res = await fetch("/cropsdata/crops.json");

  if (!res.ok) {
    throw new Error("Failed to load crops data");
  }

  return res.json();
};
