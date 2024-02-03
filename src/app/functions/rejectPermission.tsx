export default function rejectPermission(
  requiredAddress,
  permissionID,
  onFailure
) {
  try {
    const insertUserData = {
      requiredAddress: requiredAddress,
      permissionID: permissionID,
    };
    const request = new Request("http://localhost:3001/api/rejectPermission", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      mode: "cors",
      body: JSON.stringify(insertUserData),
    });

    fetch(request)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }
        return res.json();
      })
      .then((response) => {
        if (response.success) {
          console.log("Permission rejected!");
          onFailure();
        } else {
          console.error("Address is null or response is not successful.");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch:", error);
      });
  } catch (error) {
    console.error("Failed to save data:", error);
  }
  return null;
}
