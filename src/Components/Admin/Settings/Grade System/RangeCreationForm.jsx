import React, { useState } from "react";
import userGradeStore from "../../../../store/gradeStore";
import { toast } from "react-toastify";
import {
  createRange,
  removeGradeRanges,
} from "../../../../services/gradingApis/gradingApi";
import { handleError } from "../../../../utils/toast";


const RangeCreationForm = () => {
  const {
    grades,
    ranges,
    setRanges,
    setOpenForm,
    setGradeName,
    gradeId,
    rangeStart,
    setRangeStart,
    rangeEnd,
    setRangeEnd,
    label,
    setLabel,
  } = userGradeStore();

  

  const createRangeHandler = async () => {

    if (!label) {
      handleError({errors:"Please enter a label"});
      return;
    }


    if (+rangeStart > +rangeEnd) {
      handleError({errors:"Please enter a valid range"});
      return;
    }

    
    //main logic to create grade
    if (+rangeStart <= +rangeEnd) {
      const rangeData = await createRange({
        grade_id: gradeId,
        label,
        startRange: rangeStart,
        endRange: rangeEnd,
      });

      console.log(rangeData);
      if (rangeData) {
        setRanges([
          ...ranges,
          {
            _id: rangeData.range._id,
            label,
            startRange: rangeStart,
            endRange: rangeEnd,
          },
        ]);
      }

      setRangeStart("");
      setRangeEnd("");
      setLabel("");
    }


  };

  return (

    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-4xl">
      <button
        onClick={() => {
          setOpenForm(false);
          setGradeName("");
          setRangeStart("");
          setRangeEnd("");
          setLabel("");
        }}
        className="text-xl float-right text-gray-600 dark:text-gray-300"
      >
        ❌
      </button>
      <div className="">
        {/* Left Section: Form to create grades */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-2">
          <div className="flex items-center space-x-4">
            {/* Grade Label Input */}
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium">
                Label
              </label>

              {/* //selctable dropdown */}
              <select
                value={label}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-300 dark:focus:border-blue-400"
                onChange={(e) => setLabel(e.target.value)}
                required
              >
                <option>Choose option</option>
                <option value="competent">competent</option>
                <option value="not-competent">not-competent</option>
              </select>
            </div>

            {/* Start Range Input */}
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium">
                Start Range
              </label>
              <input
                type="number"
                value={rangeStart}
                min={0} // // Ensures the minimum value is 0
                onChange={(e) => {
                  
                  if (e.target.value < 0) {
                    handleError({
                      errors: "Starting range cannot be less than 0",
                    });
                    return;
                  }
                  setRangeStart(e.target.value);
                }}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-300 dark:focus:border-blue-400"
                placeholder="Enter start range"
              />
            </div>

            {/* End Range Input */}
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium">
                End Range
              </label>
              <input
                type="number"
                value={rangeEnd}
                max={10} //ensure max value is 10
                onChange={(e) => setRangeEnd(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-300 dark:focus:border-blue-400"
                placeholder="Enter end range"
              />
            </div>

            {/* Create Range Button */}
            <button
              onClick={createRangeHandler}
              className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            >
              Create Range
            </button>
          </div>
        </div>

        {/* Right Section: Display Created Grades */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Ranges
          </h2>
          {grades.length > 0 ? (
            <ul className="space-y-4">
              {ranges?.map((grade, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white dark:bg-gray-800 text-lg text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                  <div className="font-medium">{grade.label}</div>
                  <div className="flex-1 text-center text-gray-600 dark:text-gray-400">
                    ({grade.startRange} - {grade.endRange})
                  </div>

                  <div className="flex space-x-3">
                    

                    <button
                      onClick={async () => {
                        try {
                          const response = await removeGradeRanges(grade._id); // await the result of removeGrading

                          if (response) {
                            // Only remove the grade from the UI if the API call was successful
                            setRanges(
                              ranges.filter((g) => g._id !== grade._id)
                            );
                          } else {
                            handleError({
                              errors:
                                "Cannot remove grade ranges from a assessment with associated assignments",
                            });
                          }
                        } catch (error) {
                          handleError({
                            errors:
                              "Cannot remove grade ranges from a assessment with associated assignments",
                          });
                          console.error("Error during grade removal:", error);
                        }
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No grades created yet.
            </p>
          )}
        </div>
      </div>

      


    </div>
    
  );
};

export default RangeCreationForm;
