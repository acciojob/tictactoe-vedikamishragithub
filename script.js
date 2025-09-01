//your JS code here. If required.
document.getElementById('submit').addEventListner('click'()=>{
      const nameX = document.getElementById('player-1').value.trim();
      const nameO = document.getElementById('player-2').value.trim();
	if(!nameO || !nameX){
     alert('Please enter both name');
	 return	
	}
	      players.X = nameX;
      players.O = nameO;

      formContainer.style.display = 'none';
      gameContainer.style.display = 'block';

      startTicTacToe();
});