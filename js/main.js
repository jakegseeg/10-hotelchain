const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const menuClose = document.querySelector(".menu-close");
const hotelList = document.querySelector(".hotel-list");
const yearNode = document.querySelector("#current-year");

const setMenuState = (isOpen) => {
  document.body.classList.toggle("nav-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
};

menuToggle.addEventListener("click", () => {
  const isOpen = !document.body.classList.contains("nav-open");
  setMenuState(isOpen);
});

menuClose?.addEventListener("click", () => {
  setMenuState(false);
});

document.addEventListener("click", (event) => {
  if (!document.body.classList.contains("nav-open")) return;
  const clickedInsideNav = siteNav.contains(event.target);
  const clickedToggle = menuToggle.contains(event.target);
  if (!clickedInsideNav && !clickedToggle) setMenuState(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuState(false);
});

const formatPhoneHref = (phone) => phone.replace(/[^\d+]/g, "");

const createHotelCard = (hotel) => {
  const article = document.createElement("article");
  article.className = "hotel-card";

  const phoneHref = formatPhoneHref(hotel.phone);
  article.innerHTML = `
    <img
      class="hotel-card__image"
      src="${hotel.image}"
      alt="Exterior view of ${hotel.name}"
      width="640"
      height="360"
      loading="lazy"
      decoding="async"
    />
    <div class="hotel-card__details">
      <h3 class="hotel-card__name">${hotel.name}</h3>
      <p class="hotel-card__address">${hotel.address[0]}</p>
      <p class="hotel-card__address">${hotel.address[1]}</p>
    </div>
    <a class="hotel-card__phone" href="tel:${phoneHref}">${hotel.phone}</a>
  `;

  return article;
};

const renderHotels = async () => {
  try {
    const response = await fetch("data/hotels.json");
    if (!response.ok) throw new Error("Could not load hotel data.");
    const hotels = await response.json();

    hotels.forEach((hotel) => {
      hotelList.appendChild(createHotelCard(hotel));
    });
  } catch (error) {
    hotelList.innerHTML =
      '<p role="status">We are unable to load hotel locations right now.</p>';
  }
};

yearNode.textContent = String(new Date().getFullYear());
renderHotels();
