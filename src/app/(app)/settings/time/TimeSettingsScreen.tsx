"use client";

import { useState } from "react";

import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  formatTimezoneForDisplay,
  getBrowserTimezone,
  getTimezones,
} from "./utils/timezone";
import type {
  ParsedOverride,
  ParsedRule,
  ParsedRuleInput,
  TimeSettingsDTO,
} from "./types";
import type { OverrideDTO, RecurringRuleDTO } from "./types";

import { TimeOverridesEditor } from "./TimeOverridesEditor";
import { TimeRecurringRulesEditor } from "./TimeRecurringRulesEditor";
import { TimeRulesNaturalLanguagePanel } from "./TimeRulesNaturalLanguagePanel";
import { TimeWorkingHoursEditor } from "./TimeWorkingHoursEditor";

function weekdayLabel(weekday: number): string {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
  return labels[weekday] ?? String(weekday);
}

type TabId = "timezone" | "working-hours" | "recurring-rules" | "overrides";

// Mock data for UX prototype
const createMockTimeSettings = (): TimeSettingsDTO => ({
  timeZone: getBrowserTimezone(),
  preferences: [
    {
      id: "mock-pref-1",
      circleId: null,
      workingHours: {
        mon: { start: "09:00", end: "17:00" },
        tue: { start: "09:00", end: "17:00" },
        wed: { start: "09:00", end: "17:00" },
        thu: { start: "09:00", end: "17:00" },
        fri: { start: "09:00", end: "17:00" },
      },
    },
  ],
  recurringRules: [],
  overrides: [],
});

// Mock parse function for UX prototype
const mockParseRules = async (input: ParsedRuleInput) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simple mock parsing - just return a basic rule based on keywords
  const text = input.text.toLowerCase();
  const recurringRules: ParsedRule[] = [];
  const overrides: ParsedOverride[] = [];
  const warnings: string[] = [];

  // Check for recurring patterns
  if (text.includes("tuesday") || text.includes("tue")) {
    recurringRules.push({
      kind: text.includes("no") || text.includes("block") ? "block" : "prefer",
      circleId: input.defaultCircleId || null,
      weekday: 1, // Tuesday
      startLocal: text.includes("morning") ? "09:00" : "00:00",
      endLocal: text.includes("morning") ? "12:00" : "23:59",
      label: null,
      active: true,
    });
  }

  // Check for date-based overrides
  if (text.includes("vacation") || text.includes("holiday")) {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 7);
    overrides.push({
      kind: "vacation",
      circleId: input.defaultCircleId || null,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      label: "Vacation",
      active: true,
    });
  }

  return {
    recurringRules,
    overrides,
    warnings,
  };
};

