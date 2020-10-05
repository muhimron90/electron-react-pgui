import React,{ useEffect, useRef }  from 'react'

import PropTypes from 'prop-types';

const BoxMessage = (props) => {
  const ref = useRef();
  const {
    textInfo,
    children,

  } = props;
  
 
  return (
    <>
        <textarea className="text--area" value={textInfo} readOnly />
    </>
  );
}
BoxMessage.propTypes = {
  textInfo: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default BoxMessage;