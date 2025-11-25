"use client";

import { useMemo, useRef } from "react";

import {
  Box,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import type { UserPreferenceDTO, WeekdayKey, WorkingHours } from "./types";

interface TimeWorkingHoursEditorProps {
  preferences: UserPreferenceDTO[];
  onChange: (preferences: UserPreferenceDTO[]) => void;
}

const WEEKDAYS: WeekdayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const WEEKDAY_LABELS: Record<WeekdayKey, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export function TimeWorkingHoursEditor({ preferences, onChange }: TimeWorkingHoursEditorProps) {
  // Get global preference (circleId === null)
  const globalPref = useMemo(() => preferences.find((p) => p.circleId === null), [preferences]);

  const globalWorkingHours = globalPref?.workingHours ?? {};
  const tempIdCounter = useRef(0);

  const updateGlobalWorkingHours = (day: WeekdayKey, field: "start" | "end", value: string) => {
    const newWorkingHours: WorkingHours = {
      ...globalWorkingHours,
      [day]: {
        ...globalWorkingHours[day],
        start: globalWorkingHours[day]?.start ?? "09:00",
        end: globalWorkingHours[day]?.end ?? "17:00",
        [field]: value,
      },
    };

    const newPreferences = [...preferences];
    const existingIndex = newPreferences.findIndex((p) => p.circleId === null);

    if (existingIndex >= 0) {
      newPreferences[existingIndex] = {
        ...newPreferences[existingIndex],
        workingHours: newWorkingHours,
      };
    } else {
      tempIdCounter.current += 1;
      newPreferences.push({
        id: `temp-${tempIdCounter.current}`,
        circleId: null,
        workingHours: newWorkingHours,
      });
    }

    onChange(newPreferences);
  };

  const toggleDay = (day: WeekdayKey, enabled: boolean) => {
    const newWorkingHours = { ...globalWorkingHours };
    if (enabled) {
      newWorkingHours[day] = {
        start: "09:00",
        end: "17:00",
      };
    } else {
      delete newWorkingHours[day];
    }

    const newPreferences = [...preferences];
    const existingIndex = newPreferences.findIndex((p) => p.circleId === null);

    if (existingIndex >= 0) {
      newPreferences[existingIndex] = {
        ...newPreferences[existingIndex],
        workingHours: newWorkingHours,
      };
    } else if (enabled) {
      tempIdCounter.current += 1;
      newPreferences.push({
        id: `temp-${tempIdCounter.current}`,
        circleId: null,
        workingHours: newWorkingHours,
      });
    }

    onChange(newPreferences);
  };

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
        Global Working Hours
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "grey.50" }}>
            <TableCell sx={{ fontWeight: 500 }}>Day</TableCell>
            <TableCell sx={{ fontWeight: 500 }}>Start</TableCell>
            <TableCell sx={{ fontWeight: 500 }}>End</TableCell>
            <TableCell sx={{ fontWeight: 500 }}>Enabled</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {WEEKDAYS.map((day) => {
            const dayHours = globalWorkingHours[day];
            const enabled = !!dayHours;

            return (
              <TableRow key={day}>
                <TableCell>{WEEKDAY_LABELS[day]}</TableCell>
                <TableCell>
                  <TextField
                    type="time"
                    value={dayHours?.start ?? "09:00"}
                    onChange={(e) => updateGlobalWorkingHours(day, "start", e.target.value)}
                    disabled={!enabled}
                    size="small"
                    inputProps={{ step: 300 }} // 5 minutes
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="time"
                    value={dayHours?.end ?? "17:00"}
                    onChange={(e) => updateGlobalWorkingHours(day, "end", e.target.value)}
                    disabled={!enabled}
                    size="small"
                    inputProps={{ step: 300 }} // 5 minutes
                  />
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={enabled}
                        onChange={(e) => toggleDay(day, e.target.checked)}
                      />
                    }
                    label=""
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
        Per-circle overrides can be configured in future updates.
      </Typography>
    </Box>
  );
}

