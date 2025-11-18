'use client';

import { Box, Typography, Link, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import VerificationForm from './components/VerificationForm';

const valueProps = [
  'Schedule meetings across organizations instantly',
  'Find availability without endless email chains',
  'Coordinate with teams across companies seamlessly',
  'Save hours on meeting scheduling',
];

export default function Home() {
  const [showSignup, setShowSignup] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [currentPropIndex, setCurrentPropIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPropIndex((prev) => (prev + 1) % valueProps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleEmailClick = () => {
    setShowSignup(true);
  };

  const handleCreateAccount = () => {
    setShowVerify(true);
  };

  const handleVerify = () => {
    window.location.href = '/connect-calendar';
  };

  const handleResend = () => {
    console.log('Resend code');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left side - Sign In Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          position: 'relative',
        }}
      >
        {(showSignup || showVerify) && (
          <IconButton
            onClick={() => {
              if (showVerify) {
                setShowVerify(false);
              } else {
                setShowSignup(false);
              }
            }}
            sx={{ position: 'absolute', top: 16, left: 16 }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}

        <Box sx={{ maxWidth: 320, width: '100%' }}>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
            <Image
              src="/images/logomark.svg"
              alt="timesēkr"
              width={150}
              height={40}
              priority
            />
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
            {showVerify ? 'Verify your email' : showSignup ? 'Create your account' : 'Find meeting times instantly'}
          </Typography>

          {!showSignup && !showVerify && (
            <LoginForm
              email={email}
              setEmail={setEmail}
              onContinue={handleEmailClick}
            />
          )}

          {showSignup && !showVerify && (
            <SignupForm
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              phone={phone}
              setPhone={setPhone}
              password={password}
              setPassword={setPassword}
              onCreateAccount={handleCreateAccount}
            />
          )}

          {showVerify && (
            <VerificationForm
              email={email}
              onVerify={handleVerify}
              onResend={handleResend}
            />
          )}

        </Box>
      </Box>

      {/* Right side - Image Container */}
      <Box
        sx={{
          flex: 1,
          p: 3,
          pr: 3,
          pt: 3,
          pb: 3,
          pl: 0,
        }}
      >
        <Box
          sx={{
            height: '100%',
            bgcolor: 'background.accentLight',
            borderRadius: 2,
            position: 'relative',
            boxShadow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100%',
            }}
          >
            <Image
              src="/images/graphic.svg"
              alt="Graphic"
              width={400}
              height={400}
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>

          <Box
            sx={{
              position: 'absolute',
              bottom: 24,
              left: 6,
              right: 6,
              textAlign: 'center',
            }}
          >
            <Typography
              key={currentPropIndex}
              variant="h5"
              sx={{
                fontWeight: 500,
                color: 'primary.main',
                animation: 'fadeInOut 4s ease-in-out',
                '@keyframes fadeInOut': {
                  '0%, 100%': { opacity: 0 },
                  '10%, 90%': { opacity: 1 },
                },
              }}
            >
              {valueProps[currentPropIndex]}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
