'use client'
import { Button, Stack } from '@mui/material';
import { TbDownload } from 'react-icons/tb';
import { DashboardHeader } from '~/components/DashboardHeader';
import { OrdersTable } from '~/components/OrdersTable';
import { PageContainer } from '~/components/PageContainer';

export function Orders() {
  return (
    <PageContainer>
      <DashboardHeader
        title="Orders"
        actions={
          <Button variant="contained" color="primary" endIcon={<TbDownload />}>
            Export
          </Button>
        }
      />
      <Stack
        spacing={3}
        sx={{
          flex: 1,
        }}
      >
        <OrdersTable allowCheckboxSelection />
      </Stack>
    </PageContainer>
  );
}
