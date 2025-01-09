import { createRouter, createWebHistory } from "vue-router";
import productsIndex from "../components/products/index.vue";
import productsCreate from "../components/products/create.vue";
import notFound from "../components/notFound.vue";

const routes = [
    {
        path: "/",
        name: "products.index",
        component: productsIndex,
    },
    {
        path: "/products/create",
        name: "products.create",
        component: productsCreate,
    },
    {
        path: "/products/:id/edit",
        name: "products.edit",
        component: productsCreate,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: notFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
