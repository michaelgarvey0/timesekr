import { Box, Button, Dialog } from '@mui/material';
import { Command } from 'cmdk';
import { AnimatePresence, MotionProps, motion } from 'framer-motion';
import * as React from 'react';
import {
  TbBrandYoutube,
  TbCalendar,
  TbHome,
  TbLink,
  TbMicrophone2,
  TbMoon,
  TbRefresh,
  TbSearch,
  TbStar,
  TbSun,
  TbTicket,
  TbUserPlus,
} from 'react-icons/tb';
import { toast } from 'sonner';

export function CommandBar() {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    function down(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    }

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // autofocus the input when the menu is opened
  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <>
      <Button
        id="command-bar"
        variant="outlined"
        color="secondary"
        size="small"
        sx={{ width: '100%' }}
        onClick={() => setOpen(true)}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            gap: 1.5,
            fontSize: 'sm',
            fontWeight: 500,
            color: 'gray.600',
            paddingX: 0.25,
          }}
        >
          <TbSearch size={20} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              gap: 1,
              width: '100%',
            }}
          >
            Quick actions
          </Box>
          <Box
            component="kbd"
            sx={{
              fontSize: 'md',
              fontWeight: 400,
              paddingX: 0.5,
              lineHeight: 1,
              borderRadius: 1,
              color: 'gray.500',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            ⌘
            <Box
              component="span"
              sx={{
                fontSize: 'xs',
              }}
            >
              K
            </Box>
          </Box>
        </Box>
      </Button>
      <AnimatePresence initial={false}>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="sm"
          keepMounted
          fullWidth
          PaperComponent={({ children, ...props }) => (
            <Box
              sx={{
                height: 550,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                pointerEvents: 'none',
              }}
            >
              <Box
                {...props}
                sx={{
                  ...props.sx,
                  boxShadow: 6,
                  pointerEvents: 'auto',
                  backgroundColor: 'gray.100',
                  margin: 0,
                  maxWidth: '640px',
                  border: (theme) => `1px solid ${theme.palette.gray['200']}`,
                  '&&': {
                    padding: 0.5,
                  },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'gray.100',
                    border: (theme) => `1px solid ${theme.palette.gray['200']}`,
                    borderRadius: 1.5,
                  }}
                >
                  {children}
                </Box>
              </Box>
            </Box>
          )}
          slotProps={{
            backdrop: {
              sx: {
                backgroundColor: 'transparent',
              },
            },
          }}
        >
          <CMDKWrapper>
            <Box
              sx={{
                width: '100%',
                backgroundColor: 'background.paper',
                borderRadius: 1.5,
                overflow: 'hidden',
                padding: 0,
                fontFamily: 'var(--font-sans)',
                boxShadow: 'var(--cmdk-shadow)',
                outline: 'none',
                '[cmdk-linear-shortcuts]': {
                  display: 'flex',
                  marginLeft: 'auto',
                  gap: '8px',
                  kbd: {
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    color: 'var(--gray11)',
                  },
                },
                '[cmdk-input]': {
                  fontFamily: 'var(--font-sans)',
                  border: 'none',
                  borderBottom: (theme) => `1px solid ${theme.palette.gray['100']}`,
                  width: '100%',
                  fontSize: 'md',
                  padding: 2,
                  outline: 'none',
                  backgroundColor: 'gray.50',
                  color: 'gray.600',
                  borderRadius: 0,
                  caretColor: 'primary.500',
                  margin: 0,
                  '&::placeholder': {
                    color: 'gray.400',
                  },
                },
                '[cmdk-item]': {
                  contentVisibility: 'auto',
                  cursor: 'pointer',
                  height: '36px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  marginX: 1,
                  paddingX: 1,
                  color: 'gray.800',
                  userSelect: 'none',
                  willChange: 'background, color',
                  transition: 'all 150ms ease',
                  transitionProperty: 'none',
                  position: 'relative',
                  borderRadius: 1,
                  '&[data-selected="true"]': {
                    backgroundColor: 'gray.100',
                    svg: {
                      color: 'var(--gray12)',
                    },
                  },
                  '&[data-disabled="true"]': {
                    color: 'var(--gray8)',
                    cursor: 'not-allowed',
                  },
                  '&:active': {
                    transitionProperty: 'backgroundColor',
                    backgroundColor: 'gray.300',
                  },
                  '& + [cmdk-item]': {
                    marginTop: '4px',
                  },
                  svg: {
                    width: '16px',
                    height: '16px',
                    color: 'gray.700',
                  },
                },
                '[cmdk-list]': {
                  paddingY: 1,
                  maxHeight: '400px',
                  overflow: 'auto',
                  overscrollBehavior: 'contain',
                  transition: '100ms ease',
                  transitionProperty: 'height',
                },
                '[cmdk-group-heading]': {
                  userSelect: 'none',
                  fontSize: '12px',
                  color: 'var(--gray11)',
                  padding: '0 8px',
                  display: 'flex',
                  alignItems: 'center',
                },
                '[cmdk-empty]': {
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '64px',
                  whiteSpace: 'pre-wrap',
                  color: 'var(--gray11)',
                },
              }}
            >
              <Command>
                <Command.Input autoFocus ref={inputRef} placeholder="Type a command or search..." />
                <Command.List>
                  <Command.Empty>No results found.</Command.Empty>
                  {items.map(({ icon, label, shortcut, onSelect }) => {
                    return (
                      <Command.Item
                        key={label}
                        value={label}
                        onSelect={() => {
                          if (onSelect) {
                            onSelect();
                          } else {
                            toast(label);
                          }
                          // close the menu
                          setOpen(false);
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '24px',
                            height: '24px',
                            backgroundColor: 'gray.100',
                            borderRadius: 1,
                            border: (theme) => `1px solid ${theme.palette.gray['200']}`,
                          }}
                        >
                          {icon}
                        </Box>
                        {label}
                        <div cmdk-linear-shortcuts="">
                          {shortcut.map((key) => {
                            return <kbd key={key}>{key}</kbd>;
                          })}
                        </div>
                      </Command.Item>
                    );
                  })}
                </Command.List>
              </Command>
            </Box>
          </CMDKWrapper>
        </Dialog>
      </AnimatePresence>
    </>
  );
}

