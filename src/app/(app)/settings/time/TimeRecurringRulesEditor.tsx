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

import type { RecurringRuleDTO } from "./types";

interface TimeRecurringRulesEditorProps {
  rules: RecurringRuleDTO[];
  onChange: (rules: RecurringRuleDTO[]) => void;
}

const WEEKDAY_OPTIONS = [
  { value: 0, label: "Monday" },
  { value: 1, label: "Tuesday" },
  { value: 2, label: "Wednesday" },
  { value: 3, label: "Thursday" },
  { value: 4, label: "Friday" },
  { value: 5, label: "Saturday" },
  { value: 6, label: "Sunday" },
];

export function TimeRecurringRulesEditor({ rules, onChange }: TimeRecurringRulesEditorProps) {
  const tempIdCounter = useRef(0);

  const addRule = () => {
    tempIdCounter.current += 1;
    const newRule: RecurringRuleDTO = {
      id: `temp-${tempIdCounter.current}`,
      circleId: null,
      kind: "block",
      weekday: 0,
      startLocal: "00:00",
      endLocal: "23:59",
      label: null,
      active: true,
    };
    onChange([...rules, newRule]);
  };

  const updateRule = (index: number, updates: Partial<RecurringRuleDTO>) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], ...updates };
    onChange(newRules);
  };

  const removeRule = (index: number) => {
    onChange(rules.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          Recurring Block/Prefer Rules
        </Typography>
        <Button
          variant="outlined"
          onClick={addRule}
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
          Add Rule
        </Button>
      </Stack>

      {rules.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No recurring rules configured. Click &quot;Add Rule&quot; to create one.
        </Typography>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              <TableCell sx={{ fontWeight: 500 }}>Kind</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>Weekday</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>Start</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>End</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>Label</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>Active</TableCell>
              <TableCell width={50} sx={{ fontWeight: 500 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rules.map((rule, index) => (
              <TableRow key={rule.id}>
                <TableCell>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={rule.kind}
                      onChange={(e) =>
                        updateRule(index, { kind: e.target.value as "block" | "prefer" })
                      }
                    >
                      <MenuItem value="block">Block</MenuItem>
                      <MenuItem value="prefer">Prefer</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={rule.weekday}
                      onChange={(e) => updateRule(index, { weekday: Number(e.target.value) })}
                    >
                      {WEEKDAY_OPTIONS.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <TextField
                    type="time"
                    value={rule.startLocal}
                    onChange={(e) => updateRule(index, { startLocal: e.target.value })}
                    size="small"
                    inputProps={{ step: 300 }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="time"
                    value={rule.endLocal}
                    onChange={(e) => updateRule(index, { endLocal: e.target.value })}
                    size="small"
                    inputProps={{ step: 300 }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={rule.label ?? ""}
                    onChange={(e) => updateRule(index, { label: e.target.value || null })}
                    placeholder="Optional label"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={rule.active}
                        onChange={(e) => updateRule(index, { active: e.target.checked })}
                      />
                    }
                    label=""
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => removeRule(index)}
                    color="error"
                    aria-label="Delete rule"
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

