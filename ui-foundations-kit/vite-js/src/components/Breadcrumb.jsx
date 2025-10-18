import { Breadcrumbs, Typography } from '@mui/material';
import { FrameworkLink } from '../framework/FrameworkLink';
export function Breadcrumb({ fontSize = 'md', itemList }) {
  return (
    <Breadcrumbs aria-label="breadcrumb" separator="›">
      {itemList?.map((item, index) => {
        const active = index === itemList.length - 1;
        return (
          <FrameworkLink
            key={`${item.title}-breadcrumb=${index}`}
            to={item.href}
            style={{
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            <Typography
              sx={{
                color: active ? 'gray.900' : 'gray.400',
                fontWeight: 500,
                fontSize: fontSize,
                '&:hover': {
                  filter: 'brightness(1.1)',
                },
              }}
            >
              {item.title}
            </Typography>
          </FrameworkLink>
        );
      })}
    </Breadcrumbs>
  );
}
