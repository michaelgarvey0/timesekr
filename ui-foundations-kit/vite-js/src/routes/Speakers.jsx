import { Button, Stack } from '@mui/material';
import { TbPlus } from 'react-icons/tb';
import { DashboardHeader } from '../components/DashboardHeader';
import { PageContainer } from '../components/PageContainer';
import { SpeakersList } from '../components/SpeakersList';
export function Speakers() {
  return (
    <PageContainer>
      <DashboardHeader
        title="Speakers"
        actions={
          <Button variant="contained" color="primary" startIcon={<TbPlus />}>
            New Speaker
          </Button>
        }
      />
      <Stack
        spacing={3}
        sx={{
          flex: 1,
        }}
      >
        <SpeakersList />
      </Stack>
    </PageContainer>
  );
}
