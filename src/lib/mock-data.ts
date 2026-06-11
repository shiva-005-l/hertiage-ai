export interface HeritageSite {
  id: string;
  name: string;
  description: string;
  historicalEra: string;
  architectureStyle: string;
  imageUrl: string;
  crowdLevel: "Low" | "Medium" | "High";
  waitingTime: string;
  peakHours: string;
  location: string;
  entryFee: string;
  timings: string;
  audioGuide: string;
}

export type GuideLanguageCode = "en" | "te" | "hi" | "ta" | "kn";

export const heritageSites: HeritageSite[] = [
  {
    id: "site_1",
    name: "Charminar",
    description:
      "Built in 1591 by Sultan Muhammad Quli Qutb Shah, the Charminar is the global icon of Hyderabad. It was constructed to commemorate the eradication of a deadly plague. The structure incorporates a mosque and features four grand arches, each facing a cardinal direction.",
    historicalEra: "Qutb Shahi Dynasty (1591 AD)",
    architectureStyle: "Indo-Islamic",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Charminar_Hyderabad_1.jpg?width=1200",
    crowdLevel: "High",
    waitingTime: "45 mins",
    peakHours: "4 PM - 8 PM",
    location: "Hyderabad, Telangana",
    entryFee: "₹25 (Indian), ₹300 (Foreign)",
    timings: "9:30 AM – 5:30 PM",
    audioGuide:
      "The Charminar, which translates to 'Four Minarets', stands 56 meters tall and has been the defining image of Hyderabad for over four centuries. Each minaret rises 56 meters and contains a winding staircase with 149 steps.",
  },
  {
    id: "site_2",
    name: "Golconda Fort",
    description:
      "A fortified citadel and early capital of the Qutb Shahi dynasty, Golconda is famous for its remarkable acoustic system — a hand clap at the base of the fort can be heard at the topmost point. It was also once home to the legendary Koh-i-Noor diamond.",
    historicalEra: "Kakatiya Dynasty & Qutb Shahi (13th–17th century)",
    architectureStyle: "Islamic Military Architecture",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Golconda_Fort_005.jpg?width=1200",
    crowdLevel: "Medium",
    waitingTime: "20 mins",
    peakHours: "10 AM - 1 PM",
    location: "Ibrahim Bagh, Hyderabad",
    entryFee: "₹15 (Indian), ₹200 (Foreign)",
    timings: "8:00 AM – 5:30 PM",
    audioGuide:
      "Golconda Fort's acoustics are legendary — a clap near the entrance resonates all the way to the Bala Hisar pavilion at the top. The fort was built with eight gates, 87 semicircular bastions, and a complex system of water supply.",
  },
  {
    id: "site_3",
    name: "Chowmahalla Palace",
    description:
      "The official residence of the Nizams of Hyderabad, Chowmahalla Palace was the seat of the Asaf Jahi dynasty. Built in the style of the Shah of Iran's palace in Tehran, it houses vintage cars, weapons, and a stunning clock collection once belonging to the Nizams.",
    historicalEra: "Asaf Jahi Dynasty (1869 AD)",
    architectureStyle: "Mughal & European Fusion",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Chowmahalla_Palace_01.jpg?width=1200",
    crowdLevel: "Low",
    waitingTime: "0 mins",
    peakHours: "11 AM - 3 PM",
    location: "Old City, Hyderabad",
    entryFee: "₹80 (Indian), ₹200 (Foreign)",
    timings: "10:00 AM – 5:00 PM (Closed Friday)",
    audioGuide:
      "Chowmahalla, meaning 'Four Palaces', was the official residence used for state functions. The Khilwat Mubarak, or Grand Hall, features a magnificent chandelier and a large Durbar Hall where the Nizams conducted state business.",
  },
  {
    id: "site_4",
    name: "Qutb Shahi Tombs",
    description:
      "An impressive necropolis of seven tombs belonging to the Qutb Shahi rulers. Set in extensive gardens, these grand domed mausoleums represent some of the finest examples of Islamic funerary architecture in India. Each tomb rests on a large granite plinth.",
    historicalEra: "Qutb Shahi Dynasty (16th–17th century)",
    architectureStyle: "Persian-Islamic",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Qutb_Shahi_Tomb_5.jpg?width=1200",
    crowdLevel: "Low",
    waitingTime: "0 mins",
    peakHours: "10 AM - 12 PM",
    location: "Near Golconda Fort, Hyderabad",
    entryFee: "₹15 (Indian), ₹200 (Foreign)",
    timings: "9:30 AM – 4:30 PM (Closed Friday)",
    audioGuide:
      "The seven Qutb Shahi tombs are unique in that none of them are similar in form or size. Mohammed Quli Qutb Shah, the founder of Hyderabad, has the most grand tomb among them. The complex is set within lush gardens with a beautiful mosque.",
  },
  {
    id: "site_5",
    name: "Salar Jung Museum",
    description:
      "One of the three National Museums of India, Salar Jung Museum houses the personal art collection of Mir Yousuf Ali Khan (Salar Jung III), which he collected over 35 years. The collection includes rare manuscripts, jade work, ivory carvings, and European clocks.",
    historicalEra: "Asaf Jahi / Colonial Era (1951, established as museum)",
    architectureStyle: "Hybrid Colonial",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Salar_Jung_Museum%2C_Hyderabad%2C_India.jpg?width=1200",
    crowdLevel: "Medium",
    waitingTime: "15 mins",
    peakHours: "12 PM - 3 PM",
    location: "Darulshifa, Hyderabad",
    entryFee: "₹20 (Indian), ₹500 (Foreign)",
    timings: "10:00 AM – 5:00 PM (Closed Friday)",
    audioGuide:
      "The museum's most famous exhibit is the Veiled Rebecca, a marble sculpture so intricate that the veil appears transparent. The collection also includes Tipu Sultan's personal belongings and the famous musical clock from 19th century England.",
  },
  {
    id: "site_6",
    name: "Mecca Masjid",
    description:
      "One of the oldest and largest mosques in India, Mecca Masjid was commissioned by Muhammad Quli Qutb Shah in 1617 and completed by Aurangzeb in 1694. It can accommodate over 10,000 worshippers and bricks in its central arch were made with soil brought from Mecca.",
    historicalEra: "Qutb Shahi & Mughal Era (1694 AD)",
    architectureStyle: "Indo-Islamic Mosque Architecture",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mecca_Masjid_%2C_Hyderabad.jpg?width=1200",
    crowdLevel: "High",
    waitingTime: "30 mins",
    peakHours: "1 PM - 3 PM",
    location: "Charminar Road, Hyderabad",
    entryFee: "Free (Non-Muslims entry restricted during prayer)",
    timings: "Open all day (Prayer times: 5 AM, 1 PM, 4 PM, 6 PM, 8 PM)",
    audioGuide:
      "The Mecca Masjid is so named because bricks made from soil brought from Mecca were used in the central arch of the mosque. It took 77 years to complete, under three different rulers. The mosque also contains the tombs of the Asaf Jahi dynasty Nizams.",
  },
  {
    id: "site_7",
    name: "Falaknuma Palace",
    description:
      "Falaknuma Palace is a hilltop Nizam-era palace built by Nawab Sir Viqar-ul-Umra and later owned by the Nizam of Hyderabad. Its name means 'mirror of the sky', and the palace is known for Italian marble, stained glass, lavish halls, and sweeping views over the old city.",
    historicalEra: "Paigah & Asaf Jahi Era (1893 AD)",
    architectureStyle: "Italian Tudor & Indo-European",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Falaknuma_Palace_04.jpg?width=1200",
    crowdLevel: "Medium",
    waitingTime: "25 mins",
    peakHours: "5 PM - 8 PM",
    location: "Falaknuma, Hyderabad",
    entryFee: "Hotel / tour access varies",
    timings: "Access by reservation or guided tour",
    audioGuide:
      "Falaknuma Palace sits above Hyderabad like a mirror of the sky. Built in 1893, it blends Italian marble, Tudor details, grand staircases, and Nizam-era collections. Its dining hall and reception rooms show the luxury and diplomacy of princely Hyderabad.",
  },
  {
    id: "site_8",
    name: "Birla Mandir",
    description:
      "Birla Mandir is a white marble temple dedicated to Lord Venkateswara, standing on Naubat Pahad. Completed in 1976, it combines Dravidian, Rajasthani, and Utkala styles and offers one of the best skyline views of Hussain Sagar and central Hyderabad.",
    historicalEra: "Modern Heritage (1976 AD)",
    architectureStyle: "Dravidian, Rajasthani & Utkala",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/A_white_Marble_stone_Birla_Mandir_Hyderabad_Telangana.jpg?width=1200",
    crowdLevel: "High",
    waitingTime: "35 mins",
    peakHours: "6 PM - 9 PM",
    location: "Naubat Pahad, Hyderabad",
    entryFee: "Free",
    timings: "7:00 AM - 12:00 PM, 3:00 PM - 9:00 PM",
    audioGuide:
      "Birla Mandir rises on Naubat Pahad in bright white marble. Dedicated to Lord Venkateswara, it combines multiple Indian temple styles and is loved for its calm atmosphere, carved walls, and panoramic view of Hyderabad at sunset.",
  },
  {
    id: "site_9",
    name: "Taramati Baradari",
    description:
      "Taramati Baradari is a Qutb Shahi-era open pavilion near Golconda. Its twelve doorways were designed for cross ventilation, and local tradition connects the monument with Taramati, a celebrated court performer whose voice was said to carry across the landscape.",
    historicalEra: "Qutb Shahi Dynasty (17th century)",
    architectureStyle: "Persian Garden Pavilion",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Taramati-Baradari.jpg?width=1200",
    crowdLevel: "Low",
    waitingTime: "0 mins",
    peakHours: "5 PM - 7 PM",
    location: "Ibrahim Bagh, Hyderabad",
    entryFee: "Free / event access varies",
    timings: "10:00 AM - 6:00 PM",
    audioGuide:
      "Taramati Baradari is an airy twelve-door pavilion from the Qutb Shahi landscape near Golconda. Built for ventilation and performance, it carries stories of music, courtly life, and the old garden routes around the fort.",
  },
  {
    id: "site_10",
    name: "Paigah Tombs",
    description:
      "The Paigah Tombs are the resting place of the Paigah nobles, powerful families allied with the Nizams. The complex is admired for delicate stucco work, marble screens, floral motifs, geometric patterns, and an unusual blend of Deccani, Mughal, Persian, and Rajasthani styles.",
    historicalEra: "Asaf Jahi Era (18th-19th century)",
    architectureStyle: "Mughal, Persian & Deccani",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Paigah_Tombs.jpg?width=1200",
    crowdLevel: "Low",
    waitingTime: "0 mins",
    peakHours: "10 AM - 1 PM",
    location: "Santoshnagar, Hyderabad",
    entryFee: "Free / donation optional",
    timings: "10:00 AM - 5:00 PM",
    audioGuide:
      "Paigah Tombs are among Hyderabad's most intricate hidden monuments. Their marble lattice screens, stucco patterns, and floral carving honor generations of Paigah nobles, whose power and taste shaped the court culture of the Nizams.",
  },
];

