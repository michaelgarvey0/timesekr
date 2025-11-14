'use client';

import { Box, TextField } from '@mui/material';
import { useRef, useState, KeyboardEvent } from 'react';

interface VerificationCodeInputProps {
  length?: number;
  onChange?: (code: string) => void;
}

export default function VerificationCodeInput({
  length = 6,
  onChange
}: VerificationCodeInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0];
    }

    if (!/^\d*$/.test(value)) {
      return;
    }

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (onChange) {
      onChange(newValues.join(''));
    }

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);

    if (!/^\d+$/.test(pastedData)) {
      return;
    }

    const newValues = pastedData.split('');
    while (newValues.length < length) {
      newValues.push('');
    }

    setValues(newValues);
    if (onChange) {
      onChange(pastedData);
    }

    const nextEmptyIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextEmptyIndex]?.focus();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        justifyContent: 'center',
      }}
    >
      {values.map((value, index) => (
        <TextField
          key={index}
          inputRef={(ref) => (inputRefs.current[index] = ref)}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
            },
          }}
          sx={{
            width: 48,
            '& .MuiOutlinedInput-root': {
              height: 56,
            },
          }}
        />
      ))}
    </Box>
  );
}
