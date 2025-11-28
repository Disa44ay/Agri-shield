export const getFarmersData = async () => {
  await new Promise((r) => setTimeout(r, 500)); // Fake delay for realism
  const res = await fetch("/farmersdata/farmers.json");

  if (!res.ok) {
    throw new Error("Failed to load farmers data");
  }

  return res.json();
};