export const siteAudioGuides: Record<string, Partial<Record<GuideLanguageCode, string>>> = {
  site_1: {
    te: "చార్మినార్ హైదరాబాద్ యొక్క గుర్తింపు. 1591లో మహ్మద్ కులీ కుతుబ్ షా దీనిని నిర్మించాడు. నాలుగు మినార్లు, గొప్ప వంపులు, పైభాగంలోని మసీదు ఈ స్మారకాన్ని ప్రత్యేకంగా నిలబెడతాయి.",
    hi: "चारमीनार हैदराबाद की पहचान है। इसे 1591 में मुहम्मद कुली कुतुब शाह ने बनवाया था। चार ऊंची मीनारें, विशाल मेहराब और ऊपर की मस्जिद इसे खास बनाते हैं।",
    ta: "சார்மினார் ஹைதராபாத்தின் அடையாளம். 1591 ஆம் ஆண்டு முகம்மது குலி குதுப் ஷா இதை கட்டினார். நான்கு மினார்கள், பெரிய வளைவுகள், மேலுள்ள மசூதி இதன் சிறப்பு.",
    kn: "ಚಾರ್ಮಿನಾರ್ ಹೈದರಾಬಾದ್ ನಗರದ ಗುರುತು. 1591ರಲ್ಲಿ ಮುಹಮ್ಮದ್ ಕುಲಿ ಕುತಬ್ ಶಾ ಇದನ್ನು ಕಟ್ಟಿಸಿದರು. ನಾಲ್ಕು ಮಿನಾರ್‌ಗಳು, ದೊಡ್ಡ ಕಮಾನುಗಳು ಮತ್ತು ಮೇಲಿನ ಮಸೀದಿ ಇದರ ವಿಶೇಷತೆ.",
  },
  site_2: {
    te: "గోల్కొండ కోట తన శబ్ద వ్యవస్థకు ప్రసిద్ధి. ప్రవేశద్వారం వద్ద చప్పట్లు కొడితే పై భాగంలోని బాలా హిసార్ వరకు వినిపిస్తుంది. ఈ కోట వజ్రాల చరిత్రతో కూడా ప్రసిద్ధం.",
    hi: "गोलकुंडा किला अपनी ध्वनि व्यवस्था के लिए प्रसिद्ध है। प्रवेश द्वार पर ताली की आवाज ऊपर बाला हिसार तक सुनाई देती है। यह किला हीरों के इतिहास से भी जुड़ा है।",
    ta: "கோல்கொண்டா கோட்டை அதன் ஒலி அமைப்புக்குப் புகழ்பெற்றது. நுழைவாயிலில் கைதட்டினால் மேல் பாலா ஹிசார் வரை ஒலி கேட்கும். வைர வரலாறும் இதனுடன் இணைந்துள்ளது.",
    kn: "ಗೋಲ್ಕೊಂಡ ಕೋಟೆ ತನ್ನ ಶಬ್ದ ವ್ಯವಸ್ಥೆಗೆ ಪ್ರಸಿದ್ಧ. ಪ್ರವೇಶದ್ವಾರದಲ್ಲಿ ಚಪ್ಪಾಳೆ ಹೊಡೆದರೆ ಮೇಲಿನ ಬಾಲಾ ಹಿಸಾರ್‌ವರೆಗೆ ಕೇಳಿಸುತ್ತದೆ. ಈ ಕೋಟೆ ವಜ್ರಗಳ ಇತಿಹಾಸಕ್ಕೂ ಸಂಬಂಧಿಸಿದೆ.",
  },
  site_3: {
    te: "చౌమహల్లా ప్యాలెస్ నిజాంల అధికార నివాసం. ఖిల్వత్ ముబారక్ సభామందిరం, భారీ దీపస్తంభాలు, పాత కార్లు మరియు ఆయుధాల సేకరణ ఇక్కడి ప్రధాన ఆకర్షణలు.",
    hi: "चौमहल्ला पैलेस निजामों का आधिकारिक निवास था। खिलवत मुबारक हॉल, भव्य झूमर, पुरानी कारें और हथियारों का संग्रह यहां के मुख्य आकर्षण हैं।",
    ta: "சௌமஹல்லா அரண்மனை நிசாம்களின் அதிகாரப்பூர்வ இல்லம். கில்வத் முபாரக் மண்டபம், பிரம்மாண்ட விளக்குகள், பழைய கார்கள் மற்றும் ஆயுதங்கள் இங்கு சிறப்பு.",
    kn: "ಚೌಮಹಲ್ಲಾ ಅರಮನೆ ನಿಜಾಂಗಳ ಅಧಿಕೃತ ನಿವಾಸವಾಗಿತ್ತು. ಖಿಲ್ವತ್ ಮುಬಾರಕ್ ಸಭಾಂಗಣ, ಭವ್ಯ ದೀಪಾಲಂಕಾರ, ಹಳೆಯ ಕಾರುಗಳು ಮತ್ತು ಆಯುಧಗಳ ಸಂಗ್ರಹ ಇಲ್ಲಿನ ಆಕರ್ಷಣೆ.",
  },
  site_4: {
    te: "కుతుబ్ షాహీ సమాధులు గోల్కొండ పాలకుల గొప్ప సమాధుల సముదాయం. గుండ్రని గోపురాలు, గ్రానైట్ పీఠాలు, తోటల మధ్య ఉన్న నిర్మాణాలు పర్షియన్-ఇస్లామిక్ శైలిని చూపిస్తాయి.",
    hi: "कुतुब शाही मकबरे गोलकुंडा के शासकों की भव्य समाधियां हैं। गुंबद, ग्रेनाइट चबूतरे और बगीचों के बीच बने ये ढांचे फारसी-इस्लामी शैली दिखाते हैं।",
    ta: "குதுப் ஷாஹி கல்லறைகள் கோல்கொண்டா ஆட்சியர்களின் மாபெரும் நினைவிடங்கள். குவிமாடங்கள், கிரானைட் மேடைகள், தோட்டங்கள் பாரசீக-இஸ்லாமிய அழகை காட்டுகின்றன.",
    kn: "ಕುತಬ್ ಶಾಹಿ ಸಮಾಧಿಗಳು ಗೋಲ್ಕೊಂಡ ಆಡಳಿತಗಾರರ ಭವ್ಯ ಸಮಾಧಿಗಳ ಸಮೂಹ. ಗುಂಬಜ್‌ಗಳು, ಗ್ರಾನೈಟ್ ವೇದಿಕೆಗಳು ಮತ್ತು ತೋಟಗಳು ಪರ್ಷಿಯನ್-ಇಸ್ಲಾಮಿಕ್ ಶೈಲಿಯನ್ನು ತೋರಿಸುತ್ತವೆ.",
  },
  site_5: {
    te: "సాలార్ జంగ్ మ్యూజియం భారతదేశంలోని జాతీయ మ్యూజియంలలో ఒకటి. సాలార్ జంగ్ మూడవ వారు సేకరించిన కళాఖండాలు, మాన్యుస్క్రిప్టులు, గడియారాలు, వీల్డ్ రెబెక్కా విగ్రహం ఇక్కడ ఉన్నాయి.",
    hi: "सालार जंग संग्रहालय भारत के राष्ट्रीय संग्रहालयों में एक है। यहां सालार जंग तृतीय का कला संग्रह, पांडुलिपियां, घड़ियां और प्रसिद्ध वील्ड रेबेका मूर्ति देखी जा सकती है।",
    ta: "சாலார் ஜங் அருங்காட்சியகம் இந்தியாவின் தேசிய அருங்காட்சியகங்களில் ஒன்று. கலைப்பொருட்கள், கையெழுத்து நூல்கள், கடிகாரங்கள், வீல்டு ரெபெக்கா சிற்பம் இங்கு உள்ளன.",
    kn: "ಸಾಲಾರ್ ಜಂಗ್ ಮ್ಯೂಸಿಯಂ ಭಾರತದ ರಾಷ್ಟ್ರೀಯ ಮ್ಯೂಸಿಯಂಗಳಲ್ಲಿ ಒಂದು. ಕಲಾಸಂಗ್ರಹ, ಪಾಂಡುಲಿಪಿಗಳು, ಘಡಿಗಳು ಮತ್ತು ಪ್ರಸಿದ್ಧ ವೀಲ್ಡ್ ರೆಬೆಕ್ಕಾ ಮೂರ್ತಿ ಇಲ್ಲಿ ಕಾಣಬಹುದು.",
  },
  site_6: {
    te: "మక్కా మసీదు భారతదేశంలోని పెద్ద మసీదులలో ఒకటి. మక్కా మట్టితో చేసిన ఇటుకలు మధ్య వంపులో ఉపయోగించబడ్డాయని చెబుతారు. ఇది పూర్తవడానికి అనేక దశాబ్దాలు పట్టింది.",
    hi: "मक्का मस्जिद भारत की बड़ी मस्जिदों में से एक है। कहा जाता है कि इसके मुख्य मेहराब में मक्का की मिट्टी से बनी ईंटें लगाई गईं। इसे पूरा होने में कई दशक लगे।",
    ta: "மக்கா மசூதி இந்தியாவின் பெரிய மசூதிகளில் ஒன்று. மக்காவில் இருந்து வந்த மண்ணால் செய்யப்பட்ட செங்கற்கள் மைய வளைவில் பயன்படுத்தப்பட்டதாக கூறப்படுகிறது.",
    kn: "ಮಕ್ಕಾ ಮಸೀದಿ ಭಾರತದ ದೊಡ್ಡ ಮಸೀದಿಗಳಲ್ಲಿ ಒಂದು. ಮಕ್ಕಾದ ಮಣ್ಣಿನಿಂದ ಮಾಡಿದ ಇಟ್ಟಿಗೆಗಳನ್ನು ಮಧ್ಯ ಕಮಾನಿನಲ್ಲಿ ಬಳಸಲಾಗಿದೆ ಎಂದು ಹೇಳಲಾಗುತ್ತದೆ. ಇದನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ದಶಕಗಳು ಬೇಕಾಯಿತು.",
  },
  site_7: {
    te: "ఫలక్‌నుమా ప్యాలెస్ ఆకాశం అద్దంలా పేరుగాంచింది. ఇటాలియన్ మార్బుల్, ట్యూడర్ శైలి, గొప్ప మెట్లు, నిజాం కాలపు కళాసేకరణలు ఈ ప్యాలెస్‌కు రాజసాన్ని ఇస్తాయి.",
    hi: "फलकनुमा पैलेस का अर्थ है आसमान का आईना। इतालवी संगमरमर, ट्यूडर शैली, भव्य सीढ़ियां और निजाम काल का संग्रह इसे शाही पहचान देते हैं।",
    ta: "பலக் நுமா அரண்மனை வானத்தின் கண்ணாடி என்று பொருள். இத்தாலிய மார்பிள், டியூடர் அம்சங்கள், பெரிய படிக்கட்டுகள், நிசாம் கால சேமிப்புகள் இதன் பெருமை.",
    kn: "ಫಲಕ್‌ನೂಮಾ ಅರಮನೆಯ ಹೆಸರು ಆಕಾಶದ ಕನ್ನಡಿಯೆಂಬ ಅರ್ಥ ಕೊಡುತ್ತದೆ. ಇಟಾಲಿಯನ್ ಮಾರ್ಬಲ್, ಟ್ಯೂಡರ್ ಶೈಲಿ, ಭವ್ಯ ಮೆಟ್ಟಿಲುಗಳು ಮತ್ತು ನಿಜಾಂ ಕಾಲದ ಸಂಗ್ರಹಗಳು ಇದರ ವೈಭವ.",
  },
  site_8: {
    te: "బిర్లా మందిర్ నౌబత్ పహాడ్ పై తెల్ల మార్బుల్‌తో నిర్మించిన దేవాలయం. వెంకటేశ్వర స్వామికి అంకితం చేసిన ఈ ఆలయం ప్రశాంత వాతావరణం మరియు నగర దృశ్యానికి ప్రసిద్ధి.",
    hi: "बिरला मंदिर नौबत पहाड़ पर सफेद संगमरमर से बना मंदिर है। भगवान वेंकटेश्वर को समर्पित यह स्थान शांत वातावरण और हैदराबाद के सुंदर दृश्य के लिए प्रसिद्ध है।",
    ta: "பிர்லா மந்திர் நௌபத் பஹாட் மேல் வெள்ளை மார்பிளால் கட்டப்பட்ட கோவில். வெங்கடேஸ்வரருக்கான இந்த இடம் அமைதிக்கும் நகரக் காட்சிக்கும் புகழ்பெற்றது.",
    kn: "ಬಿರ್ಲಾ ಮಂದಿರ್ ನೌಬತ್ ಪಹಾಡ್ ಮೇಲಿರುವ ಬಿಳಿ ಮಾರ್ಬಲ್ ದೇವಾಲಯ. ವೆಂಕಟೇಶ್ವರ ಸ್ವಾಮಿಗೆ ಸಮರ್ಪಿತವಾದ ಇದು ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ನಗರದ ನೋಟಕ್ಕೆ ಪ್ರಸಿದ್ಧ.",
  },
  site_9: {
    te: "తారామతి బారాదరి గోల్కొండ సమీపంలోని పన్నెండు ద్వారాల పావిలియన్. గాలి ప్రసరణ, సంగీత ప్రదర్శనలు, కుతుబ్ షాహీ తోటల కథలు ఈ స్థలాన్ని ఆసక్తికరంగా చేస్తాయి.",
    hi: "तारामती बारादरी गोलकुंडा के पास बारह दरवाजों वाला मंडप है। हवा के प्रवाह, संगीत प्रस्तुतियों और कुतुब शाही बागों की कहानियां इसे खास बनाती हैं।",
    ta: "தாராமதி பாராதரி கோல்கொண்டா அருகிலுள்ள பன்னிரண்டு வாயில் மண்டபம். காற்றோட்டம், இசை நிகழ்ச்சிகள், குதுப் ஷாஹி தோட்டக் கதைகள் இதன் சிறப்பு.",
    kn: "ತಾರಾಮತಿ ಬರಾದರಿ ಗೋಲ್ಕೊಂಡಾ ಸಮೀಪದ ಹನ್ನೆರಡು ಬಾಗಿಲಿನ ಮಂಟಪ. ಗಾಳಿ ಹರಿವು, ಸಂಗೀತ ಪ್ರದರ್ಶನಗಳು ಮತ್ತು ಕುತಬ್ ಶಾಹಿ ತೋಟಗಳ ಕಥೆಗಳು ಇದನ್ನು ವಿಶೇಷಗೊಳಿಸುತ್ತವೆ.",
  },
  site_10: {
    te: "పైగా సమాధులు హైదరాబాద్‌లోని అద్భుతమైన సున్నం మరియు మార్బుల్ కళాకృతులు. జాలి పనితనం, పుష్పాల నమూనాలు, జ్యామితీయ అలంకరణలు నిజాం కాలపు రుచిని చూపిస్తాయి.",
    hi: "पैगाह मकबरे हैदराबाद की नाजुक चूना और संगमरमर कला के उदाहरण हैं। जाली काम, फूलों के रूपांकन और ज्यामितीय सजावट निजाम काल की सुंदरता दिखाते हैं।",
    ta: "பைகா கல்லறைகள் ஹைதராபாத்தின் நுணுக்கமான சுண்ணாம்பு மற்றும் மார்பிள் கலை. ஜாலி வேலை, மலர் வடிவங்கள், கணித அலங்காரம் நிசாம் கால நயத்தை காட்டுகின்றன.",
    kn: "ಪೈಗಾ ಸಮಾಧಿಗಳು ಹೈದರಾಬಾದ್‌ನ ಸುಂದರ ಚೂನಾ ಮತ್ತು ಮಾರ್ಬಲ್ ಕಲೆಯ ಉದಾಹರಣೆ. ಜಾಲಿ ಕೆಲಸ, ಹೂವಿನ ವಿನ್ಯಾಸಗಳು ಮತ್ತು ಜ್ಯಾಮಿತೀಯ ಅಲಂಕಾರಗಳು ನಿಜಾಂ ಕಾಲದ ರುಚಿಯನ್ನು ತೋರಿಸುತ್ತವೆ.",
  },
};

