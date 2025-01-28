<template>
  <div class="user-login">
    <a href="https://formsmarts.com/form/22i4?via=f8s.com">
      <button class="sign-up-button" v-if="!isHidden">Sign Up</button>
    </a>

    <button class="login-button" v-if="!isHidden" @click="redirectToLoginPage('#/');">
      <font-awesome-icon :icon="['fas', 'user']" /> Login
    </button>
  </div>
  <div v-if="isHidden">
    <vsm-menu :menu="login_content" handler="clicked" ref="myloginRef">
      <template #default="{ item }">
        <div class="loginMenu">
          <li v-for="subItem in item.content" :key="subItem.id">
            <a v-bind:href="subItem.href" @click="vLogin">
              <span class="different">
                <span class="loginIcon">
                  <hr class="line" v-if="subItem.text == 'Logout'"/>
                  <font-awesome-icon :icon="subItem.icon" />
                </span>
                <span v-if="subItem.text == 'Logout'" @click="accessTokenManager.reset()">
                  {{ subItem.text }}
                </span> 
                <span v-else>
                  {{ subItem.text }}
                </span> 
              </span>
            </a>
          </li>
        </div>
      </template>
      <template #before-nav>
        <div class="this">
          <font-awesome-icon :icon="['fas', 'circle-user']" class="profile-icon"/>
        </div>
      </template>
    </vsm-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { redirectToLoginPage } from "../../errorInterceptor";
import { AccessTokenManager } from "../../utilities/auth";
import { useUserStore } from '../../utilities/user';

const userStore = useUserStore();
const accessTokenManager = AccessTokenManager.getInstance();

const myloginRef = ref();

const vLogin = () => {
  myloginRef.value.closeDropdown();
};

const isHidden = computed(() => {
  return userStore.loginHidden;
});

const login_content = ref([
  {
    get title() {
      return userStore.username;
    },
    dropdown: "dropdown-1",
    content: [
      { text: "My Profile", href: "#/members/profile.html", icon: ["fas", "user"] },
      { text: "Settings", href: "#/members/settings.html", icon: ["fas", "gear"] },
      {
        text: "Logout",
        href: "#/",
        icon: ["fas", "right-from-bracket"],
      },
    ],
  },
]);

defineExpose({ vLogin });
</script>

<style lang="scss" scoped>
@import "../../scss/main.scss";
$vsm-background: $menu-bar-bg;
@import "vue-stripe-menu/src/scss/index";

@media screen and (min-width: 1100px) {
  .loginMenu {
    width: 200px;
    padding: 25px;
    text-align: left;
  }
  .loginIcon {
    margin-right: 10%;
  }
  .different {
    color: #000000;
    margin: auto;
  }
  .different:hover {
    text-decoration: underline;
    text-decoration-color: white;
  }
  .line {
    margin: 20px;
  }
  .this {
    margin-left: 100px;
  }
}
</style>

<style scoped>
.login-button:hover {
  text-decoration: underline;
  text-decoration-color: white;
  border: none;
}
.login-button {
  background: none !important;
  border: none !important;
  padding: none !important;
}
.sign-up-button {
  display: inline-block;
  padding: none !important;
  margin-left: 30px;
}
.user-login {
  width: 300px;
  align-items: center;
  white-space: nowrap;
}

.sign-up-button {
  white-space: nowrap;
}

.profile-icon {
  position: absolute;
  top: 15px;
  left: 85px;
  font-size: 20px;
}
</style>
