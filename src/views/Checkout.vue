<template>
  <div class="checkout">
    <Navbar />
    <div class="container">

      <h1 class="checkout-title mt-5">Keranjang Belanja</h1>

       <div v-if="productCount == 0">
          <img src="../assets/img/empty-illus.jpg" class="img-empty">
        </div>

      <div v-else>
        <div class="row">
            <div class="col-md-8">
              <div v-for="(item, index) in this.$store.state.cart" :key="index">
                  <div class="row product-detail">
                    <div class="col-md-4">
                      <img :src="item.productImage" width="80px"  class="align-self-center product-image" />
                    </div>
                    <div class="col-md-8">
                      <p class="product-title">{{item.productName}}</p>
                      <p class="mt-0 product-price">{{item.productPrice | currency('Rp') }}</p>
                      <p class="mt-0">Jumlah beli : {{item.productQuantity}}</p>
                      <p>Subtotal : {{ subTotal[index] | currency('Rp') }}</p>
                      <img src="../assets/img/trash-can.svg" class="trash-icon float-right" @click="$store.commit('removeFromCart', item)">
                    </div>
                  </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="price-container mt-4">
                  <h2>Ringkasan belanja</h2> 
                  <hr>
                  <p class="mt-0">Total Harga :  <span class="total-price">{{totalPrice | currency('Rp') }}</span></p>
                  <button type="button" class="btn btn-info" @click="toPurchase">Beli ({{productCount}})</button>
                  <button type="button" class="btn btn-outline-dark" @click="toShop">Lanjutkan Belanja!</button>
              </div>
            </div>
        </div>
      </div>
    </div>
    <Login />

    <Footer  />
  </div>
</template>

<script>
import {fb} from '../firebase';

export default {
  name: "checkout",
  data() {
    return {
      totalPrice: null,
      productCount: null,
      checkUser: null,
      subTotal: []
    }
  },
  methods: {
    toShop() {
      this.$router.push({path: '/productPage'})
    },
    toPurchase() {
      if (this.checkUser !== null) {
        this.$router.push({path: '/pembayaran'})
      } else {
        $('#login').modal('show')
      }
       
    }
  },
  created() {
     let user = fb.auth().currentUser;
     if (user) {
       this.checkUser = user.email;
     }

    const keranjang = JSON.parse(window.localStorage.getItem('cart'));
    this.productCount = keranjang.length
    let sum = []
    if ( keranjang !== null ){
      for (let i = 0; i < keranjang.length; i++) {
        let harga = keranjang[i].productPrice
        let total = keranjang[i].productQuantity
        let totalProduct = harga * total
        this.subTotal.push(totalProduct)
        sum.push(totalProduct) 
      }
      
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      this.totalPrice = sum.reduce(reducer);
    }
   
  }
}
</script>

<style scoped lang="scss" src="../styles/Checkout.scss">
