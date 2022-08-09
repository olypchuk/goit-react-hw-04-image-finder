import React from 'react';
import ReactDOM from 'react-dom/client';
import {App } from 'components/App';
import './index.css';
import './styles.css'

// const App = () => {
//   return <Player source="http://media.w3.org/2010/05/sintel/trailer.mp4" />;
// };
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <App className='App' />

   </React.StrictMode>
);



// const Player = ({ source }) => {
//   const playerRef = useRef();
//   const play = () => playerRef.current.play();
//   const pause = () => playerRef.current.pause();

//   return (
//     <div>
//       <video ref={playerRef} src={source}>
//         Sorry, your browser does not support embedded videos.
//       </video>
//       <div>
//         <button onClick={play}>Play</button>
//         <button onClick={pause}>Pause</button>
//       </div>
//     </div>
//   );
// };

