export default function Footer() {
  return (
    <footer className="py-8 md:py-10 border-t border-border bg-background relative z-10">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-1.5 tracking-wider">
          MUHAMMAD ZUHAIR ZEB
        </h2>
        <p className="font-mono text-muted-foreground text-xs md:text-sm">"Turning data into decisions."</p>

        <div className="mt-6 md:mt-8 text-xs font-mono text-muted-foreground flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse inline-block" style={{ boxShadow: '0 0 6px #00FF88' }} />
          SYSTEM.STATUS: ONLINE // {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
