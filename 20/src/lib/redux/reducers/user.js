const init = {
    vkData: null
}

export const userReducer = (state = init, action) => {
    const {type, payload} = action
    switch(type){
        case 'user/setVkData':
            return {...state, vkData: payload}
        default:
            return state
    }
}