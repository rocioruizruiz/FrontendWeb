var apidata;
var page=1;

const fetchData = (page=1) => {
    const url = "https://rickandmortyapi.com/api/character?page=" + page;
    fetch(url)
    .then(response => response.json())
    .then(data => fillData(data))

}

const fillData = (data, page=1) => {
    console.log(data);
    var html = '';
    data.results.forEach(ch => {
        html += "<div class = 'target'>";
            html += "<img class = 'char_image' src='" + ch.image + "'alt='CHAR IMAGE'/>";
            html += "<div class = 'char_desc_section'>";
                html += "<div><h2>" + ch.name + "</h2><div>";
                    if(ch.status === "Alive"){
                        html += "<div class = 'status_alive'></div>" + ch.status + " - " + ch.species + "</div>";
                    }else if(ch.status === "unknown"){
                        html += "<div class = 'status_unknown'></div>" + ch.status + " - " + ch.species + "</div>";
                    }else if(ch.status === "Dead"){
                        html += "<div class = 'status_dead'></div>" + ch.status + " - " + ch.species + "</div>";
                    }
                html += "</div>";
                html += "<div class='section'>";
                    html += "<h4>Last known Location:</h4>";
                    html += "<h3>" + ch.location.name + "</h3>";
                html += "</div>"

                html += "<div class='section'>";
                    html += "<h4>Origin:</h4>";
                    html += "<h3>" + ch.origin.name + "</h3>";
                html += "</div>"
        html += "</div></div>"
        document.getElementById("listado").innerHTML = html;
    })
}

const findNext = () => {
    page = page+1;
    fetchData(page);
}
    
const findPrev = () => {
    page = page-1;
    fetchData(page);
}
    
