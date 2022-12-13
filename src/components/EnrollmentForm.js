import UserForm from "./UserForm";
import PaymentForm from "./PaymentForm";

function EnrollmentForm() {
  return (
    <div className="w-full flex justify-evenly items-center flex-col lg:flex-row md:flex-row">
      <UserForm />
      <PaymentForm />
    </div>
  );
}

export default EnrollmentForm;
