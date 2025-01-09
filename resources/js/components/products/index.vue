<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";

let products = ref([]);

let links = ref([]);

const router = useRouter();

let searchQuery = ref("");

onMounted(async () => {
    getProducts();
});

watch(searchQuery, () => {
    getProducts();
});
const getProducts = async () => {
    let response = await axios
        .get("/api/products?&searchQuery=" + searchQuery.value)
        .then((response) => {
            products.value = response.data.products.data;
            links.value = response.data.products.links;
        });
};

const changePage = (link) => {
    if (!link.url || link.active) {
        return;
    }

    axios.get(link.url).then((response) => {
        products.value = response.data.products.data;
        links.value = response.data.products.links;
    });
};

const onEdit = (id) => {
    router.push(`/products/${id}/edit`);
};

const onDelete = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`api/products/${id}`).then((response) => {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                });
                getProducts();
            });
        }
    });
};
const getImage = (image) => {
    return "/upload/" + image;
};
</script>

<template>
    <div>
        <div class="row d-flex align-items-center justify-content-center">
            <div class="col-md-10">
                <!-- Title & Button -->
                <div
                    class="row d-flex align-items-center justify-content-between"
                >
                    <div class="col-md-2">
                        <h1 class="fs-3 fw-bold p-0">Products</h1>
                    </div>
                    <div class="col-md-2">
                        <router-link
                            class="btn btn-outline-secondary float-md-end"
                            to="/products/create"
                            >Add Product</router-link
                        >
                    </div>
                </div>

                <!-- Search Bar -->
                <div class="row mb-3">
                    <div class="col-md-6">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Search Product"
                            v-model="searchQuery"
                        />
                    </div>
                </div>

                <!-- Table -->
                <div class="row">
                    <div class="col-md-12">
                        <table class="table">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Inventory</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody
                                v-for="product in products"
                                :key="product.id"
                            >
                                <tr class="align-middle">
                                    <td>
                                        <img
                                            :src="getImage(product.image)"
                                            alt=""
                                            height="60px"
                                        />
                                    </td>
                                    <td>{{ product.name }}</td>
                                    <td>{{ product.type }}</td>
                                    <td>{{ product.quantity }}</td>
                                    <td>
                                        <button
                                            @click="onEdit(product.id)"
                                            class="btn btn-outline-secondary me-2"
                                        >
                                            <i class="fas fa-pencil-alt"></i>
                                        </button>
                                        <button
                                            @click="onDelete(product.id)"
                                            class="btn btn-outline-danger me-2"
                                        >
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Pagination -->
                <div class="row">
                    <div class="col-md-12">
                        <nav aria-label="Page navigation example">
                            <ul class="pagination float-md-end">
                                <li class="page-item">
                                    <a
                                        href="#"
                                        class="btn me-2"
                                        v-for="(link, index) in links"
                                        :key="index"
                                        v-html="link.label"
                                        :class="{
                                            'btn-outline-secondary':
                                                !link.active,
                                            'btn-outline-primary': link.active,
                                        }"
                                        @click="changePage(link)"
                                    ></a>
                                </li>
                            </ul>
                        </nav>
                        <small class="text-muted">By: Josh Villanueva</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
