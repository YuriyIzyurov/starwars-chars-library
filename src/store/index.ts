import {createStore} from "vuex";
import {homeModule} from "@/store/homeModule";

export default createStore({
    modules: {
        home: homeModule
    }
})
