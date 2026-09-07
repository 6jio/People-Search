const namedata = document.getElementById("name");
const licensedata = document.getElementById("license");
const message = document.getElementById("message");
const results = document.getElementById("results");

document.getElementById("submit-btn").addEventListener("click", async () => {
  const name = namedata.value.trim();
  const license = licensedata.value.trim();

  //if only one box filled
  if ((!name && !license) || (name && license)) {
    message.textContent = "Error: fill in exactly one field";
    results.innerHTML = "";
    return;
  }

  const { data, error } = name
    ? await mySupabase.from("people").select("*").ilike("Name", `%${name}%`)
    : await mySupabase
        .from("people")
        .select("*")
        .ilike("LicenseNumber", `%${license}%`);

  if (error) {
    message.textContent = "Error: " + error.message;
    return;
  }

  if (data.length === 0) {
    message.textContent = "No result found";
    results.innerHTML = "";
    return;
  }

  message.textContent = "Search successful";
  results.innerHTML = data
    .map(
      (p) => `
    <div>
      <p>ID: ${p.PersonID}</p>
      <p>Name: ${p.Name}</p>
      <p>Address: ${p.Address}</p>
      <p>DOB: ${p.DOB}</p>
      <p>License: ${p.LicenseNumber}</p>
      <p>Expiry: ${p.ExpiryDate}</p>
    </div>`,
    )
    .join("");
});

document.getElementById("resetbtn").addEventListener("click", resetdatabase);
