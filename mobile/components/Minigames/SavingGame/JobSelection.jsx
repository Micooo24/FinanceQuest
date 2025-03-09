import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  StatusBar 
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');
// Calculate responsive sizes based on screen dimensions
const scale = Math.min(width, height) / 375; // Base scale on smaller dimension
const moderateScale = (size) => size + (scale - 1) * 0.5 * size;

const jobs = [
  {
    title: "FACTORY WORKER",
    category: "CONTRACTUAL",
    description: "₱3,000/week (Contractual, no benefits)",
    pay: 3000,
    hours: "Contractual",
    incomeTax: 0,
    sss: 203,
    pagibig: 46,
    philhealth: 113,
    totalDeductions: 362,
    risks: "No job security, no benefits, long working hours, repetitive physical tasks, and potential health hazards from factory conditions."
  },
  {
    title: "CALL CENTER AGENT",
    category: "NIGHT SHIFTS",
    description: "₱4,500/week (Night shifts, high stress)",
    pay: 4500,
    hours: "Night shifts",
    incomeTax: 138,
    sss: 208,
    pagibig: 46,
    philhealth: 137,
    totalDeductions: 529,
    risks: "Sleep disruption, high stress levels, vocal strain, sedentary lifestyle, and mental health challenges from difficult customers."
  },
  {
    title: "HOUSE HELPER",
    category: "FULL-TIME",
    description: "₱5,000/week (Full-time, no day-offs)",
    pay: 5000,
    hours: "Full-time",
    incomeTax: 38,
    sss: 208,
    pagibig: 46,
    philhealth: 125,
    totalDeductions: 417,
    risks: "No days off, physically demanding, personal boundaries issues, limited career growth, and dependence on employer's household."
  },
  {
    title: "OVERSEAS FILIPINO WORKER (OFW)",
    category: "REMOTELY",
    description: "₱7,500/week (BUT has remittances to send)",
    pay: 7500,
    hours: "Flexible",
    incomeTax: 538,
    sss: 208,
    pagibig: 46,
    philhealth: 187,
    totalDeductions: 979,
    risks: "Family separation, cultural adjustment, potential exploitation, homesickness, and need to send significant portion of earnings as remittances."
  },
];

