<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import ResetPassword from '../components/login/ResetPassword.vue';
import ForgotUsername from '../components/login/ForgotUsername.vue';
import { AccessTokenManager } from '../utilities/auth';
import { parseUrl } from '../utilities/parsing';
import { useUserStore } from '../utilities/user';

const userStore = useUserStore();
const accessTokenManager = AccessTokenManager.getInstance();

const username = ref<string>('');
const password = ref<string>('');
const errorMessage = ref<string>('');
//const rememberMe = ref<boolean>(false);
const showPassword = ref<boolean>(false);

const resetPasswordOpen = ref<boolean>(false)
const forgotUsernameOpen = ref<boolean>(false)
const capsLockOn = ref<boolean>(false);
const numLockOn = ref<boolean>(true);

const passwordInput = ref<HTMLInputElement | null>(null);
const iconMargin = ref<Record<string, string>>({});

const loading = ref<boolean>(false);

const login = () => {
  if (!username.value || !password.value) {
    errorMessage.value = 'Please enter both username and password.';
    return;
  }

  sendLoginRequest(username.value, password.value);

  if (errorMessage.value != '') {   // Clear username and password fields on login failure
    username.value = '';
    password.value = '';
  }
};

const sendLoginRequest = async (username: string, password: string) => {
  try {
    loading.value = true;
    const loginEndpoint = import.meta.env.VITE_LOGIN_ENDPOINT;
    const response = await axios.post(loginEndpoint, { username, password }, { withCredentials: true });
    accessTokenManager.setAccessToken(response.data.token);
    handleLoginSuccess(username);
    errorMessage.value = '';
  }
  catch (error) {
    handleLoginError(error);
  }
  finally {
    loading.value = false;
  }
};

// Function to get the redirect state from the query parameters
const getRedirectState = () => {
  const queryParams = parseUrl(window.location.href); // Adjust parseUrl as needed
  const redirectStateString = queryParams.redirect;

  if (redirectStateString) {
    try {
      // Decode the URL-encoded redirect state string
      const decodedStateString = decodeURIComponent(redirectStateString);

      // Parse the JSON string into an object
      const innerRedirectState = JSON.parse(decodedStateString);

      return innerRedirectState;
    }
    catch (error) {
      console.error('Error parsing redirect state:', error);
    }
  }

  return null;
};


const handleLoginSuccess = (username: string, homePageRoute: string = '#/') => {
  userStore.setUsername(username);
  userStore.setLoginHidden(true);
  const redirectState = getRedirectState();

  if (redirectState && redirectState.path != '#/') {
    window.location.href = `#${redirectState.path}${redirectState.queryParams}`;
  }
  else {
    window.location.href = homePageRoute;  // No redirect state stored, redirecting to home page
  }
};


const handleLoginError = (error: any) => {
  if (error.response && error.response.status === 401) {
    errorMessage.value = 'Invalid Credentials: Please check your username and password and try again.\n After 3 failed attempts you will be locked out for 10 minutes.';
    return;
  }

  if (!error.response && error.request) {
    console.error('No response received:', error.request);
  }
  else {
    console.error('Error setting up request:', error.message);
  }

  errorMessage.value = 'An error occurred while processing your request. Please try again later.';
};

const checkLockKeys = (event: KeyboardEvent) => {
  capsLockOn.value = event.getModifierState('CapsLock');
  numLockOn.value = event.getModifierState('NumLock');
};

const openDialog = (dialogType: string) => {
  errorMessage.value = '';
  resetPasswordOpen.value = false;
  forgotUsernameOpen.value  = false;

	if (dialogType == 'forgotUsername') {
		forgotUsernameOpen.value  = true;
	}
  else if (dialogType == 'forgotPassword') {
		resetPasswordOpen.value = true;
	}
}

const updateInputWidth = () => {
  if (passwordInput.value) {
    const inputWidth = passwordInput.value.offsetWidth;
		iconMargin.value = { marginLeft: `calc(${inputWidth}px - 32px)` };
  }
};

onMounted(() => {
  updateInputWidth();
  window.addEventListener('resize', updateInputWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateInputWidth);
});
</script>

