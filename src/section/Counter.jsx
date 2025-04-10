import React from 'react';
import useDocumentTitle from '../components/useDocumentTitle';

const Counter = () => {
  useDocumentTitle('Counter');
  return <div>Counter</div>;
};

export default Counter;
