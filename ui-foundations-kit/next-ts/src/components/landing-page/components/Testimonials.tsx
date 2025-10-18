'use client'
import { Avatar, Box, Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react';

const TestimonialCard = ({
  quote,
  author,
  company,
  avatarSrc,
  companyAvatarSrc,
}: {
  quote: React.ReactNode;
  author: string;
  company: string;
  avatarSrc: string;
  companyAvatarSrc: string;
}) => (
  <Box
    sx={{
      backgroundColor: 'background.paper',
      border: (theme) => `1px solid ${theme.palette.divider}`,
      borderRadius: 2,
      p: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 2,
    }}
  >
    <Typography sx={{ flex: 1, fontSize: 'lg', color: 'gray.500', mb: 2 }}>{quote}</Typography>
    <Stack
      direction="row"
      spacing={2}
      component="a"
      target="_blank"
      rel="noopener noreferrer"
      sx={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Stack direction="row">
        <Avatar
          src={companyAvatarSrc}
          sx={{
            width: 40,
            height: 40,
            mr: -1.125,
            zIndex: 1,
            border: (theme) => `4px solid ${theme.palette.gray['100']}`,
          }}
        />
        <Avatar
          src={avatarSrc}
          sx={{
            width: 40,
            height: 40,
            zIndex: 2,
            border: (theme) => `4px solid ${theme.palette.gray['100']}`,
          }}
        />
      </Stack>
      <Box>
        <Typography sx={{ fontWeight: 500 }}>{author}</Typography>
        <Typography sx={{ color: 'text.secondary', mt: -0.25 }}>{company}</Typography>
      </Box>
    </Stack>
  </Box>
);

export function Testimonials() {
  return (
    <Box
      sx={{
        backgroundColor: 'gray.100',
        py: 12,
      }}
    >
      <Container sx={{ width: '100%' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '3xl', sm: '5xl' },
            fontWeight: 700,
            mb: 4,
          }}
        >
          More signal, less noise
        </Typography>
        <Grid container spacing={2} sx={{ width: '100%' }}>
          <Grid item xs={12} md={6}>
            <TestimonialCard
              quote={
                <>
                  We went from slow back and forth between designers and developers to a full team
                  focused on shipping, with{' '}
                  <Box
                    component="span"
                    sx={{
                      mx: -0.25,
                      px: 0.25,
                      borderRadius: 0.5,
                      bgcolor: 'yellow.200',
                      color: 'gray.800',
                      fontWeight: 500,
                    }}
                  >
                    huge productivity boosts over Figma
                  </Box>
                  . I can't imagine going back.
                </>
              }
              author="Jana Pluim"
              company="Co-founder, Cooperative"
              avatarSrc="https://i.pravatar.cc/150?u=coop"
              companyAvatarSrc="/logos/Cooperative.jpg"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TestimonialCard
              quote={
                <>
                  UI Foundations Kit is{' '}
                  <Box
                    component="span"
                    sx={{
                      mx: -0.25,
                      px: 0.25,
                      borderRadius: 0.5,
                      bgcolor: 'yellow.200',
                      color: 'gray.800',
                      fontWeight: 500,
                    }}
                  >
                    the perfect tool for focused teams
                  </Box>
                  . You can ignore so many problems when you rely on them for the basics. We finally
                  stopped worrying about fonts, spacing, and typography.
                </>
              }
              author="Edwin Arnott"
              company="Co-founder, Global Bank"
              avatarSrc="https://i.pravatar.cc/150?u=Arrows"
              companyAvatarSrc="/logos/GlobalBank.jpg"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TestimonialCard
              quote={
                <>
                  It's like we can finally take a breather and get our work done. I used to spend
                  hours in Figma to{' '}
                  <Box
                    component="span"
                    sx={{
                      mx: -0.25,
                      px: 0.25,
                      borderRadius: 0.5,
                      bgcolor: 'yellow.200',
                      color: 'gray.800',
                      fontWeight: 500,
                    }}
                  >
                    keep everyone in the loop on work-in-progress designs
                  </Box>
                  .
                </>
              }
              author="Riley Avila"
              company="CTO, Leapyear"
              avatarSrc="https://i.pravatar.cc/150?u=Retro"
              companyAvatarSrc="/logos/Leapyear.jpg"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TestimonialCard
              quote={
                <>
                  I've tried just about everything, and UI Foundations Kit is{' '}
                  <Box
                    component="span"
                    sx={{
                      mx: -0.25,
                      px: 0.25,
                      borderRadius: 0.5,
                      bgcolor: 'yellow.200',
                      color: 'gray.800',
                      fontWeight: 500,
                    }}
                  >
                    hands-down the best template to get work done
                  </Box>
                  . Its got a comprehensive set of UI components, a beautiful theme, and constant
                  updates.
                </>
              }
              author="Jamie Rudin"
              company="Founder, Railspeed"
              avatarSrc="https://i.pravatar.cc/150?u=Clad"
              companyAvatarSrc="/logos/Railspeed.jpg"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
