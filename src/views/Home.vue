<template>
  <div>
    <Navbar />
    
    <div class="container-fluid">
      <div class="home-container row">
        <div class="col-md-4">
            <h1>Belanja Kebutuhan haji maupun umrah disini sekarang</h1>
            <h4>Semua kebutuhan bisa dicari disini,bayar dengan mudah, transaksi aman</h4>
            <button class="btn" @click="toShop">Belanja Sekarang!</button>
        </div>
        <div class="col-md-8">
          <!-- <img src="../assets/img/makkah-home-compress.jpg"/> -->
          <img v-lazy="require('@/assets/img/makkah-home-compress.jpg')" />
        </div>
      </div>

      <h1 class="title-category">Pilih berdarsarkan kategori.</h1>
    
      <div class="row category-row">
        <router-link tag="div" to="/productPage/product-muslim" class="col-md-3">
          <img v-lazy="require('@/assets/img/category-muslim.jpg')" />
        </router-link>
        <router-link tag="div" to="/productPage/product-muslimah" class="col-md-3">
          <img v-lazy="require('@/assets/img/category-muslimah.jpg')" />
        </router-link>
        <router-link tag="div" to="/productPage/alat-sholat" class="col-md-3">
          <img v-lazy="require('@/assets/img/category-sholat.jpg')" />
        </router-link>
        <router-link tag="div" to="/productPage/perlengkapan-mandi" class="col-md-3">
          <img v-lazy="require('@/assets/img/category-mandi.jpg')" />
        </router-link>  
      </div> 

      <div class="conversi-container row">
        <div class="col-md-6">
            <h1>Konversi mata uang mu disni!</h1>
            <img v-lazy="require('@/assets/img/money-exchange.png')" />
        </div>
        <div class="col-md-6">
          <div class="conversi-form">  
            <div class="form-row">
              <div class="form-group col-md-4">
                <img src="../assets/svg/saudi-arabia.svg" />
                <label for="Indonesia">Saudi Arabia</label>
                <input type="number" class="form-control" id="Indonesia" v-model.number="cal1">
              </div>
              <div class="form-group col-md-4">
                <img src="../assets/svg/indonesia.svg" />
                <label for="Arab">Indonesia</label>
                <p>{{cal2 | currency('Rp')}}</p>
              </div>
              <div class="col-md-2 pt-4">
                <button v-if="!saudiLoading" class="btn btn-danger" @click="convertSAR">Konversi</button>
                <LoadingCircle v-else/>
              </div>
            </div>

            <hr>

            <div class="form-row">
              <div class="form-group col-md-4">
                <img src="../assets/svg/indonesia.svg" />
                <label for="Arab">Indonesia</label>
                <input type="number" class="form-control" id="Arab" v-model.number="indonesia">
              </div>
              <div class="form-group col-md-4">
                <img src="../assets/svg/saudi-arabia.svg" />
                <label for="Indonesia">Saudi Arabia</label>
                <p>{{ saudi | currency('SR')}}</p>
              </div>
              <div class="col-md-2 pt-4">
                <button v-if="!indoLoading" class="btn btn-success" @click="convertIDR">Konversi</button>
                <LoadingCircle v-else/>
              </div>
            </div>          
          </div>
        </div>
      </div>

      <div class="tagline-custom">
        <p>Belanja Online kebutuhan Haji dan umroh yang mudah dan terpercaya. </p>
        <p>Mempermudah calon Jamaah yang ingin berangkat ke Tanah Suci dalam mencari produk yang dibutuhkan</p>
      </div>

      <div class="row  mt-5 news-container">
        <div class="col-md-6">
          <img v-lazy="require('../assets/img/news.jpg')" class="img-fluid" />
        </div>
        <div class="col-md-6 pt-5 mt-5">
          <p class="title-news">Informasi seputar haji dan umrah</p>
          <p class="detail-news">Menyediakan Informasi doa-doa dan langkah-langkah saat Haji atau Umroh serta Informasi keadaan cuaca.</p>
          <button type="button" class="btn btn-outline-secondary" @click="toInformasi">Lihat disini!</button>
        </div>
      </div>
      
    </div>

    <div class="parallax-makkah"></div>

    <ProductList />
    <Login />
    <MiniCart />
    <LoginToko />
   
    <Footer />
    
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import ProductList from "../sections/ProductList.vue"
import MiniCart from "../components/MiniCart"
import axios from 'axios'
import LoadingCircle from "../components/LoadingCircle";
let urlConvert = 'https://prime.exchangerate-api.com/v5/c598ca89718e9e25c6fcf8ba/latest'

export default {
  name: "home",
  components: {
    Login,
    ProductList,
    MiniCart,
    LoadingCircle
  },
  data() {
    return {
      cal1: 0,
      cal2: 0,
      saudi: 0,
      indonesia: 0,
      saudiLoading: false,
      indoLoading: false
    }
  },
  methods: {
    toShop() {
      this.$router.push({name:'productPage'})
    },
    toInformasi() {
      this.$router.push('/news')
    },
    convertSAR() {
      this.saudiLoading = true
      axios.get(`${urlConvert}/SAR`)
        .then((res) => {
          let saudi = res.data.conversion_rates.IDR
          this.cal2 = this.cal1 * saudi;
          this.saudiLoading = false
        })
        .catch(err => console.log(err))
    },
    convertIDR() {
      this.indoLoading = true
      axios.get(`${urlConvert}/IDR`)
        .then((res) => {
          let indo = res.data.conversion_rates.SAR
          this.saudi = this.indonesia * indo;
          this.indoLoading = false
        })
        .catch(err => console.log(err))
    }
  }
};
</script>

<style scoped lang="scss" src="../styles/Home.scss" />
