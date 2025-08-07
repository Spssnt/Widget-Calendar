const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentDate = new Date();
let selectedDate = null;

function loadCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = currentDate.toLocaleString("fr-FR", { month: "long", year: "numeric" });

  calendar.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    calendar.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= lastDate; day++) {
    const dateKey = `${year}-${month}-${day}`;
    const hasEvent = localStorage.getItem(dateKey);
    const div = document.createElement("div");
    div.textContent = day;
    if (hasEvent) div.classList.add("has-event");
    div.addEventListener("click", () => openModal(dateKey));
    calendar.appendChild(div);
  }
}

prevBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  loadCalendar();
};
nextBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  loadCalendar();
};

function openModal(dateKey) {
  selectedDate = dateKey;
  document.getElementById("eventModal").classList.remove("hidden");
}

document.querySelector(".close").onclick = () => {
  document.getElementById("eventModal").classList.add("hidden");
};

document.getElementById("saveEvent").onclick = () => {
  const eventText = document.getElementById("eventText").value;
  if (eventText.trim() !== "") {
    localStorage.setItem(selectedDate, eventText);
    document.getElementById("eventText").value = "";
    document.getElementById("eventModal").classList.add("hidden");
    loadCalendar();
  }
};

loadCalendar();