const JobSelection = ({ onSelectJob }) => {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <View style={styles.safeArea}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <FontAwesome5 name="briefcase" size={moderateScale(32)} color="#9370DB" />
          <Text style={styles.header}>Choose Your Career</Text>
        </View>
        <Text style={styles.subHeader}>Your job will determine your income and challenges</Text>

        {jobs.map((job, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.jobCard,
              selectedJob === job && styles.selectedJobCard,
            ]}
            onPress={() => setSelectedJob(job)}
          >
            <View style={styles.jobHeader}>
              <View style={styles.jobTitleContainer}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobCategory}>{job.category}</Text>
              </View>
              <View style={[styles.payBadge, {backgroundColor: selectedJob === job ? '#7B68EE' : '#9370DB'}]}>
                <Text style={styles.payText}>₱{job.pay}</Text>
              </View>
            </View>
            <Text style={styles.jobDescription}>{job.description}</Text>
          </TouchableOpacity>
        ))}

        {selectedJob && (
          <View style={styles.detailsCard}>
            <Text style={styles.detailsTitle}>Job Details</Text>
            
            <View style={styles.taxSection}>
              <Text style={styles.taxHeader}>Weekly Deductions:</Text>
              <View style={styles.taxRow}>
                <Text style={styles.taxLabel}>Income Tax:</Text>
                <Text style={styles.taxValue}>₱{selectedJob.incomeTax}</Text>
              </View>
              <View style={styles.taxRow}>
                <Text style={styles.taxLabel}>SSS:</Text>
                <Text style={styles.taxValue}>₱{selectedJob.sss}</Text>
              </View>
              <View style={styles.taxRow}>
                <Text style={styles.taxLabel}>Pag-IBIG:</Text>
                <Text style={styles.taxValue}>₱{selectedJob.pagibig}</Text>
              </View>
              <View style={styles.taxRow}>
                <Text style={styles.taxLabel}>PhilHealth:</Text>
                <Text style={styles.taxValue}>₱{selectedJob.philhealth}</Text>
              </View>
              <View style={styles.taxRow}>
                <Text style={styles.taxTotal}>Total Deductions:</Text>
                <Text style={styles.taxTotalValue}>₱{selectedJob.totalDeductions}</Text>
              </View>
            </View>
            
            <View style={styles.riskSection}>
              <Text style={styles.riskHeader}>Job Risks:</Text>
              <Text style={styles.riskText}>{selectedJob.risks}</Text>
            </View>
            
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => onSelectJob(selectedJob)}
            >
              <Text style={styles.continueButtonText}>Accept This Job</Text>
              <Icon name="arrow-forward" size={moderateScale(24)} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.footerSpace} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFAFA',
  },
  container: {
    flex: 1,
    padding: moderateScale(24),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(16),
    marginTop: moderateScale(24),
  },
  header: {
    fontSize: moderateScale(30),
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: moderateScale(12),
  },
  subHeader: {
    fontSize: moderateScale(18),
    color: '#555555',
    marginBottom: moderateScale(30),
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    padding: moderateScale(20),
    borderRadius: moderateScale(16),
    marginBottom: moderateScale(16),
    borderWidth: 1,
    borderColor: 'rgba(143, 123, 232, 0.3)',
    elevation: 4,
    shadowColor: "#8F7BE8",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  selectedJobCard: {
    backgroundColor: '#F9F6FF',
    borderColor: '#8F7BE8',
    borderWidth: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  jobTitleContainer: {
    flex: 1,
  },
  jobTitle: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#333333',
  },
  jobCategory: {
    fontSize: moderateScale(16),
    color: '#8F7BE8',
    marginTop: moderateScale(4),
  },
  payBadge: {
    backgroundColor: '#8F7BE8',
    borderRadius: moderateScale(24),
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(14),
  },
  payText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
  jobDescription: {
    fontSize: moderateScale(16),
    color: '#555555',
    lineHeight: moderateScale(22),
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    padding: moderateScale(24),
    borderRadius: moderateScale(20),
    marginTop: moderateScale(24),
    marginBottom: moderateScale(16),
    borderWidth: 1,
    borderColor: 'rgba(143, 123, 232, 0.5)',
    elevation: 8,
    shadowColor: "#8F7BE8",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  detailsTitle: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: moderateScale(20),
    textAlign: 'center',
  },
  taxSection: {
    marginBottom: moderateScale(24),
    backgroundColor: 'rgba(143, 123, 232, 0.1)',
    padding: moderateScale(18),
    borderRadius: moderateScale(14),
  },
  taxHeader: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: moderateScale(12),
  },
  taxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(8),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(143, 123, 232, 0.2)',
  },
  taxLabel: {
    fontSize: moderateScale(16),
    color: '#555555',
  },
  taxValue: {
    fontSize: moderateScale(16),
    color: '#555555',
  },
  taxTotal: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#333333',
  },
  taxTotalValue: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#8F7BE8',
  },
  riskSection: {
    marginBottom: moderateScale(24),
    backgroundColor: 'rgba(255,99,99,0.1)',
    padding: moderateScale(18),
    borderRadius: moderateScale(14),
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B6B',
  },
  riskHeader: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: moderateScale(12),
  },
  riskText: {
    fontSize: moderateScale(16),
    color: '#555555',
    lineHeight: moderateScale(22),
  },
  continueButton: {
    backgroundColor: '#8F7BE8',
    padding: moderateScale(18),
    borderRadius: moderateScale(14),
    marginTop: moderateScale(12),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: "#8F7BE8",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  continueButtonText: {
    color: 'white',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginRight: moderateScale(12),
    textAlign: 'center',
  },
  footerSpace: {
    height: moderateScale(40),
  },
});

export default JobSelection;