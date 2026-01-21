"use client";
import { useState } from 'react';
import { X } from 'lucide-react';

export default function Teaser() {
    const [showModal, setShowModal] = useState(false);

    return (
        <section id="teaser-section" className="py-32 px-4 relative flex items-center justify-center min-h-[60vh]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

            <div className="glass-panel max-w-4xl w-full p-12 md:p-20 rounded-3xl text-center relative overflow-hidden border-accent/20">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

                <h2 className="text-3xl md:text-5xl font-bold mb-8">
                    Non scegli un evento.<br />
                    <span className="text-gradient">Entri in un percorso.</span>
                </h2>

                <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto">
                    Il vecchio modello è statico. LUMINA XP è vivo.
                    Costruiamo insieme la tua prossima corporate experience.
                </p>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-accent text-black font-bold py-4 px-10 rounded-full hover:bg-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                >
                    Inizia il viaggio
                </button>
            </div>

            {/* Contact Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowModal(false)} />

                    <div className="relative w-full max-w-lg bg-[#0a0a0a] border border-accent/20 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,240,255,0.15)] animate-in zoom-in-95 duration-300">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="mb-8">
                            <h3 className="text-3xl font-bold mb-2 text-white">Inizia il Viaggio</h3>
                            <p className="text-gray-400">Compila il form per attivare il protocollo XP.</p>
                        </div>

                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-xs font-mono uppercase text-accent/70 mb-2">Nome</label>
                                    <input id="name" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all" placeholder="Nome" />
                                </div>
                                <div>
                                    <label htmlFor="surname" className="block text-xs font-mono uppercase text-accent/70 mb-2">Cognome</label>
                                    <input id="surname" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all" placeholder="Cognome" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-xs font-mono uppercase text-accent/70 mb-2">Email Aziendale</label>
                                <input id="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all" placeholder="name@company.com" />
                            </div>

                            <div>
                                <label htmlFor="vision" className="block text-xs font-mono uppercase text-accent/70 mb-2">Visione</label>
                                <textarea id="vision" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all h-32 resize-none" placeholder="Descrivi il tuo obiettivo..." />
                            </div>

                            <button className="w-full bg-accent text-black font-bold py-4 rounded-xl hover:bg-white hover:scale-[1.02] transition-all duration-300 mt-4 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                                INVIA RICHIESTA
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
