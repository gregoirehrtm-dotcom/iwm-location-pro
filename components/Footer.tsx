export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-3">IWM Location</h3>
            <p className="text-sm text-gray-400">Location de nacelles élévatrices en Suisse Romande.</p>
          </div>
          <div>
            <h3 className="font-bold mb-3">Contact</h3>
            <p className="text-sm text-gray-400">Tel: +41 XX XXX XX XX</p>
            <p className="text-sm text-gray-400">Email: contact@iwm-location.ch</p>
          </div>
          <div>
            <h3 className="font-bold mb-3">Adresse</h3>
            <p className="text-sm text-gray-400">Genève, Suisse</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          <p>&copy; 2026 IWM Location. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
