import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const[amount,setAmount]=useState(2)
  const[tovalue,setTovalue]=useState("KWD")
  const[fromvalue,setFromvalue]=useState("INR")
  const[result,setResult ]=useState(null)
  const[getvalue,setGetvalue]=useState(null)

  useEffect(()=>{
    async function exchangeValue(){
      try{
        const Url= `https://api.exchangerate-api.com/v4/latest/${fromvalue}`
        const respons= await axios.get(Url)
        console.log(respons)
        setGetvalue(respons.data.rates[tovalue])
      }catch(error){
        console.log(error.message)
      }
    }
    exchangeValue()
  },[fromvalue,tovalue])

  useEffect(()=>{
    if(getvalue !== null){
      setResult((amount*getvalue).toFixed(2))
    }
  },[amount,getvalue])
  

  function amboutnumber(e){
    const value=parseFloat(e.target.value)
    setAmount(isNaN(value)?0:value)
  }
  function fromnumber(e){
    setFromvalue(e.target.value)
  }
  function tonumber(e){
   setTovalue(e.target.value)
  }
  

  return (
    <>
      <div className="container">
        <h1>Currency Converter</h1>
        <div className="input-group">
          <div className="input-amout"> 
            <label htmlFor="amout">Amount</label>
            <input placeholder="Amount" id="amout" value={amount} onChange={amboutnumber} type="number"></input>
          </div>
          <div className="input-from">
            <label htmlFor="from">From Currency</label>
            <select id="from" value={fromvalue} onChange={fromnumber}>
              <option value="USD">United States Dollar (USD)</option>
              <option value="KWD">Kuwaiti Dinar (KWD)</option>
              <option value="BHD"> Bahraini Dinar (BHD)</option>
              <option value="JOD">Jordanian Dinar (JOD)</option>
              <option value="GIP">Gibraltar Pound (GIP)</option>
              <option value="GBP">British Pound (GBP)</option>
              <option value="KYD">Cayman Island Dollar (KYD)</option>
              <option value="CHF">Swiss Franc (CHF)</option>
              <option value="INR">India Rupee(INR)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>
          </div>
          <div className="input-to">
            <label htmlFor="to" onChange={tonumber}>To Currency</label>
            <select id="to" value={tovalue}>
              <option value="USD">United States Dollar (USD)</option>
              <option value="KWD">Kuwaiti Dinar (KWD)</option>
              <option value="BHD"> Bahraini Dinar (BHD)</option>
              <option value="JOD">Jordanian Dinar (JOD)</option>
              <option value="GIP">Gibraltar Pound (GIP)</option>
              <option value="GBP">British Pound (GBP)</option>
              <option value="KYD">Cayman Island Dollar (KYD)</option>
              <option value="CHF">Swiss Franc (CHF)</option>
              <option value="INR">India Rupee(INR)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>   
          </div>
          <div className="resutl">
            <h4>{amount} {fromvalue} is equal to {result} {tovalue}</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
