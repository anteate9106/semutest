<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBvBKdQDwRl-mZb-i_GxjZQleMFnaTemLA",
    authDomain: "semutest-4057b.firebaseapp.com",
    projectId: "semutest-4057b",
    storageBucket: "semutest-4057b.firebasestorage.app",
    messagingSenderId: "160189409038",
    appId: "1:160189409038:web:c01f18080cd6eed0c8595f",
    measurementId: "G-9GMM7599L9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
