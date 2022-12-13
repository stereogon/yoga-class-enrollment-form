import { useContext, createContext, useState } from "react";
import useMonthString from "../hooks/use-monthString";
import axios from "axios";
import ErrorContext from "./errorContext";

const formContext = createContext();

function Provider({ children }) {
  const { getCurrentMonthString, getNextMonthString } = useMonthString();
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  let batchOptions = [
    { startHour: 6, endHour: 7, AMPM: "AM", value: 0 },
    { startHour: 7, endHour: 8, AMPM: "AM", value: 1 },
    { startHour: 8, endHour: 9, AMPM: "AM", value: 2 },
    { startHour: 5, endHour: 6, AMPM: "PM", value: 3 },
  ];

  batchOptions = batchOptions.map((batchh) => {
    return {
      ...batchh,
      label: (() => `${batchh.startHour} - ${batchh.endHour} ${batchh.AMPM}`)(),
    };
  });

  const {
    showError,
    setMonthError,
    setBatchError,
    setGenderError,
    setAgeError,
    setMobileError,
    setDoubleEnrollError,
    setPayPrevError,
  } = useContext(ErrorContext);

  const [gender, setGender] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [mobile, setMobile] = useState("");
  const [batch, setBatch] = useState({});
  const curDate = new Date();
  const curMonthString = getCurrentMonthString(curDate);
  const nextMonthString = getNextMonthString(curDate);
  const [month, setMonth] = useState(curMonthString);
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  const onFirstNameChange = (firstName) => {
    setFirstName(firstName);
  };

  const onLastNameChange = (lastName) => {
    setLastName(lastName);
  };

  const onAgeChange = (age) => {
    setAge(age);
  };

  const onMobileChange = (mobile) => {
    setMobile(mobile);
  };

  const onGenderChange = (gender) => {
    setGender(gender);
  };

  const onBatchChange = (batch) => {
    setBatch(batch);
  };

  const onMonthChange = (month) => {
    setMonth(month);
  };

  const showSuccessStamp = () => {
    setEnrollSuccess(true);
    setTimeout(() => {
      setEnrollSuccess(false);
    }, 2000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://yoga-class-enrollment-form-server.onrender.com/users/enroll-user",
        {
          firstName,
          lastName,
          age,
          mobile,
          gender,
          batch,
          month,
        }
      );

      if (response.status === 201) {
        showSuccessStamp();
        setFirstName("");
        setLastName("");
        setAge(0);
        setBatch({});
        setMonth(curMonthString);
        setGender({});
        setMobile("");
      }
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors.mobile) {
        showError(setMobileError, errors.mobile);
      }
      if (errors.batchId) {
        showError(setBatchError, errors.batchId);
      }
      if (errors.gender) {
        showError(setGenderError, errors.gender);
      }
      if (errors.month) {
        showError(setMonthError, errors.month);
      }
      if (errors.age) {
        showError(setAgeError, errors.age);
      }
      if (errors.doubleEnroll) {
        showError(setDoubleEnrollError, errors.doubleEnroll);
      }
      if (errors.payPrev) {
        showError(setPayPrevError, errors.payPrev);
      }
    }
  };

  const toBeShared = {
    genderOptions,
    batchOptions,
    gender,
    firstName,
    lastName,
    age,
    mobile,
    batch,
    month,
    curMonthString,
    nextMonthString,
    onFirstNameChange,
    onLastNameChange,
    onAgeChange,
    onBatchChange,
    onGenderChange,
    onMobileChange,
    handleSubmit,
    onMonthChange,
    enrollSuccess,
  };

  return (
    <formContext.Provider value={toBeShared}>{children}</formContext.Provider>
  );
}

export { Provider };
export default formContext;
