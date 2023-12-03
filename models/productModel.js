const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a product Name"]
        },
        quantity: {
            type: Number,
            // required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: false,
        },
        accountId: {
            type: String,
            required: true
        },
        sendToExternal: {
            type: Boolean
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
