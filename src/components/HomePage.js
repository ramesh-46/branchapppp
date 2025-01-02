import React, { useState } from 'react';
import { 
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Card,
  Typography,
  styled
} from '@mui/material';
import {
  Description,
  CheckCircle,
  NoteAdd,
  LocalGasStation,
  Loop,
  Cancel,
  LocalShipping
} from '@mui/icons-material';

const StyledCard = styled(Card)(({ bgcolor }) => ({
  padding: '20px',
  width: '260px',
  backgroundColor: bgcolor,
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)'
  }
}));

const IconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '10px'
});

const ValueText = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '5px'
});

const LabelText = styled(Typography)({
  fontSize: '0.9rem'
});

function HomePage() {
  const [branch, setBranch] = useState('All');
  const [fromDate, setFromDate] = useState('2025-01-01');
  const [toDate, setToDate] = useState('2025-02-01');

  const cards = [
    { 
      title: 'Coupon Requested', 
      value: '0', 
      icon: <NoteAdd />, 
      bgcolor: '#45b6fe'
    },
    { 
      title: 'Coupon Approved', 
      value: '0', 
      icon: <CheckCircle />, 
      bgcolor: '#4caf50'
    },
    { 
      title: 'Coupon Generated', 
      value: '0', 
      icon: <Description />, 
      bgcolor: '#2196f3'
    },
    { 
      title: 'Coupon Utilized', 
      value: '0', 
      icon: <LocalGasStation />, 
      bgcolor: '#66bb6a'
    },
    { 
      title: 'Coupon InProgress', 
      value: '0', 
      icon: <Loop />, 
      bgcolor: '#9e9e9e'
    },
    { 
      title: 'Coupon Cancelled', 
      value: '0', 
      icon: <Cancel />, 
      bgcolor: '#ef5350'
    },
    { 
      title: 'Vehicles', 
      value: '0', 
      icon: <LocalShipping />, 
      bgcolor: '#ffa726'
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with filters */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4
      }}>
        <FormControl sx={{ width: 200 }}>
          <Select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            sx={{
              bgcolor: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e0e0e0'
              }
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Chennai">Chennai</MenuItem>
            <MenuItem value="Hyderabad">Hyderabad</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box>
            <Typography variant="caption" sx={{ color: '#666' }}>From Date</Typography>
            <TextField
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              sx={{ bgcolor: 'white' }}
            />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: '#666' }}>To Date</Typography>
            <TextField
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              sx={{ bgcolor: 'white' }}
            />
          </Box>
        </Box>
      </Box>

      {/* Cards Grid */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 3
      }}>
        {cards.map((card, index) => (
          <StyledCard key={index} bgcolor={card.bgcolor}>
            <IconWrapper>
              {card.icon}
              <ValueText>{card.value}</ValueText>
            </IconWrapper>
            <LabelText>{card.title}</LabelText>
          </StyledCard>
        ))}
      </Box>

      {/* PFS Wise Consumption Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#666' }}>
          PFS Wise Consumption
        </Typography>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" align="center">
            PFS Wise Consumption (0 Ltrs)
          </Typography>
          {/* Add your chart or additional content here */}
        </Card>
      </Box>
    </Box>
  );
}

export default HomePage;