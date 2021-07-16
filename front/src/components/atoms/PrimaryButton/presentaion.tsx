import React from 'react';
import { Button } from '@material-ui/core';

type Props = {
  text: string;
  icon?: React.ReactSVGElement;
  disabled?: boolean;
  type?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function PrimaryButton(props: Props) {
  const { text, icon } = props;
  return (
    <Button>
      {text}
      {icon}
    </Button>
  );
}

export default PrimaryButton;