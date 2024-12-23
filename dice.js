function rollDice(dice) {
    const result = Math.floor(Math.random() * dice) + 1;
    document.getElementById('resultOutput').innerText = result;
    console.log(result);
}