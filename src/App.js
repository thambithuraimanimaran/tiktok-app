
import { useState } from 'react';
import './App.css';
import Confetti from 'react-confetti';

function App() {
  const [isXturn,setIsXtrun]=useState(true)
const [board,setBoard]=useState([
  null,null,null,null,null,null,null,null,null
]);
  const winnersLogic = (board)=>{
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,4,8],
      [6,4,2],
      [0,3,6],
      [2,5,8],
      [1,4,7]
    ];
    for(let i=0;i<lines.length;i++){

   
      const [a,b,c] =lines[i];
      if(board[a] !=null && board[a]===board[b] && board[b]===board[c]){
        console.log("winner is ", board[a]);
        return board[a];
      }
    }
      return null
  
}
  const winner = winnersLogic(board);

  const handleClick = (idx)=>{
    // check box is empty or null
    if(!board[idx]){
       // copy of an array
      console.log("board:",board);
      // new array set
      const copyBoard = [...board];
      copyBoard[idx] = isXturn ? "X" : "O"
      console.log("copyarray:",copyBoard);
      // oldarray - new array
      setIsXtrun(!isXturn);
      setBoard(copyBoard);
    }
   
    
    
  }
 
  return (
    <div>
      {winner ? <Confetti/> : ""}
    <div className="App">
      {board.map((val,index)=>(
        <GameBox
        key={index}
        val ={val}
        onPlayersClick={()=>handleClick(index)}/>
      ))}
      
    </div><br/>
    <div>{winner ? <h1>winner is {winner}</h1> : ""}</div>
    <button
    onClick={()=>{setBoard([null,null,null,null,null,null,null,null,null]);
                  setIsXtrun(true);
    }}>Restart</button>
    </div>
  );
}

export default App;

function GameBox({val,onPlayersClick}){
  return(
    <div  
    style={{color: val==="X" ? "crimson" : "green"}}
    className='game-box'
    onClick={()=>onPlayersClick()}>{val}</div>
  )
}