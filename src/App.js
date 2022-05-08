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

const Timer = ({session, br}) => {
  const [pause, setPause] = useState(true);

  function handleStartStop() {
    if (pause) {
      console.log("played")
      setPause(false);
    } else {
      console.log("paused")
      setPause(true);
    }
  }

  return (
    <div>
      <h2 id="timer-label">Session</h2>
      <div id="time-left">{session}</div>
      <div>
        <Button onClick={handleStartStop} id="start_stop" name="play_pause" />
        <Button id="reset" name="restart_alt" />
      </div>
    </div>
  );
};

const App = () => {
  const [state, setState] = useState({
    break: 5,
    session: 25,
  });

  function handleSessionUp() {
    setState({...state, session: state.session == 60 ? state.session : state.session + 1});
  }

  function handleSessionDown() {
    setState({...state, session: state.session == 1 ? state.session : state.session - 1});
  }

  function handleBreakUp() {
    setState({...state, break: state.break == 60 ? state.break : state.break + 1});
  }

  function handleBreakDown() {
    setState({...state, break: state.break == 1 ? state.break: state.break - 1});
  }


  return (
    <div>
      <h1>Clock</h1>
      <Break length={state.break} handleUp={handleBreakUp} handleDown={handleBreakDown}/>
      <Session length={state.session} handleUp={handleSessionUp} handleDown={handleSessionDown}/>
      <Timer session={state.session} br={state.break}/>
    </div>
  );
};

export default App;
