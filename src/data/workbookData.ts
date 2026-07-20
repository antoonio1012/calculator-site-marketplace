export type ShopeeAdminCategory = {
  group: string;
  name: string;
  detail: string;
  rate: number;
};

export type FeeOption = {
  name: string;
  rate: number;
};

export type FreeShippingOption = FeeOption & {
  cap: number;
};

export type TiktokRate = {
  shippingType: string;
  origin: string;
  destination: string;
  rates: [number, number, number, number, number, number];
};

export const shopeeAdminCategories = [
  {
    "group": "Aksesoris Fashion",
    "name": "Aksesoris Rambut",
    "detail": "Bando & Bandana, Ikat Rambut, Pita & Scrunchie, Jepitan & Pin Rambut, Rambut Palsu & Extension, Hiasan Kepala, Tiara & Mahkota Bunga, Aksesoris Rambut Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Aksesoris Tambahan",
    "detail": "Bros & Pin, Bordir, Liontin, Kancing Manset, Tato Temporer, Sapu Tangan, Aksesoris Tambahan Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Anting",
    "detail": "Anting",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Cincin",
    "detail": "Cincin",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Dasi",
    "detail": "Dasi",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Gelang Kaki",
    "detail": "Gelang Kaki",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Gelang Tangan & Bangle",
    "detail": "Gelang Tangan & Bangle",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Ikat Pinggang",
    "detail": "Ikat Pinggang",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Kacamata & Aksesoris",
    "detail": "Kacamata Hitam, Frame & Lensa Kacamata, Tempat Kacamata & Aksesoris, Aksesoris Kacamata Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Kalung",
    "detail": "Kalung",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Sarung Tangan",
    "detail": "Sarung Tangan",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Set & Paket Aksesoris",
    "detail": "Set & Paket Aksesoris",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Syal & Selendang",
    "detail": "Syal & Selendang",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Topi",
    "detail": "Topi",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Logam Mulia",
    "detail": "Platinum & Emas, Perak, Berlian, Permata, Logam Mulia Lainnya",
    "rate": 0.0425
  },
  {
    "group": "",
    "name": "Perhiasan Berharga",
    "detail": "Kalung, Gelang Tangan, Cincin, Anting, Gelang Kaki, Liontin, Bros & Pin, Set Perhiasan, Perhiasan Berharga Lainnya",
    "rate": 0.0425
  },
  {
    "group": "",
    "name": "Aksesoris Fashion Lainnya",
    "detail": "Aksesoris Fashion Lainnya",
    "rate": 0.09
  },
  {
    "group": "Fashion Bayi & Anak",
    "name": "Aksesoris Bayi & Anak",
    "detail": "Ransel, Tas Selempang & Bahu, Tas Troli, Dompet, Tas & Koper Lainnya, Jam Tangan, Topi, Kacamata, Aksesoris Rambut, Sarung Tangan, Ikat Pinggang, Kaos Kaki, Syal, Alat Penutup Telinga, Aksesoris Bayi & Anak Lainnya, Jas Hujan, Sepatu Boot Hujan, Perlengkapan Hujan Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Pakaian Anak Laki-Laki",
    "detail": "Kostum, Pakaian Dalam, Pakaian Tidur, Baju Renang, Kaos, Kaos Polo, Kemeja, Jaket & Coat Reguler, Outerwear Musim Dingin, Rompi, Sweater & Kardigan, Blazer, Hoodie, Outerwear Lainnya, Jeans, Celana, Celana Pendek, Overall, Jas & Setelan, Pakaian Anak Laki-Laki Lainnya, Atasan Lainnya, Bawahan Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Pakaian Anak Perempuan",
    "detail": "Kostum, Pakaian Dalam, Baju Tidur, Baju Renang, Kaos, Kaos Polo, Kemeja & Blouse, Jaket & Coat Reguler, Outerwear Musim Dingin, Rompi, Sweater & Kardigan, Blazer, Hoodie, Outerwear Lainnya, Jeans, Celana Panjang, Celana Pendek, Rok, Legging, Romper, Jumpsuit & Overall, Dress, Jas & Setelan, Pakaian Anak Perempuan Lainnya, Atasan Lainnya, Bawahan Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Pakaian Bayi",
    "detail": "Outerwear Reguler, Outerwear Musim Dingin, Dress, Celana Panjang & Legging, Celana Pendek, Rok, Bawahan Lainnya, Baju Tidur, Atasan, Bodysuit & Jumper, Set, Baju Renang, Pakaian Bayi Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Sepatu Anak Laki-Laki",
    "detail": "Sepatu Boot, Sandal, Sepatu Sneaker, Flip Flop, Sepatu Formal, Loafers, Sepatu Anak Laki-Laki Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Sepatu Anak Perempuan",
    "detail": "Sepatu Boot, Sandal, Sepatu Sneaker, Loafers, Flip Flop, Flats, Sepatu Anak Perempuan Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Sepatu Bayi",
    "detail": "Sepatu Bayi",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Fashion Bayi & Anak Lainnya",
    "detail": "Fashion Bayi & Anak Lainnya",
    "rate": 0.09
  },
  {
    "group": "Fashion Muslim",
    "name": "Pakaian Muslim Wanita",
    "detail": "Baju Olahraga Muslim, Baju Renang Muslim",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Mukena & Perlengkapan Sholat",
    "detail": "Set Perlengkapan Sholat, Sajadah, Peci, Songkok & Kopiah, Mukena, Mukena Travel, Mukena & Perlengkapan Sholat Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Outerwear",
    "detail": "Rompi, Jaket, Mantel, Cardigan, Outerwear Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Pakaian Muslim Anak",
    "detail": "Mukena, Hijab, Pakaian & Set Muslim, Pakaian Muslim Anak Perempuan Lainnya, Pakaian Muslim Anak Laki-Laki, Pakaian Muslim Anak Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Pakaian Muslim Pria",
    "detail": "Atasan, Gamis Pria, Celana, Sarung, Baju Melayu, Pakaian Muslim Pria Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Set",
    "detail": "Set",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Fashion Muslim Lainnya",
    "detail": "Fashion Muslim Lainnya",
    "rate": 0.0825
  },
  {
    "group": "Jam Tangan",
    "name": "Aksesoris Jam Tangan",
    "detail": "Strap, Alat Servis Jam Tangan, Pengait Jam Tangan, Baterai Jam Tangan, Kotak Jam Tangan, Aksesoris Jam Tangan lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Jam Tangan Couple",
    "detail": "Jam Tangan Couple",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Jam Tangan Pria",
    "detail": "Jam Tangan Pria",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Jam Tangan Wanita",
    "detail": "Jam Tangan Wanita",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Jam Tangan Lainnya",
    "detail": "Jam Tangan Lainnya",
    "rate": 0.09
  },
  {
    "group": "Koper & Tas Travel",
    "name": "Tas Travel",
    "detail": "Tas Duffel",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Aksesoris Travel",
    "detail": "Passport Cover, Organizer Travel, Pelindung & Sarung Koper, Tag Koper, Strap Koper, Gembok Koper, Timbangan Koper, Bantal Leher & Penutup Mata, Botol & Wadah Isi Ulang, Aksesoris Travel Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Koper",
    "detail": "Koper",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Koper & Tas Travel Lainnya",
    "detail": "Koper & Tas Travel Lainnya",
    "rate": 0.09
  },
  {
    "group": "Pakaian Pria",
    "name": "Kaos Kaki",
    "detail": "Kaos Kaki",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Atasan",
    "detail": "Kemeja, Kaos Polo, Kaos, Tanktop, Atasan Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Celana Panjang",
    "detail": "Celana Panjang, Celana Panjang Lainnya, Cargo, Jogger",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Celana Panjang Jeans",
    "detail": "Celana Panjang Jeans",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Celana Pendek",
    "detail": "Celana Pendek",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Hoodie & Sweatshirt",
    "detail": "Hoodie, Sweatshirt, Hoodie & Sweatshirt Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Jaket, Mantel, & Rompi",
    "detail": "Jaket, Rompi, Jaket & Mantel Musim Dingin, Jaket, Mantel, & Rompi Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Jas Formal",
    "detail": "Set Jas Formal, Jas & Blazer Formal, Celana Formal, Rompi Formal, Jas Formal Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Kostum",
    "detail": "Kostum",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Pakaian Dalam",
    "detail": "Celana Dalam, Kaos Dalam, Pakaian Dalam Termal, Pakaian Dalam Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Pakaian Kerja",
    "detail": "Pakaian Kerja",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Pakaian Tidur",
    "detail": "Pakaian Tidur",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Pakaian Tradisional",
    "detail": "Atasan Tradisional, Bawahan Tradisional, Set Pakaian Tradisional, Pakaian Tradisional Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Set Pakaian Pria",
    "detail": "Set Pakaian Pria",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Sweater & Cardigan",
    "detail": "Sweater & Cardigan",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Pakaian Pria Lainnya",
    "detail": "Pakaian Pria Lainnya",
    "rate": 0.0825
  },
  {
    "group": "Pakaian Wanita",
    "name": "Kaos Kaki & Stocking",
    "detail": "Kaos Kaki",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Baju Hamil",
    "detail": "Bra Menyusui, Dress Hamil, Atasan Hamil, Baju Menyusui, Set Baju Hamil, Celana Hamil, Baju Hamil Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Celana Jeans",
    "detail": "Celana Jeans",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Celana Panjang & Legging",
    "detail": "Legging & Tregging, Celana Panjang, Celana Panjang & Legging Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Dress",
    "detail": "Dress",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Jumpsuit, Playsuit, & Overall",
    "detail": "Jumpsuit, Playsuit, Overall, Jumpsuit, Playsuit, & Overall Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Kain",
    "detail": "Batik, Kebaya, Katun, Wol, Beludru, Sutra, & Satin, Kulit, Vinil & Nilon, Denim, Kanvas, Songket, Kain Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Pakaian Tidur & Piyama",
    "detail": "Piyama, Daster, Kimono, Pakaian Tidur & Piyama Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Rok",
    "detail": "Rok",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Wedding Dress",
    "detail": "Wedding Dress",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Pakaian Wanita Lainnya",
    "detail": "Pakaian Wanita Lainnya",
    "rate": 0.0825
  },
  {
    "group": "Sepatu Pria",
    "name": "Aksesoris & Perawatan Sepatu",
    "detail": "Alat Perawatan & Pembersih Sepatu, Parfum Sepatu, Shoe Tree & Horns, Insole Sepatu, Aksesoris & Perawatan Sepatu Lainnya, Tali Sepatu",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Boot",
    "detail": "Boot Fashion, Sepatu Boot Hujan, Safety Boot, Boot Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Loafer",
    "detail": "Loafer",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Oxford",
    "detail": "Oxford",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Sandal",
    "detail": "Sandal Jepit, Sandal Slide, Sandal Rumah, Sandal Kesehatan, Sandal Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Slip-On & Mules",
    "detail": "Slip-On & Mules",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Sneakers",
    "detail": "Sneakers",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Sepatu Pria Lainnya",
    "detail": "Sepatu Pria Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Boots",
    "detail": "Sepatu Boot Hujan, Sepatu Boot Fashion, Boots Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Heels",
    "detail": "Heels",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Sandal Jepit & Sandal Lainnya",
    "detail": "Sandal Flat, Sandal Jepit, Sandal Kesehatan, Sandal Rumah, Sandal Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Sepatu Flat",
    "detail": "Flat & Ballerina, Loafer, Sepatu Oxford, Slip-On, Mules & Mary Janes, Sepatu Flat Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Wedges",
    "detail": "Wedges",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Sepatu Wanita Lainnya",
    "detail": "Sepatu Wanita Lainnya",
    "rate": 0.09
  },
  {
    "group": "Tas Pria",
    "name": "Clutch",
    "detail": "Clutch",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Dompet",
    "detail": "Dompet Kartu, Dompet Koin, Dompet Kunci & Handphone, Dompet Lipat, Dompet Panjang, Dompet Lainnya",
    "rate": 0.0900000000000001
  },
  {
    "group": "",
    "name": "Ransel Pria",
    "detail": "Ransel Pria",
    "rate": 0.0900000000000001
  },
  {
    "group": "",
    "name": "Tas Kerja",
    "detail": "Tas Kerja",
    "rate": 0.0900000000000001
  },
  {
    "group": "",
    "name": "Tas Laptop",
    "detail": "Tas & Case Laptop, Sarung Laptop, Ransel Laptop, Tas Laptop Lainnya",
    "rate": 0.0900000000000001
  },
  {
    "group": "",
    "name": "Tas Pinggang Pria",
    "detail": "Tas Pinggang Pria",
    "rate": 0.0900000000000001
  },
  {
    "group": "",
    "name": "Tas Selempang & Bahu Pria",
    "detail": "Tas Selempang & Bahu Pria",
    "rate": 0.0900000000000002
  },
  {
    "group": "",
    "name": "Tote Bag",
    "detail": "Tote Bag",
    "rate": 0.0900000000000002
  },
  {
    "group": "",
    "name": "Tas Pria Lainnya",
    "detail": "Tas Pria Lainnya",
    "rate": 0.0900000000000002
  },
  {
    "group": "Tas Wanita",
    "name": "Aksesoris Tas",
    "detail": "Tali Tas, Gantungan Tas, Hiasan & Gantungan Kunci, Organizer Tas, Produk Perawatan & Pembersih Tas, Aksesoris Tas Wanita Lainnya",
    "rate": 0.0900000000000002
  },
  {
    "group": "",
    "name": "Dompet Wanita",
    "detail": "Dompet Kartu, Dompet Koin, Dompet Kunci & Handphone, Dompet Lipat, Dompet Panjang, Dompet Wanita Lainnya",
    "rate": 0.0900000000000002
  },
  {
    "group": "",
    "name": "Ransel Wanita",
    "detail": "Ransel Wanita",
    "rate": 0.0900000000000003
  },
  {
    "group": "",
    "name": "Tas Pinggang Wanita",
    "detail": "Tas Pinggang Wanita",
    "rate": 0.0900000000000003
  },
  {
    "group": "",
    "name": "Tas Selempang & Bahu Wanita",
    "detail": "Tas Selempang & Bahu Wanita",
    "rate": 0.0900000000000003
  },
  {
    "group": "",
    "name": "Top Handle Bag",
    "detail": "Top Handle Bag",
    "rate": 0.0900000000000003
  },
  {
    "group": "",
    "name": "Tas Wanita Lainnya",
    "detail": "Tas Wanita Lainnya",
    "rate": 0.0900000000000003
  },
  {
    "group": "Ibu & Bayi",
    "name": "Inflatable & Perosotan",
    "detail": "Inflatable & Perosotan",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Keamanan Bayi",
    "detail": "Baby Monitor, Kelambu, Bumper, Rail, & Guard, Pelindung Sudut, Pintu & Pagar Bayi, Pengaman Laci & Lemari, Alat Keamanan Bayi Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Kesehatan Kehamilan",
    "detail": "Susu Ibu Hamil, Vitamin & Suplemen Ibu Hamil, Pelembab & Cream, Kesehatan Kehamilan Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Mainan",
    "detail": "Mainan Balok, Puzzle, Mainan Slime & Squishy",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Perlengkapan Ibu Hamil",
    "detail": "Penyangga Perut, Bantal Ibu Hamil, Perlengkapan Ibu Hamil Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Perlengkapan Makan Bayi",
    "detail": "Pompa ASI & Aksesoris, Breast Pad, Shell, & Shield, Apron Menyusui, Kantong ASI, Perlengkapan Menyusui Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Perlengkapan Travelling Bayi",
    "detail": "Gendongan Bayi, Stroller & Perlengkapan Travelling, Aksesoris Stroller, Dudukan Mobil & Motor, Aksesoris Dudukan Mobil & Motor, Tas Perlengkapan Bayi, Sabuk Pengaman Anak, Perlengkapan Travelling Bayi Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Popok & Pispot",
    "detail": "Perlak, Pispot, Popok Sekali Pakai, Popok Kain & Aksesoris, Popok & Pispot Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Kamar Bayi",
    "detail": "Boks & Matras Tidur Bayi, Ayunan Bayi, Baby Walker, Selimut & Bedong, Bantal & Guling, Sprei, Tempat Penyimpanan, Kamar Bayi Lainnya, Matras & Sprei Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Kesehatan Bayi",
    "detail": "Perawatan Hidung & Pernafasan, Baby Lotion & Cream, Minyak, Bedak, Perawatan Mulut Bayi, Sun Care Bayi, Kesehatan Bayi Lainnya, Perawatan Kulit Bayi Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Mainan & Playmat Bayi, Pagar Mainan Bayi, Mainan Saat Mandi, Crib Mobile & Rattle, Gigitan Bayi, Boneka & Aksesoris, Rumah Boneka & Aksesoris, Mainan Boneka, Mainan Peran, Kendaraan Mainan, Sepeda, Skuter, & Ride-On, Tenda Mainan, Terowongan Mainan, & Ball Pit, Kolam, Pelampung, & Mainan Pasir, Mainan Olahraga, Mainan Terbang, Layang-layang, & Kincir Angin, Pistol Mainan, Mainan Matematika, Mainan Ilmu Pengetahuan Alam & Teknologi, Shape Sorter, Mainan Musik, Mainan Tablet & Komputer, Seni & Kerajinan, Kartu Edukasi Anak, Poster Edukatif, Mainan Robot, Mainan Lainnya, Mainan Bayi & Anak Lainnya, Mainan Outdoor Lainnya, Mainan Edukatif Lainnya, Boneka & Mainan Boneka Lainnya",
    "detail": "Mainan & Playmat Bayi, Pagar Mainan Bayi, Mainan Saat Mandi, Crib Mobile & Rattle, Gigitan Bayi, Boneka & Aksesoris, Rumah Boneka & Aksesoris, Mainan Boneka, Mainan Peran, Kendaraan Mainan, Sepeda, Skuter, & Ride-On, Tenda Mainan, Terowongan Mainan, & Ball Pit, Kolam, Pelampung, & Mainan Pasir, Mainan Olahraga, Mainan Terbang, Layang-layang, & Kincir Angin, Pistol Mainan, Mainan Matematika, Mainan Ilmu Pengetahuan Alam & Teknologi, Shape Sorter, Mainan Musik, Mainan Tablet & Komputer, Seni & Kerajinan, Kartu Edukasi Anak, Poster Edukatif, Mainan Robot, Mainan Lainnya, Mainan Bayi & Anak Lainnya, Mainan Outdoor Lainnya, Mainan Edukatif Lainnya, Boneka & Mainan Boneka Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Perlengkapan Mandi",
    "detail": "Perawatan Rambut & Sabun Mandi, Parfum Bayi, Tisu, Detergen Pakaian Bayi, Bak Mandi & Dudukan, Jas Mandi, Handuk, & Lap Mandi, Penutup Rambut, Alat & Aksesoris Mandi, Alat Perawatan Bayi, Perlengkapan Mandi Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Set & Paket Hadiah",
    "detail": "Set & Paket Hadiah",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Susu Formula & Makanan Bayi",
    "detail": "Susu Formula, Bubur & Sereal Bayi, Camilan Bayi, Susu Formula & Makanan Bayi Lainnya",
    "rate": 0.0675
  },
  {
    "group": "",
    "name": "Ibu & Bayi Lainnya",
    "detail": "Ibu & Bayi Lainnya",
    "rate": 0.0825
  },
  {
    "group": "Kesehatan",
    "name": "Perawatan Diri",
    "detail": "Hand Sanitizer",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Obat-obatan & Alat Kesehatan",
    "detail": "Obat Bebas (OTC), Obat Tradisional, Timbangan & Alat Ukur Kadar Lemak, Stetoskop, Obat Pereda Nyeri, Alat Laboratorium, Sarung Tangan & Masker Medis, Alat Medis Lainnya, Plester & Perban, Alat P3K, Salep & Krim, Antiseptik & Disinfektan, P3K Lainnya, Obat Resep",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Kesehatan Seksual",
    "detail": "Kondom, Pelumas, Penunjang Performa, Kesehatan Seksual Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Suplemen Makanan",
    "detail": "Diet & Detoks, Suplemen Kecantikan, Kebugaran, Kesejahteraan, Suplemen Makanan Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Kesehatan Lainnya",
    "detail": "Kesehatan Lainnya",
    "rate": 0.09
  },
  {
    "group": "Makanan & Minuman",
    "name": "Makanan Ringan",
    "detail": "Biskuit, Kue, & Wafer, Keripik & Kerupuk, Biji-bijian, Popcorn, Rumput Laut, Kacang, Puding, Jeli, & Marshmallow, Dendeng, Buah Kering, Snack Seafood, Makanan Ringan Kering Lainnya, Abon, Makanan Ringan Lainnya",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Permen, Cokelat",
    "detail": "Permen, Cokelat",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Buah Kaleng, Daging Kaleng, Seafood Kaleng, Sayur Kaleng, Sup Kaleng, Makanan Kaleng Lainnya",
    "detail": "Buah Kaleng, Daging Kaleng, Seafood Kaleng, Sayur Kaleng, Sup Kaleng, Makanan Kaleng Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Minuman",
    "detail": "Kopi, Teh, Minuman Cokelat, Minuman Energi & Isotonik, Air Mineral, Jus & Sirup, Cordial & Sirup, Minuman Bersoda, Minuman Bubuk Instan, Minuman Pencuci Mulut, Minuman Tradisional & Herbal, Topping Minuman, Susu Non-Dairy, Minuman Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Minuman Alkohol",
    "detail": "Bir & Cider, Wine & Champagne, Liquor & Spirits, Sake, Soju, & Umeshu, Minuman Alkohol Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Set Hadiah & Hampers",
    "detail": "Set Hadiah & Hampers",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Makanan Instan",
    "detail": "Makanan Siap Saji, Nasi & Bubur Instan, Hotpot Instan, Mie & Pasta Instan, Makanan Instan Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Roti & Kue",
    "detail": "Roti, Kue & Pie, Pastry, Roti & Kue Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Susu & Olahan",
    "detail": "Susu Segar, Susu UHT, Susu Kental Manis & Evaporasi, Susu Bubuk, Yoghurt, Krimer, Mentega & Margarin, Keju, Tahu, Susu & Olahan Lainnya, Susu Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Bahan Baking",
    "detail": "Tepung Premix Instan, Tepung, Penyedap Kue, Baking Powder & Soda Kue, Bahan Baking Lainnya, Pewarna Makanan, Bahan Dekorasi Kue",
    "rate": 0.0675
  },
  {
    "group": "",
    "name": "Biji-bijian & Kacang-kacangan, Seafood Kering, Makanan Herbal & Tradisional, Mie, Beras, Pasta, Acar Sayuran, Makanan Kering Lainnya, Bahan Pokok Lainnya",
    "detail": "Biji-bijian & Kacang-kacangan, Seafood Kering, Makanan Herbal & Tradisional, Mie, Beras, Pasta, Acar Sayuran, Makanan Kering Lainnya, Bahan Pokok Lainnya",
    "rate": 0.0675
  },
  {
    "group": "",
    "name": "Kebutuhan Memasak",
    "detail": "Minyak, Lada, Garam, Rempah-rempah, Kecap & Saus Lainnya, Dressing, Saus Cabai & Sambal, Cuka, Anggur Masak, Gula, Pemanis, Penambah Rasa, Tepung Bumbu, Bumbu Masak Lainnya, Kebutuhan Memasak Lainnya, Kaldu, Saus, & Sup Instan, Bumbu Masak Instan",
    "rate": 0.0675
  },
  {
    "group": "",
    "name": "Makanan Segar & Beku",
    "detail": "Daging Sapi, Daging Ayam, Daging Babi, Daging Kambing, Ikan, Udang, Kepiting, Daging Vegetarian, Kol & Kubis, Rempah Segar, Sayuran Daun, Terong & Labu, Brokoli & Kembang Kol, Cabai & Paprika, Bawang & Jahe, Kacang-kacangan & Jagung, Umbi-umbian & Sayuran Batang, Kecambah, Sayuran Salad, Sayur Potong & Paket Aneka Sayur, Sayuran Lainnya, Apel & Pir, Pisang, Buah Beri, Jeruk, Lemon & Limau, Anggur, Melon & Semangka, Buah Berbiji Tengah (Alpukat, Kurma, Ceri, dll), Buah Tropis & Eksotis, Buah Potong & Paket Aneka Buah, Buah Lainnya, Jamur, Makanan Beku Olahan, Daging & Seafood Beku, Daging Lainnya, Makanan Segar & Beku Lainnya, Seafood Lainnya",
    "rate": 0.0675
  },
  {
    "group": "",
    "name": "Menu Sarapan",
    "detail": "Madu & Olesan, Selai & Olesan, Sereal, Granola, & Oat, Bar Sereal, Menu Sarapan Lainnya",
    "rate": 0.0675
  },
  {
    "group": "",
    "name": "Es Krim",
    "detail": "Es Krim",
    "rate": 0.0675
  },
  {
    "group": "",
    "name": "Telur",
    "detail": "Telur",
    "rate": 0.065
  },
  {
    "group": "",
    "name": "Makanan & Minuman Lainnya",
    "detail": "Makanan & Minuman Lainnya",
    "rate": 0.095
  },
  {
    "group": "Perawatan & Kecantikan",
    "name": "Alat Kecantikan",
    "detail": "Aksesoris Make Up Lainnya, Kapas, Tas Make Up, Kaca / Cermin, Pembersih Make Up Brush, Make Up Brush, Make Up Sponge & Applicator, Penjepit Bulu Mata, Eyebrow Template, Bulu Mata Palsu, Skot Mata, Rautan, Facial Steamer, Alat Pelangsing & Pijat Wajah, Alat Pembersih Wajah, Alat Perawatan Wajah Lainnya, Alat Pelangsing Tubuh, Alat Penghilang Bulu Rambut, Sisir, Hair Dryer, Peralatan Styling Rambut, Alat Styling Heatless, Alat Rambut Lainnya, Alat Kecantikan Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Kosmetik",
    "detail": "Make Up Base & Primer, Foundation, BB & CC Cream, Bedak, Concealer & Corrector, Bronzer, Contour & Highlighter, Setting & Finishing Spray, Blush, Kosmetik Wajah Lainnya, Eyeshadow, Primer Mata, Eyeliner, Maskara, Eyebrow, Kosmetik Mata Lainnya, Lipstik, Lip Gloss, Lip Liner, Lip Tint, Lip Plumper, Kosmetik Bibir Lainnya, Pembersih Make Up, Kosmetik Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Paket & Set Kecantikan",
    "detail": "Paket & Set Kecantikan",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Parfum & Wewangian",
    "detail": "Parfum & Wewangian",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Perawatan Pria",
    "detail": "Perawatan Tubuh, Pembersih Wajah, Pelembab & Treatment, Perawatan Setelah Bercukur, Cream, Foam & Gel, Pisau Cukur, Alat Cukur, Sikat Cukur, Trimmers, Gunting & Groomer Multi-fungsi, Aksesoris Cukur, Perawatan Rambut, Perawatan Pria Lainnya, Perawatan Wajah Lainnya, Shaving & Grooming Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Perawatan Rambut",
    "detail": "Shampo, Pewarna Rambut, Treatment Rambut, Kondisioner Rambut dan Kulit Kepala, Hair Styling, Perawatan Rambut Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Perawatan Tangan, Kaki & Kuku",
    "detail": "Masker Tangan, Lotion, Cream & Scrub, Sabun Cuci Tangan, Perawatan Tangan Lainnya, Deodoran Kaki, Masker Kaki, Lotion, Cream & Scrub, Perawatan Kaki Lainnya, Base & Top Coat, Cat Kuku, Pembersih Cat Kuku, Treatment Kuku, Kuku Palsu, Nail Art & Sticker, Alat & Mesin Manicure, Perawatan Kuku Lainnya, Perawatan Tangan, Kaki & Kuku Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Perawatan Tubuh",
    "detail": "Sabun Mandi, Scrub & Peel Tubuh, Masker Tubuh, Minyak Tubuh, Body Cream, Body Lotion & Body Butter, Deodoran, Minyak Pijat, Cream & Wax Penghilang Bulu Rambut, Sunscreen & Aftersun Tubuh, Tanning Oil & Self Tanners, Perawatan Payudara, Perawatan Tubuh Lainnya, Sun Care Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Perawatan Wajah",
    "detail": "Pembersih Wajah, Toner, Pelembab Wajah, Minyak Wajah, Facial Mist, Serum & Essence Wajah, Scrub & Peel Wajah, Masker Wajah, Sunscreen Wajah, Perawatan Wajah After Sun, Kertas Minyak, Treatment Jerawat, Perawatan Wajah Lainnya, Cream Mata, Masker Mata, Serum Alis & Bulu Mata, Treatment Mata Lainnya, Pelembab Bibir, Scrub & Exfoliator Bibir, Masker Bibir, Treatment Bibir Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Perawatan & Kecantikan Lainnya",
    "detail": "Perawatan & Kecantikan Lainnya",
    "rate": 0.0825
  },
  {
    "group": "Audio",
    "name": "Media Player",
    "detail": "MP3 & MP4 Player, CD, DVD, & Blu-ray Player, Voice Recorders, Radio & Pemutar Kaset, Media Player Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Amplifier & Mixer",
    "detail": "Amplifier & Mixer",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Kabel & Konverter Audio & Video",
    "detail": "Kabel & Konverter Audio & Video",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Mikrofon & Aksesoris",
    "detail": "Mikrofon & Aksesoris",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Perangkat Audio & Speaker",
    "detail": "Speaker, Home Theater & Karaoke, AV Receiver, Perangkat Audio & Speaker Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Earphone, Headphone, & Headset",
    "detail": "Earphone, Headphone, & Headset",
    "rate": 0.0675
  },
  {
    "group": "",
    "name": "Audio Lainnya",
    "detail": "Audio Lainnya",
    "rate": 0.09
  },
  {
    "group": "Elektronik",
    "name": "Kelistrikan",
    "detail": "Stop Kontak & Sambungan Kabel, Pengaman Stop Kontak, Penghemat Listrik, Bel, Saklar, Alarm, Anti Petir, Kelistrikan Lainnya",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Baterai",
    "detail": "Baterai",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Water Heater",
    "detail": "Water Heater",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Peralatan Listrik Kecil",
    "detail": "Foot Bath & Spa",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Pengering Sepatu, Penghangat Ruangan, Peralatan Listrik Besar Lainnya",
    "detail": "Pengering Sepatu, Penghangat Ruangan, Peralatan Listrik Besar Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Remot Kontrol",
    "detail": "Remot Kontrol",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Rokok Elektronik & Shisha",
    "detail": "Pods, Mods, & Hookah, Liquid & Perasa Rokok Elektronik/Shisha, Aksesoris Rokok Elektronik/Shisha, Perlengkapan Rokok Elektronik/Shisha, Rokok Elektronik Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Peralatan Listrik Besar",
    "detail": "Mesin Cuci, Pengering Pakaian, Mesin Cuci & Pengering Lainnya, AC, AC Portable, Kipas Angin, Pendingin Ruangan Lainnya",
    "rate": 0.065
  },
  {
    "group": "",
    "name": "Perangkat Dapur",
    "detail": "Dispenser & Filter Air, Kompor & Regulator Gas, Pemanas Air, Kulkas Wine, Juicer, Blender & Mesin Kacang Kedelai, Mesin Kopi & Aksesoris, Mixer, Dishwashers, Air Fryer, Deep Fryer, Microwave, Oven, Pemanggang Roti, Food Processor & Penggiling Daging, Alat Masak Serbaguna, Panci Presto, Slow Cooker & Mesin Sous Vide, Penanak Nasi, Pembuat Waffle & Crepe, Perebus Telur, Pembuat Roti, Pembuat Takoyaki, Pembuat Dessert, Pembuat Soda, Peralatan Masak Khusus Lainnya, Kulkas, Freezer, Penghisap Asap Dapur, Perangkat Dapur Lainnya",
    "rate": 0.065
  },
  {
    "group": "",
    "name": "TV & Aksesoris",
    "detail": "TV, Antena TV, TV Box & Receiver TV, Bracket TV, TV & Aksesoris Lainnya",
    "rate": 0.065
  },
  {
    "group": "",
    "name": "Proyektor & Aksesoris",
    "detail": "Proyektor & Layar Proyektor, Pointer, Proyektor & Aksesoris Lainnya",
    "rate": 0.0525
  },
  {
    "group": "",
    "name": "Elektronik Lainnya",
    "detail": "Elektronik Lainnya",
    "rate": 0.09
  },
  {
    "group": "Gaming & Konsol",
    "name": "Konsol Game",
    "detail": "Playstation, Xbox, Wii, Nintendo 3DS & DS, Gameboy, Switch, PS Vita, PSP, Konsol Game Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Video Game",
    "detail": "Playstation, Xbox, Wii, Nintendo 3DS & DS, Gameboy, Switch, PS Vita, PSP, Game PC, Video Game Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Aksesoris Konsol",
    "detail": "Aksesoris Konsol",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Gaming & Konsol Lainnya",
    "detail": "Gaming & Konsol Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Aksesoris",
    "detail": "Tongsis, Tomsis, Flash & Lampu Selfie Handphone, Aksesoris Selfie Lainnya, Lensa Tambahan Handphone, Lazypod, Phone Holder, Tali & Gantungan Handphone, Pouch Handphone, Aksesoris Lainnya, Casing, Penggulung, & Pengikat Kabel, Travel Adaptor, Kabel & Adaptor Handphone, Charger, Charger Docking, Kabel, Charger & Adaptor Lainnya, Casing & Skin Tablet, Casing & Skin Handphone, Pelindung Layar Handphone, Casing & Skin Lainnya, Casing & Skin Earphone",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Perangkat Wearable",
    "detail": "Perangkat VR",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Kartu Perdana",
    "detail": "Kartu Perdana",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Walkie Talkie",
    "detail": "Walkie Talkie",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Handphone",
    "detail": "Handphone",
    "rate": 0.0525
  },
  {
    "group": "",
    "name": "Tablet",
    "detail": "Tablet",
    "rate": 0.0525
  },
  {
    "group": "",
    "name": "Handphone & Aksesoris Lainnya",
    "detail": "Handphone & Aksesoris Lainnya",
    "rate": 0.1
  },
  {
    "group": "Kamera & Drone",
    "name": "Aksesoris Kamera",
    "detail": "Lighting & Perlengkapan Studio Foto, Roll Film & Kertas Foto, Printer Foto, Charger Baterai, Baterai & Battery Grip, Tripod, Monopod, & Aksesoris, Aksesoris Kamera Lainnya, Gimbal & Stabilizer",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Kamera Keamanan",
    "detail": "Kamera CCTV, DVR, Kamera Dummy, Kamera Pengintai, Kamera Keamanan Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Perawatan Kamera",
    "detail": "Dry Box & Cabinet, Cleaning Kit, Silica Gel, Blower, Lenspen & Brush, Perawatan Kamera Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Aksesoris Drone",
    "detail": "Aksesoris Drone",
    "rate": 0.065
  },
  {
    "group": "",
    "name": "Aksesoris Lensa",
    "detail": "Mount & Adaptor Lensa, Cap Lensa, Filter Lensa, Hood Lensa, Aksesoris Lensa Lainnya",
    "rate": 0.065
  },
  {
    "group": "",
    "name": "Drone",
    "detail": "Drone",
    "rate": 0.065
  },
  {
    "group": "",
    "name": "Kamera",
    "detail": "Kamera Pocket, Kamera Mirrorless, Kamera Action, Camcorder, Kamera Instan, Kamera Analog, DSLR, Kamera Lainnya",
    "rate": 0.065
  },
  {
    "group": "",
    "name": "Lensa",
    "detail": "Lensa",
    "rate": 0.065
  },
  {
    "group": "",
    "name": "Kamera & Drone Lainnya",
    "detail": "Kamera & Drone Lainnya",
    "rate": 0.095
  },
  {
    "group": "Komputer & Aksesoris",
    "name": "Aksesoris Desktop & Laptop",
    "detail": "USB HUB & Card Reader, Webcam, Pelindung Laptop & Skin Laptop, Cooling Pad, Meja & Stand Laptop, Pelindung Keyboard & Trackpad, Baterai Laptop, Charger & Adaptor Laptop, Perangkat Video Conference, Aksesoris Desktop & Laptop Lainnya, Mouse Pad",
    "rate": 0.0675
  },
  {
    "group": "",
    "name": "Keyboard & Mouse",
    "detail": "Mouse, Keyboard, Drawing Tablet, Keyboard & Mouse Lainnya",
    "rate": 0.0675
  },
  {
    "group": "",
    "name": "Komponen Network",
    "detail": "Modem & Router Wireless, Repeater, Wireless Adapter & Kartu Network, Powerline Adapter, Switch Internet & PoE, Kabel Network & Konektor, KVM Switch, Print Server, Komponen Network Lainnya",
    "rate": 0.0675
  },
  {
    "group": "",
    "name": "Software",
    "detail": "Software",
    "rate": 0.0675
  },
  {
    "group": "",
    "name": "Komponen Desktop & Laptop",
    "detail": "Sound Card",
    "rate": 0.065
  },
  {
    "group": "",
    "name": "Desktop",
    "detail": "PC Desktop, PC Mini, Server PC, All-in-One Desktop, Desktop Lainnya",
    "rate": 0.0525
  },
  {
    "group": "",
    "name": "Laptop",
    "detail": "Laptop",
    "rate": 0.0525
  },
  {
    "group": "",
    "name": "Monitor",
    "detail": "Monitor",
    "rate": 0.0525
  },
  {
    "group": "",
    "name": "Penyimpanan Data",
    "detail": "SSD, Hard Disk, Network Attached Storage (NAS), Flashdisk & Flashdisk OTG, Casing Hard Disk & Docking, Compact Disc (CD), Penyimpanan Data Lainnya",
    "rate": 0.0525
  },
  {
    "group": "",
    "name": "Peralatan Kantor",
    "detail": "Mesin Ketik, Mesin Absensi, Penghancur Kertas, Penghitung Uang, Peralatan Kantor Lainnya",
    "rate": 0.0525
  },
  {
    "group": "",
    "name": "Printer & Scanner",
    "detail": "Printer, Scanner & Mesin Fotokopi, Printer Thermal & Barcode, Tinta Printer, 3D Printer, Printer & Scanner Lainnya",
    "rate": 0.0525
  },
  {
    "group": "",
    "name": "Komputer & Aksesoris Lainnya",
    "detail": "Komputer & Aksesoris Lainnya",
    "rate": 0.0675
  },
  {
    "group": "Buku & Alat Tulis",
    "name": "Perlengkapan Menggambar",
    "detail": "Pensil Warna, Krayon & Pastel, Cat Air & Cat Poster, Cat Minyak, Cat Akrilik, Kuas Lukis, Palet Lukis, Kanvas Lukis & Easel, Buku Gambar & Sketsa, Perlengkapan Menggambar Lainnya",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Pembungkus Kado & Kemasan",
    "detail": "Bubble Wrap",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Perlengkapan Sekolah & Kantor",
    "detail": "Kalkulator, Pisau Ukir & Cutter, Tali & Selotip, Lem, Printer Label, Lanyard & Name Tag, Klip Kertas, Push Pin, & Paku Payung, Pembolong Kertas, Gunting, Stempel & Bak Stempel, Stapler & Staples, Kalender, Folder, Organizer Kertas, & Aksesoris",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Alat Tulis",
    "detail": "Pulpen & Tinta, Pensil, Penghapus & Tipe X, Spidol, Highlighter, Alat Tulis Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Buku Tulis & Kertas",
    "detail": "Pembatas Buku, Sampul Buku, Kertas Termal & Continuous Paper, Kertas Print & Fotocopy, Kertas Binder, Memo & Sticky Notes, Art Paper & Art Board, Notebook & Notepad, Label & Stiker, Buku Tulis & Kertas Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Surat-Menyurat",
    "detail": "Amplop & Angpau, Kartu Pos, Materai & Perangko, Surat-Menyurat Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Buku & Alat Tulis Lainnya",
    "detail": "Buku & Alat Tulis Lainnya",
    "rate": 0.1
  },
  {
    "group": "Buku & Majalah",
    "name": "Majalah & Koran",
    "detail": "Bisnis, Gaya Hidup, Remaja, Majalah & Koran Lainnya",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Buku Bacaan",
    "detail": "Komik, Buku Audio, Buku Bacaan Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "E-Book",
    "detail": "E-Book",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Buku & Majalah Lainnya",
    "detail": "Buku & Majalah Lainnya",
    "rate": 0.095
  },
  {
    "group": "Hewan Peliharaan",
    "name": "Aksesoris Hewan Peliharaan",
    "detail": "Mangkuk & Feeder, Perlengkapan Travelling, Kalung, Tali, Harness & Brangus, Stick & Chaser, Chew, Tulang & Bola, Frisbee, Mainan Anjing & Kucing Lainnya, Mainan Hewan Peliharaan Kecil, Mainan Burung, Mainan Lainnya, Tempat Tidur & Matras, Rumah, Habitat & Aksesoris, Kandang & Crate, Scratching Pad & Post, Kebutuhan Akuarium, Furniture Hewan Lainnya, Aksesoris Hewan Peliharaan Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Grooming Hewan",
    "detail": "Perawatan Rambut, Perawatan Mulut, Perawatan Kuku, Grooming Hewan Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Litter & Toilet",
    "detail": "Litter Box Kucing, Tempat Tidur & Litter Hewan Peliharaan Kecil, Popok, Training Pad & Tray Anjing, Plastik & Sekop Kotoran, Litter & Toilet Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Makanan Hewan",
    "detail": "Makanan Anjing, Cemilan Anjing, Makanan Kucing, Snack Kucing, Makanan Hewan Peliharaan Kecil, Snack Hewan Peliharaan Kecil, Makanan Hewan Air, Pakan Burung, Makanan Reptil, Makanan Hewan Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Pakaian & Aksesoris Hewan",
    "detail": "Pakaian Hewan, Perlengkapan Hujan, Sepatu Boot, Kaos Kaki & Pelindung Kaki Hewan, Aksesoris Leher, Kacamata, Aksesoris Rambut, Topi, Pakaian & Aksesoris Hewan Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Perawatan Kesehatan Hewan",
    "detail": "Anti Kutu, Obat, Perawatan Kesehatan Hewan Lainnya, Vitamin & Suplemen",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Hewan Peliharaan Lainnya",
    "detail": "Hewan Peliharaan Lainnya",
    "rate": 0.095
  },
  {
    "group": "Hobi & Koleksi",
    "name": "Alat & Aksesoris Musik",
    "detail": "Keyboard & Piano, Alat Musik Perkusi, Alat Musik Tiup, Ukulele, Gitar & Gitar Bass, Aksesoris Musik, Alat & Aksesoris Musik Lainnnya, Alat Musik Petik Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Album Foto",
    "detail": "Album Foto",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "CD, DVD & Bluray",
    "detail": "CD, DVD & Bluray",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Koleksi",
    "detail": "Action Figure, Patung, Mecha Model & Diecast, Vehicle Model & Diecast, Batu Akik & Alam, Koleksi Penggemar, Koleksi Olahraga, Koleksi Anime & Manga, Koin & Uang Kertas, Koleksi Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Mainan & Games",
    "detail": "Dadu, Board Game & Mainan Kartu, Mainan Sulap, Mainan Prank, Kubus Rubik, Gangsing, Kendama, Yo-yo, Mainan & Aksesoris Remote Control, Mainan Kapsul, Mainan & Games Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Perlengkapan Menjahit",
    "detail": "Perlengkapan Menjahit",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Piringan Hitam",
    "detail": "Piringan Hitam",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Souvenir & Hadiah",
    "detail": "Kipas Tangan, Gantungan Kunci, Celengan, Magnet Kulkas, Souvenir Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Hobi & Koleksi Lainnya",
    "detail": "Hobi & Koleksi Lainnya",
    "rate": 0.095
  },
  {
    "group": "Mobil",
    "name": "Suku Cadang Mobil",
    "detail": "Bodi, Rangka, & Bemper Mobil, Wiper & Penyemprot Wiper Mobil, Knalpot Mobil, Roda, Velg, & Aksesoris, Ban Mobil & Aksesoris, Shock, Strutbar, & Suspensi Mobil, Radiator & Sistem Pendingin Mobil, Rantai, Transmisi, & Kopling, Bearing Roda & Seal Mobil, Piston Mobil, Filter Udara, Filter Oli, Sistem Pengereman Mobil, Fan Belt, Selang, & Pulley Mobil, Kumparan Pengapian, Busi, Aki & Aksesoris, Lampu Mobil, Sistem Bahan Bakar, Suku Cadang Mobil Lainnya, Suku Cadang Mesin Lainnya, Kelistrikan Lainnya, Pengapian Lainnya",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Oli & Pelumas Kendaraan",
    "detail": "Oli, Aditif & Penghemat Bahan Bakar, Gemuk & Pelumas, Coolant, Pelumas Rem, Pelumas Transmisi, Perawatan Kendaraan Lainnya, Cairan Otomotif Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Aksesoris Eksterior Mobil",
    "detail": "Hiasan Mobil, Antena Mobil, Sarung Mobil, Stiker, Logo, & Emblem Mobil, Karpet Lumpur, Sill Plate Mobil, Talang Air, Klakson & Aksesoris, Spion & Aksesoris, Aksesoris Plat Nomor Mobil, Aksesoris Eksterior Mobil Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Aksesoris Interior Mobil",
    "detail": "Navigasi & AV Receiver, Amplifier, Speaker, & Subwoofer, Organizer & Kompartemen Mobil, Parfum Mobil, Karpet Mobil, Penyangga Leher & Punggung, Matras Mobil, Setir & Sarung Setir Mobil, Jok & Sarung Jok Mobil, Holder Handphone, Pengisi Daya USB & Bluetooth Transmitter, Pedal & Stik Persneling, Sunshield & Pelindung Dashboard, Kunci Stir, Kamera Parkir, HUD, Speedometer, & Gauge, Aksesoris Interior Mobil Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Gantungan & Sarung Kunci Kendaraan",
    "detail": "Gantungan & Sarung Kunci Kendaraan",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Perawatan Kendaraan",
    "detail": "Sabun Cuci & Wax, Pembersih Kaca & Anti-Air, Perawatan Interior, Perawatan Ban & Velg, Poles, Coating, & Sealant Mobil, Perawatan Kendaraan Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Perkakas & Perlengkapan Kendaraan",
    "detail": "Peralatan Uji, Diagnosa, & Servis, Pengukur Tekanan Udara Ban, Perkakas & Perlengkapan Kendaraan Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Mobil",
    "detail": "Mobil",
    "rate": 0.025
  },
  {
    "group": "",
    "name": "Mobil Lainnya",
    "detail": "Mobil Lainnya",
    "rate": 0.0825
  },
  {
    "group": "Olahraga & Outdoor",
    "name": "Aksesoris Olahraga & Aktivitas Outdoor",
    "detail": "Payung, Pelindung Mulut & Sport Tape, Stopwatch & Pedometer, Tas Sepatu, Gelang Olahraga, Ikat Kepala Olahraga, Topi Olahraga & Aktivitas Outdoor, Tas Anti Air, Alat Training, Alat Pelindung Gym, Aksesoris Olahraga & Aktivitas Outdoor Lainnya",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Sepeda, Komponen & Aksesoris Sepeda, Helm Sepeda, Bersepeda Lainnya, Alat Masak Camping, Lampu & Senter Camping, Aksesoris Tenda, Sleeping Bag, Teropong, Monokuler, & Teleskop, Kompas, Pisau Camping & Peralatan Survival, Tempat Tidur Gantung, Tongkat Hiking, Matras & Keranjang Piknik, Camping & Hiking Lainnya, Panjat Tebing, Busur Panah, Anak Panah, Panahan Lainnya, Bola Kaki, Sarung Tangan & Deker, Tiang Gawang & Net, Sepak Bola, Futsal, & Sepak Takraw Lainnya, Bola Basket, Ring Basket, Basket Lainnya, Bola Voli, Net Voli, Voli Lainnya, Raket Bulu Tangkis, Kok Bulu Tangkis, Net Bulu Tangkis, Bulu Tangkis Lainnya, Raket Tenis, Bola Tenis, Net Tenis, Tenis Lainnya, Bola Tenis Meja, Bet Tenis Meja, Net Tenis Meja, Tenis Meja Lainnya, Samsak & Bantalan Tinju, Sabuk Bela Diri, Sarung Tangan, Hand Wrap, & Helm, Tinju & Bela Diri Lainnya, Bola Golf, Stik Golf, Alat Pelindung & Training, Tas Golf, Golf Lainnya, Baseball & Softball, Squash, Rugbi, Billiard, Selancar & Wakeboard, Ice Skating & Olahraga Musim Dingin, Topi Renang, Kacamata Renang, Papan Pelampung, Senter Diving, Masker Diving, Kaki Katak, Jaket Pelampung, Diving & Renang Lainnya, Boating, Matras Yoga, Balok, Ring, & Foam Roller Yoga, Resistance Band, Yoga & Pilates Lainnya, Latihan Beban, Tali Skipping, Bola Gym, Alat Fitness, Ab Roller, Pull Up & Push Up Bar, Fitness Lainnya, Dart, Alat Rekreasi Olahraga & Aktivitas Outdoor Lainnya, Kail Pancing, Joran & Gulungan Pancing, Alat Pelacak Ikan, Senar Pancing, Umpan Pancing, Tas Pancing, Jaring Ikan, Alat Pancing Lainnya, Skateboard & Sepatu Roda, Skuter & Sepeda Roda Satu, Segway & Hoverboard, Helm & Alat Pelindung, Boardsport Lainnya, Piringan Pemutar Pinggang, Alat Olahraga Otot Tangan",
    "detail": "Sepeda, Komponen & Aksesoris Sepeda, Helm Sepeda, Bersepeda Lainnya, Alat Masak Camping, Lampu & Senter Camping, Aksesoris Tenda, Sleeping Bag, Teropong, Monokuler, & Teleskop, Kompas, Pisau Camping & Peralatan Survival, Tempat Tidur Gantung, Tongkat Hiking, Matras & Keranjang Piknik, Camping & Hiking Lainnya, Panjat Tebing, Busur Panah, Anak Panah, Panahan Lainnya, Bola Kaki, Sarung Tangan & Deker, Tiang Gawang & Net, Sepak Bola, Futsal, & Sepak Takraw Lainnya, Bola Basket, Ring Basket, Basket Lainnya, Bola Voli, Net Voli, Voli Lainnya, Raket Bulu Tangkis, Kok Bulu Tangkis, Net Bulu Tangkis, Bulu Tangkis Lainnya, Raket Tenis, Bola Tenis, Net Tenis, Tenis Lainnya, Bola Tenis Meja, Bet Tenis Meja, Net Tenis Meja, Tenis Meja Lainnya, Samsak & Bantalan Tinju, Sabuk Bela Diri, Sarung Tangan, Hand Wrap, & Helm, Tinju & Bela Diri Lainnya, Bola Golf, Stik Golf, Alat Pelindung & Training, Tas Golf, Golf Lainnya, Baseball & Softball, Squash, Rugbi, Billiard, Selancar & Wakeboard, Ice Skating & Olahraga Musim Dingin, Topi Renang, Kacamata Renang, Papan Pelampung, Senter Diving, Masker Diving, Kaki Katak, Jaket Pelampung, Diving & Renang Lainnya, Boating, Matras Yoga, Balok, Ring, & Foam Roller Yoga, Resistance Band, Yoga & Pilates Lainnya, Latihan Beban, Tali Skipping, Bola Gym, Alat Fitness, Ab Roller, Pull Up & Push Up Bar, Fitness Lainnya, Dart, Alat Rekreasi Olahraga & Aktivitas Outdoor Lainnya, Kail Pancing, Joran & Gulungan Pancing, Alat Pelacak Ikan, Senar Pancing, Umpan Pancing, Tas Pancing, Jaring Ikan, Alat Pancing Lainnya, Skateboard & Sepatu Roda, Skuter & Sepeda Roda Satu, Segway & Hoverboard, Helm & Alat Pelindung, Boardsport Lainnya, Piringan Pemutar Pinggang, Alat Olahraga Otot Tangan",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Olahraga & Outdoor Lainnya",
    "detail": "Olahraga & Outdoor Lainnya",
    "rate": 0.1
  },
  {
    "group": "Perlengkapan Rumah",
    "name": "Alat Pengaman",
    "detail": "Brankas, Pemadam Api, Perangkat Pintu & Gembok, Alat Pengaman Lainnya",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Alat Pertukangan & Renovasi Rumah",
    "detail": "Perekat & Tape, Sarung Tangan, Kacamata, & Masker Pelindung, Bak Cuci Piring & Kran Air, Atap & Lantai, Cat & Pelapis Dinding, Pompa Air & Aksesoris, Pompa Udara & Aksesoris, Tangga, Troli, Tenda & Terpal, Material Konstruksi, Pintu & Jendela, Alat Pemeliharaan Rumah Lainnya, Tool Box, Kunci Set, Palu, Tang, Paku, Sekrup, & Fastener, Amplas, Mesin Amplas, & Aksesoris, Meteran, Meteran Jalan, Bor, Obeng & Aksesoris, Gergaji, Mesin Pemotong, & Gerinda, Pressure Washer, Power Generator, Electrical Tester & Multimeter, Pengukur Jarak, Kompresor Udara, Perlengkapan Las, Blower, Perkakas Lainnya",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Dekorasi",
    "detail": "Tirai & Tirai Gulung, Bingkai Foto & Pajangan Dinding, Wallpaper & Stiker Dinding, Jam Dinding, Keset, Karpet & Tikar, Vas & Bejana, Lilin & Tempat Lilin, Cermin, Taplak Meja, Dekorasi Lainnya, Furniture & Pelindung Furniture",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Furniture",
    "detail": "Bantal Sofa, Penahan Pintu, Rangka & Sandaran Tempat Tidur, Lemari Pakaian, Sofa, Lemari & Kabinet, Rak & Rak Gantung, Meja & Meja Tulis, Furniture Lainnya",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Kamar Mandi",
    "detail": "Kloset & Alas Dudukan Kloset, Tempat Sikat Gigi & Dispenser Odol, Dispenser, Tempat, & Kotak Sabun, Rak & Kabinet Kamar Mandi, Bak Mandi & Bathtub, Handuk Mandi, Handuk Wajah & Lap Tangan, Handuk Kimono, Handuk Mandi & Kimono Lainnya, Kepala Shower & Spray Bidet, Sikat & Spons Badan, Tirai Shower, Tempat Duduk Mandi & Pispot, Pegangan Kamar Mandi, Shower Cap, Kamar Mandi Lainnya",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Kamar Tidur",
    "detail": "Matras Pendingin, Pelindung Matras, Selimut, Bantal, Sprei, Sarung Bantal, & Sarung Guling, Matras, Kelambu, Guling, Kamar Tidur Lainnya",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Organizer Rumah",
    "detail": "Gantungan, Box, Tas, & Keranjang Penyimpanan, Box Penyimpanan Sepatu, Pengait, Tas & Keranjang Laundry, Organizer Meja, Organizer Lemari Pakaian, Organizer Perhiasan, Tempat Tisu, Organizer Rumah Lainnya",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Penghangat Tangan & Kantong Kompres",
    "detail": "Penghangat Tangan & Kantong Kompres",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Pengharum Ruangan & Aromaterapi",
    "detail": "Diffuser, Humidifier, & Oil Burner, Pengharum Ruangan & Aromaterapi Lainnya",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Peralatan Makan",
    "detail": "Jug, Pitcher, & Aksesoris, Kantong & Set Teh, Cangkir, Mug, & Gelas, Botol Minum & Aksesoris, Mangkuk, Piring, Alat Makan, Sedotan, Tudung Saji & Penutup Makanan, Tatakan Piring & Gelas, Peralatan Makan Lainnya",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Tali Jemuran & Rak Pengering, Sikat Pembersih, Sapu, Kemoceng, Kain Pel, Basin, Ember, & Gayung Air, Spons & Scouring Pad, Tempat Sampah, Kantong Plastik & Kantong Sampah, Lap",
    "detail": "Tali Jemuran & Rak Pengering, Sikat Pembersih, Sapu, Kemoceng, Kain Pel, Basin, Ember, & Gayung Air, Spons & Scouring Pad, Tempat Sampah, Kantong Plastik & Kantong Sampah, Lap",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Perlengkapan Dapur",
    "detail": "Tempat Penyimpanan Makanan, Cling Wrap, Aluminium Foil, Peralatan Teh, Kopi, & Bartending, Rak Dapur, Celemek & Pelindung Tangan, Pembuka Tutup Kaleng & Botol, Korek Api & Pemantik, Timbangan Dapur, Perlengkapan Dapur Lainnya, Alat & Aksesoris Pemanggang, Alat & Dekorasi Baking, Penggorengan, Panci, Spatula & Capitan, Talenan, Pengocok Telur, Gelas & Sendok Takar, Saringan, Parutan & Peeler, Pisau & Gunting Dapur",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Perlengkapan Keagamaan",
    "detail": "Perlengkapan Keagamaan",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Taman",
    "detail": "Tanaman, Dekorasi Taman, Tanah & Media Tanam, Pupuk, Bibit & Umbi, Pot & Planter, Sistem Pengairan, Peralatan Berkebun, Taman Lainnya, Mesin Pemotong Rumput",
    "rate": 0.1
  },
  {
    "group": "",
    "name": "Lampu",
    "detail": "Lampu",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Perawatan Rumah",
    "detail": "Pembasmi Hama & Gulma, Tisu & Tisu Kertas, Tisu Toilet, Pembersih, Pengharum Pakaian, Conditioner & Pelembut Pakaian, Detergen, Perawatan Rumah Lainnya, Perawatan Pakaian Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Perlengkapan Pesta",
    "detail": "Balon, Wooden Clip, Backdrop & Spanduk, Kartu Ucapan, Peralatan Makan Sekali Pakai, Topi & Topeng Pesta, Selempang/Sash, Perlengkapan Pesta Lainnya",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "Perlengkapan Rumah Lainnya",
    "detail": "Perlengkapan Rumah Lainnya",
    "rate": 0.1
  },
  {
    "group": "Sepeda Motor",
    "name": "Aksesoris Sepeda Motor",
    "detail": "Karpet Motor, Speedometer, Odometer, & Gauge Motor, Sarung Motor, Stiker, Logo, & Emblem, Jok & Sarung Jok Motor, Spion Motor & Aksesoris, Kunci & Keamanan, Box Motor, Dudukan Handphone, Karpet Lumpur, Aksesoris Sepeda Motor Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Helm & Aksesoris Pengendara Motor",
    "detail": "Helm & Aksesoris Pengendara Motor",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Suku Cadang Motor",
    "detail": "Radiator, Piston, CDI & ECU, Busi, Kumparan Pengapian, V-Belt, Filter Udara, Sistem Bahan Bakar, Sistem Pengereman, Shock, Strut, & Suspensi Motor, Rantai & Gir, Kopling, Bearing, Aki & Aksesoris, Klakson & Aksesoris, Kabel & Selang, Bodi & Rangka Motor, Knalpot Motor, Roda, Velg, & Aksesoris, Ban Motor & Aksesoris, Lampu Motor, Suku Cadang Motor Lainnya, Pengapian & Suku Cadang Mesin Lainnya, Rantai, Transmisi, & Kopling Lainnya",
    "rate": 0.0825
  },
  {
    "group": "",
    "name": "Sepeda Motor",
    "detail": "Sepeda Motor",
    "rate": 0.025
  },
  {
    "group": "",
    "name": "Sepeda Motor Lainnya",
    "detail": "Sepeda Motor Lainnya",
    "rate": 0.0825
  },
  {
    "group": "Tiket, Voucher, & Layanan",
    "name": "Belanja",
    "detail": "Ritel",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Layanan",
    "detail": "Layanan",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Listrik, Gas, & Air",
    "detail": "Listrik, Gas, & Air",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Makanan & Minuman",
    "detail": "Dine-in & Takeaway",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Shopee",
    "detail": "Shopee Official, Saldo Iklan Shopee",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Streaming",
    "detail": "Streaming",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Telco",
    "detail": "Data, Pulsa",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Tiket Event",
    "detail": "Hiburan, Acara, Pameran, & Konferensi, Konser & Pertunjukan",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Travel & Tour",
    "detail": "Voucher Hotel, Penerbangan, Paket Tour",
    "rate": 0.095
  },
  {
    "group": "",
    "name": "Gaming",
    "detail": "Gaming",
    "rate": 0.09
  },
  {
    "group": "",
    "name": "E-Money",
    "detail": "E-Money",
    "rate": 0.0825
  }
] satisfies ShopeeAdminCategory[];

