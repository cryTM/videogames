function GetPlayers() {
  var myInit = {
    method: 'GET',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    cache: 'default'
  };

  var myRequest = new Request('http://localhost:3000/scores', myInit);

  fetch('http://localhost:3000/scores')
    .then(response => {
      return response.json();
    })
    .then(data => {
      var sortedData = SortPoints(data);
      WriteHtml(sortedData);
    })
}

function SortPoints(data){
  var i;
  var j;
  for (i = 0; i < data.length; i++) {
       for(j = 0 ; j < data.length - i-1; j++){
       if (data[j].score < data[j + 1].score) {
        var temp = data[j];
        data[j] = data[j+1];
        data[j + 1] = temp;
      }
    }
  }

  return data;
}

function WriteHtml(data) {
  var t = document.getElementById("tetris");
  var p = document.getElementById("pong");
  var s = document.getElementById("snake");

  for (var i = 0; i < data.length; i++) {
    if(data[i].game === "pong")
    {
      p.innerHTML += '<tr>' + '<td>' + data[i].name + '<td>' + data[i].score + '</tr>';
    }
    else if(data[i].game === "tetris")
    {
      t.innerHTML += '<tr>' + '<td>' + data[i].name + '<td>' + data[i].score + '</tr>';
    }
    else if(data[i].game === "snake")
    {
      s.innerHTML += '<tr>' + '<td>' + data[i].name + '<td>' + data[i].score + '</tr>';
    }    
  }
}