export const siteAudioFallbackGuides: Record<string, Partial<Record<GuideLanguageCode, string>>> = {
  site_1: {
    te: "Charminar Hyderabad yokka gurthimpu. Idi 1591 lo Muhammad Quli Qutb Shah kattinchadu. Nalugu minarlu, pedda arches, paina unna masjid, ee smarakanni chala pratyekanga chestayi.",
    hi: "Charminar Hyderabad ki pehchan hai. Ise 1591 mein Muhammad Quli Qutb Shah ne banwaya tha. Chaar unchi minarein, bade mehrab, aur upar ki masjid ise khaas banate hain.",
    ta: "Charminar Hyderabad in adaiyalam. Idhai 1591 il Muhammad Quli Qutb Shah kattinar. Naangu minargal, periya valaivugal, mel irukkum masjid, idhai migavum sirappaga seigiradhu.",
    kn: "Charminar Hyderabad nagarada guruthu. Idannu 1591 ralli Muhammad Quli Qutb Shah kattisidaru. Naalku minargalu, dodda kamaanugalu, mattu melina masidi idara vishesha.",
  },
  site_2: {
    te: "Golconda Kota tana sound system ki prasiddhi. Entrance daggara clap chesthe paina Bala Hisar varaku vinipisthundi. Ee kota diamond history tho kuda chala famous.",
    hi: "Golconda Qila apni sound system ke liye mashhoor hai. Darwaze par taali bajane se awaaz upar Bala Hisar tak sunai deti hai. Yeh qila heere ke itihaas se bhi juda hai.",
    ta: "Golconda kottai adhan oli amaippukku pugazh petradhu. Vasalil kai thattinaal mel irukkum Bala Hisar varai oli ketkum. Idhu vairam varalarudanum inainthadhu.",
    kn: "Golconda kote tanna dhwani vyavasthige prasiddha. Pravesha dwaradalli chappale hodare mele Bala Hisar varege kelisuttade. Ee kote vajragala itihasakku sambandhiside.",
  },
  site_3: {
    te: "Chowmahalla Palace Nizam la official residence. Khilwat Mubarak hall, grand chandeliers, old cars, weapons collection ikkada main attractions.",
    hi: "Chowmahalla Palace Nizamon ka official residence tha. Khilwat Mubarak hall, bhavya chandeliers, purani cars, aur weapons collection yahan ke main attractions hain.",
    ta: "Chowmahalla Palace Nizamgalin adhikarappoorva illam. Khilwat Mubarak mandapam, periya vilakkugal, pazhaya cars, matrum aayudha sangraham inge mukkiyam.",
    kn: "Chowmahalla Palace Nizamaru adhikarika nivasavagittu. Khilwat Mubarak hall, bhavya deepagalu, hale carugalu, mattu ayudha sangraha illina mukhya akarshane.",
  },
  site_4: {
    te: "Qutb Shahi Tombs Golconda rulers yokka grand samadhula samudayam. Domes, granite platforms, gardens madhya unna structures Persian Islamic style ni chupistayi.",
    hi: "Qutb Shahi Tombs Golconda ke shasakon ki bhavya samadhiyan hain. Gumbad, granite platforms, aur gardens ke beech bani structures Persian Islamic style dikhati hain.",
    ta: "Qutb Shahi kallaraigal Golconda arasarhalin periya ninaividangal. Gumbad, granite medaigal, matrum thottangal Persian Islamic style ai kaattugindrana.",
    kn: "Qutb Shahi samadhigalu Golconda aaluvavara bhavya samadhigala samuha. Gumbaz, granite vedikegalu, mattu thotagalu Persian Islamic style torisuttave.",
  },
  site_5: {
    te: "Salar Jung Museum India lo national museums lo okati. Ikkada art pieces, manuscripts, clocks, and famous Veiled Rebecca sculpture chudachu.",
    hi: "Salar Jung Museum Bharat ke national museums mein se ek hai. Yahan art pieces, manuscripts, clocks, aur famous Veiled Rebecca sculpture dekhi ja sakti hai.",
    ta: "Salar Jung Museum India vin national museums il ondru. Inge art pieces, manuscripts, clocks, matrum famous Veiled Rebecca sculpture paarkalam.",
    kn: "Salar Jung Museum Bharathada national museums galli ondu. Illi art pieces, manuscripts, clocks, mattu famous Veiled Rebecca sculpture nodabahudu.",
  },
  site_6: {
    te: "Mecca Masjid India lo pedda masjid lo okati. Mecca nundi vachina matti tho chesina bricks central arch lo vadaru ani chebutaru. Complete avvadani ki chala decades pattindi.",
    hi: "Mecca Masjid Bharat ki badi masjidon mein se ek hai. Kaha jata hai ki central arch mein Mecca ki mitti se bani bricks lagayi gayi. Ise complete hone mein kai decades lage.",
    ta: "Mecca Masjid India vin periya masjidgalil ondru. Mecca manninaal seiyyappatta bricks central arch il payanpaduthappattadhu endru sollapadugiradhu.",
    kn: "Mecca Masjid Bharathada dodda masidigala ondu. Mecca manninda madida bricks central arch nalli balasalagide endu heluttare. Complete agalu aneka decades bekayitu.",
  },
  site_7: {
    te: "Falaknuma Palace ante akasam yokka addam. Italian marble, Tudor style, grand staircases, Nizam kalam collections, ee palace ki royal feel istayi.",
    hi: "Falaknuma Palace ka matlab hai aasman ka aaina. Italian marble, Tudor style, grand staircases, aur Nizam period collections ise royal feel dete hain.",
    ta: "Falaknuma Palace enbadhu vaanathin kannadi endra artham. Italian marble, Tudor style, periya padikkattugal, Nizam kalam collections, idharku royal azhagu tharugindrana.",
    kn: "Falaknuma Palace andre aakashada kannadi. Italian marble, Tudor style, bhavya mettilugalu, Nizam kalada collections, ee palace ge royal look koduttave.",
  },
  site_8: {
    te: "Birla Mandir Naubat Pahad paina white marble tho kattina temple. Venkateswara Swamy ki dedicated. Peaceful atmosphere and Hyderabad city view ki famous.",
    hi: "Birla Mandir Naubat Pahad par white marble se bana mandir hai. Yeh Lord Venkateswara ko dedicated hai. Peaceful atmosphere aur Hyderabad city view ke liye famous hai.",
    ta: "Birla Mandir Naubat Pahad mel white marble la kattappatta kovil. Idhu Venkateswara Swamy ku dedicated. Amaidhiyana atmosphere matrum Hyderabad city view ku pugazh petradhu.",
    kn: "Birla Mandir Naubat Pahad mele white marble inda kattida devasthana. Venkateswara Swamy ge dedicated. Shanta atmosphere mattu Hyderabad city view ge famous.",
  },
  site_9: {
    te: "Taramati Baradari Golconda daggara unna twelve door pavilion. Air flow, music performances, and Qutb Shahi garden stories ee place ni interesting ga chestayi.",
    hi: "Taramati Baradari Golconda ke paas twelve door pavilion hai. Air flow, music performances, aur Qutb Shahi garden stories is place ko interesting banate hain.",
    ta: "Taramati Baradari Golconda pakkathil irukkum twelve door pavilion. Air flow, music performances, matrum Qutb Shahi garden kathaihal idhai interesting aakkugindrana.",
    kn: "Taramati Baradari Golconda hattira iruva twelve door pavilion. Air flow, music performances, mattu Qutb Shahi garden kathegalu ee place annu interesting maduttave.",
  },
  site_10: {
    te: "Paigah Tombs Hyderabad lo intricate marble and stucco art ki famous. Jali work, floral patterns, geometric designs, Nizam period taste ni chupistayi.",
    hi: "Paigah Tombs Hyderabad ki delicate marble aur stucco art ke liye famous hain. Jali work, floral patterns, aur geometric designs Nizam period ki taste dikhate hain.",
    ta: "Paigah Tombs Hyderabad in delicate marble and stucco art ku pugazh petradhu. Jali work, flower patterns, geometric designs, Nizam period taste ai kaattugindrana.",
    kn: "Paigah Tombs Hyderabad na delicate marble mattu stucco art ge famous. Jali work, floral patterns, geometric designs, Nizam period taste torisuttave.",
  },
};

