const songs = [
    {
        name: 'Faded',
        artist: 'Alan Walker',
        path: './Assets/Songs/Alan Walker - Faded.mp3',
        duration: '3:32',
        coverPath: '/'
    },
    {
        name: 'Closer',
        artist: 'Chainsmokers',
        path: './Assets/Songs/Closer (The Chainsmokers) Ft.Halsey(NewMrjatt.Com).mp3',
        duration: '3:32',
        coverPath: '/'
    },
    {
        name: 'Dusk till Down',
        artist: 'Zyan Malik',
        path: './Assets/Songs/Dusk Till Dawn - Zayn Malik-(Mp3Sun.Com)(0).mp3',
        duration: '3:32',
        coverPath: '/'
    },
    {
        name: 'Friends',
        artist: 'Unknown',
        path: './Assets/Songs/FRIENDS.mp3',
        duration: '3:32',
        coverPath: '/'
    },
    {
        name: 'Good life',
        artist: 'Unknown',
        path: './Assets/Songs/Good Life-(MirchiFun.com).mp3',
        duration: '3:32',
        coverPath: '/'
    },
    {
        name: 'kiss you',
        artist: 'one Direction',
        path: './Assets/Songs/One_Direction_-_Kiss_You.mp3',
        duration: '3:32',
        coverPath: '/'
    },
    {
        name: 'Wolves',
        artist: 'selena Gomez and Mashmello',
        path: './Assets/Songs/One_Direction_-_Kiss_You.mp3',
        duration: '3:32',
        coverPath: '/'
    },
    {
        name: 'Story of my life',
        artist: 'One Direction',
        path: './Assets/Songs/Story_Of_My_Life_AnyMaza.Com.mp3',
        duration: '3:32',
        coverPath: '/'
    },
]


const trackContainer = document.querySelector('.playlist-tracks')
const playPauseBtn = document.querySelector('#masterPlayBtn')
const previousBtn = document.querySelector('#masterPrivious')
const nextBtn = document.querySelector('#masterNext')
const seekBar = document.querySelector('#seek-bar')
const playlistplayBtn = document.querySelector('.playlist-buttons > i')


trackContainer.innerHTML = ''
songs.forEach((song, index) => {
    trackContainer.innerHTML += `<div class="track" id=${index}>
    <i class="ri-play-fill"></i>
    <img src=${song.coverPath} alt="cover">
    <h5>${song.name} </h5>
    <small>${song.artist}</small>
    <small>${song.duration}</small>
    </div>`
})


let songIndex = 0;
let audio = new Audio(songs[songIndex].path)


function playSong() {
    if (audio.played) {
        audio.pause()
    }
    audio = new Audio(songs[songIndex].path)
    audio.play()
    masterplayInfo()
    playPauseBtn.classList.remove('ri-play-circle-fill')
    playPauseBtn.classList.add('ri-pause-circle-fill')
}



playPauseBtn.addEventListener('click', () => {
    if (audio.paused || audio.currentTime <= 0) {
        audio.play();
        playPauseBtn.classList.remove('ri-play-circle-fill')
        playPauseBtn.classList.add('ri-pause-circle-fill')
        
    } else {
        audio.pause()
        playPauseBtn.classList.remove('ri-pause-circle-fill')
        playPauseBtn.classList.add('ri-play-circle-fill')
    }

    setInterval(() => {
        seekBar.value = parseInt((audio.currentTime / audio.duration) * 100)
        if(audio.currentTime === audio.duration){
            songIndex++
            audio.currentTime = 0
            playSong()
        }
    }, 1000)
    
})


seekBar.addEventListener('change', () => {
    audio.currentTime = seekBar.value * audio.duration / 100
})


document.querySelectorAll('.track').forEach((track) => {
    track.addEventListener('click', () => {
        songIndex = track.id
        playSong()
        masterplayInfo()
    })
})

masterplayInfo()
function masterplayInfo() {
    document.querySelector('#playerCoverImg').src = songs[songIndex].coverPath
    document.querySelector('#playerSongName').textContent = songs[songIndex].name
    document.querySelector('#playerSongDiscription').textContent = songs[songIndex].artist
    
}


previousBtn.addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1
    } else {
        songIndex--
    }
    masterplayInfo()
    playSong()
})
nextBtn.addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0
    } else {
        songIndex++
    }
    masterplayInfo()
    playSong()
})

playlistplayBtn.addEventListener('click',() =>{
    songIndex = 0;
    playSong()
    playlistplayBtn.classList.remove('ri-play-circle-fill')
    playlistplayBtn.classList.add('ri-pause-circle-fill')
    
})





/// volume change
const volumeRange = document.querySelector('#volume')

volumeRange.addEventListener('change',()=>{
    audio.volume = volumeRange.value/100;
    if(volumeRange.value == 0){
        document.querySelector('#volumeIndicator').classList = ''
        document.querySelector('#volumeIndicator').classList.add('ri-volume-mute-fill')
    }else if(volumeRange.value <= 50){
        document.querySelector('#volumeIndicator').classList = ''
        document.querySelector('#volumeIndicator').classList.add('ri-volume-down-fill')
    }
    else if(volumeRange.value <= 100 ){
        document.querySelector('#volumeIndicator').classList = ''
        document.querySelector('#volumeIndicator').classList.add('ri-volume-up-fill')
        
    }
})
