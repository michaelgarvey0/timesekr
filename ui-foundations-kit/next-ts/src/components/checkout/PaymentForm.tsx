'use client'
import * as React from 'react';

import { Card as MuiCard } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import { TbAlertTriangle, TbBuildingBank, TbCreditCard } from 'react-icons/tb';

const Card = styled(MuiCard)<{ selected?: boolean }>(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.divider,
  width: '100%',
  '&:hover': {
    filter: 'brightness(0.95)',
  },
  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
    maxWidth: `calc(50% - ${theme.spacing(1)})`,
  },
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        backgroundColor: theme.palette.action.selected,
        borderColor: theme.palette.primary.light,
        ...theme.applyStyles('dark', {
          borderColor: theme.palette.primary.dark,
        }),
      },
    },
  ],
}));

export default function PaymentForm() {
  const [paymentType, setPaymentType] = React.useState('creditCard');
  const [cardNumber, setCardNumber] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [expirationDate, setExpirationDate] = React.useState('');

  const handlePaymentTypeChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setPaymentType(event.target.value);
  };

  const handleCardNumberChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  const handleCvvChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleExpirationDateChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }
  };

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          aria-label="Payment options"
          name="paymentType"
          value={paymentType}
          onChange={handlePaymentTypeChange}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
          <Card
            sx={{
              ...(paymentType === 'creditCard' && {
                backgroundColor: 'primary.subtle',
              }),
            }}
            selected={paymentType === 'creditCard'}
          >
            <CardActionArea
              onClick={() => setPaymentType('creditCard')}
              sx={{
                '.MuiCardActionArea-focusHighlight': {
                  backgroundColor: 'transparent',
                },
                '&:focus-visible': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TbCreditCard size={20} />
                <Typography sx={{ fontWeight: 'medium' }}>Card</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            sx={{
              ...(paymentType === 'bankTransfer' && {
                backgroundColor: 'primary.subtle',
              }),
            }}
            selected={paymentType === 'bankTransfer'}
          >
            <CardActionArea
              onClick={() => setPaymentType('bankTransfer')}
              sx={{
                '.MuiCardActionArea-focusHighlight': {
                  backgroundColor: 'transparent',
                },
                '&:focus-visible': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TbBuildingBank size={20} />
                <Typography sx={{ fontWeight: 'medium' }}>Bank account</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </RadioGroup>
      </FormControl>
      {paymentType === 'creditCard' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '100%',
              height: 275,
              padding: 3,
              borderRadius: 2,
              border: (theme) => `1px solid ${theme.palette.gray['300']}`,
              backgroundColor: 'background.paper',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                sx={{
                  fontWeight: 500,
                  color: 'gray.700',
                  fontSize: 'xl',
                }}
              >
                Credit card
              </Typography>
              <TbCreditCard size={20} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                gap: 2,
              }}
            >
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-number" required>
                  Card number
                </FormLabel>
                <FilledInput
                  id="card-number"
                  autoComplete="card-number"
                  placeholder="0000 0000 0000 0000"
                  required
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
              </FormControl>
              <FormControl sx={{ maxWidth: '20%' }}>
                <FormLabel htmlFor="cvv" required>
                  CVV
                </FormLabel>
                <FilledInput
                  id="cvv"
                  autoComplete="CVV"
                  placeholder="123"
                  required
                  value={cvv}
                  onChange={handleCvvChange}
                />
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-name" required>
                  Name
                </FormLabel>
                <FilledInput
                  id="card-name"
                  autoComplete="card-name"
                  placeholder="John Smith"
                  required
                />
              </FormControl>
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-expiration" required>
                  Expiration date
                </FormLabel>
                <FilledInput
                  id="card-expiration"
                  autoComplete="card-expiration"
                  placeholder="MM/YY"
                  required
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                />
              </FormControl>
            </Box>
          </Box>
          <FormControlLabel
            control={<Checkbox name="saveCard" />}
            label="Remember credit card details for next time"
          />
        </Box>
      )}
      {paymentType === 'bankTransfer' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Alert severity="warning" icon={<TbAlertTriangle />}>
            Your order will be processed once we receive the funds.
          </Alert>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            Bank account
          </Typography>
          <Typography>
            Please transfer the payment to the bank account details shown below.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography sx={{ color: 'text.secondary' }}>Bank:</Typography>
            <Typography sx={{ fontWeight: 'medium' }}>Mastercredit</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography sx={{ color: 'text.secondary' }}>Account number:</Typography>
            <Typography sx={{ fontWeight: 'medium' }}>123456789</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography sx={{ color: 'text.secondary' }}>Routing number:</Typography>
            <Typography sx={{ fontWeight: 'medium' }}>987654321</Typography>
          </Box>
        </Box>
      )}
    </Stack>
  );
}
