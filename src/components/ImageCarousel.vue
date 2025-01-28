<template>
  <div class="image-carousel" ref="carousel" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <transition name="fade" mode="out-in">
      <div :key="currentIndex" class="image-container">
        <!-- Use preloaded image directly -->
        <img :src="loadedImages[currentIndex].src" alt="Image" class="carousel-image"/>
        <div class="subtext-container">
          {{ currentSubtext }}
        </div>
      </div>
    </transition>

    <div class="navigation-dots">
      <span v-for="(image, index) in images" :key="index" @click="handleDotClick(index)" :class="{ active: currentIndex === index }"></span>
      <!-- <div @click="togglePause" class="pause-button">
        <font-awesome-icon :icon="showPlay ? 'fa-play' : 'fa-pause'" />
      </div>  -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, onBeforeMount, onBeforeUnmount, computed } from 'vue';

const images = ref<string[]>([
  '/images/main_Gostynin.jpg',
  '/images/main_Gostynin_modern.jpg',
  '/images/conv_Plock.jpg',
  '/images/conv_Plock_modern.jpg',
  '/images/other_Skierniewice.jpg',
  '/images/other_Skierniewice_modern.jpg',
  '/images/about_Sierpc.jpg',
  '/images/about_Sierpc_modern.jpg',
  '/images/member_Skempe - Lipno.jpg',
  '/images/member_Skempe - Lipno_modern.jpg',
  '/images/comm_Kutno.jpg',
  '/images/comm_Kutno_modern.jpg',
  '/images/research_Lublin.jpg'
]);

const subtexts = ref<string[]>([
  'Lutheran Church at Gostynin.',
  'Photo of the Lutheran Church at Gostynin, recently refurbished as part of a hotel / conference centre. Courtesy of Irena Rosiak (on Facebook).',
  'View of Plock, Poland from the south side of the Wisla (Vistula) River.',
  'Photo of Plock, Poland, courtesy of member Miles Ertmann.',
  'View of Skierniewice train station.',
  'Modern view of Skierniewice train station from the opposite direction. Photo courtesy Marcin Lechowicz from Google Earth / Panoramio.',
  'Manor house and Benedictine Cloister at Sierpc.',
  'Modern photo of manor house and Benedictine Cloister at Sierpc, from pl.wikipedia.org.',
  'Bernadine Cloister at Skepe near Lipno.',
  'Modern photo of Bernadine Cloister at Skepe near Lipno.',
  'Complex of Gierałty\'s palace, at Kutno, Poland.',
  'Former palace, now a music school at Kutno, Poland.',
  'Tarlow Castle ruins at Czechow, now a northwestern suburb of the city of Lublin. The ruins have since been replaced by a church.'
]);

const currentIndex = ref(0);
const fadeTime = 6000; // in milliseconds
let autoCycleInterval: NodeJS.Timeout | null = null;
const paused = ref(false);
const dotClickDelay = fadeTime / 2; // Adjust the delay time as needed (in milliseconds)
let dotClickTimeout: NodeJS.Timeout | null = null;
//const showPlay = ref(false);

const currentImage = computed(() => images.value[currentIndex.value]);
const currentSubtext = computed(() => subtexts.value[currentIndex.value]);

const loadedImages: Ref<HTMLImageElement[]> = ref([]);

const preloadImages = () => {
  images.value.forEach((imageUrl) => {
    const img = new Image();
    img.src = imageUrl;
    loadedImages.value.push(img);
  });
};

const startAutoCycle = () => {
  if (!paused.value) {
    autoCycleInterval = setInterval(() => {
      nextImage();
    }, fadeTime);
  }
};

const stopAutoCycle = () => {
  if (autoCycleInterval) {
    clearInterval(autoCycleInterval);
    autoCycleInterval = null;
  }
};

const togglePause = () => {
  paused.value = !paused.value;
  if (paused.value) {
    stopAutoCycle();
  } else {
    startAutoCycle();
  }
  //showPlay.value = paused.value
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
};


const handleDotClick = (index: number) => {
  currentIndex.value = index;
  togglePause();
  //showPlay.value = !showPlay.value

  if (dotClickTimeout) {
    clearTimeout(dotClickTimeout);
  }

  dotClickTimeout = setTimeout(() => {
    togglePause();
  }, dotClickDelay);
};

onBeforeMount(() => {
  preloadImages();
});

onMounted(() => {
  startAutoCycle();
});

onBeforeUnmount(() => {
  stopAutoCycle();
});


const touchStartX = ref(0);
const touchEndX = ref(0);
const minSwipeDistance = 50; // Adjust this value based on your preference

const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.touches[0].clientX;
};

const handleTouchMove = (event: TouchEvent) => {
  touchEndX.value = event.touches[0].clientX;
};

const handleTouchEnd = () => {
  const swipeDistance = touchEndX.value - touchStartX.value;

  togglePause();
  if (dotClickTimeout) {
    clearTimeout(dotClickTimeout);
  }
  dotClickTimeout = setTimeout(() => {
    togglePause();
  }, dotClickDelay);

  if (swipeDistance > minSwipeDistance) {
    prevImage(); // Swipe right, go to the previous image
  } else if (swipeDistance < -minSwipeDistance) {
    nextImage(); // Swipe left, go to the next image
  }
};
</script>

<style scoped lang="scss">
@import "../scss/variables";

.image-carousel {
  position: relative;
  display: grid;
  place-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background: $menu-bar-bg;//linear-gradient(45deg, $menu-bar-bg, $header-bg);
  border: none;
  border-radius: 8px;
  width: 620px;
  margin: auto;
  //max-width: 100%; 
  //box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.3); 
}

.carousel-image {
  width: auto;
  height: 240px;
  margin-top: 10px;
  border-radius: 8px;
}

.subtext-container {
  width: auto;
  height: 65px;
  text-align: left;
  margin-left: 20px;
  padding-left: 0px;
  padding-right: 0px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}

.navigation-dots {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.navigation-dots span {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: $primary-bg;
  margin: 0 5px;
  cursor: pointer;
}

.navigation-dots span.active {
  background-color: #007BFF; /* Change to your preferred active color */
}

.pause-button {
  background-color: transparent;
  color: $primary-bg;
  position: absolute;
  justify-content: center;
  top: 390px;
  right: 20px;
  border: none;
}

/* Add media queries for smaller screens */
@media (max-width: 640px) {
  .image-carousel {
    max-width: 100%;
    padding-top: 0px;
    width: auto;
    margin: 0px;
  }

  .carousel-image {
    max-width: 100%;
    margin-top: 10px;
    height: auto;
  }

  .subtext-container {
    max-width: 96%; /* Remove the maximum width for small screens */
    width: auto;
    height: auto;
    padding: 0px;
    margin-left: 10px; /* Adjust margins for smaller screens */
    margin-right: 10px;
  }

  .navigation-dots {
      display: none; /* Hide the navigation-dots on screens with a maximum width of 768px */
    }
}

</style>
