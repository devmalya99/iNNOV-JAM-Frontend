import { toast } from "react-toastify";

const handleSuccess = ({success}) => {
    toast.success(success);
  };

  const handleError = ({errors}) => {
    toast.error(errors);
  };

  export {handleSuccess, handleError}