function CMDKWrapper(props: MotionProps & { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    />
  );
}

const toastPromise = () => new Promise((resolve) => setTimeout(() => resolve({}), 2000));

const items = [
  {
    icon: <TbStar />,
    label: 'Add this view to favorites',
    shortcut: ['F'],
    onSelect: () => {
      toast.promise(toastPromise, {
        loading: 'Processing your request...',
        success: () => {
          return `This view has been added to your favorites!`;
        },
        error: 'Error',
      });
    },
  },
  {
    icon: <TbUserPlus />,
    label: 'Invite more teammates',
    shortcut: [],
  },
  {
    icon: <TbHome />,
    label: 'Go to Home',
    shortcut: ['G', 'H'],
    onSelect: () => {
      window.location.href = '/dashboard/home';
    },
  },
  {
    icon: <TbTicket />,
    label: 'Go to Orders',
    shortcut: ['G', 'O'],
    onSelect: () => {
      window.location.href = '/dashboard/orders';
    },
  },
  {
    icon: <TbCalendar />,
    label: 'Go to Events',
    shortcut: ['G', 'E'],
    onSelect: () => {
      window.location.href = '/dashboard/events';
    },
  },
  {
    icon: <TbMicrophone2 />,
    label: 'Go to Speakers',
    shortcut: ['G', 'S'],
    onSelect: () => {
      window.location.href = '/dashboard/speakers';
    },
  },
  {
    icon: <TbRefresh />,
    label: 'Refresh cache',
    shortcut: [],
    onSelect: () => {
      toast.promise(toastPromise, {
        loading: 'Clearing local cache...',
        success: () => {
          return `Cache cleared!`;
        },
        error: 'Error',
      });
    },
  },
  {
    icon: <TbLink />,
    label: 'Copy current link to clipboard',
    shortcut: [],
    onSelect: () => {
      toast.info('Link copied to clipboard!');
    },
  },
  {
    icon: <TbSun />,
    label: 'Change to Light Mode',
    shortcut: [],
    onSelect: () => {
      // set the theme to light mode in local storage and refresh the page
      localStorage.setItem('mui-mode', 'light');
      window.location.reload();
    },
  },
  {
    icon: <TbMoon />,
    label: 'Change to Dark Mode',
    shortcut: [],
    onSelect: () => {
      // set the theme to dark mode in local storage and refresh the page
      localStorage.setItem('mui-mode', 'dark');
      window.location.reload();
    },
  },
  {
    icon: <TbBrandYoutube />,
    label: 'Get Rickrolled',
    shortcut: [],
    onSelect: () => {
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    },
  },
];
