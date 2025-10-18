'use client';
import { Box, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Highlight } from 'prism-react-renderer';
import * as React from 'react';
import { HiClipboardCheck, HiOutlineClipboardList } from 'react-icons/hi';
import { useClipboard } from '../hooks/useClipboard';
// pulled from Nord theme with them tools in prism-react-renderer
const theme = {
  plain: {
    color: '#d8dee9',
    backgroundColor: '#2e3440',
  },
  styles: [
    {
      types: ['comment'],
      style: {
        color: 'rgb(97, 110, 136)',
      },
    },
    {
      types: ['char', 'constant', 'changed'],
      style: {
        color: 'rgb(235, 203, 139)',
      },
    },
    {
      types: ['builtin', 'class-name', 'attr-name'],
      style: {
        color: 'rgb(143, 188, 187)',
      },
    },
    {
      types: ['number'],
      style: {
        color: 'rgb(180, 142, 173)',
      },
    },
    {
      types: ['function'],
      style: {
        color: 'rgb(136, 192, 208)',
      },
    },
    {
      types: ['tag', 'operator', 'keyword'],
      style: {
        color: 'rgb(129, 161, 193)',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgb(191, 97, 106)',
      },
    },
    {
      types: ['inserted', 'string'],
      style: {
        color: 'rgb(163, 190, 140)',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: 'rgb(236, 239, 244)',
      },
    },
    {
      types: ['variable', 'symbol'],
      style: {
        color: 'rgb(216, 222, 233)',
      },
    },
  ],
};
export function CodeRenderer({ code, activeLanguage, handleLanguageChange, basic }) {
  const { hasCopied, onCopy } = useClipboard(code);
  return (
    <Highlight code={code} theme={theme} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box
          component="pre"
          className={className}
          style={style}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#717d94',
            borderRadius: 2,
            my: 0,
            overflow: 'auto',
            fontSize: { xs: 'xs', sm: 'sm' },
            fontFamily:
              'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
          }}
        >
          <Box
            role="decoration"
            sx={{
              borderBottom: '1px solid #435067',
              p: 1.5,
              pl: 2,
              display: 'flex',
              gap: 0.5,
              position: 'relative',
            }}
          >
            <Box
              sx={{
                height: '9px',
                width: '9px',
                borderRadius: '50%',
                bgcolor: '#435067',
              }}
            />
            <Box
              sx={{
                height: '9px',
                width: '9px',
                borderRadius: '50%',
                bgcolor: '#435067',
              }}
            />
            <Box
              sx={{
                height: '9px',
                width: '9px',
                borderRadius: '50%',
                bgcolor: '#435067',
              }}
            />
            {basic && (
              <Box
                sx={{
                  position: 'absolute',
                  left: 64,
                  bottom: 6,
                  bgcolor: '#435067',
                  px: 0.5,
                  borderRadius: 0.5,
                }}
              >
                {activeLanguage}
              </Box>
            )}
          </Box>
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                top: 12,
                right: 12,
                gap: 1.5,
                zIndex: 1,
                '&:before': {
                  position: 'absolute',
                  zIndex: 0,
                  content: "''",
                  width: '164px',
                  height: '32px',
                  bgcolor: '#2e3440',
                },
              }}
            >
              <IconButton
                sx={{
                  borderColor: '#435067',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  color: '#858f9f',
                  cursor: 'copy',
                }}
                onClick={onCopy}
              >
                {hasCopied ? <HiClipboardCheck /> : <HiOutlineClipboardList />}
              </IconButton>
              {basic ? null : (
                <ToggleButtonGroup
                  value={activeLanguage}
                  exclusive
                  onChange={handleLanguageChange}
                  size="small"
                  sx={{
                    bgcolor: 'transparent',
                    '.MuiButtonBase-root': {
                      color: '#c8cfdb !important',
                      opacity: 0.5,
                      filter: 'grayscale(50%)',
                    },
                    '.Mui-selected': {
                      opacity: 1,
                      filter: 'grayscale(0%)',
                    },
                  }}
                >
                  <ToggleButton
                    value="tsx"
                    sx={{
                      px: 1,
                      py: 0.25,
                      borderColor: '#435067',
                      borderRadius: 1.5,
                    }}
                  >
                    <Box
                      component="img"
                      src="/logos/ts.png"
                      alt="TypeScript logo"
                      sx={{
                        height: '14px',
                        width: '14px',
                        borderRadius: 0.25,
                      }}
                    />
                    .tsx
                  </ToggleButton>
                  <ToggleButton
                    value="jsx"
                    sx={{
                      px: 1,
                      py: 0.25,
                      borderColor: '#435067',
                      borderRadius: 1.5,
                    }}
                  >
                    <Box
                      component="img"
                      src="/logos/js.png"
                      alt="JavaScript logo"
                      sx={{
                        height: '14px',
                        width: '14px',
                        borderRadius: 0.25,
                      }}
                    />
                    .jsx
                  </ToggleButton>
                </ToggleButtonGroup>
              )}
            </Box>
          </Box>
          <Box
            id="code-box"
            sx={{
              p: 2,
              overflow: 'auto',
              height: '100%',
            }}
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })} key={`code-line-${i}`}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} key={`code-span-${key}`} />
                ))}
              </div>
            ))}
          </Box>
        </Box>
      )}
    </Highlight>
  );
}
