'use client';

import { Autocomplete, TextField } from '@mui/material';

interface MultiEmailInputProps {
  value: string[];
  onChange: (emails: string[]) => void;
  placeholder?: string;
}

export default function MultiEmailInput({ value, onChange, placeholder = 'colleague@company.com, teammate@company.com...' }: MultiEmailInputProps) {
  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData('text');
    const emails = pastedText
      .split(/[\n,;\s\t]+/)
      .map(email => email.trim())
      .filter(email => email.includes('@') && email.length > 0);

    if (emails.length > 1) {
      e.preventDefault();
      onChange([...new Set([...value, ...emails])]);
    }
  };

  return (
    <Autocomplete
      multiple
      freeSolo
      options={[]}
      value={value}
      onChange={(_, newValue) => {
        const validEmails = newValue.filter(email =>
          typeof email === 'string' && email.includes('@')
        );
        onChange(validEmails);
      }}
      onPaste={handlePaste}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          autoComplete="off"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
            readOnly: true,
            onFocus: (e) => {
              e.target.removeAttribute('readonly');
            },
          }}
        />
      )}
      sx={{
        '& .MuiAutocomplete-inputRoot': {
          minHeight: 120,
          alignItems: 'flex-start',
          paddingTop: 1,
        },
      }}
    />
  );
}
