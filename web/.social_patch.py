from pathlib import Path
path = Path(r'c:/Users/zuhai/Downloads/web/src/components/Social.tsx')
text = path.read_text(encoding='utf-8')
old = '''          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            {proofs.map((proof, i) => {
              <motion.div
                key={proof.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-10 rounded-[3rem] bg-white border border-gray-100 hover:border-blue-200 transition-all"
                >
                <div>
                  <Quote className={`mb-8 ${i === 0 ? 'text-blue-400' : 'text-blue-600'}`} size={40} />
                  <p className={`text-xl leading-relaxed mb-10 ${i === 0 ? 'text-gray-300' : 'text-gray-600'}`}>&quot;{t.text}&quot;</p>
                </div>
                <div>
                  <h4 className={`font-bebas text-3xl ${i === 0 ? 'text-white' : 'text-black'}`}>{proof.title}</h4>
                  <p className={`text-xs uppercase tracking-widest font-bold ${i === 0 ? 'text-gray-500' : 'text-gray-400'}`}>Verified credential</p>
                </div>
              </motion.div>
            })}
          </div>
'''
new = '''          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            {proofs.map((proof, i) => {
              const Icon = proof.icon;
              return (
                <motion.div
                  key={proof.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-10 rounded-[3rem] bg-white border border-gray-100 hover:border-blue-200 transition-all"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="rounded-3xl bg-blue-600/10 text-blue-600 p-4 shadow-sm">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-bebas text-3xl tracking-tight">{proof.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{proof.description}</p>
                </motion.div>
              );
            })}
          </div>
'''
if old not in text:
    print('Old block not found')
    start = text.find('          <div class="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">')
    print(text[start:start+1000])
else:
    path.write_text(text.replace(old, new), encoding='utf-8')
    print('patched')
