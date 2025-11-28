"use client";

import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/app/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useFirebaseUser } from "@/app/useFirebaseUser";
import Swal from "sweetalert2";

// APIs
import { getFarmersData } from "@/api/farmersDataApi";
import { getCropsData } from "@/api/cropsDataApi";
import { getAchievementsData } from "@/api/achievementsDataApi";
import { updateUser } from "@/api/updateUser";
import { updateCrop } from "@/api/updateCrop";
import { deleteCrop } from "@/api/deleteCrop";

/* ---------------------- TRANSLATION MAPS ---------------------- */
const divisionBn = {
  Dhaka: "ঢাকা",
  Chattogram: "চট্টগ্রাম",
  Rajshahi: "রাজশাহী",
  Mymensingh: "ময়মনসিংহ",
  Khulna: "খুলনা",
  Barishal: "বরিশাল",
  Sylhet: "সিলেট",
  Rangpur: "রংপুর",
};

const districtBn = {
  Dhaka: "ঢাকা",
  Faridpur: "ফরিদপুর",
  Gazipur: "গাজীপুর",
  Gopalganj: "গোপালগঞ্জ",
  Kishoreganj: "কিশোরগঞ্জ",
  Madaripur: "মাদারীপুর",
  Manikganj: "মানিকগঞ্জ",
  Munshiganj: "মুন্সিগঞ্জ",
  Narayanganj: "নারায়ণগঞ্জ",
  Narsingdi: "নরসিংদী",
  Rajbari: "রাজবাড়ি",
  Shariatpur: "শরীয়তপুর",
  Tangail: "টাঙ্গাইল",

  Chattogram: "চট্টগ্রাম",
  "Cox’s Bazar": "কক্সবাজার",
  Cumilla: "কুমিল্লা",
  Brahmanbaria: "ব্রাহ্মণবাড়িয়া",
  Feni: "ফেনী",
  Khagrachhari: "খাগড়াছড়ি",
  Bandarban: "বান্দরবান",
  Rangamati: "রাঙ্গামাটি",
  Noakhali: "নোয়াখালী",
  Laxmipur: "লক্ষ্মীপুর",

  Rajshahi: "রাজশাহী",
  Pabna: "পাবনা",
  Natore: "নাটোর",
  Bogura: "বগুড়া",
  Naogaon: "নওগাঁ",
  Joypurhat: "জয়পুরহাট",
  Chapainawabganj: "চাঁপাইনবাবগঞ্জ",
  Sirajganj: "সিরাজগঞ্জ",

  Mymensingh: "ময়মনসিংহ",
  Jamalpur: "জামালপুর",
  Netrokona: "নেত্রকোণা",
  Sherpur: "শেরপুর",

  Khulna: "খুলনা",
  Bagerhat: "বাগেরহাট",
  Chuadanga: "চুয়াডাঙ্গা",
  Jessore: "যশোর",
  Jhenaidah: "ঝিনাইদহ",
  Kushtia: "কুষ্টিয়া",
  Magura: "মাগুরা",
  Meherpur: "মেহেরপুর",
  Narail: "নড়াইল",
  Satkhira: "সাতক্ষীরা",

  Barishal: "বরিশাল",
  Bhola: "ভোলা",
  Jhalokathi: "ঝালকাঠি",
  Patuakhali: "পটুয়াখালী",
  Pirojpur: "পিরোজপুর",
  Barguna: "বরগুনা",

  Sylhet: "সিলেট",
  Moulvibazar: "মৌলভীবাজার",
  Habiganj: "হবিগঞ্জ",
  Sunamganj: "সুনামগঞ্জ",

  Rangpur: "রংপুর",
  Dinajpur: "দিনাজপুর",
  Gaibandha: "গাইবান্ধা",
  Kurigram: "কুড়িগ্রাম",
  Lalmonirhat: "লালমনিরহাট",
  Nilphamari: "নীলফামারী",
  Panchagarh: "পঞ্চগড়",
  Thakurgaon: "ঠাকুরগাঁও",
};

