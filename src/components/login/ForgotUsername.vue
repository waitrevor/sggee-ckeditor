
<!-- NOTE: THIS ENTIRE FILE IS UNUSED.... MAY NEED IT LATER SO ITS KEPT -->
<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const verificationCode = ref('');
const step = ref(1); // Initial step

const submitEmail = () => {
	// Add validate email logic
	// move to the next step
	step.value = 2;
};

</script>

<template>
	<div class="main-content">
		<!--h2 class="centered-content remove-margins">Reset Password</h2-->
		<div class="reset-password-container">
			<template v-if="step === 1">
				<!-- Step 1: Enter Email -->
				<form @submit.prevent="submitEmail">
					<p>Please enter the email associated with your account.</p>
					<label for="email">Email:</label>
					<input v-model="email" type="email" id="email" />
					<div class="centered-content">
						<button type="submit">Submit</button>
					</div>
				</form>
			</template>

			<template v-else-if="step === 2">
				<!-- Step 2: Successful -->
				<div class="reset-password-finalize-container">
					<h2>Username Recovery Successful!</h2>
					<p>Your username has been sent to the provided email.</p>
				</div>
            </template>

			<template v-else>
				<!-- Step 3: Unsuccessful -->
				<div class="reset-password-finalize-container">
					<h2>Username Not Found</h2>
					<p>The email you provided does not have an associated username at this time.</p>
				</div>
			</template>
		</div>
	</div>
</template>

<style scoped lang="scss">
.content-container {
	max-width: 350px;
	width: auto;
	height: auto;
	margin: 0;
}
.reset-password-container {
  max-width: 350px;
  margin: auto;
  padding-top: 10px;
  //border: 1px solid #ccc;
  //border-radius: 5px;
  //margin-bottom: 40px;
}

label {
	display: block;
	margin-bottom: 8px;
}

input {
	width: 100%;
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
</style>