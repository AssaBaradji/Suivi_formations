import prisma from "../src/config/prisma.js";

async function main() {
  console.log("Démarrage du peuplement de la base de données...");

  console.log("Suppression des données existantes...");
  await prisma.payment.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.module.deleteMany();
  await prisma.student.deleteMany();
  console.log("Données supprimées.");

  console.log("Ajout des étudiants...");
  const students = await prisma.student.createMany({
    data: [
      {
        fullName: "Assa Baradji",
        phoneNumber: "0600000000",
        email: "assa.baradji@gmail.com",
        address: "Nouakchott",
        tutor: "M. Mohamed",
      },
      {
        fullName: "Fatima Cissé",
        phoneNumber: "0611111111",
        email: "fatima.cisse@gmail.com",
        address: "Rosso",
        tutor: "M. Ahmed",
      },
      {
        fullName: "Oumar Kane",
        phoneNumber: "0622222222",
        email: "oumar.kane@gmail.com",
        address: "Kiffa",
        tutor: "Mme Mariam",
      },
      {
        fullName: "Aïssata Sy",
        phoneNumber: "0633333333",
        email: "aissata.sy@gmail.com",
        address: "Kaédi",
        tutor: "M. Ali",
      },
    ],
  });
  console.log("Étudiants ajoutés.");

  console.log("Ajout des modules...");
  const modules = await prisma.module.createMany({
    data: [
      { name: "Développement Web", duration: 90, price: 300000 },
      { name: "Data Science", duration: 120, price: 450000 },
      { name: "Design UI/UX", duration: 60, price: 200000 },
      { name: "Cybersécurité", duration: 150, price: 500000 },
    ],
  });
  console.log("Modules ajoutés.");

  const studentsList = await prisma.student.findMany();
  const modulesList = await prisma.module.findMany();

  console.log("Ajout des inscriptions...");
  const registrations = await prisma.registration.createMany({
    data: [
      {
        dateRegister: new Date(),
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        amount: 300000,
        remainingAmount: 0,
        studentId: studentsList[0].id,
        moduleId: modulesList[0].id,
      },
      {
        dateRegister: new Date(),
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 4)),
        amount: 450000,
        remainingAmount: 100000,
        studentId: studentsList[1].id,
        moduleId: modulesList[1].id,
      },
      {
        dateRegister: new Date(),
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        amount: 200000,
        remainingAmount: 50000,
        studentId: studentsList[2].id,
        moduleId: modulesList[2].id,
      },
      {
        dateRegister: new Date(),
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 5)),
        amount: 500000,
        remainingAmount: 200000,
        studentId: studentsList[3].id,
        moduleId: modulesList[3].id,
      },
    ],
  });
  console.log("Inscriptions ajoutées.");

  const registrationsList = await prisma.registration.findMany();

  console.log("Ajout des paiements...");
  const payments = await prisma.payment.createMany({
    data: [
      {
        paymentDate: new Date(),
        amount: 300000,
        payer: "Assa Baradji",
        payerNumber: "0600000000",
        paymentMode: "Carte Bancaire",
        remainingAmount: 0,
        registrationId: registrationsList[0].id,
      },
      {
        paymentDate: new Date(),
        amount: 350000,
        payer: "Fatima Cissé",
        payerNumber: "0611111111",
        paymentMode: "Bankily",
        remainingAmount: 100000,
        registrationId: registrationsList[1].id,
      },
      {
        paymentDate: new Date(),
        amount: 150000,
        payer: "Oumar Kane",
        payerNumber: "0622222222",
        paymentMode: "Espèces",
        remainingAmount: 50000,
        registrationId: registrationsList[2].id,
      },
      {
        paymentDate: new Date(),
        amount: 300000,
        payer: "Aïssata Sy",
        payerNumber: "0633333333",
        paymentMode: "Masrvi",
        remainingAmount: 200000,
        registrationId: registrationsList[3].id,
      },
    ],
  });
  console.log("Paiements ajoutés.");

  console.log("Peuplement terminé avec succès.");
}

main()
  .catch((e) => {
    console.error("Erreur lors du peuplement de la base de données :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
