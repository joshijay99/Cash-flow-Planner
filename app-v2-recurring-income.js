const monthYear = document.getElementById("monthYear");
const calendar = document.getElementById("calendar");

let currentDate = new Date();

// =====================
// RECURRING INCOME DATA
// =====================

const recurringIncome = [
  {
    name: "Rental Income",
    amount: 1200,
    startDate: new Date("2026-01-01"),
    type: "monthly"
  },
  {
    name: "Dimples Paycheque",
    amount: 2020,
    startDate: new Date("2026-06-12"),
    type: "biweekly"
  },
  {
    name: "Jay Paycheque",
    amount: 1200,
    startDate: new Date("2026-06-19"),
    type: "biweekly"
  }
];

// =====================
// CALENDAR
// =====================

function renderCalendar() {
  calendar.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.textContent = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    calendar.appendChild(emptyCell);
  }

  // Create day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.className = "day";

    const dayTitle = document.createElement("strong");
    dayTitle.textContent = day;

    const button = document.createElement("button");
    button.textContent = "Add";

    button.addEventListener("click", function () {
      const description = prompt("Enter Description");
      if (!description) return;

      const amount = prompt("Enter Amount");
      if (!amount) return;

      const entry = document.createElement("div");
      entry.style.marginTop = "5px";
      entry.style.color = "green";
      entry.innerHTML = `${description}<br>$${amount}`;

      cell.appendChild(entry);
    });

    cell.appendChild(dayTitle);
    cell.appendChild(document.createElement("br"));
    cell.appendChild(button);

    calendar.appendChild(cell);
  }

  loadRecurringIncome();
}

// =====================
// RECURRING INCOME
// =====================

function loadRecurringIncome() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const dayBoxes = document.querySelectorAll(".day");

  recurringIncome.forEach(item => {

    // Monthly income (Rental)
    if (item.type === "monthly") {
      const targetDay = 1;

      addIncomeToDay(
        dayBoxes,
        targetDay,
        item.name,
        item.amount
      );
    }

    // Bi-weekly income
    if (item.type === "biweekly") {

      let payDate = new Date(item.startDate);

      while (payDate.getFullYear() <= year + 1) {

        if (
          payDate.getFullYear() === year &&
          payDate.getMonth() === month
        ) {
          addIncomeToDay(
            dayBoxes,
            payDate.getDate(),
            item.name,
            item.amount
          );
        }

        payDate.setDate(payDate.getDate() + 14);
      }
    }
  });
}

// =====================
// HELPER
// =====================

function addIncomeToDay(
  dayBoxes,
  day,
  description,
  amount
) {
  dayBoxes.forEach(box => {

    const dayNumber = box.querySelector("strong");

    if (
      dayNumber &&
      Number(dayNumber.textContent) === day
    ) {
      const entry = document.createElement("div");

      entry.style.marginTop = "5px";
      entry.style.color = "blue";
      entry.style.fontSize = "12px";

      entry.innerHTML =
        `${description}<br>+$${amount}`;

      box.appendChild(entry);
    }
  });
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