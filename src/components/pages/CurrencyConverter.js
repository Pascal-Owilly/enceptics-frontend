import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#121661',
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
  borderRadius: '30px',
  paddingLeft:'2rem',
  color: 'black',
  width: '90%',
  marginBottom: '50px',
};

const dropdownStyle = {
  backgroundColor: 'white',
  color: 'black',
  border: 'none',
  maxHeight: '100px', // Set a max height
  overflowY: 'scroll', // Add scroll for overflow
  width: '100%',
  marginBottom: '20px',
  padding: '5px',
  borderRadius: '5px',
  textTransform: 'uppercase',
};

const switchStyle = {
  color: '#a9a9a9',
  cursor:'pointer',
  background:'#121661',
  padding: '5px',
  borderRadius:'50%',
  marginTop:'1rem',
};

const resultsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'green',
};

const convertButtonStyle = {
  backgroundColor: 'green',
  borderRadius:'5px',
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
        <h3 className='' style={{color:'white', marginTop:'17vh'}}>Convert Currency</h3>

      </div>
<div className=' p-4 m-3 ' style={{background:'', transition:'none', borderRadius:'0'}}>

      <div style={formStyle}>
        <h4 style={{fontFamily:'cursive', fontWeight:'300'}}>Enter Amount</h4>
        <input
          type="number"
          placeholder="Enter amount"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={inputStyle}
        />

		<div className='d-flex'>

		
        <h6 style={{fontWeight:'300', fontFamily:'cursive'}} className='mx-3'>From</h6>
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
        <h6 style={{fontWeight:'300', fontFamily:'cursive'}} className='mx-3'>To</h6>
		
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
      </div>

      <div style={resultsContainerStyle}>

        <button className='what-card-btn' onClick={() => convert()} style={convertButtonStyle}>
          Enter
        </button>
		<hr />
        <h4 style={{ textTransform: 'uppercase'}}>
          {input + ' ' + from + ' = ' + output.toFixed(2) + ' ' + to}
        </h4>
        <div style={switchStyle}>
        <span className='what-card-navbar' size="18px" style={{fontWeight:'100', padding:'4px'}} onClick={() => flip()}>flip</span>
      </div>
      </div>
    </div>
	</div>
  );
}

export default CurrencyConverter;
