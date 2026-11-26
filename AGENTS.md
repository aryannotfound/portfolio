# Portfolio maintenance

## Structure

- `index.html` defines landmarks, the default metadata for social previews and the JavaScript entry order.
- `data/portfolio.js` is the editable source of truth. Each independent script has its own scope. The deferred entry scripts load in data, icons, app order so the site also runs from disk.
- `js/app.js` renders both languages and manages filters, disclosure state, the project dialog, theme and navigation. `js/icons.js` provides decorative SVG icons.
- `css/styles.css` owns the light and dark design tokens, responsive layout and focus and motion policies.
- `assets/` contains the public CV, original abstract design assets and any verified media. All deployable files work relative to the site folder.

## Design and interaction

Use a navy palette with limited blue accents, generous spacing, readable system type and a consistent border radius. Preserve the portfolio’s editorial layout and use cards for projects, skills and qualifications. Project card graphics are conceptual illustrations. Future project screenshots and videos belong in the project details with descriptive alt text or captions.

Keep keyboard focus visible. Use native buttons, selects, details and dialog. Restore focus when closing the dialog, use scroll-aware navigation, and respect reduced-motion settings. German is the default. Store only language and theme preferences locally.

## Content schema

- Translatable field values are strings shared between languages or `{ de, en }` objects produced by `b()`. Wrap all prose and translated UI labels with `b()`.
- Profiles hold contact and availability. Use ISO dates and approved public contact details. Optional profile links, portrait, and CV are hidden when empty or invalid.
- Each project needs `id`, `title`, `published`, `languages`, `areas`, `categories`, `summary`, `details` and `concepts`. Optional fields are `illustration`, `status`, `challenge`, `lessons`, `improvements`, `media`, `repository` and `demo`. Use stable IDs and defined taxonomy keys.
- Experience entries have an ID, company, location, bilingual role, summary, duties and skills, start and optional end month. Skill evidence uses the IDs of published projects or experience records.
- Education tracks dates separately from module status. Certificates accept issuer, image and verification. Volunteering stays hidden until verified entries are supplied.

## Source, privacy and release

Keep professional claims grounded in the latest CV or information Aryan confirms. Exclude private telephone numbers, residential addresses and unredacted CVs from the site and version history. Add only verified public links and owned or approved media. Leave unsupported project status, lessons and other optional fields blank. Use a static site with no tracking, unnecessary dependencies or automatic GitHub sync. Public publishing and remote pushes require Aryan’s approval.

Before handing off changes, check both languages, themes, navigation, filters, keyboard focus and missing optional fields. Verify direct file loading and relative paths. Review the mobile layout and browser console when browser access is available.
