'use client'
import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';

import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

import { TbArrowBack, TbArrowLeft, TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import { Logo } from '~/components/Logo';
import AddressForm from './AddressForm';
import Info from './Info';
import InfoMobile from './InfoMobile';
import PaymentForm from './PaymentForm';
import Review from './Review';

const steps = ['Shipping address', 'Payment details', 'Review your order'];
function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}
export function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <Grid container sx={{ height: { xs: '100%', sm: '100dvh' } }}>
      <Grid
        item
        xs={12}
        sm={6}
        lg={6}
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          backgroundColor: 'background.paper',
          borderRight: { sm: 'none', md: '1px solid' },
          borderColor: { sm: 'none', md: 'divider' },
          alignItems: 'start',
          pt: 4,
          px: 10,
          gap: 4,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'end', height: 150 }}>
          <Button
            startIcon={<TbArrowLeft />}
            onClick={() => {
              window.history.back();
            }}
            sx={{ ml: '-8px', gap: 1 }}
          >
            Back to
            <Logo height={24} width={120} />
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            width: '100%',
            maxWidth: 500,
          }}
        >
          <Info totalPrice={activeStep >= 2 ? '$144.97' : '$134.98'} />
        </Box>
      </Grid>
      <Grid
        item
        sm={12}
        md={6}
        lg={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          width: '100%',
          backgroundColor: { xs: 'transparent', sm: 'background.default' },
          alignItems: 'start',
          pt: { xs: 2, sm: 4 },
          px: { xs: 2, sm: 10 },
          gap: { xs: 4, md: 8 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: { sm: 'space-between', md: 'flex-end' },
            alignItems: 'center',
            width: '100%',
            maxWidth: { sm: '100%', md: 600 },
          }}
        >
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Button
              startIcon={<TbArrowBack />}
              onClick={() => {
                window.history.back();
              }}
              sx={{ alignSelf: 'start' }}
            >
              Back to
              <Logo height={24} width={120} />
            </Button>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexGrow: 1,
              height: 150,
            }}
          >
            <div />
            <Stepper
              id="desktop-stepper"
              activeStep={activeStep}
              sx={{ width: '100%', height: 40 }}
            >
              {steps.map((label) => (
                <Step sx={{ ':first-of-type': { pl: 0 }, ':last-of-type': { pr: 0 } }} key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>
        <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
          <CardContent
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              ':last-of-type': { pb: 2 },
            }}
          >
            <div>
              <Typography variant="subtitle2" gutterBottom>
                Selected products
              </Typography>
              <Typography>{activeStep >= 2 ? '$144.97' : '$134.98'}</Typography>
            </div>
            <InfoMobile totalPrice={activeStep >= 2 ? '$144.97' : '$134.98'} />
          </CardContent>
        </Card>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            width: '100%',
            maxWidth: { sm: '100%', md: 600 },
            maxHeight: '720px',
            gap: { xs: 5, md: 'none' },
          }}
        >
          <Stepper
            id="mobile-stepper"
            activeStep={activeStep}
            alternativeLabel
            sx={{ display: { sm: 'flex', md: 'none' } }}
          >
            {steps.map((label) => (
              <Step
                sx={{
                  ':first-of-type': { pl: 0 },
                  ':last-of-type': { pr: 0 },
                  '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                }}
                key={label}
              >
                <StepLabel sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Stack spacing={2} useFlexGap>
              <Typography variant="h1">📦</Typography>
              <Typography>Thank you for your order!</Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Your order number is
                <strong>&nbsp;#140396</strong>. We have emailed your order confirmation and will
                update you once its shipped.
              </Typography>
              <Button
                variant="contained"
                sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
              >
                Go to my orders
              </Button>
            </Stack>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box
                sx={[
                  {
                    display: 'flex',
                    flexDirection: { xs: 'column-reverse', sm: 'row' },
                    alignItems: 'end',
                    flexGrow: 1,
                    gap: 1,
                    pb: { xs: 12, sm: 0 },
                    mt: { xs: 2, sm: 0 },
                    mb: '60px',
                  },
                  activeStep !== 0
                    ? { justifyContent: 'space-between' }
                    : { justifyContent: 'flex-end' },
                ]}
              >
                {activeStep !== 0 && (
                  <Button
                    startIcon={<TbChevronLeft />}
                    onClick={handleBack}
                    variant="text"
                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                  >
                    Previous
                  </Button>
                )}
                {activeStep !== 0 && (
                  <Button
                    startIcon={<TbChevronLeft />}
                    onClick={handleBack}
                    variant="outlined"
                    fullWidth
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                  >
                    Previous
                  </Button>
                )}
                <Button
                  variant="contained"
                  endIcon={<TbChevronRight />}
                  onClick={handleNext}
                  sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
