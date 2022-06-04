const hypothecBtn = document.querySelector(".hypothecBtn");

/*Ежемесячный платеж*/
function month(credSum_arg, rate_arg, period_arg) {
  let monthRate = rate_arg / 12;
  return Math.floor(
    credSum_arg * (monthRate + monthRate / ((1 + monthRate) ** period_arg - 1))
  );
}

/*Сумма кредита*/
function credit(credSum_arg) {
  return Math.floor(credSum_arg);
}

/*Процентная ставка*/
function interestRate(rate_arg) {
  return rate_arg * 100;
}

/*Налоговый вычет*/
function tax(amount_arg) {
  return Math.floor(amount_arg * 0.13);
}

/*Переплата*/
function over(credSum_arg, rate_arg, period_arg, amount_arg) {
  return period_arg * month(credSum_arg, rate_arg, period_arg) - amount_arg;
}

/*Подсчет данных*/
hypothecBtn.addEventListener("click", (e) => {
  const estateValue = document.querySelector(".estateValue").value;
  const rate = document.querySelector(".rate").value / 100;
  const period = document.querySelector(".period").value;
  const amount = document.querySelector(".amount").value;
  const credSum = amount - estateValue;

  month(credSum, rate, period);
  credit(credSum);
  interestRate(rate);
  tax(amount);
  over(credSum, rate, period, amount);

  /*Chart JS*/
  const ctx = document.getElementById("myChart");
  const myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Стоимость недвижимости", "Переплата"],
      datasets: [
        {
          label: "Переплачено",
          data: [tax(amount), over(credSum, rate, period, amount)],
          backgroundColor: [
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 99, 132, 0.5)",
          ],
          borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  /*Вывод данных*/
  document.getElementById("monthlyPayment").innerHTML = month(
    credSum,
    rate,
    period
  );
  document.getElementById("creditAmount").innerHTML = credit(credSum);
  document.getElementById("taxDeduction").innerHTML = tax(amount);
  document.getElementById("overpayment").innerHTML = over(
    credSum,
    rate,
    period,
    amount
  );
});

/*Прокрутка страницы*/
hypothecBtn.addEventListener("click", (e) => {
  const hypothecRange = document.querySelector(".hypothecRange");
  hypothecRange.classList.toggle("hypothecMargin");
  const hypothecInfo = document.querySelector(".hypothecInfo");
  hypothecInfo.classList.toggle("hypothecMargin");
});
