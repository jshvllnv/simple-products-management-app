<script setup>
import pageNotFoundVector from "/Projects/Development/crud-app/public/assets/page-not-found-vector.svg";
</script>

<template>
    <div class="container">
        <div
            class="row d-flex flex-column align-items-center justify-content-center min-vh-100"
        >
            <div class="col-md-6">
                <img :src="pageNotFoundVector" alt="" />
                <p class="fw-bold fs-4 text-center">
                    Page Not Found.
                    <router-link to="/">Back to Home?</router-link>
                </p>
            </div>
        </div>
    </div>
</template>
