const message = document.getElementById("message");
const results = document.getElementById("results");

document.getElementById("submit-btn").addEventListener("click", async () => {
  const rego = document.getElementById("rego").value.trim();

  if (!rego) {
    message.textContent = "Error: enter a registration number";
    results.innerHTML = "";
    return;
  }

  //vehicle and join owner info
  const { data, error } = await mySupabase
    .from("vehicles")
    .select("*, people(Name, LicenseNumber)")
    .ilike("VehicleID", rego);

  if (error) {
    message.textContent = "Error: " + error.message;
    return;
  }

  if (!data || data.length === 0) {
    message.textContent = "No result found";
    results.innerHTML = "";
    return;
  }

  const v = data[0];
  let owner = "Unknown";
  if (v.OwnerID) {
    const { data: person } = await mySupabase
      .from("people")
      .select("Name, LicenseNumber")
      .eq("PersonID", v.OwnerID)
      .single();
    if (person) owner = `${person.Name} (${person.LicenseNumber})`;
  }

  message.textContent = "Search successful";
  results.innerHTML = `
    <div>
      <p>Registration: ${v.VehicleID}</p>
      <p>Make: ${v.Make}</p>
      <p>Model: ${v.Model}</p>
      <p>Colour: ${v.Colour}</p>
      <p>Owner: ${owner}</p>
    </div>`;
});

document.getElementById("resetbtn").addEventListener("click", resetdatabase);
