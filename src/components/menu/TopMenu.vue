<template>
  <div class="fixed-header">
    <!-- Possibly change the name of this from logo-header because the logo doesn't live here -->
    <div class="header">
      <!-- <div class="header-text"> 
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" /> Search
        </div>
        <div class="logo-text">
          <font-awesome-icon :icon="['fas', 'globe']" />
          Language
        </div> -->
    </div>

    <div class="top-menu">
      <div class="content" @click="myFunc">
        <contentMenu ref="contentRef" />
      </div>
      <div class="login" @click="closeFunc">
        <loginMenu ref="loginRef"></loginMenu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import contentMenu from "./ContentMenu.vue";
import loginMenu from "./LoginMenu.vue";
import { ref } from "vue";

const loginRef = ref();

const myFunc = () => {
  if (window.innerWidth > 1024) {
    loginRef.value.vLogin();
  }
};

const contentRef = ref();

const closeFunc = () => {
  contentRef.value.vTest();
};
</script>

<style lang="scss">
@import "../../scss/main.scss";
$vsm-background: $menu-bar-bg;
@import "vue-stripe-menu/src/scss/index";

@media screen and (min-width: 1100px) {
  // Local css
  .header {
    background: $menu-bar-bg;
    float: right;
    align-items: center;
    width: 100%;
    height: 20px !important;
  }
  #quick {
    float: left;
    padding: 8px 16px;
    margin: 10px;
  }
  .top-menu {
    background-color: $header-bg !important;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 8px;
    display: flex;
    margin-top: 20px;
    position: absolute;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.05); 
  }
  .content {
    align-items: center;
    width: fit-content;
  }
  .login {
    align-items: center;
    width: fit-content;
    margin-left: -60px;
    span {
      font-size: 16px;
    }
  }
}

// This is all mobile stuff don't touch yet
@media screen and (max-width: 1100px) and (min-width: 820px) {
  .top-menu {
    background-color: $header-bg !important;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .content {
    align-items: center;
    width: 100%;
  }
  .login {
    display: none;
  }
  .vsm-root {
    background-color: $header-bg;
    padding-top: 8px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.05);
  }
  .vsm-mob-content {
    width: 62%;
    left: 37.5%;
    align-items: right;
  }
  .vsm-mob-close {
    margin-left: 20px;
  }
  .vsm-mob-content__wrap {
    white-space: normal;
  }
  .mobile-content {
    background-color: $menu-bar-bg;
    align-items: right;
    max-height: 100vh;
    overflow: auto;
    min-height: 200px;
    padding: 30px;
  }
  .vsm-mob-close:before {
    background: black;
  }
  .vsm-mob-close:after {
    background: black;
  }
  .vsm-mob-line {
    background: black;
  }
  .vsm-mob-show {
    display: block;
  }
  .vsm-mob-hide {
    display: none;
  }
  .vsm-mob-full {
    flex-grow: 1;
    background-color: $header-bg;
    margin-left: -40%;
  }
  .vsm-mob-container {
    margin-right: 7.5%;
  }
  .user-login {
    display: flex;
  }
  .header {
    background: $menu-bar-bg;
    height: 20px;
  }
  .header-text {
    padding-right: 10px;
  }
  .user-login {
    display: none;
  }
  .mob-nav-items:hover {
    text-decoration: underline;
    text-decoration-color: white;
  }
  .mob-item {
    padding: 10px;
    color: black;
    font-size: larger;
    font-weight: bold;
  }
  .mob-item:hover {
    text-decoration: underline;
    text-decoration-color: white;
    color: black;
    cursor: pointer;
  }
  .mobile-item {
    color: black;
    margin-left: 2.5%;
  }
  .mobile-dropdown {
    text-align: left;
    padding: 0px;
    margin: 0px;
  }
  .mobile-carrot {
    float: right;
    pointer-events: none;
  }
  .different_color {
    color: #000000;
  }
  .different_color:hover {
    text-decoration: underline;
    text-decoration-color: white;
  }
  .sub_header {
    font-weight: bold;
  }
  .mob_flav_text {
    margin-left: 2.5%;
  }
  hr.color_line {
    height: 1px;
    border: none;
    background-color: gray;
  }
}

@media screen and (max-width: 819px) {
  .top-menu {
    background-color: $header-bg !important;
    align-items: center;
    justify-content: right;
    width: 100%;
  }
  .header {
    height: 20px;
  }
  .content {
    align-items: center;
    width: 100%;
    justify-content: right;
  }
  .login {
    display: none;
  }
  .vsm-root {
    background-color: $header-bg;
    padding-top: 8px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.05);
  }
  .vsm-mob-content {
    width: 100%;
    align-items: right;
  }
  .vsm-mob-close {
    margin-left: 20px;
  }
  .vsm-mob-content__wrap {
    white-space: normal;
  }
  .mobile-content {
    background-color: $menu-bar-bg;
    align-items: right;
    max-height: 100vh;
    overflow: auto;
    min-height: 200px;
    padding: 30px;
  }
  .vsm-mob-close:before {
    background: black;
  }
  .vsm-mob-close:after {
    background: black;
  }
  .vsm-mob-line {
    background: black;
  }
  .vsm-mob-show {
    display: block;
  }
  .vsm-mob-hide {
    display: none;
  }
  .vsm-mob-full {
    flex-grow: 1;
    background-color: $header-bg;
    margin-left: 0%;
  }
  .user-login {
    display: flex;
  }
  .header {
    background: $menu-bar-bg;
  }
  .header-text {
    padding-right: 10px;
  }
  .user-login {
    display: none;
  }
  .mob-nav-items:hover {
    text-decoration: underline;
    text-decoration-color: white;
  }
  .mob-item {
    padding: 10px;
    color: black;
    font-size: larger;
    font-weight: bold;
  }
  .mob-item:hover {
    text-decoration: underline;
    text-decoration-color: white;
    color: black;
  }
  .mobile-item {
    color: black;
    margin-left: 2.5%;
  }
  .mobile-dropdown {
    text-align: left;
    padding: 0px;
    margin: 0px;
  }
  .mobile-carrot {
    float: right;
    pointer-events: none;
  }
  .different_color {
    color: #000000;
  }
  .different_color:hover {
    text-decoration: underline;
    text-decoration-color: white;
  }
  .sub_header {
    font-weight: bold;
    margin-top: 5%;
  }
  .mob_flav_text {
    margin-left: 2.5%;
  }
  hr.color_line {
    height: 1px;
    border: none;
    background-color: gray;
  }
}
</style>

<style scoped>
.fixed-header {
  position: fixed;
  z-index: 1001;
  top: 0;
  left: 0;
  right: 0;
}
</style>
