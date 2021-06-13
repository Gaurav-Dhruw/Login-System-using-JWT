import {createStore} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import {reducer} from "./reducer";
import sessionStorage from "redux-persist/lib/storage/session";
import {combineReducers} from "redux";


const rootReducer= combineReducers({
   reducer
})


const pConfig={
    key:"root",
    storage:sessionStorage,
    whitelist:["reducer"]

}

const pReducer= persistReducer(pConfig,rootReducer);

const store= createStore(pReducer);
const persistor= persistStore(store)

export {store,persistor};