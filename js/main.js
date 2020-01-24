let btnGetPayment = document.querySelector('#start');
let input = document.querySelectorAll('.expenses-item');
let dayBudget = document.querySelector('.daybudget-value'),
    budget = document.querySelector('.budget-value'),
    level = document.querySelector('.level-value'),
    expenses = document.querySelector('.expenses-value'),
    optionalExpenses = document.querySelector('.optionalexpenses-value'),
    income = document.querySelector('.income-value'),
    monthSavings = document.querySelector('.monthsavings-value'),
    yearSavings = document.querySelector('.yearsavings-value');
let buttons = document.querySelectorAll('button');
let btnYesFirst = buttons[0];
let btnYesSecond = buttons[1];
let btnPayment = buttons[2];
let inputOptionalExpenses = document.querySelectorAll('.optionalexpenses-item');

let chooseIncome = document.querySelector('.choose-income');
let savingsToogle = document.querySelector('#savings');
let chooseSum = document.querySelector('.choose-sum');
let choosePercent = document.querySelector('.choose-percent');
let year = document.querySelector('.year-value');
let month = document.querySelector('.month-value');
let day = document.querySelector('.day-value');

btnGetPayment.addEventListener('click',function(){
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }


    appData.budget = money;
    appData.timeData = time;
    budget.textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;    
    day.value = new Date(Date.parse(time)).getDate();
});

let globalSum = 0;

btnYesFirst.addEventListener('click',function(){
    if(money != undefined) {
        let sum = 0;

        for (let i = 0; i < input.length; i++) {
            a = input[i].value;
            b = input[++i].value;

            if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
                console.log("Всё верно");
                appData.expenses[a] = b;
                sum += +b;
            } else {
                i = i - 1;
            }
        }
        expenses.textContent = sum;
        globalSum = sum;
    } else {alert("Нажмите кнопку 'Начать расчет'");
    };
});

btnYesSecond.addEventListener('click',function(){
    if(money != undefined) {
        for(let i = 0; i < inputOptionalExpenses.length; i++){
            let opt = inputOptionalExpenses[i].value;
            appData.optionalExpenses[i] = opt;
            optionalExpenses.textContent += appData.optionalExpenses[i] + ' ';
        }
    } else {alert("Нажмите кнопку 'Начать расчет'");
    };
});

btnPayment.addEventListener('click',function(){
    if(money != undefined) {
            if (appData.budget != undefined){
            appData.moneyPerDay = ((appData.budget - globalSum) / 30).toFixed();
            dayBudget.textContent = appData.moneyPerDay;
            if (appData.moneyPerDay < 100) {
                level.textContent = "Минимальный уровень достатка";
            } else if (appData.moneyPerDay > 100 && appData.moneyPerDay <= 2000) {
                level.textContent = "Средний уровень достатка";
            } else if (appData.moneyPerDay > 2000) {
                level.textContent = "Высокий уровень достатка";
            } else {
                level.textContent = "Произошла ошибка!";
            }
            } else {
                dayBudget.textContent = "Произошла ошибка";
            }
    } else {alert("Нажмите кнопку 'Начать расчет'");
    };
});

chooseIncome.addEventListener('input',function(){
    if(money != undefined) {
        let items = chooseIncome.value;
        appData.income = items.split(',');
        income.textContent = appData.income;
    } else {alert("Нажмите кнопку 'Начать расчет'");
    };
});

savingsToogle.addEventListener('click',function(){
    if(money != undefined) {
        if(appData.savings == true){
            appData.savings = false;
        } else {
            appData.savings = true;
        }
    } else {alert("Нажмите кнопку 'Начать расчет'");
    };
});

chooseSum.addEventListener('input',function(){
    if(money != undefined) {
        if(appData.savings == true){
            let sum = +chooseSum.value,
                percent = +choosePercent.value;
                appData.monthIncome = sum / 100 / 12 * percent;
                appData.yearIncome = sum / 100 * percent;

                monthSavings.textContent = appData.monthIncome.toFixed(1);
                yearSavings.textContent = appData.yearIncome.toFixed(1);
        }
    } else {alert("Нажмите кнопку 'Начать расчет'");
    };
});

choosePercent.addEventListener('input',function(){
    if(money != undefined) {
        if(appData.savings == true){
            let sum = +chooseSum.value,
            percent = +choosePercent.value;
            appData.monthIncome = sum / 100 / 12 * percent;
            appData.yearIncome = sum / 100 * percent;

            monthSavings.textContent = appData.monthIncome.toFixed(1);
            yearSavings.textContent = appData.yearIncome.toFixed(1);
        }
    } else {alert("Нажмите кнопку 'Начать расчет'");
    };
});

let a, b, money, time, items;

let appData = {
    budget: money,
    timeData: time,
    expenses: a + ": " + b,
    optionalExpenses: [],
    income: [],
    savings: false,
    monthIncome: "",
    yearIncome: "",    
};