export const shopeePreOrderOptions = [
  {
    "name": "Tidak Ikut",
    "rate": 0
  },
  {
    "name": "Produk Pre-Order",
    "rate": 0.03
  }
] satisfies FeeOption[];

export const shopeePromoOptions = [
  {
    "name": "Tidak Ikut",
    "rate": 0
  },
  {
    "name": "Sebelum 11 Sept",
    "rate": 0.02
  },
  {
    "name": "Setelah 11 Sept",
    "rate": 0.045
  },
  {
    "name": "Promo Xtra+",
    "rate": 0.065
  }
] satisfies FeeOption[];

export const shopeeFreeShippingOptions = [
  {
    "name": "Tidak Ikut (0%)",
    "rate": 0,
    "cap": 0
  },
  {
    "name": "Ukuran Biasa - A",
    "rate": 0.01,
    "cap": 40000
  },
  {
    "name": "Ukuran Biasa - B",
    "rate": 0.02,
    "cap": 40000
  },
  {
    "name": "Ukuran Biasa - C",
    "rate": 0.035,
    "cap": 40000
  },
  {
    "name": "Ukuran Biasa - D",
    "rate": 0.055,
    "cap": 40000
  },
  {
    "name": "Ukuran Biasa - E",
    "rate": 0.06,
    "cap": 40000
  },
  {
    "name": "Ukuran Biasa - F",
    "rate": 0.065,
    "cap": 40000
  },
  {
    "name": "Ukuran Biasa - G",
    "rate": 0.075,
    "cap": 40000
  },
  {
    "name": "Ukuran Biasa - H",
    "rate": 0.08,
    "cap": 40000
  },
  {
    "name": "Ukuran Khusus - A",
    "rate": 0.025,
    "cap": 60000
  },
  {
    "name": "Ukuran Khusus - B",
    "rate": 0.035,
    "cap": 60000
  },
  {
    "name": "Ukuran Khusus - C",
    "rate": 0.05,
    "cap": 60000
  },
  {
    "name": "Ukuran Khusus - D",
    "rate": 0.07,
    "cap": 60000
  },
  {
    "name": "Ukuran Khusus - E",
    "rate": 0.075,
    "cap": 60000
  },
  {
    "name": "Ukuran Khusus - F",
    "rate": 0.08,
    "cap": 60000
  },
  {
    "name": "Ukuran Khusus - G",
    "rate": 0.09,
    "cap": 60000
  },
  {
    "name": "Ukuran Khusus - H",
    "rate": 0.095,
    "cap": 60000
  }
] satisfies FreeShippingOption[];

