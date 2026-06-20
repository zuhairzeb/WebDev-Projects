import { motion } from 'framer-motion';
import { Layout, BarChart3, BrainCircuit } from 'lucide-react';

const services = [
  {
    title: 'WordPress Development',
    icon: Layout,
    items: ['Custom Themes', 'Custom Plugins', 'WooCommerce Stores', 'Website Optimization'],
    color: 'bg-blue-500'
  },
  {
    title: 'Data Analytics',
    icon: BarChart3,
    items: ['Power BI Dashboards', 'SQL Analysis', 'Business Reporting', 'Data Storytelling'],
    color: 'bg-indigo-500'
  },
  {
    title: 'Artificial Intelligence',
    icon: BrainCircuit,
    items: ['Prompt Engineering', 'Generative AI', 'Agentic AI', 'Automation Solutions'],
    color: 'bg-purple-500'
  }
];

import { SectionWrapper } from './SectionWrapper';

export const Services = () => {
  return (
    <SectionWrapper id="services" className="bg-gray-50/50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-xs block mb-6">Capabilities</span>
          <h2 className="font-bebas text-7xl md:text-8xl leading-none mb-8">
            SERVICES <br />
            <span className="text-blue-600">&</span> TOOLS.
          </h2>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">
            I offer a unique blend of development, analytics, and AI skills to solve complex business problems.
          </p>
          
          <div className="mt-12 flex flex-col gap-6">
            <div className="p-8 bg-black text-white rounded-[3rem]">
              <h3 className="font-bebas text-3xl mb-2">Need a Custom Solution?</h3>
              <p className="text-gray-400 text-sm mb-6">Let's discuss how I can help your business grow.</p>
              <a
                href="https://calendly.com/zebzuhair71/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center py-4 bg-blue-600 rounded-full font-bold hover:bg-blue-700 transition-all uppercase tracking-widest text-xs"
              >
                Book a Strategy Call
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 rounded-[4rem] bg-white border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500"
            >
              <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-10 text-white shadow-lg group-hover:rotate-12 transition-transform`}>
                <service.icon size={28} />
              </div>
              <h3 className="font-bebas text-4xl mb-8 group-hover:text-blue-600 transition-colors tracking-tight">
                {service.title}
              </h3>
              <ul className="space-y-4">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-gray-500 group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 group-hover/item:scale-150 transition-transform" />
                    <span className="font-bold text-sm uppercase tracking-wider">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

