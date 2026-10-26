// Build-time checks on the MDX source of a module, for what no single
// component can check on its own. The module route runs them in
// getStaticPaths, so a mistake fails the build with a clear message instead
// of reaching a student (docs/BRIEFING.md § 12).

// Positions of every match of `pattern` (with the `g` flag) in `text`.
function positions(text: string, pattern: RegExp): number[] {
  return Array.from(text.matchAll(pattern), (match) => match.index);
}

export function checkModuleBody(id: string, body: string): void {
  // A module is a series of steps (BRIEFING § 6); without any the player
  // has nothing to show.
  const steps = positions(body, /<Stap[\s>]/g);
  if (steps.length === 0) {
    throw new Error(`Module "${id}" has no <Stap> blocks.`);
  }

  // The summary collects the answers of the whole module and ends it: once,
  // in the last step (BRIEFING § 12). Text after the last <Stap> does not
  // belong in a module at all, so "after the last <Stap>" means "in it".
  const summaries = positions(body, /<Samenvatting[\s/>]/g);
  if (summaries.length > 1) {
    throw new Error(`Module "${id}" has ${summaries.length} <Samenvatting /> components; it may have one.`);
  }
  const summary = summaries[0];
  if (summary !== undefined && summary < Math.max(...steps)) {
    throw new Error(`Module "${id}": <Samenvatting /> belongs in the last <Stap> of the module.`);
  }
}
