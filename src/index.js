import React from 'react';
import ReactDOM from 'react-dom/client';
import {App } from 'components/App';
import './index.css';
import './styles.css'
// import data from 'components/contacts.json'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <TestSwitchBtn data={data} /> */}
    <App className='App' />

  </React.StrictMode>
);


// const prices = [1,2,3]


// const maxProfit = (p) => {

//   let n=0;
//   for (let i = 1; i < p.length; i += 1){

//     if (p[i] > p[i - 1]) {
//       n+=p[i]-p[i-1]
//     }

//   }return n 
// }  
// console.log('maxProfit', maxProfit(prices))
 
// var rotate = function(nums, k) {

// nums.unshift(...nums.splice(nums.length - k))
//   return nums 

 
// };
// console.log('rotate(prices,2)', rotate(prices, 2))
