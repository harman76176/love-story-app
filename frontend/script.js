const API_URL = "/api/reviews"; // backend से connect होगा

async function submitReview() {
  const text = document.getElementById("reviewText").value.trim();
  if (!text) {
    alert("Kuch to likho ❤️");
    return;
  }
  const u = (document.getElementById("username")?.value || "Anonymous").trim();
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: u || "Anonymous", review: text })
    });
    const data = await res.json();
    if (data.status === "success") {
      document.getElementById("reviewText").value = "";
      showSection("greeting");
    } else {
      alert("Save error: " + data.error);
    }
  } catch (e) {
    alert("Server error");
    console.error(e);
  }
}

async function loadReviews() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    if (data.reviews && data.reviews.length > 0) {
      document.getElementById("adminReview").innerHTML =
        data.reviews.map(r => `<p><b>${r.name}:</b> ${r.review}</p>`).join("");
    } else {
      document.getElementById("adminReview").innerHTML = "<p>Koi review nahi hai 😢</p>";
    }
  } catch (e) {
    document.getElementById("adminReview").innerHTML = "<p>Error ⚠️</p>";
  }
}
