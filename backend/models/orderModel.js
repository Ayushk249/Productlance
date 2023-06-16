import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },

// array of objects
    orderItems:[
        {
            name: {type : String, required: true},
            quantity: {type: Number, required: true},
            image: {type: String,required: true},
            price: {type: Number, required: true},
            product : {
                type:mongoose.Schema.Types.ObjectId,
                required: true,
                ref:"Product"
            }
        }],

    shippingAddress : {
        address: {type: String,required: true},
        city: {type: String,required: true},
        postalcode: {type: String,required: true},
        country : {type: String,required: true},
    },
    
    paymentmethod : {
        type: String,
        required: true,
    },

    paymentresult : {
        id: {type: String},
        status: {type : String},
        update_time: {type:String},
        email_address: {type:String}
    },

    itemsPrice: {
        type: Number,
        required : true,
        default: 0.0
    },

    taxprice : {
        type: Number,
        required : true,
        default: 0.0
    },

    shippingprice: {
        type: Number,
        required : true,
        default: 0.0
    },

    totalprice: {
        type: Number,
        required : true,
        default: 0.0
    },

    ispaid: {
        type: Boolean,
        required : true,
        default: false,
    },

    paidAt: {
        type: Date,
    },

    isDelivered: {
        type: Boolean,
        required : true,
        default: false
    },

    deliveredAt: {
        type: Date,
    }

},
{
    timestamp: true,
})

const Order = mongoose.model("Order",orderSchema)

export default Order