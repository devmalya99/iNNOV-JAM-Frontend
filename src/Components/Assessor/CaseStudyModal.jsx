
import { GrClose } from "react-icons/gr";
const CaseStudyModal = ({ isOpen, onClose,context }) => {
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-85 dark:bg-opacity-75">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg max-w-3xl w-full p-8">
        <button
          className="absolute top-4 right-4 text-lg text-gray-100 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
          onClick={onClose}
        >
        <GrClose />
        </button>
        <div>
        <p className="mb-4">
          {context}
        </p>

        <button onClick={onClose} className='button-style'>close</button>

        </div>
       
        
      </div>
    </div>
  );
};


export default CaseStudyModal;
