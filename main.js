///////////////////////////
///// variable bank ///////
const body = document.querySelector('body');
const inputForm = document.querySelectorAll('.inputs');
const submitButton = document.getElementById('submit-button')
const monthResult = document.getElementById('months-result');
const dayResult = document.getElementById('days-result');
const yearResult = document.getElementById('years-result');



function getValues() {
  const inputValues = [];
  inputForm.forEach((item) => {
  inputValues.push(item.value)
  })
  return inputValues;
}
const now = new Date();

function getDaysInMonth(month, year) {
    let numOfDays = 0;
    switch (month) {
      case 1:
        numOfDays = 31;
        break;
      case 2:
        year % 4 !== 0 ? numOfDays = 28 : numOfDays = 29;
        break;
      case 3:
        numOfDays = 31;
        break;
      case 4:
        numOfDays = 30;
        break;
      case 5:
        numOfDays = 31;
        break;
      case 6:
        numOfDays = 30;
        break;
      case 7:
        numOfDays = 31;
        break;
      case 8:
        numOfDays = 31;
        break;
      case 9:
        numOfDays = 30;
        break;
      case 10:
        numOfDays = 31;
        break;
      case 11:
        numOfDays = 30;
        break;
      case 12:
        numOfDays = 31;
        break;
      default: numOfDays = 30;
  }
  return numOfDays;
}

function output() {
  const values = getValues();
  const userMonth = parseInt(values[0]);
  const userDay = parseInt(values[1]);
  const userYear = parseInt(values[2]);
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDay();
  const currentYear = now.getFullYear();
  
  const dayDiff = currentDay - userDay;
  const monthDiff = currentMonth - userMonth;
  const yearDiff = currentYear - userYear;

  const daysOfUserMonth = getDaysInMonth(userMonth, userYear);
  const daysOfCurrentMonth = getDaysInMonth(currentMonth, currentYear);
  let finalMonthNum;
  let finalDayNum;
  let finalYearNum;

///////////////////////////////////////
/////future date prevention////////////
  if (userYear > currentYear) {
    alert(`My AI can't predict the future yet. The date needs to be a day that already happened in our linear view of time.`)
  }
  if (userYear == currentYear && userMonth > currentMonth) {
    alert(`My AI can't predict the future yet. The date needs to be a day that already happened in our linear view of time.`)
  }
  if (userYear == currentYear && userMonth == currentMonth && userDay > currentDay) {
    alert(`My AI can't predict the future yet. The date needs to be a day that already happened in our linear view of time.`)
  }
//////////////////////////////////////
/////setting up cases and results/////////////////////
  if (userYear == currentYear) {
    finalYearNum = 0;
  }  ////2022     2023           04           05
  if (userYear < currentYear && userMonth < currentMonth) {
    if (userDay < currentDay) {
        finalMonthNum = 0 + monthDiff;
        finalDayNum = currentDay - userDay;
      }
    if (userMonth < currentMonth && userDay > currentDay) {
    finalMonthNum = 0 + monthDiff - 1;
    finalDayNum = daysOfUserMonth - (userDay - currentDay);
  }
    finalYearNum = yearDiff;
  }
  if (userYear < currentYear && userMonth > currentMonth) {
    if (userDay == currentDay) {
      finalMonthNum = 12 + (userMonth - currentMonth);
      finalDayNum = 0;
    }
    if (userDay > currentDay) {
    finalMonthNum = 12 + monthDiff - 1;
    finalDayNum = daysOfUserMonth - (userDay - currentDay);
    }
    if (userDay < currentDay) {
        finalMonthNum = 12 - (userMonth - currentMonth);
        finalDayNum = currentDay - userDay;
      }
  finalYearNum = yearDiff - 1;
  }
  if (userYear < currentYear && userMonth == currentMonth) {
      /////birthday alert//////////
    if (userDay == currentDay) {
      finalDayNum = 0;
      finalMonthNum = 0;
      finalYearNum = yearDiff;
      alert(`HAPPY BIRTHDAY!!!!!!!! You are ${finalYearNum} today!!!!`);
    }
    if (userDay > currentDay)  {
      finalMonthNum = 11;
      finalDayNum = (daysOfCurrentMonth - userDay) + currentDay;
      finalYearNum = yearDiff - 1;
    }
    if (userDay < currentDay) {
      finalMonthNum = 0;
      finalDayNum = currentDay - userDay;
      finalYearNum = yearDiff;
    } 
  }
////////////////////////////////////
////////////////////////////////////
  const result = [finalMonthNum, finalDayNum, finalYearNum];
  if (finalMonthNum == undefined || finalDayNum == undefined || finalYearNum == undefined) {
    alert(`All three fields must have a numeric value for this to work, because it wasn't worth doing some weird thing to make it auto-complete`)
    finalYearNum = 'put'
    finalMonthNum = 'in'
    finalDayNum = 'numbers'
  }

  monthResult.innerHTML = finalMonthNum;
  dayResult.innerHTML = finalDayNum;
  yearResult.innerHTML = finalYearNum;

  return result;
}



submitButton.addEventListener('click', output);
