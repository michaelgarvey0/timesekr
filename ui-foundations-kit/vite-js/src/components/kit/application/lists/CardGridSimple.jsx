import * as React from 'react';
import { Avatar, Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { TbBellPlus } from 'react-icons/tb';
// simple grid of cards
export default function CardGridSimple() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: 1,
        width: '100%',
      }}
    >
      {PROFILES.map((profile) => (
        <Card key={profile.name}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Avatar
                  src={profile.imgUrl}
                  sx={{
                    objectFit: 'contain',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: 'gray.200',
                  }}
                />
                <Box>
                  <Typography variant="h3">{profile.name}</Typography>
                  <Box
                    sx={{
                      color: 'gray.500',
                      fontSize: 'sm',
                      lineHeight: 1,
                    }}
                  >
                    {profile.domain}
                  </Box>
                </Box>
              </Box>
              <Box>
                <IconButton size="medium">
                  <TbBellPlus />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
const PROFILES = [
  {
    name: 'Spotify',
    imgUrl: 'https://logo.clearbit.com/spotify.com',
    domain: 'spotify.com',
  },
  {
    name: 'Apple',
    imgUrl: 'https://logo.clearbit.com/apple.com',
    domain: 'apple.com',
  },
  {
    name: 'Google',
    imgUrl: 'https://logo.clearbit.com/google.com',
    domain: 'google.com',
  },
  {
    name: 'Airbnb',
    imgUrl: 'https://logo.clearbit.com/airbnb.com',
    domain: 'airbnb.com',
  },
  {
    name: 'Amazon',
    imgUrl: 'https://logo.clearbit.com/amazon.com',
    domain: 'amazon.com',
  },
  {
    name: 'Netflix',
    imgUrl: 'https://logo.clearbit.com/netflix.com',
    domain: 'netflix.com',
  },
  {
    name: 'Uber',
    imgUrl: 'https://logo.clearbit.com/uber.com',
    domain: 'uber.com',
  },
  {
    name: 'Slack',
    imgUrl: 'https://logo.clearbit.com/slack.com',
    domain: 'slack.com',
  },
  {
    name: 'Trello',
    imgUrl: 'https://logo.clearbit.com/trello.com',
    domain: 'trello.com',
  },
];
