const { db } = require("../database/db-config");

users = [
  {
    user_id: 1,
    name: "Induwara Perera",
    email: "Indu12@gmail.com",
    password: "ABC@123",
    phone: "0776548932",
    role_id: 1,
    branch_id: 0,
  },
  {
    user_id: 2,
    name: "Akash Tharuka",
    email: "akash@gmail.com",
    password: "pqr123",
    phone: "0783654951",
    role_id: 2,
    branch_id: 1,
  },
  {
    user_id: 3,
    name: "Pahan Isuru",
    email: "Isuru19@gmail.com",
    password: "hello12",
    phone: "0764455987",
    role_id: 2,
    branch_id: 2,
  },
  {
    user_id: 4,
    name: "Sanduni Ayesha",
    email: "Aye99@gmail.com",
    password: "aye456",
    phone: "0723355946",
    role_id: 2,
    branch_id: 3,
  },
  {
    user_id: 5,
    name: "Nipun Pramuditha",
    email: "Pram90@gmail.com",
    password: "345gh",
    phone: "0719486592",
    role_id: 2,
    branch_id: 4,
  },
  {
    user_id: 6,
    name: "Sahan Chethika",
    email: "Sahan.C@gmail.com",
    password: "rergeb",
    phone: "0759413684",
    role_id: 2,
    branch_id: 5,
  },
  {
    user_id: 7,
    name: "Aruna Shaminda",
    email: "Aruna.shaminda.123@gmail.com",
    password: "aru#345",
    phone: "0779366588",
    role_id: 2,
    branch_id: 6,
  },
  {
    user_id: 8,
    name: "Prasad Sandaru",
    email: "SandaruP@gmail.com",
    password: "pra@sa",
    phone: "0779635486",
    role_id: 3,
    branch_id: 1,
  },
  {
    user_id: 9,
    name: "Deshan Samiru",
    email: "Samir.desh@gmail.com",
    password: "123@desh",
    phone: "0786542591",
    role_id: 3,
    branch_id: 1,
  },
  {
    user_id: 10,
    name: "Kalsara Dhanushka",
    email: "Kalsara@gmail.com",
    password: "ABC#abc",
    phone: "0757556894",
    role_id: 3,
    branch_id: 1,
  },
  {
    user_id: 11,
    name: "Dinuk Jayaruwan",
    email: "Dinuk@gmail.com",
    password: "jaay@",
    phone: "0756699884",
    role_id: 3,
    branch_id: 1,
  },
  {
    user_id: 12,
    name: "Hashan Weerasinghe",
    email: "HashanWeera@gmail.com",
    password: "HashW123",
    phone: "0773695961",
    role_id: 3,
    branch_id: 1,
  },
  {
    user_id: 13,
    name: "Piumantha Fernando",
    email: "FernandPiyumantha@gmail.com",
    password: "FP@123",
    phone: "078664235",
    role_id: 4,
    branch_id: 1,
  },
  {
    user_id: 14,
    name: "Chanitha Sandaru",
    email: "ChanithS@gmail.com",
    password: "SChandi*",
    phone: "0715487584",
    role_id: 4,
    branch_id: 1,
  },
  {
    user_id: 15,
    name: "Damsara Peiris",
    email: "Damsara@gmail.com",
    password: "Pieris123",
    phone: "0773325698",
    role_id: 4,
    branch_id: 1,
  },
  {
    user_id: 16,
    name: "Amal Prem",
    email: "Prem@gmail.com",
    password: "PremAmal@",
    phone: "0726589412",
    role_id: 4,
    branch_id: 1,
  },
  {
    user_id: 17,
    name: "Mahinda Jayalath",
    email: "MahiJ@gmail.com",
    password: "85@Mahi",
    phone: "0719965864",
    role_id: 4,
    branch_id: 1,
  },
  {
    user_id: 18,
    name: "Pinsara Pieries",
    email: "PP1965@gmail.com",
    password: "65PP65",
    phone: "0715584663",
    role_id: 3,
    branch_id: 2,
  },
  {
    user_id: 19,
    name: "Asanka Pradeep",
    email: "AsankaP@gmail.com",
    password: "asdko",
    phone: "0779456821",
    role_id: 3,
    branch_id: 2,
  },
  {
    user_id: 20,
    name: "Jeewan Kulathunga",
    email: "JeewK@gmail.com",
    password: "dsaew",
    phone: "0779486326",
    role_id: 3,
    branch_id: 2,
  },
  {
    user_id: 21,
    name: "Pasindu Nuwan",
    email: "Pasi365@gmail.com",
    password: "sdaonre",
    phone: "0779866552",
    role_id: 3,
    branch_id: 2,
  },
  {
    user_id: 22,
    name: "Nilaksha Kaveen",
    email: "Nilakz@gmail.com",
    password: "frhcds",
    phone: "0779658841",
    role_id: 3,
    branch_id: 2,
  },
  {
    user_id: 23,
    name: "Kasun Thenuwara",
    email: "Kazzun@gmail.com",
    password: "ndajssa",
    phone: "0719657432",
    role_id: 4,
    branch_id: 2,
  },
  {
    user_id: 24,
    name: "Tharindu Weere",
    email: "Thari345@gmail.com",
    password: "vddfs342",
    phone: "0779684635",
    role_id: 4,
    branch_id: 2,
  },
  {
    user_id: 25,
    name: "Sanka Siriwardanaa",
    email: "SahanSiriwardana@gmail.com",
    password: "anjfoe",
    phone: "0774632598",
    role_id: 4,
    branch_id: 2,
  },
  {
    user_id: 26,
    name: "Mihin Silva",
    email: "MihinS@gmail.com",
    password: "dsasda",
    phone: "0779684235",
    role_id: 4,
    branch_id: 2,
  },
  {
    user_id: 27,
    name: "Chamod Thale",
    email: "ChamodT@gmail.com",
    password: "dawdcsdv",
    phone: "0771123654",
    role_id: 4,
    branch_id: 2,
  },
  {
    user_id: 28,
    name: "Sahan Avishka",
    email: "Avishzz@gmail.com",
    password: "dadqqwe",
    phone: "0773658945",
    role_id: 3,
    branch_id: 3,
  },
  {
    user_id: 29,
    name: "Lahiru Dilshan",
    email: "LahiruDilz@gmail.com",
    password: "cwsxgjvn",
    phone: "0771554632",
    role_id: 3,
    branch_id: 3,
  },
  {
    user_id: 30,
    name: "Hasitha Narangoda",
    email: "Hasitha124@gmail.com",
    password: "vvb7s9vd",
    phone: "075452368",
    role_id: 3,
    branch_id: 3,
  },
  {
    user_id: 31,
    name: "Jehan collure",
    email: "Jehan989@gmail.com",
    password: "vdsdsvd",
    phone: "0775546325",
    role_id: 3,
    branch_id: 3,
  },
  {
    user_id: 32,
    name: "Gihan Nirmal",
    email: "gihanNirman@gmail.com",
    password: "fendcksn",
    phone: "0719544662",
    role_id: 3,
    branch_id: 3,
  },
  {
    user_id: 33,
    name: "Binara Fernando",
    email: "FernandoBinara@gmail.com",
    password: "dasjsn",
    phone: "0756644921",
    role_id: 4,
    branch_id: 3,
  },
  {
    user_id: 34,
    name: "Kulsith Bimsara",
    email: "bim56Kuls@gmail.com",
    password: "cnidad",
    phone: "0769844521",
    role_id: 4,
    branch_id: 3,
  },
  {
    user_id: 35,
    name: "Nirmana Gihan",
    email: "Nimz@gmail.com",
    password: "fejnfe",
    phone: "0729944586",
    role_id: 4,
    branch_id: 3,
  },
  {
    user_id: 36,
    name: "Hiran Hansika",
    email: "hhansika@gmail.com",
    password: "vdsfnf",
    phone: "0772235497",
    role_id: 4,
    branch_id: 3,
  },
  {
    user_id: 37,
    name: "Loren alwis",
    email: "alwisloren@gmail.com",
    password: "vdsndv",
    phone: "0779645328",
    role_id: 4,
    branch_id: 3,
  },
  {
    user_id: 38,
    name: "Reshan Silva",
    email: "silvaR@gmail.com",
    password: "enrke",
    phone: "0776532155",
    role_id: 3,
    branch_id: 4,
  },
  {
    user_id: 39,
    name: "Vinul Edirisinghe",
    email: "ediriVinul@gmail.com",
    password: "dsasdasd",
    phone: "0754422156",
    role_id: 3,
    branch_id: 4,
  },
  {
    user_id: 40,
    name: "Hasika Dayawansha",
    email: "hasikaD@gmail.com",
    password: "dwuj7878",
    phone: "0776654123",
    role_id: 3,
    branch_id: 4,
  },
  {
    user_id: 41,
    name: "Kulun Gihan",
    email: "gihanK68@gmail.com",
    password: "78vddf9",
    phone: "0753366412",
    role_id: 3,
    branch_id: 4,
  },
  {
    user_id: 42,
    name: "Nimsara Fernando",
    email: "FernandoNimz@gmail.com",
    password: "665knkn34",
    phone: "0716842367",
    role_id: 3,
    branch_id: 4,
  },
  {
    user_id: 43,
    name: "Ayesh Nipun",
    email: "Nipz89@gmail.com",
    password: "4jnn",
    phone: "0726887412",
    role_id: 4,
    branch_id: 4,
  },
  {
    user_id: 44,
    name: "Chalitha Denuwan",
    email: "charlieD@gmail.com",
    password: "hneiwe",
    phone: "0764489571",
    role_id: 4,
    branch_id: 4,
  },
  {
    user_id: 45,
    name: "Heshan Silva",
    email: "HeshSil@gmail.com",
    password: "45bjj45",
    phone: "0789445632",
    role_id: 4,
    branch_id: 4,
  },
  {
    user_id: 46,
    name: "Oshan Tilosh",
    email: "OshanTil@gmail.com",
    password: "345ijm",
    phone: "0746985123",
    role_id: 4,
    branch_id: 4,
  },
  {
    user_id: 47,
    name: "Imesh Induwara",
    email: "ImeshIndi@gmail.com",
    password: "23423rfd",
    phone: "0719944365",
    role_id: 4,
    branch_id: 4,
  },
  {
    user_id: 48,
    name: "Kavinda Dilsha",
    email: "DKavinda@gmail.com",
    password: "enrk5t",
    phone: "0756532155",
    role_id: 3,
    branch_id: 5,
  },
  {
    user_id: 49,
    name: "Kavinda Samarakoon",
    email: "kavi99@gmail.com",
    password: "dsas56sd",
    phone: "0774422156",
    role_id: 3,
    branch_id: 5,
  },
  {
    user_id: 50,
    name: "Dasith Dilshan",
    email: "DilshanD@gmail.com",
    password: "dwuj7y78",
    phone: "0756654123",
    role_id: 3,
    branch_id: 5,
  },
  {
    user_id: 51,
    name: "Dasith Udayanga",
    email: "dasith99@gmail.com",
    password: "78vdd789",
    phone: "0773366412",
    role_id: 3,
    branch_id: 5,
  },
  {
    user_id: 52,
    name: "Kalana Prabhasha",
    email: "Kprabhasha@gmail.com",
    password: "665knk3434",
    phone: "0756842367",
    role_id: 3,
    branch_id: 5,
  },
  {
    user_id: 53,
    name: "Kalana Pramuditha",
    email: "KalanaP@gmail.com",
    password: "4jnyun",
    phone: "0716887412",
    role_id: 4,
    branch_id: 5,
  },
  {
    user_id: 54,
    name: "Charith Dilmin",
    email: "DilminC@gmail.com",
    password: "hnei646e",
    phone: "0754489571",
    role_id: 4,
    branch_id: 5,
  },
  {
    user_id: 55,
    name: "Charith Gamage",
    email: "Charith99@gmail.com",
    password: "45bjj4564",
    phone: "0719445632",
    role_id: 4,
    branch_id: 5,
  },
  {
    user_id: 56,
    name: "Dilmin Imalka",
    email: "Imalka00@gmail.com",
    password: "345ijmgsg",
    phone: "0776985123",
    role_id: 4,
    branch_id: 5,
  },
  {
    user_id: 57,
    name: "Dilmin Dilshan",
    email: "Dilmini123@gmail.com",
    password: "23423rfdew",
    phone: "0759944365",
    role_id: 4,
    branch_id: 5,
  },
  {
    user_id: 58,
    name: "Poorna Gamage",
    email: "PoornaG@gmail.com",
    password: "enrkewt",
    phone: "0716532155",
    role_id: 3,
    branch_id: 6,
  },
  {
    user_id: 59,
    name: "Poorna Priyasad",
    email: "Poorna99@gmail.com",
    password: "dsasdasetwd",
    phone: "0764422156",
    role_id: 3,
    branch_id: 6,
  },
  {
    user_id: 60,
    name: "Jalitha Kalsara",
    email: "KalsaraJ@gmail.com",
    password: "dwuj787ewtwt8",
    phone: "0756654123",
    role_id: 3,
    branch_id: 6,
  },
  {
    user_id: 61,
    name: "Jalitha Gamage",
    email: "jalitha99@gmail.com",
    password: "78vddf9tewt",
    phone: "0713366412",
    role_id: 3,
    branch_id: 6,
  },
  {
    user_id: 62,
    name: "Dinuka Nuwan",
    email: "nuwanD@gmail.com",
    password: "665knkn3435",
    phone: "0726842367",
    role_id: 3,
    branch_id: 6,
  },
  {
    user_id: 63,
    name: "Dinuka Nipun",
    email: "NipunD99@gmail.com",
    password: "4jn335",
    phone: "0766887412",
    role_id: 4,
    branch_id: 6,
  },
  {
    user_id: 64,
    name: "Deshan Lakshitha",
    email: "deshanD@gmail.com",
    password: "hneiwe5354",
    phone: "0774489571",
    role_id: 4,
    branch_id: 6,
  },
  {
    user_id: 65,
    name: "Deshan Silva",
    email: "DeshanSilva99@gmail.com",
    password: "45bjj4534",
    phone: "0719445632",
    role_id: 4,
    branch_id: 6,
  },
  {
    user_id: 66,
    name: "Kolitha Gamage",
    email: "Kolitha99@gmail.com",
    password: "345ij34",
    phone: "0756985123",
    role_id: 4,
    branch_id: 6,
  },
  {
    user_id: 67,
    name: "Kolitha Pravindu",
    email: "PKolitha99@gmail.com",
    password: "23423rf34d",
    phone: "0779944365",
    role_id: 4,
    branch_id: 6,
  },
];

async function add_users() {
  for (let i = 0; i < users.length; i++) {
    user = users[i];
    sql =
      "INSERT INTO users (user_id, name, email, password, phone, role_id, branch_id) VALUES (?,?,?,?,?,?,?)";
    await db.query(sql, [
      user.user_id,
      user.name,
      user.email,
      user.password,
      user.phone,
      user.role_id,
      user.branch_id,
    ]);
  }
  process.exit();
}
add_users();