export const siteVoiceGuides: Record<string, Partial<Record<GuideLanguageCode, string>>> = {
  site_1: {
    en: "The Charminar is Hyderabad's most recognized landmark. Built in 1591 by Muhammad Quli Qutb Shah, it is known for its four tall minarets, grand arches, and the mosque on the upper floor.",
    hi: "चारमीनार हैदराबाद की सबसे प्रसिद्ध पहचान है। इसे 1591 में मुहम्मद कुली कुतुब शाह ने बनवाया था। इसकी चार ऊंची मीनारें, बड़े मेहराब और ऊपर की मस्जिद इसे खास बनाते हैं।",
    te: "చార్మినార్ హైదరాబాద్ యొక్క ప్రసిద్ధ గుర్తింపు. దీనిని 1591లో మహమ్మద్ కులీ కుతుబ్ షా నిర్మించాడు. నాలుగు ఎత్తైన మినార్లు, పెద్ద కమానులు, పైభాగంలోని మసీదు దీనిని ప్రత్యేకంగా నిలబెడతాయి.",
  },
  site_2: {
    en: "Golconda Fort is famous for its remarkable acoustic system. A clap near the entrance can be heard at the Bala Hisar pavilion. The fort is also linked with the history of famous diamonds.",
    hi: "गोलकुंडा किला अपनी अनोखी ध्वनि व्यवस्था के लिए प्रसिद्ध है। प्रवेश द्वार के पास ताली बजाने पर आवाज ऊपर बाला हिसार तक सुनाई देती है। यह किला प्रसिद्ध हीरों के इतिहास से भी जुड़ा है।",
    te: "గోల్కొండ కోట తన అద్భుతమైన శబ్ద వ్యవస్థకు ప్రసిద్ధి. ప్రవేశ ద్వారం దగ్గర చప్పట్లు కొడితే ఆ శబ్దం పైభాగంలోని బాలా హిసార్ వరకు వినిపిస్తుంది. ఈ కోట ప్రసిద్ధ వజ్రాల చరిత్రతో కూడా సంబంధం కలిగి ఉంది.",
  },
  site_3: {
    en: "Chowmahalla Palace was the official residence of the Nizams of Hyderabad. Its grand halls, chandeliers, vintage cars, weapons, and royal collections show the elegance of Nizam-era life.",
    hi: "चौमहल्ला पैलेस हैदराबाद के निजामों का आधिकारिक निवास था। इसके भव्य हॉल, झूमर, पुरानी कारें, हथियार और शाही संग्रह निजाम काल की सुंदरता दिखाते हैं।",
    te: "చౌమహల్లా ప్యాలెస్ హైదరాబాద్ నిజాముల అధికారిక నివాసం. ఇక్కడి విశాలమైన సభామందిరాలు, దీపస్తంభాలు, పాత కార్లు, ఆయుధాలు, రాజరిక సేకరణలు నిజాం కాలపు వైభవాన్ని చూపిస్తాయి.",
  },
  site_4: {
    en: "The Qutb Shahi Tombs are a grand group of royal mausoleums near Golconda. Their domes, granite platforms, gardens, and Persian-Islamic design make the complex a peaceful heritage site.",
    hi: "कुतुब शाही मकबरे गोलकुंडा के पास बने शाही समाधियों का भव्य समूह हैं। इनके गुंबद, ग्रेनाइट मंच, बगीचे और फारसी-इस्लामी शैली इस स्थान को शांत और ऐतिहासिक बनाते हैं।",
    te: "కుతుబ్ షాహీ సమాధులు గోల్కొండ సమీపంలోని రాజవంశ సమాధుల సముదాయం. గోపురాలు, గ్రానైట్ వేదికలు, తోటలు, పర్షియన్-ఇస్లామిక్ శైలి ఈ ప్రదేశాన్ని ప్రశాంతమైన వారసత్వ స్థలంగా నిలబెడతాయి.",
  },
  site_5: {
    en: "Salar Jung Museum is one of India's national museums. It displays manuscripts, clocks, jade objects, ivory carvings, European art, and the famous Veiled Rebecca sculpture.",
    hi: "सालार जंग संग्रहालय भारत के राष्ट्रीय संग्रहालयों में से एक है। यहां पांडुलिपियां, घड़ियां, जेड वस्तुएं, हाथीदांत की नक्काशी, यूरोपीय कला और प्रसिद्ध वील्ड रेबेका मूर्ति देखी जा सकती है।",
    te: "సాలార్ జంగ్ మ్యూజియం భారతదేశంలోని జాతీయ మ్యూజియంలలో ఒకటి. ఇక్కడ పాండులిపులు, గడియారాలు, జేడ్ వస్తువులు, దంతపు చెక్కులు, యూరోపియన్ కళాఖండాలు, ప్రసిద్ధ వీల్డ్ రెబెక్కా శిల్పం ఉన్నాయి.",
  },
  site_6: {
    en: "Mecca Masjid is one of the oldest and largest mosques in India. Its central arch is traditionally connected with soil brought from Mecca, and the mosque took many decades to complete.",
    hi: "मक्का मस्जिद भारत की सबसे पुरानी और बड़ी मस्जिदों में से एक है। माना जाता है कि इसके मुख्य मेहराब में मक्का से लाई गई मिट्टी से बनी ईंटों का उपयोग हुआ था। इसे पूरा होने में कई दशक लगे।",
    te: "మక్కా మసీదు భారతదేశంలోని పురాతనమైన మరియు పెద్ద మసీదులలో ఒకటి. మక్కా నుండి తీసుకొచ్చిన మట్టితో చేసిన ఇటుకలు మధ్య కమానులో ఉపయోగించారని చెబుతారు. ఈ మసీదు పూర్తి కావడానికి అనేక దశాబ్దాలు పట్టింది.",
  },
  site_7: {
    en: "Falaknuma Palace means mirror of the sky. Built on a hilltop, it is known for Italian marble, Tudor details, grand staircases, and luxurious Nizam-era collections.",
    hi: "फलकनुमा पैलेस का अर्थ है आसमान का आईना। पहाड़ी पर बना यह महल इटालियन संगमरमर, ट्यूडर शैली, भव्य सीढ़ियों और निजाम काल के शानदार संग्रह के लिए प्रसिद्ध है।",
    te: "ఫలక్‌నుమా ప్యాలెస్ అంటే ఆకాశానికి అద్దం. కొండపై నిర్మించిన ఈ రాజభవనం ఇటాలియన్ మార్బుల్, ట్యూడర్ శైలి, ఘనమైన మెట్లు, నిజాం కాలపు విలాసవంతమైన సేకరణలకు ప్రసిద్ధి.",
  },
  site_8: {
    en: "Birla Mandir is a white marble temple on Naubat Pahad. Dedicated to Lord Venkateswara, it is loved for its calm atmosphere, carved walls, and panoramic view of Hyderabad.",
    hi: "बिरला मंदिर नौबत पहाड़ पर बना सफेद संगमरमर का मंदिर है। भगवान वेंकटेश्वर को समर्पित यह स्थान शांत वातावरण, सुंदर नक्काशी और हैदराबाद के व्यापक दृश्य के लिए प्रसिद्ध है।",
    te: "బిర్లా మందిర్ నౌబత్ పహాడ్‌పై ఉన్న తెల్లని మార్బుల్ ఆలయం. శ్రీ వెంకటేశ్వర స్వామికి అంకితమైన ఈ ఆలయం ప్రశాంత వాతావరణం, చెక్కిన గోడలు, హైదరాబాద్ నగర దృశ్యానికి ప్రసిద్ధి.",
  },
  site_9: {
    en: "Taramati Baradari is a twelve-door pavilion near Golconda. Its open design supports airflow, and local stories connect it with music, performances, and Qutb Shahi garden life.",
    hi: "तारामती बारादरी गोलकुंडा के पास बारह दरवाजों वाला मंडप है। इसकी खुली बनावट हवा के प्रवाह में मदद करती है, और स्थानीय कहानियां इसे संगीत, प्रदर्शन और कुतुब शाही बागों से जोड़ती हैं।",
    te: "తారామతి బారాదరి గోల్కొండ సమీపంలోని పన్నెండు ద్వారాల మండపం. దీని తెరుచుకున్న నిర్మాణం గాలి ప్రసరణకు అనుకూలం. స్థానిక కథలు దీనిని సంగీతం, ప్రదర్శనలు, కుతుబ్ షాహీ తోటల జీవనంతో కలుపుతాయి.",
  },
  site_10: {
    en: "The Paigah Tombs are known for delicate stucco and marble craftsmanship. Their lattice screens, floral carvings, and geometric designs show the refined taste of Hyderabad's noble families.",
    hi: "पैगाह मकबरे नाजुक चूना और संगमरमर की कारीगरी के लिए प्रसिद्ध हैं। जालीदार स्क्रीन, फूलों की नक्काशी और ज्यामितीय डिजाइन हैदराबाद के कुलीन परिवारों की रुचि दिखाते हैं।",
    te: "పైగా సమాధులు సున్నం మరియు మార్బుల్ కళాకృతులకు ప్రసిద్ధి. జాలి తెరలు, పుష్పాల చెక్కులు, జ్యామితీయ నమూనాలు హైదరాబాద్ ప్రభువుల సున్నితమైన అభిరుచిని చూపిస్తాయి.",
  },
};

