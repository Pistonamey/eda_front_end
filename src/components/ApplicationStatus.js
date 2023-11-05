// ApplicationStatus.js
import React, { useState } from 'react';
import { Box, Slider, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const ApplicationStatus = ({formDataIn}) => {
    const [formData, setFormData] = useState({
        GrossMonthlyIncome: formDataIn?.GrossMonthlyIncome || 0,
        CreditCardPayment: formDataIn?.CreditCardPayment || 0,
        CarPayment: formDataIn?.CarPayment || 0,
        StudentLoanPayments: formDataIn?.StudentLoanPayments || 0,
        AppraisedValue: formDataIn?.AppraisedValue || 0,
        DownPayment: formDataIn?.DownPayment || 0,
        LoanAmount: formDataIn?.LoanAmount || 0,
        MonthlyMortgagePayment: formDataIn?.MonthlyMortgagePayment || 0,
        CreditScore: formDataIn?.CreditScore || 0
      });

      console.log(formData)
      

  const handleChange = (name) => (event, value) => {
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    // Directly calculate the new approval status every time formData changes
    const { approved, reasons, conditions } = calculateApprovalStatus(newFormData);
    // Now, you can use `approved`, `reasons`, and `conditions` to update the UI
  };

  const approvalStatus = calculateApprovalStatus(formData).approved;

  return (
    <Box>
      <Typography variant="h6">
                {approvalStatus ? (
                    <React.Fragment>
                        Application Approved <CheckCircleOutlineIcon color="success" />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        Application Rejected <HighlightOffIcon color="error" />
                    </React.Fragment>
                )}
            </Typography>
  
      <Typography gutterBottom>
  Gross Monthly Income: ${formData.GrossMonthlyIncome.toFixed(2)}
</Typography>
      <Slider
        value={formData.GrossMonthlyIncome}
        onChange={handleChange('GrossMonthlyIncome')}
        aria-labelledby="input-slider-gross-monthly-income"
        min={0}
  max={50000}
      />
  
      <Typography gutterBottom>Credit Card Payment: ${formData.CreditCardPayment.toFixed(2)}</Typography>
      <Slider
        value={formData.CreditCardPayment}
        onChange={handleChange('CreditCardPayment')}
        aria-labelledby="input-slider-credit-card-payment"
        min={0}
  max={50000}
      />
  
  <Typography gutterBottom>Car Payment: ${formData.CarPayment.toFixed(2)}</Typography>
      <Slider
        value={formData.CarPayment}
        onChange={handleChange('CarPayment')}
        aria-labelledby="input-slider-car-payment"
        min={0}
  max={50000}
      />
  
  <Typography gutterBottom>Student Loan Payments: ${formData.StudentLoanPayments.toFixed(2)}</Typography>
      <Slider
        value={formData.StudentLoanPayments}
        onChange={handleChange('StudentLoanPayments')}
        aria-labelledby="input-slider-student-loan-payments"
        min={0}
  max={50000}
      />
  
  <Typography gutterBottom>Appraised Value: ${formData.AppraisedValue.toFixed(2)}</Typography>
      <Slider
        value={formData.AppraisedValue}
        onChange={handleChange('AppraisedValue')}
        aria-labelledby="input-slider-appraised-value"
        min={0}
  max={900000}
      />
  
  <Typography gutterBottom>Down Payment: ${formData.DownPayment.toFixed(2)}</Typography>
      <Slider
        value={formData.DownPayment}
        onChange={handleChange('DownPayment')}
        aria-labelledby="input-slider-down-payment"
        min={0}
  max={100000}
      />
  
  <Typography gutterBottom>Loan Amount: ${formData.LoanAmount.toFixed(2)}</Typography>
      <Slider
        value={formData.LoanAmount}
        onChange={handleChange('LoanAmount')}
        aria-labelledby="input-slider-loan-amount"
        min={0}
  max={900000}
      />
  
  <Typography gutterBottom>Monthly Mortgage: ${formData.MonthlyMortgagePayment.toFixed(2)}</Typography>
      <Slider
        value={formData.MonthlyMortgagePayment}
        onChange={handleChange('MonthlyMortgagePayment')}
        aria-labelledby="input-slider-monthly-mortgage-payment"
        min={0}
  max={100000}
      />
  
  <Typography gutterBottom>Credit Score: {formData.CreditScore.toFixed(2)}</Typography>
      <Slider
        value={formData.CreditScore}
        onChange={handleChange('CreditScore')}
        aria-labelledby="input-slider-credit-score"
        min={0}
  max={900}
      />
    </Box>
  );
  
};

// Helper function to calculate approval status based on formData
function calculateApprovalStatus(formData) {
    // Convert all formData values to numbers
    const row = {
      CreditScore: Number(formData.CreditScore),
      AppraisedValue: Number(formData.AppraisedValue),
      DownPayment: Number(formData.DownPayment),
      LoanAmount: Number(formData.LoanAmount),
      GrossMonthlyIncome: Number(formData.GrossMonthlyIncome),
      CreditCardPayment: Number(formData.CreditCardPayment),
      CarPayment: Number(formData.CarPayment),
      StudentLoanPayments: Number(formData.StudentLoanPayments),
      MonthlyMortgagePayment: Number(formData.MonthlyMortgagePayment),
    };
  
    // Perform the calculations
    row.LTV = ((row.AppraisedValue - row.DownPayment) / row.AppraisedValue) * 100;
    const totalDebtPayments = row.CreditCardPayment + row.CarPayment + row.StudentLoanPayments;
    row.DTI = ((totalDebtPayments + row.MonthlyMortgagePayment) / row.GrossMonthlyIncome) * 100;
    row.FEDTI = (row.MonthlyMortgagePayment / row.GrossMonthlyIncome) * 100;
  
    // Initialize approval status
    let approved = true;
    const reasons = [];
    const conditions = [];
  
    // Check the criteria for approval
    if (row.CreditScore < 640) {
      approved = false;
      reasons.push("Credit score below 640.");
    }
    if (row.LTV > 95) {
      approved = false;
      reasons.push(`LTV ratio too high: ${row.LTV.toFixed(2)}%.`);
    }
    if (row.DTI > 43) {
      approved = false;
      reasons.push(`DTI ratio too high: ${row.DTI.toFixed(2)}%.`);
    } else if (row.DTI > 36) {
      conditions.push("DTI ratio above preferred level of 36%.");
    }
    if (row.FEDTI > 28) {
      approved = false;
      reasons.push(`FEDTI ratio too high: ${row.FEDTI.toFixed(2)}%.`);
    }
  
    // Check for LTV-based PMI condition
    if (row.LTV >= 80 && row.LTV <= 95) {
      conditions.push("PMI required due to LTV ratio between 80% and 95%.");
    }
  
    return { approved, reasons, conditions };
  }
  

export default ApplicationStatus;
