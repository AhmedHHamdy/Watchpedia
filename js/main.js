// TV Shows


window.addEventListener('beforeunload', function() {
    localStorage.clear();
});


const searchInput = document.querySelector('input');
searchInput.value = ''



if (localStorage.getItem('PopularShowsData') == null) {

    console.log('new')
    fetch('https://imdb-api.com/en/API/MostPopularTVs/k_n10wj02z')
    .then(res => res.json())
    .then(data => {
        let dataMostPopularShows = data.items;
        localStorage.setItem('PopularShowsData', JSON.stringify(dataMostPopularShows));
        getMostPopularShowsData(dataMostPopularShows)
        addContent(dataMostPopularShows)
        const sections = document.querySelectorAll('.showSection');
        sections.forEach((section, i) => {
            section.style.backgroundImage = `url('${(dataMostPopularShows[i].image).slice(0, dataMostPopularShows[i].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'}')`;
            // console.log((dataMostPopularShows[i].image).slice(0, dataMostPopularShows[i].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_')
            const mainElement = document.querySelector('main');
            const h1Element = mainElement.querySelector('h1');
            const spanDateElement = mainElement.querySelector('.date');
            const spanCrewElement = mainElement.querySelector('.crew');
            const spanIMDBRatingElement = mainElement.querySelector('.iMDBRating');
            const plotParagraphs = mainElement.querySelector('.plot')
            mainElement.style.backgroundImage = `url('${(dataMostPopularShows[i].image).slice(0, dataMostPopularShows[i].image.indexOf("_"))+'_V1_Ratio0.6762_AL_'}')`;
            h1Element.innerText = dataMostPopularShows[i].title;
            spanDateElement.innerText = dataMostPopularShows[i].year;
            spanCrewElement.innerText = dataMostPopularShows[i].crew;
            plotParagraphs.innerText = ''
            spanIMDBRatingElement.innerHTML = dataMostPopularShows[i].imDbRating;

        });
            
        let onlyFirst10Titles = dataMostPopularShows.slice(0, 10)
        // test paragraphs
        let dataTvShows = onlyFirst10Titles
        // console.log(data)
        let arrTitles = dataTvShows.map((e, i) => e.title)
        console.log(arrTitles)
        // let arr = [] test
        let arr = {}
        let arrParagraphs = {}
        
        // Array APIs

        function getRandomApi() {
            let arrAPI = ['jJKGTfPoPEve4iYV47Al4eVG6JY8woIlbE8xrdFq', 'I5TZVx3f1xQ9HTXS11iPryT0ZGkQ0MU7rWVXSj0d', 'x0zX7Q6mbWxF83WfLmRRLNHlY58dBJu4YDJ75oBk', '4g9HmHVjbY3ZMEoMX7ZJu6vxu9cp9A349XodnWKo', 'xv7z2c92jBFPwgkKKScZvU11JqGtbBLDXpJypdBQ', 'SdtFFwtkoVwQEmcRa9AkIqpnSixV9qJ01HMRD8Ow']
            let randomChance = Math.floor(Math.random() * arrAPI.length)
            return arrAPI[randomChance]
        }

        let promises = []
        arrTitles.forEach((e, i) => {
          promises.push(
            fetch(`https://api.watchmode.com/v1/search/?apiKey=${getRandomApi()}&search_field=name&search_value=${arrTitles[i]}`)
              .then(res => res.json())
              .then(data => {
                console.log(data)
                console.log(data.title_results)
                arr[data.title_results[0]['name']] = (data.title_results[0].id)
                console.log(arr)
              })
              .catch(err => {
                console.log(`error ${err}`)
              })
          )
        })
    
        Promise.all(promises)
          .then(() => {
    
            // if (arr.length < 6) {
            //     arr['BEEF'] = 3183276
            // }
    
            console.log(arr)
    
            // console.log(arrTitles)
    
            let arrTitlesShow = JSON.parse(localStorage.getItem('PopularShowsData'))
            let arrTitles = arrTitlesShow.map((e, i) => e.title).slice(0, 10)
    
            let sortedObj = {};
            let sortIds = []
            if (arrTitles[arrTitles.indexOf('Beef')] == 'Beef') {
                arrTitles[arrTitles.indexOf('Beef')] = 'BEEF'; 
            }
    
    
            arrTitles.forEach((key) => {
            if (arr.hasOwnProperty(key)) {
                sortedObj[key] = arr[key];
                sortIds.push(sortedObj[key])
            } else {
                sortedObj[key] = 3183276
                sortIds.push(sortedObj[key])
            }
            });
    
            console.log(sortedObj);
            console.log(sortIds)
    

            // Array APIs

            function getRandomApi() {
                let arrAPI = ['jJKGTfPoPEve4iYV47Al4eVG6JY8woIlbE8xrdFq', 'I5TZVx3f1xQ9HTXS11iPryT0ZGkQ0MU7rWVXSj0d', 'x0zX7Q6mbWxF83WfLmRRLNHlY58dBJu4YDJ75oBk', '4g9HmHVjbY3ZMEoMX7ZJu6vxu9cp9A349XodnWKo', 'xv7z2c92jBFPwgkKKScZvU11JqGtbBLDXpJypdBQ', 'SdtFFwtkoVwQEmcRa9AkIqpnSixV9qJ01HMRD8Ow']
                let randomChance = Math.floor(Math.random() * arrAPI.length)
                return arrAPI[randomChance]
            }
    
            let promises2 = sortIds.map((e, i) => {
              return fetch(`https://api.watchmode.com/v1/title/${e}/details/?apiKey=${getRandomApi()}&append_to_response=sources`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    console.log(data.plot_overview)
                    arrParagraphs[data['title']] = (data.plot_overview)
                })
                .catch(err => {
                  console.log(`error ${err}`)
                })
            })
            
            return Promise.all(promises2)
          })
          .then(() => {
            console.log(arrParagraphs)
            // Do something with arrParagraphs here
    
            let sortedObjPara = {};
            let sortedPara = []
    
            if (arrTitles[arrTitles.indexOf('Beef')] === 'Beef') {
                arrTitles[arrTitles.indexOf('Beef')] = 'BEEF'; 
            }
    
    
            arrTitles.forEach((key) => {
            if (arrParagraphs.hasOwnProperty(key)) {
                sortedObjPara[key] = arrParagraphs[key];
                sortedPara.push(sortedObjPara[key]);
            } else {
                sortedObjPara[key] = 'A road rage incident between two strangers — a failing contractor and an unfulfilled entrepreneur — sparks a feud that brings out their darkest impulses.'
                sortedPara.push(sortedObjPara[key])
            }
            });
    
            console.log(sortedObjPara);
            console.log('please work');
    
            
            console.log(sortedPara);
    
            localStorage.setItem('arrParagraphsIntervalMain', JSON.stringify(sortedPara))

            // please 

            let paraPopularTvShow = JSON.parse(localStorage.getItem('arrParagraphsIntervalMain'))
            console.log(paraPopularTvShow)
                // 
                    let i = 0;
    
            setInterval(() => {
                const mainElement = document.querySelector('main');
                const h1Element = mainElement.querySelector('h1');
                const spanDateElement = mainElement.querySelector('.date');
                const spanCrewElement = mainElement.querySelector('.crew');
                const spanIMDBRatingElement = mainElement.querySelector('.iMDBRating');
                const plotParagraphs = mainElement.querySelector('.plot')
        
                console.log(onlyFirst10Titles)
                // Update background image
                mainElement.style.backgroundImage = `url('${(onlyFirst10Titles[i].image).slice(0, onlyFirst10Titles[i].image.indexOf("_"))+'_V1_Ratio0.6762_AL_'}')`;
                // move it back
                h1Element.innerText = onlyFirst10Titles[i].title;
                spanDateElement.innerText = onlyFirst10Titles[i].year;
                spanCrewElement.innerText = onlyFirst10Titles[i].crew;
                plotParagraphs.innerText = paraPopularTvShow[i]
                spanIMDBRatingElement.innerHTML = onlyFirst10Titles[i].imDbRating + '/ 10 ' + ' <i class="fa-solid fa-star"></i>';
        
                // Update h1 text
                spanCrewElement.style.opacity = 0
                spanIMDBRatingElement.style.opacity = 0
                spanDateElement.style.opacity = 0
                plotParagraphs.style.opacity = 0
                h1Element.style.opacity = 0;
                setTimeout(() => {
                    spanCrewElement.style.opacity = 1
                    spanIMDBRatingElement.style.opacity = 1
                    h1Element.style.opacity = 1;
                    plotParagraphs.style.opacity = 1
                    spanDateElement.style.opacity = 1
                }, 500);
        
                // Update index
                i++;
                if (i >= onlyFirst10Titles.length) {
                    i = 0;
                }
            }, 5000);
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
    });
    



    const storedData1 = localStorage.getItem('PopularShowsData');
    const dataMostPopularShows1 = JSON.parse(storedData1);



    getMostPopularShowsData(dataMostPopularShows1)
    function getMostPopularShowsData(data) {
        // console.log(data.item)
        let sections = document.querySelectorAll(`.showSection`)
        sections = Array.from(sections)

        sections.forEach((section, i) => {
        section.addEventListener('mouseover', showInfo)
        section.addEventListener('mouseout', hideInfo)
        let backgroundImagePic = 0


            function showInfo(e) {
                // Get the section that was hovered over
                const section = e.target.closest('.showSection');
                
                // If the section exists and has a style property, set its background color
                if (section && section.style) {
                    backgroundImagePic = section.style.backgroundImage
                    section.querySelector('h3').classList.remove('hidden')
                    section.querySelector('p').classList.remove('hidden')
                    section.querySelector('button').classList.remove('hidden')
                    section.style.backgroundImage = 'none';
                    section.style.backgroundColor = '#1A1918';
            
                }
                
            }

            function hideInfo(e) {
                // console.log(e)
                const section = e.target.closest('.showSection');
                if (section && section.style) {

                    section.style.backgroundImage = `url('${(data[i].image).slice(0, data[i].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'}')`;
                    section.style.transition = 'background-image 0.5s ease-in-out';
                    section.querySelector('h3').classList.add('hidden')
                    section.querySelector('p').classList.add('hidden')
                    section.querySelector('button').classList.add('hidden')
                    section.style.backgroundColor = `black`;

                }
            }
        })
    } 
    
} 
else {
    


    const storedData = localStorage.getItem('PopularShowsData');
    const dataMostPopularShows = JSON.parse(storedData).slice(0, 10);
    addContent(dataMostPopularShows)


    // test paragraphs


    // please work
    let paraPopularTvShow = JSON.parse(localStorage.getItem('arrParagraphsIntervalMain'))
    console.log(paraPopularTvShow)

    const mainElement = document.querySelector('main')
    let i = 0;
    mainElement.style.backgroundImage = `url('${(dataMostPopularShows[i].image).slice(0, dataMostPopularShows[i].image.indexOf("_"))+'_V1_Ratio0.6762_AL_'}')`;


        setInterval(() => {



        // const mainElement = document.querySelector('main');
        const h1Element = mainElement.querySelector('h1');
        const spanDateElement = mainElement.querySelector('.date');
        const spanCrewElement = mainElement.querySelector('.crew');
        const spanIMDBRatingElement = mainElement.querySelector('.iMDBRating');
        const plotParagraphs = mainElement.querySelector('.plot')
        // Update background image
        mainElement.style.backgroundImage = `url('${(dataMostPopularShows[i].image).slice(0, dataMostPopularShows[i].image.indexOf("_"))+'_V1_Ratio0.6762_AL_'}')`;
        // move it back
        h1Element.innerText = dataMostPopularShows[i].title;
        spanDateElement.innerText = dataMostPopularShows[i].year;
        spanCrewElement.innerText = dataMostPopularShows[i].crew;
        plotParagraphs.innerText = paraPopularTvShow[i]
        spanIMDBRatingElement.innerHTML = dataMostPopularShows[i].imDbRating + '/ 10 ' + ' <i class="fa-solid fa-star"></i>';

        // Update h1 text
        spanCrewElement.style.opacity = 0
        spanIMDBRatingElement.style.opacity = 0
        spanDateElement.style.opacity = 0
        plotParagraphs.style.opacity = 0
        h1Element.style.opacity = 0;
        setTimeout(() => {
            spanCrewElement.style.opacity = 1
            spanIMDBRatingElement.style.opacity = 1
            h1Element.style.opacity = 1;
            plotParagraphs.style.opacity = 1
            spanDateElement.style.opacity = 1
        }, 500);

        // Update index
        i++;
        if (i >= dataMostPopularShows.length) {
            i = 0;
        }
        }, 5000);

    if (storedData !== null) {
        const dataMostPopularShows = JSON.parse(storedData);
        // console.log(dataMostPopularShows);

        const sections = document.querySelectorAll('.showSection');
        sections.forEach((section, i) => {

            section.style.backgroundImage = `url('${(dataMostPopularShows[i].image).slice(0, dataMostPopularShows[i].image.indexOf("_"))+'_V1_Ratio0.6762_AL_'}')`;

            let mainElement = document.querySelector('main')
            mainElement.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/oV5yEdlu1PodRNTyp8d2nvk2qOy.jpg')`;


        });


        getMostPopularShowsData(dataMostPopularShows)
        function getMostPopularShowsData(data) {
            // console.log(data.item)
            let sections = document.querySelectorAll(`.showSection`)
            sections = Array.from(sections)

            sections.forEach((section, i) => {
                section.addEventListener('mouseover', showInfo)
                section.addEventListener('mouseout', hideInfo)
                let backgroundImage = 0


                function showInfo(e) {
                    // Get the section that was hovered over
                    const section = e.target.closest('.showSection');
                    
                    // If the section exists and has a style property, set its background color
                    if (section && section.style) {
                        backgroundImage = section.style.backgroundImage
                        // console.log(backgroundImage)
                        section.querySelector('h3').classList.remove('hidden')
                        section.querySelector('p').classList.remove('hidden')
                        section.querySelector('button').classList.remove('hidden')
                        section.style.backgroundImage = 'none';
                        section.style.backgroundColor = '#1A1918';
                
                    }
                    
                }

                function hideInfo(e) {
                    // console.log(e)
                    const section = e.target.closest('.showSection');
                    if (section && section.style) {

                        section.style.backgroundImage = `url('${(data[i].image).slice(0, data[i].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'}')`;
                        ;
                        section.style.transition = 'background-image 0.5s ease-in-out';
                        section.querySelector('h3').classList.add('hidden')
                        section.querySelector('p').classList.add('hidden')
                        section.querySelector('button').classList.add('hidden')
                        section.style.backgroundColor = `black`;

                        
                    }
                }
            })
        } 
    } else {
      console.log('No data in Local Storage');
    }
}



function addContent(data) {
    
    if (localStorage.getItem('arrTitles') == null && localStorage.getItem('sortedPara') == null) {

    let dataTvShows = data || JSON.parse(localStorage.getItem('PopularShowsData'))
    // console.log(data)
    let arrTitles = dataTvShows.map((e, i) => e.title).slice(0, 6)
    console.log(arrTitles)
    // let arr = [] test
    let arr = {}
    let arrParagraphs = {}
    // Array APIs

    function getRandomApi() {
        let arrAPI = ['jJKGTfPoPEve4iYV47Al4eVG6JY8woIlbE8xrdFq', 'I5TZVx3f1xQ9HTXS11iPryT0ZGkQ0MU7rWVXSj0d', 'x0zX7Q6mbWxF83WfLmRRLNHlY58dBJu4YDJ75oBk', '4g9HmHVjbY3ZMEoMX7ZJu6vxu9cp9A349XodnWKo', 'xv7z2c92jBFPwgkKKScZvU11JqGtbBLDXpJypdBQ', 'SdtFFwtkoVwQEmcRa9AkIqpnSixV9qJ01HMRD8Ow']
        let randomChance = Math.floor(Math.random() * arrAPI.length)
        return arrAPI[randomChance]
    }

    let promises = []
    arrTitles.slice(0, 6).forEach((e, i) => {
      promises.push(
        fetch(`https://api.watchmode.com/v1/search/?apiKey=${getRandomApi()}&search_field=name&search_value=${arrTitles[i]}`)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            console.log(data.title_results)
            arr[data.title_results[0]['name']] = (data.title_results[0].id)
            console.log(arr)
          })
          .catch(err => {
            console.log(`error ${err}`)
          })
      )
    })

    Promise.all(promises)
      .then(() => {

        console.log(arr)


        let arrTitlesShow = JSON.parse(localStorage.getItem('PopularShowsData'))
        let arrTitles = arrTitlesShow.map((e, i) => e.title).slice(0, 6)

        let sortedObj = {};
        let sortIds = []
        if (arrTitles[arrTitles.indexOf('Beef')] == 'Beef') {
            arrTitles[arrTitles.indexOf('Beef')] = 'BEEF'; 
        }


        arrTitles.forEach((key) => {
        if (arr.hasOwnProperty(key)) {
            sortedObj[key] = arr[key];
            sortIds.push(sortedObj[key])
        } else {
            sortedObj[key] = 3183276
            sortIds.push(sortedObj[key])
        }
        });

        console.log(sortedObj);
        console.log(sortIds)

        // Array APIs

        function getRandomApi() {
            let arrAPI = ['jJKGTfPoPEve4iYV47Al4eVG6JY8woIlbE8xrdFq', 'I5TZVx3f1xQ9HTXS11iPryT0ZGkQ0MU7rWVXSj0d', 'x0zX7Q6mbWxF83WfLmRRLNHlY58dBJu4YDJ75oBk', '4g9HmHVjbY3ZMEoMX7ZJu6vxu9cp9A349XodnWKo', 'xv7z2c92jBFPwgkKKScZvU11JqGtbBLDXpJypdBQ', 'SdtFFwtkoVwQEmcRa9AkIqpnSixV9qJ01HMRD8Ow']
            let randomChance = Math.floor(Math.random() * arrAPI.length)
            return arrAPI[randomChance]
        }


        let promises2 = sortIds.slice(0, 6).map((e, i) => {
          return fetch(`https://api.watchmode.com/v1/title/${e}/details/?apiKey=${getRandomApi()}&append_to_response=sources`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                console.log(data.plot_overview)
                arrParagraphs[data['title']] = (data.plot_overview)
            })
            .catch(err => {
              console.log(`error ${err}`)
            })
        })
        
        return Promise.all(promises2)
      })
      .then(() => {
        console.log(arrParagraphs)
        // Do something with arrParagraphs here

        let sortedObjPara = {};
        let sortedPara = []

        if (arrTitles[arrTitles.indexOf('Beef')] === 'Beef') {
            arrTitles[arrTitles.indexOf('Beef')] = 'BEEF'; 
        }


        arrTitles.forEach((key) => {
        if (arrParagraphs.hasOwnProperty(key)) {
            sortedObjPara[key] = arrParagraphs[key];
            sortedPara.push(sortedObjPara[key]);
        } else {
            sortedObjPara[key] = 'A road rage incident between two strangers — a failing contractor and an unfulfilled entrepreneur — sparks a feud that brings out their darkest impulses.'
            sortedPara.push(sortedObjPara[key])
        }
        });

        console.log(sortedObjPara);
        console.log(sortedPara);

          
          console.log(sortedPara);

    
        localStorage.setItem('arrTitles', JSON.stringify(arrTitles))
        localStorage.setItem('arrParagraphs', JSON.stringify(sortedPara))

        let titles = localStorage.getItem('arrTitles');
        titles = JSON.parse(titles)
        console.log(titles)

        let paragraphs = localStorage.getItem('arrParagraphs');
        paragraphs = JSON.parse(paragraphs)
        console.log(paragraphs)

        

        const sections = document.querySelectorAll('.showSection');
        sections.forEach((e, i) => {
            const h3 = e.querySelector('h3');
            const p = e.querySelector('.textPara');
            

            h3.innerText = titles[i];
            p.innerText = paragraphs[i]
        })

        var modal = document.getElementById("myModal");

        // // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];


        let showTitles = JSON.parse(localStorage.getItem('PopularShowsData'))
        let showPara = JSON.parse(localStorage.getItem('arrParagraphs'))



        let showOne = document.querySelector('#showOne')
        let showTwo = document.querySelector('#showTwo')
        let showThree = document.querySelector('#showThree')
        let showFour = document.querySelector('#showFour')
        let showFive = document.querySelector('#showFive')
        let showSix = document.querySelector('#showSix')

        showOne.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = showTitles[0].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + showTitles[0].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' +  showTitles[0].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + showTitles[0].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + showPara[0]
            modal.querySelector('img').src = (showTitles[0].image).slice(0, showTitles[0].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        showTwo.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = showTitles[1].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + showTitles[1].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + showTitles[1].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + showTitles[1].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + showPara[1]
            modal.querySelector('img').src = (showTitles[1].image).slice(0, showTitles[1].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }

        showThree.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = showTitles[2].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + showTitles[2].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + showTitles[2].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + showTitles[2].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + showPara[2]
            modal.querySelector('img').src = (showTitles[2].image).slice(0, showTitles[2].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }

        showFour.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = showTitles[3].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + showTitles[3].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + showTitles[3].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + showTitles[3].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + showPara[3]
            modal.querySelector('img').src = (showTitles[3].image).slice(0, showTitles[3].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }


        showFive.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = showTitles[4].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + showTitles[4].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + showTitles[4].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + showTitles[4].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + showPara[4]
            modal.querySelector('img').src = (showTitles[4].image).slice(0, showTitles[4].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }


        showSix.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = showTitles[5].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + showTitles[5].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + showTitles[5].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + showTitles[5].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + showPara[5]
            modal.querySelector('img').src = (showTitles[5].image).slice(0, showTitles[5].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }

        let inputValue = document.querySelector('#inputValue')

        inputValue.addEventListener('keydown', checkResult)
        let searchResults = document.querySelector('.searchResults')
        let firstSearch = document.querySelector('#firstSearch')
        let firstSearchYear = document.querySelector('#firstSearchYear')
        let secondSearch = document.querySelector('#secondSearch')
        let secondSearchYear = document.querySelector('#secondSearchYear')
        let thirdSearch = document.querySelector('#thirdSearch')
        let thirdSearchYear = document.querySelector('#thirdSearchYear')

        let sectionOne = document.querySelector('.one')
        let sectionTwo = document.querySelector('.two')
        let sectionThree = document.querySelector('.three')

        let searchResultsIds = []
        console.log(searchResultsIds)
        function checkResult(e) {
            let searchValue  = inputValue.value
            if(e.keyCode === 13 && searchValue.length != 0) {

                // Array APIs

                function getRandomApi() {
                    let arrAPI = ['jJKGTfPoPEve4iYV47Al4eVG6JY8woIlbE8xrdFq', 'I5TZVx3f1xQ9HTXS11iPryT0ZGkQ0MU7rWVXSj0d', 'x0zX7Q6mbWxF83WfLmRRLNHlY58dBJu4YDJ75oBk', '4g9HmHVjbY3ZMEoMX7ZJu6vxu9cp9A349XodnWKo', 'xv7z2c92jBFPwgkKKScZvU11JqGtbBLDXpJypdBQ', 'SdtFFwtkoVwQEmcRa9AkIqpnSixV9qJ01HMRD8Ow']
                    let randomChance = Math.floor(Math.random() * arrAPI.length)
                    return arrAPI[randomChance]
                }
                fetch(`https://api.watchmode.com/v1/search/?apiKey=${getRandomApi()}&search_field=name&search_value=${searchValue}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if(data.title_results[0] == undefined) {
                            searchResultsIds= []
                            searchResults.style.display = 'block'
                            firstSearch.innerText = `Cannot find ${searchValue}`
                            searchResults.style.height = '10vh'
                            firstSearchYear.innerText = ''
                            sectionTwo.style.display = 'none'
                            sectionThree.style.display = 'none'
                        } else {
                            searchResultsIds= []
                            searchResultsIds.push(data.title_results[0].id)
                            searchResults.style.display = 'block'
                            firstSearch.innerText = data.title_results[0].name
                            firstSearchYear.innerText = data.title_results[0].year
                            sectionTwo.style.display = 'none'
                            sectionThree.style.display = 'none'
                            searchResults.style.height = '10vh'
                            if (data.title_results.length >= 3) {
                                searchResultsIds.push(data.title_results[1].id)
                                searchResultsIds.push(data.title_results[2].id)

                                sectionTwo.style.display = 'block'
                                sectionThree.style.display = 'block'
                                searchResults.style.height = '25vh'
                                searchResults.style.display = 'block'
                                firstSearch.innerText = data.title_results[0].name
                                firstSearchYear.innerText = data.title_results[0].year
        
                                secondSearch.innerText = data.title_results[1].name
                                secondSearchYear.innerText = data.title_results[1].year
        
                                thirdSearch.innerText = data.title_results[2].name
                                thirdSearchYear.innerText = data.title_results[2].year
                            }

                        }

                        
                    })
                    .catch(err => {
                    console.log(`error ${err}`)
                    })
            } else {
                searchResults.style.display = 'none'
            }


        }




        sectionOne.addEventListener('click', getFirstResult)
        sectionTwo.addEventListener('click', getSecondResult)
        sectionThree.addEventListener('click', getThirdResult)
        
        console.log(searchResultsIds)
        function getFirstResult() {
            console.log(searchResultsIds)
            // Array APIs

            function getRandomApi() {
                let arrAPI = ['jJKGTfPoPEve4iYV47Al4eVG6JY8woIlbE8xrdFq', 'I5TZVx3f1xQ9HTXS11iPryT0ZGkQ0MU7rWVXSj0d', 'x0zX7Q6mbWxF83WfLmRRLNHlY58dBJu4YDJ75oBk', '4g9HmHVjbY3ZMEoMX7ZJu6vxu9cp9A349XodnWKo', 'xv7z2c92jBFPwgkKKScZvU11JqGtbBLDXpJypdBQ', 'SdtFFwtkoVwQEmcRa9AkIqpnSixV9qJ01HMRD8Ow']
                let randomChance = Math.floor(Math.random() * arrAPI.length)
                return arrAPI[randomChance]
            }
            fetch(`https://api.watchmode.com/v1/title/${searchResultsIds[0]}/details/?apiKey=${getRandomApi()}&append_to_response=sources`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                modal.style.display= 'block'
            
                modal.querySelector('h2').innerText = data.original_title
                modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + data.release_date
                modal.querySelector('#castCrew').innerText = 'Genre:  ' + data.genre_names[0] + ', ' + data.genre_names[1] || ''
                modal.querySelector('#Rating').innerHTML = 'Rating:  ' + data.user_rating + ' / 10 ' + '<i class="fa-solid fa-star"></i>'
                modal.querySelector('p').innerText = 'Plot:  ' + data.plot_overview
                modal.querySelector('img').src =  data.poster
                
            })
            .catch(err => {
            console.log(`error ${err}`)
            })
        }


        function getSecondResult() {
            // Array APIs

            function getRandomApi() {
                let arrAPI = ['jJKGTfPoPEve4iYV47Al4eVG6JY8woIlbE8xrdFq', 'I5TZVx3f1xQ9HTXS11iPryT0ZGkQ0MU7rWVXSj0d', 'x0zX7Q6mbWxF83WfLmRRLNHlY58dBJu4YDJ75oBk', '4g9HmHVjbY3ZMEoMX7ZJu6vxu9cp9A349XodnWKo', 'xv7z2c92jBFPwgkKKScZvU11JqGtbBLDXpJypdBQ', 'SdtFFwtkoVwQEmcRa9AkIqpnSixV9qJ01HMRD8Ow']
                let randomChance = Math.floor(Math.random() * arrAPI.length)
                return arrAPI[randomChance]
            }
            fetch(`https://api.watchmode.com/v1/title/${searchResultsIds[1]}/details/?apiKey=${getRandomApi()}&append_to_response=sources`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                modal.style.display= 'block'
            
                modal.querySelector('h2').innerText = data.original_title
                modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + data.release_date
                modal.querySelector('#castCrew').innerText = 'Genre:  ' || ''
                modal.querySelector('#Rating').innerHTML = 'Rating:  ' + data.user_rating + ' / 10 ' + '<i class="fa-solid fa-star"></i>'
                modal.querySelector('p').innerText = 'Plot:  ' + data.plot_overview
                modal.querySelector('img').src =  data.poster
            })
            .catch(err => {
            console.log(`error ${err}`)
            })
        }


        function getThirdResult() {
            // Array APIs

            function getRandomApi() {
                let arrAPI = ['jJKGTfPoPEve4iYV47Al4eVG6JY8woIlbE8xrdFq', 'I5TZVx3f1xQ9HTXS11iPryT0ZGkQ0MU7rWVXSj0d', 'x0zX7Q6mbWxF83WfLmRRLNHlY58dBJu4YDJ75oBk', '4g9HmHVjbY3ZMEoMX7ZJu6vxu9cp9A349XodnWKo', 'xv7z2c92jBFPwgkKKScZvU11JqGtbBLDXpJypdBQ', 'SdtFFwtkoVwQEmcRa9AkIqpnSixV9qJ01HMRD8Ow']
                let randomChance = Math.floor(Math.random() * arrAPI.length)
                return arrAPI[randomChance]
            }
            fetch(`https://api.watchmode.com/v1/title/${searchResultsIds[2]}/details/?apiKey=${getRandomApi()}&append_to_response=sources`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                modal.style.display= 'block'
            
                modal.querySelector('h2').innerText = data.original_title
                modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + data.release_date
                modal.querySelector('#castCrew').innerText = 'Genre:  ' + data.genre_names[0] || ''
                modal.querySelector('#Rating').innerHTML = 'Rating:  ' + data.user_rating + ' / 10 ' + '<i class="fa-solid fa-star"></i>'
                modal.querySelector('p').innerText = 'Plot:  ' + data.plot_overview
                modal.querySelector('img').src =  data.poster
            })
            .catch(err => {
            console.log(`error ${err}`)
            })
        }


    })

    } else {
        titles = localStorage.getItem('arrTitles');
        titles = JSON.parse(titles)
        console.log(titles)
        
        paragraphs = localStorage.getItem('arrParagraphs');
        paragraphs = JSON.parse(paragraphs)
        console.log(paragraphs)
        
        
        const sections = document.querySelectorAll('.showSection');
        sections.forEach((e, i) => {
            const h3 = e.querySelector('h3');
            const p = e.querySelector('.textPara');
        
            h3.innerText = titles[i];
            p.innerText = paragraphs[i]
        })

        var modal = document.getElementById("myModal");

        // // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];


        let showTitles = JSON.parse(localStorage.getItem('PopularShowsData'))
        let showPara = JSON.parse(localStorage.getItem('arrParagraphs'))



        let showOne = document.querySelector('#showOne')
        let showTwo = document.querySelector('#showTwo')
        let showThree = document.querySelector('#showThree')
        let showFour = document.querySelector('#showFour')
        let showFive = document.querySelector('#showFive')
        let showSix = document.querySelector('#showSix')

        showOne.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = showTitles[0].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + showTitles[0].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' +  showTitles[0].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + showTitles[0].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + showPara[0]
            modal.querySelector('img').src = (showTitles[0].image).slice(0, showTitles[0].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        showTwo.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = showTitles[1].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + showTitles[1].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + showTitles[1].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + showTitles[1].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + showPara[1]
            modal.querySelector('img').src = (showTitles[1].image).slice(0, showTitles[1].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }

        showThree.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = showTitles[2].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + showTitles[2].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + showTitles[2].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + showTitles[2].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + showPara[2]
            modal.querySelector('img').src = (showTitles[2].image).slice(0, showTitles[2].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }

        showFour.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = showTitles[3].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + showTitles[3].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + showTitles[3].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + showTitles[3].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + showPara[3]
            modal.querySelector('img').src = (showTitles[3].image).slice(0, showTitles[3].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }


        showFive.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = showTitles[4].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + showTitles[4].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + showTitles[4].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + showTitles[4].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + showPara[4]
            modal.querySelector('img').src = (showTitles[4].image).slice(0, showTitles[4].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }


        showSix.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = showTitles[5].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + showTitles[5].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + showTitles[5].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + showTitles[5].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + showPara[5]
            modal.querySelector('img').src = (showTitles[5].image).slice(0, showTitles[5].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }

        let inputValue = document.querySelector('#inputValue')

        inputValue.addEventListener('keydown', checkResult)
        // let inputValue = document.querySelector('#inputValue').value
        let searchResults = document.querySelector('.searchResults')
        let firstSearch = document.querySelector('#firstSearch')
        let firstSearchYear = document.querySelector('#firstSearchYear')
        let secondSearch = document.querySelector('#secondSearch')
        let secondSearchYear = document.querySelector('#secondSearchYear')
        let thirdSearch = document.querySelector('#thirdSearch')
        let thirdSearchYear = document.querySelector('#thirdSearchYear')

        let sectionOne = document.querySelector('.one')
        let sectionTwo = document.querySelector('.two')
        let sectionThree = document.querySelector('.three')

        let searchResultsIds = []
        console.log(searchResultsIds)
        function checkResult(e) {
            let searchValue  = inputValue.value
            if(e.keyCode === 13 && searchValue.length != 0) {
                // Array APIs

                function getRandomApi() {
                    let arrAPI = ['jJKGTfPoPEve4iYV47Al4eVG6JY8woIlbE8xrdFq', 'I5TZVx3f1xQ9HTXS11iPryT0ZGkQ0MU7rWVXSj0d', 'x0zX7Q6mbWxF83WfLmRRLNHlY58dBJu4YDJ75oBk', '4g9HmHVjbY3ZMEoMX7ZJu6vxu9cp9A349XodnWKo', 'xv7z2c92jBFPwgkKKScZvU11JqGtbBLDXpJypdBQ', 'SdtFFwtkoVwQEmcRa9AkIqpnSixV9qJ01HMRD8Ow']
                    let randomChance = Math.floor(Math.random() * arrAPI.length)
                    return arrAPI[randomChance]
                }
                fetch(`https://api.watchmode.com/v1/search/?apiKey=${getRandomApi()}&search_field=name&search_value=${searchValue}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if(data.title_results[0] == undefined) {
                            searchResultsIds= []
                            searchResults.style.display = 'block'
                            firstSearch.innerText = `Cannot find ${searchValue}`
                            searchResults.style.height = '10vh'
                            firstSearchYear.innerText = ''
                            sectionTwo.style.display = 'none'
                            sectionThree.style.display = 'none'
                        } else {
                            searchResultsIds= []
                            searchResultsIds.push(data.title_results[0].id)
                            searchResults.style.display = 'block'
                            firstSearch.innerText = data.title_results[0].name
                            firstSearchYear.innerText = data.title_results[0].year
                            sectionTwo.style.display = 'none'
                            sectionThree.style.display = 'none'
                            searchResults.style.height = '10vh'
                            if (data.title_results.length >= 3) {
                                searchResultsIds.push(data.title_results[1].id)
                                searchResultsIds.push(data.title_results[2].id)

                                sectionTwo.style.display = 'block'
                                sectionThree.style.display = 'block'
                                searchResults.style.height = '25vh'
                                searchResults.style.display = 'block'
                                firstSearch.innerText = data.title_results[0].name
                                firstSearchYear.innerText = data.title_results[0].year
        
                                secondSearch.innerText = data.title_results[1].name
                                secondSearchYear.innerText = data.title_results[1].year
        
                                thirdSearch.innerText = data.title_results[2].name
                                thirdSearchYear.innerText = data.title_results[2].year
                            }

                        }

                        
                    })
                    .catch(err => {
                    console.log(`error ${err}`)
                    })
            } else {
                searchResults.style.display = 'none'
            }


        }




        sectionOne.addEventListener('click', getFirstResult)
        sectionTwo.addEventListener('click', getSecondResult)
        sectionThree.addEventListener('click', getThirdResult)
        
        console.log(searchResultsIds)
        function getFirstResult() {
            console.log(searchResultsIds)
            // Array APIs

            function getRandomApi() {
                let arrAPI = ['jJKGTfPoPEve4iYV47Al4eVG6JY8woIlbE8xrdFq', 'I5TZVx3f1xQ9HTXS11iPryT0ZGkQ0MU7rWVXSj0d', 'x0zX7Q6mbWxF83WfLmRRLNHlY58dBJu4YDJ75oBk', '4g9HmHVjbY3ZMEoMX7ZJu6vxu9cp9A349XodnWKo', 'xv7z2c92jBFPwgkKKScZvU11JqGtbBLDXpJypdBQ', 'SdtFFwtkoVwQEmcRa9AkIqpnSixV9qJ01HMRD8Ow']
                let randomChance = Math.floor(Math.random() * arrAPI.length)
                return arrAPI[randomChance]
            }
            fetch(`https://api.watchmode.com/v1/title/${searchResultsIds[0]}/details/?apiKey=${getRandomApi()}&append_to_response=sources`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                modal.style.display= 'block'
            
                modal.querySelector('h2').innerText = data.original_title
                modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + data.release_date
                modal.querySelector('#castCrew').innerText = 'Genre:  ' + data.genre_names[0] + ', ' + data.genre_names[1] || ''
                modal.querySelector('#Rating').innerHTML = 'Rating:  ' + data.user_rating + ' / 10 ' + '<i class="fa-solid fa-star"></i>'
                modal.querySelector('p').innerText = 'Plot:  ' + data.plot_overview
                modal.querySelector('img').src =  data.poster
            })
            .catch(err => {
            console.log(`error ${err}`)
            })
        }


        function getSecondResult() {
            // Array APIs

            function getRandomApi() {
                let arrAPI = ['jJKGTfPoPEve4iYV47Al4eVG6JY8woIlbE8xrdFq', 'I5TZVx3f1xQ9HTXS11iPryT0ZGkQ0MU7rWVXSj0d', 'x0zX7Q6mbWxF83WfLmRRLNHlY58dBJu4YDJ75oBk', '4g9HmHVjbY3ZMEoMX7ZJu6vxu9cp9A349XodnWKo', 'xv7z2c92jBFPwgkKKScZvU11JqGtbBLDXpJypdBQ', 'SdtFFwtkoVwQEmcRa9AkIqpnSixV9qJ01HMRD8Ow']
                let randomChance = Math.floor(Math.random() * arrAPI.length)
                return arrAPI[randomChance]
            }
            fetch(`https://api.watchmode.com/v1/title/${searchResultsIds[1]}/details/?apiKey=${getRandomApi()}&append_to_response=sources`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                modal.style.display= 'block'
            
                modal.querySelector('h2').innerText = data.original_title
                modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + data.release_date
                modal.querySelector('#castCrew').innerText = 'Genre:  ' || ''
                modal.querySelector('#Rating').innerHTML = 'Rating:  ' + data.user_rating + ' / 10 ' + '<i class="fa-solid fa-star"></i>'
                modal.querySelector('p').innerText = 'Plot:  ' + data.plot_overview
                modal.querySelector('img').src =  data.poster
            })
            .catch(err => {
            console.log(`error ${err}`)
            })
        }


        function getThirdResult() {
            // Array APIs

            function getRandomApi() {
                let arrAPI = ['jJKGTfPoPEve4iYV47Al4eVG6JY8woIlbE8xrdFq', 'I5TZVx3f1xQ9HTXS11iPryT0ZGkQ0MU7rWVXSj0d', 'x0zX7Q6mbWxF83WfLmRRLNHlY58dBJu4YDJ75oBk', '4g9HmHVjbY3ZMEoMX7ZJu6vxu9cp9A349XodnWKo', 'xv7z2c92jBFPwgkKKScZvU11JqGtbBLDXpJypdBQ', 'SdtFFwtkoVwQEmcRa9AkIqpnSixV9qJ01HMRD8Ow']
                let randomChance = Math.floor(Math.random() * arrAPI.length)
                return arrAPI[randomChance]
            }
            fetch(`https://api.watchmode.com/v1/title/${searchResultsIds[2]}/details/?apiKey=${getRandomApi()}&append_to_response=sources`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                modal.style.display= 'block'
            
                modal.querySelector('h2').innerText = data.original_title
                modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + data.release_date
                modal.querySelector('#castCrew').innerText = 'Genre:  ' + data.genre_names[0] || ''
                modal.querySelector('#Rating').innerHTML = 'Rating:  ' + data.user_rating + ' / 10 ' + '<i class="fa-solid fa-star"></i>'
                modal.querySelector('p').innerText = 'Plot:  ' + data.plot_overview
                modal.querySelector('img').src =  data.poster
            })
            .catch(err => {
            console.log(`error ${err}`)
            })
        }

    }


}











