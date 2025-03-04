import toast from "react-hot-toast";


const handleSuccess = ({success}) => {
    toast.success(success);
  };

  const handleError = ({errors}) => {
    toast.error(errors);
  };

  const handlePromise = ({promise}) => {
    toast.promise(promise, {
      loading: 'Loading',
      success: 'Success',
      error: 'Error',
    });
  }

  const handleDarkness = ({msg}) => {
    toast(msg,
      {
        icon: '🌙',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    )
  };


  const handleLightMode = ({msg}) => {
    toast(msg,
      {
        icon: '🌞',
        style: {
          borderRadius: '10px',
          background: '#fff',
          color: '#333',
        },
      }
    )
  };

  export {handleSuccess, handleError,handleDarkness,handlePromise,handleLightMode}