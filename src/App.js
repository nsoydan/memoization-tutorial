import { useState, useMemo, useCallback, lazy, Suspense } from "react";
import "./App.css";
//import MyButton from "./MyButton";
const MyButton = lazy(() => import("./MyButton"));

function App() {
  const [num, setNum] = useState(10);
  const [logValue, setLogvalue] = useState("");
  const [showingLogValue, setShowingLogValue] = useState("");
  const fibValue = useMemo(() => {
    console.log("fibValue calculated");
    return fib(num);
  }, [num]); // Refired callback function when the dpendecy array is changed

  // The major difference between useCallback and useMemo is that
  // useCallback will memory the returned value,
  // whereas useMemo will memory the function.
  // Essentially, the only difference between these hooks is that
  // one caches a value type, and the other caches a function.

  // useMemo

  // const onClickLog = useMemo(()=>{
  //   return (e) => {
  //     e.preventDefault();
  //     console.log(logValue);
  //   }
  // },[logValue])

  // useCallback

  const onClickLog = useCallback(() => {
    setShowingLogValue(logValue);
  }, [logValue]);

  return (
    <div className="App">
      <h1 className="text-5xl m-2">
        Fib of {num} is {fibValue}
      </h1>
      <input className="m-2 text-black rounded-lg"
        type="number"
        value={num}
        onChange={(event) => setNum(parseInt(event.target.value))}
      />
      <input className="m-2 text-black rounded-lg"
        type="text"
        value={logValue}
        onChange={(event) => setLogvalue(event.target.value)}
      />
      {logValue.length > 0 ? (
        <Suspense fallback={<div>Loading</div>}>
          <MyButton className="bg-slate-200 rounded-lg" onClick={onClickLog}>Log Value</MyButton>
        </Suspense>
      ) : null}

      <p> show logValue when clicked : {showingLogValue} </p>
    </div>
  );
}

const fib = (num) => {
  if (num === 2) return 1;
  if (num === 1) return 0;
  return fib(num - 1) + fib(num - 2);
};

export default App;
