import { useEffect, useState } from 'react';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import s from './StopWatch.module.css';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  // start
  const handleStart = () => setTimerOn(true);
  // stop
  const handleStop = () => {
    setTime(0);
    setTimerOn(false);
  };
  // wait
  let timer;
  const handleWait = e => {
    clearTimeout(timer);
    if (e.detail === 2) {
      timer = setTimeout(() => {
        setTimerOn(false);
      }, 300);
    }
    return;
  };
  // reset
  const handleReset = () => {
    setTime(0);
    setTimerOn(true);
  };

  useEffect(() => {
    const unsubscribe = new Subject();

    interval(10)
      .pipe(takeUntil(unsubscribe))
      .subscribe(() => {
        if (timerOn) {
          setTime(prevTime => prevTime + 1);
        }
      });
    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [timerOn]);

  return (
    <div>
      <h1>Stopwatch</h1>
      <div className={s.stopwatch}>
        <span>
          {('0' + Math.floor((time / (1000 * 60 * 60)) % 24)).slice(-2)}
        </span>
        &nbsp;:&nbsp;
        <span>{('0' + Math.floor(time / 6000)).slice(-2)}</span>&nbsp;:&nbsp;
        <span>{('0' + Math.floor((time / 100) % 60)).slice(-2)}</span>
      </div>
      <div className={s.btns_group}>
        <button
          className={s.btn}
          type="button"
          disabled={timerOn && true}
          onClick={handleStart}
        >
          Start
        </button>
        <button
          className={s.btn}
          type="button"
          disabled={!timerOn && true}
          onClick={handleStop}
        >
          Stop
        </button>
        <button
          className={s.btn}
          type="button"
          disabled={!timerOn && true}
          onClick={handleWait}
        >
          Wait
        </button>
        <button className={s.btn} type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
