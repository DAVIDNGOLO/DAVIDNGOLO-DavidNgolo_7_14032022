import { createStore } from "vuex";

const axios = require("axios").default;
const instance = axios.create({
  baseURL: "http://localhost:5500/api",
});
let user = localStorage.getItem("user");
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  } catch (ex) {
    user = {
      userId: -1,
      token: "",
    };
  }
}

//create new store instance
const store = createStore({
  state: {
    status: "",
    user: {
      id: null,
      token: null,
    },
    userInfos: {
      email: null,
      pseudo: null,
    },
    feeds: [],
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      axios.defaults.headers.common["Authorization"] = user.token;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      console.log(userInfos);
      state.userInfos = userInfos;
    },
    posts: function (state, posts) {
      state.posts = posts;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: "",
      };
      localStorage.removeItem("user");
    },
    feeds: function (state, feeds) {
      state.feeds = feeds.map((f) => ({
        ...f,
        canUpdate: false,
      }));
    },
    like: function () {},
  },
  actions: {
    login: ({ commit, dispatch }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/auth/login", userInfos)
          .then(function (response) {
            commit("setStatus", "");
            commit("logUser", response.data);
            dispatch("getUserInfos", response.data.userId);
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_login");
            reject(error);
          });
      });
    },
    createAccount: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        instance
          .post("/auth/signup", userInfos)
          .then(function (response) {
            commit("setStatus", "created");
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_create");
            reject(error);
          });
      });
    },
    getUserInfos: ({ commit }, id) => {
      instance
        .get(`/auth/infos/${id}`)
        .then(function (response) {
          console.log(response);
          commit("userInfos", response.data);
        })
        .catch(function () {});
    },
    sendFeed: ({ commit, dispatch }, post) => {
      console.log(post);
      instance
        .post("/posts", post, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          commit("setStatus", response.data);
          dispatch("getFeeds");
        })
        .catch(function () {});
    },
    modifyPost: ({ commit, dispatch }, post) => {
      instance
        .put(`/posts/${post.id}`, post, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          commit("setStatus", response.data);
          dispatch("getFeeds");
        });
    },
    deletePost: ({ commit, dispatch }, id) => {
      instance.delete(`/posts/${id}`).then((response) => {
        commit("setStatus", response.data);
        dispatch("getFeeds");
      });
    },
    getFeeds: ({ commit }) => {
      instance
        .get("/posts")
        .then(function (response) {
          commit("feeds", response.data);
        })
        .catch(function () {});
    },
    createLike: ({ commit, dispatch }, params) => {
      return new Promise((resolve, reject) => {
       instance
        .post(`/posts/${params.postId}/like`, {
          userId: params.userId,
          likes: -1
        })
        .then((response) => {
          commit("setStatus", response.data);
          dispatch("getFeeds");
          resolve(response);
        })
        .catch((error) => {reject(error);});
        
      })
    },
  
  },
});

export default store;
