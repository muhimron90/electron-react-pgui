import React from 'react';
import '../styles/btn.scss';

const Button = (props) => {

  const { title, onPress } = props;
  return (
    <>
      <button type="button" onClick={onPress} className="btn--main">
        <p>{title}</p>
      </button>
    </>
  );
}

export default Button;