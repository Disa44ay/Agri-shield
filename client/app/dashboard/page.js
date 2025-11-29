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
import Loading from "@/components/loading";

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
  Bronze: "ব্রোঞ্জ পুরস্কার",
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
  const farmersQuery = useQuery({
    queryKey: ["farmers"],
    queryFn: getFarmersData,
  });
  const cropsQuery = useQuery({ queryKey: ["crops"], queryFn: getCropsData });
  const achievementsQuery = useQuery({
    queryKey: ["achievements"],
    queryFn: getAchievementsData,
  });

  if (authLoading) return <Loading></Loading>;
  if (!user?.email)
    return <p className="text-center text-red-400 pt-20">Unauthorized</p>;

  if (
    farmersQuery.isLoading ||
    cropsQuery.isLoading ||
    achievementsQuery.isLoading
  )
    return <loading></loading>;

  /* ---------------- USER DATA ---------------- */
  const email = user.email.trim().toLowerCase();

  const farmers = farmersQuery.data || [];
  const crops = cropsQuery.data || [];
  const achievements = achievementsQuery.data || [];

  const farmer = farmers.find((f) => f.email === email);
  const userCrops = crops.filter((c) => c.userEmail === email);

  const userAchievements = achievements.find((a) => a.userEmail === email) || {
    achievements: [],
  };

  /* ------------------------- EDIT USER ------------------------- */
  const handleEditUser = async () => {
    const htmlForm = `
      <input id="name" class="swal2-input" placeholder="Name" value="${
        farmer?.name || ""
      }">
      <input id="phone" class="swal2-input" placeholder="Phone" value="${
        farmer?.phone || ""
      }">
      <input id="district" class="swal2-input" placeholder="District" value="${
        farmer?.district || ""
      }">
      <input id="division" class="swal2-input" placeholder="Division" value="${
        farmer?.division || ""
      }">
    `;

    const { value: formValues } = await Swal.fire({
      title: "Edit Profile",
      html: htmlForm,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: "#F4D9A3",
      cancelButtonColor: "#222",
      preConfirm: () => {
        return {
          name: document.getElementById("name").value,
          phone: document.getElementById("phone").value,
          district: document.getElementById("district").value,
          division: document.getElementById("division").value,
        };
      },
    });

    if (!formValues) return;

    await updateUser(email, formValues);
    farmersQuery.refetch();
    Swal.fire("Updated!", "", "success");
  };

  /* ------------------------- EDIT CROP ------------------------- */
  const handleEditCrop = async (crop) => {
    const htmlForm = `
      <input id="cropName" class="swal2-input" placeholder="Crop Name" value="${crop.cropName}">
      <input id="cropType" class="swal2-input" placeholder="Crop Type" value="${crop.cropType}">
      <input id="weight" class="swal2-input" type="number" placeholder="Weight (kg)" value="${crop.estimatedWeightKg}">
      <input id="harvestDate" class="swal2-input" placeholder="Harvest Date" value="${crop.harvestDate}">
    `;

    const { value: formValues } = await Swal.fire({
      title: "Edit Crop",
      html: htmlForm,
      showCancelButton: true,
      confirmButtonColor: "#F4D9A3",
      cancelButtonColor: "#222",
      preConfirm: () => {
        return {
          cropName: document.getElementById("cropName").value,
          cropType: document.getElementById("cropType").value,
          estimatedWeightKg: Number(document.getElementById("weight").value),
          harvestDate: document.getElementById("harvestDate").value,
        };
      },
    });

    if (!formValues) return;

    await updateCrop(email, crop.batchId, formValues);
    cropsQuery.refetch();
    Swal.fire("Updated!", "", "success");
  };

  /* ------------------------- DELETE CROP ------------------------- */
  const handleDeleteCrop = async (crop) => {
    const confirm = await Swal.fire({
      title: "Delete this crop?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F4D9A3",
      cancelButtonColor: "#222",
    });

    if (!confirm.isConfirmed) return;

    await deleteCrop(email, crop.batchId);
    cropsQuery.refetch();

    Swal.fire("Deleted!", "", "success");
  };

  /* ---------------- UI ---------------- */
  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full px-4 sm:px-6 lg:px-10 py-10">
        {/* HEADER */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#F4D9A3] mb-10 drop-shadow-lg">
          {text.dashboard}
        </h1>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ===================== PROFILE CARD ===================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl p-8 md:p-10 
                     bg-black/30 backdrop-blur-2xl 
                     border border-white/20 shadow-2xl
                     flex flex-col items-center text-center
                     transition-all"
          >
            <Image
              src={farmer?.avatar || "/images/Male-Farmer.svg"}
              width={150}
              height={150}
              alt="Avatar"
              className="rounded-full border-4 border-[#F4D9A3]/50 shadow-xl"
            />

            <h2 className="mt-6 text-2xl md:text-3xl font-bold text-[#F4D9A3] drop-shadow">
              {farmer?.name}
            </h2>

            <p className="text-white/80 text-sm md:text-base mt-1">
              📍{" "}
              {lang === "bn" ? districtBn[farmer?.district] : farmer?.district},{" "}
              {lang === "bn" ? divisionBn[farmer?.division] : farmer?.division}
            </p>

            <p className="text-white/80 text-sm md:text-base mt-1">
              📞 {farmer?.phone}
            </p>

            <button
              onClick={handleEditUser}
              className="mt-5 px-6 py-2 
                bg-[#F4D9A3] text-black font-semibold
                hover:bg-[#e3c88f] 
                rounded-lg shadow-md w-full md:w-auto"
            >
              {text.editProfile}
            </button>

            {/* Achievements */}
            <h3 className="mt-8 text-xl font-semibold text-[#F4D9A3]">
              Achievements
            </h3>

            {userAchievements.achievements.length === 0 ? (
              <p className="text-white/60 mt-2 text-sm">
                {text.noAchievements}
              </p>
            ) : (
              <div className="flex flex-wrap gap-3 mt-4 justify-center">
                {userAchievements.achievements.map((a, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-yellow-600/40 
                             text-yellow-100 rounded-full shadow-sm"
                  >
                    ⭐ {lang === "bn" ? achievementsBn[a] : a}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* ===================== CROPS SECTION ===================== */}
          <motion.div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-[#F4D9A3]">
                {text.yourCrops}
              </h2>

              <Link href="/crops/register">
                <button
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 
                                 text-white rounded-lg shadow-md"
                >
                  + {text.addCrop}
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {userCrops.length === 0 ? (
                <p className="text-white/70 text-lg">{text.noCrops}</p>
              ) : (
                userCrops.map((crop) => (
                  <motion.div
                    key={crop.batchId}
                    whileHover={{ scale: 1.04 }}
                    className="p-6 bg-black/30 rounded-2xl border border-white/20 
                             backdrop-blur-xl shadow-xl transition-all"
                  >
                    <h3 className="text-xl font-bold text-[#F4D9A3] mb-2">
                      🌾 {crop.cropName}
                    </h3>

                    <p className="text-white/80">
                      {text.type}: {crop.cropType}
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
                        className="px-4 py-2 
                            bg-[#F4D9A3] text-black font-semibold 
                            hover:bg-[#e3c88f]
                            w-full rounded shadow"
                      >
                        {text.edit}
                      </button>

                      <button
                        onClick={() => handleDeleteCrop(crop)}
                        className="px-4 py-2 
                            bg-red-700 hover:bg-red-800 
                            w-full text-white rounded shadow"
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