Object.assign(siteVoiceGuides, {
  site_1: {
    ...siteVoiceGuides.site_1,
    hi: "चारमीनार हैदराबाद की सबसे प्रसिद्ध पहचान है। इसे 1591 में मुहम्मद कुली कुतुब शाह ने बनवाया था। इसकी चार ऊंची मीनारें, बड़े मेहराब और ऊपर की मस्जिद इसे विशेष बनाते हैं।",
    te: "చార్మినార్ హైదరాబాద్ యొక్క అత్యంత ప్రసిద్ధ గుర్తింపు. దీనిని 1591లో మహమ్మద్ కులీ కుతుబ్ షా నిర్మించారు. నాలుగు ఎత్తైన మినార్లు, పెద్ద కమానులు, పైభాగంలోని మసీదు దీనిని ప్రత్యేకంగా నిలబెడతాయి.",
  },
  site_2: {
    ...siteVoiceGuides.site_2,
    hi: "गोलकोंडा किला अपनी अद्भुत ध्वनि व्यवस्था के लिए प्रसिद्ध है। प्रवेश द्वार के पास ताली बजाने पर आवाज ऊपर बाला हिसार तक सुनाई देती है। यह किला प्रसिद्ध हीरों के इतिहास से भी जुड़ा है।",
    te: "గోల్కొండ కోట తన అద్భుతమైన శబ్ద వ్యవస్థకు ప్రసిద్ధి. ప్రవేశ ద్వారం దగ్గర చప్పట్లు కొడితే ఆ శబ్దం పైభాగంలోని బాలా హిసార్ వరకు వినిపిస్తుంది. ఈ కోట ప్రసిద్ధ వజ్రాల చరిత్రతో కూడా సంబంధం కలిగి ఉంది.",
  },
  site_3: {
    ...siteVoiceGuides.site_3,
    hi: "चौमहल्ला पैलेस हैदराबाद के निजामों का आधिकारिक निवास था। इसके भव्य हॉल, झूमर, पुरानी कारें, हथियार और शाही संग्रह निजाम काल की सुंदरता दिखाते हैं।",
    te: "చౌమహల్లా ప్యాలెస్ హైదరాబాద్ నిజాముల అధికారిక నివాసం. ఇక్కడి విశాలమైన సభామందిరాలు, దీపస్తంభాలు, పాత కార్లు, ఆయుధాలు, రాజరిక సేకరణలు నిజాం కాలపు వైభవాన్ని చూపిస్తాయి.",
  },
  site_4: {
    ...siteVoiceGuides.site_4,
    hi: "कुतुब शाही मकबरे गोलकोंडा के पास बने शाही समाधियों का भव्य समूह हैं। इनके गुंबद, ग्रेनाइट मंच, बगीचे और फारसी-इस्लामी शैली इस स्थान को शांत और ऐतिहासिक बनाते हैं।",
    te: "కుతుబ్ షాహీ సమాధులు గోల్కొండ సమీపంలోని రాజవంశ సమాధుల సముదాయం. గోపురాలు, గ్రానైట్ వేదికలు, తోటలు, పర్షియన్-ఇస్లామిక్ శైలి ఈ ప్రదేశాన్ని ప్రశాంతమైన వారసత్వ స్థలంగా నిలబెడతాయి.",
  },
  site_5: {
    ...siteVoiceGuides.site_5,
    hi: "सालार जंग संग्रहालय भारत के राष्ट्रीय संग्रहालयों में से एक है। यहां पांडुलिपियां, घड़ियां, जेड वस्तुएं, हाथीदांत की नक्काशी, यूरोपीय कला और प्रसिद्ध वील्ड रेबेका मूर्ति देखी जा सकती है।",
    te: "సాలార్ జంగ్ మ్యూజియం భారతదేశంలోని జాతీయ మ్యూజియంలలో ఒకటి. ఇక్కడ పాండులిపులు, గడియారాలు, జేడ్ వస్తువులు, దంతపు చెక్కులు, యూరోపియన్ కళాఖండాలు, ప్రసిద్ధ వీల్డ్ రెబెక్కా శిల్పం ఉన్నాయి.",
  },
  site_6: {
    ...siteVoiceGuides.site_6,
    hi: "मक्का मस्जिद भारत की सबसे पुरानी और बड़ी मस्जिदों में से एक है। माना जाता है कि इसके मुख्य मेहराब में मक्का से लाई गई मिट्टी से बनी ईंटों का उपयोग हुआ था। इसे पूरा होने में कई दशक लगे।",
    te: "మక్కా మసీదు భారతదేశంలోని పురాతనమైన మరియు పెద్ద మసీదులలో ఒకటి. మక్కా నుండి తీసుకువచ్చిన మట్టితో చేసిన ఇటుకలు మధ్య కమానులో ఉపయోగించారని చెబుతారు. ఈ మసీదు పూర్తి కావడానికి అనేక దశాబ్దాలు పట్టింది.",
  },
  site_7: {
    ...siteVoiceGuides.site_7,
    hi: "फलकनुमा पैलेस का अर्थ है आसमान का आईना। पहाड़ी पर बना यह महल इतालवी संगमरमर, ट्यूडर शैली, भव्य सीढ़ियों और निजाम काल के शानदार संग्रह के लिए प्रसिद्ध है।",
    te: "ఫలక్‌నుమా ప్యాలెస్ అంటే ఆకాశానికి అద్దం. కొండపై నిర్మించిన ఈ రాజభవనం ఇటాలియన్ మార్బుల్, ట్యూడర్ శైలి, ఘనమైన మెట్లు, నిజాం కాలపు విలాసవంతమైన సేకరణలకు ప్రసిద్ధి.",
  },
  site_8: {
    ...siteVoiceGuides.site_8,
    hi: "बिरला मंदिर नौबत पहाड़ पर बना सफेद संगमरमर का मंदिर है। भगवान वेंकटेश्वर को समर्पित यह स्थान शांत वातावरण, सुंदर नक्काशी और हैदराबाद के व्यापक दृश्य के लिए प्रसिद्ध है।",
    te: "బిర్లా మందిర్ నౌబత్ పహాడ్‌పై ఉన్న తెల్లని మార్బుల్ ఆలయం. శ్రీ వెంకటేశ్వర స్వామికి అంకితమైన ఈ ఆలయం ప్రశాంత వాతావరణం, చెక్కిన గోడలు, హైదరాబాద్ నగర దృశ్యానికి ప్రసిద్ధి.",
  },
  site_9: {
    ...siteVoiceGuides.site_9,
    hi: "तारामती बारादरी गोलकोंडा के पास बारह दरवाजों वाला मंडप है। इसकी खुली बनावट हवा के प्रवाह में मदद करती है, और स्थानीय कहानियां इसे संगीत, प्रदर्शन और कुतुब शाही बागों से जोड़ती हैं।",
    te: "తారామతి బారాదరి గోల్కొండ సమీపంలోని పన్నెండు ద్వారాల మండపం. దీని తెరుచుకున్న నిర్మాణం గాలి ప్రసరణకు అనుకూలం. స్థానిక కథలు దీనిని సంగీతం, ప్రదర్శనలు, కుతుబ్ షాహీ తోటల జీవితంతో కలుపుతాయి.",
  },
  site_10: {
    ...siteVoiceGuides.site_10,
    hi: "पैगाह मकबरे नाजुक चूने और संगमरमर की कारीगरी के लिए प्रसिद्ध हैं। जालीदार परदे, फूलों की नक्काशी और ज्यामितीय डिजाइन हैदराबाद के कुलीन परिवारों की रुचि दिखाते हैं।",
    te: "పైగాహ్ సమాధులు సున్నం మరియు మార్బుల్ కళాకృతులకు ప్రసిద్ధి. జాలి తెరలు, పుష్పాల చెక్కులు, జ్యామితీయ నమూనాలు హైదరాబాద్ ప్రభువుల సున్నితమైన అభిరుచిని చూపిస్తాయి.",
  },
});

