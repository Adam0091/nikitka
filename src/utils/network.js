export const getApiResource = async (url) => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "Content-Type"
      },
    });
    if (!res.ok) {
      console.error("Could not fetch", res.status);
      return false;
    }

    return await res.json();
  } catch (error) {
    console.error("Could not fetch", error.message);
    return false;
  }
};

export const sendData = async (url, body) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify(body),
    });
    return  res;
  } catch (error) {
    console.error("Could not fetch", error.message);
    return false;
  }
};