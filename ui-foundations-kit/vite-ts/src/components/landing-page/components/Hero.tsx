import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LogoCollection from './LogoCollection';

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
        isolation: 'isolate',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ width: { xs: '100%', sm: '70%' }, mb: { xs: 4, sm: 5, md: 6 } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontWeight: 800,
              letterSpacing: -0.5,
              lineHeight: 1,
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
            }}
          >
            The Beautiful React UI Kit
          </Typography>
          <Typography
            textAlign="center"
            sx={{
              alignSelf: 'center',
              width: { sm: '100%', md: '80%' },
              fontSize: 'lg',
              lineHeight: 1.75,
            }}
          >
            Explore our cutting-edge dashboard, delivering high-quality solutions tailored to your
            needs. Elevate your experience with top-tier features and services.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{
              mt: 2,
              p: 1,
              width: { xs: '100%', sm: 'auto' },
              backgroundColor: 'gray.100',
              borderRadius: 2,
              border: (theme) => `1px solid ${theme.palette.gray['200']}`,
            }}
          >
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              variant="filled"
              aria-label="Enter your email address"
              placeholder="your@email.com"
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter your email address',
              }}
            />
            <Button variant="contained" color="primary">
              Start now
            </Button>
          </Stack>
          <Typography textAlign="center" sx={{ opacity: 0.75, fontSize: 'xs', color: 'gray.500' }}>
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
        <LogoCollection />
        <Box
          id="image"
          sx={(theme) => ({
            mt: { xs: 2, sm: 3 },
            alignSelf: 'center',
            height: { xs: 200, sm: 700 },
            width: '100%',
            backgroundImage:
              theme.palette.mode === 'light' ? 'url("/homepage.png")' : 'url("/homepage.png")',
            backgroundSize: 'cover',
            borderRadius: '10px',
            outline: '1px solid',
            outlineColor: 'gray.200',
            boxShadow: 2,
          })}
        />
      </Container>
    </Box>
  );
}
