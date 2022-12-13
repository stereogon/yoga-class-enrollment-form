import Dropdown from "./Dropdown";
import Button from "./Button";
import Panel from "./Panel";
import Error from "./Error";
import InputField from "./InputField";
import { GrYoga } from "react-icons/gr";
import FormContext from "../contexts/formContext";
import ErrorContext from "../contexts/errorContext";
import { useContext } from "react";

function UserForm() {
  const {
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
    onMonthChange,
    handleSubmit,
    enrollSuccess,
  } = useContext(FormContext);

  const {
    mobileError,
    batchError,
    genderError,
    monthError,
    ageError,
    doubleEnrollError,
    payPrevError,
  } = useContext(ErrorContext);

  return (
    <Panel className="p-10 w-96 my-10">
      <form onSubmit={handleSubmit}>
        <h1 className="text-5xl font-bold mb-10 flex">
          Enroll Now <GrYoga />
        </h1>
        <div className="field-container">
          <label>First Name</label>
          <InputField
            onChange={onFirstNameChange}
            value={firstName}
            type="text"
            placeholder="First Name"
            required
          />
        </div>
        <div className="field-container">
          <label>Last Name</label>
          <InputField
            onChange={onLastNameChange}
            value={lastName}
            placeholder="Last Name"
            type="text"
          />
        </div>
        <div className="field-container">
          <label>Age</label>
          <InputField
            onChange={onAgeChange}
            value={age || ""}
            type="number"
            min={18}
            max={65}
            placeholder="Enter Age"
            required
          />

          {ageError && <Error>{ageError}</Error>}
        </div>
        <div className="field-container">
          <label>Mobile</label>
          <InputField
            onChange={onMobileChange}
            value={mobile}
            type="text"
            placeholder="00000-00000"
            required
          />

          {mobileError && <Error>{mobileError}</Error>}
        </div>
        <div className="field-container">
          <label>Gender</label>
          <Dropdown
            options={genderOptions}
            value={gender}
            onChange={onGenderChange}
            required
            tailwindWidth={60}
          />

          {genderError && <Error>{genderError}</Error>}
        </div>
        <div className="field-container">
          <label>Batch</label>
          <Dropdown
            options={batchOptions}
            value={batch}
            onChange={onBatchChange}
            required
            tailwindWidth={60}
          />

          {batchError && <Error>{batchError}</Error>}
        </div>
        <div className="field-container">
          <label>Month</label>
          <InputField
            type="month"
            onChange={onMonthChange}
            value={month}
            min={curMonthString}
            max={nextMonthString}
          ></InputField>

          {monthError && <Error>{monthError}</Error>}
        </div>
        <div className="field-container">
          <Button
            className="self-start text-xl rounded focus:ring hover:bg-blue-400"
            primary
          >
            Enroll
          </Button>
        </div>
      </form>
      {enrollSuccess && (
        <Panel className="bg-green-200">Enrollment Successfull</Panel>
      )}
      {doubleEnrollError && <Error>{doubleEnrollError}</Error>}
      {payPrevError && <Error>{payPrevError}</Error>}
    </Panel>
  );
}

export default UserForm;
