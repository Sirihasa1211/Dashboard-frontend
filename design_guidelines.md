# Analytics Dashboard Design Guidelines

## Design Approach
**System**: Modern SaaS Dashboard inspired by Linear, Vercel Dashboard, and Material Design's data visualization principles
**Rationale**: This is a utility-focused, data-intensive application requiring clarity, hierarchy, and efficient information processing. The design prioritizes readability, scanability, and professional aesthetics suitable for financial data analysis.

## Core Design Principles
1. **Data First**: Every design decision serves data clarity and actionability
2. **Professional Minimalism**: Clean, uncluttered interfaces with purposeful whitespace
3. **Hierarchical Clarity**: Clear visual hierarchy guiding users from overview to details
4. **Responsive Density**: Appropriate information density for screen sizes

---

## Typography System

**Font Stack**: 
- Primary: `Inter` (Google Fonts) - body text, UI elements, data
- Monospace: `JetBrains Mono` - numbers, currency values, invoice IDs

**Type Scale**:
- Display (Dashboard Title): `text-3xl font-semibold` (30px)
- Page Headings: `text-2xl font-semibold` (24px)
- Section Headings: `text-lg font-medium` (18px)
- Card Titles: `text-sm font-medium uppercase tracking-wide` (14px)
- Body Text: `text-base` (16px)
- Secondary Text: `text-sm text-muted-foreground` (14px)
- Small Labels: `text-xs text-muted-foreground` (12px)
- Data Values (large): `text-3xl font-semibold font-mono` (30px)
- Table Data: `text-sm font-mono` (14px)

---

## Layout System

**Spacing Primitives**: Use Tailwind units **2, 4, 6, 8, 12, 16** for consistent rhythm
- Component padding: `p-6` (24px) for cards, `p-8` (32px) for sections
- Between elements: `gap-4` (16px) standard, `gap-6` (24px) for major sections
- Section margins: `mb-8` (32px) between dashboard sections

**Grid Structure**:
- Dashboard: Sidebar (fixed `w-64`) + Main Content (`flex-1`)
- Metrics Cards: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`
- Charts Section: `grid-cols-1 lg:grid-cols-2 gap-6`
- Container: `max-w-7xl mx-auto px-6`

---

## Component Library

### Sidebar Navigation
- Fixed left sidebar: `w-64 h-screen border-r`
- Logo/Brand: Top section with `h-16 px-6 flex items-center`
- Navigation items: `px-4 py-3 rounded-lg` with hover states
- Active state: Subtle background fill
- Icons: 20px (Heroicons outline/solid)

### Overview Cards (Metrics)
- Structure: `rounded-xl border p-6 shadow-sm`
- Layout: Icon (top-left) + Label (below) + Large Value (prominent) + Trend indicator (bottom)
- Icon size: 40px with subtle background circle
- Trend: Small chart sparkline or percentage with arrow icon

### Charts
**Container**: `rounded-xl border p-6 shadow-sm`
**Title**: `text-lg font-medium mb-6`
**Library**: Chart.js or Recharts
**Types Needed**:
1. Line Chart (Invoice Volume + Value Trend): Dual-axis, gridlines, tooltips
2. Horizontal Bar Chart (Top 10 Vendors): Left-aligned labels, right-aligned values
3. Pie/Donut Chart (Spend by Category): Legend on right, percentage labels
4. Bar Chart (Cash Outflow Forecast): Monthly groupings, tooltips

**Chart Styling**:
- Grid lines: Subtle, minimal
- Tooltips: Rounded, with shadow
- Legend: Small text, aligned appropriately
- Animations: Minimal, fast (300ms)

### Invoices Table
- Container: `rounded-xl border overflow-hidden`
- Header: `px-6 py-4 border-b` with search input and filters
- Table: Sticky header, hover row states
- Columns: Invoice #, Vendor, Date, Amount (monospace), Status, Actions
- Status badges: `rounded-full px-3 py-1 text-xs font-medium`
- Pagination: Bottom bar with page numbers
- Row height: `h-14` for comfortable scanning

### Chat Interface
- Two-pane layout: Chat messages (left 60%) + SQL/Results (right 40%)
- Message bubbles: User (right-aligned), AI (left-aligned)
- Input: Fixed bottom with `rounded-lg border p-4`, send button
- SQL Display: `font-mono text-sm bg-muted p-4 rounded-lg`
- Results Table: Compact variant of invoices table styling
- Streaming indicator: Subtle animated dots

### Common Patterns
**Buttons**:
- Primary: `px-4 py-2 rounded-lg font-medium`
- Secondary: `border px-4 py-2 rounded-lg`
- Icon buttons: `p-2 rounded-lg`

**Input Fields**:
- Standard: `px-4 py-2 rounded-lg border focus:ring-2`
- Search: Include search icon prefix

**Badges/Tags**:
- `rounded-full px-3 py-1 text-xs font-medium`

---

## Dashboard Layout Structure

### Main Dashboard View
1. **Header Bar** (`h-16 border-b px-6`): Page title + date range picker + action buttons
2. **Metrics Row**: 4 overview cards in grid
3. **Charts Grid**: 
   - Row 1: Invoice Trend (full width)
   - Row 2: Vendor Spend (left) + Category Spend (right)
   - Row 3: Cash Outflow Forecast (full width)
4. **Invoices Section**: Full-width table with header

### Chat with Data View
- Split layout: Chat messages + Query results
- Sticky input at bottom
- Clear visual separation between sections

---

## Animations
**Use Sparingly**:
- Card hover: Subtle lift (`transition-shadow hover:shadow-md`)
- Number counters: Animate on mount (500ms)
- Chart entrance: Fade in + scale (400ms)
- Page transitions: None - instant navigation
- Loading states: Simple spinner, no skeleton screens

---

## Responsive Behavior
- **Mobile** (< 768px): Sidebar collapses to hamburger menu, single column layout, stacked cards
- **Tablet** (768-1024px): 2-column metrics, stacked charts
- **Desktop** (> 1024px): Full layout as described

---

## Images
**Not Required**: This is a data-centric dashboard. No hero images or decorative imagery needed. Focus purely on data visualization and UI components.