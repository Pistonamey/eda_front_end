import React, { useState } from 'react';
import { Box, AppBar,Toolbar,Link,TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useTheme } from '@emotion/react';
const Chatbot = () => {
  const [question, setQuestion] = useState('');
  const [questiondti, setQuestiondti] = useState('');
  const [response, setResponse] = useState('');
  const [responsedti, setResponsedti] = useState('');
  const [loading, setLoading] = useState(false);
    const theme=useTheme();
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };
  const handleQuestionChangedti = (event) => {
    setQuestiondti(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Here, you would send the question to your API endpoint
      const result = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/get_info_LTV_fannie_mae`, { question });
      setResponse(result.data.response);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setResponse('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitDTI = async () => {
    setLoading(true);
    try {
      // Here, you would send the question to your API endpoint
      const result = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/get_info_dti_fannie_mae`, { question:questiondti });
      setResponsedti(result.data.response);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setResponsedti('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
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
    <Box sx={{ m: 2 }}>
      <Typography variant="h5" gutterBottom>
        LTV Fannie Mae Query
      </Typography>
      <TextField
        fullWidth
        label="Ask a question"
        variant="outlined"
        value={question}
        onChange={handleQuestionChange}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        Submit
      </Button>
      {loading && <Typography>Loading...</Typography>}
      {!loading && response && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Response: {response}
        </Typography>
      )}
    </Box>
    <Box sx={{ m: 2 }}>
      <Typography variant="h5" gutterBottom>
        DTI Fannie Mae Query
      </Typography>
      <TextField
        fullWidth
        label="Ask a question"
        variant="outlined"
        value={questiondti}
        onChange={handleQuestionChangedti}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitDTI}
        disabled={loading}
      >
        Submit
      </Button>
      {loading && <Typography>Loading...</Typography>}
      {!loading && responsedti && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Response: {responsedti}
        </Typography>
      )}
    </Box>
    </>
  );
};

export default Chatbot;