<template>
	<div class="main-content content-container">
		<h1 class="centered-content" v-if="!resetPasswordOpen && !forgotUsernameOpen">SGGEE Login</h1>
		<h1 class="centered-content" v-if="resetPasswordOpen">Reset Password</h1>
		<h1 class="centered-content" v-if="forgotUsernameOpen">Forgot Username</h1>

		<div class="shadow-content login-container" v-if="!resetPasswordOpen && !forgotUsernameOpen">
			<form @submit.prevent="login">
				<label for="username">Username:</label>
				<input v-model="username" @keydown="checkLockKeys" type="text" id="username" autocomplete="username" required/>

				<label for="password">Password:</label>
				<div class="password-container">
					<input v-model="password" @keydown="checkLockKeys" :type="showPassword ? 'text' : 'password'" id="password" ref="passwordInput" class="password-input" autocomplete="current-password" required/>
					<div class="icon-container" @click="showPassword = !showPassword;" :style="iconMargin">
						<font-awesome-icon class="eye-icon" :icon="['fas', showPassword ? 'fa-eye' : 'fa-eye-slash']"/>
					</div>
				</div>

				<div v-if="capsLockOn" class="info-icon">
					<font-awesome-icon :icon="['fas', 'fa-info-circle']"/>
					Caps Lock is on
				</div>
				<div v-if="!numLockOn" class="info-icon">
					<font-awesome-icon :icon="['fas', 'fa-info-circle']"/>
					Num Lock is off
				</div>

				<!--div class="remember-me">
					<input type="checkbox" v-model="rememberMe" id="rememberMe" />
					<label for="rememberMe">Remember Me</label>
				</div-->

        <div class="centered-content">
          <!-- Conditional rendering of spinner -->
          <div v-if="loading" class="spinner-container">
            <div class="spinner"></div>
          </div>

          <!-- Conditional rendering of login button -->
          <button v-else type="submit" class="login-button" @click="login">
            <span v-if="loading">Logging in...</span>
            <span v-else>Login</span>
          </button>
        </div>
			</form>

		</div>

		<p v-if="errorMessage && !resetPasswordOpen && !forgotUsernameOpen" class="error-message" style="white-space: pre-line;">{{ errorMessage }}</p>

		<div v-if="resetPasswordOpen">
			<ResetPassword/>
		</div>

		<div v-if="forgotUsernameOpen">
			<ForgotUsername/>
		</div>

		<div class="forgot-links centered-content">
			<h3>Need Help Logging In?</h3>
			<a v-if="resetPasswordOpen" href="#/login" @click="openDialog('login')">Back to Login<br></a>
			<a v-if="forgotUsernameOpen" href="#/login" @click="openDialog('login')">Back to Login<br></a>
			<!--a class="toggle-link" v-if="!forgotUsernameOpen" @click="openDialog('forgotUsername')">Forgot Username<br></a-->
			<a class="toggle-link" v-if="!resetPasswordOpen" @click="openDialog('forgotPassword')">Forgot / Reset Password<br></a>
			<a href="https://formsmarts.com/form/22i4?via=f8s.com">Sign up</a>
		</div>

	</div>

</template>

<style scoped lang="scss">
@import "../scss/variables";

.shadow-content {
  box-shadow: 0 0 10px rgba(4, 4, 4, 0.1);
}

.content-container {
	width: auto; 
	height: auto;
	margin: 0;
	padding-inline: 200px;
  margin-bottom: 20px;
  min-width: 500px;
}

@media (max-width: 940px) {
	.content-container {
		padding-inline: 55px;
    min-width: 10px;
		.login-container {
			padding: 20px;
		}
	}
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 14px;
}

.login-container {
	max-width: 350px;
	margin: auto;
	padding-top: 20px;
	padding-inline: 100px;
}

label {
	display: block;
	margin-bottom: 8px;
}

.login-button {
  margin-bottom: 16px;
}

input {
	width: 100%;
	padding: 7px;
	margin-bottom: 16px;
}

.password-input {
	padding-right: 32px;
  width: 100%;
}

.icon-container {
	display: flex;
	width: 32px;
	height: 32px;
	align-items: center;
	justify-content: center;
	position: absolute;
	margin-top: 2px;
	border-left: $border-thickness $border-style $border-color;
  cursor: pointer;
}

.eye-icon {
  font-size: 16px;
}

.toggle-link {
	cursor: pointer;
}

.password-container {
  position: relative;
  display: flex;
  flex-direction: row;
}

.remember-me {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
	margin-top: 10px;
}

/* Style for the "Remember Me" checkbox and label */
input[type="checkbox"] {
  margin-right: 0px;
	margin-top: 13px;
	width: 20px;
	height: 20px;
}

label[for="rememberMe"] {
  margin: 0;
	margin-left: 10px;
	white-space: nowrap; /* Prevent label from wrapping onto the next line */
}

.error-message {
	color: red;
  max-width: 500px;
}

.forgot-links {
  margin-bottom: 20px;
}
</style>
