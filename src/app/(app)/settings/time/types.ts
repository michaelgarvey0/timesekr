// Type definitions for time settings (UX prototype - no backend)

export type WeekdayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type WorkingHours = {
  [day in WeekdayKey]?: {
    start: string; // "HH:MM"
    end: string; // "HH:MM"
  };
};

export interface UserPreferenceDTO {
  id: string;
  circleId: string | null;
  workingHours: WorkingHours;
}

export type RuleKind = "block" | "prefer";

export interface RecurringRuleDTO {
  id: string;
  circleId: string | null;
  kind: RuleKind;
  weekday: number; // 0-6
  startLocal: string; // "HH:MM"
  endLocal: string; // "HH:MM"
  label?: string | null;
  active: boolean;
}

export type OverrideKind = "vacation" | "block" | "prefer";

export interface OverrideDTO {
  id: string;
  circleId: string | null;
  kind: OverrideKind;
  startTime: string; // ISO datetime
  endTime: string; // ISO datetime
  label?: string | null;
  active: boolean;
}

export interface TimeSettingsDTO {
  timeZone: string; // from user_profiles
  preferences: UserPreferenceDTO[];
  recurringRules: RecurringRuleDTO[];
  overrides: OverrideDTO[];
}

// Natural Language Rule Parsing Types (mocked for UX prototype)
export interface ParsedRuleInput {
  text: string;
  defaultCircleId?: string | null;
  availableCircles: {
    id: string;
    name: string;
  }[];
}

export interface ParsedRule {
  kind: RuleKind;
  circleId: string | null;
  weekday: number;
  startLocal: string;
  endLocal: string;
  label: string | null;
  active: boolean;
}

export interface ParsedOverride {
  kind: OverrideKind;
  circleId: string | null;
  startTime: string;
  endTime: string;
  label: string | null;
  active: boolean;
}

export interface ParsedRuleResponse {
  recurringRules: ParsedRule[];
  overrides: ParsedOverride[];
  warnings: string[];
}