export function getSiteMapsUrl(site: Pick<HeritageSite, "name" | "location">) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name} ${site.location}`)}`;
}

export function getSiteGoogleSearchUrl(site: Pick<HeritageSite, "name" | "location">) {
  return `https://www.google.com/search?q=${encodeURIComponent(`${site.name} ${site.location} history timings`)}`;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  language: string;
  points: number;
  level: string;
  visitedSites: string[];
  badges: BadgeItem[];
  joinDate: string;
}

export interface BadgeItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt: string;
}

export const mockUser: UserProfile = {
  id: "user_123",
  name: "Explorer Aryan",
  email: "aryan@heritage.ai",
  language: "English",
  points: 1250,
  level: "Heritage Enthusiast",
  visitedSites: ["site_1", "site_2", "site_4"],
  joinDate: "March 2026",
  badges: [
    {
      id: "b1",
      name: "First Step",
      icon: "👣",
      description: "Visited your first heritage site",
      unlockedAt: "April 2026",
    },
    {
      id: "b2",
      name: "History Buff",
      icon: "📜",
      description: "Listened to 5+ audio guides",
      unlockedAt: "April 2026",
    },
    {
      id: "b3",
      name: "Explorer",
      icon: "🧭",
      description: "Visited 3 or more heritage sites",
      unlockedAt: "May 2026",
    },
    {
      id: "b4",
      name: "AI Pioneer",
      icon: "🤖",
      description: "Used the AI chatbot 10+ times",
      unlockedAt: "May 2026",
    },
  ],
};

