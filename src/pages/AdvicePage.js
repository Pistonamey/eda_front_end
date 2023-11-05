import React from 'react';
import { Typography, Grid,AppBar, Toolbar, Container, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useLocation } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useTheme } from '@emotion/react';
import SmartToyIcon from '@mui/icons-material/SmartToy';
const AdvicePage = () => {
    const theme = useTheme();
    const location = useLocation();
    // Default to true if not provided to avoid rendering all links when no state is provided
    const { credit = true, ltv = true, dti = true, fedti = true,formData } = location.state || {};
    const getStatusIcon = (condition) => {
        return condition ? <CheckCircleOutlineIcon color="success" /> : <HighlightOffIcon color="error" />;
    };
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
            <Container >

                <Grid container spacing={2}>
                <Grid item xs={6}>
                <Typography variant="h4" gutterBottom>
                    Improve Your Application
                </Typography>
                <Typography variant="body1" paragraph>
                    Getting approved for a home purchase can be complex. Here are some resources that can help you understand the process and improve your application.
                </Typography>
               

                {/* Conditional rendering based on the boolean values */}
                {!ltv && (
                    <React.Fragment>
                    <Typography variant="h6" paragraph>
                      To reduce your Loan to Value Ratio (LTV), consider the following strategies:
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Increase Down Payment: Pay a larger down payment to decrease the loan amount needed, which reduces your LTV ratio.
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Choose a Less Expensive Property: Selecting a property that fits within or below your budget allows for a higher down payment percentage, lowering the LTV.
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Additional Principal Payments: Make extra payments toward your loan's principal to reduce the outstanding balance more quickly, thus lowering your LTV.
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Refinance with a Shorter Term: Refinancing to a shorter loan term can lead to more of your payment going toward principal, helping to lower your LTV faster.
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Learn more about LTV:
                    </Typography>
                    <Typography variant="body1" paragraph>
                      <Link target="_blank" href="https://www.rocketmortgage.com/learn/loan-to-value-ratio">
                        Loan to Value Ratio (Rocket Mortgage)
                      </Link>
                    </Typography>
                    <Typography variant="body1" paragraph>
                      <Link target="_blank" href="https://wealthfit.com/articles/loan-to-value-ratio/">
                        Loan to Value Ratio (WealthFit)
                      </Link>
                    </Typography>
                  </React.Fragment>
                  
                )}
                {!dti && (
                  <React.Fragment>
                  <Typography variant="h6" paragraph>
                    To reduce your Debt-to-Income (DTI) ratio, consider these strategies:
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Increase Income: Look for opportunities to boost your monthly income, such as asking for a raise, finding a higher-paying job, taking on part-time work, or starting a side hustle.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Pay Down Debt: Aggressively pay off debts, prioritizing those with the highest interest rates, or use the "snowball" method to eliminate smaller debts first.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Avoid Taking on New Debt: Steer clear of incurring additional debt which can raise your DTI ratio.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Refinance Debts: If you can, refinance existing loans to get lower interest rates or extend your repayment period, thus reducing your monthly debt payments.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    For more information on lowering your DTI ratio, visit the following resources:
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <Link target="_blank" href="https://crosscountrymortgage.com/how-to-lower-debt-to-income-ratio/">
                      How to Lower Debt to Income Ratio (Cross Country Mortgage)
                    </Link>
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <Link target="_blank" href="https://www.experian.com/blogs/ask-experian/how-to-reduce-dti-before-applying-for-loan/">
                      How to Reduce DTI Before Applying for a Loan (Experian)
                    </Link>
                  </Typography>
                </React.Fragment>
                
                )}
                {!fedti && (
                    <React.Fragment>
                    <Typography variant="h6" paragraph>
                      Reducing your Front-End Debt-to-Income (FEDTI) ratio can make a significant difference when applying for a mortgage. Here are some effective strategies:
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Increase Your Income: Boost your income by pursuing higher-paying jobs, working extra hours, taking on additional jobs, or engaging in side hustles.
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Extend Your Mortgage Term: Consider a longer-term mortgage to enjoy lower monthly payments. A 30-year term, for instance, usually offers lower payments than a 15-year term.
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Rent Out Part of Your Living Space: If feasible, rent out a portion of your home to help offset your mortgage payments.
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Cut Non-Housing Expenses: By minimizing non-housing related expenses, you can allocate a larger portion of your income to cover housing costs, potentially improving your FEDTI.
                    </Typography>
                    <Typography variant="body1" paragraph>
                      For a deeper understanding of FEDTI and how it affects your borrowing power, explore the following resources:
                    </Typography>
                    <Typography variant="body1" paragraph>
                      <Link target="_blank" href="https://www.investopedia.com/terms/f/front-end-debt-to-income-ratio.asp">
                        Front End Debt to Income Ratio (Investopedia)
                      </Link>
                    </Typography>
                    <Typography variant="body1" paragraph>
                      <Link target="_blank" href="https://www.investopedia.com/terms/f/front-endratio.asp">
                        Front End Ratio (Investopedia)
                      </Link>
                    </Typography>
                  </React.Fragment>
                  
                )}
                {!credit && (
                    <React.Fragment>
                    <Typography variant="h6" paragraph>
                      Enhancing your credit score is crucial for better financial opportunities. Here are some tips to help you improve your credit rating:
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Pay Bills on Time: Ensure you pay all your bills promptly as payment history is a critical factor in your credit score. Setting up automatic payments or calendar reminders can help you stay on track.
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Keep Credit Card Balances Low: High balances can negatively impact your score. Strive to maintain your credit utilization below 30% to show lenders you can manage credit responsibly.
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Limit Your Requests for New Credit: Frequent applications for credit might slightly lower your score. Only apply for new credit if it's essential.
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Be Patient and Persistent: Credit scores improve gradually over time, so continue practicing good credit habits and monitoring your score for any changes.
                    </Typography>
                    <Typography variant="body1" paragraph>
                      For additional information and tips on how to instantly increase your credit scores for free, consider the following resources:
                    </Typography>
                    <Typography variant="body1" paragraph>
                      <Link target="_blank" href="https://www.experian.com/consumer-products/score-boost.html?pc=sem_exp_google&cc=sem_exp_google_ad_1670007804_67319116300_379833197745_kwd-15712221_b___k_CjwKCAjw15eqBhBZEiwAbDomEp57MzF6Hdyu41TS51RcB4XnpDk2XhHBhUuPKeiSfSjfpOs42BwUwBoC7lYQAvD_BwE_k_&ref=generic&awsearchcpc=1&gclid=CjwKCAjw15eqBhBZEiwAbDomEp57MzF6Hdyu41TS51RcB4XnpDk2XhHBhUuPKeiSfSjfpOs42BwUwBoC7lYQAvD_BwE">
                        Instantly increase your credit scores for free (Experian)
                      </Link>
                    </Typography>
                    <Typography variant="body1" paragraph>
                      <Link target="_blank" href="https://www.nerdwallet.com/article/finance/raise-credit-score-fast">
                        Raise Credit Score Fast (Nerd Wallet)
                      </Link>
                    </Typography>
                  </React.Fragment>
                  
                )}
                </Grid>
                {/* ... more conditional resources */}
                <Grid item xs={6}>
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
                </Grid>
                </Grid>
            </Container>
        </>

    );
};

export default AdvicePage;