const cropsBn = {
  Mango: "আম",
  Wheat: "গম",
  Rice: "ধান",
  Vegetables: "সবজি",
  Jute: "পাট",
  Potato: "আলু",
  Tomato: "টমেটো",
  Tea: "চা",

  // New Bangladeshi Crops
  Onion: "পেঁয়াজ",
  Garlic: "রসুন",
  Ginger: "আদা",
  Chili: "মরিচ",
  Sugarcane: "আখ",
  Mustard: "সরিষা",
  Lentil: "মসুর ডাল",
  Chickpea: "ছোলা",
  Corn: "ভুট্টা",
  Banana: "কলা",
  Papaya: "পেপে",
  Pineapple: "আনারস",
  Coconut: "নারিকেল",
  BananaFlower: "মোচা",
  Eggplant: "বেগুন",
  Spinach: "পালং শাক",
  Pumpkin: "কুমড়া",
  Cucumber: "শসা",
  Watermelon: "তরমুজ",
  Sesame: "তিল",
  Soybean: "সয়াবিন",
  Turmeric: "হলুদ",
};


const achievementsBn = {
  "First Harvest of the Season": "মৌসুমের প্রথম ফসল সংগ্রহ",
  "Saved by a Brink": "শেষ মুহূর্তে ফসল রক্ষা",
  "Healthy Growth Guardian": "সুস্থ ফসল বৃদ্ধির অভিভাবক",
  "Bronze": "ব্রোঞ্জ পুরস্কার",
  "Pest Protector": "পোকামাকড় প্রতিরোধক",
  "Sustainable Farmer": "টেকসই কৃষক",
};

const tText = {
  en: {
    dashboard: "Dashboard",
    yourCrops: "Your Crops",
    addCrop: "Add New Crop",
    editProfile: "Edit Profile",
    noCrops: "No crops added.",
    noAchievements: "No achievements.",
    type: "Type",
    weight: "Weight",
    harvest: "Harvest",
    edit: "Edit",
    delete: "Delete",
  },
  bn: {
    dashboard: "ড্যাশবোর্ড",
    yourCrops: "আপনার ফসল",
    addCrop: "নতুন ফসল যোগ করুন",
    editProfile: "প্রোফাইল সম্পাদনা",
    noCrops: "কোনো ফসল যোগ করা হয়নি।",
    noAchievements: "এখনও কোনো অর্জন নেই।",
    type: "ধরন",
    weight: "ওজন",
    harvest: "ফসল তোলার তারিখ",
    edit: "সম্পাদনা",
    delete: "মুছুন",
  },
};