// Movies

if (localStorage.getItem('PopularMoviesData') == null) {

    fetch('https://imdb-api.com/en/API/MostPopularMovies/k_n10wj02z')
    .then(res => res.json())
    .then(data => {
        let dataMostPopularMovies = data.items;
        localStorage.setItem('PopularMoviesData', JSON.stringify(dataMostPopularMovies));
        getMostPopularMoviesData(dataMostPopularMovies)
        addContentMovies(dataMostPopularMovies)
        const sections = document.querySelectorAll('.movieSection');
        sections.forEach((section, i) => {
            console.log(dataMostPopularMovies[i].image)
            section.style.backgroundImage = `url('${(dataMostPopularMovies[i].image).slice(0, dataMostPopularMovies[i].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'}')`;

        });
    })
    .catch(err => {
        console.log(`error ${err}`)
    })


    const storedData1 = localStorage.getItem('PopularMoviesData');
    const dataMostPopularMovies1 = JSON.parse(storedData1);

    getMostPopularMoviesData(dataMostPopularMovies1)
    function getMostPopularMoviesData(data) {
        // console.log(data.item)
        let sections = document.querySelectorAll(`.movieSection`)
        sections = Array.from(sections)

        sections.forEach((section, i) => {
        section.addEventListener('mouseover', showInfo)
        section.addEventListener('mouseout', hideInfo)
        let backgroundImagePic = 0


            function showInfo(e) {
                // Get the section that was hovered over
                const section = e.target.closest('.movieSection');
                
                // If the section exists and has a style property, set its background color
                if (section && section.style) {
                    backgroundImagePic = section.style.backgroundImage
                    section.querySelector('h3').classList.remove('hidden')
                    section.querySelector('p').classList.remove('hidden')
                    section.querySelector('button').classList.remove('hidden')
                    section.style.backgroundImage = 'none';
                    section.style.backgroundColor = '#1A1918';
            
                }
                
            }

            function hideInfo(e) {
                // console.log(e)
                const section = e.target.closest('.movieSection');
                if (section && section.style) {

                    // section.style.backgroundImage = `url('${(data[i].image)}')`;
                    section.style.backgroundImage = `url('${(data[i].image).slice(0, data[i].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'}')`;
                    section.style.transition = 'background-image 0.5s ease-in-out';
                    section.querySelector('h3').classList.add('hidden')
                    section.querySelector('p').classList.add('hidden')
                    section.querySelector('button').classList.add('hidden')
                    section.style.backgroundColor = `black`;
                }
            }
        })
    } 
    
} 
else {
    const storedData = localStorage.getItem('PopularMoviesData');
    const dataMostPopularMovies = JSON.parse(storedData);
    addContentMovies(dataMostPopularMovies)
    if (storedData !== null) {
        const dataMostPopularMovies = JSON.parse(storedData);
        // console.log(dataMostPopularShows);

        const sections = document.querySelectorAll('.movieSection');
        sections.forEach((section, i) => {

            section.style.backgroundImage = `url('${(dataMostPopularMovies[i].image).slice(0, dataMostPopularMovies[i].image.indexOf("_"))+'_V1_Ratio0.6762_AL_'}')`;
        });

        getMostPopularMoviesData(dataMostPopularMovies)
        function getMostPopularMoviesData(data) {
            // console.log(data.item)
            let sections = document.querySelectorAll(`.movieSection`)
            sections = Array.from(sections)

            sections.forEach((section, i) => {
                section.addEventListener('mouseover', showInfo)
                section.addEventListener('mouseout', hideInfo)
                let backgroundImage = 0


                function showInfo(e) {
                    // Get the section that was hovered over
                    const section = e.target.closest('.movieSection');
                    
                    // If the section exists and has a style property, set its background color
                    if (section && section.style) {
                        backgroundImage = section.style.backgroundImage
                        // console.log(backgroundImage)
                        section.querySelector('h3').classList.remove('hidden')
                        section.querySelector('p').classList.remove('hidden')
                        section.querySelector('button').classList.remove('hidden')
                        section.style.backgroundImage = 'none';
                        section.style.backgroundColor = '#1A1918';
                
                    }
                    
                }

                function hideInfo(e) {
                    // console.log(e)
                    const section = e.target.closest('.movieSection');
                    if (section && section.style) {
                        // section.classList.remove('hide');
                        const index = backgroundImage.indexOf("_");
                        const result = backgroundImage.slice(0, index);
    
    
                        section.style.backgroundImage = `url('${(data[i].image).slice(0, data[i].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'}')`;
                        ;
                        // section.style.backgroundColor = `red`;
                        section.style.transition = 'background-image 0.5s ease-in-out';
                        section.querySelector('h3').classList.add('hidden')
                        section.querySelector('p').classList.add('hidden')
                        section.querySelector('button').classList.add('hidden')
                        section.style.backgroundColor = `black`;
                    }
                }
            })
        } 
    } else {
      console.log('No data in Local Storage');
    }
}







