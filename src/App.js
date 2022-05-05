import { useState } from "react";

const Button = (props) => {
  const { id, name } = props;
  return (
    <button id={id} type="button">
      <span class="material-symbols-outlined">{name}</span>
    </button>
  )
}

const Session = (props) => {
  const { length } = props;
  return (
    <div>
      <h2 id="session-label">Session Length</h2>
      <div>
        <Button id="session-decrement" name="arrow_downward" />
        <span id="session-length">{length}</span>
        <Button id="session-increment" name="arrow_upward" />
      </div>
    </div>
  );
};

const Break = (props) => {
  const { length } = props;
  return (
    <div>
      <h2 id="break-label">Break Length</h2>
      <div>
        <Button id="break-decrement" name="arrow_downward" />
        <span id="break-length">{length}</span>
        <Button id="break-increment" name="arrow_upward" />
      </div>
    </div>
  );
};

const Timer = (props) => {
  return (
    <div>
      <h2 id="timer-label">Session</h2>
      <div id="time-left">mm:ss</div>
      <div>
        <Button id="start_stop" name="play_pause" />
        <Button id="reset" name="restart_alt" />
      </div>
    </div>
  );
};

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  return (
    <div>
      <h1>Clock</h1>
      <Break length={breakLength}/>
      <Session length={sessionLength}/>
      <Timer />
    </div>
  );
};

export default App;
