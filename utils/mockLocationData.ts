export interface ProvinceData {
  [province: string]: {
    [district: string]: string[];
  };
}

export const locationData: ProvinceData = {
  "กรุงเทพมหานคร (Bangkok)": {
    "พระนคร (Phra Nakhon)": ["พระบรมมหาราชวัง (Phra Borom Maha Ratchawang)", "วังบูรพาภิรมย์ (Wang Burapha Phirom)", "วัดราชบพิธ (Wat Ratchabophit)", "สำราญราษฎร์ (Samran Rat)", "ศาลเจ้าพ่อเสือ (San Chao Pho Suea)"],
    "ป้อมปราบศัตรูพ่าย (Pom Prap Sattru Phai)": ["ป้อมปราบ (Pom Prap)", "วัดเทพศิรินทร์ (Wat Thep Sirin)", "รองเมือง (Rong Muang)", "บ้านบาตร (Ban Bat)", "วัดโสมนัส (Wat Sommanat)"],
    "ปทุมวัน (Pathum Wan)": ["รองเมือง (Rong Muang)", "วังใหม่ (Wang Mai)", "ปทุมวัน (Pathum Wan)", "ลุมพินี (Lumphini)"],
    "สัมพันธวงศ์ (Samphanthawong)": ["จักรวรรดิ (Chakkrawat)", "สัมพันธวงศ์ (Samphanthawong)", "ตลาดน้อย (Talat Noi)"],
    "บางรัก (Bang Rak)": ["มหาพฤฒาราม (Maha Phruettharam)", "สีลม (Si Lom)", "สุริยวงศ์ (Suriyawong)", "บางรัก (Bang Rak)", "สี่พระยา (Si Phraya)"],
    "ยานนาวา (Yan Nawa)": ["ทุ่งวัดดอน (Thung Wat Don)", "ยานนาวา (Yan Nawa)", "ช่องนนทรี (Chong Nonsi)", "บางโพงพาง (Bang Phongphang)"],
    "สาทร (Sathon)": ["ทุ่งวัดดอน (Thung Wat Don)", "ยานนาวา (Yan Nawa)", "ทุ่งมหาเมฆ (Thung Maha Mek)"],
    "บางคอแหลม (Bang Kho Laem)": ["บางคอแหลม (Bang Kho Laem)", "วัดพระยาไกร (Wat Phraya Krai)", "บางโคล่ (Bang Khlo)"],
    "คลองเตย (Khlong Toei)": ["คลองเตย (Khlong Toei)", "คลองตัน (Khlong Tan)", "พระโขนง (Phra Khanong)"],
    "วัฒนา (Watthana)": ["คลองเตยเหนือ (Khlong Toei Nuea)", "คลองตันเหนือ (Khlong Tan Nuea)", "พระโขนงเหนือ (Phra Khanong Nuea)"],
    "ห้วยขวาง (Huai Khwang)": ["ห้วยขวาง (Huai Khwang)", "บางกะปิ (Bang Kapi)", "สามเสนนอก (Sam Sen Nok)"],
    "พญาไท (Phaya Thai)": ["สามเสนใน (Sam Sen Nai)", "พญาไท (Phaya Thai)"],
    "ราชเทวี (Ratchathewi)": ["ทุ่งพญาไท (Thung Phaya Thai)", "ถนนพญาไท (Thanon Phaya Thai)", "ถนนเพชรบุรี (Thanon Phetchaburi)", "มักกะสัน (Makkasan)"],
    "ดินแดง (Din Daeng)": ["ดินแดง (Din Daeng)"],
    "จตุจักร (Chatuchak)": ["ลาดยาว (Lat Yao)", "เสนานิคม (Sena Nikhom)", "จันทรเกษม (Chantharakasem)", "จอมพล (Chom Phon)", "จตุจักร (Chatuchak)"],
    "บางซื่อ (Bang Sue)": ["บางซื่อ (Bang Sue)", "วงศ์สว่าง (Wong Sawang)"],
    "ลาดพร้าว (Lat Phrao)": ["ลาดพร้าว (Lat Phrao)", "จรเข้บัว (Chorakhe Bua)"]
  },
  "นนทบุรี (Nonthaburi)": {
    "เมืองนนทบุรี (Mueang Nonthaburi)": ["สวนใหญ่ (Suan Yai)", "ตลาดขวัญ (Talat Khwan)", "บางเขน (Bang Khen)", "บางกระสอ (Bang Kraso)", "ท่าทราย (Tha Sai)", "บางไผ่ (Bang Phai)"],
    "บางกรวย (Bang Kruai)": ["วัดชลอ (Wat Chalo)", "บางกรวย (Bang Kruai)", "บางสีทอง (Bang Si Thong)"],
    "บางใหญ่ (Bang Yai)": ["บางม่วง (Bang Muang)", "บางแม่นาง (Bang Mae Nang)", "บางใหญ่ (Bang Yai)"],
    "บางบัวทอง (Bang Bua Thong)": ["โสนลอย (Sano Loi)", "บางบัวทอง (Bang Bua Thong)", "บางรักใหญ่ (Bang Rak Yai)"],
    "ไทรน้อย (Sai Noi)": ["ไทรน้อย (Sai Noi)", "ราษฎร์นิยม (Rat Niyom)", "หนองเพรางาย (Nong Phrao Ngai)"],
    "ปากเกร็ด (Pak Kret)": ["ปากเกร็ด (Pak Kret)", "บางตลาด (Bang Talat)", "บ้านใหม่ (Ban Mai)", "บางพูด (Bang Phut)"]
  },
  "สมุทรปราการ (Samut Prakan)": {
    "เมืองสมุทรปราการ (Mueang Samut Prakan)": ["ปากน้ำ (Pak Nam)", "สำโรงเหนือ (Samrong Nuea)", "บางเมือง (Bang Mueang)", "ท้ายบ้าน (Thai Ban)"],
    "บางบ่อ (Bang Bo)": ["บางบ่อ (Bang Bo)", "บ้านระกาศ (Ban Rakat)", "บางพลีน้อย (Bang Phli Noi)"],
    "บางพลี (Bang Phli)": ["บางพลีใหญ่ (Bang Phli Yai)", "บางแก้ว (Bang Kaeo)", "บางปลา (Bang Pla)", "บางโฉลง (Bang Chalong)"],
    "พระประแดง (Phra Pradaeng)": ["ตลาด (Talat)", "บางกะเจ้า (Bang Kachao)", "บางพึ่ง (Bang Phueng)", "บางจาก (Bang Chak)"],
    "พระสมุทรเจดีย์ (Phra Samut Chedi)": ["นาเกลือ (Na Kluea)", "บ้านคลองสวน (Ban Khlong Suan)", "แหลมฟ้าผ่า (Laem Fa Pha)", "ในคลองบางปลากด (Nai Khlong Bang Pla Kot)"],
    "บางเสาธง (Bang Sao Thong)": ["บางเสาธง (Bang Sao Thong)", "ศีรษะจรเข้น้อย (Sisa Chorakhe Noi)", "ศีรษะจรเข้ใหญ่ (Sisa Chorakhe Yai)"]
  },
  "เชียงใหม่ (Chiang Mai)": {
    "เมืองเชียงใหม่ (Mueang Chiang Mai)": ["ศรีภูมิ (Si Phum)", "พระสิงห์ (Phra Sing)", "หายยา (Haiya)", "ช้างม่อย (Chang Moi)", "ช้างคลาน (Chang Khlan)"],
    "จอมทอง (Chom Thong)": ["บ้านหลวง (Ban Luang)", "ข่วงเปา (Khuang Pao)", "สบเตี๊ยะ (Sop Tia)"],
    "แม่แจ่ม (Mae Chaem)": ["ช่างเคิ่ง (Chang Khoeng)", "ท่าผา (Tha Pha)", "บ้านทับ (Ban Thap)"]
  },
  "ภูเก็ต (Phuket)": {
    "เมืองภูเก็ต (Mueang Phuket)": ["ตลาดใหญ่ (Talat Yai)", "ตลาดเหนือ (Talat Nuea)", "เกาะแก้ว (Ko Kaeo)", "รัษฎา (Ratsada)", "วิชิต (Wichit)", "ฉลอง (Chalong)"],
    "กะทู้ (Kathu)": ["กะทู้ (Kathu)", "ป่าตอง (Pa Tong)", "กมลา (Kamala)"],
    "ถลาง (Thalang)": ["เทพกระษัตรี (Thep Krasattri)", "ศรีสุนทร (Si Sunthon)", "เชิงทะเล (Choeng Thale)", "ป่าคลอก (Pa Khlok)"]
  },
  "ชลบุรี (Chon Buri)": {
    "เมืองชลบุรี (Mueang Chon Buri)": ["บางทราย (Bang Sai)", "บ้านโขด (Ban Khot)", "บางปลาสร้อย (Bang Pla Soi)"],
    "บางละมุง (Bang Lamung)": ["บางละมุง (Bang Lamung)", "หนองปรือ (Nong Prue)", "หนองปลาไหล (Nong Pla Lai)", "พัทยา (Pattaya)"],
    "ศรีราชา (Si Racha)": ["ศรีราชา (Si Racha)", "สุรศักดิ์ (Surasak)", "ทุ่งสุขลา (Thung Sukhla)"]
  }
};