export default function Dashboard() {
  const { lang } = useLanguage();
  const text = tText[lang];
  const { user, loading: authLoading } = useFirebaseUser();

  /* ---------------- HOOKS ---------------- */
  const farmersQuery = useQuery({ queryKey: ["farmers"], queryFn: getFarmersData });
  const cropsQuery = useQuery({ queryKey: ["crops"], queryFn: getCropsData });
  const achievementsQuery = useQuery({ queryKey: ["achievements"], queryFn: getAchievementsData });

  if (authLoading) return <p className="text-center text-white pt-20">Loading…</p>;
  if (!user?.email) return <p className="text-center text-red-400 pt-20">Unauthorized</p>;

  if (farmersQuery.isLoading || cropsQuery.isLoading || achievementsQuery.isLoading)
    return <p className="text-center text-white pt-20">Loading…</p>;

  /* ---------------- USER DATA ---------------- */
  const email = user.email.trim().toLowerCase();

  const farmers = farmersQuery.data || [];
  const crops = cropsQuery.data || [];
  const achievements = achievementsQuery.data || [];

  const farmer = farmers.find((f) => f.email === email);
  const userCrops = crops.filter((c) => c.userEmail === email);

  const userAchievements =
    achievements.find((a) => a.userEmail === email) || { achievements: [] };

  /* ---------------- HANDLERS ---------------- */
  const handleEditUser = async () => {
    const { value: newName } = await Swal.fire({
      title: lang === "bn" ? "নাম পরিবর্তন করুন" : "Edit Name",
      input: "text",
      inputValue: farmer?.name || "",
      showCancelButton: true,
    });

    if (!newName) return;

    await updateUser(email, { name: newName });
    farmersQuery.refetch();

    Swal.fire(text.editProfile, "Updated!", "success");
  };

  const handleEditCrop = async (crop) => {
    const { value: newWeight } = await Swal.fire({
      title: lang === "bn" ? "ওজন আপডেট করুন" : "Edit Weight",
      input: "number",
      inputValue: crop.estimatedWeightKg,
      showCancelButton: true,
    });

    if (!newWeight) return;

    await updateCrop(email, crop.batchId, {
      estimatedWeightKg: Number(newWeight),
    });

    cropsQuery.refetch();
    Swal.fire("Updated!", "", "success");
  };

  const handleDeleteCrop = async (crop) => {
    const confirm = await Swal.fire({
      title: lang === "bn" ? "মুছতে চান?" : "Delete this crop?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    await deleteCrop(email, crop.batchId);
    cropsQuery.refetch();

    Swal.fire("Deleted!", "", "success");
  };

  /* ---------------- UI ---------------- */
  return (
    <ProtectedRoute>
      <div className="min-h-screen px-8 py-10">

        <h1 className="text-4xl font-bold text-[#F4D9A3] mb-10">{text.dashboard}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* PROFILE CARD */}
          <motion.div className="rounded-3xl p-10 bg-white/10 backdrop-blur-xl border border-white/20">
            <div className="flex flex-col items-center text-center">

              <Image
                src={farmer?.avatar || "/images/Male-Farmer.svg"}
                width={150}
                height={150}
                className="rounded-full border-4 border-[#F4D9A3]/40"
                alt="Avatar"
              />

              <h2 className="mt-6 text-3xl font-bold text-[#F4D9A3]">
                {farmer?.name}
              </h2>

              <p className="text-white/80">
                📍 {lang === "bn" ? districtBn[farmer?.district] : farmer?.district},
                {` `}
                {lang === "bn" ? divisionBn[farmer?.division] : farmer?.division}
              </p>

              <button
                onClick={handleEditUser}
                className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg"
              >
                {text.editProfile}
              </button>

              <h3 className="mt-8 text-xl text-[#F4D9A3] font-semibold">Achievements</h3>

              {userAchievements.achievements.length === 0 ? (
                <p className="text-white/60 mt-2">{text.noAchievements}</p>
              ) : (
                <div className="flex flex-wrap gap-3 mt-3">
                  {userAchievements.achievements.map((a, i) => (
                    <span key={i} className="px-3 py-1 bg-yellow-600/30 text-yellow-100 rounded-full">
                      ⭐ {lang === "bn" ? achievementsBn[a] : a}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* CROPS */}
          <motion.div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#F4D9A3]">{text.yourCrops}</h2>

              <Link href="/crops/register">
                <button className="px-5 py-2 bg-green-600 text-white rounded-lg">
                  + {text.addCrop}
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

              {userCrops.length === 0 ? (
                <p className="text-white/70">{text.noCrops}</p>
              ) : (
                userCrops.map((crop) => (
                  <motion.div
                    key={crop.batchId}
                    whileHover={{ scale: 1.04 }}
                    className="p-6 bg-white/10 rounded-2xl border border-white/20"
                  >
                    <h3 className="text-xl font-bold text-[#F4D9A3] mb-2">
                      🌾 {crop.cropName}
                    </h3>

                    <p className="text-white/80">
                      {text.type}:{" "}
                      {lang === "bn" ? cropTypeBn[crop.cropType] : crop.cropType}
                    </p>

                    <p className="text-white/80">
                      {text.weight}: {crop.estimatedWeightKg} kg
                    </p>

                    <p className="text-white/80">
                      {text.harvest}: {crop.harvestDate}
                    </p>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => handleEditCrop(crop)}
                        className="px-4 py-2 bg-blue-600 w-full text-white rounded"
                      >
                        {text.edit}
                      </button>

                      <button
                        onClick={() => handleDeleteCrop(crop)}
                        className="px-4 py-2 bg-red-600 w-full text-white rounded"
                      >
                        {text.delete}
                      </button>
                    </div>
                  </motion.div>
                ))
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
