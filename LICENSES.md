# LICENSES & Third-Party Attributions

This project (MIKROTRAVEL) uses several third-party libraries and assets. Below is a concise list of dependencies included in the repository, the paths where they live, and links to their official pages and license information. You should verify the license terms before publishing the site; if a dependency requires attribution or a copy of its license to be bundled with the project, add that file (or reference) to the repository.

---

## Included dependencies (bundled under `assets/vendor/`)

- **Bootstrap**
  - Path: `assets/vendor/bootstrap/`
  - Files: CSS and JS (`bootstrap.min.css`, `bootstrap.bundle.min.js`, etc.)
  - Homepage: https://getbootstrap.com/
  - License: MIT (confirm via project repository: https://github.com/twbs/bootstrap/blob/main/LICENSE)

- **Bootstrap Icons**
  - Path: `assets/vendor/bootstrap-icons/`
  - Files: icon fonts and CSS
  - Homepage: https://icons.getbootstrap.com/
  - License: MIT (confirm: https://github.com/twbs/bootstrap-icons/blob/main/LICENSE.md)

- **Swiper**
  - Path: `assets/vendor/swiper/`
  - Files: `swiper-bundle.min.js`, `swiper-bundle.min.css`
  - Homepage: https://swiperjs.com/
  - License: MIT (confirm: https://github.com/nolimits4web/swiper/blob/master/LICENSE)

- **GLightbox**
  - Path: `assets/vendor/glightbox/`
  - Files: `glightbox.min.js`, `glightbox.min.css`
  - Homepage / Repo: https://github.com/biati-digital/glightbox
  - License: MIT (verify on repository)

- **imagesLoaded**
  - Path: `assets/vendor/imagesloaded/`
  - Files: `imagesloaded.pkgd.min.js`
  - Homepage / Repo: https://imagesloaded.desandro.com/ (repo: https://github.com/desandro/imagesloaded)
  - License: MIT (verify on repository)

- **Isotope (isotope-layout)**
  - Path: `assets/vendor/isotope-layout/`
  - Files: `isotope.pkgd.min.js`
  - Homepage / Repo: https://isotope.metafizzy.co/ (repo: https://github.com/metafizzy/isotope)
  - License: Please verify — historically Metafizzy projects have varying license arrangements; confirm the current license on the project repo before distribution.

- **purecounter (PureCounter)**
  - Path: `assets/vendor/purecounter/`
  - Files: `purecounter_vanilla.js`
  - Homepage / Repo: https://github.com/srexi/purecounterjs or https://srexi.github.io/purecounterjs/
  - License: Verify on the repository (often MIT or permissive)

- **php-email-form (validation)**
  - Path: `assets/vendor/php-email-form/`
  - Files: `validate.js` (client-side validation helper used with PHP backend)
  - Homepage / Repo: included with template; verify license and backend usage requirements.


## Other assets
- `assets/img/` — project images, `icon.png`, `favicon.png`, and `apple-touch-icon.png` (these are project assets; ensure you own or are licensed to use them).
- Fonts loaded from Google Fonts in `<head>` (Roboto, Poppins, Raleway). Google Fonts usage is under their respective licenses — typically permissive for web use.

---

## Recommended actions before publishing / submitting
1. Review each dependency's LICENSE file (links provided above) and add any required attributions to the repository (e.g., `LICENSES.md` + copy of the dependency's license text). 
2. If any dependency requires a commercial license for redistribution or bundling (e.g., certain builds of Isotope historically had commercial terms), obtain the necessary license or remove/replace the dependency.
3. Replace any bundled vendor files with CDN versions if you prefer not to redistribute them, but check the project's distribution policy.
4. If images or icons are not original (e.g., stock photos), ensure you have the right to use them or replace with original assets.
5. If you want, I can add a `third_party_licenses/` folder containing copies of each dependency's LICENSE file (I can fetch them for the most common libs listed above).

---

If you want, I will:
- A) Add copies of the dependency LICENSE files under `third_party_licenses/` (I can fetch them automatically for MIT-licensed projects).
- B) Or, add a short `LICENSES.md` entry for each with the exact SPDX license identifier (e.g., MIT) where confirmed.

Reply with `A` to fetch and add the LICENSE files, or `B` to only add SPDX identifiers (or `Both`).
