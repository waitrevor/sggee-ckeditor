
<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const email = ref('');
const verificationCode = ref('');

const newPassword = ref('');
const showPassword = ref<boolean>(false);
const capsLockOn = ref<boolean>(false);
const numLockOn = ref<boolean>(true);

const step = ref(1); // Initial step

const errorMessageStep2 = ref<string>('');
const errorMessageStep3 = ref<string>('');

const checkLockKeys = (event: KeyboardEvent) => {
  capsLockOn.value = event.getModifierState('CapsLock');
  numLockOn.value = event.getModifierState('NumLock');
};

async function initiatePasswordReset() {
  try {
    const requestResetEndpoint = import.meta.env.VITE_REQUEST_RESET_ENDPOINT;
    const response = await fetch(requestResetEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value }),
    });

    if (!response.ok) {
      errorMessageStep2.value = `Error initiating password reset. Please ensure your email is correct.`;
      throw new Error(`Error initiating password reset: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    step.value = 2;
    return responseData;
  } catch (error) {
    console.error(error);
    // Handle error here
  }
}

async function doPasswordReset() {
  try {
    const response = await fetch(import.meta.env.VITE_PERFORM_RESET_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        token: verificationCode.value,
        password: newPassword.value,
      }),
    });

    if (!response.ok) {
      errorMessageStep3.value = `Error completing password reset. Please ensure your token and new password are valid.`;
      throw new Error(`Error completing password reset: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    step.value = 3;
    return responseData;
  } catch (error) {
    console.error('Error performing password reset:', error);
    // Handle error here
  }

}

const reloadPage = () => {
  // Reload the page
  window.location.reload();
};
</script>

<template>
	<div class="shadow-content">
		<!--h2 class="centered-content remove-margins">Reset Password</h2-->
		<div class="reset-password-container">
			<template v-if="step === 1">
				<!-- Step 1: Enter Email -->
				<form @submit.prevent="initiatePasswordReset">
					<p>Please enter the email associated with your account.</p>
          <br>
					<label for="email"><strong>Email:</strong></label>
					<input v-model="email" type="email" id="email" />
					<div class="centered-content">
						<button type="submit">Submit</button>
					</div>
				</form>
      
        <p v-if="errorMessageStep2" class="error-message" style="white-space: pre-line;">{{ errorMessageStep2 }}</p>
			</template>

      <template v-else-if="step === 2">
      <!-- Step 2: Enter Verification Code -->
        <form @submit.prevent="doPasswordReset">
          <input type="text" id="username" style="position: absolute; left: -9999px;" :value="email" required/>

          <p>Enter the verification code sent to <strong>{{ email }}</strong> and a new password for your account.</p>
          <br>
          <label for="verificationCode"><strong>Verification Code:</strong></label>
          <input v-model="verificationCode" type="text" id="verificationCode" placeholder="Enter your verification code" required/>


          <!-- New Password Input -->
          <div class="form-group password-group">
            <label for="password"><strong>New Password:</strong></label>
            <div class="password-input-wrapper">
              <input
                id="password"
                ref="passwordInput"
                name="new-password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                v-model="newPassword"
                required
                placeholder="Enter your new password"
                @keydown="checkLockKeys"
              />
              <font-awesome-icon
                class="eye-icon"
                :icon="['fas', showPassword ? 'eye' : 'eye-slash']"
                @click="showPassword = !showPassword;"
              />
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

          <div class="centered-content">
              <button type="submit">Submit</button>
          </div>
        </form>

        <p v-if="errorMessageStep3" class="error-message" style="white-space: pre-line;">{{ errorMessageStep3 }}</p>
      </template>

			<template v-else>
				<!-- Step 3: Password Reset Finalize -->
				<div class="reset-password-finalize-container">
					<h2>Password Reset Successful!</h2>
					<p>Your password has been successfully reset. Click <a href="#/login" @click="reloadPage">here</a> to login.</p> 
				</div>
			</template>
		</div>
	</div>
</template>

<style scoped lang="scss">
@import "../../scss/variables";

.shadow-content {
  box-shadow: 0 0 10px rgba(4, 4, 4, 0.1);
}

.content-container {
	max-width: 350px;
	width: auto;
	height: auto;
	margin: 0;
  padding: 0;
}
.reset-password-container {
  max-width: 350px;
  margin: auto;
  padding: 20px;
}


.info-icon {
  margin-bottom: 10px;
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

.error-message { /* additional to the global style */
  max-width: 500px;
  margin-top: 20px;
}

label {
	display: block;
	margin-bottom: 8px;
}

input {
	width: 100%;
	padding: 7px;
	margin-bottom: 16px;
  border: 1px solid #ccc;
  font-family: inherit; /* Inherit the font family from the parent or body */
  font-weight: inherit; /* Inherit font weight */
}

button {
	padding: 10px 15px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

.reset-password-finalize-container {
	margin-top: 20px;
}


.password-group {
  position: relative;
  display: flex;
  flex-direction: column;
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

input[type="password"],
input[type="text"] {
  width: 100%;
  padding-right: 2.5rem; /* Space for the icon */
  box-sizing: border-box;
}

.eye-icon {
  position: absolute;
  right: 0.5rem;
  cursor: pointer;
  color: #6c757d;
  transition: color 0.2s;
  width: 24px;
  height: auto;
  top: 11px;
}

.eye-icon:hover {
  color: #495057;
}
</style>