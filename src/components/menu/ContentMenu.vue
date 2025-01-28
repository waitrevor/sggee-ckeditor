<template>
  <vsm-menu :menu="menu" handler="clicked" ref="myVsmRef">
    <!-- This is where the main menu content lives -->

    <template #default="{ item }">
      <div class="menu-contents list-unstyled">
        <div class="flavor-text">
          <h3>{{ item.flav_header }}</h3>
          <div>{{ item.flavtext }}</div>
          <br />
          <p v-if="item.icon">
            Why not become a part of our community? Explore our
            <a href="#/about_us/membership.html">
              <span class="different_color"><u>Membership</u></span>
            </a>
            page to join us for the first time, or renew your existing
            membership.
          </p>
        </div>
        <!-- Closing div for the flavor-text -->

        <div class="column-left">
          <h3>{{ item.left_column_header }}</h3>
          <li v-for="subItem in item.content_left" :key="subItem.id">
            <a v-bind:href="subItem.href" @click="vTest">
              <span class="different_color"> {{ subItem.text }}</span>
            </a>
          </li>
        </div>
        <!-- Closing div for the column-left -->

        <div class="column-right">
          <h3>
            {{ item.right_column_header }}
          </h3>
          <li v-for="subItem in item.content_right" :key="subItem.id">
            <a v-bind:href="subItem.href" @click="vTest">
              <span class="different_color">{{ subItem.text }}</span>
            </a>
          </li>
        </div>
        <!--  closing div for the column-right -->
        <div v-if="item.icon">
          <template v-if="userStore.username">
            <font-awesome-icon :icon="['fas', 'lock-open']" size="2xl" />
          </template>
          <template v-else>
            <font-awesome-icon :icon="['fas', 'lock']" size="2xl" />
          </template>
          
        </div>
      </div>
    </template>
    <!-- Closing template for the main menu content -->

    <template #before-nav>
      <li class="vsm-mob-full">
        <a href="/#">
          <img
            src="/images/New_Logo2.png"
            alt="Main Logo"
            height="90"
            contain
            class="logo-image"
          />
        </a>
      </li>
    </template>

    <template #after-nav>
      <vsm-mob ref="myVsmMobRef">
        <div class="mobile-content">
          <div class="mobile-dropdown">
            <div
              class="mob-item"
              role="button"
              @click="
                (showMemberResources = !showMemberResources),
                  (showMembership = false),
                  (showPublicResources = false),
                  (showUser = false)
              "
            >
              {{ menu[0].title }}
              <span class="mobile-carrot" v-if="!showMemberResources">
                <font-awesome-icon :icon="['fas', 'caret-down']" />
              </span>
              <span class="mobile-carrot" v-if="showMemberResources">
                <font-awesome-icon :icon="['fas', 'caret-up']" />
              </span>
            </div>
            <div class="sub_header" v-if="showMemberResources">
              {{ menu[0].flav_header }}
            </div>
            <div class="mob_flav_text" v-if="showMemberResources">
              {{ menu[0].flavtext }}
              <!-- <div id="dots"></div> -->
              <span id="more">
                Why not become a part of our community? Explore our
                <a href="#/about_us/membership.html">
                  <span class="different_color"><u>Membership</u></span>
                </a>
                page to join us for the first time, or renew your existing
                membership.
              </span>
              <div
                id="dots"
                style="
                  text-align: center;
                  filter: drop-shadow(#00afaa 0rem 0rem 100px);
                  box-shadow: 0rem -1rem 15px #00afaa;
                "
              >
                <button
                  style="
                    border: none;
                    padding: 0.1em 0.1em;
                    background-color: lightblue;
                    width: 100px;
                  "
                  @click="myFunction"
                  id="myBtn"
                >
                  Read more
                </button>
              </div>
            </div>
            <hr class="color_line" v-if="showMemberResources" />
            <div class="sub_header" v-if="showMemberResources">
              {{ menu[0].left_column_header }}
              <span class="mobile-carrot" v-if="showMemberResources">
                <template v-if="userStore.username">
                  <font-awesome-icon :icon="['fas', 'lock-open']" size="xl" />
                </template>
                <template v-else>
                  <font-awesome-icon :icon="['fas', 'lock']" size="xl" />
                </template>
              </span>
            </div>
            <div
              class="mobile-item"
              v-if="showMemberResources"
              v-for="item in menu[0].content_left"
            >
              <a v-bind:href="item.href" @click="vMob">
                <span class="different_color"> {{ item.text }}</span>
              </a>
            </div>
            <hr class="color_line" v-if="showMemberResources" />
            <div class="sub_header" v-if="showMemberResources">
              {{ menu[0].right_column_header }}
              <span class="mobile-carrot" v-if="showMemberResources">
                <template v-if="userStore.username">
                  <font-awesome-icon :icon="['fas', 'lock-open']" size="xl" />
                </template>
                <template v-else>
                  <font-awesome-icon :icon="['fas', 'lock']" size="xl" />
                </template>
              </span>
            </div>
            <div
              class="mobile-item"
              v-if="showMemberResources"
              v-for="item in menu[0].content_right"
            >
              <a v-bind:href="item.href" @click="vMob">
                <span class="different_color"> {{ item.text }}</span>
              </a>
            </div>
          </div>
          <hr />
          <div class="mobile-dropdown">
            <div
              class="mob-item"
              role="button"
              @click="
                (showMembership = !showMembership),
                  (showMemberResources = false),
                  (showPublicResources = false),
                  (showUser = false)
              "
            >
              {{ menu[1].title }}
              <span class="mobile-carrot" v-if="!showMembership">
                <font-awesome-icon :icon="['fas', 'caret-down']" />
              </span>
              <span class="mobile-carrot" v-if="showMembership">
                <font-awesome-icon :icon="['fas', 'caret-up']" />
              </span>
            </div>
            <div class="sub_header" v-if="showMembership">
              {{ menu[1].flav_header }}
            </div>
            <div class="mob_flav_text" v-if="showMembership">
              {{ menu[1].flavtext }}
            </div>
            <hr class="color_line" v-if="showMembership" />
            <div class="sub_header" v-if="showMembership">
              {{ menu[1].left_column_header }}
            </div>
            <div
              class="mobile-item"
              v-if="showMembership"
              v-for="item in menu[1].content_left"
            >
              <a v-bind:href="item.href" @click="vMob">
                <span class="different_color"> {{ item.text }}</span>
              </a>
            </div>
            <hr class="color_line" v-if="showMembership" />
            <div class="sub_header" v-if="showMembership">
              {{ menu[1].right_column_header }}
            </div>
            <div
              class="mobile-item"
              v-if="showMembership"
              v-for="item in menu[1].content_right"
            >
              <a v-bind:href="item.href" @click="vMob">
                <span class="different_color"> {{ item.text }}</span>
              </a>
            </div>
          </div>
          <hr />
          <div class="mobile-dropdown">
            <div
              class="mob-item"
              role="button"
              @click="
                (showPublicResources = !showPublicResources),
                  (showMemberResources = false),
                  (showMembership = false),
                  (showUser = false)
              "
            >
              {{ menu[2].title }}
              <span class="mobile-carrot" v-if="!showPublicResources">
                <font-awesome-icon :icon="['fas', 'caret-down']" />
              </span>
              <span class="mobile-carrot" v-if="showPublicResources">
                <font-awesome-icon :icon="['fas', 'caret-up']" />
              </span>
            </div>
            <div class="sub_header" v-if="showPublicResources">
              {{ menu[2].flav_header }}
            </div>
            <div class="mob_flav_text" v-if="showPublicResources">
              {{ menu[2].flavtext }}
            </div>
            <hr class="color_line" v-if="showPublicResources" />
            <div class="sub_header" v-if="showPublicResources">
              {{ menu[2].left_column_header }}
            </div>
            <div
              class="mobile-item"
              v-if="showPublicResources"
              v-for="item in menu[2].content_left"
            >
              <a v-bind:href="item.href" @click="vMob">
                <span class="different_color"> {{ item.text }}</span>
              </a>
            </div>
            <hr class="color_line" v-if="showPublicResources" />

            <div class="sub_header" v-if="showPublicResources">
              {{ menu[2].right_column_header }}
            </div>
            <div
              class="mobile-item"
              v-if="showPublicResources"
              v-for="item in menu[2].content_right"
            >
              <a v-bind:href="item.href" @click="vMob">
                <span class="different_color"> {{ item.text }}</span>
              </a>
            </div>
          </div>
          <hr />
          <a href="https://formsmarts.com/form/22i4?via=f8s.com">
            <button class="sign-up-button" v-if="!isHidden">Sign Up</button>
          </a>

          <button
            class="login-button"
            v-if="!isHidden"
            @click="
              redirectToLoginPage();
              myVsmMobRef.closeDropdown();
            "
          >
            <font-awesome-icon :icon="['fas', 'user']" /> Login
          </button>
          <div class="mobile-dropdown" v-if="isHidden">
            <div
              class="mob-item"
              role="button"
              @click="
                (showUser = !showUser),
                  (showMembership = false),
                  (showMemberResources = false),
                  (showPublicResources = false)
              "
            >
              <font-awesome-icon :icon="['fas', 'circle-user']" />{{
                " " + login_content[0].title
              }}
              <span class="mobile-carrot" v-if="!showUser">
                <font-awesome-icon :icon="['fas', 'caret-down']" />
              </span>
              <span class="mobile-carrot" v-if="showUser">
                <font-awesome-icon :icon="['fas', 'caret-up']" />
              </span>
            </div>
            <div
              class="login-item"
              v-if="showUser"
              v-for="item in login_content[0].content"
            >
              <hr class="color_line" v-if="item.text == 'Logout'" />
              <span class="userIcons">
                <font-awesome-icon :icon="item.icon" />
              </span>
              <a v-bind:href="item.href" @click="vMob">
                <span
                  class="different_color"
                  @click="accessTokenManager.reset()"
                  >{{ item.text }}</span
                >
              </a>
            </div>
          </div>
        </div>
      </vsm-mob>
    </template>
  </vsm-menu>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { redirectToLoginPage } from "../../errorInterceptor";
import { AccessTokenManager } from "../../utilities/auth";
import { useUserStore } from "../../utilities/user";

const userStore = useUserStore();
const accessTokenManager = AccessTokenManager.getInstance();

let showMemberResources = ref(false);
let showMembership = ref(false);
let showPublicResources = ref(false);
let showUser = ref(false);

const myVsmRef = ref();

const myFunction = () => {
  // This is the read more button function
  let dots = document.getElementById("dots")!;
  let moreText = document.getElementById("more")!;
  var btnText = document.getElementById("myBtn")!;

  if (moreText.style.display === "inline") {
    dots.style.textAlign = "center";
    dots.style.filter = "drop-shadow(#00afaa 0rem 0rem 100px)";
    dots.style.boxShadow = "0rem -1rem 15px #00afaa";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.textAlign = "center";
    dots.style.filter = "none";
    dots.style.boxShadow = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
};

const vTest = () => {
  myVsmRef.value.closeDropdown();
};

const myVsmMobRef = ref();
const vMob = () => {
  myVsmMobRef.value.closeDropdown();
  showMemberResources.value = false;
  showMembership.value = false;
  showPublicResources.value = false;
  showUser.value = false;
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

const menu = ref([
  {
    title: "Member Resources",
    dropdown: "dropdown-1",
    flav_header: "Members-Only Resources",
    flavtext:
      "SGGEE is dedicated to preserving the genealogical heritage of Germans from Russian Poland and Volhynia, with additional support for related regions.",
    left_column_header: "General Member Resources",
    content_left: [
      {
        id: 1,
        text: "Member's Home Page",

        href: "#/members/MembersIndex.html",
      },
      {
        id: 2,
        text: "Maps",

        href: "#/members/maps_and_villages.html",
      },
      {
        id: 3,
        text: "Journals",

        href: "#/members/journals/journals.html",
      },
      {
        id: 4,
        text: "Member Contact",

        href: "#/members/membership/search",
      },
      {
        id: 5,
        text: "Virtual SGGEE Presentations",
        href: "#/members/virtual_SGGEE.html",
      },
      { 
        id: 6,
        text: "Database Index",
        href: "#/research/DatabaseIndex.html",
      }
    ],
    right_column_header: "Member Area-Databases",
    icon: true,
    content_right: [
      {
        id: 1,
        text: "Master Pedigree",
        icon: true,
        href: "#/members/genealogy/search",
      },
      {
        id: 2,
        text: "Lodz Trinity",
        icon: true,
        href: "#/members/lodz/search",
      },
      {
        id: 3,
        text: "Lublin Trinity",
        href: "#/members/lublin_records/English/lublinsearchinstruct.html",
      },
      {
        id: 4,
        text: "Parish Records",
        href: "#/members/pri_guide.html",
      },
      {
        id: 5,
        text: "Volhynia Indexes",
        href: "#/members/Volhynia_1900-18.html",
      },
      {
        id: 6,
        text: "St. Petersburg Route of Pastor",
        href: "#/members/StPeteByRoute.html",
      }
    ],
  },
  {
    title: "Membership",
    dropdown: "dropdown-2",
    flav_header: "Why SGGEE?",
    flavtext:
      "This web site is devoted to the study of those people with German ancestry (most often of the Lutheran, Baptist, or Moravian Brethren faiths) who lived in present-day Poland and northwestern Ukraine.",
    left_column_header: "Why Membership?",
    content_left: [
      {
        id: 1,
        text: "Membership Information",
        href: "#/about_us/membership.html",
      },
      {
        id: 2,
        text: "Sample Journal",
        href: "#/about_us/sample_journal.html",
      },
      {
        id: 3,
        text: "About Members' Area",
        href: "#/about_us/about_members.html",
      },
      { id: 4, text: "Become a Member", href: "#/about_us/membership.html" },
    ],
    right_column_header: "Communicate",
    content_right: [
      { id: 1, text: "News", href: "#/communicate/news.html" },
      {
        id: 2,
        text: "Contacts",
        href: "#/about_us/contacts.html",
      },
      {
        id: 3,
        text: "Mailing List",
        href: "#/communicate/mailing_list.html",
      },
      {
        id: 4,
        text: "Convention News",
        href: "#/convention/convention_news.html",
      },
      { id: 5, text: "Credits", href: "#/about_us/credits.html" },
      { id: 6, text: "Who We Are", href: "#/about_us/who.html" }
    ],
  },
  {
    title: "Public Resources",
    dropdown: "dropdown-3",
    flav_header: "For Genealogists",
    flavtext:
      "If you have knowledge that your German ancestors lived for even a short time in one of the lands noted above, then this web site, and the Society that supports it, will be of interest to you.",
    left_column_header: "Databases and Resources",
    content_left: [
      {
        id: 1,
        text: "Database Index",
        href: "#/research/DatabaseIndex.html",
      },
      {
        id: 2,
        text: "VKP Lutheran Parishes",
        href: "#/StPeteMember.html",
      },
      {
        id: 3,
        text: "Breyer Maps",
        href: '#/research/SGGEEMaps.html'
      },
      {
        id: 4,
        text: "Other Database Information",
        href: "#/research/databases.html",
      },
      {
        id: 5,
        text: "Related Societies",
        href: "#/other/related_societies.html",
      },
      {
        id: 6,
        text: "Other sites of interest",
        href: "#/other/links.html",
      },
    ],
    right_column_header: "Misc. Resources",
    content_right: [
      {
        id: 1,
        text: "Genealogy Software",
        href: "#/other/software.html",
      },
      {
        id: 2,
        text: "Parishes",
        href: "#/members/public_pri.html",
      },
      { id: 3, text: "Archives", href: "#/research/archive.html" },
      {
        id: 4,
        text: "Research Aids",
        href: "#/research/research_aids.html",
      },
      {
        id: 5,
        text: "Translation Aids",
        href: "#/research/translation_aids.html",
      },
      {
        id: 6,
        text: "Villages and Maps",
        href: "#/research/village_maps.html",
      },
      {
        id: 7,
        text: "Search Page",
        href: "#/misc/search_page.html",
      },
      
    ],
  },
]);
defineExpose({ vTest });
</script>

<style lang="scss">
@import "../../scss/main.scss";
@import "../../scss/variables.scss";
$vsm-background: $menu-bar-bg;
@import "vue-stripe-menu/src/scss/index";

@media screen and (min-width: 1100px) {
  // VSM scss
  .vsm-menu {
    color: #000000;
    height: fit-content;
    width: fit-content;
  }
  
  .vsm-link-container {
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
  }
  .vsm-link:hover {
    text-decoration: underline;
    text-decoration-color: black;
    background-color: $header-bg;
    color: black !important;
    cursor: pointer !important;
  }

  .vsm-active {
    text-decoration: underline !important;
    text-decoration-color: black !important;
  }
  .vsm-link {
    color: $text-color !important;
    font-weight: bold !important;
    font-size: 17px !important;
    padding-inline: 10px !important;
  }
  .vsm-full-hide {
    display: none;
  }
  // Local css
  li {
    list-style-type: none;
  }
  #quick {
    float: left;
    padding: 8px 16px;
    border: solid 3px rgba(143, 186, 146, 1);
    margin: 10px;
  }
  .menu-contents {
    width: 1100px;
    padding: 25px;
    background: $menu-bar-bg;
    display: flex;
    justify-content: space-between;
  }
  .flavor-text {
    text-align: left;
    flex-basis: 35%;
  }
  .column-left {
    text-align: left;
    flex-basis: 30%;
  }
  .column-right {
    text-align: left;
    flex-basis: 30%;
  }
  .different_color {
    color: #000000;
  }
  .different_color:hover {
    text-decoration: underline;
    text-decoration-color: white;
  }

  .iconcolor {
    padding: 7.5px;
  }
}

// This is all mobile stuff don't touch yet
@media screen and (max-width: 1100px) and (min-width: 820px) {
  #more {
    display: none;
  }
  .vsm-root {
    background-color: $header-bg;
    padding-top: 8px;
    margin-top: 20px;
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
    left: 0;
    position: relative;
  }
  .vsm-mob-container {
    margin-right: 7.5%;
  }
  .user-login {
    display: flex;
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
  .login-item {
    color: black;
    margin-left: 2.5%;
    padding: 1%;
  }
  .mobile-dropdown {
    text-align: left;
    padding: 10px;
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
  .userIcons {
    margin-right: 10px;
  }
}

@media screen and (max-width: 819px) {
  #more {
    display: none;
  }
  .vsm-root {
    background-color: $header-bg;
    padding-top: 8px;
    margin-top: 20px;
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
    left: 0;
    position: relative;
  }
  .user-login {
    display: flex;
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
    cursor: pointer;
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
  .userIcons {
    margin-right: 10px;
  }
}
</style>

<style scoped>
hr {
  margin-block: 4px;
}
.fixed-header {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
}
.login-button:hover {
  text-decoration: underline;
  text-decoration-color: black;
  border: none;
}
.login-button {
  background: none !important;
  border: none !important;
  padding: none !important;
  color: black;
}
.sign-up-button {
  display: inline-block;
  font-size: 18px;
  padding: none !important;
  color: black;
}
.user-login {
  width: 300px;
  align-items: center;
  white-space: nowrap;
}

.sign-up-button {
  white-space: nowrap;
}

.logo-image {
  margin-right: 10px;
}

@media (max-width: 1285px) {
  .logo-image {
    flex-direction: column;
    left: 0;
  }
}
</style>
