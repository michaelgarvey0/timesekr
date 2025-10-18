import { Box, Divider, List } from '@mui/material';
import {
  TbAd2,
  TbBook,
  TbCalendar,
  TbChartAreaLine,
  TbChartDonut2,
  TbFlask2,
  TbHome,
  TbListDetails,
  TbLockAccess,
  TbMicrophone2,
  TbShoppingCart,
  TbSpeakerphone,
  TbTable,
  TbTicket,
  TbUnlink,
  TbWallpaper,
} from 'react-icons/tb';
import { CommandBar } from '../components/CommandBar';
import { OnboardingButton } from '../components/OnboardingButton';
import { OrganizationSelector } from '../components/OrganizationSelector';
import { ProfileButton } from '../components/ProfileButton';
import { SidebarItem } from '../components/SidebarItem';
export const SIDEBAR_WIDTH = 250;
const ICON_SIZE = 18;
export function Sidebar() {
  return (
    <Box
      component="nav"
      data-tour="sidebar"
      sx={{
        display: { xs: 'none', sm: 'flex' },
        flexDirection: 'column',
        height: '100%',
        maxHeight: '100vh',
        width: SIDEBAR_WIDTH,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          width: SIDEBAR_WIDTH,
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mx: 1.5,
            mt: 1.5,
          }}
        >
          <OrganizationSelector />
        </Box>
        <SidebarDivider />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <List
            sx={{
              pt: 0.5,
              pb: 0,
            }}
          >
            <Box
              component="li"
              sx={{
                px: 1.5,
                mb: 1.5,
              }}
            >
              <CommandBar />
            </Box>
            <SidebarItem href="/dashboard/home" title="Home" icon={<TbHome size={ICON_SIZE} />} />
            <SidebarItem
              href="/dashboard/orders"
              title="Orders"
              icon={<TbTicket size={ICON_SIZE} />}
            />
            <SidebarItem
              href="/dashboard/events"
              title="Events"
              icon={<TbCalendar size={ICON_SIZE} />}
            />
            <SidebarItem
              href="/dashboard/pivot"
              title="Pivot"
              icon={<TbTable size={ICON_SIZE} />}
            />
            <SidebarItem
              href="/dashboard/speakers"
              title="Speakers"
              icon={<TbMicrophone2 size={ICON_SIZE} />}
              rightAdornment={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'xs',
                    color: 'primary.50',
                    bgcolor: 'primary.600',
                    borderRadius: 999,
                    height: 18,
                    width: 18,
                  }}
                >
                  4
                </Box>
              }
            />
            <SidebarDivider />
            <SidebarItem
              href="/dashboard/analytics"
              title="Analytics"
              icon={<TbChartDonut2 size={ICON_SIZE} />}
            />
            <SidebarItem href="/dashboard/charts" title="Charts" icon={<TbChartAreaLine />} />
            <SidebarItem
              href="#"
              title="Experimental Features"
              icon={<TbFlask2 />}
              deemphasized={true}
            />
            <SidebarDivider />
            <SidebarItem href="/#" title="Homepage" icon={<TbAd2 />} />
            <SidebarItem href="/landing" title="Landing Page" icon={<TbWallpaper />} />
            <SidebarItem href="/checkout" title="Checkout" icon={<TbShoppingCart />} />
            <SidebarItem href="/login" title="3rd Party Authentication" icon={<TbLockAccess />} />
            <SidebarItem href="/register" title="Magic Link Authentication" icon={<TbUnlink />} />
            <SidebarItem
              href="https://kit.uifoundations.com/components"
              target="_blank"
              title="Kit Components"
              icon={<TbListDetails />}
            />
            <SidebarItem
              href="https://docs.uifoundations.com"
              target="_blank"
              title="Docs"
              icon={<TbBook />}
            />
          </List>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            flex: 1,
            mb: 1.5,
          }}
        >
          <Box
            sx={{
              px: 1.5,
              py: 2,
              display: 'flex',
              width: '100%',
            }}
          >
            <OnboardingButton />
          </Box>
          <List
            sx={{
              pt: 0.5,
              pb: 0,
            }}
          >
            <SidebarItem href="/changelog" title="Changelog" icon={<TbSpeakerphone />} />
            <SidebarDivider />
          </List>
          <Box
            sx={{
              px: 1.5,
              display: 'flex',
              width: '100%',
            }}
          >
            <ProfileButton />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
function SidebarDivider() {
  return (
    <Box sx={{ py: 1.5 }}>
      <Divider />
    </Box>
  );
}
