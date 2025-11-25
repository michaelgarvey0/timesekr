"use client";

import { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import type { ParsedRuleInput } from "./types";

interface CircleOption {
  id: string;
  name: string;
}

interface Props {
  circles: CircleOption[];
  onGenerate: (input: ParsedRuleInput) => Promise<void>;
  text: string;
  setText: (text: string) => void;
  defaultCircleId: string | "";
  setDefaultCircleId: (id: string | "") => void;
  loading: boolean;
}

export function TimeRulesNaturalLanguagePanel({
  circles,
  onGenerate,
  text,
  setText,
  defaultCircleId,
  setDefaultCircleId,
  loading,
}: Props) {
  const handleGenerate = async () => {
    if (!text.trim()) return;

    const input: ParsedRuleInput = {
      text,
      defaultCircleId: defaultCircleId || undefined,
      availableCircles: circles,
    };

    await onGenerate(input);
  };

  return (
    <Card elevation={0} sx={{ border: "1px solid", borderColor: "grey.200" }}>
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Natural Language Rule Helper
          </Typography>
          <TextField
            label="Describe your rule in English..."
            multiline
            minRows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='e.g. "No meetings on Tuesday mornings for my Product circle"'
            fullWidth
            size="small"
          />

          <FormControl size="small" sx={{ maxWidth: 300 }}>
            <InputLabel id="default-circle-label">Scope (optional)</InputLabel>
            <Select
              labelId="default-circle-label"
              value={defaultCircleId}
              label="Scope (optional)"
              onChange={(e) => setDefaultCircleId(e.target.value)}
            >
              <MenuItem value="">Global</MenuItem>
              {circles.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Button
              variant="contained"
              onClick={handleGenerate}
              disabled={loading || !text.trim()}
              sx={{ textTransform: "none" }}
            >
              {loading ? "Generating…" : "Generate"}
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

