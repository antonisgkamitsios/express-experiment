import { startTransition, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import ErrorBoundary from './ErrorBoundary';

// import { handleData } from './utils/handleData';
// import { SuspenseSexy } from './components/SuspenseSexy';

const fetchData = (url: string) => {
  const promise = fetch(url)
    .then((res) => {
      return new Promise<{ name: string }>((resolve) => setTimeout(() => resolve(res.json()), 1000));
    })
    .then((res) => res)
    .catch((e) => console.log(e));

  // return wrapPromise(promise);
  return promise;
};

function Counter({ path }: { path: string }) {
  const [count, setCount] = useState(1);

  const data = useSuspenseQuery({ queryKey: ['todos', count], queryFn: () => fetchData(path + '/api/todos/' + count) });
  // const data = useQuery({ queryKey: ['todos', count], queryFn: () => fetchData(path + '/api/todos/' + count), placeholderData: keepPreviousData });

  console.log(data.data);

  return (
    // <SuspenseSexy data={data}>
    <div className="card">
      {data.data?.name}
      <input type="text" />
      <button onClick={() => startTransition(() => setCount((count) => count + 1))}>count is {count}</button>
      <p></p>
    </div>
    // </SuspenseSexy>
  );
}

export default function CounterWithErrorBoundary({ path }: { path: string }) {
  return (
    <ErrorBoundary>
      <Counter path={path} />
    </ErrorBoundary>
  );
}
