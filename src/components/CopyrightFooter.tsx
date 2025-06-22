// Assuming Logo component is defined elsewhere and imported,
// or you can define it inline if it's simple SVG/text.
// For this example, I'll use a placeholder Logo component if not provided,
// or you should adjust the import path to your actual Logo component.
// Example: import { Logo } from './components/Logo';

// Placeholder Logo component (if you don't have a separate Logo.js file)
// If you have a Logo.js, ensure its path is correctly referenced in the import statement above.
const Logo = () => (
  <div className="flex items-center space-x-2">
    {/* Updated src to point to an image in the public folder */}
    {/* Replace 'your-logo-name.png' with the actual filename of your logo in the public folder */}
    <img src="/LeadChoose.png" alt="LeadChoose Logo" className="h-10 w-10 rounded-full" />
    <span className="text-xl font-bold text-gray-900">LeadChoose</span>
  </div>
);


export const CopyrightFooter = () => {
  const currentYear = new Date().getFullYear(); // Dynamically get the current year

  return (
    <footer className="bg-gray-50 py-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        {/* Logo */}
        <div className="mb-4">
          <Logo /> {/* Your Logo component */}
        </div>

        {/* Copyright Text */}
        <p className="text-gray-600 text-sm">
          Copyright &copy; {currentYear} LeadChoose. All rights reserved.
        </p>
        {/* Line below the copyright text */}
        {/* Changed to h-0.5 for thinner, w-full and max-w-md for page-wide, mx-auto to center, and removed rounded-full */}
        <div className="w-full max-w-md h-0.5 bg-gray-500 mx-auto mt-4"></div>
      </div>
    </footer>
  );
};
