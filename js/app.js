const allPlayers = () => {
    const searchBox = document.getElementById('search-box');
    const searchValue = searchBox.value;
    // clear data
    searchBox.value = '';

    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
    fetch(url)
        .then(response => response.json())
        .then(data => showPlayerDetails(data.player));
}

const showPlayerDetails = (players) => {
    const parent = document.getElementById('player-container');
    for(const player of players){
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card border p-5">
            <div class="pro-pic">
                <img class="w-50" src="${player.strThumb}" alt="">
            </div>
            <h2>Name: ${player.strPlayer}</h2>
            <h5>Country: ${player.strNationality}</h5>
            <p></p>
            <div class="allbutton">
                <button class="btn btn-danger">Delete</button>
                <button onclick="details('${player.idPlayer}')" class="btn btn-success">Details</button>
            </div>
        </div>
        `;
        parent.appendChild(div);
        console.log(player)
    }
};

const details = (id) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => setDetails(data.players[0]));
};

const setDetails = (info) => {
    console.log(info.strGender)
    if(info.strGender == 'Male'){
        document.getElementById('male').style.display = 'block';
        document.getElementById('female').style.display = 'none';
    } else {
        document.getElementById('male').style.display = 'none';
        document.getElementById('female').style.display = 'block';
    }

    document.getElementById('details-container').innerHTML = `
        <div>
            <img class="w-50" src="${info.strThumb}" alt="">
            <h3>Name: ${info.strPlayer}</h3>
            <h4>country: ${info.strNationality}</h4>
            <h4>Team: ${info.strTeam2}</h4>
            <p>Description: ${info.strDescriptionEN.slice(0, 300)}</p>
        </div>
    `;
}