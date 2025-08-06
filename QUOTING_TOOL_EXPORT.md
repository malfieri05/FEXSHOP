# Final Expense Insurance Quoting Tool - Complete Export Package

This package contains all the functionality from your final expense insurance quoting tool that can be easily integrated into another project.

## 📁 Files to Copy

### 1. Core Components
- `FinalExpensePage.tsx` - Main quoting component with sliders and forms
- `csvQuoteUtils.ts` - Quote calculation logic and rate tables
- `funeralCostsByState.ts` - State-specific funeral cost data

### 2. Dependencies
Add these to your `package.json`:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "aos": "^2.3.4"
  }
}
```

### 3. CSS Requirements
Make sure you have Tailwind CSS configured in your project.

## 🎯 Key Features Included

### Quote Sliders
- **Age Slider**: 60-80 years old
- **Coverage Slider**: $5,000-$20,000 in $1,000 increments
- **Health Tier Selection**: Select 1, 2, or 3 based on health questionnaire

### Health Questionnaire
- 5 health questions that auto-classify users into health tiers
- Questions cover tobacco use, medical conditions, hospitalization, etc.

### Rate Calculation
- Real insurance rates for Eagle Select plans
- Separate rates for male/female
- Three health tiers (Select 1, 2, 3)
- Linear interpolation for coverage amounts between standard levels

### State & Burial Type Selection
- All 50 states with funeral cost data
- Burial vs cremation selection
- Dynamic cost display based on state and type

### Quote Display
- Real-time quote calculation
- Professional styling with secure quote modal
- Mobile-optimized interface

## 📋 Implementation Steps

1. **Copy the files** to your new project
2. **Install dependencies** (React, AOS, Tailwind)
3. **Import the component** in your new project
4. **Customize styling** to match your brand
5. **Update API endpoints** for form submissions

## 🔧 Customization Options

### Styling
- All components use Tailwind CSS classes
- Easy to customize colors, fonts, and layout
- Mobile-responsive design

### Data
- Update rate tables in `csvQuoteUtils.ts`
- Modify state data in `funeralCostsByState.ts`
- Customize health questions in the main component

### API Integration
- Form submission endpoint can be changed
- Email functionality can be customized
- Add your own backend integration

## 📱 Mobile Features
- Touch-friendly sliders
- Responsive design
- Optimized for mobile users
- Large, prominent phone number display

## 🎨 Visual Features
- Gradient backgrounds
- Smooth animations with AOS
- Professional insurance branding
- Secure quote modal with prominent CTA

---

**Ready to copy!** All the functionality is self-contained and can be easily integrated into any React project. 