export const chatbotKnowledgeBase: Record<string, string> = {
  charminar:
    "The Charminar was built in 1591 by Muhammad Quli Qutb Shah to commemorate the end of a deadly plague. It stands 56 meters tall with four identical minarets, each with 149 steps. The name literally means 'Four Towers' in Urdu. A mosque is housed on the top floor, still in use today.",
  golconda:
    "Golconda Fort was originally a mud fort, later expanded by the Bahmani Sultans and the Qutb Shahis into a massive granite citadel. Its most famous feature is its acoustic system — a clap at the entrance can be heard at the highest point 1 km away. The Koh-i-Noor and Hope diamonds were found in mines near here.",
  "qutb shahi":
    "The Qutb Shahi dynasty ruled Hyderabad from 1518 to 1687. Founded by Sultan Quli Qutb-ul-Mulk, the dynasty was known for its patronage of art, culture, and architecture. They built Hyderabad city, Golconda Fort, Charminar, and the Qutb Shahi Tombs.",
  nizam:
    "The Nizams of Hyderabad were the rulers of the princely state of Hyderabad for over 200 years (1724–1948). Nizam VII, Mir Osman Ali Khan, was once considered the richest person in the world. They were known for their extraordinary jewelry collection, including the famous Jacob Diamond.",
  hyderabad:
    "Hyderabad was founded in 1591 by Muhammad Quli Qutb Shah on the banks of the Musi River. Known as the 'City of Pearls', it became famous for its pearl and diamond trade. Today it is a major IT hub while retaining its rich heritage of Mughal, Persian and European architectural influences.",
  "salar jung":
    "Salar Jung III was the Prime Minister of Hyderabad and spent 35 years collecting over 43,000 art pieces from across the world. His collection includes the Veiled Rebecca statue, Tipu Sultan's sword, medieval European clocks, and rare Mughal manuscripts. The museum opened in 1951 on the banks of the Musi River.",
  architecture:
    "Hyderabad's heritage architecture blends Indo-Islamic, Persian, Mughal and European colonial styles. Charminar showcases pure Indo-Islamic style, while Chowmahalla Palace blends Mughal and European Baroque. The Qutb Shahi Tombs represent fine Persian-Islamic funerary architecture with bulbous domes.",
  diamond:
    "The legendary Koh-i-Noor diamond, now part of the British Crown Jewels, was mined from the Kollur Mine in the Deccan plateau and was in the possession of the Qutb Shahi rulers before passing through many hands. The Hope Diamond and Regent Diamond also trace origins to this region.",
};