export default function TimeSettingsScreen() {
  // Mock state - no API calls
  const [draft, setDraft] = useState<TimeSettingsDTO>(createMockTimeSettings);
  const [isLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  // Active tab state
  const [activeTab, setActiveTab] = useState<TabId>("timezone");

  // NL panel state
  const [nlText, setNlText] = useState("");
  const [nlDefaultCircleId, setNlDefaultCircleId] = useState<string | "">("");

  // Timezone state
  const timezones = getTimezones();
  const [timezoneInputValue, setTimezoneInputValue] = useState(draft.timeZone || "");

  // Mock circles for the NL panel
  const circles: Array<{ id: string; name: string }> = [
    { id: "mock-circle-1", name: "Product Team" },
    { id: "mock-circle-2", name: "Engineering" },
  ];
  const circlesLoading = false;

  // Parse rules state (mocked)
  const [parseRulesState, setParseRulesState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    data?: { recurringRules: ParsedRule[]; overrides: ParsedOverride[]; warnings: string[] };
    error?: string;
  }>({ status: "idle" });

  const handleSave = async () => {
    if (!draft) return;
    setSaveStatus("saving");
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaveStatus("success");
    // Clear success message after 3 seconds
    setTimeout(() => setSaveStatus("idle"), 3000);
  };

  const handleApplyParsedRecurringRules = (parsedRules: ParsedRule[]) => {
    if (!draft) return;

    const newRules: RecurringRuleDTO[] = parsedRules.map((r) => ({
      id: crypto.randomUUID(),
      circleId: r.circleId,
      kind: r.kind,
      weekday: r.weekday,
      startLocal: r.startLocal,
      endLocal: r.endLocal,
      label: r.label ?? null,
      active: r.active,
    }));

    setDraft({
      ...draft,
      recurringRules: [...draft.recurringRules, ...newRules],
    });
  };

  const handleApplyParsedOverrides = (parsedOverrides: ParsedOverride[]) => {
    if (!draft) return;

    const newOverrides: OverrideDTO[] = parsedOverrides.map((o) => ({
      id: crypto.randomUUID(),
      circleId: o.circleId,
      kind: o.kind,
      startTime: o.startTime,
      endTime: o.endTime,
      label: o.label ?? null,
      active: o.active,
    }));

    setDraft({
      ...draft,
      overrides: [...draft.overrides, ...newOverrides],
    });
  };

  const handleGenerateRules = async (input: ParsedRuleInput) => {
    setParseRulesState({ status: "loading" });
    try {
      const result = await mockParseRules(input);
      setParseRulesState({ status: "success", data: result });
    } catch (err) {
      setParseRulesState({
        status: "error",
        error: err instanceof Error ? err.message : "Failed to parse rules",
      });
    }
  };

  const hasRecurringPreview =
    parseRulesState.status === "success" && (parseRulesState.data?.recurringRules.length ?? 0) > 0;
  const hasOverridesPreview =
    parseRulesState.status === "success" && (parseRulesState.data?.overrides.length ?? 0) > 0;

  const handleTimezoneChange = (_event: unknown, newValue: string | null) => {
    if (!draft) return;
    const timezone = newValue || "";
    setDraft({ ...draft, timeZone: timezone });
    setTimezoneInputValue(timezone);
  };

  const handleTimezoneInputChange = (_event: unknown, newInputValue: string) => {
    setTimezoneInputValue(newInputValue);
  };

  const handleCalculateTimezone = () => {
    if (!draft) return;
    const browserTimezone = getBrowserTimezone();
    setDraft({ ...draft, timeZone: browserTimezone });
    setTimezoneInputValue(browserTimezone);
  };

  const tabs: Array<{ id: TabId; label: string }> = [
    { id: "timezone", label: "Timezone" },
    { id: "working-hours", label: "Working Hours" },
    { id: "recurring-rules", label: "Recurring Rules" },
    { id: "overrides", label: "Time Overrides" },
  ];

  if (isLoading || !draft) {
    return (
      <Box>
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography>Loading time settings...</Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 500 }}>
            Time Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure your working hours, recurring rules, and time overrides.
          </Typography>
        </Box>

        {saveStatus === "error" && (
          <Alert severity="error">Failed to save time settings. Please try again.</Alert>
        )}

        {saveStatus === "success" && (
          <Alert severity="success">
            Time settings saved successfully. (This is a UX prototype - no data is actually saved.)
          </Alert>
        )}

        {/* Tabbed Interface */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          {/* Left Sidebar - Tabs */}
          <Paper
            elevation={0}
            sx={{
              width: 250,
              flexShrink: 0,
              border: "1px solid",
              borderColor: "grey.200",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <List disablePadding>
              {tabs.map((tab) => (
                <ListItem key={tab.id} disablePadding>
                  <ListItemButton
                    selected={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    sx={{
                      "&.Mui-selected": {
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        "&:hover": {
                          bgcolor: "primary.dark",
                        },
                      },
                      "&:hover": {
                        bgcolor: "grey.50",
                      },
                    }}
                  >
                    <ListItemText
                      primary={tab.label}
                      primaryTypographyProps={{
                        fontSize: "0.9375rem",
                        fontWeight: activeTab === tab.id ? 500 : 400,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Right Content Area */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack spacing={4}>
              {/* Timezone Selection Tab */}
              {activeTab === "timezone" && (
                <Card elevation={0} sx={{ border: "1px solid", borderColor: "grey.200" }}>
                  <CardContent>
                    <Stack spacing={3}>
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        Timezone
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        My time zone is
                      </Typography>
                      <Stack direction="row" spacing={2} alignItems="flex-start">
                        <Autocomplete
                          options={timezones}
                          value={draft.timeZone || null}
                          inputValue={timezoneInputValue}
                          onInputChange={handleTimezoneInputChange}
                          onChange={handleTimezoneChange}
                          getOptionLabel={(option) => formatTimezoneForDisplay(option)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select timezone"
                              variant="outlined"
                              fullWidth
                            />
                          )}
                          filterOptions={(options, { inputValue }) => {
                            const search = inputValue.toLowerCase();
                            return options.filter((tz) => {
                              const display = formatTimezoneForDisplay(tz).toLowerCase();
                              return display.includes(search) || tz.toLowerCase().includes(search);
                            });
                          }}
                          sx={{ flex: 1 }}
                        />
                        <Button
                          variant="outlined"
                          onClick={handleCalculateTimezone}
                          sx={{
                            mt: 1,
                            textTransform: "none",
                            borderColor: "grey.300",
                            color: "text.primary",
                            "&:hover": {
                              borderColor: "primary.main",
                              bgcolor: "primary.light",
                            },
                          }}
                        >
                          Calculate
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              )}

              {/* Working Hours Tab */}
              {activeTab === "working-hours" && (
                <>
                  {/* Natural Language Rule Helper */}
                  {!circlesLoading && (
                    <TimeRulesNaturalLanguagePanel
                      circles={circles}
                      onGenerate={handleGenerateRules}
                      text={nlText}
                      setText={setNlText}
                      defaultCircleId={nlDefaultCircleId}
                      setDefaultCircleId={setNlDefaultCircleId}
                      loading={parseRulesState.status === "loading"}
                    />
                  )}

                  {/* Error/Warning Messages */}
                  {parseRulesState.status === "error" && (
                    <Alert severity="error">
                      Could not parse rule: {parseRulesState.error}
                    </Alert>
                  )}

                  {parseRulesState.status === "success" &&
                    parseRulesState.data &&
                    parseRulesState.data.warnings.length > 0 && (
                      <Alert severity="warning">
                        {parseRulesState.data.warnings.map((w, i) => (
                          <div key={i}>{w}</div>
                        ))}
                      </Alert>
                    )}

                  <Card elevation={0} sx={{ border: "1px solid", borderColor: "grey.200" }}>
                    <CardContent>
                      <Stack spacing={3}>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                          Working Hours
                        </Typography>
                        <TimeWorkingHoursEditor
                          preferences={draft.preferences}
                          onChange={(preferences) => {
                            setDraft({ ...draft, preferences });
                          }}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Recurring Rules Tab */}
              {activeTab === "recurring-rules" && (
                <>
                  {/* Natural Language Rule Helper */}
                  {!circlesLoading && (
                    <TimeRulesNaturalLanguagePanel
                      circles={circles}
                      onGenerate={handleGenerateRules}
                      text={nlText}
                      setText={setNlText}
                      defaultCircleId={nlDefaultCircleId}
                      setDefaultCircleId={setNlDefaultCircleId}
                      loading={parseRulesState.status === "loading"}
                    />
                  )}

                  {/* Preview: Generated Recurring Rules */}
                  {hasRecurringPreview && parseRulesState.data && (
                    <Card
                      elevation={0}
                      sx={{
                        border: "1px solid",
                        borderColor: "primary.light",
                        bgcolor: "primary.light",
                      }}
                    >
                      <CardContent>
                        <Stack spacing={2}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" sx={{ fontWeight: 500 }}>
                              Generated recurring rules
                            </Typography>
                            <Stack direction="row" spacing={2}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  if (parseRulesState.data) {
                                    handleApplyParsedRecurringRules(
                                      parseRulesState.data.recurringRules
                                    );
                                  }
                                }}
                                sx={{ textTransform: "none" }}
                              >
                                Apply recurring rules to form
                              </Button>
                              <Button
                                variant="text"
                                color="inherit"
                                onClick={() => {
                                  setParseRulesState({ status: "idle" });
                                  setNlText("");
                                  setNlDefaultCircleId("");
                                }}
                                sx={{ textTransform: "none" }}
                              >
                                Discard
                              </Button>
                            </Stack>
                          </Stack>
                          {parseRulesState.data.recurringRules.map((r, idx) => (
                            <Box
                              key={idx}
                              sx={{ pl: 2, borderLeft: "2px solid", borderColor: "divider" }}
                            >
                              <Typography variant="body2">
                                {r.kind.toUpperCase()} – {weekdayLabel(r.weekday)} {r.startLocal}–
                                {r.endLocal}{" "}
                                {r.circleId
                                  ? `(circle: ${circles.find((c) => c.id === r.circleId)?.name ?? r.circleId})`
                                  : "(global)"}
                              </Typography>
                              {r.label && (
                                <Typography variant="caption" color="text.secondary">
                                  {r.label}
                                </Typography>
                              )}
                            </Box>
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  )}

                  {/* Error/Warning Messages */}
                  {parseRulesState.status === "error" && (
                    <Alert severity="error">
                      Could not parse rule: {parseRulesState.error}
                    </Alert>
                  )}

                  {parseRulesState.status === "success" &&
                    parseRulesState.data &&
                    parseRulesState.data.warnings.length > 0 && (
                      <Alert severity="warning">
                        {parseRulesState.data.warnings.map((w, i) => (
                          <div key={i}>{w}</div>
                        ))}
                      </Alert>
                    )}

                  <Card elevation={0} sx={{ border: "1px solid", borderColor: "grey.200" }}>
                    <CardContent>
                      <Stack spacing={3}>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                          Calendar Recurring Rules (Patterns)
                        </Typography>
                        <TimeRecurringRulesEditor
                          rules={draft.recurringRules}
                          onChange={(recurringRules) => {
                            setDraft({ ...draft, recurringRules });
                          }}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Overrides Tab */}
              {activeTab === "overrides" && (
                <>
                  {/* Natural Language Rule Helper */}
                  {!circlesLoading && (
                    <TimeRulesNaturalLanguagePanel
                      circles={circles}
                      onGenerate={handleGenerateRules}
                      text={nlText}
                      setText={setNlText}
                      defaultCircleId={nlDefaultCircleId}
                      setDefaultCircleId={setNlDefaultCircleId}
                      loading={parseRulesState.status === "loading"}
                    />
                  )}

                  {/* Preview: Generated Overrides */}
                  {hasOverridesPreview && parseRulesState.data && (
                    <Card
                      elevation={0}
                      sx={{
                        border: "1px solid",
                        borderColor: "primary.light",
                        bgcolor: "primary.light",
                      }}
                    >
                      <CardContent>
                        <Stack spacing={2}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" sx={{ fontWeight: 500 }}>
                              Generated overrides
                            </Typography>
                            <Stack direction="row" spacing={2}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  if (parseRulesState.data) {
                                    handleApplyParsedOverrides(parseRulesState.data.overrides);
                                  }
                                }}
                                sx={{ textTransform: "none" }}
                              >
                                Apply overrides to form
                              </Button>
                              <Button
                                variant="text"
                                color="inherit"
                                onClick={() => {
                                  setParseRulesState({ status: "idle" });
                                  setNlText("");
                                  setNlDefaultCircleId("");
                                }}
                                sx={{ textTransform: "none" }}
                              >
                                Discard
                              </Button>
                            </Stack>
                          </Stack>
                          {parseRulesState.data.overrides.map((o, idx) => {
                            const startDate = new Date(o.startTime);
                            const endDate = new Date(o.endTime);
                            return (
                              <Box
                                key={idx}
                                sx={{ pl: 2, borderLeft: "2px solid", borderColor: "divider" }}
                              >
                                <Typography variant="body2">
                                  {o.kind.toUpperCase()} – {startDate.toLocaleDateString()}{" "}
                                  {startDate.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}{" "}
                                  to {endDate.toLocaleDateString()}{" "}
                                  {endDate.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}{" "}
                                  {o.circleId
                                    ? `(circle: ${circles.find((c) => c.id === o.circleId)?.name ?? o.circleId})`
                                    : "(global)"}
                                </Typography>
                                {o.label && (
                                  <Typography variant="caption" color="text.secondary">
                                    {o.label}
                                  </Typography>
                                )}
                              </Box>
                            );
                          })}
                        </Stack>
                      </CardContent>
                    </Card>
                  )}

                  {/* Error/Warning Messages */}
                  {parseRulesState.status === "error" && (
                    <Alert severity="error">
                      Could not parse rule: {parseRulesState.error}
                    </Alert>
                  )}

                  {parseRulesState.status === "success" &&
                    parseRulesState.data &&
                    parseRulesState.data.warnings.length > 0 && (
                      <Alert severity="warning">
                        {parseRulesState.data.warnings.map((w, i) => (
                          <div key={i}>{w}</div>
                        ))}
                      </Alert>
                    )}

                  <Card elevation={0} sx={{ border: "1px solid", borderColor: "grey.200" }}>
                    <CardContent>
                      <Stack spacing={3}>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                          Calendar Time Overrides (Events)
                        </Typography>
                        <TimeOverridesEditor
                          overrides={draft.overrides}
                          onChange={(overrides) => {
                            setDraft({ ...draft, overrides });
                          }}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Save Button - Always visible */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, pt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={saveStatus === "saving"}
                  size="large"
                  sx={{ textTransform: "none", minWidth: 140 }}
                >
                  {saveStatus === "saving" ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

