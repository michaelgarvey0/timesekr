'use client';

import { Box, Typography, Link, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import VerificationForm from '@/components/VerificationForm';
import CalendarConnectionForm from '@/components/CalendarConnectionForm';
import ContactsConnectionForm from '@/components/ContactsConnectionForm';

const valueProps = [
  'Schedule meetings across organizations instantly',
  'Find availability without endless email chains',
  'Coordinate with teams across companies seamlessly',
  'Save hours on meeting scheduling',
];

interface ConnectedCalendar {
  provider: string;
  email?: string;
  id: string;
}

export default function Home() {
  const [showSignup, setShowSignup] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [currentPropIndex, setCurrentPropIndex] = useState(0);
  const [connectedCalendars, setConnectedCalendars] = useState<ConnectedCalendar[]>([]);

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
    window.location.href = '/onboarding/calendars';
  };

  const handleResend = () => {
    console.log('Resend code');
  };

  const handleConnectCalendar = (provider: string) => {
    // Simulate connecting a calendar account
    const mockEmail = provider === 'ics' ? undefined : `user@${provider}.com`;
    const newCalendar: ConnectedCalendar = {
      provider,
      email: mockEmail,
      id: `${provider}-${Date.now()}`,
    };
    setConnectedCalendars([...connectedCalendars, newCalendar]);
  };

  const handleRemoveCalendar = (id: string) => {
    setConnectedCalendars(connectedCalendars.filter(cal => cal.id !== id));
  };

  const handleSkipCalendar = () => {
    setShowContacts(true);
  };

  const handleConnectContacts = () => {
    window.location.href = '/home';
  };

  const handleSkipContacts = () => {
    window.location.href = '/home';
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      {/* SUPER OBVIOUS MESSAGE */}
      <Box
        sx={{
          bgcolor: '#FF6B35',
          color: 'white',
          p: 3,
          textAlign: 'center',
          fontSize: '28px',
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          borderBottom: '5px solid #FF4500',
        }}
      >
        🚀 THIS IS A CLONED PROTOTYPE BRANCH - SUPER OBVIOUS MESSAGE! 🚀
      </Box>

      <Box sx={{ display: 'flex', flex: 1 }}>
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
        {(showSignup || showVerify || showCalendar || showContacts) && (
          <IconButton
            onClick={() => {
              if (showContacts) {
                setShowContacts(false);
              } else if (showCalendar) {
                setShowCalendar(false);
              } else if (showVerify) {
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
            {showContacts ? 'Connect your contacts' : showCalendar ? 'Connect your calendars' : showVerify ? 'Verify your email' : showSignup ? 'Create your account' : 'Find meeting times instantly'}
          </Typography>

          {!showSignup && !showVerify && !showCalendar && !showContacts && (
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

          {showVerify && !showCalendar && (
            <VerificationForm
              email={email}
              onVerify={handleVerify}
              onResend={handleResend}
            />
          )}

          {showCalendar && !showContacts && (
            <CalendarConnectionForm
              onConnect={handleConnectCalendar}
              onSkip={handleSkipCalendar}
              connectedCalendars={connectedCalendars}
              onRemove={handleRemoveCalendar}
            />
          )}

          {showContacts && (
            <ContactsConnectionForm
              onConnect={handleConnectContacts}
              onSkip={handleSkipContacts}
            />
          )}

          {!showSignup && !showVerify && !showCalendar && !showContacts && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account?{' '}
              <Link href="/signin" underline="hover">
                Sign in
              </Link>
            </Typography>
          )}
        </Box>
      </Box>

      {/* Right side - Image Container */}
      <Box
        sx={{
          flex: 1,
          p: '24px',
          pr: '24px',
          pt: '24px',
          pb: '24px',
          pl: 0,
        }}
      >
        <Box
          sx={{
            height: '100%',
            bgcolor: '#EDF5F9',
            borderRadius: 2,
            position: 'relative',
            boxShadow: 'inset 0 2px 32px rgba(0, 0, 0, 0.05)',
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
              bottom: 48,
              left: 48,
              right: 48,
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
    </Box>
  );
}
