import { goodsCount, goodsList } from "../../utils/request";

const state = {
    goodsCount: 0,
    goodsList: [],
    page: 1,
    size: 2
};
const mutations = {
    muGoodsCount(state, num) {
        state.goodsCount = num
    },
    muGoodsList(state, arr) {
        state.goodsList = arr
    },
    muPage(state, num) {
        state.page = num
    }
};
const actions = {
    acGoodsCount(context) {
        goodsCount().then(res => {
            context.commit('muGoodsCount', res.data.list[0].total)
        })
    },
    acGoodsList(context, isAll = false) {
        let params = {
            page: context.state.page,
            size: context.state.size
        };
        // 是否获取全部信息
        if (isAll) {
            params.size = null;
        }
        goodsList(params).then(res => {
            let goodsList = res.data.list;
            if ((!goodsList || goodsList.length == 0) && params.page > 1) {
                context.commit('muPage', --params.page);
                context.dispatch('acGoodsList');
                return
            };
            if (!goodsList || goodsList.length == 0) {
                context.commit('muGoodsList', []);
            }
            context.commit('muGoodsList', goodsList)
        })
    },
    acPage(context, num) {
        context.commit('muPage', num)
    }
};
const getters = {
    goodsCount(state) {
        return state.goodsCount
    },
    goodsList(state) {
        return state.goodsList
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}