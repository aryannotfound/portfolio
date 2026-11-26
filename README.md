# Aryan Desai · Portfolio

A bilingual portfolio built with HTML, CSS and JavaScript. It runs offline and deploys as a static site.

## Preview on macOS

In Finder, open this folder and double-click `index.html`. Alternatively, open Terminal in this folder and run `open index.html`.

To test the same file over HTTP, run `python3 -m http.server 8000` in this folder and open <http://localhost:8000/>. Stop the server with Control-C.

## Update content

Open `data/portfolio.js` in a text editor. Use `b('Deutsch', 'English')` for translated text and a plain string for content shared across both languages. Reload the page and check both languages.

| To update | Edit |
| --- | --- |
| Availability, email, LinkedIn, GitHub or portrait | `profile`. Enter the start date as `YYYY-MM-DD`, use full HTTPS URLs for profiles, and add a portrait as `{ src, alt }`. |
| Work history | `experience`. Use stable IDs, `YYYY-MM` dates and an empty end date for a current role. Keep responsibilities and skills bilingual. |
| Academic history | `education` and `modules`. Move courses between `planned`, `current` and `completed` as their status changes. Add academic achievements to `achievements`. |
| Certificates and languages | `certificates` and `languages`. Certificates accept an optional issuer, local image path and full HTTPS verification link. |
| Volunteering | Add verified entries with `title` and `description` to `volunteering`. |
| Labels and descriptions | `copy` and the translated fields in each record. If your title or summary changes, also update the static title, description and Open Graph tags in `index.html` for link previews. |

### Add a project

1. Duplicate an existing record in `projects`. Give it a unique lowercase, hyphenated `id`, fill in `title`, `summary`, `details` and `concepts`, and set `published: true` when ready.
2. Add values to `languages` and use IDs from the `areas` and `categories` maps. The filters pick up only values used by published projects.
3. Set `repository` and `demo` to verified full HTTPS URLs. Leave unavailable fields empty. Use `status`, `challenge`, `lessons` and `improvements` to add verified details.
4. Put screenshots or videos you can share in `assets/projects/`. Add a screenshot as `{ type: 'image', src: './assets/projects/example.webp', alt: b('Beschreibung', 'Description') }`. Use `type: 'video'` for a local MP4 and add optional `caption` text or a `captions` object with `src`, `language` and `label` for a WebVTT file. Use meaningful alt text and captions for video with speech. Optional decorative card art uses the base filename of an SVG in the same folder as `illustration`.
5. To connect a skill to that project, add the project ID to the skill’s evidence array.

### Replace the public CV

Replace `assets/documents/Aryan_Desai_CV.pdf` with a screening-ready public copy. Use a fresh export that omits your street address and private phone number. If you change the filename, update `profile.cv`. The supplied PDF is a one-page German CV.

## Deploy with GitHub Pages

1. On GitHub, create a public repository named `portfolio` with a `main` branch. Add the **contents** of this folder at the repository root, including `.nojekyll`, so `index.html` is at the root. You can use GitHub Desktop to include files whose names begin with a dot.
2. In the repository select **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**. Choose **main** and **/(root)**, then click **Save**.
3. When the Pages workflow succeeds, open the address shown in **Settings → Pages**, usually `https://YOUR-USERNAME.github.io/portfolio/`. Set it in `profile.links.website` for structured data. For richer LinkedIn previews, you can add absolute `og:url` and `og:image` tags in `index.html` once you have your live URL and a share image.
4. To publish updates, commit the edited files to `main`. When the workflow completes, verify the public page and download the CV once to check the new version.

[GitHub Pages publishing documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
