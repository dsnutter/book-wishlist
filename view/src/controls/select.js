import React from "react";
import ReactSelect from 'react-select';

const customStyles = {
    option: provided => ({
      ...provided,
      color: 'black',
      textAlign: 'left'
    }),
    control: provided => ({
      ...provided,
      color: 'black'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black'
    })
}

export default (props) => <ReactSelect styles={customStyles} {...props} />