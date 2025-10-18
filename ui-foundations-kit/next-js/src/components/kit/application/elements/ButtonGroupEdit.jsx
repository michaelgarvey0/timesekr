import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import * as React from 'react';
import { TbBold, TbItalic, TbStrikethrough, TbUnderline } from 'react-icons/tb';
export default function ButtonGroupEdit() {
  const [formats, setFormats] = React.useState(() => ['bold', 'italic']);
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };
  return (
    <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label="text formatting">
      <ToggleButton value="bold" aria-label="bold">
        <TbBold />
      </ToggleButton>
      <ToggleButton value="italic" aria-label="italic">
        <TbItalic />
      </ToggleButton>
      <ToggleButton value="underlined" aria-label="underlined">
        <TbUnderline />
      </ToggleButton>
      <ToggleButton value="strikethrough" aria-label="strikethrough">
        <TbStrikethrough />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
