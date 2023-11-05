import React from 'react';
import { Typography, AppBar, Toolbar, Container, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useLocation } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useTheme } from '@emotion/react';
const AdvicePage = () => {
    const theme = useTheme();
    const location = useLocation();
    // Default to true if not provided to avoid rendering all links when no state is provided
    const { credit = true, ltv = true, dti = true, fedti = true } = location.state || {};
    const getStatusIcon = (condition) => {
        return condition ? <CheckCircleOutlineIcon color="success" /> : <HighlightOffIcon color="error" />;
    };
    return (
        <>
            <AppBar position="fixed" style={{ background: theme.palette.red[500] }}>
                <Toolbar>
                    <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
                        <Typography variant="h6" component="div">
                            EDA
                        </Typography>
                    </Link>
                    <Link href="/userinput" style={{ marginLeft: "10px", marginTop: "07px", textDecoration: 'none', color: 'white' }}>
                        <Typography variant="body1" component="div">
                            <AssessmentIcon />
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Container maxWidth="sm" style={{ marginTop: '24px' }}>
                <Typography variant="h4" gutterBottom>
                    Improve Your Application
                </Typography>
                <Typography variant="body1" paragraph>
                    Getting approved for a home purchase can be complex. Here are some resources that can help you understand the process and improve your application.
                </Typography>
                {/* Conditional rendering based on the boolean values */}
                {!ltv && (
                    <React.Fragment>
                        <Typography variant="body1" paragraph>
                            <Link target="_blank" href="https://www.rocketmortgage.com/learn/loan-to-value-ratio">Loan to Value Ratio (Rocket Money)</Link>
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <Link target="_blank" href="https://wealthfit.com/articles/loan-to-value-ratio/">Loan to Value Ratio (WealthFit)</Link>
                        </Typography>
                    </React.Fragment>
                )}
                {!dti && (
                    <React.Fragment>
                        <Typography variant="body1" paragraph>
                            <Link target="_blank" href="https://crosscountrymortgage.com/how-to-lower-debt-to-income-ratio/">How to Lower debt to income Ratio (Cross Country Mortgage)</Link>
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <Link target="_blank" href="https://www.experian.com/blogs/ask-experian/how-to-reduce-dti-before-applying-for-loan/">How to reduce dti before applying for loan (Experian)</Link>
                        </Typography>
                    </React.Fragment>
                )}
                {!fedti && (
                    <React.Fragment>
                        <Typography variant="body1" paragraph>
                            <Link target="_blank" href="https://www.investopedia.com/terms/f/front-end-debt-to-income-ratio.asp">Front End Debt to Income Ratio (Investopedia)</Link>
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <Link target="_blank" href="https://www.investopedia.com/terms/f/front-endratio.asp">Front End Ratio (Investopedia)</Link>
                        </Typography>
                    </React.Fragment>
                )}
                {!credit && (
                    <React.Fragment>
                        <Typography variant="body1" paragraph>
                            <Link target="_blank" href="https://www.experian.com/consumer-products/score-boost.html?pc=sem_exp_google&cc=sem_exp_google_ad_1670007804_67319116300_379833197745_kwd-15712221_b___k_CjwKCAjw15eqBhBZEiwAbDomEp57MzF6Hdyu41TS51RcB4XnpDk2XhHBhUuPKeiSfSjfpOs42BwUwBoC7lYQAvD_BwE_k_&ref=generic&awsearchcpc=1&gclid=CjwKCAjw15eqBhBZEiwAbDomEp57MzF6Hdyu41TS51RcB4XnpDk2XhHBhUuPKeiSfSjfpOs42BwUwBoC7lYQAvD_BwE">Instantly increase your credit scores for free (Experian)</Link>
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <Link target="_blank" href="https://www.nerdwallet.com/article/finance/raise-credit-score-fast">Raise Credit Score Fast (Nerd Wallet)</Link>
                        </Typography>
                    </React.Fragment>
                )}
                {/* ... more conditional resources */}
                <TableContainer component={Paper} style={{ marginTop: '32px' }}>
                    <Table aria-label="application status">
                        <TableHead>
                            <TableRow>
                                <TableCell>Aspect</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Credit Score
                                </TableCell>
                                <TableCell align="right">{getStatusIcon(credit)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Loan-to-Value Ratio (LTV)
                                </TableCell>
                                <TableCell align="right">{getStatusIcon(ltv)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Debt-to-Income Ratio (DTI)
                                </TableCell>
                                <TableCell align="right">{getStatusIcon(dti)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Front-End Debt-to-Income Ratio (FEDTI)
                                </TableCell>
                                <TableCell align="right">{getStatusIcon(fedti)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>

    );
};

export default AdvicePage;
