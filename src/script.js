function getRdmNum(max) {
    return Math.floor(Math.random() * max + 1);
}


document.querySelector('.BGs').style.backgroundImage = `url(./img/${getRdmNum(8)}.jpg)`


