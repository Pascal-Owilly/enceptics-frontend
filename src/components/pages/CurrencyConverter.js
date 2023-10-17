import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(18, 22, 97)',
  height: '100vh',
  color: 'white',
};

const headingStyle = {
  textAlign: 'center',
  fontSize: '24px',
  color: 'white',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const inputStyle = {
  padding: '5px',
  border: 'none',
  backgroundColor: 'rgb(255,255,255,0.7)',
  color: 'green',
  width: '100%',
  marginBottom: '20px',
};

const dropdownStyle = {
  backgroundColor: 'green',
  color: 'white',
  border: '1px solid white',
  maxHeight: '200px', // Set a max height
  overflowY: 'scroll', // Add scroll for overflow
  width: '100%',
  marginBottom: '20px',
  padding: '5px',
  borderRadius: '5px',
  textTransform: 'uppercase',
};

const switchStyle = {
  color: 'goldenrod',
  background:'#121661',
  padding: '5px',
  borderRadius:'50%',
  margin:'1rem',
};

const resultsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'white',
};

const convertButtonStyle = {
  backgroundColor: '#121661',
  color: 'white',
  border: 'none',
  padding: '5px 20px',
  cursor: 'pointer',
};

function CurrencyConverter() {
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('kes');
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);

  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
    ).then((res) => {
      setInfo(res.data[from]);
    });
  }, [from]);

  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info]);

  function convert() {
    const rate = info[to];
    setOutput(input * rate);
  }

  function flip() {
    const temp = from;
    setFrom(to);
    setTo(temp);
  }

  return (
    <div style={containerStyle}  >
		      <div style={headingStyle} >
        <h1 className='mt-3' style={{color:'green'}}>Convert Currency</h1>
		<hr className='text-secondary'/>

      </div>
<div className=' p-4 m-3 ' style={{background:'green', transition:'none', borderRadius:'5px', height:'400px'}}>

      <form style={formStyle} >
        <h3>Amount</h3>
        <input
          type="text"
          placeholder="Enter the amount"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={inputStyle}
        />

		<div className='d-flex'>

		
        <h5 style={{fontWeight:'300'}} className='mx-3'>From</h5>
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          style={dropdownStyle}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <h5 style={{fontWeight:'300'}} className='mx-3'>To</h5>
		
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={dropdownStyle}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
		</div>
      </form>

      <div style={resultsContainerStyle}>
	  <div style={switchStyle}>
        <HiSwitchHorizontal size="30px" onClick={() => flip()} />
      </div>
        <button onClick={() => convert()} style={convertButtonStyle}>
          Convert
        </button>
		<hr />
        <h4 style={{ textTransform: 'uppercase'}}>
          {input + ' ' + from + ' = ' + output.toFixed(2) + ' ' + to}
        </h4>
      </div>
    </div>
	</div>
  );
}

export default CurrencyConverter;
