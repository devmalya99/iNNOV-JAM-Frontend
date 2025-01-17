const AssessmentSkeleton = () => {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
          </div>
  
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Generate 3 skeleton cards */}
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
  
                {/* Questions Section */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((qIndex) => (
                      <div key={qIndex} className="flex items-start gap-2">
                        <div className="w-4 h-4 mt-1 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                      </div>
                    ))}
                    <div className="pl-6">
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
  
                {/* Card Footer */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default AssessmentSkeleton