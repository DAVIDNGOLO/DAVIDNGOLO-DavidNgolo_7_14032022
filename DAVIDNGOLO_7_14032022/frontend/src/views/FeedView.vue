<template>
  <div>
    <div class="header">
      <img alt="groupomania logo" src="../assets/icon-left-font.png" />
      <nav>
        <router-link to="/profilView">Profil </router-link>
      </nav>
    </div>
    <div class="welcome">
      <p>
        Bienvenue sur le Forum ! Ici, vous pouvez écrire et/ou partager avec vos
        collègues des articles sur des sujets qui vous intéressent.
      </p>
    </div>
    <!-- Create A Post-->
    <div class="imageContent">
      <form @submit.prevent="sendFeed" ref="form-feed">
        <div class="insertImage">
          <p class="textImage">Insérer Image</p>
          <input type="file" ref="file" class="imageInsert" id="file-input" />
        </div>
        <div class="contentTextButton">
          <div class="insertText">
            <input type="text" v-model="post.content" class="postUser" />
          </div>
          <div class="envoyer">
            <button type="submit">Envoyer</button>
          </div>
        </div>
      </form>
    </div>

    <div class="feed">
       <!-- afficher les posts -->
      <div v-for="(feed, i) in feeds" :key="i" class="feed-list">
        <div class="card">
          <div class="card-header">
            <img src="../assets/profile.jpeg" alt="" />
            <div class="user-infos">
              <h4>@{{ feed.username }}</h4>
              <small>Publié le {{ formatDate(feed.createdAt) }}</small>
            </div>
          </div>
          <div class="card-content">
            <div class="card-img">
              <img :src="feed.imagesUrl" alt="" v-if="!feed.canUpdate" />
              <div class="images-update" v-else>
                <img :src="feed.imagesUrl" alt="" />
                <input
                  type="file"
                  class="updateImage"
                  id="file-input-update"
                  @change="(e) => onChangeImage(e, feed)"
                />
              </div>
            </div>
             <!-- au clique / modifier -->
            <p v-if="!feed.canUpdate">{{ feed.content }}</p>
            <input type="text" v-model="feed.content" class="postUser" v-else />
          </div>
          <div class="card-footer">
            <span class="likes" v-on:click.once="onLikePost(feed.id)">
              <!-- image like -->
              {{ feed.likes }} likes
            </span>

            <div v-if="checkUserRole(feed.UserId)" class="update">
              <button
                type="button"
                v-on:click="feed.canUpdate = !feed.canUpdate"
                v-if="!feed.canUpdate"
                
                
              >
                modifier
              </button>
              <button type="button" 
              v-on:click="onUpdatePost(feed)" 
              
              
              >
                valider
              </button>
                            <button type="button" v-on:click="onDeletePost(feed.id)" class="delete">
                supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  width: 70%;
  min-height: 300px;
  background: #fff;
  border: thin solid lightgrey;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
.card-header {
  min-height: 100px;
  border-bottom: thin solid lightgray;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.card-header > img {
  max-width: 60px;
}
.card-header > .user-infos {
  text-align: left;
}
.card-header > .user-infos > h4 {
  line-height: 0px;
}

/*.card-content {
}
.card-img {
}*/
.card-footer {
  min-height: 100px;
  border-top: thin solid lightgray;
  display: flex;
  align-items: center;
  margin-top: 1rem;
  justify-content: space-around;
}

.imageContent {
  display: flex;
  justify-content: space-around;
}
form {
  display: flex;
  margin-top: 2rem;
}

.postUser {
  height: 4rem;
  width: 100%;
}
.feed {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 100%;
}
.feed-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
}
span.likes {
  cursor: pointer;
}
</style>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "FeedView",
  async mounted() {
    if (this.user.token) {
      await this.getFeeds;
      console.log(this.feeds);
      return;
    }
    
  },
 
  methods: {
    
    async sendFeed() {
     
      if (this.user.token) {
        //Récupération de l'image
        const formData = new FormData();
        formData.append(
          "image",
          this.$refs.file.files[0],
          this.$refs.file.files[0].name
        );
        console.log(this.post);
        this.$store.dispatch("sendFeed", {
          ...this.post,
          image: formData.get("image"),
          userId: this.user.userId,
          username: this.$store.state.userInfos.pseudo,
        });

        return;
      }
      alert("Veuillez vous connecter");
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("FR-fr", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },

    checkUserRole (UserId) {
      if(this.user.userId === UserId || this.userInfos.roles === 'SUPER_USER') {
        return true;
      }
      return false;
    },

    onChangeImage(e, post) {
      console.log(post);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file, file.name);
      this.postToUpdate.image = formData.get("image");
    },
    
    onLikePost(postId) {
      
      //if(count === 0){
        this.$store.dispatch("createLike", { postId, userId: this.userInfos.id });
        //count++;
      //}
      /*else{
        this.$store.dispatch("createLike", { postId, userId: this.userInfos.id });
        count--;
      }*/
      
      
    },
    onUpdatePost(post) {
      this.$store.dispatch("modifyPost", {
        ...this.postToUpdate,
        id: post.id,
        imagesUrl: post.imagesUrl,
        content: post.content,
      });
    },
    onDeletePost(id) {
      this.$store.dispatch("deletePost", id);
    },
  },

  data() {
    return {
      post: {
        userId: null,
        username: "",
        content: "",
        likes: 0,
        image: "",
      },
      postToUpdate: {
        image: "",
      },
    };
    
  },
  computed: {
    ...mapState({
      feeds: "feeds",
      user: "user",
      userInfos: "userInfos",
    }),
    ...mapActions({
      getFeeds: "getFeeds",
    }),
  },
};
</script>
