import * as React from 'react';
import { Box, Typography } from '@mui/material';
// simple grid of image files
export default function CardGridImages() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
        },
        gap: 3,
        width: '100%',
      }}
    >
      {PROFILES.map((profile) => (
        <Box
          key={profile.filename}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Box
            component="img"
            src={profile.imgUrl}
            sx={{
              height: 240,
              width: '100%',
              aspectRatio: '3 / 2',
              objectFit: 'cover',
              borderRadius: 1,
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{
                fontSize: 'md',
                fontWeight: 500,
              }}
            >
              {profile.filename}
            </Typography>
            <Typography
              sx={{
                fontSize: 'sm',
                color: 'gray.500',
                lineHeight: 1.25,
              }}
            >
              {profile.filesize}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
const PROFILES = [
  {
    filename: 'IMG_0001.jpg',
    imgUrl: 'https://picsum.photos/seed/4321/900/600',
    filesize: '3.2 MB',
  },
  {
    filename: 'IMG_0002.jpg',
    imgUrl: 'https://picsum.photos/seed/1234/900/600',
    filesize: '3.2 MB',
  },
  {
    filename: 'IMG_0003.jpg',
    imgUrl: 'https://picsum.photos/seed/2345/900/600',
    filesize: '3.2 MB',
  },
  {
    filename: 'IMG_0004.jpg',
    imgUrl: 'https://picsum.photos/seed/3456/900/600',
    filesize: '3.2 MB',
  },
  {
    filename: 'IMG_0005.jpg',
    imgUrl: 'https://picsum.photos/seed/6543/900/600',
    filesize: '3.2 MB',
  },
  {
    filename: 'IMG_0006.jpg',
    imgUrl: 'https://picsum.photos/seed/9876/900/600',
    filesize: '3.2 MB',
  },
  {
    filename: 'IMG_0007.jpg',
    imgUrl: 'https://picsum.photos/seed/3726/900/600',
    filesize: '3.2 MB',
  },
  {
    filename: 'IMG_0008.jpg',
    imgUrl: 'https://picsum.photos/seed/9283/900/600',
    filesize: '3.2 MB',
  },
];
