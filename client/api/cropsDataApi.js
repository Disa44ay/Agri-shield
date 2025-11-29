// api/cropsDataApi.js

export const getCropsData = async () => {
  try {
    // Small artificial delay (optional)
    await new Promise((r) => setTimeout(r, 300));

    const res = await fetch("https://agri-shield-w53f.onrender.com/api/crops", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Crops API Failed:", res.status);
      throw new Error("Failed to load crops data");
    }

    const raw = await res.json();

    // API returns: { crops: [ ... ] }
    const crops = Array.isArray(raw?.crops) ? raw.crops : Array.isArray(raw) ? raw : [];

    // ------------------------------------------------------------
    // ✔ Normalizing crop fields to a single clean return format
    // ------------------------------------------------------------
    return crops.map((c) => ({
      id: c._id || null,
      userEmail: c.userEmail || null,

      cropName: c.cropName || "",
      cropType: Array.isArray(c.cropType) ? c.cropType : [],

      batchId: c.batchId || null,
      farmerId: c.farmerId || null,

      estimatedWeightKg: c.estimatedWeightKg || null,
      harvestDate: c.harvestDate || "",

      status: c.status || "",

      storageDistrict: c.storage?.district || "",
      storageWarehouse: c.storage?.storageName || "",
      storageDate: c.storage?.storageDate || "",

      createdAt: c.createdAt || "",
      updatedAt: c.updatedAt || "",
    }));
  } catch (err) {
    console.error("Crops API Error:", err);
    return [];
  }
};
