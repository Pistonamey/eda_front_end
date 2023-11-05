import React, { useState } from 'react';
import {
    AppBar,
    Slider,
    Link,
    Toolbar,
    Typography,
    TextField,
    Button,
    Container,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Grid,
    CircularProgress
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ApplicationStatus from '../components/ApplicationStatus';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Link as RouterLink,useNavigate } from 'react-router-dom';
import SmartToyIcon from '@mui/icons-material/SmartToy';
const GetDecisionUserInput = () => {

    const theme = useTheme();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [response, setResponse] = useState(null);
    const [formData, setFormData] = useState({
        GrossMonthlyIncome: '',
        CreditCardPayment: '',
        CarPayment: '',
        StudentLoanPayments: '',
        AppraisedValue: '',
        DownPayment: '',
        LoanAmount: '',
        MonthlyMortgagePayment: '',
        CreditScore: '',
    });
    const [email, setEmail] = useState({
        UserEmail: ''
    })
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [ltv,setLtv] = useState(true)
    const [dti,setDti] = useState(true)
    const [fedti,setFedti] = useState(true)
    const [credit,setCredit]=useState(true)
    
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (event) => {
        console.log(event.target.name)
        console.log(event.target.value)
        setFormData({
            ...formData,
            [event.target.name]: Number(event.target.value),
        });
    };
    const navigate = useNavigate();

    // When you want to navigate with state
    const handleNavigate = () => {
      navigate('/advice-page', { state: { credit, ltv, dti, fedti, formData } });
    };
    const handleEmailChange = (event) => {
        setEmail({
            ...email,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        setIsLoading(true);
        event.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_BACK_END_URL}/check_approval/one_row`,
                formData
            );
            setResponse(res.data);
            setIsSubmitted(true); // Hide form and show result
            console.log(res.data)
            setLtv(res.data.ltv_approved)
            setDti(res.data.dti_approved)
            setFedti(res.data.fedti_approved)
            setCredit(res.data.credit_score_approved)
            console.log(formData)
            setIsLoading(false)
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error case here if needed
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const renderApprovalIcon = (approved) => {
        return approved ? (
            <CheckCircleOutlineIcon color="success" />
        ) : (
            <HighlightOffIcon color="error" />
        );
    };
    const handleSendEmail = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACK_END_URL + '/sendemail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.UserEmail,
                    ltv:ltv,
                    dti:dti ,
                    fedti:fedti,
                    credit:credit// Assuming email.UserEmail is the state where you store the user's email
                }),
            });
            const data = await response.json();
            console.log(data);
            setSnackbarMessage(data.message);
            setSnackbarSeverity('info');
        } catch (error) {
            console.error('There was an error!', error);
            setSnackbarMessage('Failed to send the email.');
            setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
    };


    if (isSubmitted && response) {
        return (
            <>
                <AppBar position="static" style={{ background: theme.palette.blue[500] }}>
        <Toolbar>
          <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              EDA
            </Typography>
          </Link>
          <Link href="/userinput" style={{ marginLeft: "10px", marginTop:"07px",textDecoration: 'none', color: 'white' }}>
            <Typography variant="body2" component="div">
              <AssessmentIcon/>
            </Typography>
          </Link>
          <Link href="/ai_bot" style={{ marginLeft: "10px", marginTop:"07px",textDecoration: 'none', color: 'white' }}>
            <Typography variant="body2" component="div">
              <SmartToyIcon/>
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
                <Toolbar />
                <Container maxWidth="lg" style={{ marginTop:"-40px", display: 'flex', justifyContent: 'center' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ mt: 1, border: 1, borderRadius: 2, padding: 4 }}
          > <Typography variant="h5">Application Result</Typography>
                        <Typography variant="body1">
                            {response.approved
                                ? 'Congratulations! Your application is approved.'
                                : `Sorry, your application is not approved.`}
                        </Typography>
                        {response.accepted_under_conditions && response.accepted_under_conditions.length > 0 && (
                            <Typography variant="body2">
                                Conditions: {response.accepted_under_conditions}
                            </Typography>
                        )}
                        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                            <Table sx={{ Width: 450 }} aria-label="approval table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Credit Score
                                        </TableCell>
                                        <TableCell align="right">
                                            {renderApprovalIcon(response.credit_score_approved)}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            LTV (Loan to Value)
                                        </TableCell>
                                        <TableCell align="right">
                                            {renderApprovalIcon(response.ltv_approved)}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            DTI (Debt to Income)
                                        </TableCell>
                                        <TableCell align="right">
                                            {renderApprovalIcon(response.dti_approved)}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            FeDTI (Federal Debt to Income)
                                        </TableCell>
                                        <TableCell align="right">
                                            {renderApprovalIcon(response.fedti_approved)}
                                        </TableCell>
                                    </TableRow>
                                    {/* ... additional rows as needed */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button variant="contained" sx={{ marginTop: "10px" }} onClick={() => setIsSubmitted(false)}>
                            Submit another application
                        </Button>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="userEmail"
                            label="Enter Email"
                            name="UserEmail"
                            autoComplete="off"
                            autoFocus
                            value={email.UserEmail}
                            onChange={handleEmailChange}
                            sx={{
                                input: { color: 'black' } // replace 'yourDesiredColor' with any color you want
                            }}
                        />
                        <Button variant="contained" onClick={handleSendEmail} sx={{ marginTop: "10px", backgroundColor: theme.palette.red[600] }} >
                            Email the report
                        </Button>
                        {!response.approved && (
  <Typography variant="body1" style={{ marginTop: '16px' }}>
  To learn more about how you can improve your chances of getting approved, please visit our
  <Link 
    component="span" 
    style={{ 
      cursor: 'pointer', 
      color: theme.palette.red[500], 
      marginLeft: "4px",
      textDecoration: 'underline',
      '&:hover': {
        textDecoration: 'none',
      }
    }} 
    onClick={handleNavigate}
  >
    advice page.
  </Link>
</Typography>

)}</Box>
</Grid>

{!response.approved && (
<Grid item xs={12} md={6}>


          <Box display="flex" flexDirection="column">
            
            <Typography variant="h5" align="center">Check if you can qualify for a House Purchase.</Typography>
            {/* Place Sliders here */}
          </Box>

          <ApplicationStatus formDataIn={formData} />
        </Grid>
        )}
      </Grid>
                    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Container>
            </>
        );
    }

    

    return (
        <>
            <AppBar position="static" style={{ background: theme.palette.blue[500] }}>
        <Toolbar>
          <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              EDA
            </Typography>
          </Link>
          <Link href="/userinput" style={{ marginLeft: "10px", marginTop:"07px",textDecoration: 'none', color: 'white' }}>
            <Typography variant="body2" component="div">
              <AssessmentIcon/>
            </Typography>
          </Link>
          <Link href="/ai_bot" style={{ marginLeft: "10px", marginTop:"07px",textDecoration: 'none', color: 'white' }}>
            <Typography variant="body2" component="div">
              <SmartToyIcon/>
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
            <Toolbar /> {/* This is required to offset the content below the AppBar */}
            <div >
                <Container maxWidth="sm" style={{ marginBottom: 32 }}>
                    <Typography variant="h6">Fill your Details for Home Purchase Approval</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, border: 1, borderRadius: 2, padding: 4 }}>
                        <Typography id="input-slider" gutterBottom>
                            Gross Monthly Income
                        </Typography>
                        <Slider
                            value={typeof formData.GrossMonthlyIncome === 'number' ? formData.GrossMonthlyIncome : 0}
                            onChange={(e, val) => handleChange({ target: { name: 'GrossMonthlyIncome', value: val } }, val)}
                            aria-labelledby="input-slider"
                            min={0}
                            max={10000} // Adjust the max value accordingly
                            step={100}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type='number'
                            id="grossMonthlyIncome"
                            label="Gross Monthly Income"
                            name="GrossMonthlyIncome"
                            autoComplete="off"
                            autoFocus
                            value={formData.GrossMonthlyIncome}
                            onChange={handleChange}
                            sx={{
                                input: { color: 'black' } // replace 'yourDesiredColor' with any color you want
                            }}
                        />
                        <Typography id="input-slider" gutterBottom>
                            Credit Card
                        </Typography>
                        <Slider
                            value={typeof formData.CreditCardPayment === 'number' ? formData.CreditCardPayment : 0}
                            onChange={(e, val) => handleChange({ target: { name: 'CreditCardPayment', value: val } }, val)}
                            aria-labelledby="input-slider"
                            min={0}
                            max={10000} // Adjust the max value accordingly
                            step={100}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="creditCardPayment"
                            label="Credit Card Payment"
                            name="CreditCardPayment"
                            autoComplete="off"
                            value={formData.CreditCardPayment}
                            onChange={handleChange}
                            sx={{
                                input: { color: 'black' } // replace 'yourDesiredColor' with any color you want
                            }}
                        />
                        <Slider
                            value={typeof formData.CarPayment === 'number' ? formData.CarPayment : 0}
                            onChange={(e, val) => handleChange({ target: { name: 'CarPayment', value: val } }, val)}
                            aria-labelledby="input-slider"
                            min={0}
                            max={10000} // Adjust the max value accordingly
                            step={100}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="carPayment"
                            label="Car Payment"
                            name="CarPayment"
                            autoComplete="off"
                            value={formData.CarPayment}
                            onChange={handleChange}
                            sx={{
                                input: { color: 'black' } // replace 'yourDesiredColor' with any color you want
                            }}
                        />
                        <Slider
                            value={typeof formData.StudentLoanPayments === 'number' ? formData.StudentLoanPayments : 0}
                            onChange={(e, val) => handleChange({ target: { name: 'StudentLoanPayments', value: val } }, val)}
                            aria-labelledby="input-slider"
                            min={0}
                            max={10000} // Adjust the max value accordingly
                            step={100}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="studentLoanPayments"
                            label="Student Loan Payments"
                            name="StudentLoanPayments"
                            autoComplete="off"
                            value={formData.StudentLoanPayments}
                            onChange={handleChange}
                            sx={{
                                input: { color: 'black' } // replace 'yourDesiredColor' with any color you want
                            }}
                        />
                        <Slider
                            value={typeof formData.AppraisedValue === 'number' ? formData.AppraisedValue : 0}
                            onChange={(e, val) => handleChange({ target: { name: 'AppraisedValue', value: val } }, val)}
                            aria-labelledby="input-slider"
                            min={0}
                            max={10000} // Adjust the max value accordingly
                            step={100}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="appraisedValue"
                            label="Appraised Value"
                            name="AppraisedValue"
                            autoComplete="off"
                            value={formData.AppraisedValue}
                            onChange={handleChange}
                            sx={{
                                input: { color: 'black' } // replace 'yourDesiredColor' with any color you want
                            }}
                        />
                        <Slider
                            value={typeof formData.DownPayment === 'number' ? formData.DownPayment : 0}
                            onChange={(e, val) => handleChange({ target: { name: 'DownPayment', value: val } }, val)}
                            aria-labelledby="input-slider"
                            min={0}
                            max={10000} // Adjust the max value accordingly
                            step={100}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="downPayment"
                            label="Down Payment"
                            name="DownPayment"
                            autoComplete="off"
                            value={formData.DownPayment}
                            onChange={handleChange}
                            sx={{
                                input: { color: 'black' } // replace 'yourDesiredColor' with any color you want
                            }}
                        />
                        <Slider
                            value={typeof formData.LoanAmount === 'number' ? formData.LoanAmount : 0}
                            onChange={(e, val) => handleChange({ target: { name: 'LoanAmount', value: val } }, val)}
                            aria-labelledby="input-slider"
                            min={0}
                            max={10000} // Adjust the max value accordingly
                            step={100}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="loanAmount"
                            label="Loan Amount"
                            name="LoanAmount"
                            autoComplete="off"
                            value={formData.LoanAmount}
                            onChange={handleChange}
                            sx={{
                                input: { color: 'black' } // replace 'yourDesiredColor' with any color you want
                            }}
                        />
                        <Slider
                            value={typeof formData.MonthlyMortgagePayment === 'number' ? formData.MonthlyMortgagePayment : 0}
                            onChange={(e, val) => handleChange({ target: { name: 'MonthlyMortgagePayment', value: val } }, val)}
                            aria-labelledby="input-slider"
                            min={0}
                            max={10000} // Adjust the max value accordingly
                            step={100}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="monthlyMortgagePayment"
                            label="Monthly Mortgage Payment"
                            name="MonthlyMortgagePayment"
                            autoComplete="off"
                            value={formData.MonthlyMortgagePayment}
                            onChange={handleChange}
                            sx={{
                                input: { color: 'black' } // replace 'yourDesiredColor' with any color you want
                            }}
                        />
                        <Slider
                            value={typeof formData.CreditScore === 'number' ? formData.CreditScore : 0}
                            onChange={(e, val) => handleChange({ target: { name: 'CreditScore', value: val } }, val)}
                            aria-labelledby="input-slider"
                            min={0}
                            max={10000} // Adjust the max value accordingly
                            step={100}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="creditScore"
                            label="Credit Score"
                            name="CreditScore"
                            autoComplete="off"
                            value={formData.CreditScore}
                            onChange={handleChange}
                            sx={{
                                input: { color: 'black' } // replace 'yourDesiredColor' with any color you want
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Check Approval

                        </Button>
                    </Box>
                </Container>
                {isLoading && (
                <Box
                    sx={{
                        position: 'fixed', // This will make the loader overlay on top of the content
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // semi-transparent background
                    }}
                >
                    <CircularProgress size={80} color="inherit" 
                        sx={{ color: theme.palette.white[900] }}  />
                </Box>
            )}
            </div>
        </>
    );
};

export default GetDecisionUserInput;
