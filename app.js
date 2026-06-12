const monthYear = document.getElementById("monthYear");
const calendar = document.getElementById("calendar");

let currentDate = new Date();

function renderCalendar() {
calendar.innerHTML = "";

const year = currentDate.getFullYear();
const month = currentDate.getMonth();

monthYear.textContent = currentDate.toLocaleString("default", {
month: "long",
year: "numeric"
});

const daysInMonth = new Date(year, month + 1, 0).getDate();

for (let day = 1; day <= daysInMonth; day++) {
const cell = document.createElement("div");
cell.className = "day";
cell.innerHTML = `<strong>${day}</strong><br><button>➕ Add</button>`;
calendar.appendChild(cell);
}
}

renderCalendar();
