import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const alertStyles = {
  error: {
    icon: <AiOutlineCloseCircle className="text-red-600 text-xl" />,
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-l-4 border-red-600",
  },
  success: {
    icon: <AiOutlineCheckCircle className="text-green-600 text-xl" />,
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-l-4 border-green-600",
  },
  loading: {
    icon: (
      <AiOutlineLoading3Quarters className="animate-spin text-blue-600 text-xl" />
    ),
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-l-4 border-blue-600",
  },
};

const AlertMessage = ({ type = "success", message }) => {
  const style = alertStyles[type] || alertStyles.success;

  return (
    <div
      role="alert"
      className={`flex items-center gap-3 p-4 rounded-lg shadow-sm ${style.bg} ${style.text} ${style.border}`}
    >
      <span className="flex-shrink-0">{style.icon}</span>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default AlertMessage;