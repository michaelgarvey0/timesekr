import { FilledInput, FormControl, FormLabel, Stack } from '@mui/material';
import ConfirmDialog from '../components/ConfirmDialog';
export function CreateOrganizationDialog({ disclosure }) {
  return (
    <ConfirmDialog
      title="Create New Organization"
      description="You are about to create a new organization that will allow separate workspace settings, different members, and its own set of events. Are you sure you want to continue?"
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
    >
      <Stack spacing={1}>
        <FormControl>
          <FormLabel>Organization name</FormLabel>
          <FilledInput required />
        </FormControl>
        <FormControl>
          <FormLabel>Domain</FormLabel>
          <FilledInput required placeholder="example.com" />
        </FormControl>
      </Stack>
    </ConfirmDialog>
  );
}
