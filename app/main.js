window.onload = () => {

    const loadData = () => {

        fetch(`https://mars-weather-rems.netlify.app/rems.json`)
            .then(res => res.json())
            .then(data => {

                // Global Vars
                let content = document.querySelector('.weather-app_content_landing-page');
                let myListContent = document.querySelector('.bottom_information_my-list');


                /** Cálculo de temperaturas medias **/
                let minTpStringGround = data.weather_report.magnitudes[0].min_gts_temp[0];
                let minTpNumGround = parseFloat(minTpStringGround);
                let maxTpStringGround = data.weather_report.magnitudes[0].max_gts_temp[0];
                let maxTpNumGround = parseFloat(maxTpStringGround);
                let averageTpGround = (minTpNumGround + maxTpNumGround) / 2;

                let minTpStringAir = data.weather_report.magnitudes[0].min_temp[0];
                let minTpNumAir = parseFloat(minTpStringAir);
                let maxTpStringAir = data.weather_report.magnitudes[0].max_temp[0];
                let maxTpNumAir = parseFloat(maxTpStringAir);
                let averageTpAir = (minTpNumAir + maxTpNumAir) / 2;


                /** Asociar un estado atmosférico a un icono **/
                let icon = ``;

                if (data.weather_report.magnitudes[0].atmo_opacity[0] == "Sunny") {
                    icon = `<span class="bi bi-sun"></span>`;
                };




                /** 
                 * 
                 * 
                 * LOCAL STORAGE 
                 * 
                 * 
                 * **/


                /** Array de temperaturas por defecto **/
                let temperaturasArray = [{
                    sol_number: 3050,
                    icon: icon,
                    sunrise: "6:37",
                    sunset: "18:45",
                    pressure: 890,
                    average_ground_tp: -43.5,
                    min_ground_tp: -90,
                    max_ground_tp: 3,
                    average_air_tp: -52.5,
                    min_air_tp: -84,
                    max_air_tp: -21,
                },
                {
                    sol_number: 3023,
                    icon: icon,
                    sunrise: "6:12",
                    sunset: "18:05",
                    pressure: 867,
                    average_ground_tp: -23.5,
                    min_ground_tp: -53,
                    max_ground_tp: 6,
                    average_air_tp: -44,
                    min_air_tp: -78,
                    max_air_tp: -10,
                }];
                  
                
                // Guardar en una variable los datos parseados del localStorage para poder trabajar con ellos a lo largo del programa
                let temperaturasLocalStorage = JSON.parse(localStorage.getItem("temperaturas"));

                // Variable donde introduciremos los datos del localStorage
                let temperaturasDOM = ``;









                // Methods


                /** 
                 * 
                 * 
                 * LOCAL STORAGE 
                 * 
                 * 
                 * **/


                /** Función que le indica visualmente al usuario si existe algo o no en el localStorage **/
                const renderTemperaturas = () => {

                    if (temperaturasLocalStorage != undefined) {

                        temperaturasLocalStorage.forEach((temperaturas) => {

                            temperaturasDOM += `
                                <div class="save_card">
                            
                                    <div class="card_information">

                                        <div class="weather_icon">
                                            ${temperaturas.icon}
                                        </div>
                                        <!-- /weather_icon -->

                                        <div class="info">
                            
                                            <div class="title">Sun number ${temperaturas.sol_number}</div>
                                            <!-- /title -->
                
                                            <div class="main_information">
                                
                                                <div class="ground">
                                                    <div class="ground_title">Ground</div>
                                                    <div class="ground_information">${temperaturas.average_ground_tp}ºC</div>
                                                </div>
                                                <!-- /ground -->
                                    
                                                <div class="air">
                                                    <div class="air_title">Air</div>
                                                    <div class="air_information">${temperaturas.average_air_tp}ºC</div>
                                                </div>
                                                <!-- /air -->

                                            </div>
                                            <!-- /main_info -->    
                                                
                                        </div>
                                        <!-- /info -->
                        
                                    </div>
                                    <!-- /card_information -->
                    
                                    <div class="trash">
                                        <span class="bi bi-trash-fill"></span>
                                    </div>
                                    <!-- /trash -->
            
                                </div>
                                <!-- /save_card --> 
                            `;
                        });

                        myListContent.innerHTML = temperaturasDOM;

                    } else {

                        // ¡¡¡CUIDAD0!!!
                        // Esto es solo una opción para poder trabajar y probar eliminando y dejando a 0 el local Storage en esta demo
                        localStorage.setItem("temperaturas", JSON.stringify(temperaturasArray));
                        temperaturasLocalStorage = JSON.parse(localStorage.getItem("temperaturas"));

                        temperaturasLocalStorage.forEach((temperaturas) => {

                            temperaturasDOM += `
                                <div class="save_card">
                            
                                    <div class="card_information">

                                        <div class="weather_icon">
                                            ${temperaturas.icon}
                                        </div>
                                        <!-- /weather_icon -->

                                        <div class="info">
                            
                                            <div class="title">Sun number ${temperaturas.sol_number}</div>
                                            <!-- /title -->
                
                                            <div class="main_information">
                                
                                                <div class="ground">
                                                    <div class="ground_title">Ground</div>
                                                    <div class="ground_information">${temperaturas.average_ground_tp}ºC</div>
                                                </div>
                                                <!-- /ground -->
                                    
                                                <div class="air">
                                                    <div class="air_title">Air</div>
                                                    <div class="air_information">${temperaturas.average_air_tp}ºC</div>
                                                </div>
                                                <!-- /air -->

                                            </div>
                                            <!-- /main_info -->    
                                                
                                        </div>
                                        <!-- /info -->
                        
                                    </div>
                                    <!-- /card_information -->
                    
                                    <div class="trash">
                                        <span class="bi bi-trash-fill"></span>
                                    </div>
                                    <!-- /trash -->
            
                                </div>
                                <!-- /save_card --> 
                            `;
                        });
                        
                        myListContent.innerHTML = temperaturasDOM;
                    };
                };
                renderTemperaturas();




















                /** 
                 * 
                 * 
                 * TODO EL PROGRAMA
                 * 
                 * 
                 * Menú parte inferior 
                 * 
                 * 
                 * **/


                /** Función que configura los eventos del menú principal situado permanentemente en la zona inferior **/
                const menuEvents = () => {

                    // Global Vars

                    let homeToggle = document.querySelector('.home');
                    let homeText = document.querySelector('.home_text');
                    let homeOpen = true;

                    let listToggle = document.querySelector('.list');
                    let listText = document.querySelector('.list_text');
                    let listOpen = false;



                    let landingPage = document.querySelector('.weather-app_content_landing-page');
                    let myMeasuringList = document.querySelector('.weather-app_content_my-list');





                    // Methods

                    /** HOME **/
                    const openHome = () => {
                        homeToggle.classList.add('active');
                        homeText.classList.add('active');
                        homeOpen = true;
                    };

                    const closeHome = () => {
                        homeToggle.classList.remove('active');
                        homeText.classList.remove('active');
                        homeOpen = false;
                    };


                    /** LIST **/
                    const openList = () => {
                        listToggle.classList.add('active');
                        listText.classList.add('active');
                        listOpen = true;
                    };

                    const closeList = () => {
                        listToggle.classList.remove('active');
                        listText.classList.remove('active');
                        listOpen = false;
                    };








                    /** MY MEASURING LIST **/
                    const openMyMeasuringList = () => {
                        landingPage.classList.add('unactive');
                        myMeasuringList.classList.add('active');
                    };

                    const closeMyMeasuringList = () => {
                        landingPage.classList.remove('unactive');
                        myMeasuringList.classList.remove('active');
                    };




                    // Events
                    homeToggle.addEventListener('click', () => {
                        if (homeOpen == true) {
                            closeHome();
                        } else {
                            openHome();
                            closeList();
                            closeMyMeasuringList();
                        }
                    });

                    listToggle.addEventListener('click', () => {
                        if (listOpen == true) {
                            closeList();
                            closeMyMeasuringList();
                        } else {
                            openList();
                            openMyMeasuringList();
                            closeHome();

                            // Pintar los objetos del array mi lista de temperaturas
                            deleteMyListItem(data);
                        };
                    });
                };
                menuEvents();




















                /** 
                 * 
                 * 
                 * LANDING PAGE 
                 * 
                 * 
                 * Render
                 * 
                 * 
                 * **/


                /** Función pintar datos de la landing page **/
                const renderData = (data) => {

                    content.innerHTML += `
                    <div class="top_information">
        
                        <div class="presentation_info">
                            <div class="title">Sun number ${data.weather_report.sol} at Mars</div>

                            <div class="back_home">
                                <span class="bi bi-arrow-left"></span>
                                <span class="go_back_text">Go back</span>
                            </div>
        
                            <div class="icons">
        
                                <div class="info">
                                    <span class="bi bi-info-circle active"></span>
                                    <span class="bi bi-info-circle-fill"></span>
                                </div>
                                <!-- /info -->
        
                                <div class="share">
                                    <span class="bi bi-share active"></span>
                                    <span class="bi bi-share-fill"></span>
                                </div>
                                <!-- /share -->
        
                                <div class="save">
                                    <span class="bi bi-plus-circle active"></span>
                                    <span class="bi bi-plus-circle-fill"></span>
                                </div>
                                <!-- /save -->
        
                            </div>
        
                        </div>
                        <!-- /presentation_info -->
        
                        <div class="weather_icon">
                        ${icon}
                        </div>
                        <!-- /weather icon -->
        
                    </div>
                    <!-- /top_information -->
        
        
        
        
                    <div class="bottom_information">
        
                        <div class="extra_info">
        
                            <div class="sunrise">
                                <span class="bi bi-sunrise-fill"></span>
                                <span class="sunrise_title">Sunrise</span>
                                <div class="sunrise_info">${data.weather_report.magnitudes[0].sunrise[0]} am</div>
                            </div>
                            <!-- /sunrise -->
        
                            <div class="sunset">
                                <span class="bi bi-sunset-fill"></span>
                                <span class="sunset_title">Sunset</span>
                                <div class="sunset_info">${data.weather_report.magnitudes[0].sunset[0]} pm</div>
                            </div>
                            <!-- /sunset -->
        
                            <div class="pressure">
                                <span class="bi bi-speedometer"></span>
                                <span class="pressure_title">Pressure</span>
                                <div class="pressure_info">${data.weather_report.magnitudes[0].pressure[0]} Pa</div>
                            </div>
                            <!-- /pressure -->
        
                        </div>
                        <!-- /extra_info -->
        
        
        
        
                        <div class="main_info">
        
                            <div class="ground">
        
                                <div class="main_ground_temperature_information">
                                    <div class="title">Ground temperature</div>
                                    <div class="ground_temperature">${averageTpGround}ºC</div>
                                </div>
                                <!-- /main_ground_temperature_information -->
        
                                <div class="extra_ground_temperature_information">
        
                                    <div class="lower">
                                        <div class="title_lower_temperature">Lower <span>&nbsptemperature</span></div>
                                        <div class="lower_ground_temperature">${data.weather_report.magnitudes[0].min_gts_temp[0]}ºC</div>
                                    </div>
                                    <!-- /lower -->
        
                                    <div class="higher">
                                        <div class="title_higher_temperature">Higher <span>&nbsptemperature</span></div>
                                        <div class="higher_ground_temperature">${data.weather_report.magnitudes[0].max_gts_temp[0]}ºC</div>
                                    </div>
                                    <!-- /higher -->
        
                                </div>
                                <!-- /extra_ground_temperature_informacion -->
        
                            </div>
                            <!-- /ground -->
        
                            <div class="air">
        
                                <div class="main_air_temperature_information">
                                    <div class="title">Air temperature</div>
                                    <div class="air_temperature">${averageTpAir}ºC</div>
                                </div>
                                <!-- /main_air_temperature_information -->
        
                                <div class="extra_air_temperature_information">
        
                                    <div class="lower">
                                        <div class="title_lower_temperature">Lower <span>&nbsptemperature</span></div>
                                        <div class="lower_air_temperature">${data.weather_report.magnitudes[0].min_temp[0]}ºC</div>
                                    </div>
                                    <!-- /lower -->
        
                                    <div class="higher">
                                        <div class="title_higher_temperature">Higher <span>&nbsptemperature</span></div>
                                        <div class="higher_air_temperature">${data.weather_report.magnitudes[0].max_temp[0]}ºC</div>
                                    </div>
                                    <!-- /higher -->
        
                                </div>
                                <!-- /extra_air_temperature_informacion -->
        
                            </div>
                            <!-- /air -->
        
                        </div>
                        <!-- /main_info -->
        
                    </div>
                    <!-- /bottom_information -->
                    `;
                };
                renderData(data);










                /** 
                 * 
                 * 
                 * LANDING PAGE 
                 * 
                 * 
                 * Eventos de las acciones de la parte superior derecha
                 * 
                 * 
                 * **/


                /** Función que configura y acciona los eventos de los iconos de la parte superior derecho de la landing page **/
                const topInfoEvents = (data) => {

                    // Global Vars
                    let infoToggle = document.querySelector('.bi-info-circle');
                    let infoToggleActive = document.querySelector('.bi-info-circle-fill');

                    let shareToggle = document.querySelector('.bi-share');
                    let shareToggleActive = document.querySelector('.bi-share-fill');

                    let saveToggle = document.querySelector('.bi-plus-circle');
                    let saveToggleActive = document.querySelector('.bi-plus-circle-fill');



                    let weatherIcon = document.querySelector('.weather_icon');
                    let bottomInformation = document.querySelector('.bottom_information');
                    let presentationInfoTitle = document.querySelector('.presentation_info .title');
                    let goBack = document.querySelector('.back_home');

                    let shareSumbenu = document.querySelector('.share_submenu');
                    let infoSubmenu = document.querySelector('.information_submenu');




                    let menuBg = document.querySelector('.menu_bg');



                    // Methods
                    // Funciones para agregar o eliminar clases de css que ayudan a visualizar los estados de los iconos

                    /** INFO **/
                    const openInfo = () => {
                        infoToggle.classList.remove('active');
                        infoToggleActive.classList.add('active');

                        menuBg.classList.add('submenus_active');
                    };

                    const closeInfo = () => {
                        infoToggleActive.classList.remove('active');
                        infoToggle.classList.add('active');

                        menuBg.classList.remove('submenus_active');
                    };


                    /** SHARE **/
                    const openShare = () => {
                        shareToggle.classList.remove('active');
                        shareToggleActive.classList.add('active');

                        menuBg.classList.add('submenus_active');
                    };

                    const closeShare = () => {
                        shareToggleActive.classList.remove('active');
                        shareToggle.classList.add('active');

                        menuBg.classList.remove('submenus_active');
                    };


                    /** SAVE **/
                    const openSave = () => {
                        saveToggle.classList.remove('active');
                        saveToggleActive.classList.add('active');
                    };

                    const closeSave = () => {
                        saveToggleActive.classList.remove('active');
                        saveToggle.classList.add('active');
                    };




                    /** SHARE SUBMENU **/
                    const openShareSubmenu = () => {
                        weatherIcon.classList.add('unactive');
                        bottomInformation.classList.add('unactive');
                        presentationInfoTitle.classList.add('unactive');
                        goBack.classList.add('active');
                        shareSumbenu.classList.add('active');
                        renderShareData(data);
                    };

                    const closeShareSubmenu = () => {
                        weatherIcon.classList.remove('unactive');
                        bottomInformation.classList.remove('unactive');
                        presentationInfoTitle.classList.remove('unactive');
                        goBack.classList.remove('active');
                        shareSumbenu.classList.remove('active');
                    };


                    /** INFORMATION SUBMENU **/
                    const openInformationSubmenu = () => {
                        weatherIcon.classList.add('unactive');
                        bottomInformation.classList.add('unactive');
                        presentationInfoTitle.classList.add('unactive');
                        goBack.classList.add('active');
                        infoSubmenu.classList.add('active');
                        renderInfoData(data);
                    };

                    const closeInformationSubmenu = () => {
                        weatherIcon.classList.remove('unactive');
                        bottomInformation.classList.remove('unactive');
                        presentationInfoTitle.classList.remove('unactive');
                        goBack.classList.remove('active');
                        infoSubmenu.classList.remove('active');
                    };




                    // Events
                    // Eventos para que al hacer CLICK se llamen las funciones anteriormente declaradas para añadir o eliminar las clases css

                    /** INFO **/
                    infoToggle.addEventListener('click', () => {
                        closeShare();
                        closeShareSubmenu();
                        openInfo();
                        openInformationSubmenu();
                    });

                    infoToggleActive.addEventListener('click', () => {
                        closeInfo();
                        closeInformationSubmenu();
                    });


                    /** SHARE **/
                    shareToggle.addEventListener('click', () => {
                        closeInfo();
                        closeInformationSubmenu();
                        openShare();
                        openShareSubmenu();
                    });

                    shareToggleActive.addEventListener('click', () => {
                        closeShare();
                        closeShareSubmenu();
                    });


                    /** SAVE **/
                    saveToggle.addEventListener('click', () => {
                        openSave();
                        closeInfo();
                        closeShare();
                        closeShareSubmenu();
                        closeInformationSubmenu();


                        // Guardar los valores de la API que están pintados en la landing page...
                        let temperaturaAPI = {
                            sol_number: data.weather_report.sol,
                            icon: icon,
                            sunrise: data.weather_report.magnitudes[0].sunrise[0],
                            sunset: data.weather_report.magnitudes[0].sunset[0],
                            pressure: data.weather_report.magnitudes[0].pressure[0],
                            average_ground_tp: averageTpGround,
                            min_ground_tp: data.weather_report.magnitudes[0].min_gts_temp[0],
                            max_ground_tp: data.weather_report.magnitudes[0].max_gts_temp[0],
                            average_air_tp: averageTpAir,
                            min_air_tp: data.weather_report.magnitudes[0].min_temp[0],
                            max_air_tp: data.weather_report.magnitudes[0].max_temp[0],
                        };

                        // ... hacer un push en el localStorage parseado...
                        temperaturasLocalStorage.push(temperaturaAPI);

                        // ...vaciar antes de pintar y...
                        temperaturasDOM = ``;

                        // ...pintar
                        temperaturasLocalStorage.forEach((temperaturas) => {

                            temperaturasDOM += `
                                <div class="save_card">
                                
                                    <div class="card_information">

                                        <div class="weather_icon">
                                            ${temperaturas.icon}
                                        </div>
                                        <!-- /weather_icon -->

                                        <div class="info">
                            
                                            <div class="title">Sun number ${temperaturas.sol_number}</div>
                                            <!-- /title -->
                
                                            <div class="main_information">
                                
                                                <div class="ground">
                                                    <div class="ground_title">Ground</div>
                                                    <div class="ground_information">${temperaturas.average_ground_tp}ºC</div>
                                                </div>
                                                <!-- /ground -->
                                    
                                                <div class="air">
                                                    <div class="air_title">Air</div>
                                                    <div class="air_information">${temperaturas.average_air_tp}ºC</div>
                                                </div>
                                                <!-- /air -->

                                            </div>
                                            <!-- /main_info -->    
                                                
                                        </div>
                                        <!-- /info -->
                        
                                    </div>
                                    <!-- /card_information -->
                    
                                    <div class="trash">
                                        <span class="bi bi-trash-fill"></span>
                                    </div>
                                    <!-- /trash -->
        
                                </div>
                                <!-- /save_card --> 
                            `;
                        });
    
                        myListContent.innerHTML = temperaturasDOM;

                        localStorage.setItem("temperaturas", JSON.stringify(temperaturasLocalStorage));
                        temperaturasLocalStorage = JSON.parse(localStorage.getItem("temperaturas"));
                    });

                    saveToggleActive.addEventListener('click', () => {
                        closeSave();
                    });


                    /** GO BACK HOME **/
                    goBack.addEventListener('click', () => {
                        closeInfo();
                        closeInformationSubmenu();
                        closeShare();
                        closeShareSubmenu();
                    });
                };
                topInfoEvents(data);










                /** 
                 * 
                 * 
                 * LANDING PAGE
                 * 
                 * 
                 * Render share 
                 * 
                 * 
                 * **/


                /** Función que renderiza los datos de la pestaña de compartir activada en el menú superior derecho de la landing page **/
                const renderShareData = (data) => {

                    // Global Vars
                    let shareSubmenu = document.querySelector('.share_submenu');




                    // Vaciar antes de pintar
                    shareSubmenu.innerHTML = "";

                    // Pintar
                    shareSubmenu.innerHTML += `
                        <div class="share_content">
            
                            <div class="title">Sun number ${data.weather_report.sol} at Mars</div>
                            <!-- /title -->
            
                            <div class="icon">
                                ${icon}
                            </div>
                            <!-- /icon -->
            
                            <div class="info">
            
                                <div class="ground_temperature">
                                    <div class="ground_title">Ground</div>
                                    <div class="ground_info">${averageTpGround}ºC</div>
                                </div>
            
                                <div class="air_temperature">
                                    <div class="air_title">Air</div>
                                    <div class="air_info">${averageTpAir}ºC</div>
                                </div>
            
                            </div>
                            <!-- /info -->
            
                        </div>
                        <!-- /share_content -->
            
                        <div class="rrss">

                            <div class="rrss_title">Share with</div>
            
                            <div class="whatsapp">
                                <span class="bi bi-whatsapp"></span>
                                <div class="whatsapp_text">Whatsapp</div>
                            </div>
            
                            <div class="instagram">
                                <span class="bi bi-instagram"></span>
                                <div class="instagram_text">Instagram</div>
                            </div>
            
                            <div class="facebook">
                                <span class="bi bi-facebook"></span>
                                <div class="facebook_text">Facebook</div>
                            </div>
            
                            <div class="twitter">
                                <span class="bi bi-twitter"></span>
                                <div class="twitter_text">Twitter</div>
                            </div>

                            <div class="google">
                                <span class="bi bi-google"></span>
                                <div class="google_text">Google +</div>
                            </div>
            
                            <div class="sms">
                                <span class="bi bi-chat-left-text"></span>
                                <div class="sms_text">SMS</div>
                            </div>
            
                        </div>
                        <!-- /rrss -->
                    `;
                };










                /** 
                 * 
                 * 
                 * LANDING PAGE
                 * 
                 * 
                 * Render info 
                 * 
                 * 
                 * **/


                const renderInfoData = (data) => {

                    // Global Vars
                    let infoSubmenu = document.querySelector('.information_submenu');




                    // Vaciar antes de pintar
                    infoSubmenu.innerHTML = "";

                    // Pintar
                    infoSubmenu.innerHTML = `
                    <div class="information_content">

                        <div class="information">

                            <div class="sun info">
                                <div class="title">Sun information</div>
                                <div class="information">${data.weather_report.sol_desc[0].en[0]}</div>
                                <div class="information">${data.weather_report.terrestrial_date_desc[0].en[0]}</div>
                                <div class="information">${data.weather_report.magnitudes[0].season_desc[0].en[0]}</div>
                            </div>
                            <!-- /sun_info -->

                            <div class="pressure info">
                                <div class="title">Pressure information</div>
                                <div class="information">${data.weather_report.magnitudes[0].pressure_desc[0].en[0]}</div>
                            </div>
                            <!-- /pressure_info -->

                            <div class="tp info">
                                <div class="title">Temperature information</div>
                                <div class="information">${data.weather_report.magnitudes[0].temp_desc[0].en[0]}</div>
                                <div class="information">${data.weather_report.magnitudes[0].gts_temp_desc[0].en[0]}</div>
                                <div class="information">${data.weather_report.magnitudes[0].atmo_opacity_des[0].en[0]}</div>
                                <div class="information">${data.weather_report.magnitudes[0].ls_desc[0].en[0]}</div>
                            </div>
                            <!-- /tp_info -->

                        </div>
                        <!-- /information -->
                    
                    </div>
                    <!-- /information_content -->
                    `;
                };










                









                /** 
                 * 
                 * 
                 * MI LISTA DE TEMPERATURAS
                 * 
                 * 
                 * Borrado de datos 
                 * 
                 * 
                 * **/


                /** Función que elimina los elementos de mi lista de temperaturas **/
                const deleteMyListItem = (data) => {

                    // Global Vars
                    let myListItemsDOM = document.querySelectorAll('.save_card');

                    let deleteAllToggle = document.querySelector('.top_information_my-list button');

                    let popup = document.querySelector('.popup');
                    let cancel = document.querySelector('.cancel');
                    let borrar = document.querySelector('.delete');




                    // Events


                    // Recorro el objeto de temperaturas guardadas
                    myListItemsDOM.forEach((card, i) => {

                        // Global Vars
                        let trashToggle = card.querySelector('.bi-trash-fill');
                        temperaturasLocalStorage = JSON.parse(localStorage.getItem("temperaturas"));

                        // Si presiono en el icono de la papelera...
                        trashToggle.addEventListener('click', () => {

                            let currentCard = temperaturasLocalStorage[i];
                            let num = temperaturasLocalStorage.indexOf(currentCard);
                            
                            console.log(num);

                            // ...activo y abro el popup...
                            popup.classList.add('active');
                            
                            // ...y si luego selecciono el botón de borrar...
                            borrar.addEventListener('click', () => {
                                    
                                // Eliminar 1 elemento
                                temperaturasLocalStorage.splice(num, 1);

                                localStorage.setItem("temperaturas", JSON.stringify(temperaturasLocalStorage));
                                temperaturasLocalStorage = JSON.parse(localStorage.getItem("temperaturas"));
                                // localStorage.removeItem(currentCard);
                                location.reload();
                            });
                        });
                    });


                    // Si se presiona el botón de NO en el popup, desactivarlo y cerrarlo
                    cancel.addEventListener('click', () => {
                        
                        popup.classList.remove('active');
                    });

                 
                    deleteAllToggle.addEventListener('click', () => {

                        // Activar y abrir el popup
                        popup.classList.add('active');

                        // Si se pulsa el botón de YES...
                        borrar.addEventListener('click', () => {

                            localStorage.clear();
                            location.reload();

                        });
                    });
                };
                deleteMyListItem(data);










                /** 
                 * 
                 * 
                 * MI LISTA DE TEMPERATURAS
                 * 
                 * 
                 * Vista individual de temperatura guardada 
                 * 
                 * 
                 * **/

                const singleTemperature = () => {

                    // Global Vars
                    let singleTp = document.querySelector('.single_tp');
                    let temperatureCard = document.querySelectorAll('.card_information');

                    let myMeasuringList = document.querySelector('.weather-app_content_my-list');

                    temperaturasLocalStorage = JSON.parse(localStorage.getItem("temperaturas"));                    




                    // Methods

                    const renderSingle = () => {

                        myMeasuringList.classList.remove('active');
                        singleTp.classList.add('active');
                    };


                    const closeSingle = () => {

                        myMeasuringList.classList.add('active');
                        singleTp.classList.remove('active');
                    };




                    temperatureCard.forEach((card, i) => {
                        
                        card.addEventListener('click', () => {

                            renderSingle();
                            
                            let currentCard = i;
                            console.log(currentCard);
                            let num = temperaturasLocalStorage[currentCard];
                            console.log(num);


                            // Vaciar antes de pintar
                            singleTp.innerHTML = ``;

                            // Pintar
                            singleTp.innerHTML += `
                                <div class="single_top_information">
                    
                                    <div class="presentation_info">

                                        <div class="back_list">
                                            <span class="bi bi-arrow-left"></span>
                                            <span class="go_back_text">Go back to list</span>
                                        </div>

                                        <div class="title">Sun number ${num.sol_number} at Mars</div>

                                    </div>
                                    <!-- /presentation_info -->
                        
                                    <div class="weather_icon">
                                    ${num.icon}
                                    </div>
                                    <!-- /weather icon -->
                    
                                </div>
                                <!-- /single_top_information -->
                    
                    
                    
                    
                                <div class="single_bottom_information">
                        
                                    <div class="extra_info">
                        
                                        <div class="sunrise">
                                            <span class="bi bi-sunrise-fill"></span>
                                            <span class="sunrise_title">Sunrise</span>
                                            <div class="sunrise_info">${num.sunrise} am</div>
                                        </div>
                                        <!-- /sunrise -->
                        
                                        <div class="sunset">
                                            <span class="bi bi-sunset-fill"></span>
                                            <span class="sunset_title">Sunset</span>
                                            <div class="sunset_info">${num.sunset} pm</div>
                                        </div>
                                        <!-- /sunset -->
                        
                                        <div class="pressure">
                                            <span class="bi bi-speedometer"></span>
                                            <span class="pressure_title">Pressure</span>
                                            <div class="pressure_info">${num.pressure} Pa</div>
                                        </div>
                                        <!-- /pressure -->
                        
                                    </div>
                                    <!-- /extra_info -->
                        
                        
                        
                        
                                    <div class="main_info">
                        
                                        <div class="ground">
                        
                                            <div class="main_ground_temperature_information">
                                                <div class="title">Ground temperature</div>
                                                <div class="ground_temperature">${num.average_ground_tp}ºC</div>
                                            </div>
                                            <!-- /main_ground_temperature_information -->
                        
                                            <div class="extra_ground_temperature_information">
                        
                                                <div class="lower">
                                                    <div class="title_lower_temperature">Lower <span>&nbsptemperature</span></div>
                                                    <div class="lower_ground_temperature">${num.min_ground_tp}ºC</div>
                                                </div>
                                                <!-- /lower -->
                        
                                                <div class="higher">
                                                    <div class="title_higher_temperature">Higher <span>&nbsptemperature</span></div>
                                                    <div class="higher_ground_temperature">${num.max_ground_tp}ºC</div>
                                                </div>
                                                <!-- /higher -->
                        
                                            </div>
                                            <!-- /extra_ground_temperature_informacion -->
                        
                                        </div>
                                        <!-- /ground -->
                        
                                        <div class="air">
                        
                                            <div class="main_air_temperature_information">
                                                <div class="title">Air temperature</div>
                                                <div class="air_temperature">${num.average_air_tp}ºC</div>
                                            </div>
                                            <!-- /main_air_temperature_information -->
                        
                                            <div class="extra_air_temperature_information">
                        
                                                <div class="lower">
                                                    <div class="title_lower_temperature">Lower <span>&nbsptemperature</span></div>
                                                    <div class="lower_air_temperature">${num.min_air_tp}ºC</div>
                                                </div>
                                                <!-- /lower -->
                        
                                                <div class="higher">
                                                    <div class="title_higher_temperature">Higher <span>&nbsptemperature</span></div>
                                                    <div class="higher_air_temperature">${num.max_air_tp}ºC</div>
                                                </div>
                                                <!-- /higher -->
                        
                                            </div>
                                            <!-- /extra_air_temperature_informacion -->
                        
                                        </div>
                                        <!-- /air -->
                        
                                    </div>
                                    <!-- /main_info -->
                        
                                </div>
                                <!-- /single_bottom_information -->
                            `;




                            let back = document.querySelector('.back_list');

                            back.addEventListener('click', () => {
                                console.log("hola")
                                closeSingle();
                            });
                        });
                    });
                };
                singleTemperature();
            });
    };
    loadData();
};