const games = [
    { title: 'Undertale', image: 'recurses/images/games/game1.png', category: 'Acentura', device: 'Mobile', desc: 'Undertale es un videojuego de rol en 2D de 2015 creado por el desarrollador independiente estadounidense Toby Fox. El jugador controla a un niño que ha caído al subsuelo: una gran región aislada bajo la superficie de la Tierra, separada por una barrera mágica. es un juego de plataformas roguelite rápido y de movimiento libre. Ayuda a Khyra a explorar lo desconocido y a abrirse paso entre máquinas antiguas que resguardan su pasado y, quizá, la redención de la humanidad.', redirect: 'https://www.mediafire.com/file/bj4tipvarv7snmp/UNDERTALE_ESPA%C3%91OL_chori.zip/file' },
    { title: 'Thief Simulator', image: 'recurses/images/games/game2.png', category: 'Sigilo', device: 'PC', desc: 'Thief Simulator es un videojuego de sigilo de mundo abierto desarrollado por el desarrollador polaco Noble Muffins y lanzado para Microsoft Windows el 9 de noviembre de 2018, para Nintendo Switch el 16 de mayo de 2019, para PlayStation 4 el 12 de agosto de 2020 y para Quest 2. el 8 de julio de 2022.', redirect: 'https://www.mediafire.com/file/jl1dqgsytvfpj0j/Thief_Simulator_v1.7.12_chori.zip/file' },
    { title: 'Assasins Creed Valhalla', image: 'recurses/images/games/game3.png', category: 'Accion', device: 'PC', desc:'Assassins Creed Valhalla es un videojuego de rol de acción desarrollado por Ubisoft Montreal y publicado por Ubisoft. Es el decimosegundo en importancia y el vigesimosegundo lanzado dentro de la saga de Assassin Creed, y sucesor al juego del 2018 Assassins Creed Odyssey.', redirect: 'https://www.mediafire.com/file/2hfd606hkepckzu/Assassins_Creed_Valhalla_v1.7.0_chori.zip.torrent/file' },
    { title: 'The Long Drive', image: 'recurses/images/games/game4.png', category: 'Simulacion', device: 'PC', desc: 'Es bueno crear tu auto a tu estilo y manejar y saber porque no hay humanos en la tierra porque hay ovnis en todos lados y porque hay conejos grandes y asesinos.', redirect: 'https://www.mediafire.com/file/mgp7hofm78ooaud/The.Long.Drive.v2023.05.02d.zip/file' },
    { title: 'Internet cafe simulator 2', image: 'recurses/images/games/game5.png', category: 'Simulacion', device: 'PC', desc: 'Internet Cafe Simulator 2 es un juego de simulación empresarial de cibercafés extremadamente completo y detallado.', redirect: 'https://www.mediafire.com/file/yzjp3xgxzfncaq7/Internet_Cafe_Simulator_chori.zip/file' },
    { title: 'Skibidi Toilet Game', image: 'recurses/images/games/game6.png', category: 'Accion', device: 'PC', desc:'albion online es un mmorpg no lineal en el que escribes tu propia historia sin limitarte a seguir un camino prefijado, explora un amplio mundo abierto con cinco biomas unicos, todo cuanto hagas tendra su repercusíon en el mundo, con su economia orientada al jugador de albion.', redirect: 'https://www.1001juegos.com/juego/skibidi-toilets-infection' },
    // Agrega más juegos aquí
];

