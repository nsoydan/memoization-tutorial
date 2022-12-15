import { useState, useMemo, useCallback, lazy, Suspense } from "react";
import "./App.css";
//import MyButton from "./MyButton";
const MyButton = lazy(() => import("./MyButton"));

function App() {
  const [num, setNum] = useState(10);
  const [logValue, setLogvalue] = useState("");
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

  const onClickLog = useCallback(
    (e) => {
      e.preventDefault();
      console.log(logValue);
    },
    [logValue]
  );

  return (
    <div className="App">
      <h1>
        Fib of {num} is {fibValue}
      </h1>
      <input
        type="number"
        value={num}
        onChange={(event) => setNum(parseInt(event.target.value))}
      />
      <input
        type="text"
        value={logValue}
        onChange={(event) => setLogvalue(event.target.value)}
      />
      {logValue.length > 0 ? (
        <Suspense fallback={<div>Loading</div>}>
          <MyButton onClick={onClickLog}>Log Value</MyButton>
        </Suspense>
      ) : null}
    </div>
  );
}

const fib = (num) => {
  if (num === 2) return 1;
  if (num === 1) return 0;
  return fib(num - 1) + fib(num - 2);
};

export default App;
