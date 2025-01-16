

import { motion } from "framer-motion";
import { Shield, CheckCircle2, XCircle, Loader2 } from "lucide-react";



const AuthenticationLoader = ({stage}) => {
  

    const fadeInOut = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
      };

  
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-full max-w-md p-6">
      <div className="flex flex-col items-center space-y-6">
        <motion.div
          className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Shield className="w-8 h-8 text-blue-600" />
        </motion.div>

        <div className="space-y-4 w-full">
          {stage === 'checking' && (
            <motion.div {...fadeInOut} className="flex items-center space-x-3">
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              <span className="text-gray-600">Checking authentication...</span>
            </motion.div>
          )}

          {stage === 'validating' && (
            <motion.div {...fadeInOut} className="flex items-center space-x-3">
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              <span className="text-gray-600">Validating security token...</span>
            </motion.div>
          )}

          {stage === 'success' && (
            <motion.div {...fadeInOut} className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-gray-600">Authentication successful!</span>
            </motion.div>
          )}

          {stage === 'failed' && (
            <motion.div {...fadeInOut} className="flex items-center space-x-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-gray-600">Authentication failed</span>
            </motion.div>
          )}

          <motion.div 
            className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: "0%" }}
              animate={{ 
                width: stage === 'failed' ? "100%" : 
                       stage === 'success' ? "100%" : 
                       "60%" 
              }}
              transition={{ duration: 1.5 }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AuthenticationLoader