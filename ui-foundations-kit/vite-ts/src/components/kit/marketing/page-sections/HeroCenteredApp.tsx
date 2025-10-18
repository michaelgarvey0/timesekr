import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/system';

export default function HeroCenteredApp() {
  return (
    <Box
      id='hero'
      sx={{
        width: '100%',
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
        isolation: 'isolate',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ width: { xs: '100%', sm: '70%' }, mb: { xs: 4, sm: 5, md: 6 } }}
        >
          <Typography
            variant='h1'
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
            textAlign='center'
            sx={{
              alignSelf: 'center',
              width: { sm: '100%', md: '80%' },
              fontSize: 'lg',
              lineHeight: 1.75,
            }}
          >
            Explore our cutting-edge dashboard, delivering high-quality
            solutions tailored to your needs. Elevate your experience with
            top-tier features and services.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf='center'
            spacing={1}
            useFlexGap
            sx={{
              mt: 2,
              p: 1,
              width: { xs: '100%', sm: 'auto' },
              backgroundColor: 'gray.100',
              borderRadius: 2,
              border: theme => `1px solid ${theme.palette.gray['200']}`,
            }}
          >
            <TextField
              id='outlined-basic'
              hiddenLabel
              size='small'
              variant='filled'
              aria-label='Enter your email address'
              placeholder='your@email.com'
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter your email address',
              }}
            />
            <Button variant='contained' color='primary'>
              Start now
            </Button>
          </Stack>
          <Typography
            textAlign='center'
            sx={{ opacity: 0.75, fontSize: 'xs', color: 'gray.500' }}
          >
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href='#' color='primary'>
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
        <LogoCollection />
        <Box
          id='image'
          sx={theme => ({
            mt: { xs: 2, sm: 3 },
            alignSelf: 'center',
            height: { xs: 200, sm: 700 },
            width: '100%',
            backgroundImage:
              theme.palette.mode === 'light'
                ? 'url("/homepage.png")'
                : 'url("/homepage.png")',
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

const whiteLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg',
];

const darkLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
];

const logoStyle = {
  width: '80px',
  height: '50px',
  margin: '0 32px',
  opacity: 0.5,
};

function LogoCollection() {
  const theme = useTheme();
  const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

  return (
    <Box id='logoCollection'>
      <Grid container justifyContent='center' sx={{ mt: 0.5, opacity: 0.6 }}>
        {logos.map((logo, index) => (
          <Grid item key={index}>
            <img
              src={logo}
              alt={`Fake company number ${index + 1}`}
              style={logoStyle}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
