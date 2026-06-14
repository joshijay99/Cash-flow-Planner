// =====================
// DYNAMIC DASHBOARD V6
// =====================

function updateDashboard() {

  const currentBalance =
    Number(
      document.getElementById("currentBalance").value
    ) || 0;

  const today = new Date();

  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(
    sevenDaysLater.getDate() + 7
  );

  let income = 0;
  let expenses = 0;

  let upcomingHtml = "";

  // =====================
  // MONTHLY INCOME
  // =====================

  recurringIncome.forEach(item => {

    const dueDate =
      new Date(
        today.getFullYear(),
        today.getMonth(),
        item.day
      );

    if (
      dueDate >= today &&
      dueDate <= sevenDaysLater
    ) {

      income += item.amount;

      upcomingHtml +=
        `${dueDate.toDateString()}<br>` +
        `${item.name} +$${item.amount}<br><br>`;
    }
  });

  // =====================
  // MONTHLY EXPENSES
  // =====================

  recurringExpenses.forEach(item => {

    const dueDate =
      new Date(
        today.getFullYear(),
        today.getMonth(),
        item.day
      );

    if (
      dueDate >= today &&
      dueDate <= sevenDaysLater
    ) {

      expenses += item.amount;

      upcomingHtml +=
        `${dueDate.toDateString()}<br>` +
        `${item.name} -$${item.amount}<br><br>`;
    }
  });

  // =====================
  // DIMPLES PAY
  // =====================

  let dimplesDate =
    new Date(2026, 5, 12);

  while (dimplesDate <= sevenDaysLater) {

    if (
      dimplesDate >= today
    ) {

      income += 2020;

      expenses += 1261.92;
      expenses += 318.22;

      upcomingHtml +=
        `${dimplesDate.toDateString()}<br>` +
        `Dimples Paycheque +$2020<br>` +
        `Mortgage -$1261.92<br>` +
        `Car Loan -$318.22<br><br>`;
    }

    dimplesDate.setDate(
      dimplesDate.getDate() + 14
    );
  }

  // =====================
  // JAY PAY
  // =====================

  let jayDate =
    new Date(2026, 5, 19);

  while (jayDate <= sevenDaysLater) {

    if (
      jayDate >= today
    ) {

      income += 1200;

      upcomingHtml +=
        `${jayDate.toDateString()}<br>` +
        `Jay Paycheque +$1200<br><br>`;
    }

    jayDate.setDate(
      jayDate.getDate() + 14
    );
  }

  // =====================
  // CALCULATIONS
  // =====================

  const projectedBalance =
    currentBalance +
    income -
    expenses;

  document.getElementById(
    "income7Days"
  ).textContent =
    "$" + income.toFixed(2);

  document.getElementById(
    "expenses7Days"
  ).textContent =
    "$" + expenses.toFixed(2);

  document.getElementById(
    "projectedBalance"
  ).textContent =
    "$" + projectedBalance.toFixed(2);

  document.getElementById(
    "upcomingPayments"
  ).innerHTML =
    upcomingHtml ||
    "No upcoming transactions";

  if (projectedBalance < 0) {

    document.getElementById(
      "warnings"
    ).innerHTML =
      `⚠ Deposit Needed: $${Math.abs(projectedBalance).toFixed(2)}`;

  } else {

    document.getElementById(
      "warnings"
    ).innerHTML =
      "✓ Sufficient Funds";
  }
}

document
  .getElementById("updateBalance")
  .addEventListener(
    "click",
    updateDashboard
  );

updateDashboard();