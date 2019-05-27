import {_get,_post,_delete}from '../Service/CoverService';
import {ADD_COVER_URL, DELETE_COVER_URL, GET_ALL_COVER_URL} from "../Service/BasicRequestPath";
const INIT_COVERS = 'INIT_COVERS';
const ADD_COVER = 'ADD_COVER';
const DELETE_COVER = 'DELETE_COVER';
const UPDATE_COVER = 'UPDATE_COVER';
const UPDATE_ALL_COVERS = 'UPDATE_ALL_COVERS';

export const coverReducer=(state, action)=>{
    if (!state) {
        state = {
            coverList: [] ,
            orderChange:false,
            itemChange:false,
            editModalVisible:false,
            editRecord:null
        }
    }
    switch (action.type) {
        case INIT_COVERS:
            return { coverList: action.coverList };
        case ADD_COVER:
            return {
                coverList: [...state.coverList, action.newCover]
            };
        case DELETE_COVER:
            return {
                coverList: action.coverList
            };
        case UPDATE_COVER:
            return{

            };
        case UPDATE_ALL_COVERS:
            return{
                coverList:action.coverList,
                orderChange:false,
                itemChange:false
            }
        default:
            return state
    }
}
export const initCovers = ()  =>{
    return dispatch=> {
            _get(GET_ALL_COVER_URL)
            .then(data => dispatch({
                    type: INIT_COVERS,
                    coverList: data,
                })
            )
    };
};

export const addCover = (body) => {
    return dispatch =>{
        _post(ADD_COVER_URL,body)
            .then(data=>dispatch({
                type:ADD_COVER,
                newCover:data,
            }))
    };
};

export const deleteCover = (coverId) => {
    return dispatch =>{
        _post(DELETE_COVER_URL+coverId)
            .then(data=>dispatch({
                type:DELETE_COVER,
                coverList:data,
            }))
    };
};
//[
//                     ...state.coverList.slice(0, action.commentIndex),
//                     ...state.coverList.slice(action.commentIndex + 1)
//                 ]