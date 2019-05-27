export const articleReducer=(state, action)=> {
    if (!state) {
        state = {
            coverList: [] ,
            orderChange:false,
            itemChange:false
        }
    }
    return state;
};