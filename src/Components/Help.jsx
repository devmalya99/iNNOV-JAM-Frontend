import React, { useState } from "react";

const ResizableComponent = () => {
  const [width, setWidth] = useState(300); // Initial width

  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent default behavior for smoother dragging
    const startX = e.clientX;
    const startWidth = width;

    const handleMouseMove = (moveEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      setWidth(Math.max(newWidth, 100)); // Minimum width of 100px
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (

    <div className="flex">
    <div
      className="relative border bg-gray-500 dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-md"
      style={{ width: `${width}px`, minWidth: "100px" }}
    >
      <div className="content p-4 text-white">
        This is a resizable component! Drag the handle to resize.
      </div>
      <div
        className="resize-handle absolute top-0 bottom-0 right-0 w-2 cursor-ew-resize bg-green-200 dark:bg-gray-900"
        onMouseDown={handleMouseDown}
      />
    </div>

    <div>
        
    <div
        className="resize-handle absolute top-0 bottom-0 right-0 w-2 cursor-ew-resize bg-green-200 dark:bg-gray-900"
        onMouseDown={handleMouseDown}
      /></div>

      <div
      className="relative border bg-gray-500 dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-md"
      style={{ width: `${width}px`, minWidth: "100px" }}
    >
      <div className="content p-4 text-white">
        This is a resizable component! Drag the handle to resize.
      </div>
      <div
        className="resize-handle absolute top-0 bottom-0 right-0 w-2 cursor-ew-resize bg-green-200 dark:bg-gray-900"
        onMouseDown={handleMouseDown}
      />
    </div>

    <div className="content p-4 text-white border-2">
        This is a resizable component! Drag the handle to resize.
      </div>



    

    </div>
  );
};

export default ResizableComponent;
