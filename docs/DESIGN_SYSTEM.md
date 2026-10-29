# Design system

Status: Proposed visual direction.

## Brand and voice

**Acadify — Learn Better. Teach Smarter.** Warm, capable, trustworthy, and encouraging. Use concise, specific language; avoid overstating verification, outcomes, or AI certainty.

## Visual direction

Modern education marketplace with a calm light canvas, deep ink/navy text, confident indigo/blue primary actions, and restrained green/amber cues for availability and attention. Use generous whitespace, readable type, purposeful charts and tables, and warm, natural photography. Keep the educator studio focused on the work of teaching instead of decorating it with generic motivation cards.

## Interaction principles

- Search and booking actions remain prominent; filters are easy to scan and clear.
- Cards expose subject, mode, locality, price, and trust/rating provenance.
- Use visible focus, keyboard operation, meaningful labels, and non-color status cues.
- Provide loading, empty, error, disabled, and confirmation states.
- Mobile layouts prioritize search, tutor details, and booking action.

## Tokens to formalize in implementation

Color roles: canvas, surface, ink, muted ink, border, primary, accent, success, warning, danger. Spacing: 4/8/12/16/24/32/48. Radius: small controls, cards, dialogs. Typography: display, heading, body, caption with comfortable line height. Final values belong in the implementation after stack approval.

## Appearance modes and macOS cues

- Light is the default bright canvas; Study uses warm paper surfaces and softened contrast for longer reading; Dark uses deep neutral surfaces with accessible light text.
- The three modes are available from a compact segmented control in the top bar and persist locally in the browser.
- Prefer the platform system font stack, translucent blurred navigation chrome, compact rounded controls, and restrained shadows to echo native macOS conventions while keeping the marketplace familiar.
- Appearance changes apply to the learner and educator workspaces. Preserve clear focus, pressed, selected, and disabled states in every mode.
