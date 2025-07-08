// src/lib/data.ts

// Data ini sekarang akan menjadi satu-satunya sumber kebenaran (single source of truth)
// untuk profil pengguna, mensimulasikan data dari database.

export const userProfiles = [
  {
    id: "1",
    companyName: "PT Maju Jaya",
    contactPerson: "Buyer User",
    email: "buyer@example.com",
    phone: "+62 812 3456 7890",
    address: "Jl. Industri No. 123, Jakarta, Indonesia",
    destinationPort: "Port of Singapore",
    taxId: "12.345.678.9-012.000",
    role: "buyer",
    lastLogin: "2025-07-08",
  },
  {
    id: "2",
    companyName: "Internal",
    contactPerson: "Admin User",
    email: "admin@example.com",
    phone: "N/A",
    address: "N/A",
    destinationPort: "N/A",
    taxId: "N/A",
    role: "admin",
    lastLogin: "2025-07-08",
  },
  {
    id: "3",
    companyName: "Global Exports Ltd.",
    contactPerson: "John Doe",
    email: "john.doe@anothercompany.com",
    phone: "+44 20 7946 0958",
    address: "123 Business Rd, London, UK",
    destinationPort: "Port of Felixstowe",
    taxId: "GB123456789",
    role: "buyer",
    lastLogin: "2025-07-07",
  },
  {
    id: "4",
    companyName: "Big Traders Inc.",
    contactPerson: "Jane Smith",
    email: "jane.s@bigtraders.com",
    phone: "+1 212-555-0123",
    address: "456 Commerce Ave, New York, USA",
    destinationPort: "Port of New York and New Jersey",
    taxId: "98-7654321",
    role: "buyer",
    lastLogin: "2025-07-05",
  },
];