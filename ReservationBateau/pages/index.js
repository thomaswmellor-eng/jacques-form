import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [agencyName, setAgencyName] = useState('');
  const [linkGenerated, setLinkGenerated] = useState('');

  const handleGenerateLink = () => {
    const uniqueLink = `/form?agency=${encodeURIComponent(agencyName)}`;
    setLinkGenerated(uniqueLink);
  };

  return (
    <div>
      <h1>Créer un lien pour une agence de voyage</h1>
      <input
        type="text"
        placeholder="Nom de l'agence"
        value={agencyName}
        onChange={(e) => setAgencyName(e.target.value)}
      />
      <button onClick={handleGenerateLink}>Générer le lien</button>
      {linkGenerated && (
        <div>
          <p>Lien généré pour l'agence :</p>
          <Link href={linkGenerated}>
            <a target="_blank">{`${process.env.NEXT_PUBLIC_BASE_URL}${linkGenerated}`}</a>
          </Link>
        </div>
      )}
    </div>
  );
}
