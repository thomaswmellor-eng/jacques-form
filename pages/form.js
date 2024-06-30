import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function FormPage() {
  const router = useRouter();
  const { agency } = router.query;

  const [people, setPeople] = useState('');
  const [duration, setDuration] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [extraBedNotice, setExtraBedNotice] = useState(false);
  const [itineraryOptions, setItineraryOptions] = useState([]);

  useEffect(() => {
    // Mettre à jour les options d'itinéraire en fonction de la durée
    const options = {
      '4d3n': [
        { text: 'EDFOU → ASSOUAN', value: 'edfou_assouan' },
        { text: 'ASSOUAN → EDFOU', value: 'assouan_edfou' }
      ],
      '5d4n': [
        { text: 'EDFOU → ASSOUAN', value: 'edfou_assouan' },
        { text: 'ASSOUAN → EDFOU', value: 'assouan_edfou' }
      ],
      '6d5n': [
        { text: 'EDFOU → ASSOUAN', value: 'edfou_assouan' },
        { text: 'ASSOUAN → EDFOU', value: 'assouan_edfou' },
        { text: 'ESNA → ASSOUAN', value: 'esna_assouan' },
        { text: 'ASSOUAN → ESNA', value: 'assouan_esna' }
      ]
    };
    setItineraryOptions(options[duration] || []);
  }, [duration]);

  // Gérer le changement du nombre de personnes
  const handlePeopleChange = (event) => {
    const selectedPeople = event.target.value;
    setPeople(selectedPeople);
    setExtraBedNotice(selectedPeople === '7');
  };

  return (
    <div>
      <h1>Bonjour {agency ? decodeURIComponent(agency) : "Inconnu"}</h1>
      <div className="main-form">
        <input type="text" placeholder="Entrez le nom du conseiller" name="adviser-name" />
        <select value={people} onChange={handlePeopleChange}>
          <option value="" disabled>Choisissez le nombre de personnes</option>
          {[2, 3, 4, 5, 6, 7].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        {extraBedNotice && <div style={{ color: 'red' }}>Un lit supplémentaire sera mis dans le carré.</div>}
        <select value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option value="" disabled>Choisissez la durée du séjour</option>
          <option value="4d3n">4 jours, 3 nuits</option>
          <option value="5d4n">5 jours, 4 nuits</option>
          <option value="6d5n">6 jours, 5 nuits</option>
        </select>
        <input type="text" value={departureDate} placeholder="Choisissez la date de départ" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => !e.target.value && (e.target.type = 'text')} onChange={(e) => setDepartureDate(e.target.value)} />
        <select value={itinerary} onChange={(e) => setItinerary(e.target.value)}>
          <option value="" disabled>Sélectionnez un itinéraire</option>
          {itineraryOptions.map(option => (
            <option key={option.value} value={option.value}>{option.text}</option>
          ))}
        </select>
        <button className="confirm-button">CONFIRMER</button>
      </div>
    </div>
  );
}
