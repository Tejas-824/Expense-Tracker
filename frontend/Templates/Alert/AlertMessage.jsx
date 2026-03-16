import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const AlertMessage = ({ type, message }) => {
  let icon;
  let bgColor;
  let textColor;
  let borderColor;

  switch (type) {
    case "error":
      icon = <AiOutlineCloseCircle className="text-red-600 text-xl shrink-0" />;
      bgColor = "bg-red-50";
      textColor = "text-red-700";
      borderColor = "border border-red-200";
      break;

    case "success":
      icon = (
        <AiOutlineCheckCircle className="text-green-600 text-xl shrink-0" />
      );
      bgColor = "bg-green-50";
      textColor = "text-green-700";
      borderColor = "border border-green-200";
      break;

    case "loading":
      icon = (
        <AiOutlineLoading3Quarters className="animate-spin text-blue-600 text-xl shrink-0" />
      );
      bgColor = "bg-blue-50";
      textColor = "text-blue-700";
      borderColor = "border border-blue-200";
      break;

    default:
      icon = null;
      bgColor = "";
      textColor = "";
      borderColor = "";
  }

  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-4 py-3 mb-4 shadow-sm ${bgColor} ${textColor} ${borderColor}`}
    >
      {icon}
      <span className="text-sm font-medium leading-relaxed">{message}</span>
    </div>
  );
};

export default AlertMessage;