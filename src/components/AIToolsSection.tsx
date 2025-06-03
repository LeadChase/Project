
import { PhoneCall, MessageSquareText, ArrowRightLeft, CalendarCheck } from 'lucide-react';

const aiTools = [
  {
    icon: <PhoneCall className="w-8 h-8" />,
    title: 'Human-like AI Calls with Leads',
    description: 'Inbound and outbound calling to qualify leads. Designed for sales conversion.',
    color: 'bg-indigo-500'
  },
  {
    icon: <MessageSquareText className="w-8 h-8" />,
    title: 'Texting + Drip Campaigns',
    description: 'Instantly engage, nurture, two-way text, and bulk text with leads.',
    color: 'bg-purple-500'
  },
  {
    icon: <ArrowRightLeft className="w-8 h-8" />,
    title: 'Live Transfers',
    description: 'Connect to calls with qualified leads in real-time.',
    color: 'bg-green-500'
  },
  {
    icon: <CalendarCheck className="w-8 h-8" />,
    title: 'Appointment Setting',
    description: 'Automatically set appointments with your sales team from your highest-quality leads.',
    color: 'bg-blue-500'
  },
];

export const AIToolsSection = () => {
  return (
    <section className="py-16 bg-white sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            AI-Tools that <span className="text-indigo-600">Convert</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Leverage cutting-edge AI to streamline your sales process and maximize conversions.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {aiTools.map((tool, index) => (
            <div
              key={tool.title}
              className="group relative bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 border border-gray-100"
            >
              <div className={`flex items-center justify-center w-16 h-16 rounded-full ${tool.color} text-white shadow-md mb-4 transition-transform duration-300 group-hover:scale-110`}>
                {tool.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {tool.title}
              </h3>
              <p className="text-base text-gray-600">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
