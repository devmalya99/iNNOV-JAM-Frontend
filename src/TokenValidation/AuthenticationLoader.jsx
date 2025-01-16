import { motion, AnimatePresence } from "framer-motion";
import { Shield, CheckCircle2, XCircle, Loader2 } from "lucide-react";

const AuthenticationLoader = ({ stage }) => {
  const stageConfig = {
    checking: {
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      progress: "33%",
    },
    validating: {
      color: "text-purple-500",
      bgColor: "bg-purple-100",
      progress: "66%",
      transition: { duration: 1, ease: "easeInOut" }
    },
    success: {
      color: "text-green-500",
      bgColor: "bg-green-100",
      progress: "100%",
    },
    failed: {
      color: "text-red-500",
      bgColor: "bg-red-100",
      progress: "100%",
    },
  };

  const currentConfig = stageConfig[stage];

  const fadeInOut = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.8 } // Slower fade transitions
  };

  const messageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.5 } // Slower message transitions
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center space-y-8">
          <motion.div
            className={`w-20 h-20 ${currentConfig.bgColor} rounded-full flex items-center justify-center shadow-inner`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }} // Slower rotation
          >
            <Shield className={`w-10 h-10 ${currentConfig.color}`} />
          </motion.div>

          <div className="space-y-6 w-full">
            <AnimatePresence mode="wait">
              <motion.div 
                key={stage}
                className="h-8 flex items-center justify-center"
                {...messageVariants}
              >
                {stage === 'checking' && (
                  <div className="flex items-center space-x-3">
                    <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                    <span className="text-lg font-medium text-gray-700"> Authenticating...</span>
                  </div>
                )}

                {stage === 'validating' && (
                  <div className="flex items-center space-x-3">
                    <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
                    <span className="text-lg font-medium text-gray-700"> Validating credentials...</span>
                  </div>
                )}

                {stage === 'success' && (
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <span className="text-lg font-medium text-gray-700">Authentication successful!</span>
                  </div>
                )}

                {stage === 'failed' && (
                  <div className="flex items-center space-x-3">
                    <XCircle className="w-6 h-6 text-red-500" />
                    <span className="text-lg font-medium text-gray-700">Authentication failed</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="space-y-2">
              <motion.div 
                className="w-full bg-gray-100 h-3 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className={`h-full ${currentConfig.color.replace('text', 'bg')}`}
                  initial={{ width: "0%" }}
                  animate={{ width: currentConfig.progress }}
                  transition={{ duration: 0.8, ease: "easeInOut" }} // Slower progress bar
                />
              </motion.div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationLoader;