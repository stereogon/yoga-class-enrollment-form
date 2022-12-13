import Panel from "./Panel";

function Error({ children }) {
  return <Panel className="bg-red-200">{children}</Panel>;
}

export default Error;
