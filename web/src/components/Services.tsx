import { motion } from 'framer-motion';
import { Layout, ShieldCheck, Search } from 'lucide-react';

const services = [
  {
    title: 'WordPress Development',
    icon: Layout,
    items: ['Custom Themes', 'Custom Plugins', 'WooCommerce Stores', 'Multivendor Marketplaces'],
    color: 'bg-blue-500'
  },
  {
    title: 'Performance & Security',
    icon: ShieldCheck,
    items: ['Speed Optimization', 'SSL & Hosting Setup', 'Site Migration', 'Malware Cleanup'],
    color: 'bg-indigo-500'
  },
  {
    title: 'SEO & Maintenance',
    icon: Search,
    items: ['On Page SEO', 'Technical SEO Audits', 'Ongoing Maintenance', 'Content Updates'],
    color: 'bg-purple-500'
  }
];

import { SectionWrapper } from './SectionWrapper';

export const Services = () => {
  return (
    <SectionWrapper id="services" className="bg-gray-50/50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <span className="text-blue-600 font-bold tracking-wider text-xs block mb-6">Capabilities</span>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-8xl leading-none mb-8">
            Services <br />
            <span className="text-blue-600">&</span> tools.
          </h2>
          <p className="text-lg text-gray-600 font-medium leading-relaxed">
            I offer practical WordPress development, performance, and SEO services that solve real business problems.
          </p>
          
          <div className="mt-12 flex flex-col gap-6">
            <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bebas text-3xl mb-2 text-gray-900">Need a Custom Solution?</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">Let's discuss how I can help your business grow with a tailored solution.</p>
              <a
                href="https://calendly.com/zebzuhair71/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
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
              className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500"
            >
              <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-8 text-white shadow-md group-hover:rotate-12 transition-transform`}>
                <service.icon size={28} />
              </div>
              <h3 className="font-bebas text-3xl mb-6 group-hover:text-blue-600 transition-colors tracking-tight">
                {service.title}
              </h3>
              <ul className="space-y-4">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-gray-600 group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 group-hover/item:scale-150 transition-transform" />
                    <span className="font-semibold text-sm">{item}</span>
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