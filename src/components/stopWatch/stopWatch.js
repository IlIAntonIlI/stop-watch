import './stopWatch.scss'
import { Observable } from 'rxjs'
import { useState } from "react"

let stream$ = new Observable();
let subscription;
let lastClick;

function start(val, func){
  if(subscription?.closed || !subscription){
    let counter=val;
    stream$ = new Observable(observer=>{
      setInterval(() => {
        observer.next(++counter);
      }, 1000);
    })
    subscription = stream$.subscribe(val =>{
      func(val);
    })
  }
}

function stop(func){
  subscription.unsubscribe();
  func(0);
}

function reset(func){
  func(0);
  if (!subscription.closed) {
    subscription.unsubscribe();
    start(0,func);
  }
}

function wait(){
  if (lastClick){
    Date.now()-lastClick<300 && subscription.unsubscribe();
    lastClick = undefined;
    return;
  } 
  lastClick = Date.now();
}

function stopWatch () {
  const [time,setTime] = useState(0);
  return (
    <div className="stopwatch">
      <div className="time-panel">
        <div>{new Date(time * 1000).toISOString().substring(11, 19)}</div>
      </div>
      <div className="buttons-panel">
        <button onClick={()=>{start(time,setTime)}}>Start</button>
        <button onClick={()=>{stop(setTime)}}>Stop</button>
        <button onClick={()=>{reset(setTime)}}>Reset</button>
        <button onClick={wait}>Wait</button>
      </div>
    </div>
  )
}

export default stopWatch
