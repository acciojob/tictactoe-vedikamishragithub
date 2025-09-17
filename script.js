//your JS code here. If required.
document.getElementById('submit').addEventListener('click',()=>{
      const nameX = document.getElementById('player-1').value.trim();
      const nameO = document.getElementById('player-2').value.trim();
	if(!nameO || !nameX){
     alert('Please enter both name');
	 return;
	}
    

    document.getElementById("form-container").style.display="none";
	document.getElementById("game").style.display="block";
	

      startTicTacToe();
});