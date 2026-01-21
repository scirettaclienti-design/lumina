export default function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-white/5 bg-surface text-sm text-gray-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h4 className="text-white font-bold text-lg mb-1">LUMINA XP</h4>
                    <p>Adaptive Experience Platform</p>
                </div>

                <div className="flex gap-8">
                    <a href="#" className="hover:text-accent transition-colors">Instagram</a>
                    <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
                    <a href="mailto:hello@lumina-xp.com" className="hover:text-accent transition-colors">hello@lumina-xp.com</a>
                </div>

                <div className="text-right">
                    <p>© 2026 LUMINA XP</p>
                    <p className="text-xs mt-1 opacity-50">Project in active development</p>
                </div>
            </div>
        </footer>
    );
}