function addContentMovies(data) {
    
    if (localStorage.getItem('arrTitlesMovies') == null && localStorage.getItem('sortedParaMovies') == null) {

    let dataTvMovies = data || JSON.parse(localStorage.getItem('PopularMoviesData'))
//     // console.log(data)
    let arrTitlesMovies = dataTvMovies.map((e, i) => e.title).slice(0, 6)
    console.log(arrTitlesMovies)
    let arr = {}
    let arrParagraphs = {}
    
    // Array APIs

    function getRandomApi() {
        let arrAPI = ['jJKGTfPoPEve4iYV47Al4eVG6JY8woIlbE8xrdFq', 'I5TZVx3f1xQ9HTXS11iPryT0ZGkQ0MU7rWVXSj0d', 'x0zX7Q6mbWxF83WfLmRRLNHlY58dBJu4YDJ75oBk', '4g9HmHVjbY3ZMEoMX7ZJu6vxu9cp9A349XodnWKo', 'xv7z2c92jBFPwgkKKScZvU11JqGtbBLDXpJypdBQ', 'SdtFFwtkoVwQEmcRa9AkIqpnSixV9qJ01HMRD8Ow']
        let randomChance = Math.floor(Math.random() * arrAPI.length)
        return arrAPI[randomChance]
    }
    let promises = []
    arrTitlesMovies.slice(0, 6).forEach((e, i) => {
      promises.push(
        fetch(`https://api.watchmode.com/v1/search/?apiKey=${getRandomApi()}&search_field=name&search_value=${arrTitlesMovies[i]}`)
          .then(res => res.json())
          .then(data => {
//             console.log(data)
//             console.log(data.title_results)
            arr[data.title_results[0]['name']] = (data.title_results[0].id)
//             console.log(arr)
          })
          .catch(err => {
            console.log(`error ${err}`)
          })
      )
      console.log(arr)

    })

    Promise.all(promises)
      .then(() => {

        if(arr.hasOwnProperty("Barbie as The Princess & the Pauper")) {
            delete arr["Barbie as The Princess & the Pauper"]
            arr.Barbie = 143379
        }
        console.log(arr)

        let sortedObjMovies = {};
        let sortIdsMovies = []
        if (arrTitlesMovies[3] === 'Barbie as The Princess & the Pauper') {
            arrTitlesMovies[3] = 'Barbie'; 
        }

        console.log(arrTitlesMovies)


        arrTitlesMovies.forEach((key) => {
        if (arr.hasOwnProperty(key)) {
            console.log(sortedObjMovies);
            console.log(sortIdsMovies)
            sortedObjMovies[key] = arr[key];
            sortIdsMovies.push(sortedObjMovies[key])
        }
        });

        console.log(sortedObjMovies);
        console.log(sortIdsMovies)
        // Array APIs

        function getRandomApi() {
            let arrAPI = ['jJKGTfPoPEve4iYV47Al4eVG6JY8woIlbE8xrdFq', 'I5TZVx3f1xQ9HTXS11iPryT0ZGkQ0MU7rWVXSj0d', 'x0zX7Q6mbWxF83WfLmRRLNHlY58dBJu4YDJ75oBk', '4g9HmHVjbY3ZMEoMX7ZJu6vxu9cp9A349XodnWKo', 'xv7z2c92jBFPwgkKKScZvU11JqGtbBLDXpJypdBQ', 'SdtFFwtkoVwQEmcRa9AkIqpnSixV9qJ01HMRD8Ow']
            let randomChance = Math.floor(Math.random() * arrAPI.length)
            return arrAPI[randomChance]
        }

        let promises2 = sortIdsMovies.slice(0, 6).map((e, i) => {
          return fetch(`https://api.watchmode.com/v1/title/${e}/details/?apiKey=${getRandomApi()}&append_to_response=sources`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
//                 console.log(data.plot_overview)
                arrParagraphs[data['title']] = (data.plot_overview)
            })
            .catch(err => {
              console.log(`error ${err}`)
            })
        })
        
        return Promise.all(promises2)
      })
      .then(() => {
        console.log(arrParagraphs)
//         // Do something with arrParagraphs here
        let sortedObjParaMovies = {};
        let sortedParaMovies = []

        if (arrTitlesMovies[0] === 'Beef') {
            arrTitlesMovies[0] = 'BEEF'; 
        }


        arrTitlesMovies.forEach((key) => {
        if (arrParagraphs.hasOwnProperty(key)) {
            sortedObjParaMovies[key] = arrParagraphs[key];
            sortedParaMovies.push(sortedObjParaMovies[key]);
        }
        });

        console.log(sortedObjParaMovies);
        console.log(sortedParaMovies);

    
        localStorage.setItem('arrTitlesMovies', JSON.stringify(arrTitlesMovies))
        localStorage.setItem('sortedParaMovies', JSON.stringify(sortedParaMovies))

        let titles = localStorage.getItem('arrTitlesMovies');
        titles = JSON.parse(titles)
        // console.log(titles)

        let paragraphs = localStorage.getItem('sortedParaMovies');
        paragraphs = JSON.parse(paragraphs)
//         console.log(paragraphs)


        const sections = document.querySelectorAll('.movieSection');
        sections.forEach((e, i) => {
            const h3 = e.querySelector('h3');
            const p = e.querySelector('.textPara');
            // const button = e.querySelector('button');

            h3.innerText = titles[i];
            if (h3.innerText.length > 15) {
                h3.style.fontSize = '1.5rem'
                h3.style.lineHeight = '2rem'
            }
            p.innerText = paragraphs[i]

            if (h3.innerText === 'Barbie') {
                p.innerText = "To live in Barbie Land is to be a perfect being in a perfect place. Unless you have a full-on existential crisis. Or you're a Ken."
            }
        })

        var modal = document.getElementById("myModal");

        // // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];


        let movieTitles = JSON.parse(localStorage.getItem('PopularMoviesData'))
        let moviePara = JSON.parse(localStorage.getItem('sortedParaMovies'))



        let movieOne = document.querySelector('#movieOne')
        let movieTwo = document.querySelector('#movieTwo')
        let movieThree = document.querySelector('#movieThree')
        let movieFour = document.querySelector('#movieFour')
        let movieFive = document.querySelector('#movieFive')
        let movieSix = document.querySelector('#movieSix')

        movieOne.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = movieTitles[0].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + movieTitles[0].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' +  movieTitles[0].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + movieTitles[0].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + moviePara[0]
            modal.querySelector('img').src = (movieTitles[0].image).slice(0, movieTitles[0].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        movieTwo.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = movieTitles[1].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + movieTitles[1].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + movieTitles[1].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + movieTitles[1].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + moviePara[1]
            modal.querySelector('img').src = (movieTitles[1].image).slice(0, movieTitles[1].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }

        movieThree.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = movieTitles[2].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + movieTitles[2].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + movieTitles[2].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + movieTitles[2].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + moviePara[2]
            modal.querySelector('img').src = (movieTitles[2].image).slice(0, movieTitles[2].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }

        movieFour.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = movieTitles[3].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + movieTitles[3].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + movieTitles[3].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + movieTitles[3].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + moviePara[3]
            modal.querySelector('img').src = (movieTitles[3].image).slice(0, movieTitles[3].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }


        movieFive.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = movieTitles[4].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + movieTitles[4].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + movieTitles[4].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + movieTitles[4].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + moviePara[4]
            modal.querySelector('img').src = (movieTitles[4].image).slice(0, movieTitles[4].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }


        movieSix.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = movieTitles[5].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + movieTitles[5].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + movieTitles[5].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + movieTitles[5].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + moviePara[5]
            modal.querySelector('img').src = (movieTitles[5].image).slice(0, movieTitles[5].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }
    })

    } else {
        titles = localStorage.getItem('arrTitlesMovies');
        titles = JSON.parse(titles)
        console.log(titles)
        
        paragraphs = localStorage.getItem('sortedParaMovies');
        paragraphs = JSON.parse(paragraphs)
        console.log(paragraphs)
        
        
        const sections = document.querySelectorAll('.movieSection');
        sections.forEach((e, i) => {
            const h3 = e.querySelector('h3');
            const p = e.querySelector('.textPara');
            // const button = e.querySelector('button');
        
            h3.innerText = titles[i];
            if (h3.innerText.length > 15) {
                h3.style.fontSize = '1.5rem'
                h3.style.lineHeight = '2rem'
            }
            p.innerText = paragraphs[i]
            
            if (h3.innerText === 'Barbie') {
                p.innerText = "To live in Barbie Land is to be a perfect being in a perfect place. Unless you have a full-on existential crisis. Or you're a Ken."
            }
        })

        var modal = document.getElementById("myModal");

        // // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];


        let movieTitles = JSON.parse(localStorage.getItem('PopularMoviesData'))
        let moviePara = JSON.parse(localStorage.getItem('sortedParaMovies'))



        let movieOne = document.querySelector('#movieOne')
        let movieTwo = document.querySelector('#movieTwo')
        let movieThree = document.querySelector('#movieThree')
        let movieFour = document.querySelector('#movieFour')
        let movieFive = document.querySelector('#movieFive')
        let movieSix = document.querySelector('#movieSix')

        movieOne.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = movieTitles[0].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + movieTitles[0].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' +  movieTitles[0].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + movieTitles[0].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + moviePara[0]
            modal.querySelector('img').src = (movieTitles[0].image).slice(0, movieTitles[0].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }

        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        movieTwo.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = movieTitles[1].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + movieTitles[1].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + movieTitles[1].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + movieTitles[1].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + moviePara[1]
            modal.querySelector('img').src = (movieTitles[1].image).slice(0, movieTitles[1].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }

        movieThree.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = movieTitles[2].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + movieTitles[2].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + movieTitles[2].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + movieTitles[2].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + moviePara[2]
            modal.querySelector('img').src = (movieTitles[2].image).slice(0, movieTitles[2].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }

        movieFour.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = movieTitles[3].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + movieTitles[3].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + movieTitles[3].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + movieTitles[3].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + moviePara[3]
            modal.querySelector('img').src = (movieTitles[3].image).slice(0, movieTitles[3].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }


        movieFive.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = movieTitles[4].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + movieTitles[4].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + movieTitles[4].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + movieTitles[4].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + moviePara[4]
            modal.querySelector('img').src = (movieTitles[4].image).slice(0, movieTitles[4].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }


        movieSix.onclick = function() {
            modal.style.display= 'block'
            
            modal.querySelector('h2').innerText = movieTitles[5].fullTitle
            modal.querySelector('#releaseDate').innerText = 'Release Date:  ' + movieTitles[5].year
            modal.querySelector('#castCrew').innerText = 'Crew:  ' + movieTitles[5].crew
            modal.querySelector('#Rating').innerHTML = 'Rating:  ' + movieTitles[5].imDbRating + ' / 10 ' +'<i class="fa-solid fa-star"></i>'
            modal.querySelector('p').innerText = 'Plot:  ' + moviePara[5]
            modal.querySelector('img').src = (movieTitles[5].image).slice(0, movieTitles[5].image.indexOf("_")+1)+'_V1_Ratio0.6762_AL_'
        }
    }


}




