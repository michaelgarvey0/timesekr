'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { TbBrandX } from 'react-icons/tb';
import { Logo } from '../../../components/Logo';
function Copyright() {
    return (<Typography sx={{ color: 'gray.600' }} mt={1}>
      {'Copyright © '}
      <Link href="https://mui.com/">UI Foundations Kit&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>);
}
export default function Footer() {
    return (<Box sx={{
            backgroundColor: 'gray.100',
        }}>
      <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 4, sm: 8 },
            py: { xs: 8, sm: 10 },
            textAlign: { sm: 'center', md: 'left' },
            a: {
                textDecoration: 'none',
                '&:hover': {
                    textDecoration: 'underline',
                },
            },
        }}>
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
        }}>
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
              <Box sx={{ mb: 2 }}>
                <Logo width={160}/>
              </Box>
              <Typography fontWeight={500} gutterBottom>
                Newsletter
              </Typography>
              <Typography sx={{ color: 'gray.600' }} mb={2}>
                Subscribe to our newsletter for weekly updates and promotions.
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap>
                <TextField id="outlined-basic" hiddenLabel size="small" variant="filled" fullWidth aria-label="Enter your email address" placeholder="your@email.com" inputProps={{
            autoComplete: 'off',
            'aria-label': 'Enter your email address',
        }}/>
                <Button variant="contained" color="primary" sx={{ flexShrink: 0 }}>
                  Subscribe
                </Button>
              </Stack>
            </Box>
          </Box>
          <Box sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
        }}>
            <Typography fontWeight={600}>Product</Typography>
            <Link sx={{ color: 'gray.600' }} href="#">
              Features
            </Link>
            <Link sx={{ color: 'gray.600' }} href="#">
              Testimonials
            </Link>
            <Link sx={{ color: 'gray.600' }} href="#">
              Highlights
            </Link>
            <Link sx={{ color: 'gray.600' }} href="#">
              Pricing
            </Link>
            <Link sx={{ color: 'gray.600' }} href="#">
              FAQs
            </Link>
          </Box>
          <Box sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
        }}>
            <Typography fontWeight={600}>Company</Typography>
            <Link sx={{ color: 'gray.600' }} href="#">
              About us
            </Link>
            <Link sx={{ color: 'gray.600' }} href="#">
              Careers
            </Link>
            <Link sx={{ color: 'gray.600' }} href="#">
              Press
            </Link>
          </Box>
          <Box sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
        }}>
            <Typography fontWeight={600}>Legal</Typography>
            <Link sx={{ color: 'gray.600' }} href="#">
              Terms
            </Link>
            <Link sx={{ color: 'gray.600' }} href="#">
              Privacy
            </Link>
            <Link sx={{ color: 'gray.600' }} href="#">
              Contact
            </Link>
          </Box>
        </Box>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px dashed',
            borderColor: 'divider',
        }}>
          <div>
            <Link sx={{ color: 'gray.600' }} href="#">
              Privacy Policy
            </Link>
            <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link sx={{ color: 'gray.600' }} href="#">
              Terms of Service
            </Link>
            <Copyright />
          </div>
          <Stack direction="row" justifyContent="left" spacing={1} useFlexGap sx={{
            color: 'text.secondary',
        }}>
            <IconButton color="inherit" href="https://x.com/uifoundations" aria-label="X" sx={{ alignSelf: 'center' }}>
              <TbBrandX />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>);
}
