'use client'
import { Box, Button, Popover, Stack, Typography, useColorScheme } from '@mui/material';
import { TbAlertTriangle, TbArrowRight, TbColorSwatch } from 'react-icons/tb';
import { BarChartComposition } from '~/components/BarChartComposition';
import { BarListComposition } from '~/components/BarListComposition';
import { ColorDot } from '~/components/ColorDot';
import { DashboardHeader } from '~/components/DashboardHeader';
import { LineChartComposition } from '~/components/LineChartComposition';
import { NpsSurvey } from '~/components/NpsSurvey';
import { OrdersTable } from '~/components/OrdersTable';
import { PageContainer } from '~/components/PageContainer';
import { useBroadcastTour } from '~/context/BroadcastTourProvider';
import { useThemeCustomization } from '~/context/ThemeCustomizationProvider';
import { formatAbbreviatedNumber, formatShortDate } from '~/core/formatters';
import { DUMMY_TIMESERIES } from '~/data/timeseries';
import { FrameworkLink } from '~/framework/FrameworkLink';
import { useDisclosure } from '~/hooks/useDisclosure';
import { ALL_AVAIL_COLOR_SCALES_LIST, ALL_AVAIL_FONTS_LIST, ALL_RADIUS_SCALES_LIST } from '~/theme';

