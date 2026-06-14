const monthYear = document.getElementById("monthYear");
const calendar = document.getElementById("calendar");

let currentDate = new Date();

// =====================
// RECURRING INCOME
// =====================

const recurringIncome = [
  {
    name: "Rental Income",
    amount: 1200,
    day: 1
  }
];

// =====================
// RECURRING EXPENSES
// =====================

const recurringExpenses = [
  { name: "Restaurant Rent", amount: 1300, day: 1 },
  { name: "TD Payment + Ins.", amount: 127.92, day: 1 },

  { name: "RBC LOC", amount: 40, day: 5 },

  { name: "TD Payment + Ins.", amount: 185.67, day: 8 },

  { name: "SGI Home Insurance", amount: 184.10, day: 10 },

  { name: "SGI Auto Insurance", amount: 239.73, day: 11 },
  { name: "Apple Subscription", amount: 2.61, day: 11 },
  { name: "Apple Subscription", amount: 4.19, day: 11 },

  { name: "Netflix", amount: 8.39, day: 16 },

  { name: "Affirm", amount: 141.27, day: 17 },
  { name: "Amazon Prime", amount: 10.49, day: 17 },

  { name: "Home Depot Loan", amount: 99.86, day: 19 },

  { name: "TD Life Insurance", amount: 21.87, day: 23 }
];

// =====================
// HELPERS
// =====================

function addEntryToDay(dayBoxes, day, text, amount, color) {
  dayBoxes.forEach(box => {
    const dayNumber = box.querySelector("strong");

    if (
      dayNumber &&
      Number(dayNumber.textContent) === day
    ) {
      const entry = document.createElement("div");

      entry.style.marginTop = "5px";
      entry.style.fontSize = "12px";
      entry.style.color = color;

      entry.innerHTML = `${text}<br>${amount}`;

      box.appendChild(entry);
    }
  });
}

// =====================
// LOAD RECURRING ITEMS
// =====================

function loadRecurringItems() {

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const dayBoxes = document.querySelectorAll(".day");

  // Rental Income
  recurringIncome.forEach(item => {
    addEntryToDay(
      dayBoxes,
      item.day,
      item.name,
      `+$${item.amount}`,
      "green"
    );
  });

  // Monthly Expenses
  recurringExpenses.forEach(item => {
    addEntryToDay(
      dayBoxes,
      item.day,
      item.name,
      `-$${item.amount}`,
      "red"
    );
  });

  // =====================
  // DIMPLES PAYCHEQUE
  // =====================

  let dimplesDate = new Date(2026, 5, 12);

  while (dimplesDate.getFullYear() <= year + 1) {

    if (
      dimplesDate.getFullYear() === year &&
      dimplesDate.getMonth() === month
    ) {
      addEntryToDay(
        dayBoxes,
        dimplesDate.getDate(),
        "Dimples Paycheque",
        "+$2020",
        "green"
      );

      addEntryToDay(
        dayBoxes,
        dimplesDate.getDate(),
        "Mortgage",
        "-$1261.92",
        "red"
      );

      addEntryToDay(
        dayBoxes,
        dimplesDate.getDate(),
        "Car Loan",
        "-$318.22",
        "red"
      );
    }

    dimplesDate.setDate(
      dimplesDate.getDate() + 14
    );
  }

  // =====================
  // JAY PAYCHEQUE
  // =====================

  let jayDate = new Date(2026, 5, 19);

  while (jayDate.getFullYear() <= year + 1) {

    if (
      jayDate.getFullYear() === year &&
      jayDate.getMonth() === month
    ) {
      addEntryToDay(
        dayBoxes,
        jayDate.getDate(),
        "Jay Paycheque",
        "+$1200",
        "green"
      );
    }

    jayDate.setDate(
      jayDate.getDate() + 14
    );
  }

  // =====================
  // MONTH-END ITEMS
  // =====================

  const lastDay =
    new Date(year, month + 1, 0).getDate();

  addEntryToDay(
    dayBoxes,
    lastDay,
    "RRF Loan",
    "-$1495",
    "red"
  );

  addEntryToDay(
    dayBoxes,
    lastDay,
    "Overdraft Interest",
    "-$22.78",
    "red"
  );

  addEntryToDay(
    dayBoxes,
    lastDay,
    "ODP Fee",
    "-$5",
    "red"
  );

  addEntryToDay(
    dayBoxes,
    lastDay,
    "Account Fee",
    "-$17.95",
    "red"
  );
}

// =====================
// CALENDAR
// =====================

function renderCalendar() {

  calendar.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.textContent =
    currentDate.toLocaleString("default", {
      month: "long",
      year: "numeric"
    });

  const firstDay =
    new Date(year, month, 1).getDay();

  const daysInMonth =
    new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyCell =
      document.createElement("div");

    calendar.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {

    const cell =
      document.createElement("div");

    cell.className = "day";

    const dayTitle =
      document.createElement("strong");

    dayTitle.textContent = day;

    const button =
      document.createElement("button");

    button.textContent = "Add";

    button.addEventListener("click", () => {

      const description =
        prompt("Enter Description");

      if (!description) return;

      const amount =
        prompt("Enter Amount");

      if (!amount) return;

      const entry =
        document.createElement("div");

      entry.style.marginTop = "5px";
      entry.style.color = "green";

      entry.innerHTML =
        `${description}<br>$${amount}`;

      cell.appendChild(entry);
    });

    cell.appendChild(dayTitle);
    cell.appendChild(document.createElement("br"));
    cell.appendChild(button);

    calendar.appendChild(cell);
  }

  loadRecurringItems();
}

// =====================
// MONTH NAVIGATION
// =====================

document.getElementById("prevMonth")
.addEventListener("click", () => {

  currentDate.setMonth(
    currentDate.getMonth() - 1
  );

  renderCalendar();
});

document.getElementById("nextMonth")
.addEventListener("click", () => {

  currentDate.setMonth(
    currentDate.getMonth() + 1
  );

  renderCalendar();
});

// =====================
// START
// =====================

renderCalendar();