import { Button, ButtonGroup } from '@mui/material';
export default function ButtonGroupSimple() {
  return (
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button>Save</Button>
      <Button>Edit</Button>
      <Button>Delete</Button>
    </ButtonGroup>
  );
}