export function Home() {
  const { broadcastTour } = useBroadcastTour();
  const customizeDisclosure = useDisclosure({ provideAnchorEl: true });
  const npsDisclosure = useDisclosure();
  const { setActiveColorScale, setActiveRadiusScale, setActiveFont } = useThemeCustomization();
  const { setMode } = useColorScheme();

  return (
    <PageContainer>
      <NpsSurvey disclosure={npsDisclosure} />
      <DashboardHeader
        title="Home"
        subtitle="Welcome back, Ally"
        actions={
          <Stack spacing={1} direction="row">
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<TbColorSwatch size={14} />}
              onClick={customizeDisclosure.onOpen}
            >
              Customize Theme
            </Button>
            <Popover
              open={customizeDisclosure.isOpen}
              anchorEl={customizeDisclosure.anchorEl}
              onClose={customizeDisclosure.onClose}
              sx={{
                '.MuiPaper-root': {
                  boxShadow: 2,
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  padding: 2,
                  minWidth: 300,
                  maxWidth: 440,
                  gap: 1,
                  position: 'relative',
                  width: '100%',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 'sm',
                    color: 'gray.800',
                  }}
                >
                  Color
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 1,
                    width: '100%',
                  }}
                >
                  {ALL_AVAIL_COLOR_SCALES_LIST.map((colorScale) => {
                    return (
                      <Button
                        key={colorScale.value}
                        color="secondary"
                        size="small"
                        onClick={() => setActiveColorScale(colorScale.value)}
                        sx={{
                          width: '100%',
                          gap: 1,
                          justifyContent: 'flex-start',
                        }}
                      >
                        <ColorDot color={colorScale.value} />
                        {colorScale.label}
                      </Button>
                    );
                  })}
                </Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 'sm',
                    color: 'gray.800',
                  }}
                >
                  Radius
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 1,
                    width: '100%',
                  }}
                >
                  {ALL_RADIUS_SCALES_LIST.map((radiusScale) => {
                    return (
                      <Button
                        key={radiusScale.value}
                        color="secondary"
                        size="small"
                        onClick={() => setActiveRadiusScale(radiusScale.value)}
                        sx={{
                          width: '100%',
                          justifyContent: 'flex-start',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                          }}
                        >
                          <Box>{radiusScale.label}</Box>
                          <Box
                            sx={{
                              lineHeight: 1,
                              fontSize: '2xs',
                              color: 'gray.600',
                              fontWeight: 400,
                            }}
                          >
                            {radiusScale.description}
                          </Box>
                        </Box>
                      </Button>
                    );
                  })}
                </Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 'sm',
                    color: 'gray.800',
                  }}
                >
                  Font
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 1,
                    width: '100%',
                  }}
                >
                  {ALL_AVAIL_FONTS_LIST.map((fontObject) => {
                    return (
                      <Button
                        key={fontObject.value}
                        color="secondary"
                        size="small"
                        onClick={() => setActiveFont(fontObject.value)}
                        sx={{
                          width: '100%',
                          justifyContent: 'flex-start',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                          }}
                        >
                          <Box
                            sx={{
                              fontFamily: fontObject.value,
                            }}
                          >
                            {fontObject.value}
                          </Box>
                        </Box>
                      </Button>
                    );
                  })}
                </Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 'sm',
                    color: 'gray.800',
                  }}
                >
                  Mode
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 1,
                    width: '100%',
                  }}
                >
                  <Button
                    color="secondary"
                    size="small"
                    onClick={() => setMode('light')}
                    sx={{
                      width: '100%',
                      justifyContent: 'flex-start',
                    }}
                  >
                    Light
                  </Button>
                  <Button
                    color="secondary"
                    size="small"
                    onClick={() => setMode('dark')}
                    sx={{
                      width: '100%',
                      justifyContent: 'flex-start',
                    }}
                  >
                    Dark
                  </Button>
                </Box>
              </Box>
            </Popover>
            <Button
              variant="outlined"
              color="secondary"
              onClick={npsDisclosure.onToggle}
              sx={{
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {npsDisclosure.isOpen ? 'Close' : 'Open'} Survey
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                broadcastTour('welcome');
              }}
              sx={{
                display: { xs: 'none', md: 'flex' },
              }}
            >
              Take a Tour
            </Button>
          </Stack>
        }
      />
      <Stack spacing={3}>
        <Box
          id="home-alert"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 1,
            fontSize: 'sm',
            padding: 1.5,
            border: (theme) => `1px dashed ${theme.palette.yellow['400']}`,
            backgroundColor: 'yellow.50',
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: { xs: 'flex-start', md: 'center' },
              flexDirection: 'row',
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: 1,
                backgroundColor: 'yellow.100',
                borderRadius: 999,
                color: 'yellow.800',
              }}
            >
              <TbAlertTriangle size={20} />
            </Box>
            <Box
              sx={{
                width: '100%',
              }}
            >
              4 Speakers have not submitted outlines.{' '}
              <Box
                component="span"
                sx={{
                  color: 'gray.500',
                }}
              >
                You may consider reaching out or extending the deadline.
              </Box>
            </Box>
          </Box>
          <Button
            color="secondary"
            onClick={() => {
              document.getElementById('home-alert')?.remove();
            }}
          >
            Ignore
          </Button>
          <FrameworkLink to="/dashboard/speakers">
            <Button endIcon={<TbArrowRight />}>View</Button>
          </FrameworkLink>
        </Box>
        <Box
          data-tour="home-charts"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2,
            rowGap: 4,
          }}
        >
          <LineChartComposition
            title="Ticket Revenue Over Time"
            totalValue={4500}
            totalRenderer={(value) => `$${value}`}
            chartHeight={250}
            chartProps={{
              dataset: DUMMY_TIMESERIES,
              xAxis: [
                {
                  id: 'categories',
                  dataKey: 'date',
                  scaleType: 'band',
                  valueFormatter: formatShortDate,
                  tickNumber: 2,
                  tickLabelInterval(value, index) {
                    // only show the first and last ticks
                    return index === 0 || index === DUMMY_TIMESERIES.length - 1;
                  },
                },
              ],
              series: [
                {
                  dataKey: 'value',
                  valueFormatter: (value) => (value ? `$${formatAbbreviatedNumber(value)}` : ''),
                  stack: 'total',
                  area: true,
                },
                {
                  dataKey: 'secondaryValue',
                  valueFormatter: (value) => (value ? `$${formatAbbreviatedNumber(value)}` : ''),
                  stack: 'total',
                  area: true,
                },
              ],
            }}
          />
          <BarChartComposition
            title="7d Tickets Sold"
            totalValue={210}
            chartHeight={250}
            chartProps={{
              xAxis: [
                {
                  id: 'barCategories',
                  data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                  scaleType: 'band',
                },
              ],
              series: [
                {
                  data: [14, 58, 56, 61, 59, 41, 12],
                },
              ],
            }}
          />
          <BarListComposition
            title="Tickets sold by Event"
            totalValue={1200 + 175 + 42}
            chartHeight={250}
            chartProps={{
              data: [
                { name: 'InnovateTech', value: 1200 },
                { name: 'Visionary Symposium', value: 880 },
                { name: 'Global Trends Conference', value: 175 },
                { name: 'Code Conf', value: 4 },
              ],
              nameField: 'name',
              valueField: 'value',
            }}
          />
        </Box>
        <Box
          data-tour="home-table"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            width: '100%',
          }}
        >
          <Stack
            spacing={1}
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: (theme) => `1px solid ${theme.palette.gray['200']}`,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: 'sm',
                color: 'gray.900',
                fontWeight: 500,
              }}
            >
              Recent Ticket Sales
            </Typography>
            <Button
              component={FrameworkLink}
              to="/dashboard/orders"
              color="secondary"
              endIcon={<TbArrowRight />}
              size="small"
            >
              See More
            </Button>
          </Stack>
          <OrdersTable tableHeight={350} />
        </Box>
      </Stack>
    </PageContainer>
  );
}
