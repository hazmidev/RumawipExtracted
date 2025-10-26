const container = document.getElementById("card-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageInfo = document.getElementById("page-info");

let data = [];
let currentPage = 1;
const cardsPerPage = 12;

fetch("ExtractedProjectRumaWip.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    renderPage();
  });

function renderPage() {
  container.innerHTML = "";

  const start = (currentPage - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const pageData = data.slice(start, end);

  pageData.forEach(item => {
    container.innerHTML += `
      <div class="card">
        <h3>${item.Name || item.project_name || "Unnamed Project"}</h3>
        <p><strong>Location:</strong> ${item.Price || "N/A"}</p>
        <p><strong>Price:</strong> ${item.Units || item.price_range || "N/A"}</p>
        <p><strong>Price:</strong> ${item.Area || "N/A"}</p>
      </div>
    `;
  });

  const totalPages = Math.ceil(data.length / cardsPerPage);
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(data.length / cardsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
});
