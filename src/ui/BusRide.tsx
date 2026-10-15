import { useEffect, useState } from 'react';
import { bus } from '../core/events';
import { RIDE_MS } from '../core/ride';

/**
 * The expressway scene: the bus seen from the side, driving along a motorway through
 * mountain country. Layers scroll at different speeds (see .ride-* in styles.css).
 * The destination map is already loaded underneath; the scene fades out to reveal it.
 */
export function BusRide({ kind = 'bus', onDone }: { kind?: 'bus' | 'local' | 'shinkansen'; onDone: () => void }) {
  const [dest, setDest] = useState<{ ja: string } | null>(null);
  const [phase, setPhase] = useState<'in' | 'run' | 'out'>('in');

  useEffect(() => {
    const off = bus.on('map-entered', (m: { nameJa: string }) => setDest({ ja: m.nameJa }));
    const t1 = setTimeout(() => setPhase('run'), 500);
    const t2 = setTimeout(() => setPhase('out'), RIDE_MS - 700);
    const t3 = setTimeout(onDone, RIDE_MS);
    return () => {
      off();
      [t1, t2, t3].forEach(clearTimeout);
    };
  }, [onDone]);

  const ann = phase === 'out' && dest ? `まもなく、${dest.ja}です。` : kind === 'bus' ? 'ご乗車ありがとうございます。この バスは 高速道路を 走ります。' : kind === 'shinkansen' ? 'ご乗車ありがとうございます。この 新幹線は、のぞみ号です。' : 'ご乗車ありがとうございます。この 電車は、各駅に とまります。';

  // trains: seen from inside, looking out of the window (the bus keeps the side view)
  if (kind !== 'bus')
    return (
      <div className={`ride ride-${phase} ride-k-${kind} ride-win`} aria-hidden>
        <div className="tw-stage">
          <div className="tw-view">
            <div className="tw-far" />
            <div className="tw-mid" />
            <div className="tw-near" />
            <div className="tw-tunnel" />
          </div>
          <img className="tw-wagon" src={`assets/ride_wagon_${kind}.webp`} alt="" />
          <img className="tw-seat" src={`assets/ride_seat_${kind === 'shinkansen' ? 'blue' : 'red'}.png`} alt="" />
        </div>
        <div className="tw-route"><i /></div>
        <div className="ride-bar bottom">
          <span className="ride-ann">{ann}</span>
        </div>
      </div>
    );

  return (
    <div className={`ride ride-${phase} ride-k-${kind}`} aria-hidden>
      <div className="ride-sky" />
      <div className="ride-sun" />
      <div className="ride-clouds" />
      <div className="ride-far" />
      <div className="ride-mid" />
      <div className="ride-trees" />
      {kind === 'bus' ? (
        <div className="ride-gantry">
          <span>日野森 IC</span>
          <span className="ride-arrow">↗ 12 km</span>
        </div>
      ) : (
        <div className="ride-wires" />
      )}
      <div className="ride-rail" />
      <div className="ride-poles" />
      <div className="ride-road">
        <div className="ride-lane" />
      </div>
      {kind === 'bus' ? (
        <div className="ride-bus">
          <img src="assets/bus_side.png" alt="" />
        </div>
      ) : (
        <div className="ride-train">
          {kind === 'shinkansen' ? (
            ['mid', 'mid', 'head'].map((p, i) => <img key={i} src={`assets/train_${p}.png`} alt="" />)
          ) : (
            <img src="assets/train_local.png" alt="" />
          )}
        </div>
      )}
      <div className="ride-bar top" />
      <div className="ride-bar bottom">
        <span className="ride-ann">
          {ann}
        </span>
      </div>
    </div>
  );
}
