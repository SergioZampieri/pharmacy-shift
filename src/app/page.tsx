'use client';

import { usePharmacyShifts, useShiftCountdown } from '@/hooks/use-pharmacy-shifts';
import styles from './page.module.css';

export default function Home() {
  const { data, isLoading, error, isFetching } = usePharmacyShifts();
  const countdown = useShiftCountdown();

  if (isLoading) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>Loading pharmacy shifts...</main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <div>Error loading pharmacy shifts</div>
          <div>{error.message}</div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>PHARMACY SHIFTS</h1>

        {isFetching && <div style={{ fontSize: '0.875rem', color: '#666' }}>Refreshing...</div>}

        <div style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
          Next shift change in: {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
        </div>

        <section style={{ marginTop: '2rem' }}>
          <h2>Currently on Duty ({data?.deTurnoAhora.length || 0})</h2>
          <div style={{ marginTop: '1rem' }}>
            {data?.deTurnoAhora.map((pharmacy) => (
              <div
                key={pharmacy._id}
                style={{
                  border: '1px solid #ddd',
                  padding: '1rem',
                  marginBottom: '0.5rem',
                  borderRadius: '4px',
                }}
              >
                <h3>{pharmacy.nombre}</h3>
                <p>{pharmacy.direccion}</p>
                <p>Tel: {pharmacy.telefono}</p>
                {pharmacy.whatsapp && <p>WhatsApp: {pharmacy.whatsapp}</p>}
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>Next Shift ({data?.deTurnoProximo.length || 0})</h2>
          <div style={{ marginTop: '1rem' }}>
            {data?.deTurnoProximo.map((pharmacy) => (
              <div
                key={pharmacy._id}
                style={{
                  border: '1px solid #ddd',
                  padding: '1rem',
                  marginBottom: '0.5rem',
                  borderRadius: '4px',
                  opacity: 0.7,
                }}
              >
                <h3>{pharmacy.nombre}</h3>
                <p>{pharmacy.direccion}</p>
                <p>Tel: {pharmacy.telefono}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
