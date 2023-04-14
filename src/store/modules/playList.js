 const play = {
    state:{
        playList:[],
        currentIndex:0,
        isPlay:false
    },
    mutations:{
        SET_PALYLIST:(state,playlist)=>{
            state.playList = playlist
        },
        SET_CURRENTINDEX:(state,index)=>{
            state.currentIndex = index
        },
        SET_ISPLAY:(state,op)=>{
            state.isPlay =op
        }
    },
    actions:{}
} 
export default play