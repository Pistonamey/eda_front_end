import React, { useState, useEffect } from 'react';
import { Button, Box, Divider,TextField,CircularProgress, AppBar, Toolbar, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend, Tooltip,Text } from 'recharts';
import { DataGrid ,GridToolbar} from '@mui/x-data-grid';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const GetDecisionByFile = () => {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [chartData, setChartData] = useState(null); // Stores the data for the chart
  const [approvalChartData, setApprovalChartData] = useState(null); // Stores the approval chart data
  const [rejectionReasonsChartData, setRejectionReasonsChartData] = useState(null); // Stores the rejection reasons chart data
  const [showCharts, setShowCharts] = useState(false); // Determines whether to show the charts or the form
  const [rows, setRows] = useState([]); // Data for DataGrid
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  useEffect(() => {
    if (chartData) {
      // console.log(chartData);
      // Perform any other actions you need to do after chartData has been updated
    }
  }, [chartData]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'approved', headerName: 'Approved', width: 130 },
    {
      field: 'reason_for_rejection',
      headerName: 'Reason for Rejection',
      width: 400,
      renderCell: (params) => (
        <div>
          {params.value.split(', ').map((line, index) => (
            <div key={index} style={{ whiteSpace: 'pre-line' }}>
              {line}
            </div>
          ))}
        </div>
      ),
    },
    {
      field: 'accepted_under_conditions',
      headerName: 'Accepted Under Conditions',
      width: 400,
      renderCell: (params) => (
        <div>
          {params.value.split(', ').map((line, index) => (
            <div key={index} style={{ whiteSpace: 'pre-line' }}>
              {line}
            </div>
          ))}
        </div>
      ),
    },];

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
        setIsLoading(true);
    if (file) {
      const formData = new FormData();
      formData.append('csv_file', file);

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACK_END_URL}/check_approval/csv_file`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log(response.data)
        const decisionData = response.data.results.slice(0, -6);
        
        // Directly set the rows for the DataGrid
        setRows(decisionData.map((item) => ({
          id: item.id,
          approved: item.approved ? 'Yes' : 'No',
          reason_for_rejection: item.reason_for_rejection.join(', '),
          accepted_under_conditions: item.accepted_under_conditions.join(', ')
        })));
        // Assuming response.data.results is an array of objects where the last four elements are the counts for each rejection reason
        const dataLength = response.data.results.length;
        const creditRejectionsCount = response.data.results[dataLength - 4];
        const ltvRejectionsCount = response.data.results[dataLength - 3];
        const dtiRejectionsCount = response.data.results[dataLength - 2];
        const fedtiRejectionsCount = response.data.results[dataLength - 1];

        // Set the data for the approval chart
        setApprovalChartData([
          { name: 'Approved', value: response.data.results[dataLength - 6] },
          { name: 'Rejected', value: response.data.results[dataLength - 5] },
        ]);

        // Set the data for the rejection reasons chart
        setRejectionReasonsChartData([
          { name: 'Credit', value: creditRejectionsCount },
          { name: 'LTV', value: ltvRejectionsCount },
          { name: 'DTI', value: dtiRejectionsCount },
          { name: 'FEDTI', value: fedtiRejectionsCount },
        ]);
        setIsLoading(false)
        setShowCharts(true); // Show the charts

      } catch (error) {
        console.error('There was an error uploading the file:', error);
      }
    }
  };

  const approvalColors = ['green', 'red'];
  const rejectionReasonColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


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
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        
        sx={{ '& > form': { border: 1, padding: 4, borderRadius: 2, marginTop:"50px",borderColor: 'divider' } }}
      >
        {!showCharts ? (
          // Show this form only if showChart is false
          <>
  <Box textAlign="center" maxWidth={600} margin="auto">
    <Typography variant="h6" sx={{marginTop:"20px"}}>
      Unlock the door to your future home with confidence. Our intuitive app simplifies the complex maze of homebuying by evaluating your financial readiness in real-time. If you're not quite there yet, don't worry – we guide you with personalized, actionable steps to bolster your buying potential. Start your journey to a 'Yes' in homeownership with us today!
    </Typography>
  </Box>
  <form onSubmit={handleFormSubmit}>
    <Typography variant="h5" textAlign="center">
      Upload the Home Buyer Info CSV
    </Typography>
    <TextField
      type="file"
      onChange={handleFileChange}
      accept=".csv"
      variant="outlined"
      margin="normal"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        style: { color: 'black' },
      }}
    />
    <Box textAlign="center" marginTop={2}>
      <Button type="submit" variant="contained" color="primary">
        Upload and Check Approval
      </Button>
    </Box>
  </form>
</>

        ) : (
          // Show the PieChart if showChart is true
          <Box sx={{ display: 'flex', width: '100vw', maxHeight: '80vh' }}>
            {/* Container for Pie Charts */}
            <Box sx={{ width: '25vw', display: 'flex', flexDirection: 'column' }}>
              {/* Approval Pie Chart */}
              <Box textAlign="center" sx={{ height: 'auto' }}>
                <Typography variant="h6" gutterBottom style={{ margin: 0 }}>
                  Accepted/Rejected
                </Typography>
                <PieChart width={400} height={300} style={{marginLeft:"20px"}}>
                <Pie
  dataKey="value"
  isAnimationActive={false}
  data={approvalChartData}
  cx={180}
  cy={120}
  outerRadius={80}
  fill="#8884d8"
  label={({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <Text
        x={x}
        y={y}
        fill="black" // Set the fill here for the color of the text
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </Text>
    );
  }}
>
  {approvalChartData.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={approvalColors[index % approvalColors.length]} />
  ))}
</Pie>
  <Tooltip />
  <Legend />
</PieChart>

              </Box>
              <Divider sx={{backgroundColor:"black"}}/>
              {/* Rejection Reasons Pie Chart */}
              <Box textAlign="center" sx={{ height: 'auto' }}>
                <Typography variant="h6" gutterBottom style={{ margin: 0 }}>
                  Reasons for Rejections
                </Typography>
                <PieChart width={300} height={300} style={{marginLeft:"10px"}}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={rejectionReasonsChartData}
                    cx={180}
                    cy={120}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {rejectionReasonsChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={rejectionReasonColors[index % rejectionReasonColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </Box>
            </Box>

            {/* Container for Data Grid */}
            <Box sx={{ width: '75vw', height: '90vh' }}>

              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                rowHeight={80}
                sx={{
                  '& .MuiDataGrid-cell': {
                    color: 'blue', // or use a function to set color based on row data
                  },
                  height: '100%',
                }}
                components={{
                  Toolbar: GridToolbar, // This will add tools for exporting, toggling density, etc.
                }}
              />
            </Box>
          </Box>


        )}
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
      </Box>
    </>
  );
};

export default GetDecisionByFile;
