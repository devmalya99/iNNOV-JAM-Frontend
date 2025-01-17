import React from 'react';
import { FileText, Download, Eye, ChevronRight, Book, HelpCircle, Loader } from 'lucide-react';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useFetchAllAssessments } from '../../services/fetchAllAssessments';
import AssessmentSkeleton from '../AssessmentsSkeleton';

// PDF Document Component
const AssessmentPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Assessment Details Report</Text>
        <Text style={styles.subtitle}>Generated on {new Date().toLocaleDateString()}</Text>
      </View>
      {data?.map((assessment, index) => (
        <View key={index} style={styles.assessmentSection}>
          <Text style={styles.sectionTitle}>
            Assessment Type: {capitalizeWords(assessment.assessment_type)}
          </Text>
          <Text style={styles.context}>Context: {assessment.case_study_context}</Text>
          <Text style={styles.questionsHeader}>Questions:</Text>
          {assessment.data.map((question, idx) => (
            <View key={idx} style={styles.question}>
              <Text style={styles.questionText}>
                Q{question.question_number}: {question.question}
              </Text>
              <Text style={styles.instruction}>
                Instruction: {question.question_instruction}
              </Text>
              <Text style={styles.feedback}>
                Feedback: {question.feedback || 'No feedback provided'}
              </Text>
              <Text style={styles.suggestion}>
                Suggested Answer: {question.suggested_answer || 'No suggested answer provided'}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica' },
  header: { marginBottom: 30 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 12, color: '#666' },
  assessmentSection: { marginBottom: 25, borderBottom: 1, borderColor: '#eee', paddingBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  context: { fontSize: 12, marginBottom: 15 },
  questionsHeader: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  question: { marginBottom: 15, marginLeft: 15 },
  questionText: { fontSize: 12, marginBottom: 5 },
  instruction: { fontSize: 10, color: '#666', marginBottom: 3 },
  feedback: { fontSize: 10, color: '#444' },
  suggestion: { fontSize: 10, color: '#2c3e50' },
});

// Helper function to capitalize headings
const capitalizeWords = (str) =>
  str
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

const AssessmentDashboard = () => {
  const { data, isLoading, error } = useFetchAllAssessments();

  const generatePDF = async (assessmentData) => {
    try {
      const blob = await pdf(<AssessmentPDF data={[assessmentData]} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Assessment_${assessmentData.assessment_type}_${new Date()
        .toISOString()
        .split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  // Loading, error, and no data states remain unchanged...

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      

      { isLoading ?
        (<AssessmentSkeleton/>)
        :
        (
          <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                Assessment Dashboard
              </h1>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Total Assessments: {data?.length}
            </div>
          </div>
  
          {/* Assessment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((assessment, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 overflow-hidden w-[300px] h-[400px] mx-auto"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Book className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 truncate">
                      {capitalizeWords(assessment?.assessment_type)}
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 h-8">
                    {assessment?.case_study_context}
                  </p>
                </div>
  
                {/* Questions Section */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <HelpCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300">Questions</h3>
                  </div>
                  <div className="space-y-3">
                    {assessment.data.slice(0, 3).map((q, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-1" />
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                          Q{q.question_number}: {q.question}
                        </p>
                      </div>
                    ))}
                    {assessment.data.length > 3 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic pl-6">
                        +{assessment?.data.length - 3} more questions
                      </p>
                    )}
                  </div>
                </div>
  
                {/* Card Footer */}
                <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => generatePDF(assessment)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        )
      }
      
      
      
     
    </div>
  );
};

export default AssessmentDashboard;
