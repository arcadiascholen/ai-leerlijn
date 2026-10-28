// Instructions per chosen tool (docs/BRIEFING.md § 12, "Instructies per
// tool").
//
// A module asks the student once which AI tool they use, with an ordinary
// <Keuze naam="tool" …>; its option keys and labels are the module's
// business. A <Tool naam="<key>"> block holds the instructions for one tool.
//
// Which blocks show is pure CSS, keyed on one attribute on <html>:
// CHOSEN_TOOL_ATTRIBUTE, holding the key of the chosen tool, or absent while
// there is none. ChosenTool.astro sets it from localStorage in an inline
// script in <head>, before the first paint, and keeps it in sync with every
// choice afterwards. With it, only the blocks of that tool show, without
// their label; without it, every block shows with its label.

export const TOOL_CHOICE = 'tool';

export const CHOSEN_TOOL_ATTRIBUTE = 'data-chosen-tool';

// One rule per option: with that tool chosen, hide the blocks of every other
// tool. CSS cannot compare two attribute values, so the rules are generated
// from the option keys, which the build reads from the module source. The
// keys follow ID_PATTERN (lowercase letters, digits, hyphens), so they are
// safe inside a quoted attribute selector.
export function toolRules(keys: readonly string[]): string {
  return keys
    .map((key) => `:root[${CHOSEN_TOOL_ATTRIBUTE}="${key}"] [data-tool]:not([data-tool="${key}"]){display:none}`)
    .join('\n');
}
