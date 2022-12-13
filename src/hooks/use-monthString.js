function useMonthString() {
  function getCurrentMonthString(curDate) {
    let curMonth = curDate.getMonth() + 1;
    if (curMonth <= 9) {
      curMonth = "0" + curMonth;
    }
    const curYear = curDate.getFullYear();
    const monthString = curYear + "-" + curMonth;

    return monthString;
  }

  function getNextMonthString(curDate) {
    let curMonth = curDate.getMonth() + 1;
    let nextMonth = curMonth + 1;
    let nextYear = curDate.getFullYear();
    if (curMonth === 12) {
      nextMonth = 1;
      nextYear += 1;
    }

    if (nextMonth <= 9) {
      nextMonth = "0" + nextMonth;
    }

    const monthString = nextYear + "-" + nextMonth;
    return monthString;
  }

  return {
    getCurrentMonthString,
    getNextMonthString,
  };
}

export default useMonthString;