export const tiktokZones = [
  "Bali",
  "DKI Jakarta",
  "Jawa",
  "Kalimantan",
  "Nusa Tenggara",
  "Papua & Maluku",
  "Sulawesi",
  "Sumatra"
] satisfies string[];

export const tiktokShippingTypes = [
  "Cargo",
  "Economy",
  "Instant & Same Day",
  "Standard"
] satisfies string[];

export const tiktokRates = [
  {
    "shippingType": "Standard",
    "origin": "Jawa",
    "destination": "DKI Jakarta",
    "rates": [
      690,
      890,
      1620,
      2220,
      2730,
      4350
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Jawa",
    "destination": "Jawa",
    "rates": [
      990,
      1090,
      2220,
      3030,
      3540,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Jawa",
    "destination": "Bali",
    "rates": [
      1720,
      2220,
      4150,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Jawa",
    "destination": "Nusa Tenggara",
    "rates": [
      2930,
      3640,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Jawa",
    "destination": "Sumatra",
    "rates": [
      2830,
      3330,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Jawa",
    "destination": "Sulawesi",
    "rates": [
      3940,
      4850,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Jawa",
    "destination": "Kalimantan",
    "rates": [
      3440,
      4150,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Jawa",
    "destination": "Papua & Maluku",
    "rates": [
      5060,
      5060,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "DKI Jakarta",
    "destination": "DKI Jakarta",
    "rates": [
      690,
      890,
      1620,
      2220,
      2730,
      4350
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "DKI Jakarta",
    "destination": "Jawa",
    "rates": [
      990,
      1090,
      2220,
      3030,
      3540,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "DKI Jakarta",
    "destination": "Bali",
    "rates": [
      1720,
      2220,
      4150,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "DKI Jakarta",
    "destination": "Nusa Tenggara",
    "rates": [
      2930,
      3640,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "DKI Jakarta",
    "destination": "Sumatra",
    "rates": [
      2830,
      3330,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "DKI Jakarta",
    "destination": "Sulawesi",
    "rates": [
      3940,
      4850,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "DKI Jakarta",
    "destination": "Kalimantan",
    "rates": [
      3440,
      4150,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "DKI Jakarta",
    "destination": "Papua & Maluku",
    "rates": [
      5060,
      5060,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Bali",
    "destination": "Bali",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Bali",
    "destination": "Nusa Tenggara",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Bali",
    "destination": "Sumatra",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Bali",
    "destination": "Sulawesi",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Bali",
    "destination": "Kalimantan",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Bali",
    "destination": "Papua & Maluku",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Nusa Tenggara",
    "destination": "Bali",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Nusa Tenggara",
    "destination": "Nusa Tenggara",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Nusa Tenggara",
    "destination": "Sumatra",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Nusa Tenggara",
    "destination": "Sulawesi",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Nusa Tenggara",
    "destination": "Kalimantan",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Nusa Tenggara",
    "destination": "Papua & Maluku",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Sumatra",
    "destination": "Bali",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Sumatra",
    "destination": "Nusa Tenggara",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Sumatra",
    "destination": "Sumatra",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Sumatra",
    "destination": "Sulawesi",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Sumatra",
    "destination": "Kalimantan",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Sumatra",
    "destination": "Papua & Maluku",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Sulawesi",
    "destination": "Bali",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Sulawesi",
    "destination": "Nusa Tenggara",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Sulawesi",
    "destination": "Sumatra",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Sulawesi",
    "destination": "Sulawesi",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Sulawesi",
    "destination": "Kalimantan",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Sulawesi",
    "destination": "Papua & Maluku",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Kalimantan",
    "destination": "Bali",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Kalimantan",
    "destination": "Nusa Tenggara",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Kalimantan",
    "destination": "Sumatra",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Kalimantan",
    "destination": "Sulawesi",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Kalimantan",
    "destination": "Kalimantan",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Kalimantan",
    "destination": "Papua & Maluku",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Papua & Maluku",
    "destination": "Bali",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Papua & Maluku",
    "destination": "Nusa Tenggara",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Papua & Maluku",
    "destination": "Sumatra",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Papua & Maluku",
    "destination": "Sulawesi",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Papua & Maluku",
    "destination": "Kalimantan",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Standard",
    "origin": "Papua & Maluku",
    "destination": "Papua & Maluku",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Jawa",
    "destination": "Bali",
    "rates": [
      1420,
      1920,
      3440,
      4850,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Jawa",
    "destination": "Nusa Tenggara",
    "rates": [
      2430,
      3030,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Jawa",
    "destination": "Sumatra",
    "rates": [
      1920,
      2330,
      3940,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Jawa",
    "destination": "Sulawesi",
    "rates": [
      3540,
      4250,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Jawa",
    "destination": "Kalimantan",
    "rates": [
      3130,
      3640,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Jawa",
    "destination": "Papua & Maluku",
    "rates": [
      3540,
      4250,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "DKI Jakarta",
    "destination": "Bali",
    "rates": [
      1420,
      1920,
      3440,
      4850,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "DKI Jakarta",
    "destination": "Nusa Tenggara",
    "rates": [
      2430,
      3030,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "DKI Jakarta",
    "destination": "Sumatra",
    "rates": [
      1920,
      2330,
      3940,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "DKI Jakarta",
    "destination": "Sulawesi",
    "rates": [
      3540,
      4250,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "DKI Jakarta",
    "destination": "Kalimantan",
    "rates": [
      3130,
      3640,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "DKI Jakarta",
    "destination": "Papua & Maluku",
    "rates": [
      3540,
      4250,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Bali",
    "destination": "Bali",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Bali",
    "destination": "Nusa Tenggara",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Bali",
    "destination": "Sumatra",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Bali",
    "destination": "Sulawesi",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Bali",
    "destination": "Kalimantan",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Bali",
    "destination": "Papua & Maluku",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Nusa Tenggara",
    "destination": "Bali",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Nusa Tenggara",
    "destination": "Nusa Tenggara",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Nusa Tenggara",
    "destination": "Sumatra",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Nusa Tenggara",
    "destination": "Sulawesi",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Nusa Tenggara",
    "destination": "Kalimantan",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Nusa Tenggara",
    "destination": "Papua & Maluku",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Sumatra",
    "destination": "Bali",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Sumatra",
    "destination": "Nusa Tenggara",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Sumatra",
    "destination": "Sumatra",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Sumatra",
    "destination": "Sulawesi",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Sumatra",
    "destination": "Kalimantan",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Sumatra",
    "destination": "Papua & Maluku",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Sulawesi",
    "destination": "Bali",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Sulawesi",
    "destination": "Nusa Tenggara",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Sulawesi",
    "destination": "Sumatra",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Sulawesi",
    "destination": "Sulawesi",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Sulawesi",
    "destination": "Kalimantan",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Sulawesi",
    "destination": "Papua & Maluku",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Kalimantan",
    "destination": "Bali",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Kalimantan",
    "destination": "Nusa Tenggara",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Kalimantan",
    "destination": "Sumatra",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Kalimantan",
    "destination": "Sulawesi",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Kalimantan",
    "destination": "Kalimantan",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Kalimantan",
    "destination": "Papua & Maluku",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Papua & Maluku",
    "destination": "Bali",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Papua & Maluku",
    "destination": "Nusa Tenggara",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Papua & Maluku",
    "destination": "Sumatra",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Papua & Maluku",
    "destination": "Sulawesi",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Papua & Maluku",
    "destination": "Kalimantan",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Economy",
    "origin": "Papua & Maluku",
    "destination": "Papua & Maluku",
    "rates": [
      2020,
      2530,
      3840,
      4950,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Jawa",
    "destination": "DKI Jakarta",
    "rates": [
      0,
      0,
      1420,
      1520,
      1520,
      4850
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Jawa",
    "destination": "Jawa",
    "rates": [
      0,
      0,
      1420,
      1420,
      1520,
      4550
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Jawa",
    "destination": "Bali",
    "rates": [
      0,
      0,
      3940,
      4250,
      4350,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Jawa",
    "destination": "Nusa Tenggara",
    "rates": [
      0,
      0,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Jawa",
    "destination": "Sumatra",
    "rates": [
      0,
      0,
      3940,
      4040,
      4150,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Jawa",
    "destination": "Sulawesi",
    "rates": [
      0,
      0,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Jawa",
    "destination": "Kalimantan",
    "rates": [
      0,
      0,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Jawa",
    "destination": "Papua & Maluku",
    "rates": [
      0,
      0,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "DKI Jakarta",
    "destination": "DKI Jakarta",
    "rates": [
      0,
      0,
      1420,
      1520,
      1520,
      4850
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "DKI Jakarta",
    "destination": "Jawa",
    "rates": [
      0,
      0,
      1420,
      1420,
      1520,
      4550
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "DKI Jakarta",
    "destination": "Bali",
    "rates": [
      0,
      0,
      3940,
      4250,
      4350,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "DKI Jakarta",
    "destination": "Nusa Tenggara",
    "rates": [
      0,
      0,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "DKI Jakarta",
    "destination": "Sumatra",
    "rates": [
      0,
      0,
      3940,
      4040,
      4150,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "DKI Jakarta",
    "destination": "Sulawesi",
    "rates": [
      0,
      0,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "DKI Jakarta",
    "destination": "Kalimantan",
    "rates": [
      0,
      0,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "DKI Jakarta",
    "destination": "Papua & Maluku",
    "rates": [
      0,
      0,
      5060,
      5060,
      5060,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Bali",
    "destination": "Bali",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Bali",
    "destination": "Nusa Tenggara",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Bali",
    "destination": "Sumatra",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Bali",
    "destination": "Sulawesi",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Bali",
    "destination": "Kalimantan",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Bali",
    "destination": "Papua & Maluku",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Nusa Tenggara",
    "destination": "Bali",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Nusa Tenggara",
    "destination": "Nusa Tenggara",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Nusa Tenggara",
    "destination": "Sumatra",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Nusa Tenggara",
    "destination": "Sulawesi",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Nusa Tenggara",
    "destination": "Kalimantan",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Nusa Tenggara",
    "destination": "Papua & Maluku",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Sumatra",
    "destination": "Bali",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Sumatra",
    "destination": "Nusa Tenggara",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Sumatra",
    "destination": "Sumatra",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Sumatra",
    "destination": "Sulawesi",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Sumatra",
    "destination": "Kalimantan",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Sumatra",
    "destination": "Papua & Maluku",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Sulawesi",
    "destination": "Bali",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Sulawesi",
    "destination": "Nusa Tenggara",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Sulawesi",
    "destination": "Sumatra",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Sulawesi",
    "destination": "Sulawesi",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Sulawesi",
    "destination": "Kalimantan",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Sulawesi",
    "destination": "Papua & Maluku",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Kalimantan",
    "destination": "Bali",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Kalimantan",
    "destination": "Nusa Tenggara",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Kalimantan",
    "destination": "Sumatra",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Kalimantan",
    "destination": "Sulawesi",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Kalimantan",
    "destination": "Kalimantan",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Kalimantan",
    "destination": "Papua & Maluku",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Papua & Maluku",
    "destination": "Bali",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Papua & Maluku",
    "destination": "Nusa Tenggara",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Papua & Maluku",
    "destination": "Sumatra",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Papua & Maluku",
    "destination": "Sulawesi",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Papua & Maluku",
    "destination": "Kalimantan",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Cargo",
    "origin": "Papua & Maluku",
    "destination": "Papua & Maluku",
    "rates": [
      0,
      0,
      2930,
      3340,
      3340,
      5060
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "DKI Jakarta",
    "destination": "DKI Jakarta",
    "rates": [
      2020,
      2020,
      2020,
      2020,
      2020,
      2020
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "DKI Jakarta",
    "destination": "Jawa",
    "rates": [
      3030,
      3030,
      3030,
      3030,
      3030,
      3030
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "DKI Jakarta",
    "destination": "Bali",
    "rates": [
      2120,
      2120,
      2120,
      2120,
      2120,
      2120
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "DKI Jakarta",
    "destination": "Nusa Tenggara",
    "rates": [
      1720,
      1720,
      1720,
      1720,
      1720,
      1720
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "DKI Jakarta",
    "destination": "Sumatra",
    "rates": [
      2020,
      2020,
      2020,
      2020,
      2020,
      2020
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "DKI Jakarta",
    "destination": "Sulawesi",
    "rates": [
      1720,
      1720,
      1720,
      1720,
      1720,
      1720
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "DKI Jakarta",
    "destination": "Kalimantan",
    "rates": [
      1920,
      1920,
      1920,
      1920,
      1920,
      1920
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "DKI Jakarta",
    "destination": "Papua & Maluku",
    "rates": [
      1820,
      1820,
      1820,
      1820,
      1820,
      1820
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Jawa",
    "destination": "DKI Jakarta",
    "rates": [
      2020,
      2020,
      2020,
      2020,
      2020,
      2020
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Jawa",
    "destination": "Jawa",
    "rates": [
      3030,
      3030,
      3030,
      3030,
      3030,
      3030
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Jawa",
    "destination": "Bali",
    "rates": [
      2120,
      2120,
      2120,
      2120,
      2120,
      2120
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Jawa",
    "destination": "Nusa Tenggara",
    "rates": [
      1720,
      1720,
      1720,
      1720,
      1720,
      1720
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Jawa",
    "destination": "Sumatra",
    "rates": [
      2020,
      2020,
      2020,
      2020,
      2020,
      2020
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Jawa",
    "destination": "Sulawesi",
    "rates": [
      1720,
      1720,
      1720,
      1720,
      1720,
      1720
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Jawa",
    "destination": "Kalimantan",
    "rates": [
      1920,
      1920,
      1920,
      1920,
      1920,
      1920
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Jawa",
    "destination": "Papua & Maluku",
    "rates": [
      1820,
      1820,
      1820,
      1820,
      1820,
      1820
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Bali",
    "destination": "DKI Jakarta",
    "rates": [
      2020,
      2020,
      2020,
      2020,
      2020,
      2020
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Bali",
    "destination": "Jawa",
    "rates": [
      3030,
      3030,
      3030,
      3030,
      3030,
      3030
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Bali",
    "destination": "Bali",
    "rates": [
      2120,
      2120,
      2120,
      2120,
      2120,
      2120
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Bali",
    "destination": "Nusa Tenggara",
    "rates": [
      1720,
      1720,
      1720,
      1720,
      1720,
      1720
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Bali",
    "destination": "Sumatra",
    "rates": [
      2020,
      2020,
      2020,
      2020,
      2020,
      2020
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Bali",
    "destination": "Sulawesi",
    "rates": [
      1720,
      1720,
      1720,
      1720,
      1720,
      1720
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Bali",
    "destination": "Kalimantan",
    "rates": [
      1920,
      1920,
      1920,
      1920,
      1920,
      1920
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Bali",
    "destination": "Papua & Maluku",
    "rates": [
      1820,
      1820,
      1820,
      1820,
      1820,
      1820
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Nusa Tenggara",
    "destination": "DKI Jakarta",
    "rates": [
      2020,
      2020,
      2020,
      2020,
      2020,
      2020
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Nusa Tenggara",
    "destination": "Jawa",
    "rates": [
      3030,
      3030,
      3030,
      3030,
      3030,
      3030
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Nusa Tenggara",
    "destination": "Bali",
    "rates": [
      2120,
      2120,
      2120,
      2120,
      2120,
      2120
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Nusa Tenggara",
    "destination": "Nusa Tenggara",
    "rates": [
      1720,
      1720,
      1720,
      1720,
      1720,
      1720
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Nusa Tenggara",
    "destination": "Sumatra",
    "rates": [
      2020,
      2020,
      2020,
      2020,
      2020,
      2020
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Nusa Tenggara",
    "destination": "Sulawesi",
    "rates": [
      1720,
      1720,
      1720,
      1720,
      1720,
      1720
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Nusa Tenggara",
    "destination": "Kalimantan",
    "rates": [
      1920,
      1920,
      1920,
      1920,
      1920,
      1920
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Nusa Tenggara",
    "destination": "Papua & Maluku",
    "rates": [
      1820,
      1820,
      1820,
      1820,
      1820,
      1820
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Sumatra",
    "destination": "DKI Jakarta",
    "rates": [
      2020,
      2020,
      2020,
      2020,
      2020,
      2020
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Sumatra",
    "destination": "Jawa",
    "rates": [
      3030,
      3030,
      3030,
      3030,
      3030,
      3030
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Sumatra",
    "destination": "Bali",
    "rates": [
      2120,
      2120,
      2120,
      2120,
      2120,
      2120
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Sumatra",
    "destination": "Nusa Tenggara",
    "rates": [
      1720,
      1720,
      1720,
      1720,
      1720,
      1720
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Sumatra",
    "destination": "Sumatra",
    "rates": [
      2020,
      2020,
      2020,
      2020,
      2020,
      2020
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Sumatra",
    "destination": "Sulawesi",
    "rates": [
      1720,
      1720,
      1720,
      1720,
      1720,
      1720
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Sumatra",
    "destination": "Kalimantan",
    "rates": [
      1920,
      1920,
      1920,
      1920,
      1920,
      1920
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Sumatra",
    "destination": "Papua & Maluku",
    "rates": [
      1820,
      1820,
      1820,
      1820,
      1820,
      1820
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Sulawesi",
    "destination": "DKI Jakarta",
    "rates": [
      2020,
      2020,
      2020,
      2020,
      2020,
      2020
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Sulawesi",
    "destination": "Jawa",
    "rates": [
      3030,
      3030,
      3030,
      3030,
      3030,
      3030
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Sulawesi",
    "destination": "Bali",
    "rates": [
      2120,
      2120,
      2120,
      2120,
      2120,
      2120
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Sulawesi",
    "destination": "Nusa Tenggara",
    "rates": [
      1720,
      1720,
      1720,
      1720,
      1720,
      1720
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Sulawesi",
    "destination": "Sumatra",
    "rates": [
      2020,
      2020,
      2020,
      2020,
      2020,
      2020
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Sulawesi",
    "destination": "Sulawesi",
    "rates": [
      1720,
      1720,
      1720,
      1720,
      1720,
      1720
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Sulawesi",
    "destination": "Kalimantan",
    "rates": [
      1920,
      1920,
      1920,
      1920,
      1920,
      1920
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Sulawesi",
    "destination": "Papua & Maluku",
    "rates": [
      1820,
      1820,
      1820,
      1820,
      1820,
      1820
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Kalimantan",
    "destination": "DKI Jakarta",
    "rates": [
      2020,
      2020,
      2020,
      2020,
      2020,
      2020
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Kalimantan",
    "destination": "Jawa",
    "rates": [
      3030,
      3030,
      3030,
      3030,
      3030,
      3030
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Kalimantan",
    "destination": "Bali",
    "rates": [
      2120,
      2120,
      2120,
      2120,
      2120,
      2120
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Kalimantan",
    "destination": "Nusa Tenggara",
    "rates": [
      1720,
      1720,
      1720,
      1720,
      1720,
      1720
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Kalimantan",
    "destination": "Sumatra",
    "rates": [
      2020,
      2020,
      2020,
      2020,
      2020,
      2020
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Kalimantan",
    "destination": "Sulawesi",
    "rates": [
      1720,
      1720,
      1720,
      1720,
      1720,
      1720
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Kalimantan",
    "destination": "Kalimantan",
    "rates": [
      1920,
      1920,
      1920,
      1920,
      1920,
      1920
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Kalimantan",
    "destination": "Papua & Maluku",
    "rates": [
      1820,
      1820,
      1820,
      1820,
      1820,
      1820
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Papua & Maluku",
    "destination": "DKI Jakarta",
    "rates": [
      2020,
      2020,
      2020,
      2020,
      2020,
      2020
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Papua & Maluku",
    "destination": "Jawa",
    "rates": [
      3030,
      3030,
      3030,
      3030,
      3030,
      3030
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Papua & Maluku",
    "destination": "Bali",
    "rates": [
      2120,
      2120,
      2120,
      2120,
      2120,
      2120
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Papua & Maluku",
    "destination": "Nusa Tenggara",
    "rates": [
      1720,
      1720,
      1720,
      1720,
      1720,
      1720
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Papua & Maluku",
    "destination": "Sumatra",
    "rates": [
      2020,
      2020,
      2020,
      2020,
      2020,
      2020
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Papua & Maluku",
    "destination": "Sulawesi",
    "rates": [
      1720,
      1720,
      1720,
      1720,
      1720,
      1720
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Papua & Maluku",
    "destination": "Kalimantan",
    "rates": [
      1920,
      1920,
      1920,
      1920,
      1920,
      1920
    ]
  },
  {
    "shippingType": "Instant & Same Day",
    "origin": "Papua & Maluku",
    "destination": "Papua & Maluku",
    "rates": [
      1820,
      1820,
      1820,
      1820,
      1820,
      1820
    ]
  }
] satisfies TiktokRate[];
