import { Menu } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { TbChevronDown } from 'react-icons/tb';

const options = [
  'Create a merge commit',
  'Squash and merge',
  'Rebase and merge',
];

export default function ButtonGroupDual() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleClick = () => {
    console.info(`You clicked the `);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    console.info(`You clicked ${event.currentTarget.textContent}`);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant='contained'
        ref={anchorRef}
        aria-label='Button group with a nested menu'
      >
        <Button onClick={handleClick}>Save</Button>
        <Button
          size='small'
          aria-controls={open ? 'dual-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label='select save strategy'
          aria-haspopup='menu'
          onClick={handleToggle}
        >
          <TbChevronDown />
        </Button>
      </ButtonGroup>
      <Menu
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        onClose={handleClose}
        role={undefined}
        disablePortal
      >
        <MenuItem onClick={event => handleMenuItemClick(event)}>
          Save as Draft
        </MenuItem>
        <MenuItem onClick={event => handleMenuItemClick(event)}>
          Save and Quit
        </MenuItem>
        <MenuItem onClick={event => handleMenuItemClick(event)}>
          Save as new Copy
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
