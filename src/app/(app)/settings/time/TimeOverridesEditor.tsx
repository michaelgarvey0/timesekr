"use client";

import { useRef } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import type { OverrideDTO } from "./types";

interface TimeOverridesEditorProps {
  overrides: OverrideDTO[];
  onChange: (overrides: OverrideDTO[]) => void;
}

export function TimeOverridesEditor({ overrides, onChange }: TimeOverridesEditorProps) {
  const tempIdCounter = useRef(0);

  const addOverride = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    tempIdCounter.current += 1;
    const newOverride: OverrideDTO = {
      id: `temp-${tempIdCounter.current}`,
      circleId: null,
      kind: "block",
      startTime: now.toISOString(),
      endTime: tomorrow.toISOString(),
      label: null,
      active: true,
    };
    onChange([...overrides, newOverride]);
  };

  const updateOverride = (index: number, updates: Partial<OverrideDTO>) => {
    const newOverrides = [...overrides];
    newOverrides[index] = { ...newOverrides[index], ...updates };
    onChange(newOverrides);
  };

  const removeOverride = (index: number) => {
    onChange(overrides.filter((_, i) => i !== index));
  };

  // Format datetime-local input value from ISO string
  const formatDateTimeLocal = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Convert datetime-local input value to ISO string (assumes UTC)
  const parseDateTimeLocal = (dateTimeLocal: string) => {
    // datetime-local is in local time, but we need to convert to UTC
    // For simplicity, we'll treat it as if user entered in their timezone
    // and convert to UTC (this is a Stage-1 simplification)
    const date = new Date(dateTimeLocal);
    return date.toISOString();
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          One-off Time Overrides
        </Typography>
        <Button
          variant="outlined"
          onClick={addOverride}
          size="small"
          sx={{
            textTransform: "none",
            borderColor: "grey.300",
            color: "text.primary",
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: "primary.light",
            },
          }}
        >
          Add Override
        </Button>
      </Stack>

      {overrides.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No overrides configured. Click &quot;Add Override&quot; to create one.
        </Typography>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              <TableCell sx={{ fontWeight: 500 }}>Kind</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>Start Time</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>End Time</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>Label</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>Active</TableCell>
              <TableCell width={50} sx={{ fontWeight: 500 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {overrides.map((override, index) => (
              <TableRow key={override.id}>
                <TableCell>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={override.kind}
                      onChange={(e) =>
                        updateOverride(index, {
                          kind: e.target.value as "vacation" | "block" | "prefer",
                        })
                      }
                    >
                      <MenuItem value="vacation">Vacation</MenuItem>
                      <MenuItem value="block">Block</MenuItem>
                      <MenuItem value="prefer">Prefer</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <TextField
                    type="datetime-local"
                    value={formatDateTimeLocal(override.startTime)}
                    onChange={(e) =>
                      updateOverride(index, { startTime: parseDateTimeLocal(e.target.value) })
                    }
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="datetime-local"
                    value={formatDateTimeLocal(override.endTime)}
                    onChange={(e) =>
                      updateOverride(index, { endTime: parseDateTimeLocal(e.target.value) })
                    }
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={override.label ?? ""}
                    onChange={(e) => updateOverride(index, { label: e.target.value || null })}
                    placeholder="Optional label"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={override.active}
                        onChange={(e) => updateOverride(index, { active: e.target.checked })}
                      />
                    }
                    label=""
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => removeOverride(index)}
                    color="error"
                    aria-label="Delete override"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}

