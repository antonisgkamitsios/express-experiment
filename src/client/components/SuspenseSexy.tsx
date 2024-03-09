import { UseQueryResult } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

type SuspenseSexyProps<TData, TError> = PropsWithChildren<{ data: UseQueryResult<TData, TError> }>;
function SuspenseSexy<TData, TError>({ data, children }: SuspenseSexyProps<TData, TError>) {
  if (data.isLoading) {
    return <>Loading</>;
  }
  if (data.isError) {
    return <>Error</>;
  }

  return children;
}

export { SuspenseSexy };
