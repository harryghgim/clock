import { useEffect, useState } from "react";

const Button = (props) => {
  const { id, name, onClick } = props;
  return (
    <button id={id} type="button" onClick={onClick}>
      <span className="material-symbols-outlined">{name}</span>
    </button>
  )
}

const Session = (props) => {
  const { length, handleDown, handleUp } = props;
  return (
    <div>
      <h2 id="session-label">Session Length</h2>
      <div>
        <Button id="session-decrement" name="arrow_downward" onClick={handleDown}/>
        <span id="session-length">{length}</span>
        <Button id="session-increment" name="arrow_upward" onClick={handleUp}/>
      </div>
    </div>
  );
};

const Break = (props) => {
  const { length, handleDown, handleUp } = props;
  return (
    <div>
      <h2 id="break-label">Break Length</h2>
      <div>
        <Button id="break-decrement" name="arrow_downward" onClick={handleDown}/>
        <span id="break-length">{length}</span>
        <Button id="break-increment" name="arrow_upward" onClick={handleUp}/>
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

  function handleSessionUp() {
    setState(state => ({
      ...state, 
      session: state.session == 60 ? state.session : state.session + 1,
    }));
  }

  function handleSessionDown() {
    setState(state => ({
      ...state, 
      session: state.session == 1 ? state.session : state.session - 1,
    }));
  }

  function handleBreakUp() {
    setState(state => ({
      ...state, 
      break: state.break == 60 ? state.break : state.break + 1,
    }));
  }

  function handleBreakDown() {
    setState(state => ({
      ...state, 
      break: state.break == 1 ? state.break: state.break - 1,
    }));
  }

  return (
    <div>
      <h1>Clock</h1>
      <Break length={state.break} handleUp={handleBreakUp} handleDown={handleBreakDown} />
      <Session length={state.session} handleUp={handleSessionUp} handleDown={handleSessionDown} />
      <Timer state={state} setState={setState} />
    </div>
  );
};

export default App;