let visibleGamesCount = 3;
let gamesPerPage = 3;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    const gameList = document.getElementById('game-list');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const deleteButton = document.getElementById('delete-button');
    const categorySelect = document.getElementById('category-select');
    const deviceSelect = document.getElementById('device-select');
    const loadMoreButton = document.getElementById('load-more');

    const renderGames = (gamesToRender) => {
        gameList.innerHTML = '';
        gamesToRender.forEach(game => {
            const gameItem = document.createElement('div');
            gameItem.className = 'game-item';
            gameItem.innerHTML = `
                <img src="${game.image}" alt="${game.title}">
                <div class="game-info">
                    <h3>${game.title}</h3>
                    <div class="game-meta">
                        <p>Categoría: </p>
                        <span class="category">${game.category}</span>
                        <span class="device">${game.device}</span>
                    </div>
                    <p> </p>
                    <div class="game-autor">
                        <span class="star">⭐</span>
                        <span class="autor">Huevito</span>
                    </div>
                    <button class="game-download-btn">Descargar</button>
                </div>
            `;
            
            // Añadir evento de clic al botón de Descargar
            const downloadButton = gameItem.querySelector('.game-download-btn');
            downloadButton.addEventListener('click', () => openGameModal(game));
    
            gameList.appendChild(gameItem);
        });
    };

    const filterGames = () => {
        const searchText = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;
        const selectedDevice = deviceSelect.value;

        const filteredGames = games.filter(game => {
            const matchesSearch = game.title.toLowerCase().includes(searchText);
            const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
            const matchesDevice = selectedDevice === 'all' || game.device === selectedDevice;
            return matchesSearch && matchesCategory && matchesDevice;
        });

        return filteredGames.slice(0, visibleGamesCount);
    };

    const loadMoreGames = () => {
        visibleGamesCount += 3;
        renderGames(filterGames());
    };

    searchButton.addEventListener('click', () => {
        renderGames(filterGames());
    });

    deleteButton.addEventListener('click', () => {
        searchInput.value = '';
        renderGames(filterGames());
    });

    categorySelect.addEventListener('change', () => {
        renderGames(filterGames());
    });

    deviceSelect.addEventListener('change', () => {
        renderGames(filterGames());
    });

    loadMoreButton.addEventListener('click', loadMoreGames);

    // Inicializar con los juegos iniciales
    renderGames(filterGames());
});

document.addEventListener('DOMContentLoaded', () => {
    const externalLinks = document.querySelectorAll('a.external-link');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = link.getAttribute('href');
            openExternalLink(url);
        });
    });
});

function openExternalLink(url) {
    if (navigator.userAgent.indexOf("Electron") !== -1) {
        const { shell } = require('electron');
        shell.openExternal(url);
    } else if (typeof nw !== 'undefined') {
        nw.Shell.openExternal(url);
    } else {
        window.open(url, '_blank');
    }
}



document.addEventListener('DOMContentLoaded', function() {
    const configBtn = document.getElementById('config-btn');
    
    configBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Aquí puedes abrir una ventana emergente o cambiar el tema del sitio
        // Por ejemplo, abrir una ventana emergente con JavaScript
        window.open('configuracion.html', '_blank', 'width=400,height=400');
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', openLink);
    });
});



const openGameModal = (game) => {
    const modalContent = `
        <div class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <img src="${game.image}" alt="${game.title}">
                <h2>${game.title}</h2>
                <p>
                <span class="category">${game.category}</span>
                <span class="device">${game.device}</span>
                </p>
                <p>${game.desc}</p>
                <button class="modal-download-btn">Descargar</button>
            </div>
        </div>
    `;

    // Agregar modal al body
    document.body.insertAdjacentHTML('beforeend', modalContent);

    // Obtener elementos del modal
    const modal = document.querySelector('.modal');
    const closeButton = modal.querySelector('.close');
    const downloadButton = modal.querySelector('.modal-download-btn');

    // Cerrar modal al hacer clic en la X
    closeButton.addEventListener('click', () => modal.remove());

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    });

    // Aquí puedes agregar la lógica para descargar el juego al hacer clic en el botón de Descargar
    downloadButton.addEventListener('click', () => {
        // Agregar aquí la lógica de descarga del juego
        alert(`Presiona aceptar para redireccionar.`);
        const gameLink = game.redirect;
        // Verificar si gameLink está definido y no es nulo
        if (gameLink) {
            // Cambiar la ubicación del navegador a la URL del juego
            const windowFeatures = 'width=800,height=600,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=yes';
            window.open(gameLink, '_blank', windowFeatures);
            myWindow.document.title = 'Mi Título Personalizado';
        } else {
            console.error('El juego no tiene una URL válida.');
        }
    });
};



document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    menuToggle.addEventListener('click', (event) => {
        sidebar.classList.toggle('active');
        event.stopPropagation(); // Prevenir que el evento se propague al documento
    });

    document.addEventListener('click', (event) => {
        if (!sidebar.contains(event.target) && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // Manejar clics en los enlaces del menú
    const menuLinks = sidebar.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            sidebar.classList.remove('active'); // Cierra la barra lateral al hacer clic en un enlace
        });
    });
});        



