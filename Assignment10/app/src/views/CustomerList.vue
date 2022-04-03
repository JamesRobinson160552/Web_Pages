<!-- James Robinson 160552 for COMP 2513 Winter 2022 Assignment 10 -->

<template>
<div class="container">
    <h1>Assignment 10 - Vue app</h1>
    <h2>James Robinson 160552r@acadiau.ca</h2>
    <div class="customers">
        <br><br>
        <h1>Customers</h1>
        <table class="table table-dark table-bordered table-hover">
            <thead>
                <tr>
                    <th>First Name:</th>
                    <th>Last Name:</th>
                    <th>E-mail:</th>
                    <th><button @click="toggleAddForm()" v-if="!adding_customer">Create New</button></th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="adding_customer" id="add_new_form">
                    <td><input type="text" v-model="new_customer.first_name"/></td>
                    <td><input type="text" v-model="new_customer.last_name"/></td>
                    <td><input type="text" v-model="new_customer.email"/></td>
                    <td><button @click="createCustomer()">ADD</button></td>
                </tr>
                <tr v-for="(customer, index) in customers" v-bind:key="customer._id">
                    <td>{{ customer.first_name }}</td>
                    <td>{{ customer.last_name }}</td>
                    <td>{{ customer.email }}</td>
                    <td><button @click="deleteCustomer(customer, index)">DELETE</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "CustomerList",
  data() {
    return {
      adding_customer: false,
      customers: [],
      new_customer: {
        first_name: "",
        last_name: "",
        email: ""
      }
    }
  },
  methods: {
    toggleAddForm: function() {
      this.adding_customer = !this.adding_customer;
    },
    //Displays all customers in the customers table
    getCustomers: function() {
      var url = "http://localhost:8080/api/customers/";
      axios.get(url, {})
        .then((response) => {
          this.customers = response.data;
        })
    },
    //Creates a customer based on the user input
    createCustomer: function() {
        if (this.new_customer.first_name == "" || this.new_customer.last_name == "" || this.new_customer.email == ""){
            alert("Please enter values in each field");
        }
        else{
            var url = "http://localhost:8080/api/customers/";
            axios.post(url, {
                first_name: this.new_customer.first_name,
                last_name: this.new_customer.last_name,
                email: this.new_customer.email
            },
            {
            headers: { }
        })
        .then((response) => {
            this.customers.push(response.data)
            this.new_customer.first_name = "";
            this.new_customer.last_name = "";
            this.new_customer.email = "";
            this.adding_customer = false;
        }, 
        (error) => {
            alert("Error - Could not add customer");
            console.log(error);
        });
        }
    },
    //Removes a customer from the table
    deleteCustomer: function(customer, index) {
      var url = "http://localhost:8080/api/customers/" + customer._id;
      axios.delete(url, {
        headers: {},
        data: {}
      })
      .then((response) => {
        console.log(response);
        this.$delete(this.customers, index);
      }, (error) => {
        console.log(error);
      });
    }
  },
  mounted() {
    this.getCustomers();
  }
}
</script>

<style scoped>

</style>>
