<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const form = reactive({
    name: "",
    description: "",
    image: "",
    type: "",
    quantity: "",
    price: "",
});

const router = useRouter();
const route = useRoute();
let errors = ref([]);

const editMode = ref(false);

onMounted(() => {
    if (route.name === "products.edit") {
        editMode.value = true;
        getProduct();
    }
});

const getProduct = async () => {
    let response = await axios
        .get(`/api/products/${route.params.id}/edit`)
        .then((response) => {
            form.name = response.data.product.name;
            form.description = response.data.product.description;
            form.image = response.data.product.image;
            form.type = response.data.product.type;
            form.quantity = response.data.product.quantity;
            form.price = response.data.product.price;
        });
};
const getImage = () => {
    let image = "/upload/no-image.png";
    if (form.image) {
        if (form.image.indexOf("base64") != -1) {
            image = form.image;
        } else {
            image = "/upload/" + form.image;
        }
        return image;
    }
};

const handleSave = (values, actions) => {
    if (editMode.value) {
        updateProduct(values, actions);
    } else {
        createProduct(values, actions);
    }
};

const createProduct = (values, actions) => {
    axios
        .post("/api/products", form)
        .then((response) => {
            router.push({
                name: "products.index",
            });
            toast.fire({
                icon: "success",
                title: "Product Created Successfully",
            });
        })
        .catch((error) => {
            if (error.response.status == 422) {
                errors.value = error.response.data.errors;
            }
        });
};

const updateProduct = (values, actions) => {
    axios
        .put(`/api/products/${route.params.id}`, form)
        .then((response) => {
            router.push({
                name: "products.index",
            });
            toast.fire({
                icon: "success",
                title: "Product Updated Successfully",
            });
        })
        .catch((error) => {
            if (error.response.status == 422) {
                errors.value = error.response.data.errors;
            }
        });
};

const handleFileChange = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = (file) => {
        form.image = reader.result;
    };
    reader.readAsDataURL(file);
};
</script>
<template>
    <div>
        <div class="row d-flex align-items-center justify-content-center">
            <div class="col-md-8">
                <!-- Title & Button -->
                <div
                    class="row d-flex align-items-center justify-content-between mb-4"
                >
                    <div class="col-md-4">
                        <h1 class="fs-3 fw-bold">
                            <span v-if="!editMode">Create</span>
                            <span v-if="editMode">Edit</span>
                            Product
                        </h1>
                    </div>
                    <div class="col-md-2">
                        <router-link class="btn btn-outline-secondary" to="/"
                            >Back</router-link
                        >
                    </div>
                </div>

                <!-- Form -->
                <div class="row">
                    <div class="col-md-8">
                        <!-- Name -->
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input
                                type="text"
                                class="form-control"
                                name="name"
                                v-model="form.name"
                                required
                            />
                            <small class="text-danger" v-if="errors.name">{{
                                errors.name
                            }}</small>
                        </div>
                        <!-- Description -->
                        <div class="mb-3">
                            <label for="description" class="form-label"
                                >Description (Optional)</label
                            >
                            <textarea
                                type="text"
                                class="form-control"
                                name="description"
                                v-model="form.description"
                            ></textarea>
                            <small
                                class="text-danger"
                                v-if="errors.description"
                                >{{ errors.description }}</small
                            >
                        </div>
                        <!-- Image -->
                        <div class="mb-3 d-flex flex-column">
                            <label for="image" class="form-label"
                                >Add Image</label
                            >
                            <img
                                :src="getImage()"
                                alt="Product Image"
                                width="80px"
                                height="80px"
                                class="mb-2 border p-1"
                            />
                            <input
                                type="file"
                                class="form-control"
                                name="image"
                                @change="handleFileChange"
                                required
                            />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <!-- Category -->
                        <div class="mb-3">
                            <label for="type" class="form-label"
                                >Category</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                name="type"
                                v-model="form.type"
                                required
                            />
                        </div>
                        <!-- Inventory -->
                        <div class="mb-3">
                            <label for="quantity" class="form-label"
                                >Inventory</label
                            >
                            <input
                                type="number"
                                class="form-control"
                                name="quantity"
                                v-model="form.quantity"
                                required
                            />
                        </div>
                        <!-- Price -->
                        <div class="mb-3">
                            <label for="price" class="form-label">Price</label>
                            <input
                                type="number"
                                class="form-control"
                                name="price"
                                v-model="form.price"
                                required
                            />
                        </div>
                    </div>
                </div>

                <!-- Submit -->
                <div class="row">
                    <div class="col-md-1 offset-md-10">
                        <button
                            class="btn btn-outline-secondary"
                            @click="handleSave"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
