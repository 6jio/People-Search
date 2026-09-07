const ORIGINAL_PEOPLE = [
  {
    PersonID: 1,
    Name: "Rachel Smith",
    Address: "Wollaton",
    DOB: "1979-06-05",
    LicenseNumber: "SG345PQ",
    ExpiryDate: "2020-05-05",
  },
  {
    PersonID: 2,
    Name: "Lewis Thomson",
    Address: "Nottingham",
    DOB: "1949-01-15",
    LicenseNumber: "RW765FR",
    ExpiryDate: "2018-03-25",
  },
  {
    PersonID: 3,
    Name: "Oliver Reps",
    Address: "Nottingham",
    DOB: "1976-10-05",
    LicenseNumber: "JR123DE",
    ExpiryDate: "2016-01-29",
  },
  {
    PersonID: 4,
    Name: "Daphne Lai",
    Address: "Leicester",
    DOB: "1980-08-13",
    LicenseNumber: "DL890GB",
    ExpiryDate: "2017-06-24",
  },
  {
    PersonID: 5,
    Name: "Rachel Johnson",
    Address: "London",
    DOB: "2000-01-01",
    LicenseNumber: "JK239GB",
    ExpiryDate: "2023-08-12",
  },
];

const ORIGINAL_VEHICLES = [
  {
    VehicleID: "GHT56FN",
    Make: "Fiat",
    Model: "Punto",
    Colour: "Blue",
    OwnerID: 4,
  },
  {
    VehicleID: "KWK24JI",
    Make: "Tesla",
    Model: "3",
    Colour: "White",
    OwnerID: null,
  },
  {
    VehicleID: "NG51PKO",
    Make: "Ford",
    Model: "Fiesta",
    Colour: "Grey",
    OwnerID: 1,
  },
  {
    VehicleID: "PQR6465",
    Make: "Audi",
    Model: "A4",
    Colour: "Red",
    OwnerID: 2,
  },
  {
    VehicleID: "SFD43FH",
    Make: "Lancia",
    Model: "Thema",
    Colour: "Blue",
    OwnerID: 3,
  },
];

//export
async function resetdatabase() {
  if (!confirm("Reset database to original state?")) return;
  await mySupabase.from("vehicles").delete().neq("VehicleID", "");
  await mySupabase.from("people").delete().neq("PersonID", 0);
  await mySupabase.from("people").insert(ORIGINAL_PEOPLE);
  await mySupabase.from("vehicles").insert(ORIGINAL_VEHICLES);
  alert("Database reset successfully");
}
