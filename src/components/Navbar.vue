  <template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">Hajj Shop</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link custom-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/productPage/product-list" class="nav-link custom-link">Shop Now</router-link>
          </li>
           <li class="nav-item">
            <router-link to="/news" class="nav-link custom-link">Information</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link custom-link">About</router-link>
          </li>
        </ul>
          
          <a data-toggle="modal" data-target="#loginToko" v-if="!nama">
            <img class="custom-icon" src="../assets/svg/store-icon.svg" />
            <span>Toko</span>
          </a>  
          
          
          <a v-if="!nama" data-toggle="modal" data-target="#login">
            <img class="custom-icon" src="../assets/svg/user-icon.svg" />
            <span>Login</span>
          </a>
          
          <!-- condition pembeli -->
           <li v-if="nama && userType == 'pembeli'" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{nama}}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <router-link to="/userProfile" class="dropdown-item">Profile</router-link>
                <router-link to="/userOrder" class="dropdown-item">Pesanan Saya</router-link>
                <router-link to="/chat" class="dropdown-item">Chat Admin</router-link>
                <a class="dropdown-item" href="#" @click="logoutUser">Log out</a>
              </div>
            </li>
          <a data-toggle="modal" data-target="#miniCart" v-if="nama && userType == 'pembeli'">
            <img class="custom-icon" src="../assets/svg/cart-icon.svg">
            <span class='badge badge-warning' id='lblCartCount'> {{countingCart}} </span>
          </a>
          <!-- end condition pembeli -->

          <!-- condition penjual -->
          <li v-if="nama && userType == 'penjual'">
            {{nama}}
          </li>

          <a  v-if="nama && userType == 'penjual'" @click="toStore">
            <img class="custom-icon" src="../assets/svg/store-icon.svg" />
          </a>
          <!-- end condition penjual -->

      </div>  
  </nav>
    
  </div>
</template>

<script>
import {fb, db} from '../firebase';

export default {
  name: "Navbar",
  data() {
    return {
        email: null,
        nama : '',
        userType: null,
        countingCart: 0
    }
  },
  methods: {
    logoutUser() {
      fb.auth().signOut()
            .catch((err) => {
                console.log(err)
            });
    },
    toStore() {
      this.$router.push('/admin/overview')
    }
  },
  created() {
    let user = fb.auth().currentUser;

    if (user) {
      let docRef = db.collection("profiles").doc(user.uid);

        docRef.get().then((doc) => {
            if (doc.exists) {
                this.nama = doc.data().name
                this.userType = doc.data().userType
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    } 
  },
  mounted() {
    this.countingCart = this.$store.state.cart.length
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="../styles/Navbar.scss" />
