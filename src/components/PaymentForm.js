import Program from "./Program";
import { GrYoga } from "react-icons/gr";
import Panel from "./Panel";
import Error from "./Error";
import InputField from "./InputField";
import Button from "./Button";
import { Fragment, useState, useContext } from "react";
import axios from "axios";
import ErrorContext from "../contexts/errorContext";

function PaymentForm() {
  const [mobile, setMobile] = useState("");
  const [data, setData] = useState([]);
  const [mobileError, setMobileError] = useState("");
  const { showError } = useContext(ErrorContext);
  const [user, setUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const onMobileChange = (mobile) => {
    setMobile(mobile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `https://yoga-class-enrollment-form-server.onrender.com/users/get-enrolls/${mobile}`
      );

      setData(response.data.enrollments);
      setUser(response.data.user);
      setIsLoaded(true);
    } catch (error) {
      setIsLoaded(false);
      const errors = error.response.data.errors;
      if (errors.payMobile) {
        showError(setMobileError, errors.payMobile);
      }
    }
  };

  const renderedEnrolls = data.map((enrolls) => {
    return (
      <Fragment key={enrolls._id}>
        <Program
          paid={enrolls.isPaid}
          month={enrolls.program.month}
          id={enrolls.id}
          batchId={enrolls.program.batch.batchId}
        />
      </Fragment>
    );
  });

  return (
    <Panel className="p-10 w-96 my-10 lg:self-start md:self-start">
      <form onSubmit={handleSubmit}>
        <h1 className="text-5xl font-bold mb-10 flex">
          Make Payment <GrYoga />
        </h1>
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
          <Button
            className="self-start text-xl rounded focus:ring hover:bg-sky-100"
            primary
            outline
          >
            Show Programs
          </Button>
        </div>
      </form>
      {isLoaded && (
        <Panel className="shadow-blue-500 mb-3">
          <div className="mb-5">
            <h1 className="text-3xl font-bold mb-1">{user.firstName}</h1>
            <h1 className="text-2xl font-bold text-gray-600 mb-1">
              {user.lastName}
            </h1>
            <p className="font-light text-gray-500">
              {user.gender.toUpperCase()} {user.age}
            </p>
          </div>

          <div>{renderedEnrolls}</div>
        </Panel>
      )}
    </Panel>
  );
}

export default PaymentForm;
