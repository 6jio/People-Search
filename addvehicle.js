let selectedOwnerID = null;

// enable CheckOwner button when USer inputs smth
document.getElementById("owner").addEventListener("input", () => {
  document.getElementById("check-owner-btn").disabled = !document
    .getElementById("owner")
    .value.trim();
});

// search for matching ownerssss
async function checkOwner() {
  const ownerName = document.getElementById("owner").value.trim();
  const { data } = await mySupabase
    .from("people")
    .select("*")
    .ilike("Name", `%${ownerName}%`);

  const ownerResults = document.getElementById("owner-results");
  ownerResults.innerHTML = "";

  if (data.length === 0) {
    ownerResults.innerHTML = "<p>No matches found</p>";
  } else {
    data.forEach((p) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p>${p.Name} — ${p.LicenseNumber}</p>
        <p>${p.Address}, DOB: ${p.DOB}</p>
        <button type="button" onclick="selectOwner(${p.PersonID})">Select owner</button>`;
      ownerResults.appendChild(div);
    });
  }

  document.getElementById("new-owner-btn").hidden = false;
}

// select an existing owner
function selectOwner(id) {
  selectedOwnerID = id;
  document.getElementById("message-owner").textContent = "Owner selected";
}

function newOwnerForm() {
  document.getElementById("new-owner-form").hidden = false;
}

// add new owner to database
async function addOwner() {
  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const license = document.getElementById("license").value.trim();
  const expire = document.getElementById("expire").value.trim();
  const msgOwner = document.getElementById("message-owner");

  if (!name || !address || !dob || !license || !expire) {
    msgOwner.textContent = "Error: all fields are required";
    return;
  }

  // check duplicates
  const { data: existing } = await mySupabase
    .from("people")
    .select("*")
    .eq("Name", name)
    .eq("Address", address)
    .eq("DOB", dob)
    .eq("LicenseNumber", license)
    .eq("ExpiryDate", expire);

  if (existing.length > 0) {
    msgOwner.textContent = "Error: this owner already exists";
    return;
  }

  // ! NO OWNER ID
  const { data, error } = await mySupabase
    .from("people")
    .insert([
      {
        Name: name,
        Address: address,
        DOB: dob,
        LicenseNumber: license,
        ExpiryDate: expire,
      },
    ])
    .select();

  if (error) {
    msgOwner.textContent = "Error: " + error.message;
    return;
  }

  selectedOwnerID = data[0].PersonID;
  msgOwner.textContent = "Owner added successfully";
}

// add vehicle to database
async function addVehicle() {
  const rego = document.getElementById("rego").value.trim();
  const make = document.getElementById("make").value.trim();
  const model = document.getElementById("model").value.trim();
  const colour = document.getElementById("colour").value.trim();
  const msgVehicle = document.getElementById("message-vehicle");

  if (!rego || !make || !model || !colour || !selectedOwnerID) {
    msgVehicle.textContent = "Error: all fields are required";
    return;
  }

  const { error } = await mySupabase.from("vehicles").insert([
    {
      VehicleID: rego,
      Make: make,
      Model: model,
      Colour: colour,
      OwnerID: selectedOwnerID,
    },
  ]);

  msgVehicle.textContent = error
    ? "Error: " + error.message
    : "Vehicle added successfully";
}

document.getElementById("resetbtn").addEventListener("click", resetdatabase);
