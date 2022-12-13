import { useState, useContext } from "react";
import Panel from "./Panel";
import Error from "./Error";
import Button from "./Button";
import InputField from "./InputField";
import ErrorContext from "../contexts/errorContext";
import { GoChevronDown } from "react-icons/go";
import axios from "axios";

function Program({ month, paid, id, batchId }) {
  const [isPaid, setIsPaid] = useState(paid);
  const [creditBoxShow, setCreditBoxShow] = useState(false);
  const [cardNo, setCardNo] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cvv, setCvv] = useState("");
  const [payError, setPayError] = useState("");
  const { showError } = useContext(ErrorContext);

  const handleChevronClick = () => {
    setCreditBoxShow((prevCreditBoxShow) => {
      return !prevCreditBoxShow;
    });
  };

  const handleCardChange = (value) => {
    setCardNo(value);
  };

  const handleCardHolderChange = (value) => {
    setCardHolder(value);
  };

  const handleCvvChange = (value) => {
    setCvv(value);
  };

  const handlePay = async (id, cardNo, cardHolder, cvv) => {
    try {
      const response = await axios.post(
        `https://yoga-class-enrollment-form-server.onrender.com/users/pay-enroll/${id}`,
        {
          cardHolder,
          cardNo,
          cvv,
        }
      );
      if (response.status === 200) {
        console.log(response);
        setIsPaid(true);
        setCreditBoxShow(false);
      }
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;
      if (errors.payError) {
        showError(setPayError, errors.payError);
      }
    }
  };

  return (
    <>
      <Panel className="shadow-none bg-sky-100 mb-2">
        <div className="flex items-center justify-between">
          <h1>{month}</h1>
          <p className="text-sm font-light text-gray-400">#{id}</p>
          <p>{batchId}</p>
          <div>
            {isPaid ? (
              <Button disabled={true}>Paid</Button>
            ) : (
              <GoChevronDown
                className="cursor-pointer"
                onClick={handleChevronClick}
              />
            )}
          </div>
        </div>
        {creditBoxShow && (
          <div className="mt-2">
            <InputField
              className="mb-2"
              value={cardNo}
              onChange={handleCardChange}
              placeholder="Enter Card No."
            />
            <InputField
              className="mb-2"
              value={cardHolder}
              onChange={handleCardHolderChange}
              placeholder="Card Holder Name"
            />
            <InputField
              className="mb-2"
              onChange={handleCvvChange}
              value={cvv}
              placeholder="CVV"
            />
            <Button
              primary
              onClick={() => handlePay(id, cardNo, cardHolder, cvv)}
            >
              Pay &#8377; 500
            </Button>
          </div>
        )}
        {payError && <Error>{payError}</Error>}
      </Panel>
    </>
  );
}

export default Program;
