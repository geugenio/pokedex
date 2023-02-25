const pokeName = document.querySelector("#poke-name");
const pokeImage = document.querySelector("#pokemon-img");
const pokeID = document.querySelector("#poke-id");
const form = document.querySelector(".form");

const inputSearch = document.querySelector("#search");
const antBtn = document.querySelector("#antBtn");
const proxBtn = document.querySelector("#proxBtn");

const numeroStatus = document.querySelectorAll(".status-numero");
const barraStatus = document.querySelectorAll(".barra-inner");
const tipos = document.querySelector(".tipos");

const corTipos = {
    "bug": [167, 183, 35],
    "fire": [245, 125, 49],
    "electric": [249, 207, 48],
    "dragon": [112, 55, 255],
    "rock": [182, 158, 49],
    "ghost": [112, 85, 155],
    "steel": [183, 185, 208],
    "water": [100, 147, 235],
    "psychic": [251, 85, 132],
    "ice": [154, 214, 223],
    "dark": [117, 87, 76],    
    "fairy": [230, 158, 172],
    "normal": [170, 166, 12],
    "fighting": [170, 166, 12],
    "flying": [168, 145, 236],
    "poison": [164, 62, 158],
    "ground": [222, 193, 107],
    "grass": [116, 203, 72]
}
searchPokemon = 1;

const fetchPokemon = async(pokemon) =>{
    //Uma função assincrona, com o await ela espera a resposta do 
    //fetch, a resposta da API., assim ele não retorna uma promessa.
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}


const renderizaPokemon = async (pokemon) =>{
    pokeName.innerHTML = "Carregando...";
    pokeID.innerHTML = "#000";
    const data = await fetchPokemon(pokemon);

    if(data){
        pokeImage.style.display = "block"
        pokeName.innerHTML = data.name; //A chave name, do JSON.
        
        //Adiciona #0 antes do ID para o usuário, se necessário
        if (data.id < 10) {
            pokeID.innerHTML =  "#00" + data.id;
        } else if(data.id > 10 && data.id < 100) {
            pokeID.innerHTML =  "#0" + data.id;
        } else {
            pokeID.innerHTML = "#" + data.id;
        }
        //TIPOS DO POKEMON
        tipos.innerHTML = "";
        data.types.forEach((ty) => {
            let novoTipo = document.createElement("span");
            //RGB
            const r = corTipos[ty.type.name][0];
            const g = corTipos[ty.type.name][1];
            const b = corTipos[ty.type.name][2];

            novoTipo.innerHTML = ty.type.name;
            novoTipo.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            tipos.appendChild(novoTipo);
        })
        //STATUS

        data.stats.forEach((stat, index) =>{
            numeroStatus[index].innerHTML = stat.base_stat.toString().padStart(2, '0');
            barraStatus[index].style.width = `${stat.base_stat}%`
        })

        pokeImage.src = data['sprites']['other']['official-artwork']['front_default'];
        console.log(data);
        searchPokemon = data.id;
    } else{
        pokeImage.style.display = "none";
        pokeName.innerHTML = "Erro!! Não encontrado";
        pokeID.innerHTML = "404";
    }


}
renderizaPokemon(searchPokemon);

form.addEventListener("submit", (event)=>{
    event.preventDefault();

    renderizaPokemon(inputSearch.value.toLowerCase());
    inputSearch.value = "";
})

proxBtn.addEventListener("click", ()=>{
    searchPokemon +=1;
    renderizaPokemon(searchPokemon);
})
antBtn.addEventListener("click", ()=>{
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderizaPokemon(searchPokemon);
        console.log("oi");
    }
})
