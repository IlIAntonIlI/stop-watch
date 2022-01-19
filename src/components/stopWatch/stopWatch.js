import "./stopWatch.scss";

function stopWatch() {
  return (
    <div className="stopwatch">
      <div className="time-panel">
        <div>23 : 59 : 59</div>
      </div>
      <div className="buttons-panel">
        <button>Start</button>
        <button>Stop</button>
        <button>Reset</button>
        <button>Wait</button>
      </div>
    </div>
  );
}

export default stopWatch;
