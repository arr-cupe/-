<template>
  <div class="box">
    <div class="wrap">
      <h3>登录</h3>
      <input type="text" name="" id="int1" v-model="user.username"/><br />
      <input type="password" name="" id="int" v-model="user.password"/><br />
      <button @click="login">登录</button>
    </div>
  </div>
</template>
<script>
import { reqLogin } from "../../util/request";
import {mapActions,mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters({
            list:'login/list'
        })
    },
  components: {},
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
      ...mapActions({
          requestRoleList:'login/requestRoleList'
      }),
    login() {
      reqLogin(this.user).then(res=>{
          if(res.data.code==200){
              this.requestRoleList(res.data.list);
              this.$router.push("/index");
          }else{
              alert(res.data.msg);
          }
      });
    },
  },
};
</script>
<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, rgb(86, 52, 67), rgb(47, 61, 95));
}
.wrap {
  width: 400px;
  height: 300px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  border-radius: 15px;
}
h3 {
  margin-top: 55px;
}
.wrap input {
  width: 200px;
  margin-top: 15px;
  height: 23px;
  border-radius: 5px;
  border: none;
  border: 1px solid grey;
  padding-left: 6px;
  margin-bottom: 5px;
}
.wrap button {
  width: 200px;
  height: 30px;
  margin-top: 15px;
  color: white;
  background-color: rgb(64, 158, 255);
  border-radius: 5px;
}
</style>