'use client'
import { Button } from '@mui/material';
import { TbArrowRight } from 'react-icons/tb';
import { AuthMagicLink } from '~/components/AuthMagicLink';
import { PageContainer } from '~/components/PageContainer';
import { FrameworkLink } from '~/framework/FrameworkLink';

export function Register() {
  return (
    <PageContainer
      customSx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AuthMagicLink />
      <FrameworkLink to="/dashboard/home">
        <Button color="secondary" endIcon={<TbArrowRight />}>
          Skip to the dashboard
        </Button>
      </FrameworkLink>
    </PageContainer>
  );
}
