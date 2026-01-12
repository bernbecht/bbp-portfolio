**AI friendly build plan**

### 1. Scope

* Single page personal website
* Static content with light interactivity
* Responsive, accessible, fast

### 2. Tech stack

* React
* TypeScript
* Tailwind CSS
* Vite or Next.js
* Optional Storybook for components

### 3. Design tokens

* Colors: black, white, blue accent, gray neutrals
* Font: modern sans serif, 2 weights minimum
* Spacing scale: 4, 8, 16, 24, 32, 48
* Max content width: 900px
* Breakpoints: mobile, tablet, desktop

### 4. Layout strategy

* Page wrapper: grid with 3 columns `1fr minmax(0,900px) 1fr`
* Content always lives in center column
* Sections stacked vertically

### 5. Page sections

1. Header
2. Hero
3. What
4. Companies
5. How
6. Tools
7. What’s next
8. Footer

### 6. Component breakdown

* `PageLayout`
* `Header`

  * Logo
  * Nav links
  * Language switch
* `Hero`

  * Avatar
  * Intro text
  * Status pills
  * CTA button
* `Section`

  * Eyebrow label
  * Content slot
* `CompaniesGrid`
* `ToolsList`
* `Footer`

### 7. Tailwind patterns

* Layout: `grid`, `flex`, `gap`, `max-w-[900px]`, `mx-auto`
* Typography: utility first, no custom CSS
* Emphasis text using underline and accent color
* Dotted backgrounds via CSS utility or pseudo element

### 8. Accessibility

* Semantic HTML sections
* `nav`, `header`, `main`, `footer`
* Proper heading order
* Button vs link distinction
* Focus styles visible
* Alt text for avatar and logos

### 9. Content handling

* Copy stored as structured JSON
* Easy language switch PT EN
* AI can regenerate copy without touching layout

### 10. Styling rules

* No hardcoded pixel values except max width
* All spacing via Tailwind scale
* No inline styles
* One visual accent only

### 11. Performance

* Static assets optimized
* SVG logos
* No heavy animations
* Lazy load images

### 12. AI friendliness

* Each component isolated
* Clear props contracts
* Content separate from layout
* Predictable Tailwind patterns
* No magic numbers or hidden logic

### 13. Iteration flow

* Build layout skeleton
* Add components one by one
* Plug content
* Accessibility pass
* Visual polish


