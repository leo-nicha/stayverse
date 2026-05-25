# Stayverse - Luxury Real Estate Portal

A premium Next.js real estate application based on the design system, structure, and widgets from **The Agent** website, customized with a rich color palette and client-side multi-language support (i18n).

## 🚀 Technology Stack
1. **Framework:** Next.js (App Router, React 18)
2. **Styling:** Tailwind CSS (v3 with custom color tokens from your design image)
3. **UI Components:** HeroUI (formerly NextUI)
4. **Translations (i18n):** Lightweight client-side custom translation system supporting:
   - Thai (th)
   - English (en)
   - Russian (ru)
   - Chinese (zh)
   - Japanese (ja)
   - Korean (ko)

---

## 🎨 Theme Colors Mapped
The color palettes from your provided image are fully integrated as custom Tailwind classes:
* **Row 1 (Teal/Cyan Tones):** `tealPalette` (from `50` to `600`) - Used for highlights and active status indicators.
* **Row 2 (Warm Taupe/Sand Tones):** `taupePalette` (from `50` to `600`) - Used for card shadows, body borders, and soft warm textures.
* **Row 3 (Orange/Copper Tones):** `orangePalette` (from `50` to `600`) - Used as the **Primary Brand Color** (accents, buttons, links, search triggers).
* **Row 4 (Ice Blue/Slate Tones):** `bluePalette` (from `50` to `600`) - Used for dark header background, map indicators, and transit badges.
* **Row 5 (Cool Gray Tones):** `grayPalette` (from `50` to `600`) - Used for body text, backgrounds, and standard borders.

---

## 💎 Features Built
1. **Language Context (`context/LanguageContext.tsx`):**
   * Instant, layout-safe language switching across 6 languages.
   * Eliminates Next.js hydration errors by checking client-side mounting before translation mapping.
   * Auto-detects browser locale and persists preference in `localStorage`.
2. **Top Header Info & Actions:**
   * Dropdown menu for 6 languages with country flags.
   * Quick-contact links and list-with-us CTA.
3. **Main Header Navigation:**
   * Mega-menu dropdown support.
   * Responsive navigation layout (collapsible sidebar for mobile devices).
4. **Luxury Promotion Slider:**
   * Slideshow cycling through luxury developments (Culture Chula, Ashton Asoke, Residences 38, etc.).
5. **Interactive Search Engine:**
   * Dual-mode toggles (Buy / Rent).
   * 6 active filters: Keyword, Property Type, Bedrooms, Price Range, Transit Line (BTS/MRT), Room Type, and Lifestyle.
6. **Property Grid:**
   * Grid display showing rooms, sizes, specs, and status.
   * 360° Virtual Tour badge indicators.
7. **Advisory Calculators:**
   * **Mortgage Loan Calculator:** Computes down payments, monthly repayments, and total interest.
   * **Borrowing Power Calculator:** Evaluates target home price limits based on standard 40% Debt Service Ratio.
   * **Transfer Costs Calculator:** Compiles buyers' and sellers' closing costs, including Thai Specific Business Tax (SBT) and stamp duties.
   * **Rental Yield Calculator:** Estimates Gross and Net annual rental returns.
8. **Real Estate Widgets:**
   * **Market Statistics Widget:** Showcases annual indices and transit premium ratios.
   * **Daily Rate Widget:** Displays live mortgage interest rates for major Thai commercial banks.

---

## 🛠️ How to Run Locally

Since the command runner experienced path limitations with the `powershell` executable, you can start the application directly on your local system with these simple commands:

1. **Open your command prompt or terminal in the project directory:**
   ```bash
   cd d:\BA\stayverse
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Start the Next.js development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```url
   http://localhost:3000
   ```
