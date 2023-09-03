import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import '../../static/Styles.css';

function Converter() {
  const [info, setInfo] = useState({});
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('ksh');
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);

  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
    ).then((res) => {
      setInfo(res.data);
    });
  }, [from]);

  useEffect(() => {
    setOptions(Object.keys(info));
  }, [info]);

  function convert() {
    let rate = info[to];
    setOutput(input * rate);
  }

  function switchCurrency() {
    let temp = from;
    setFrom(to);
    setTo(temp);
  }

  const greatvibes = {
    fontFamily: 'great_vibes',
    color: '#ddd2d2',
  };

  return (
    <>
      <div style={{ backgroundColor: '#121661', height: '100vh' }}>
        <div className="container-fluid c-container">
          <div className="row">
            <div className="col-md-12">
              <div
                className="app-container"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '85vh',
                  marginTop: '14vh',
                  borderRadius: '10px',
                }}
              >
                <div className="heading">
                  <h1 className="c-h1 mb-3 mt-4" style={{ color: '#ddd2d2' }}>
                    Currency <br /> Converter
                  </h1>
                </div>
                <div className=" mt-4">
                  <div className="left">
                    <h6 style={{ color: '#121661' }}>Amount</h6>
                    <input
                      type="number"
                      className="c-input"
                      placeholder="Enter Amount"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>
                  <br />
                  <div className="middle">
                    <h6 style={{ color: '#121661' }}>From</h6>
                    <Dropdown
                      onSelect={(e) => {
                        setFrom(e);
                        convert();
                      }}
                    >
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {from}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {options.map((currency) => (
                          <Dropdown.Item key={currency} eventKey={currency}>
                            {currency}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="switch">
                    <span
                      size="20px"
                      style={{ color: '#ddd2d2', width: '20px' }}
                      onClick={() => {
                        switchCurrency();
                        convert();
                      }}
                    >
                      flip
                    </span>
                  </div>
                  <div className="right">
                    <h6 style={{ color: '#121661' }}>To</h6>
                    <Dropdown
                      onSelect={(e) => {
                        setTo(e);
                        convert();
                      }}
                    >
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {to}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {options.map((currency) => (
                          <Dropdown.Item key={currency} eventKey={currency}>
                            {currency}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="result">
                  <div className="text-center">
                    <button
                      className="mt-5 m-auto"
                      style={{
                        width: '60%',
                        borderRadius: '30px',
                        backgroundColor: '#121661',
                        color: '#ddd2d2',
                        fontWeight: 'bold',
                        margin: 'auto',
                      }}
                      onClick={convert}
                    >
                      convert
                    </button>
                  </div>
                  <h2 className="mt-5 text-center" style={greatvibes}>
                    Converted Amount:{' '}
                  </h2>
                  <p className="text-center">
                    {input + ' ' + from + ' = ' + output.toFixed(2) + ' ' + to}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Converter;
