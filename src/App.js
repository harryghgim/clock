import { useEffect, useState } from "react";

const Button = (props) => {
  const { id, name, onClick } = props;
  return (
    <button id={id} type="button" onClick={onClick}>
      <span className="material-symbols-outlined">{name}</span>
    </button>
  )
}

const Session = ({ state, setState }) => {  
  const { session, timer } = state
  function handleSessionUp() {
    setState(state => ({
      ...state, 
      session: session == 60 ? session : session + 1,
      timer: timer == 60 ? timer : timer + 1,
    }));
  }

  function handleSessionDown() {
    setState(state => ({
      ...state, 
      session: session == 1 ? session : session - 1,
      timer: timer == 1 ? timer : timer - 1,
    }));
  }

  return (
    <div>
      <h2 id="session-label">Session Length</h2>
      <div>
        <Button id="session-decrement" name="arrow_downward" onClick={handleSessionDown}/>
        <span id="session-length">{session}</span>
        <Button id="session-increment" name="arrow_upward" onClick={handleSessionUp}/>
      </div>
    </div>
  );
};

const Break = ({ state, setState }) => {
  const { break: breakLength } = state;
  function handleBreakUp() {
    setState(state => ({
      ...state, 
      break: breakLength == 60 ? breakLength : breakLength + 1,
    }));
  }

  function handleBreakDown() {
    setState(state => ({
      ...state, 
      break: breakLength == 1 ? breakLength : breakLength - 1,
    }));
  }
  return (
    <div>
      <h2 id="break-label">Break Length</h2>
      <div>
        <Button id="break-decrement" name="arrow_downward" onClick={handleBreakDown}/>
        <span id="break-length">{breakLength}</span>
        <Button id="break-increment" name="arrow_upward" onClick={handleBreakUp}/>
      </div>
    </div>
  );
};

const Timer = ({state, setState}) => {
  const { session, play, timer, break: breakLength, sessionFlag } = state;

  useEffect(() => {
    if (play) {
      const timeoutId = setTimeout(() => {
        if (timer === 0) {
          setState(state => ({...state, sessionFlag: !sessionFlag}));
        } else {
          setState(state => ({...state, timer: timer - 1}));
        }
      }, 1000);
      return () => clearTimeout(timeoutId);
    } 
  }, [timer, play]);

  useEffect(() => {
    if (timer === 0) {
      setState(state => ({...state, timer: sessionFlag ? session : breakLength}));
    }
  }, [sessionFlag]);

  function reset() {
    setState(state => ({...state, break: 5, session: 25, timer: 25, play: false}));
  }
  function handleStartStop() {
    setState(state => ({...state, play: !play}));
    console.log(!play ? "played" : "paused");
  }
  return (
    <div>
      <h2 id="timer-label">{sessionFlag ? "Session" : "Break"}</h2>
      <div id="time-left">{timer}</div>
      <div>
        <Button onClick={handleStartStop} id="start_stop" name="play_pause" />
        <Button id="reset" name="restart_alt" onClick={reset}/>
      </div>
    </div>
  );
};

const App = () => {
  const [state, setState] = useState({
    break: 5,
    session: 25,
    play: false,
    timer: 25,
    sessionFlag: true,
  });

  return (
    <div>
      <h1>Clock</h1>
      <Break 
        state={state}
        setState={setState}
      />
      <Session 
        state={state}
        setState={setState}
      />
      <Timer 
        state={state} 
        setState={setState} 
      />
    </div>
  );
};

export default App;
