'use client';

import ReactConfetti, { type Props as ReactConfettiProps } from 'react-confetti';
import { useWindowSize } from '~/lib/hooks/use-window-size';

const SizedConfetti = (props: ReactConfettiProps) => {
  const { height, width } = useWindowSize();

  return <ReactConfetti width={width} height={height} {...props} />;
};

export { SizedConfetti };
